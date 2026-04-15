import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { SPICES } from "@/data";
import { useCloseOnEscape } from "@/hooks";
import { useNotif } from "@/context/NotifContext";
import { Button } from "@/components/ui";
import { fmt } from "@/utils";
import type { Spice } from "@/types";

interface SearchOverlayProps {
  open:        boolean;
  onClose:     () => void;
  onAddToCart: (spice: Spice, size: "50g" | "100g") => void;
}

export function SearchOverlay({ open, onClose, onAddToCart }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { notify } = useNotif();

  useCloseOnEscape(onClose);

  useEffect(() => {
    if (open) { setQuery(""); setTimeout(() => inputRef.current?.focus(), 80); }
  }, [open]);

  const results = useMemo(
    () =>
      query.length > 1
        ? SPICES.filter((s) =>
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.tag.toLowerCase().includes(query.toLowerCase())
          )
        : [],
    [query]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-spice/[0.94] z-[600] flex items-start justify-center pt-[14vh] animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-[min(620px,88vw)]">
        {/* Input row */}
        <div className="flex items-center gap-3">
          <Search size={20} className="text-turmeric/50 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search spices…"
            className="flex-1 bg-transparent border-none border-b border-turmeric/35 text-paper outline-none
                       font-display italic text-[clamp(1.375rem,4vw,2.5rem)] py-2.5 placeholder-paper/30"
          />
          <button
            onClick={onClose}
            className="text-paper/40 bg-transparent border-none hover:text-paper transition-colors"
            aria-label="Close search"
          >
            <X size={22} />
          </button>
        </div>

        {/* Results */}
        <div className="mt-7">
          {results.length > 0 ? (
            results.map((s) => (
              <div
                key={s.id}
                className="flex gap-3.5 py-2.5 border-b border-paper/6 items-center"
              >
                <div className="w-11 h-11 shrink-0 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-paper mb-0.5 truncate">{s.name}</p>
                  <p className="text-[0.6875rem] text-paper/40">{s.tag} · {fmt(s.p50)} / 50g</p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => { onAddToCart(s, "50g"); notify(`${s.name} added to cart ✓`); onClose(); }}
                >
                  Add
                </Button>
              </div>
            ))
          ) : query.length > 1 ? (
            <p className="text-paper/35 text-sm pt-3">No results for "{query}"</p>
          ) : (
            <div className="pt-3">
              <p className="text-[0.625rem] tracking-[0.2em] uppercase text-paper/30 mb-3">
                Popular Searches
              </p>
              {["Turmeric", "Black Pepper", "Cardamom Powder", "Cumin Powder"].map((name) => (
                <p
                  key={name}
                  onClick={() => setQuery(name)}
                  className="text-paper/55 text-sm py-1.5 hover:text-paper transition-colors cursor-none"
                >
                  {name}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
