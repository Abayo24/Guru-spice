import { useMemo } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui";
import { PAGES } from "@/constants";
import type { PageKey } from "@/types";

interface HeroSectionProps {
  navigate: (page: PageKey) => void;
}

const PARTICLE_COLORS = ["#E5B03A", "#BF4E2A", "#C9960D", "#F5C040", "#903A18"];

export function HeroSection({ navigate }: HeroSectionProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id:    i,
        size:  Math.random() * 5 + 2,
        left:  `${Math.random() * 100}%`,
        bottom:`${Math.random() * 14}%`,
        dur:   `${6 + Math.random() * 9}s`,
        delay: `${Math.random() * 7}s`,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      })),
    []
  );

  const goTo = (p: PageKey) => { navigate(p); window.scrollTo(0, 0); };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-spice">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-hero-radial animate-bg-glow" />

      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.16]"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1532336414376-b48b3dfed1a4?w=1400&q=60&auto=format&fit=crop)" }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size, height: p.size,
            background: p.color,
            left: p.left, bottom: p.bottom,
            ["--dur" as string]:   p.dur,
            ["--delay" as string]: p.delay,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-4xl">
        <p className="animate-fade-up [animation-delay:150ms] text-[0.625rem] tracking-[0.38em] uppercase text-turmeric mb-5">
          Nairobi · Kenya · Est. 2024
        </p>

        <h1 className="font-display font-black text-paper leading-[0.88] mb-7
                       text-[clamp(3.75rem,12vw,9.25rem)] animate-fade-up [animation-delay:450ms]">
          Guru
          <em className="block not-italic font-normal text-turmeric text-[0.58em]">
            Spices
          </em>
        </h1>

        <p className="animate-fade-up [animation-delay:720ms] text-sm text-paper/50 max-w-xs mx-auto mb-10 leading-relaxed tracking-[0.04em]">
          Pure. Bold. Aromatic. Twelve handpicked spices in 50g&nbsp;&amp;&nbsp;100g.
        </p>

        <div className="animate-fade-up [animation-delay:950ms] flex flex-wrap gap-3 justify-center">
          <Button variant="primary" size="lg" onClick={() => goTo(PAGES.shop)}>
            Explore Spices
          </Button>
          <Button
            variant="outline-light"
            size="lg"
            onClick={() => goTo(PAGES.deals)}
          >
            <Zap size={13} /> Today's Deals
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="animate-fade-up [animation-delay:1300ms] absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
        <div
          className="w-px h-[52px] animate-scroll-bar"
          style={{ background: "linear-gradient(to bottom, #E5B03A, transparent)" }}
        />
        <span className="text-[0.5625rem] tracking-[0.22em] uppercase text-paper/26">
          Scroll
        </span>
      </div>
    </section>
  );
}
