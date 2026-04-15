import { useState } from "react";
import { X, Minus, Plus, Tag, AlertCircle, MessageCircle } from "lucide-react";
import { DEALS, WA_NUMBER } from "@/data";
import { fmt, waLink, cn } from "@/utils";
import { useNotif } from "@/context/NotifContext";
import { Button } from "@/components/ui";
import type { CartItem } from "@/types";

interface CartDrawerProps {
  open:        boolean;
  onClose:     () => void;
  items:       CartItem[];
  onRemove:    (index: number) => void;
  onQty:       (index: number, delta: number) => void;
  subtotal:    number;
  discount:    number;
  total:       number;
  count:       number;
  appliedCode: string | null;
  onApplyCode: (code: string | null) => void;
}

export function CartDrawer({
  open, onClose, items, onRemove, onQty,
  subtotal, discount, total, count,
  appliedCode, onApplyCode,
}: CartDrawerProps) {
  const [code, setCode] = useState("");
  const [err,  setErr]  = useState("");
  const { notify } = useNotif();

  const applyCode = () => {
    const c = code.trim().toUpperCase();
    if (DEALS.find((d) => d.code === c)) {
      onApplyCode(c);
      setErr("");
      setCode("");
      notify(`Deal applied: ${c} ✓`);
    } else {
      setErr("Invalid promo code");
    }
  };

  const checkoutWA = () => {
    if (items.length === 0) return;
    const lines = items
      .map((i) => `• ${i.name} (${i.size}) × ${i.qty} — ${fmt(i.unitPrice * i.qty)}`)
      .join("\n");
    const msg =
      `Hello Guru Spices! \n\nI'd like to place an order:\n\n${lines}\n\n` +
      `${appliedCode ? `Promo: ${appliedCode}\nDiscount: −${fmt(discount)}\n` : ""}` +
      `Total: ${fmt(total)}\n\nPlease confirm my order and delivery details. Thank you!`;
    window.open(waLink(msg, WA_NUMBER), "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-spice/48 z-[200] backdrop-blur-sm"
        />
      )}

      {/* Drawer */}
      <aside
        className={cn(
          "fixed top-0 right-0 bottom-0 z-[201] flex flex-col bg-paper",
          "w-[min(400px,100vw)] shadow-[-6px_0_30px_rgba(0,0,0,0.14)]",
          "transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-rust/10 shrink-0">
          <h2 className="font-display text-xl font-semibold text-ink">
            Cart{" "}
            <span className="text-sm font-normal text-muted">
              ({count} {count === 1 ? "item" : "items"})
            </span>
          </h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-ink transition-colors bg-transparent border-none"
            aria-label="Close cart"
          >
            <X size={19} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center pt-16 text-center">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-4">
                <MessageCircle size={28} className="text-muted/40" />
              </div>
              <p className="text-sm text-muted/50 mb-5">Your cart is empty</p>
              <Button variant="primary" size="sm" onClick={onClose}>Browse Spices</Button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-3 py-3.5 border-b border-rust/7 items-start"
              >
                {/* Thumbnail */}
                <div className="w-[50px] h-[50px] bg-cream shrink-0 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      {item.emoji ?? "📦"}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-[0.8125rem] font-semibold text-ink mb-0.5 truncate">{item.name}</p>
                  <p className="text-[0.6875rem] text-muted mb-2">{item.size} · {fmt(item.unitPrice)}</p>
                  <div className="qty-stepper">
                    <button className="qty-btn" onClick={() => onQty(idx, -1)} aria-label="Decrease">
                      <Minus size={11} />
                    </button>
                    <span className="qty-value">{item.qty}</span>
                    <button className="qty-btn" onClick={() => onQty(idx, 1)} aria-label="Increase">
                      <Plus size={11} />
                    </button>
                  </div>
                </div>

                {/* Total + remove */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-[0.8125rem] font-semibold text-ink">
                    {fmt(item.unitPrice * item.qty)}
                  </span>
                  <button
                    onClick={() => onRemove(idx)}
                    className="text-muted/40 hover:text-rust transition-colors bg-transparent border-none"
                    aria-label={`Remove ${item.name}`}
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-rust/10 shrink-0 space-y-3.5">
            {/* Promo code */}
            <div>
              <div className="flex">
                <input
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setErr(""); }}
                  placeholder={appliedCode ? `✓ ${appliedCode} applied` : "Promo code"}
                  onKeyDown={(e) => e.key === "Enter" && applyCode()}
                  className={cn(
                    "flex-1 px-3 py-2.5 text-xs border border-rust/20 border-r-0 outline-none",
                    appliedCode ? "bg-sage/5 text-sage" : "bg-paper text-ink"
                  )}
                />
                <button
                  onClick={appliedCode ? () => { onApplyCode(null); setCode(""); } : applyCode}
                  className={cn(
                    "px-3 py-2.5 text-[0.625rem] font-semibold tracking-[0.1em] uppercase border transition-colors",
                    "flex items-center gap-1 whitespace-nowrap",
                    appliedCode
                      ? "bg-sage/10 border-sage/20 text-sage"
                      : "bg-rust/10 border-rust/20 text-rust hover:bg-rust hover:text-white"
                  )}
                >
                  {appliedCode ? <><X size={10} /> Remove</> : <><Tag size={10} /> Apply</>}
                </button>
              </div>
              {err && (
                <p className="flex items-center gap-1 text-[0.6875rem] text-rust mt-1.5">
                  <AlertCircle size={11} /> {err}
                </p>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted">
                <span>Subtotal</span><span>{fmt(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-xs text-sage">
                  <span>Discount ({appliedCode})</span>
                  <span>−{fmt(discount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-rust/10">
                <span className="text-sm font-semibold text-ink">Total</span>
                <span className="font-display text-xl font-bold text-ink">{fmt(total)}</span>
              </div>
            </div>

            <Button variant="whatsapp" size="md" onClick={checkoutWA} className="w-full justify-center">
              <MessageCircle size={14} /> Order via WhatsApp
            </Button>
            <p className="text-[0.625rem] text-center text-muted/42">
              🚚 Free delivery on orders over KES 500 · Nairobi
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
