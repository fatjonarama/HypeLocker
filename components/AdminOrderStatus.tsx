"use client";

import { useState } from "react";

const STATUSES = ["pending", "paid", "cancelled"] as const;

export function AdminOrderStatus({
  orderId,
  status,
}: {
  orderId: number;
  status: string;
}) {
  const [current, setCurrent] = useState(status);
  const [saving, setSaving] = useState(false);

  const update = async (next: string) => {
    setSaving(true);
    setCurrent(next);
    await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setSaving(false);
  };

  return (
    <select
      value={current}
      disabled={saving}
      onChange={(e) => update(e.target.value)}
      className="rounded-full border-2 border-black bg-hl-ink px-3 py-1 font-tag text-xs font-bold uppercase text-hl-bg"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
