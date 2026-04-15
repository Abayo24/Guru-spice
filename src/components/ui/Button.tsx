import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils";

type Variant = "primary" | "ghost" | "whatsapp" | "dark" | "outline-light";
type Size    = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?:    Size;
  asChild?: boolean;
}

type ButtonProps  = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps  = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const BASE = "inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-widest uppercase transition-all duration-200 whitespace-nowrap select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2";

const VARIANTS: Record<Variant, string> = {
  primary:       "bg-rust text-white hover:bg-ink/90 hover:-translate-y-px",
  ghost:         "bg-transparent text-rust border border-rust hover:bg-rust hover:text-white",
  whatsapp:      "bg-[#25D366] text-white hover:bg-[#128C7E] hover:-translate-y-px",
  dark:          "bg-ink text-white hover:bg-black",
  "outline-light":"bg-transparent text-paper/75 border border-paper/25 hover:border-turmeric hover:text-turmeric",
};

const SIZES: Record<Size, string> = {
  sm: "text-[0.625rem] px-4 py-2",
  md: "text-[0.6875rem] px-6 py-3.5",
  lg: "text-[0.75rem] px-9 py-4",
};

/** Renders as <button> by default; pass `href` to render as <a>. */
export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps | AnchorProps
>(function Button(
  { variant = "primary", size = "md", className, children, ...props },
  ref
) {
  const cls = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if ("href" in props && props.href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={cls}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cls}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});
