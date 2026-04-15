import { Heart, MessageCircle } from "lucide-react";
import { SPICES, WA_NUMBER } from "@/data";
import { PAGES } from "@/constants";
import { useReveal } from "@/hooks";
import { Button, Breadcrumb } from "@/components/ui";
import { ProductCard } from "@/components/product";
import { fmt, waLink, cn } from "@/utils";
import type { Spice, PageKey } from "@/types";

interface WishlistPageProps {
  wished:   Set<number>;
  onWish:   (id: number) => void;
  onAdd:    (spice: Spice, size: "50g" | "100g") => void;
  navigate: (page: PageKey) => void;
}

export default function WishlistPage({ wished, onWish, onAdd, navigate }: WishlistPageProps) {
  useReveal();
  const items = SPICES.filter((s) => wished.has(s.id));

  const orderAllWA = () => {
    if (!items.length) return;
    const lines = items.map((s) => `• ${s.name} (50g) — ${fmt(s.p50)}`).join("\n");
    const total = items.reduce((a, s) => a + s.p50, 0);
    const msg =
      `Hello Guru Spices! 🌿\n\nI'd like to order all items from my wishlist:\n\n${lines}\n\n` +
      `Total: ${fmt(total)}\n\nPlease confirm availability and arrange delivery. Thank you!`;
    window.open(waLink(msg, WA_NUMBER), "_blank");
  };

  return (
    <div className="page-enter">
      {/* Page hero */}
      <div className="page-hero">
        <div className="max-w-site mx-auto px-12 max-md:px-5 relative">
          <Breadcrumb crumbs={[{ label: "Home", page: PAGES.home }, { label: "Wishlist" }]} navigate={navigate} />
          <p className="text-[0.625rem] tracking-[0.3em] uppercase text-turmeric font-semibold mb-3">Saved Items</p>
          <h1 className="font-display font-bold text-paper leading-[1.05] mb-2"
              style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
            My Wishlist
          </h1>
          <p className="text-sm text-paper/50">
            {items.length} {items.length === 1 ? "spice" : "spices"} saved
          </p>
        </div>
      </div>

      <section className="bg-cream py-20 px-12 max-md:px-5">
        <div className="max-w-site mx-auto">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-paper flex items-center justify-center mb-5">
                <Heart size={34} className="text-rust/20" />
              </div>
              <h2 className="font-display font-semibold text-ink text-[1.75rem] mb-3">
                Your wishlist is empty
              </h2>
              <p className="text-sm text-muted mb-7 max-w-sm">
                Browse our spices and tap the heart icon to save your favourites here.
              </p>
              <Button variant="primary" size="md" onClick={() => { navigate(PAGES.shop); window.scrollTo(0, 0); }}>
                Browse Spices
              </Button>
            </div>
          ) : (
            <>
              {/* Actions bar */}
              <div className="flex items-center justify-between mb-9 flex-wrap gap-3.5">
                <p className="text-sm text-muted">
                  {items.length} saved spice{items.length !== 1 ? "s" : ""}
                </p>
                <div className="flex gap-2.5 flex-wrap">
                  <Button variant="whatsapp" size="sm" onClick={orderAllWA}>
                    <MessageCircle size={13} /> Order All on WhatsApp
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { navigate(PAGES.shop); window.scrollTo(0, 0); }}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-4 gap-0.5 max-[1100px]:grid-cols-3 max-[700px]:grid-cols-2 max-[420px]:grid-cols-1">
                {items.map((s, i) => (
                  <div
                    key={s.id}
                    className={cn(
                      "reveal",
                      i % 4 === 1 && "reveal-delay-1",
                      i % 4 === 2 && "reveal-delay-2",
                      i % 4 === 3 && "reveal-delay-3"
                    )}
                  >
                    <ProductCard spice={s} onAdd={onAdd} wished={wished.has(s.id)} onWish={onWish} />
                  </div>
                ))}
              </div>

              {/* Order all CTA banner */}
              <div className="reveal mt-14 bg-spice p-10 flex items-center justify-between flex-wrap gap-5">
                <div>
                  <h3 className="font-display font-semibold text-paper text-[1.5rem] mb-2">
                    Ready to order?
                  </h3>
                  <p className="text-sm text-paper/48 max-w-[420px]">
                    Send your full wishlist to us on WhatsApp in one tap — we'll confirm availability and arrange delivery.
                  </p>
                </div>
                <Button variant="whatsapp" size="md" onClick={orderAllWA}>
                  <MessageCircle size={14} /> Order All via WhatsApp
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
