import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { getOrdersForUser } from "@/lib/queries";
import { formatPrice } from "@/lib/format";
import { LogoutButton } from "@/components/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await getSessionUser();
  if (!session) redirect("/login");

  const orders = await getOrdersForUser(session.userId);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl uppercase">My Account</h1>
          <p className="font-tag text-sm text-hl-grey">
            {session.name} · {session.email}
          </p>
        </div>
        <LogoutButton />
      </div>

      <h2 className="font-display text-2xl uppercase mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p className="font-tag text-sm text-hl-grey">
          No orders yet — your placed orders will show up here.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border-2 border-hl-ink/30 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 font-tag text-sm">
                <span>Order #{order.id}</span>
                <span className="uppercase text-hl-lime">{order.status}</span>
                <span>{formatPrice(order.totalCents)}</span>
                <span className="text-hl-grey">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <ul className="mt-2 space-y-1 font-tag text-xs text-hl-grey">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.quantity}× {item.name}
                    {item.size ? ` (${item.size})` : ""}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
