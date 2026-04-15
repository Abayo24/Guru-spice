import { cn } from "@/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children:  ReactNode;
  color?:    string; // hex for custom colours
  variant?:  "rust" | "sage" | "gold" | "dark" | "custom";
  className?: string;
}

const VARIANTS = {
  rust:   "bg-rust text-white",
  sage:   "bg-sage/15 text-sage",
  gold:   "bg-gold/15 text-gold",
  dark:   "bg-ink text-white",
  custom: "",
};

export function Badge({ children, variant = "rust", color, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block text-[0.5625rem] font-bold tracking-[0.14em] uppercase px-2.5 py-1",
        VARIANTS[variant],
        className
      )}
      style={variant === "custom" && color ? { background: color, color: "#fff" } : undefined}
    >
      {children}
    </span>
  );
}
