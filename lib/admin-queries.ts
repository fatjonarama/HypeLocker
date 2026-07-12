import { desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { orders, orderItems, products } from "@/db/schema";

export async function getAllOrdersWithItems() {
  const db = getDb();
  const allOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt));

  const allItems = await db.select().from(orderItems);
  const itemsByOrder = new Map<number, typeof allItems>();
  for (const item of allItems) {
    const list = itemsByOrder.get(item.orderId) ?? [];
    list.push(item);
    itemsByOrder.set(item.orderId, list);
  }

  return allOrders.map((order) => ({
    ...order,
    items: itemsByOrder.get(order.id) ?? [],
  }));
}

export async function getAllProductsForAdmin() {
  const db = getDb();
  return db.select().from(products).orderBy(desc(products.createdAt));
}

export async function getProductByIdForAdmin(id: number) {
  const db = getDb();
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getSalesSummary() {
  const db = getDb();

  const [revenue] = await db
    .select({
      totalRevenueCents: sql<number>`coalesce(sum(${orders.totalCents}) filter (where ${orders.status} = 'paid'), 0)`,
      totalOrders: sql<number>`count(*)`,
      pendingOrders: sql<number>`count(*) filter (where ${orders.status} = 'pending')`,
    })
    .from(orders);

  const topProducts = await db
    .select({
      productId: orderItems.productId,
      name: orderItems.name,
      totalQuantity: sql<number>`sum(${orderItems.quantity})`,
    })
    .from(orderItems)
    .groupBy(orderItems.productId, orderItems.name)
    .orderBy(desc(sql`sum(${orderItems.quantity})`))
    .limit(5);

  return {
    totalRevenueCents: Number(revenue?.totalRevenueCents ?? 0),
    totalOrders: Number(revenue?.totalOrders ?? 0),
    pendingOrders: Number(revenue?.pendingOrders ?? 0),
    topProducts: topProducts.map((p) => ({
      ...p,
      totalQuantity: Number(p.totalQuantity),
    })),
  };
}
