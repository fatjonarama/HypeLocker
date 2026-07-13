import { and, asc, desc, eq, gte, inArray, lte, or, sql as rawSql } from "drizzle-orm";
import { getDb } from "@/db";
import { products, orders, orderItems } from "@/db/schema";
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
    conditions.push(
      or(eq(products.gender, filters.gender), eq(products.gender, "unisex"))!
    );
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

export async function decrementStock(productId: number, qty: number) {
  const db = getDb();
  await db
    .update(products)
    .set({ stock: rawSql`greatest(${products.stock} - ${qty}, 0)` })
    .where(eq(products.id, productId));
}

export async function getOrdersForUser(userId: number) {
  const db = getDb();
  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));

  const orderIds = userOrders.map((o) => o.id);
  if (orderIds.length === 0) return [];

  const items = await db
    .select()
    .from(orderItems)
    .where(inArray(orderItems.orderId, orderIds));

  const itemsByOrder = new Map<number, typeof items>();
  for (const item of items) {
    const list = itemsByOrder.get(item.orderId) ?? [];
    list.push(item);
    itemsByOrder.set(item.orderId, list);
  }

  return userOrders.map((order) => ({
    ...order,
    items: itemsByOrder.get(order.id) ?? [],
  }));
}
