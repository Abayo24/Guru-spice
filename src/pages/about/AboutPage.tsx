import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { REVIEWS, WA_NUMBER } from "@/data";
import { PAGES } from "@/constants";
import { useReveal } from "@/hooks";
import { Button, SectionHeader, Breadcrumb, Stars, Badge } from "@/components/ui";
import { NewsletterStrip } from "@/components/common";
import { waLink, cn } from "@/utils";
import type { PageKey } from "@/types";

interface AboutPageProps {
  navigate: (page: PageKey) => void;
}

export default function AboutPage({ navigate }: AboutPageProps) {
  useReveal();

  return (
    <div className="page-enter">
      {/* Page hero */}
      <div className="page-hero">
        <div
          className="page-hero-bg"
          // style={{ backgroundImage: "url(https://images.unsplash.com/photo-1532336414376-b48b3dfed1a4?w=1200&q=60&auto=format&fit=crop)" }}
        />
        <div className="max-w-site mx-auto px-12 max-md:px-5 relative">
          <Breadcrumb crumbs={[{ label: "Home", page: PAGES.home }, { label: "About" }]} navigate={navigate} />
          <p className="text-[0.625rem] tracking-[0.3em] uppercase text-turmeric font-semibold mb-3">Our Story</p>
          <h1 className="font-display font-bold text-paper leading-[1.05] mb-3.5"
              style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
            About Guru Spices
          </h1>
          <p className="text-sm text-paper/50 max-w-[480px] leading-relaxed">
            Pure spices, real flavour, total transparency — this is what Guru Spices is built on.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 px-12 max-md:px-5">
        <div className="max-w-site mx-auto grid grid-cols-2 gap-16 items-center max-[860px]:grid-cols-1 max-[860px]:gap-8">
          <div className="reveal">
            <SectionHeader label="Who We Are" title={<>Where every dish finds its <em className="font-display italic text-rust" style={{ fontStyle: "italic" }}>soul.</em></>} />
            <div className="w-10 h-0.5 bg-rust my-4" />
            <p className="text-sm leading-[1.95] text-muted mb-3">
              Guru Spices was born from a simple frustration: most spices in Nairobi are bulked out with fillers, left sitting on shelves too long, or ground so coarsely they barely flavour your food.
            </p>
            <p className="text-sm leading-[1.95] text-muted mb-3">
              We set out to change that. Every Guru Spice is sourced from trusted farms, stored correctly and ground fresh in small batches — so what arrives in your kitchen is as close to the raw spice as possible.
            </p>
            <p className="text-sm leading-[1.95] text-muted mb-7">
              We offer twelve signature spices in 50g and 100g, perfect for every cook — from the busy mum who just needs quality cinnamon, to the restaurant chef building complex spice blends from scratch.
            </p>
            <div className="flex gap-2.5 flex-wrap">
              <Button variant="primary" size="md" onClick={() => { navigate(PAGES.shop); window.scrollTo(0, 0); }}>
                Shop Our Spices
              </Button>
              <Button variant="whatsapp" size="md" href={waLink("Hello Guru Spices! I'd like to learn more.", WA_NUMBER)} target="_blank" rel="noreferrer">
                <MessageCircle size={13} /> Chat with Us
              </Button>
            </div>
          </div>
          <div className="reveal reveal-delay-2 rounded-full relative overflow-hidden min-h-[420px]">
            <img
              src="./spice1.jpg"
              alt="Spices" className="w-full h-full object-cover min-h-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-rust/22 to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-cream py-0 px-12 max-md:px-5">
        <div className="max-w-site mx-auto grid grid-cols-4 gap-0.5 max-[960px]:grid-cols-2 max-[480px]:grid-cols-1">
          {[
            { n: "12",    l: "Signature Spices"  },
            { n: "2",     l: "Size Options"       },
            { n: "100%",  l: "Pure & Natural"     },
            { n: "1-Day", l: "Nairobi Delivery"   },
          ].map((s) => (
            <div key={s.l} className="reveal p-9">
              <div className="font-display font-bold text-ink leading-none mb-2"
                   style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)" }}>
                {s.n}
              </div>
              <div className="text-[0.625rem] tracking-[0.14em] uppercase text-muted">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-12 max-md:px-5">
        <div className="max-w-site mx-auto">
          <div className="text-center mb-12">
            <SectionHeader label="What We Stand For" title="Our Values" center className="reveal" />
          </div>
          <div className="grid grid-cols-3 gap-0.5 max-[860px]:grid-cols-2 max-[500px]:grid-cols-1">
            {[
              { icon: "🌿", t: "No Fillers, Ever",      d: "We never add starches, anti-caking agents or artificial flavours. What you see is 100% what you get." },
              { icon: "🔬", t: "Quality First",          d: "Every batch is quality-checked for aroma, colour and potency before we'll ever pack it." },
              { icon: "🤝", t: "Honest Pricing",         d: "Fair and transparent prices. No hidden fees, no surprises — just great spices at prices that make sense." },
              { icon: "🚀", t: "Fast & Reliable",       d: "Running out mid-cook is a crisis. Same-day delivery across Nairobi — we've got you covered." },
              { icon: "📦", t: "Small Batch Freshness", d: "We grind in small batches and restock regularly so your spices are always as fresh as possible." },
              { icon: "💬", t: "Personal Service",       d: "Every order goes through WhatsApp. You talk to a real person — your order is handled with care." },
            ].map((v, i) => (
              <div
                key={v.t}
                className={cn(
                  "reveal p-8 bg-paper border-b-2 border-transparent transition-all hover:border-rust hover:-translate-y-1",
                  i % 3 === 1 && "reveal-delay-1",
                  i % 3 === 2 && "reveal-delay-2"
                )}
              >
                <span className="text-[1.625rem] block mb-3.5">{v.icon}</span>
                <h3 className="font-display font-semibold text-ink text-[1.125rem] mb-2.5">{v.t}</h3>
                <p className="text-[0.8125rem] leading-[1.85] text-muted">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Reviews */}
      <section className="bg-spice py-20 px-12 max-md:px-5 relative overflow-hidden">
        <div className="absolute top-[-6.25rem] left-0 font-display text-paper/[0.022] pointer-events-none select-none"
             style={{ fontSize: "clamp(12.5rem,32vw,30rem)", lineHeight: 1 }}>"</div>
        <div className="max-w-site mx-auto">
          <p className="reveal text-[0.625rem] tracking-[0.28em] uppercase text-turmeric font-semibold mb-10">
            What People Are Saying
          </p>
          <div className="grid grid-cols-3 gap-0.5 max-[860px]:grid-cols-2 max-[500px]:grid-cols-1">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className={cn(
                  "reveal p-8 bg-paper/[0.03] border-t border-paper/7",
                  i % 3 === 1 && "reveal-delay-1",
                  i % 3 === 2 && "reveal-delay-2"
                )}
              >
                <div className="flex items-center justify-between mb-3.5">
                  <Stars rating={r.stars} />
                  {r.verified && <Badge variant="sage">✓ Verified</Badge>}
                </div>
                <p className="font-display italic text-paper/70 text-[1rem] leading-[1.7] mb-5">"{r.quote}"</p>
                <p className="text-[0.625rem] tracking-[0.12em] uppercase text-turmeric">{r.author}</p>
                <p className="text-[0.6875rem] text-paper/30 mt-0.5">{r.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-cream py-20 px-12 max-md:px-5 text-center">
        <div className="max-w-site mx-auto">
          <SectionHeader label="Get In Touch" title="We're always here to help."
            subtitle="All orders, questions and wholesale inquiries go through WhatsApp. We usually respond within minutes during business hours."
            center className="reveal mb-8" />
          <div className="reveal flex gap-3 justify-center flex-wrap mb-8">
            <Button variant="whatsapp" size="md" href={waLink("Hello Guru Spices! I'd like to get in touch.", WA_NUMBER)} target="_blank" rel="noreferrer">
              <MessageCircle size={15} /> Chat on WhatsApp
            </Button>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {[
              { icon: <Phone size={15} />,  t: "Call Us",   v: "+254 739 515 936" },
              { icon: <MapPin size={15} />, t: "Location",  v: "Nairobi, Kenya"   },
              { icon: <Clock size={15} />,  t: "Hours",     v: "Mon–Sat 8am–7pm" },
            ].map((c) => (
              <div key={c.t} className="flex items-center gap-2.5 bg-paper px-4 py-3 border border-rust/15">
                <span className="text-rust shrink-0">{c.icon}</span>
                <div>
                  <p className="text-[0.5625rem] tracking-[0.1em] uppercase text-muted mb-0.5">{c.t}</p>
                  <p className="text-xs font-semibold text-ink">{c.v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterStrip />
    </div>
  );
}
