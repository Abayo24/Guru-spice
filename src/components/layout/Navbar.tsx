import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X, Search, Heart, Check, MessageCircle } from "lucide-react";
import { useScrolled } from "@/hooks";
import { NAV_LINKS, PAGES, WA_NUMBER } from "@/constants";
import { waLink, cn } from "@/utils";
import { Button } from "@/components/ui";
import type { PageKey } from "@/types";

interface NavbarProps {
  cartCount: number;
  onCart:    () => void;
  onSearch:  () => void;
  navigate:  (page: PageKey) => void;
  page:      PageKey;
}

export function Navbar({ cartCount, onCart, onSearch, navigate, page }: NavbarProps) {
  const scrolled   = useScrolled(10);
  const [open, setOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const fn = () => { if (window.innerWidth > 900) setOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const goTo = (p: PageKey) => {
    navigate(p);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // On the home page hero the nav sits over a dark background → transparent until scrolled
  const isHeroMode = !scrolled && (page === PAGES.home || page === PAGES.shop || page === PAGES.hampers || page === PAGES.about || page === PAGES.wishlist);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-[100] transition-all duration-300",
        scrolled
          ? "bg-paper/[0.97] backdrop-blur-md shadow-[0_1px_0_rgba(191,78,42,0.12)]"
          : "bg-transparent"
      )}
    >
      {/* ── Main row ─────────────────────────────────────── */}
      <div className="max-w-site mx-auto px-12 max-md:px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => goTo(PAGES.home)}
          className={cn(
            "font-display text-[1.375rem] font-bold tracking-wider transition-colors bg-transparent border-none shrink-0",
            isHeroMode ? "text-paper" : "text-ink"
          )}
        >
          Guru<span className="text-turmeric">·</span>Spices
        </button>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {NAV_LINKS.map(({ label, page: p }) => {
            const active = page === p;
            return (
              <li key={label}>
                <button
                  onClick={() => goTo(p)}
                  className={cn(
                    "text-[0.6875rem] tracking-[0.14em] uppercase transition-colors bg-transparent border-none",
                    "border-b-2 pb-0.5",
                    active
                      ? "font-semibold text-rust border-rust"
                      : cn(
                          "font-medium border-transparent hover:text-rust",
                          isHeroMode ? "text-paper/[0.80]" : "text-muted"
                        )
                  )}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Search */}
          <button
            onClick={onSearch}
            className={cn(
              "flex items-center justify-center w-10 h-10 transition-colors bg-transparent border-none",
              isHeroMode ? "text-paper" : "text-ink"
            )}
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Wishlist (hidden on very small screens) */}
          <button
            onClick={() => goTo(PAGES.wishlist)}
            className={cn(
              "hidden sm:flex items-center justify-center w-10 h-10 transition-colors bg-transparent border-none",
              page === PAGES.wishlist ? "text-rust" : isHeroMode ? "text-paper" : "text-ink"
            )}
            aria-label="Wishlist"
          >
            <Heart size={18} fill={page === PAGES.wishlist ? "#BF4E2A" : "none"} />
          </button>

          {/* Shop CTA (hidden on small screens) */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => goTo(PAGES.shop)}
            className="hidden sm:inline-flex ml-1"
          >
            <ShoppingCart size={13} />
            Shop
            {cartCount > 0 && (
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-turmeric text-ink text-[0.5625rem] font-bold">
                {cartCount}
              </span>
            )}
          </Button>

          {/* Cart icon */}
          <button
            onClick={onCart}
            className={cn(
              "relative flex items-center justify-center w-10 h-10 transition-colors bg-transparent border-none",
              isHeroMode ? "text-paper" : "text-ink"
            )}
            aria-label={`Cart (${cartCount} items)`}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full bg-rust text-white text-[0.5rem] font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "lg:hidden flex items-center justify-center w-10 h-10 transition-colors bg-transparent border-none",
              isHeroMode ? "text-paper" : "text-ink"
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ───────────────────────────────── */}
      {open && (
        <div className="bg-cream border-t border-rust/[0.10] shadow-[0_12px_32px_rgba(24,15,6,0.14)]">
          <div className="px-4 py-2 pb-5">
            {[...NAV_LINKS, { label: "Wishlist", page: PAGES.wishlist as PageKey }].map(({ label, page: p }) => {
              const active = page === p;
              return (
                <button
                  key={label}
                  onClick={() => goTo(p)}
                  className={cn(
                    "flex items-center w-full text-left py-3.5 text-sm tracking-[0.1em] uppercase",
                    "border-b border-rust/[0.08] bg-transparent",
                    active ? "font-semibold text-rust" : "font-normal text-muted"
                  )}
                >
                  {label}
                  {active && <Check size={14} className="ml-auto text-rust" />}
                </button>
              );
            })}

            <div className="flex gap-2.5 mt-4 flex-wrap">
              <Button variant="primary" size="sm" onClick={() => goTo(PAGES.shop)} className="flex-1 justify-center">
                <ShoppingCart size={13} /> Shop Spices
              </Button>
              <Button
                variant="whatsapp"
                size="sm"
                href={waLink("Hello Guru Spices! I'd like to place an order.", WA_NUMBER)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 justify-center"
              >
                <MessageCircle size={13} /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
