import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui";
import { useNotif } from "@/context/NotifContext";

export function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [done,  setDone]  = useState(false);
  const { notify } = useNotif();

  const submit = () => {
    if (email.includes("@")) {
      setDone(true);
      notify("Subscribed! ✓");
    }
  };

  return (
    <section className="bg-rust py-20 px-5 text-center">
      <h2 className="font-display font-bold text-white text-[clamp(1.375rem,4vw,2.75rem)] mb-3 reveal">
        Stay in the flavour loop.
      </h2>
      <p className="text-paper/60 text-sm mb-8 reveal reveal-delay-1">
        New spices, exclusive deals and recipes — straight to your inbox.
      </p>

      {done ? (
        <div className="flex items-center justify-center gap-2.5 text-paper font-medium text-sm">
          <Check size={16} />
          You&apos;re subscribed — thank you!
        </div>
      ) : (
        <div className="flex flex-wrap max-w-md mx-auto reveal reveal-delay-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Enter your email"
            className="flex-1 min-w-[200px] px-4 py-3.5 bg-white/14 border-none text-white text-sm
                       placeholder-paper/45 outline-none"
          />
          <Button variant="dark" size="md" onClick={submit} className="rounded-none">
            Subscribe
          </Button>
        </div>
      )}
    </section>
  );
}
