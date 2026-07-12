"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { GenderPills, type Gender } from "@/components/GenderPills";
import { useCart } from "@/context/cart-context";

export function SiteHeader({
  user,
}: {
  user: { name: string; isAdmin: boolean } | null;
}) {
  const router = useRouter();
  const { count } = useCart();

  const goToGender = (g: Gender) => {
    router.push(g === "all" ? "/shop" : `/shop?gender=${g}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-black bg-hl-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="font-display text-2xl sm:text-3xl uppercase tracking-tight">
          HypeLocker
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-tag text-sm uppercase">
          <Link href="/shop?category=shoes">Sneakers</Link>
        </nav>

        <div className="flex items-center gap-3">
          <GenderPills value="all" onChange={goToGender} className="hidden sm:flex" />
          {user ? (
            <>
              {user.isAdmin && (
                <Link
                  href="/admin"
                  className="rounded-full border-2 border-black bg-hl-lime px-3 py-1.5 font-tag text-xs font-bold uppercase text-hl-bg"
                >
                  Admin
                </Link>
              )}
              <Link href="/account" className="font-tag text-xs uppercase hidden sm:inline">
                {user.name}
              </Link>
            </>
          ) : (
            <Link href="/login" className="font-tag text-xs uppercase hidden sm:inline">
              Login
            </Link>
          )}
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-hl-ink font-tag"
            aria-label="Cart"
          >
            🛍
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-hl-lime text-hl-bg text-[10px] font-bold">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
