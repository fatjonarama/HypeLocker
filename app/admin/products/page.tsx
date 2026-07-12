import Link from "next/link";
import { getAllProductsForAdmin } from "@/lib/admin-queries";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProductsForAdmin();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-4xl uppercase">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full border-2 border-black bg-hl-lime px-4 py-2 font-tag text-xs font-bold uppercase text-hl-bg"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-hl-ink font-tag text-xs uppercase text-hl-grey">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Price</th>
              <th className="py-2 pr-4">Stock</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-hl-ink/20 font-tag text-sm">
                <td className="py-2 pr-4">{p.name}</td>
                <td className="py-2 pr-4">{formatPrice(p.priceCents)}</td>
                <td className="py-2 pr-4">{p.stock}</td>
                <td className="py-2 pr-4">
                  <span className={p.active ? "text-hl-lime" : "text-hl-grey"}>
                    {p.active ? "active" : "inactive"}
                  </span>
                </td>
                <td className="py-2">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="rounded-full border-2 border-hl-ink px-3 py-1 font-tag text-xs uppercase"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
