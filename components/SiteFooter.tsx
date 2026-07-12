import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t-[3px] border-black bg-hl-bg mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div>
          <h4 className="font-tag text-xs uppercase text-hl-grey mb-3">Shop</h4>
          <div className="flex flex-col gap-2 font-tag text-sm">
            <Link href="/shop?gender=women">Women&apos;s</Link>
            <Link href="/shop?gender=men">Men&apos;s</Link>
            <Link href="/shop?subcategory=sunglasses">Sunglasses</Link>
            <Link href="/shop?subcategory=optical">Optical</Link>
          </div>
        </div>
        <div>
          <h4 className="font-tag text-xs uppercase text-hl-grey mb-3">Help</h4>
          <div className="flex flex-col gap-2 font-tag text-sm">
            <Link href="/cart">Cart</Link>
            <Link href="/shop">Shop All</Link>
          </div>
        </div>
        <div className="col-span-2">
          <h4 className="font-display text-xl uppercase mb-2">HypeLocker</h4>
          <p className="font-tag text-xs text-hl-grey">
            Wear loud. Move fast. © {new Date().getFullYear()} HypeLocker.
          </p>
        </div>
      </div>
    </footer>
  );
}
