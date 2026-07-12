"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import type { ProductDTO } from "@/lib/types";

export function ProductDetail({ product }: { product: ProductDTO }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | undefined>(product.sizes[0]);
  const [added, setAdded] = useState(false);

  const onSale =
    product.compareAtCents !== null &&
    product.compareAtCents > product.priceCents;

  const outOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? "/placeholder.png",
      priceCents: product.priceCents,
      size,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 md:grid-cols-2">
      <div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border-[3px] border-black bg-hl-grey/20">
          <Image
            src={product.images[activeImage] ?? "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={img + i}
                onClick={() => setActiveImage(i)}
                className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 ${
                  i === activeImage ? "border-hl-lime" : "border-hl-ink/30"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => router.back()}
          className="mb-4 font-tag text-xs uppercase text-hl-grey"
        >
          ← Back
        </button>
        <h1 className="font-display text-3xl uppercase sm:text-4xl">
          {product.name}
        </h1>
        <div className="mt-3 flex items-baseline gap-3 font-tag text-lg">
          <span>{formatPrice(product.priceCents)}</span>
          {onSale && (
            <span className="text-hl-grey line-through">
              {formatPrice(product.compareAtCents!)}
            </span>
          )}
        </div>

        {product.sizes.length > 0 && (
          <div className="mt-6">
            <h3 className="font-tag text-xs uppercase text-hl-grey mb-2">
              Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-full border-2 px-3 py-1 font-tag text-xs uppercase ${
                    size === s
                      ? "border-black bg-hl-ink text-hl-bg"
                      : "border-hl-ink text-hl-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={outOfStock}
          className="mt-8 w-full rounded-full border-2 border-black bg-hl-lime py-3 font-tag text-sm font-bold uppercase text-hl-bg disabled:cursor-not-allowed disabled:bg-hl-grey"
        >
          {outOfStock ? "Out of Stock" : added ? "Added ✓" : "Add to Cart"}
        </button>

        {product.description && (
          <div className="mt-8">
            <h3 className="font-tag text-xs uppercase text-hl-grey mb-2">
              Description
            </h3>
            <p className="text-sm leading-relaxed">
              {product.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
