import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { inArray } from "drizzle-orm";
import { getDb } from "@/db";
import { products, orders, orderItems } from "@/db/schema";
import { decrementStock } from "@/lib/queries";

const bodySchema = z.object({
  customer: z.object({
    name: z.string().trim().min(1).max(256),
    email: z.string().trim().email().max(256),
    phone: z.string().trim().min(1).max(64),
    address: z.string().trim().min(1).max(2000),
  }),
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
    return NextResponse.json({ error: "Invalid order payload" }, { status: 400 });
  }

  const db = getDb();
  const ids = parsed.data.items.map((i) => i.productId);
  const rows = await db.select().from(products).where(inArray(products.id, ids));
  const byId = new Map(rows.map((p) => [p.id, p]));

  let totalCents = 0;
  const validatedItems: {
    productId: number;
    name: string;
    size?: string;
    color?: string;
    quantity: number;
    priceCents: number;
  }[] = [];

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
    totalCents += product.priceCents * item.quantity;
    validatedItems.push({
      productId: product.id,
      name: product.name,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      priceCents: product.priceCents,
    });
  }

  const [order] = await db
    .insert(orders)
    .values({
      customerName: parsed.data.customer.name,
      customerEmail: parsed.data.customer.email,
      customerPhone: parsed.data.customer.phone,
      address: parsed.data.customer.address,
      status: "pending",
      totalCents,
    })
    .returning();

  for (const item of validatedItems) {
    await db.insert(orderItems).values({
      orderId: order.id,
      productId: item.productId,
      name: item.name,
      size: item.size || null,
      color: item.color || null,
      quantity: item.quantity,
      priceCents: item.priceCents,
    });
    await decrementStock(item.productId, item.quantity);
  }

  return NextResponse.json({ orderId: order.id });
}
