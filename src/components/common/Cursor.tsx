import { useEffect, useRef } from "react";

export function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const tick = () => {
      const p = pos.current;
      p.rx += (p.x - p.rx) * 0.13;
      p.ry += (p.y - p.ry) * 0.13;
      if (dot.current)  { dot.current.style.left  = `${p.x}px`;  dot.current.style.top  = `${p.y}px`;  }
      if (ring.current) { ring.current.style.left = `${p.rx}px`; ring.current.style.top = `${p.ry}px`; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const grow   = () => {
      if (dot.current)  { dot.current.style.width  = dot.current.style.height  = "18px"; }
      if (ring.current) { ring.current.style.width = ring.current.style.height = "50px"; }
    };
    const shrink = () => {
      if (dot.current)  { dot.current.style.width  = dot.current.style.height  = "10px"; }
      if (ring.current) { ring.current.style.width = ring.current.style.height = "32px"; }
    };

    document.addEventListener("mouseenter", (e) => {
      if ((e.target as Element).closest?.("a,button,[data-hover]")) grow();
    }, true);
    document.addEventListener("mouseleave", (e) => {
      if ((e.target as Element).closest?.("a,button,[data-hover]")) shrink();
    }, true);

    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot}  className="cursor-dot"  />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
