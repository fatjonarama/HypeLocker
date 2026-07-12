const MESSAGES = [
  "FREE SHIPPING OVER $100",
  "NEW DROPS WEEKLY",
  "WEAR LOUD. MOVE FAST.",
  "SHOES + EYEWEAR, STREETWEAR STYLE",
];

export function Marquee() {
  const strip = MESSAGES.join("   ★   ") + "   ★   ";

  return (
    <div className="w-full overflow-hidden bg-hl-lime text-hl-bg border-b-[3px] border-black">
      <div className="flex whitespace-nowrap py-2 animate-marquee">
        <span className="font-tag text-xs sm:text-sm font-bold tracking-wide uppercase px-2">
          {strip.repeat(4)}
        </span>
      </div>
    </div>
  );
}
