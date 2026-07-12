"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/cart-context";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-4xl uppercase">Order Confirmed</h1>
      <p className="mt-4 font-tag text-sm text-hl-grey">
        Thanks for shopping HypeLocker. A confirmation has been sent to your
        email.
      </p>
      {sessionId && (
        <p className="mt-2 font-tag text-xs text-hl-grey break-all">
          Reference: {sessionId}
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
