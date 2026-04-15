import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely, resolving conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format a number as KES currency. */
export function fmt(n: number): string {
  return `KES ${Number(n).toLocaleString()}`;
}

/** Build a WhatsApp deep-link with a pre-filled message. */
export function waLink(msg: string, number: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}
