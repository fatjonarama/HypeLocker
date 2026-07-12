import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { inArray } from "drizzle-orm";
import { getDb } from "@/db";
import { products } from "@/db/schema";
import { getStripe } from "@/lib/stripe";

const bodySchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.number().int().positive(),
        quantity: z.number().int().positive().max(20),
        size: z.string().optional(),
        color: z.string().optional(),
      })
    )
    .min(1),
});

export async function POST(req: NextRequest) {
  const parsed = bodySchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid cart payload" }, { status: 400 });
  }

  const db = getDb();
  const ids = parsed.data.items.map((i) => i.productId);
  const rows = await db
    .select()
    .from(products)
    .where(inArray(products.id, ids));

  const byId = new Map(rows.map((p) => [p.id, p]));

  const lineItems = [];
  for (const item of parsed.data.items) {
    const product = byId.get(item.productId);
    if (!product || !product.active) {
      return NextResponse.json(
        { error: `Product ${item.productId} is no longer available` },
        { status: 400 }
      );
    }
    if (product.stock < item.quantity) {
      return NextResponse.json(
        { error: `${product.name} is out of stock` },
        { status: 400 }
      );
    }

    lineItems.push({
      price_data: {
        currency: "usd",
        unit_amount: product.priceCents,
        product_data: {
          name: product.name,
          images: product.images[0] ? [product.images[0]] : undefined,
          metadata: {
            productId: String(product.id),
            size: item.size ?? "",
            color: item.color ?? "",
          },
        },
      },
      quantity: item.quantity,
    });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? req.nextUrl.origin;
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout/cancel`,
  });

  return NextResponse.json({ url: session.url });
}
