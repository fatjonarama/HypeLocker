"use client";

import { useState } from "react";
import type { ProductDTO } from "@/lib/types";

export function AdminStockRow({ product }: { product: ProductDTO }) {
  const [stock, setStock] = useState(product.stock);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    await fetch(`/api/admin/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <tr className="border-b border-hl-ink/20">
      <td className="py-2 pr-4 font-tag text-sm">{product.name}</td>
      <td className="py-2 pr-4 font-tag text-xs text-hl-grey">{product.slug}</td>
      <td className="py-2 pr-4">
        <input
          type="number"
          min={0}
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value || "0", 10))}
          className="w-20 rounded-md border-2 border-hl-ink bg-transparent px-2 py-1 font-tag text-sm"
        />
      </td>
      <td className="py-2">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-full border-2 border-black bg-hl-lime px-3 py-1 font-tag text-xs font-bold uppercase text-hl-bg disabled:opacity-60"
        >
          {saved ? "Saved ✓" : saving ? "Saving…" : "Save"}
        </button>
      </td>
    </tr>
  );
}
