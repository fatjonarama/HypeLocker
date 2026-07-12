"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  key: string; // productId + size + color
  productId: number;
  slug: string;
  name: string;
  image: string;
  priceCents: number;
  size?: string;
  color?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "key" | "quantity">, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  subtotalCents: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "hypelocker-cart";

function makeKey(productId: number, size?: string, color?: string) {
  return [productId, size ?? "", color ?? ""].join("::");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem: CartContextValue["addItem"] = (item, quantity = 1) => {
    const key = makeKey(item.productId, item.size, item.color);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, key, quantity }];
    });
  };

  const removeItem = (key: string) =>
    setItems((prev) => prev.filter((i) => i.key !== key));

  const updateQuantity = (key: string, quantity: number) =>
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, quantity } : i))
    );

  const clear = () => setItems([]);

  const subtotalCents = useMemo(
    () => items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0),
    [items]
  );

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        subtotalCents,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
