import { useEffect, useState, useCallback } from "react";
import type { CartItem, Spice } from "@/types";

// ─── useReveal ────────────────────────────────────────────
/**
 * Attaches an IntersectionObserver to all `.reveal` elements
 * and adds `.revealed` when they enter the viewport.
 * Call once per page component (runs after every render).
 */
export function useReveal(): void {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

// ─── useScrolled ─────────────────────────────────────────
/** Returns true when window.scrollY exceeds `threshold`. */
export function useScrolled(threshold = 10): boolean {
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > threshold : false
  );

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}

// ─── useCloseOnEscape ─────────────────────────────────────
/** Calls `onClose` when the user presses Escape. */
export function useCloseOnEscape(onClose: () => void): void {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
}

// ─── useCart ──────────────────────────────────────────────
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promo, setPromo] = useState<string | null>(null);

  const addSpice = useCallback((spice: Spice, size: "50g" | "100g") => {
    const unitPrice = size === "100g" ? spice.p100 : spice.p50;
    const key = `${spice.id}__${size}`;
    setItems((prev) => {
      const idx = prev.findIndex((x) => x._key === key);
      if (idx > -1) {
        return prev.map((item, i) =>
          i === idx ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { _key: key, type: "spice", name: spice.name, image: spice.image, emoji: spice.emoji, size, unitPrice, qty: 1 }];
    });
  }, []);

  const addHamper = useCallback((item: Omit<CartItem, "_key" | "qty">) => {
    setItems((prev) => [
      ...prev,
      { ...item, _key: `${item.name}__${Date.now()}`, qty: 1 },
    ]);
  }, []);

  const remove = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const setQty = useCallback((index: number, delta: number) => {
    setItems((prev) => {
      const next = [...prev];
      const newQty = next[index].qty + delta;
      if (newQty < 1) return prev.filter((_, i) => i !== index);
      next[index] = { ...next[index], qty: newQty };
      return next;
    });
  }, []);

  const subtotal = items.reduce((a, it) => a + it.unitPrice * it.qty, 0);
  const discount = promo === "GURU20" ? Math.round(subtotal * 0.2) : 0;
  const total    = subtotal - discount;
  const count    = items.reduce((a, i) => a + i.qty, 0);

  return { items, promo, setPromo, addSpice, addHamper, remove, setQty, subtotal, discount, total, count };
}

// ─── useWishlist ──────────────────────────────────────────
export function useWishlist() {
  const [wished, setWished] = useState<Set<number>>(new Set());

  const toggle = useCallback((id: number) => {
    setWished((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  return { wished, toggle };
}
