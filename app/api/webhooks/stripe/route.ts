import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { getStripe } from "@/lib/stripe";
import { decrementStock } from "@/lib/queries";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing webhook signature or secret" },
      { status: 400 }
    );
  }

  const stripe = getStripe();
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutCompleted(stripe, session);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(
  stripe: Stripe,
  session: Stripe.Checkout.Session
) {
  const db = getDb();

  const existing = await db
    .select()
    .from(orders)
    .where(eq(orders.stripeSessionId, session.id))
    .limit(1);
  if (existing.length > 0) return; // already processed

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    expand: ["data.price.product"],
  });

  const [order] = await db
    .insert(orders)
    .values({
      stripeSessionId: session.id,
      email: session.customer_details?.email ?? null,
      status: "paid",
      totalCents: session.amount_total ?? 0,
    })
    .returning();

  for (const li of lineItems.data) {
    const product = li.price?.product as Stripe.Product | undefined;
    const productId = product?.metadata?.productId
      ? parseInt(product.metadata.productId, 10)
      : null;
    if (!productId) continue;

    const quantity = li.quantity ?? 1;

    await db.insert(orderItems).values({
      orderId: order.id,
      productId,
      name: product?.name ?? "Unknown",
      size: product?.metadata?.size || null,
      color: product?.metadata?.color || null,
      quantity,
      priceCents: li.price?.unit_amount ?? 0,
    });

    await decrementStock(productId, quantity);
  }
}
