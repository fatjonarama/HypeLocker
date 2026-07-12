import { desc } from "drizzle-orm";
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
