import { motion } from "motion/react";
import { MagneticButton } from "./MagneticButton";
import { useRef, useCallback } from "react";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-glow-gold absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40" />
      </div>

      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glass-strong overflow-hidden rounded-[2.5rem] p-10 md:p-16"
        >
          <h2 className="mt-4 text-balance text-5xl leading-[1.05] md:text-7xl">
            Start your <span className="text-serif-italic text-gold-gradient">ritual</span> today.
          </h2>
          <p className="mt-6 max-w-lg text-muted-foreground">
            Questions about which product is right for you? Want to know more about
            our sourcing or testing? We read every message and reply within 24 hours.
          </p>

          <form className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Your name" placeholder="Jane Doe" />
            <Field label="Email" placeholder="jane@email.com" type="email" />
            <div className="md:col-span-2">
              <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Your message</label>
              <textarea
                rows={4}
                placeholder="I'd like to know more about Shilajit resin and which strength to start with…"
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
              />
            </div>
          </form>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <MagneticButton>Send Message →</MagneticButton>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              or · <a className="text-gold" href="mailto:hello@nativerituals.co">hello@nativerituals.co</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
      />
    </div>
  );
}

const SOCIALS = ["Facebook", "Instagram", "LinkedIn", "YouTube", "Pinterest"];

const GOLD_TEXT: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(135deg, oklch(0.92 0.08 92) 0%, oklch(0.68 0.18 78) 40%, oklch(0.88 0.12 88) 70%, oklch(0.74 0.15 84) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[oklch(0.08_0.01_90)]">

      {/* ── Giant NATIVE wordmark + centred logo ── */}
      <div className="relative flex items-center justify-center">
        {/* Background wordmark */}
        <div
          aria-hidden
          className="select-none whitespace-nowrap leading-none tracking-tighter"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(8rem, 22vw, 20rem)",
            fontWeight: 800,
            textTransform: "uppercase",
            ...GOLD_TEXT,
          }}
        >
          NATIVE
        </div>

        {/* Centred logo overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <img src="/logo.png" alt="Native Rituals" className="h-24 w-auto md:h-32" />
        </div>
      </div>

      {/* ── Follow Us row ── */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-8 py-8">
        <span
          className="text-[clamp(1.4rem,3vw,2.2rem)] font-bold uppercase tracking-tight text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Follow Us —
        </span>

        <div className="flex flex-wrap items-center gap-x-8">
          {SOCIALS.map((s) => (
            <a
              key={s}
              href="#"
              className="text-[clamp(1rem,2vw,1.6rem)] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:text-white/70"
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* ── Bottom copyright bar ── */}
      <div className="flex flex-wrap items-center justify-center gap-6 px-8 py-5 text-[10px] uppercase tracking-[0.25em] text-white/60">
        <span className="text-white/20">|</span>
        <a href="#" className="transition-colors hover:text-white/40">Terms &amp; Conditions</a>
        <span className="text-white/20">|</span>
        <a href="#" className="transition-colors hover:text-white/40">Privacy Policy</a>
        <span className="text-white/20">|</span>
      </div>

    </footer>
  );
}
