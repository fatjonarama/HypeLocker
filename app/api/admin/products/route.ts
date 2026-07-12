import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { products } from "@/db/schema";

const bodySchema = z.object({
  slug: z.string().trim().min(1).max(256),
  name: z.string().trim().min(1).max(256),
  category: z.enum(["shoes", "eyewear"]),
  subcategory: z.enum(["sneakers", "boots", "heels", "sunglasses", "optical"]),
  gender: z.enum(["women", "men", "unisex"]),
  priceCents: z.number().int().min(0),
  compareAtCents: z.number().int().min(0).nullable().optional(),
  description: z.string().max(5000).optional(),
  images: z.array(z.string().url()).optional(),
  sizes: z.array(z.string()).optional(),
  stock: z.number().int().min(0).optional(),
  isNew: z.boolean().optional(),
  active: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  const parsed = bodySchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid product data", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const db = getDb();
  const [product] = await db.insert(products).values(parsed.data).returning();

  return NextResponse.json({ id: product.id });
}
