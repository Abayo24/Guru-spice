import { cn } from "@/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  label:      string;
  title:      ReactNode;
  subtitle?:  string;
  center?:    boolean;
  dark?:      boolean;
  className?: string;
}

export function SectionHeader({
  label, title, subtitle, center = false, dark = false, className,
}: SectionHeaderProps) {
  return (
    <div className={cn(center && "text-center", className)}>
      <p
        className={cn(
          "text-[0.625rem] font-semibold tracking-[0.3em] uppercase mb-2.5",
          dark ? "text-turmeric" : "text-rust"
        )}
      >
        {label}
      </p>
      <h2
        className={cn(
          "font-display font-bold leading-[1.08] text-balance",
          "text-[clamp(1.75rem,4vw,3rem)]",
          dark ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-sm leading-relaxed max-w-xl",
            center && "mx-auto",
            dark ? "text-paper/50" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
