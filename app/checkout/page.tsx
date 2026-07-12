"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalCents } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setName(data.user.name);
          setEmail(data.user.email);
        }
      })
      .catch(() => {});
  }, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name, email, phone, address },
          items: items.map((i) => ({
            productId: i.productId,
            size: i.size,
            color: i.color,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to place order");
      router.push(`/checkout/success?orderId=${data.orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl uppercase mb-2">Checkout</h1>
      <p className="mb-8 font-tag text-sm text-hl-grey uppercase">
        Cash on delivery — pay when your order arrives.
      </p>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
            Full Name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm normal-case text-hl-ink"
            />
          </label>
          <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm normal-case text-hl-ink"
            />
          </label>
          <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
            Phone
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm normal-case text-hl-ink"
            />
          </label>
          <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
            Delivery Address
            <textarea
              required
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm normal-case text-hl-ink"
            />
          </label>

          {error && <p className="font-tag text-sm text-hl-pink">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full border-2 border-black bg-hl-lime py-3 font-tag text-sm font-bold uppercase text-hl-bg disabled:opacity-60"
          >
            {loading ? "Placing Order…" : "Place Order — Pay on Delivery"}
          </button>
        </form>

        <div>
          <h2 className="font-tag text-xs uppercase text-hl-grey mb-3">
            Order Summary
          </h2>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div
                key={item.key}
                className="flex justify-between font-tag text-sm"
              >
                <span>
                  {item.quantity}× {item.name}
                  {item.size ? ` (${item.size})` : ""}
                </span>
                <span>{formatPrice(item.priceCents * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t-2 border-hl-ink pt-3 font-display text-xl">
            <span>Total</span>
            <span>{formatPrice(subtotalCents)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
