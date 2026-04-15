import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Stars, Badge, Button } from "@/components/ui";
import { useNotif } from "@/context/NotifContext";
import { fmt, cn } from "@/utils";
import type { Spice } from "@/types";

interface ProductCardProps {
  spice:  Spice;
  onAdd:  (spice: Spice, size: "50g" | "100g") => void;
  wished: boolean;
  onWish: (id: number) => void;
}

export function ProductCard({ spice, onAdd, wished, onWish }: ProductCardProps) {
  const [size,  setSize]  = useState<"50g" | "100g">("50g");
  const [hov,   setHov]   = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const { notify } = useNotif();

  const currentPrice = size === "50g" ? spice.p50 : spice.p100;

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={cn(
        "flex flex-col bg-paper overflow-hidden relative h-full", // h-full ensures grid stretches cards evenly
        "transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
        hov ? "-translate-y-1.5 shadow-card-hover" : "shadow-card"
      )}
    >
      {/* Image Area - Removed the hover cart overlay for better mobile UX */}
      <div className="relative h-[220px] bg-cream shrink-0 overflow-hidden">
        {imgOk ? (
          <img
            src={spice.image}
            alt={spice.name}
            onError={() => setImgOk(false)}
            className={cn(
              "w-full h-full object-cover block transition-transform duration-500",
              hov ? "scale-[1.06]" : "scale-100"
            )}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[3.75rem]">
            {spice.emoji}
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => { onWish(spice.id); notify(wished ? "Removed from wishlist" : "Saved ♡"); }}
          className="absolute top-3 right-3 w-[32px] h-[32px] rounded-full bg-paper/90 shadow-sm
                     flex items-center justify-center z-10 transition-transform hover:scale-110 border-none"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={14} color={wished ? "#BF4E2A" : "#785535"} fill={wished ? "#BF4E2A" : "none"} />
        </button>

        {/* Badges */}
        {spice.bestseller ? (
          <Badge className="absolute top-3 left-3 shadow-sm">Best Seller</Badge>
        ) : (
          <span className="absolute top-3 left-3 bg-spice/80 backdrop-blur-sm text-turmeric
                           text-[0.5625rem] tracking-[0.15em] uppercase px-2.5 py-1 font-semibold">
            {spice.tag}
          </span>
        )}
      </div>

      {/* Body Area */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title & Rating Row */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-display text-[1.125rem] font-bold text-ink leading-tight line-clamp-2">
            {spice.name}
          </h3>
          <div className="flex flex-col items-end shrink-0 pt-0.5">
            <Stars rating={spice.rating} />
            <span className="text-[0.625rem] text-muted mt-0.5">({spice.reviewCount})</span>
          </div>
        </div>

        {/* Description - Clamped to maintain card heights */}
        <p className="text-[0.75rem] leading-relaxed text-muted mb-4 line-clamp-2">
          {spice.desc}
        </p>

        {/* Tags */}
        <div className="flex gap-1.5 mb-5 flex-wrap">
          {spice.uses.map((u) => (
            <span
              key={u}
              className="text-[0.5625rem] font-semibold tracking-[0.13em] uppercase px-2 py-0.5 bg-rust/5 text-rust rounded-sm"
            >
              {u}
            </span>
          ))}
        </div>

        {/* Action Area - Pushed to the bottom */}
        <div className="mt-auto flex flex-col gap-4">
          
          {/* Size & Price Row */}
          <div className="flex items-center justify-between">
            {/* Pill-style size toggles */}
            <div className="flex bg-cream p-1 rounded-full border border-rust/10">
              {(["50g", "100g"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSize(opt)}
                  className={cn(
                    "px-3 py-1 text-[0.6875rem] font-bold transition-colors rounded-full",
                    size === opt
                      ? "bg-rust text-white shadow-sm"
                      : "bg-transparent text-muted hover:text-ink"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
            
            {/* Clear Pricing */}
            <div className="font-bold text-[1.125rem] text-ink">
              {fmt(currentPrice)}
            </div>
          </div>

          {/* Primary CTA */}
          <Button
            variant={spice.inStock ? "primary" : "outline-light"}
            size="lg"
            className="w-full flex justify-center py-3"
            disabled={!spice.inStock}
            onClick={() => {
              if (spice.inStock) {
                onAdd(spice, size);
                notify(`${spice.name} added to cart ✓`);
              }
            }}
          >
            {spice.inStock ? (
              <>
                <ShoppingCart size={15} className="mr-1.5" /> 
                Add to Cart
              </>
            ) : (
              "Out of Stock"
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}