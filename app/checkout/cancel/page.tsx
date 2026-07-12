import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-4xl uppercase">Checkout Cancelled</h1>
      <p className="mt-4 font-tag text-sm text-hl-grey">
        No worries — your cart is still saved.
      </p>
      <Link
        href="/cart"
        className="mt-8 inline-block rounded-full border-2 border-black bg-hl-lime px-6 py-3 font-tag text-sm font-bold uppercase text-hl-bg"
      >
        Back to Cart
      </Link>
    </main>
  );
}
