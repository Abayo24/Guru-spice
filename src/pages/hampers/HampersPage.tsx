import { useState } from "react";
import { Check, Gift, MessageCircle, Plus, ShoppingCart, Sparkles, X } from "lucide-react";
import { HAMPERS, SPICES, WA_NUMBER } from "@/data";
import { PAGES } from "@/constants";
import { useReveal } from "@/hooks";
import { useNotif } from "@/context/NotifContext";
import { Button, SectionHeader, Breadcrumb, Badge } from "@/components/ui";
import { fmt, waLink, cn } from "@/utils";
import type { CartItem, Hamper, PageKey } from "@/types";

interface HampersPageProps {
  onAdd:    (item: Omit<CartItem, "_key" | "qty">) => void;
  navigate: (page: PageKey) => void;
}

export default function HampersPage({ onAdd, navigate }: HampersPageProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [building,   setBuilding]   = useState(false);
  const [picks,      setPicks]      = useState<string[]>([]);
  const [customName, setCustomName] = useState("");
  const { notify } = useNotif();
  useReveal();

  const togglePick = (name: string) =>
    setPicks((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  const customTotal = picks.length * 80;

  const orderHamperWA = (h: Hamper) => {
    const msg =
      `Hello Guru Spices! 🎁\n\nI'd like to order the *${h.name}* hamper.\n\n` +
      `Includes: ${h.spices.join(", ")}\nSize: ${h.size}\nPrice: ${fmt(h.price)}\n\n` +
      `Please confirm availability and delivery details. Thank you!`;
    window.open(waLink(msg, WA_NUMBER), "_blank");
  };

  const orderCustomWA = () => {
    if (!picks.length) return;
    const msg =
      `Hello Guru Spices! \n\nI'd like a custom hamper:\n\n` +
      picks.map((p) => `• ${p} (50g)`).join("\n") +
      `\n\nHamper Name: ${customName || "Custom Hamper"}\nTotal: ${fmt(customTotal)}\n\n` +
      `Please confirm and arrange delivery. Thank you!`;
    window.open(waLink(msg, WA_NUMBER), "_blank");
  };

  return (
    <div className="page-enter">
      {/* Page hero */}
      <div className="page-hero">
        <div
          className="page-hero-bg"
          // style={{ backgroundImage: "url(https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1200&q=60&auto=format&fit=crop)" }}
        />
        <div className="max-w-site mx-auto px-12 max-md:px-5 relative">
          <Breadcrumb crumbs={[{ label: "Home", page: PAGES.home }, { label: "Hampers" }]} navigate={navigate} />
          <p className="text-[0.625rem] tracking-[0.3em] uppercase text-turmeric font-semibold mb-3">Gift Collections</p>
          <h1 className="font-display font-bold text-paper leading-[1.05] mb-3.5"
              style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
            Spice Gift Hampers
          </h1>
          <p className="text-sm text-paper/[0.50] max-w-[480px] leading-relaxed">
            Curated sets for every occasion — or build your own bespoke hamper. All orders via WhatsApp.
          </p>
        </div>
      </div>

      <section className="bg-cream py-20 px-12 max-md:px-5">
        <div className="max-w-site mx-auto">
          <SectionHeader
            label="Curated Sets"
            title="Ready-Made Hampers"
            className="reveal mb-10"
          />

          {/* Hamper cards */}
          <div className="grid grid-cols-4 gap-0.5 mb-12 max-[1020px]:grid-cols-2 max-[520px]:grid-cols-1">
            {HAMPERS.map((h, i) => {
              const isSel = selectedId === h.id;
              return (
                <div
                  key={h.id}
                  className={cn(
                    "reveal flex flex-col rounded-md bg-paper overflow-hidden",
                    "border-2 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover",
                    isSel ? "border-rust" : "border-transparent",
                    i === 1 && "reveal-delay-1",
                    i === 2 && "reveal-delay-2",
                    i === 3 && "reveal-delay-3"
                  )}
                >
                  {/* Image */}
                  <div className="relative h-[188px] overflow-hidden shrink-0">
                    <img
                      src={h.image} alt={h.name}
                      className="w-full h-full object-cover"
                      onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-spice/65 to-transparent" />
                    <span
                      className="absolute top-3 right-0 text-white text-[0.5rem] font-bold tracking-[0.14em] uppercase px-3 py-1.5"
                      style={{ background: h.badgeColor }}
                    >
                      {h.badge}
                    </span>
                    <span className="absolute bottom-3 left-3.5 text-[1.875rem]">{h.emoji}</span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5 pt-4.5 pb-5.5">
                    <h3 className="font-display font-semibold text-ink text-[1.1875rem] mb-1.5 leading-tight">
                      {h.name}
                    </h3>
                    <p className="text-[0.6875rem] leading-relaxed text-muted mb-3 flex-1">{h.desc}</p>

                    <div className="mb-2.5 space-y-1">
                      {h.spices.map((s, j) => (
                        <div key={j} className="flex items-center gap-1.5">
                          <Check size={9} className="text-rust shrink-0" />
                          <span className="text-[0.6875rem] text-ink">{s}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-[0.625rem] text-muted mb-2.5">{h.size}</p>

                    <div className="flex items-baseline gap-2 mb-3.5">
                      <span className="font-display font-bold text-ink text-[1.5rem]">{fmt(h.price)}</span>
                      <span className="text-[0.6875rem] text-muted line-through">{fmt(h.original)}</span>
                      <Badge variant="sage" className="text-[0.5rem]">Save {fmt(h.original - h.price)}</Badge>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Button variant="whatsapp" size="sm" className="justify-center" onClick={() => orderHamperWA(h)}>
                        <MessageCircle size={12} /> Order on WhatsApp
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-center"
                        onClick={() => {
                          setSelectedId(h.id);
                          onAdd({ type: "hamper", name: h.name, image: h.image, emoji: h.emoji, size: h.size, unitPrice: h.price });
                          notify(`${h.name} added to cart ✓`);
                        }}
                      >
                        {isSel ? <><Check size={11} /> In Cart</> : <><ShoppingCart size={11} /> Add to Cart</>}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Build Your Own */}
          <div className="reveal bg-spice p-11 max-md:p-5">
            <div className={cn("flex items-start justify-between flex-wrap gap-4", building && "mb-7")}>
              <div>
                <p className="flex items-center gap-1.5 text-[0.625rem] tracking-[0.28em] uppercase text-turmeric font-semibold mb-2.5">
                  <Sparkles size={11} /> Custom Hamper
                </p>
                <h3 className="font-display font-bold text-paper leading-tight"
                    style={{ fontSize: "clamp(1.25rem,3vw,2rem)" }}>
                  Build Your Own Hamper
                </h3>
                {!building && (
                  <p className="text-[0.8125rem] text-paper/[0.40] mt-2">
                    Pick any spices — each jar is 50g. We'll pack and deliver it beautifully.
                  </p>
                )}
              </div>
              <Button
                variant={building ? "ghost" : "primary"}
                size="md"
                onClick={() => setBuilding((v) => !v)}
                className={building ? "border-paper/[0.20] text-paper/[0.60]" : ""}
              >
                {building ? <><X size={13} /> Cancel</> : <><Plus size={13} /> Start Building</>}
              </Button>
            </div>

            {building && (
              <>
                {/* Optional name */}
                <div className="mb-5">
                  <label className="block text-[0.5625rem] tracking-[0.16em] uppercase text-paper/[0.40] mb-2">
                    Hamper Name (optional)
                  </label>
                  <input
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Mum's Birthday Spice Set"
                    className="bg-paper/[0.07] border border-paper/[0.10] text-paper px-4 py-2.5 text-[0.8125rem] outline-none w-full max-w-xs placeholder-paper/[0.30]"
                  />
                </div>

                {/* Spice picker */}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(145px,1fr))] gap-1.5 mb-6">
                  {SPICES.map((sp) => {
                    const on = picks.includes(sp.name);
                    return (
                      <button
                        key={sp.id}
                        onClick={() => togglePick(sp.name)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-2.5 text-left border transition-all",
                          on
                            ? "border-turmeric bg-turmeric/[0.10] text-turmeric"
                            : "border-paper/[0.10] bg-paper/[0.03] text-paper/[0.52] hover:border-paper/[0.25]"
                        )}
                      >
                        <span className="text-[0.9375rem]">{sp.emoji}</span>
                        <span className="text-[0.6875rem] font-medium leading-tight flex-1">{sp.name}</span>
                        {on && <Check size={10} className="shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Summary + order */}
                <div className="border-t border-paper/[0.07] pt-5 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <span className="text-xs text-paper/[0.40]">
                      {picks.length} spice{picks.length !== 1 ? "s" : ""} selected · 50g each
                    </span>
                    <p className="font-display font-bold text-paper text-[1.75rem] mt-1">
                      {fmt(customTotal)}
                      {picks.length >= 4 && (
                        <span className="text-xs text-turmeric ml-2.5 font-sans font-medium">Bundle deal ✓</span>
                      )}
                    </p>
                  </div>
                  <Button
                    variant="whatsapp"
                    size="md"
                    disabled={picks.length === 0}
                    onClick={orderCustomWA}
                    className={picks.length === 0 ? "opacity-40" : ""}
                  >
                    <MessageCircle size={13} /> Order Custom Hamper
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
