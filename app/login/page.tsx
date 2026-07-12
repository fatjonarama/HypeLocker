"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        router.push(data.isAdmin ? "/admin" : "/account");
        router.refresh();
        return;
      }
      setError(data.error ?? `Something went wrong (${res.status})`);
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl uppercase mb-6">Log In</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm"
        />
        {error && <p className="font-tag text-sm text-hl-pink">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full border-2 border-black bg-hl-lime py-3 font-tag text-sm font-bold uppercase text-hl-bg disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Log In"}
        </button>
      </form>
      <p className="mt-4 font-tag text-xs text-hl-grey">
        No account yet?{" "}
        <Link href="/register" className="underline">
          Create one
        </Link>
      </p>
    </main>
  );
}
