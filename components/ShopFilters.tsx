"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { GenderPills, type Gender } from "@/components/GenderPills";

const CATEGORY_OPTIONS = [{ value: "shoes", label: "Shoes & Sneakers" }];

const WOMEN_SIZES = ["36", "37", "38", "39", "40"];
const MEN_SIZES = ["40", "41", "42", "43", "45"];
const ALL_SIZES = Array.from(new Set([...WOMEN_SIZES, ...MEN_SIZES])).sort(
  (a, b) => Number(a) - Number(b)
);

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function ShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const gender = (searchParams.get("gender") as Gender) ?? "all";
  const categories = searchParams.get("category")?.split(",").filter(Boolean) ?? [];
  const sizes = searchParams.get("sizes")?.split(",").filter(Boolean) ?? [];
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const sort = searchParams.get("sort") ?? "newest";

  const update = (mutations: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(mutations)) {
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const toggleListValue = (key: string, list: string[], value: string) => {
    const next = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
    update({ [key]: next.length > 0 ? next.join(",") : null });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-tag text-xs uppercase text-hl-grey mb-3">Gender</h3>
        <GenderPills value={gender} onChange={(g) => update({ gender: g === "all" ? null : g })} />
      </div>

      <div>
        <h3 className="font-tag text-xs uppercase text-hl-grey mb-3">Category</h3>
        <div className="flex flex-col gap-2">
          {CATEGORY_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 font-tag text-sm">
              <input
                type="checkbox"
                checked={categories.includes(opt.value)}
                onChange={() => toggleListValue("category", categories, opt.value)}
                className="h-4 w-4 accent-hl-lime"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-tag text-xs uppercase text-hl-grey mb-3">Size (EU)</h3>
        <div className="flex flex-wrap gap-2">
          {(gender === "women" ? WOMEN_SIZES : gender === "men" ? MEN_SIZES : ALL_SIZES).map((size) => {
            const active = sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleListValue("sizes", sizes, size)}
                className={`rounded-full border-2 px-3 py-1 font-tag text-xs uppercase ${
                  active
                    ? "border-black bg-hl-ink text-hl-bg"
                    : "border-hl-ink text-hl-ink"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-tag text-xs uppercase text-hl-grey mb-3">Price</h3>
        <div className="flex items-center gap-2 font-tag text-sm">
          <input
            type="number"
            placeholder="Min"
            defaultValue={minPrice}
            onBlur={(e) => update({ minPrice: e.target.value || null })}
            className="w-20 rounded-md border-2 border-hl-ink bg-transparent px-2 py-1"
          />
          <span>–</span>
          <input
            type="number"
            placeholder="Max"
            defaultValue={maxPrice}
            onBlur={(e) => update({ maxPrice: e.target.value || null })}
            className="w-20 rounded-md border-2 border-hl-ink bg-transparent px-2 py-1"
          />
        </div>
      </div>

      <div>
        <h3 className="font-tag text-xs uppercase text-hl-grey mb-3">Sort</h3>
        <select
          value={sort}
          onChange={(e) => update({ sort: e.target.value === "newest" ? null : e.target.value })}
          className="w-full rounded-md border-2 border-hl-ink bg-hl-bg px-2 py-2 font-tag text-sm"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
