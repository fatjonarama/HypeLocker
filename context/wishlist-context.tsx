"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type WishlistContextValue = {
  ids: number[];
  isWishlisted: (id: number) => boolean;
  toggle: (id: number) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "hypelocker-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids, hydrated]);

  const toggle = (id: number) =>
    setIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const isWishlisted = (id: number) => ids.includes(id);

  return (
    <WishlistContext.Provider value={{ ids, isWishlisted, toggle }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
