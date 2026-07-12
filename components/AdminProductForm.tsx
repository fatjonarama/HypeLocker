"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { ProductDTO } from "@/lib/types";

const CATEGORIES = ["shoes", "eyewear"] as const;
const SUBCATEGORIES = ["sneakers", "boots", "heels", "sunglasses", "optical"] as const;
const GENDERS = ["women", "men", "unisex"] as const;

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function AdminProductForm({ product }: { product?: ProductDTO }) {
  const router = useRouter();
  const isEdit = !!product;

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [category, setCategory] = useState<string>(product?.category ?? "shoes");
  const [subcategory, setSubcategory] = useState<string>(product?.subcategory ?? "sneakers");
  const [gender, setGender] = useState<string>(product?.gender ?? "unisex");
  const [price, setPrice] = useState(product ? (product.priceCents / 100).toString() : "");
  const [compareAtPrice, setCompareAtPrice] = useState(
    product?.compareAtCents ? (product.compareAtCents / 100).toString() : ""
  );
  const [description, setDescription] = useState(product?.description ?? "");
  const [sizes, setSizes] = useState<string[]>(product?.sizes ?? []);
  const [sizeInput, setSizeInput] = useState("");
  const [stock, setStock] = useState(product?.stock ?? 0);
  const [isNew, setIsNew] = useState(product?.isNew ?? false);
  const [active, setActive] = useState(product?.active ?? true);
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onNameChange = (v: string) => {
    setName(v);
    if (!slugTouched) setSlug(slugify(v));
  };

  const onFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload failed");
        uploaded.push(data.url);
      }
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const addSize = () => {
    const s = sizeInput.trim();
    if (s && !sizes.includes(s)) setSizes([...sizes, s]);
    setSizeInput("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      slug,
      name,
      category,
      subcategory,
      gender,
      priceCents: Math.round(parseFloat(price || "0") * 100),
      compareAtCents: compareAtPrice ? Math.round(parseFloat(compareAtPrice) * 100) : null,
      description,
      images,
      sizes,
      stock,
      isNew,
      active,
    };

    const res = await fetch(
      isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Failed to save product");
      setSaving(false);
      return;
    }

    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
          Name
          <input
            required
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm normal-case text-hl-ink"
          />
        </label>
        <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
          Slug
          <input
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm normal-case text-hl-ink"
          />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border-2 border-hl-ink bg-hl-bg px-3 py-2 font-body text-sm text-hl-ink"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
          Subcategory
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="rounded-md border-2 border-hl-ink bg-hl-bg px-3 py-2 font-body text-sm text-hl-ink"
          >
            {SUBCATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
          Gender
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="rounded-md border-2 border-hl-ink bg-hl-bg px-3 py-2 font-body text-sm text-hl-ink"
          >
            {GENDERS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
          Price ($)
          <input
            required
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm text-hl-ink"
          />
        </label>
        <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
          Compare-at ($)
          <input
            type="number"
            step="0.01"
            min="0"
            value={compareAtPrice}
            onChange={(e) => setCompareAtPrice(e.target.value)}
            placeholder="For sale pricing"
            className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm text-hl-ink"
          />
        </label>
        <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
          Stock
          <input
            required
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value || "0", 10))}
            className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm text-hl-ink"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
        Description
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm normal-case text-hl-ink"
        />
      </label>

      <div>
        <h3 className="font-tag text-xs uppercase text-hl-grey mb-2">Sizes (EU)</h3>
        <div className="flex flex-wrap items-center gap-2">
          {sizes.map((s) => (
            <span
              key={s}
              className="flex items-center gap-2 rounded-full border-2 border-hl-ink px-3 py-1 font-tag text-xs uppercase"
            >
              {s}
              <button
                type="button"
                onClick={() => setSizes(sizes.filter((x) => x !== s))}
                className="text-hl-pink"
              >
                ×
              </button>
            </span>
          ))}
          <input
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSize();
              }
            }}
            placeholder="e.g. 42 or ONE SIZE"
            className="w-32 rounded-md border-2 border-hl-ink bg-transparent px-2 py-1 font-body text-sm text-hl-ink"
          />
          <button
            type="button"
            onClick={addSize}
            className="rounded-full border-2 border-hl-ink px-3 py-1 font-tag text-xs uppercase"
          >
            + Add
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-tag text-xs uppercase text-hl-grey mb-2">Photos</h3>
        <div className="flex flex-wrap gap-3 mb-3">
          {images.map((img) => (
            <div key={img} className="relative h-20 w-20 overflow-hidden rounded-lg border-2 border-hl-ink">
              <Image src={img} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => setImages(images.filter((x) => x !== img))}
                className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-bl bg-hl-pink text-xs text-hl-bg"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => onFilesSelected(e.target.files)}
          disabled={uploading}
        />
        {uploading && <p className="mt-1 font-tag text-xs text-hl-grey">Uploading…</p>}
      </div>

      <div className="flex gap-6 font-tag text-sm uppercase">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
          New
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          Active (visible in shop)
        </label>
      </div>

      {error && <p className="font-tag text-sm text-hl-pink">{error}</p>}

      <button
        type="submit"
        disabled={saving || uploading}
        className="w-fit rounded-full border-2 border-black bg-hl-lime px-6 py-3 font-tag text-sm font-bold uppercase text-hl-bg disabled:opacity-60"
      >
        {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
      </button>
    </form>
  );
}
