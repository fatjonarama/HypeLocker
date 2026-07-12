"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const onLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={onLogout}
      className="rounded-full border-2 border-hl-ink px-4 py-2 font-tag text-xs uppercase"
    >
      Log Out
    </button>
  );
}
