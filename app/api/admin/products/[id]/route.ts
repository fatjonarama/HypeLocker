import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { products } from "@/db/schema";

const bodySchema = z.object({
  stock: z.number().int().min(0),
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
    return NextResponse.json({ error: "Invalid stock value" }, { status: 400 });
  }

  const db = getDb();
  await db
    .update(products)
    .set({ stock: parsed.data.stock })
    .where(eq(products.id, productId));

  return NextResponse.json({ ok: true });
}
