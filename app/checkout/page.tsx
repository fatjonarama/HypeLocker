"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";

function FlagKosovo() {
  return (
    <svg viewBox="0 0 20 14" width="20" height="14" aria-hidden="true">
      <rect width="20" height="14" fill="#244AA5" />
      <path d="M8 5.5c1.4-1 2.6-1 4 0 .6.5 1.3.7 2 .4-.7 1.6-2.2 2.6-4 2.6s-3.3-1-4-2.6c.7.3 1.4.1 2-.4z" fill="#E0A82E" />
      <g fill="#fff">
        <circle cx="4.4" cy="3" r="0.55" />
        <circle cx="7" cy="2.2" r="0.55" />
        <circle cx="10" cy="2" r="0.55" />
        <circle cx="13" cy="2.2" r="0.55" />
        <circle cx="15.6" cy="3" r="0.55" />
        <circle cx="10" cy="4.4" r="0.55" />
      </g>
    </svg>
  );
}

function FlagAlbania() {
  return (
    <svg viewBox="0 0 20 14" width="20" height="14" aria-hidden="true">
      <rect width="20" height="14" fill="#DE1F2D" />
      <g fill="#111">
        <path d="M10 3.6 8.7 5l.4 1.4-1.3-.7-1.2.9.2-1.5-1.3-.8 1.5-.2.5-1.4.7 1.3z" />
        <path d="M10 3.6l1.3 1.4-.4 1.4 1.3-.7 1.2.9-.2-1.5 1.3-.8-1.5-.2-.5-1.4-.7 1.3z" />
        <circle cx="10" cy="5.6" r="0.7" />
        <path d="M10 6.3v3.4M8.6 9.2h2.8M8.9 8.2h2.2" stroke="#111" strokeWidth="0.35" fill="none" />
      </g>
    </svg>
  );
}

function FlagNorthMacedonia() {
  return (
    <svg viewBox="0 0 20 14" width="20" height="14" aria-hidden="true">
      <rect width="20" height="14" fill="#D20000" />
      <g fill="#FFE600">
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x="9.4"
            y="0.5"
            width="1.2"
            height="13"
            transform={`rotate(${i * 22.5} 10 7)`}
          />
        ))}
        <circle cx="10" cy="7" r="2.2" fill="#FFE600" />
      </g>
    </svg>
  );
}

const PHONE_CODES: { code: string; flag: () => React.JSX.Element; label: string }[] = [
  { code: "+383", flag: FlagKosovo, label: "Kosovo" },
  { code: "+355", flag: FlagAlbania, label: "Albania" },
  { code: "+389", flag: FlagNorthMacedonia, label: "North Macedonia" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalCents } = useCart();
  const [name, setName] = useState("");
  const [phoneCode, setPhoneCode] = useState("+383");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("kosovo");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState(""); // honeypot, left empty by real users

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setName(data.user.name);
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
          customer: {
            name,
            phone: `${phoneCode} ${phone}`.trim(),
            address,
            country,
            notes,
            website,
          },
          items: items.map((i) => ({
            productId: i.productId,
            size: i.size,
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
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
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
            Phone Number
            <div className="flex gap-2">
              <div className="relative">
                <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 overflow-hidden rounded-[2px]">
                  {(() => {
                    const Flag =
                      PHONE_CODES.find((c) => c.code === phoneCode)?.flag ??
                      FlagKosovo;
                    return <Flag />;
                  })()}
                </span>
                <select
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  aria-label="Country code"
                  className="rounded-md border-2 border-hl-ink bg-hl-bg py-2 pl-8 pr-2 font-body text-sm normal-case text-hl-ink"
                >
                  {PHONE_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>
              </div>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="44 123 456"
                className="w-full min-w-0 rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm normal-case text-hl-ink"
              />
            </div>
          </label>
          <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
            Country
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-md border-2 border-hl-ink bg-hl-bg px-3 py-2 font-body text-sm normal-case text-hl-ink"
            >
              <option value="kosovo">Kosovo</option>
              <option value="albania">Albania</option>
              <option value="macedonia">North Macedonia</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
            Home Address
            <textarea
              required
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm normal-case text-hl-ink"
            />
          </label>
          <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
            Notes (optional)
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. leave with neighbor, call before delivery..."
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
