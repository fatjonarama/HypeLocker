"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/cart-context";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-4xl uppercase">Order Placed</h1>
      <p className="mt-4 font-tag text-sm text-hl-grey">
        Thanks for shopping HypeLocker. We&apos;ll be in touch to arrange
        delivery — pay in cash when your order arrives.
      </p>
      {orderId && (
        <p className="mt-2 font-tag text-xs text-hl-grey">
          Order #{orderId}
        </p>
      )}
      <Link
        href="/shop"
        className="mt-8 inline-block rounded-full border-2 border-black bg-hl-lime px-6 py-3 font-tag text-sm font-bold uppercase text-hl-bg"
      >
        Keep Shopping
      </Link>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
