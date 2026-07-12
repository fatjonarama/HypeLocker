import { and, asc, desc, eq, gte, lte, sql as rawSql } from "drizzle-orm";
import { getDb } from "@/db";
import { products } from "@/db/schema";
import type { ProductDTO } from "@/lib/types";

export type ShopFilters = {
  gender?: "women" | "men" | "all";
  categories?: string[]; // shoes | eyewear
  subcategory?: string; // sneakers | boots | heels | sunglasses | optical
  sizes?: string[];
  minPrice?: number; // dollars
  maxPrice?: number; // dollars
  sort?: "newest" | "price-asc" | "price-desc";
};

export async function getNewInProducts(limit = 8): Promise<ProductDTO[]> {
  const db = getDb();
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.active, true))
    .orderBy(desc(products.createdAt))
    .limit(limit);
  return rows;
}

export async function getFilteredProducts(
  filters: ShopFilters
): Promise<ProductDTO[]> {
  const db = getDb();
  const conditions = [eq(products.active, true)];

  if (filters.gender && filters.gender !== "all") {
    conditions.push(eq(products.gender, filters.gender));
  }
  if (filters.minPrice !== undefined) {
    conditions.push(gte(products.priceCents, Math.round(filters.minPrice * 100)));
  }
  if (filters.maxPrice !== undefined) {
    conditions.push(lte(products.priceCents, Math.round(filters.maxPrice * 100)));
  }
  if (filters.subcategory) {
    conditions.push(eq(products.subcategory, filters.subcategory));
  }

  let rows = await db
    .select()
    .from(products)
    .where(and(...conditions))
    .orderBy(
      filters.sort === "price-asc"
        ? asc(products.priceCents)
        : filters.sort === "price-desc"
        ? desc(products.priceCents)
        : desc(products.createdAt)
    );

  if (filters.categories && filters.categories.length > 0) {
    rows = rows.filter((p) => filters.categories!.includes(p.category));
  }

  if (filters.sizes && filters.sizes.length > 0) {
    rows = rows.filter((p) =>
      p.sizes.some((s) => filters.sizes!.includes(s))
    );
  }

  return rows;
}

export async function getProductBySlug(
  slug: string
): Promise<ProductDTO | null> {
  const db = getDb();
  const rows = await db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.active, true)))
    .limit(1);
  return rows[0] ?? null;
}

export async function getAllSizesAvailable(): Promise<string[]> {
  const db = getDb();
  const rows = await db
    .select({ sizes: products.sizes })
    .from(products)
    .where(eq(products.active, true));
  const set = new Set<string>();
  for (const r of rows) for (const s of r.sizes) set.add(s);
  return Array.from(set).sort();
}

export async function decrementStock(productId: number, qty: number) {
  const db = getDb();
  await db
    .update(products)
    .set({ stock: rawSql`greatest(${products.stock} - ${qty}, 0)` })
    .where(eq(products.id, productId));
}
