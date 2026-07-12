import { getAllOrdersWithItems, getAllProductsForAdmin } from "@/lib/admin-queries";
import { AdminStockRow } from "@/components/AdminStockRow";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [orders, adminProducts] = await Promise.all([
    getAllOrdersWithItems(),
    getAllProductsForAdmin(),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl uppercase mb-8">Admin</h1>

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
                  <span>{order.email ?? "No email"}</span>
                  <span className="uppercase text-hl-lime">{order.status}</span>
                  <span>{formatPrice(order.totalCents)}</span>
                  <span className="text-hl-grey">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
                <ul className="mt-2 space-y-1 font-tag text-xs text-hl-grey">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.quantity}× {item.name}
                      {item.size ? ` (${item.size})` : ""}
                      {item.color ? ` [${item.color}]` : ""} —{" "}
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
        <h2 className="font-display text-2xl uppercase mb-4">Stock</h2>
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
