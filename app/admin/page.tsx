import Link from "next/link";
import {
  getAllOrdersWithItems,
  getAllProductsForAdmin,
  getSalesSummary,
} from "@/lib/admin-queries";
import { AdminStockRow } from "@/components/AdminStockRow";
import { AdminOrderStatus } from "@/components/AdminOrderStatus";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [orders, adminProducts, summary] = await Promise.all([
    getAllOrdersWithItems(),
    getAllProductsForAdmin(),
    getSalesSummary(),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-4xl uppercase">Admin</h1>
        <Link
          href="/admin/products"
          className="rounded-full border-2 border-black bg-hl-lime px-4 py-2 font-tag text-xs font-bold uppercase text-hl-bg"
        >
          Manage Products
        </Link>
      </div>

      <section className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border-2 border-hl-ink/30 p-4">
          <p className="font-tag text-xs uppercase text-hl-grey">Revenue (Paid)</p>
          <p className="font-display text-2xl">{formatPrice(summary.totalRevenueCents)}</p>
        </div>
        <div className="rounded-2xl border-2 border-hl-ink/30 p-4">
          <p className="font-tag text-xs uppercase text-hl-grey">Total Orders</p>
          <p className="font-display text-2xl">{summary.totalOrders}</p>
        </div>
        <div className="rounded-2xl border-2 border-hl-ink/30 p-4">
          <p className="font-tag text-xs uppercase text-hl-grey">Pending (COD)</p>
          <p className="font-display text-2xl">{summary.pendingOrders}</p>
        </div>
        <div className="rounded-2xl border-2 border-hl-ink/30 p-4">
          <p className="font-tag text-xs uppercase text-hl-grey mb-1">Best Sellers</p>
          {summary.topProducts.length === 0 ? (
            <p className="font-tag text-xs text-hl-grey">No sales yet</p>
          ) : (
            <ul className="font-tag text-xs">
              {summary.topProducts.map((p) => (
                <li key={p.productId}>
                  {p.name} — {p.totalQuantity} sold
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="font-display text-2xl uppercase mb-4">Orders</h2>
        {orders.length === 0 ? (
          <p className="font-tag text-sm text-hl-grey">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border-2 border-hl-ink/30 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 font-tag text-sm">
                  <div>
                    <p>
                      Order #{order.id} · {order.customerName}
                    </p>
                    <p className="text-hl-grey">
                      {order.customerPhone}
                      {order.customerEmail ? ` · ${order.customerEmail}` : ""}
                    </p>
                  </div>
                  <AdminOrderStatus orderId={order.id} status={order.status} />
                  <span>{formatPrice(order.totalCents)}</span>
                  <span className="text-hl-grey">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 whitespace-pre-line font-tag text-xs text-hl-grey">
                  {order.address} — {order.country}
                </p>
                {order.notes && (
                  <p className="mt-1 font-tag text-xs text-hl-lime">
                    Note: {order.notes}
                  </p>
                )}
                <ul className="mt-2 space-y-1 font-tag text-xs text-hl-grey">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.quantity}× {item.name}
                      {item.size ? ` (${item.size})` : ""} —{" "}
                      {formatPrice(item.priceCents * item.quantity)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase mb-4">Quick Stock Edit</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-hl-ink font-tag text-xs uppercase text-hl-grey">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Slug</th>
                <th className="py-2 pr-4">Stock</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {adminProducts.map((p) => (
                <AdminStockRow key={p.id} product={p} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
