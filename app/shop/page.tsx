import { Suspense } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ShopFilters } from "@/components/ShopFilters";
import { getFilteredProducts, getAllSizesAvailable } from "@/lib/queries";

export const dynamic = "force-dynamic";

type SearchParams = {
  gender?: string;
  category?: string;
  subcategory?: string;
  sizes?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const [products, availableSizes] = await Promise.all([
    getFilteredProducts({
      gender: (sp.gender as "women" | "men" | "all") ?? "all",
      categories: sp.category?.split(",").filter(Boolean),
      subcategory: sp.subcategory,
      sizes: sp.sizes?.split(",").filter(Boolean),
      minPrice: sp.minPrice ? parseFloat(sp.minPrice) : undefined,
      maxPrice: sp.maxPrice ? parseFloat(sp.maxPrice) : undefined,
      sort: (sp.sort as "newest" | "price-asc" | "price-desc") ?? "newest",
    }),
    getAllSizesAvailable(),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl uppercase mb-8">Shop</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
        <aside>
          <Suspense fallback={null}>
            <ShopFilters availableSizes={availableSizes} />
          </Suspense>
        </aside>
        <section>
          <p className="mb-4 font-tag text-xs uppercase text-hl-grey">
            {products.length} {products.length === 1 ? "item" : "items"}
          </p>
          {products.length === 0 ? (
            <p className="font-tag text-sm text-hl-grey">
              No products match these filters.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
