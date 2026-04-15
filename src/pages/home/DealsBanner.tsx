import { useState } from "react";
import { Flame, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { DEALS } from "@/data";
import { PAGES } from "@/constants";
import { useNotif } from "@/context/NotifContext";
import type { DealProps } from "@/types";

export function DealsBanner({ onCopy, copied, navigate }: DealProps) {
  const [idx, setIdx] = useState(0);
  const { notify }    = useNotif();
  const deal          = DEALS[idx];

  const copy = () => { onCopy(deal.code); notify(`Code ${deal.code} copied!`); };
  const prev = () => setIdx((i) => (i - 1 + DEALS.length) % DEALS.length);
  const next = () => setIdx((i) => (i + 1) % DEALS.length);

  return (
    <section className="bg-spice">
      {/* Label strip */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-site mx-auto px-12 max-md:px-5 py-3.5 flex items-center justify-between flex-wrap gap-2.5">
          <div className="flex items-center gap-2.5">
            <Flame size={12} className="fill-turmeric text-turmeric" />
            <span className="text-[0.625rem] tracking-[0.28em] uppercase text-turmeric font-semibold">
              Limited Offers · Today's Deals
            </span>
          </div>
          <button
            onClick={() => { navigate(PAGES.deals); window.scrollTo(0, 0); }}
            className="text-[0.625rem] tracking-[0.12em] uppercase text-turmeric/60
                       bg-transparent border-none underline"
          >
            View All Deals →
          </button>
        </div>
      </div>

      {/* Main deal panel */}
      <div
        key={deal.id}
        className="animate-slide-in grid grid-cols-2 max-md:grid-cols-1 min-h-[400px]"
      >
        {/* Image side (hidden on mobile) */}
        <div className="hidden md:block relative overflow-hidden">
          <img
            src={deal.image}
            alt={deal.title}
            className="w-full h-full object-cover brightness-50 saturate-[1.3]"
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-spice/90" />
          <div className="absolute bottom-6 left-6 flex gap-2 flex-wrap">
            {["Turmeric", "Paprika", "Cardamom", "Cumin"].map((s) => (
              <span
                key={s}
                className="text-[0.5625rem] tracking-[0.1em] text-turmeric px-2.5 py-1
                           bg-turmeric/10 border border-turmeric/28"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Info side */}
        <div
          className="px-12 max-md:px-5 py-12 flex flex-col justify-center"
          style={{ background: `linear-gradient(135deg, rgb(24,15,6) 0%, ${deal.color}15 100%)` }}
        >
          {deal.hot && (
            <span className="inline-flex items-center gap-1.5 text-[0.5625rem] font-bold tracking-[0.13em]
                             uppercase bg-rust text-white px-3 py-1 w-fit mb-4 animate-hot-pulse">
              <Flame size={9} /> HOT DEAL
            </span>
          )}

          <p
            className="font-display font-black leading-[0.9] mb-3"
            style={{ fontSize: "clamp(2.75rem,7vw,5.5rem)", color: deal.color }}
          >
            {deal.discount}
          </p>

          <h2
            className="font-display font-semibold text-paper mb-3 leading-[1.15]"
            style={{ fontSize: "clamp(1.25rem,3vw,1.75rem)" }}
          >
            {deal.title}
          </h2>

          <p className="text-sm text-paper/50 mb-7 max-w-sm leading-relaxed">{deal.desc}</p>

          {/* Code block */}
          <div className="mb-3.5">
            <p className="text-[0.5625rem] tracking-[0.18em] uppercase text-paper/34 mb-2">
              Promo Code
            </p>
            <div className="flex w-fit max-w-full">
              <div className="px-5 py-3 bg-white/[0.07] border border-white/[0.12] border-r-0
                              text-base font-bold tracking-[0.12em] text-paper">
                {deal.code}
              </div>
              <button
                onClick={copy}
                className="px-4 py-3 text-[0.5625rem] font-semibold tracking-[0.1em] uppercase
                           text-white flex items-center gap-1.5 transition-opacity hover:opacity-80
                           whitespace-nowrap"
                style={{ background: deal.color }}
              >
                {copied === deal.code
                  ? <><Check size={12} /> Copied!</>
                  : <><Copy size={12} /> Copy</>}
              </button>
            </div>
          </div>

          <p className="text-[0.625rem] text-paper/26 tracking-[0.05em] mb-7">{deal.expiry}</p>

          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center border border-white/10
                         bg-white/[0.07] text-paper/50 transition-all
                         hover:text-white"
              style={{ ["--hover-bg" as string]: deal.color }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = deal.color; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "rgba(253,250,242,0.5)"; }}
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center text-white
                         transition-opacity hover:opacity-80"
              style={{ background: deal.color }}
            >
              <ChevronRight size={15} />
            </button>
            <span className="text-[0.6875rem] text-paper/28 ml-1.5">
              {idx + 1} / {DEALS.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
