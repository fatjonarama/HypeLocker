"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotalCents } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            image: i.image,
            priceCents: i.priceCents,
            size: i.size,
            color: i.color,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Failed to start checkout");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-3xl uppercase">Your Cart is Empty</h1>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full border-2 border-black bg-hl-lime px-6 py-3 font-tag text-sm font-bold uppercase text-hl-bg"
        >
          Shop All
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl uppercase mb-8">Cart</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex gap-4 rounded-2xl border-[3px] border-black bg-hl-ink p-4 text-hl-bg"
          >
            <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="font-display text-lg uppercase leading-tight">
                  {item.name}
                </h3>
                <p className="font-tag text-xs text-hl-bg/60 uppercase">
                  {[item.size, item.color].filter(Boolean).join(" / ")}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-tag text-sm">
                  <button
                    onClick={() => updateQuantity(item.key, item.quantity - 1)}
                    className="h-7 w-7 rounded-full border-2 border-black"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.key, item.quantity + 1)}
                    className="h-7 w-7 rounded-full border-2 border-black"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-tag text-sm">
                    {formatPrice(item.priceCents * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeItem(item.key)}
                    className="font-tag text-xs uppercase text-hl-pink"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t-2 border-hl-ink pt-4">
        <span className="font-tag uppercase text-hl-grey">Subtotal</span>
        <span className="font-display text-2xl">
          {formatPrice(subtotalCents)}
        </span>
      </div>

      {error && (
        <p className="mt-4 font-tag text-sm text-hl-pink">{error}</p>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 w-full rounded-full border-2 border-black bg-hl-lime py-3 font-tag text-sm font-bold uppercase text-hl-bg disabled:opacity-60"
      >
        {loading ? "Redirecting…" : "Checkout"}
      </button>
    </main>
  );
}
