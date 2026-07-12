"use client";

export type Gender = "all" | "women" | "men";

const STYLES: Record<
  Gender,
  { label: string; active: string; inactive: string }
> = {
  all: {
    label: "ALL",
    active: "bg-hl-ink text-hl-bg border-black",
    inactive: "bg-transparent text-hl-ink border-hl-ink",
  },
  women: {
    label: "WOMEN",
    active: "bg-hl-pink text-hl-bg border-black",
    inactive: "bg-transparent text-hl-pink border-hl-pink",
  },
  men: {
    label: "MEN",
    active: "bg-hl-blue text-hl-bg border-black",
    inactive: "bg-transparent text-hl-blue border-hl-blue",
  },
};

export function GenderPills({
  value,
  onChange,
  className = "",
}: {
  value: Gender;
  onChange: (g: Gender) => void;
  className?: string;
}) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {(Object.keys(STYLES) as Gender[]).map((g) => {
        const s = STYLES[g];
        const isActive = value === g;
        return (
          <button
            key={g}
            type="button"
            onClick={() => onChange(g)}
            className={`font-tag text-xs sm:text-sm font-bold uppercase px-4 py-1.5 rounded-full border-2 transition-colors ${
              isActive ? s.active : s.inactive
            }`}
            aria-pressed={isActive}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
