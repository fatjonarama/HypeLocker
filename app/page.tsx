import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getNewInProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

const TILES = [
  {
    label: "Women's",
    href: "/shop?gender=women",
    gradient: "from-hl-pink to-hl-bg",
  },
  {
    label: "Men's",
    href: "/shop?gender=men",
    gradient: "from-hl-blue to-hl-bg",
  },
  {
    label: "Sunglasses",
    href: "/shop?subcategory=sunglasses",
    gradient: "from-hl-orange to-hl-bg",
  },
  {
    label: "Optical",
    href: "/shop?subcategory=optical",
    gradient: "from-hl-lime to-hl-bg",
  },
];

export default async function HomePage() {
  const newIn = await getNewInProducts(8);

  return (
    <main>
      <section className="relative overflow-hidden">
        <div
          className="hero-gradient pointer-events-none absolute inset-0 opacity-30 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="font-display uppercase leading-[0.9] text-[15vw] sm:text-[9vw] lg:text-[7.5rem]">
            <span className="block">Wear</span>
            <span className="block">Loud.</span>
            <span
              className="block text-transparent"
              style={{ WebkitTextStroke: "2px #F3F1E8" }}
            >
              Move Fast.
            </span>
          </h1>
          <p className="mt-6 max-w-md font-tag text-sm text-hl-grey uppercase">
            Shoes + eyewear. Streetwear style. New drops every week.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block rounded-full border-2 border-black bg-hl-lime px-6 py-3 font-tag text-sm font-bold uppercase text-hl-bg"
          >
            Shop All
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TILES.map((tile) => (
            <Link
              key={tile.label}
              href={tile.href}
              className={`relative flex aspect-square items-end rounded-2xl border-[3px] border-black bg-gradient-to-br ${tile.gradient} p-4`}
            >
              <span className="font-display text-xl uppercase text-hl-ink sm:text-2xl">
                {tile.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-3xl uppercase sm:text-4xl">
            New In
          </h2>
          <Link href="/shop" className="font-tag text-sm uppercase underline">
            View All
          </Link>
        </div>
        {newIn.length === 0 ? (
          <p className="font-tag text-sm text-hl-grey">
            No products yet — run{" "}
            <code className="text-hl-ink">npm run seed</code> to load your
            catalog.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {newIn.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
