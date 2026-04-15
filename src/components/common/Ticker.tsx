import { SPICES } from "@/data";

export function Ticker() {
  const names = [...SPICES, ...SPICES].map((s) => s.name);

  return (
    <div className="bg-rust py-3 overflow-hidden">
      <div
        className="ticker-track text-[0.625rem] tracking-[0.22em] uppercase text-paper/[0.82] font-medium"
      >
        {names.map((name, i) => (
          <span key={i}>
            {name}
            <span className="text-turmeric mx-5">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
