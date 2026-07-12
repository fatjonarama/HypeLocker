import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { products } from "@/db/schema";

const bodySchema = z.object({
  slug: z.string().trim().min(1).max(256).optional(),
  name: z.string().trim().min(1).max(256).optional(),
  category: z.enum(["shoes", "eyewear"]).optional(),
  subcategory: z.enum(["sneakers", "boots", "heels", "sunglasses", "optical"]).optional(),
  gender: z.enum(["women", "men", "unisex"]).optional(),
  priceCents: z.number().int().min(0).optional(),
  compareAtCents: z.number().int().min(0).nullable().optional(),
  description: z.string().max(5000).optional(),
  images: z.array(z.string().url()).optional(),
  sizes: z.array(z.string()).optional(),
  stock: z.number().int().min(0).optional(),
  isNew: z.boolean().optional(),
  active: z.boolean().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const productId = parseInt(id, 10);
  if (Number.isNaN(productId)) {
    return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid product data" }, { status: 400 });
  }

  const db = getDb();
  await db.update(products).set(parsed.data).where(eq(products.id, productId));

  return NextResponse.json({ ok: true });
}
