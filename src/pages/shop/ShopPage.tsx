import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { SPICES } from "@/data";
import { PAGES, WA_NUMBER, SPICE_FILTERS, SORT_OPTIONS } from "@/constants";
import { useReveal } from "@/hooks";
import { Button, SectionHeader, Breadcrumb } from "@/components/ui";
import { ProductCard } from "@/components/product";
import { waLink, cn } from "@/utils";
import type { SpiceFilter, SortKey } from "@/constants";
import type { ShopProps } from "@/types";

export default function ShopPage({ onAdd, wished, onWish, navigate }: ShopProps) {
  const [filter, setFilter] = useState<SpiceFilter>("All");
  const [sort,   setSort]   = useState<SortKey>("default");
  useReveal();

  let list = filter === "All" ? [...SPICES] : SPICES.filter((s) => s.tag === filter);
  if (sort === "price_asc")  list = [...list].sort((a, b) => a.p50 - b.p50);
  if (sort === "price_desc") list = [...list].sort((a, b) => b.p50 - a.p50);
  if (sort === "rating")     list = [...list].sort((a, b) => b.rating - a.rating);

  return (
    <div className="page-enter">
      {/* Page hero */}
      <div className="page-hero">
        <div
          className="page-hero-bg"
          // style={{ backgroundImage: "url(https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1200&q=60&auto=format&fit=crop)" }}
        />
        <div className="max-w-site mx-auto px-12 max-md:px-5 relative">
          <Breadcrumb
            crumbs={[{ label: "Home", page: PAGES.home }, { label: "Shop" }]}
            navigate={navigate}
          />
          <p className="text-[0.625rem] tracking-[0.3em] uppercase text-turmeric font-semibold mb-3">
            Our Collection
          </p>
          <h1 className="font-display font-bold text-paper leading-[1.05] mb-3.5"
              style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
            All Spices
          </h1>
          <p className="text-sm text-paper/[0.50] max-w-[460px] leading-relaxed">
            Twelve pure, bold, aromatic spices — each in 50g and 100g. Order via WhatsApp for same-day Nairobi delivery.
          </p>
        </div>
      </div>

      <section className="bg-cream py-20 px-12 max-md:px-5">
        <div className="max-w-site mx-auto">
          {/* Filter + Sort bar */}
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div className="flex gap-1.5 flex-wrap">
              {SPICE_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-5 py-2 text-[0.625rem] font-medium tracking-[0.12em] uppercase border transition-all",
                    filter === f
                      ? "border-rust bg-rust/8 text-rust"
                      : "border-transparent bg-transparent text-muted hover:border-rust/40 hover:text-rust"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted">{list.length} spice{list.length !== 1 ? "s" : ""}</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="px-3.5 py-2 border border-rust/22 bg-paper text-muted text-xs outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.key} value={o.key}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-4 gap-2.5 max-[1100px]:grid-cols-3 max-[700px]:grid-cols-2 max-[420px]:grid-cols-1">
            {list.map((sp, i) => (
              <div
                key={sp.id}
                className={cn("reveal", i % 4 === 1 && "reveal-delay-1", i % 4 === 2 && "reveal-delay-2", i % 4 === 3 && "reveal-delay-3")}
              >
                <ProductCard spice={sp} onAdd={onAdd} wished={wished.has(sp.id)} onWish={onWish} />
              </div>
            ))}
          </div>

          {/* Wholesale CTA */}
          <div className="reveal mt-14 bg-spice p-10 flex items-center justify-between flex-wrap gap-5">
            <div>
              <h3 className="font-display font-semibold text-paper text-[1.625rem] mb-2">
                Want to order wholesale or in bulk?
              </h3>
              <p className="text-sm text-paper/[0.48] max-w-[420px]">
                Special pricing for restaurants, caterers and bulk buyers. Message us directly on WhatsApp.
              </p>
            </div>
            <Button
              variant="whatsapp"
              size="md"
              href={waLink("Hello Guru Spices! I'm interested in a bulk or wholesale order.", WA_NUMBER)}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={14} /> Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
