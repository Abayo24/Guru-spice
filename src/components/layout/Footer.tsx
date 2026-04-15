import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { SPICES } from "@/data";
import { PAGES, WA_NUMBER } from "@/constants";
import { waLink } from "@/utils";
import type { PageKey } from "@/types";

interface FooterProps {
  navigate: (page: PageKey) => void;
}

export function Footer({ navigate }: FooterProps) {
  const year = new Date().getFullYear();

  const goTo = (p: PageKey) => { navigate(p); window.scrollTo(0, 0); };

  const NavLink = ({ page, children }: { page: PageKey; children: string }) => (
    <button
      onClick={() => goTo(page)}
      className="block text-xs text-paper/[0.32] hover:text-turmeric transition-colors bg-transparent border-none text-left mb-2 font-sans"
    >
      {children}
    </button>
  );

  const WALink = ({ msg, children }: { msg: string; children: string }) => (
    <a
      href={waLink(msg, WA_NUMBER)}
      target="_blank"
      rel="noreferrer"
      className="block text-xs text-paper/[0.32] hover:text-turmeric transition-colors no-underline mb-2"
    >
      {children}
    </a>
  );

  const ColHead = ({ children }: { children: string }) => (
    <h4 className="text-[0.5625rem] tracking-[0.24em] uppercase text-turmeric font-semibold mb-4">
      {children}
    </h4>
  );

  return (
    <footer className="bg-spice pt-16 pb-8 px-12 max-md:px-5">
      <div className="max-w-site mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12
                        max-lg:grid-cols-2 max-lg:gap-7
                        max-sm:grid-cols-1">

          {/* Brand */}
          <div>
            <button
              onClick={() => goTo(PAGES.home)}
              className="font-display text-2xl font-bold text-paper mb-3 block bg-transparent border-none"
            >
              Guru<span className="text-turmeric">·</span>Spices
            </button>
            <p className="text-xs text-paper/[0.30] leading-relaxed max-w-[220px] mb-6">
              Pure, bold, aromatic spices for the home cook and the professional chef. Nairobi, Kenya.
            </p>
            {/* Social */}
            <div className="flex gap-2">
              {[
                { icon: <Instagram size={14} />, href: "#", label: "Instagram" },
                { icon: <Facebook size={14} />,  href: "#", label: "Facebook"  },
                { icon: <MessageCircle size={14} />, href: waLink("Hello Guru Spices!", WA_NUMBER), label: "WhatsApp" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex items-center justify-center w-[34px] h-[34px] border border-paper/[0.10]
                             text-paper/[0.34] hover:border-turmeric hover:text-turmeric transition-all no-underline"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop column */}
          <div>
            <ColHead>Shop</ColHead>
            <NavLink page={PAGES.shop}>All Spices</NavLink>
            <NavLink page={PAGES.hampers}>Gift Hampers</NavLink>
            <NavLink page={PAGES.wishlist}>My Wishlist</NavLink>
            <WALink msg="Hello! I'd like a wholesale order.">Wholesale Orders</WALink>
          </div>

          {/* Spices column */}
          <div>
            <ColHead>Spices</ColHead>
            {SPICES.slice(0, 6).map((s) => (
              <NavLink key={s.id} page={PAGES.shop}>{s.name}</NavLink>
            ))}
          </div>

          {/* Info column */}
          <div>
            <ColHead>Information</ColHead>
            <NavLink page={PAGES.about}>About Us</NavLink>
            <WALink msg="Hello! I have a question about delivery.">Delivery Info</WALink>
            <WALink msg="Hello! I'd like wholesale pricing.">Wholesale Pricing</WALink>
            <WALink msg="Hello Guru Spices! I have a question.">Contact Us</WALink>
            <NavLink page={PAGES.about}>Our Story</NavLink>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-paper/[0.06] pt-5 gap-3 flex-wrap">
          <p className="text-[0.625rem] text-paper/[0.20] tracking-wide">
            © {year} Guru Spices. All rights reserved. Nairobi, Kenya.
          </p>
          <p className="text-[0.625rem] text-paper/[0.16]">Pure · Bold · Aromatic</p>
        </div>
      </div>
    </footer>
  );
}
