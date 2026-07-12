"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/context/wishlist-context";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import type { ProductDTO } from "@/lib/types";

export function ProductCard({ product }: { product: ProductDTO }) {
  const { isWishlisted, toggle } = useWishlist();
  const { addItem } = useCart();

  const onSale =
    product.compareAtCents !== null &&
    product.compareAtCents > product.priceCents;

  const wishlisted = isWishlisted(product.id);
  const image = product.images[0] ?? "/placeholder.png";

  const quickAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image,
      priceCents: product.priceCents,
      size: product.sizes[0],
      color: product.colors[0],
    });
  };

  return (
    <div className="group relative rounded-2xl border-[3px] border-black bg-hl-ink text-hl-bg overflow-hidden">
      <Link
        href={`/product/${product.slug}`}
        className="absolute inset-0 z-0"
        aria-label={product.name}
      />

      {product.isNew && (
        <span className="absolute top-3 left-3 z-10 -rotate-6 rounded-full border-2 border-black bg-hl-lime px-3 py-1 font-tag text-xs font-bold uppercase pointer-events-none">
          New
        </span>
      )}
      {!product.isNew && onSale && (
        <span className="absolute top-3 left-3 z-10 -rotate-6 rounded-full border-2 border-black bg-hl-pink px-3 py-1 font-tag text-xs font-bold uppercase text-hl-ink pointer-events-none">
          Sale
        </span>
      )}

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggle(product.id);
        }}
        className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-hl-ink"
        aria-pressed={wishlisted}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <span
          className={wishlisted ? "text-hl-pink" : "text-hl-bg/40"}
          aria-hidden
        >
          ♥
        </span>
      </button>

      <div className="relative aspect-[4/5] w-full bg-hl-grey/20">
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      <div className="relative z-10 pointer-events-none p-4">
        <h3 className="font-display text-lg leading-tight uppercase">
          {product.name}
        </h3>
        <div className="mt-1 flex items-baseline gap-2 font-tag text-sm">
          <span>{formatPrice(product.priceCents)}</span>
          {onSale && (
            <span className="text-hl-bg/40 line-through">
              {formatPrice(product.compareAtCents!)}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          quickAdd();
        }}
        className="absolute inset-x-3 bottom-3 z-10 translate-y-[150%] rounded-full border-2 border-black bg-black py-2 font-tag text-xs font-bold uppercase text-hl-ink transition-transform duration-200 group-hover:translate-y-0"
      >
        + Quick Add
      </button>
    </div>
  );
}
