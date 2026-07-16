import { motion, useMotionValue, useSpring } from "motion/react";
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

const MARQUEE_LETTERS = "NATIVE RITUALS".split("");
const MARQUEE_RADIUS = 120;

function MarqueeWord() {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const cx = e.clientX;
    const cy = e.clientY;
    letterRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const lx = r.left + r.width / 2;
      const ly = r.top + r.height / 2;
      const dist = Math.sqrt((cx - lx) ** 2 + (cy - ly) ** 2);
      const t = Math.max(0, 1 - dist / MARQUEE_RADIUS);
      const dx = ((cx - lx) / MARQUEE_RADIUS) * 40;
      const dy = ((cy - ly) / MARQUEE_RADIUS) * 30;

      if (t > 0) {
        // Apply gradient only when cursor is close
        el.style.backgroundImage = [
          "linear-gradient(135deg,",
          "oklch(0.92 0.08 92) 0%,",
          "oklch(0.78 0.16 82) 20%,",
          "oklch(0.97 0.04 96) 38%,",
          "oklch(0.68 0.18 78) 55%,",
          "oklch(0.88 0.12 88) 72%,",
          "oklch(0.96 0.06 94) 85%,",
          "oklch(0.74 0.15 84) 100%)",
        ].join(" ");
        el.style.webkitBackgroundClip = "text";
        el.style.backgroundClip = "text";
        el.style.webkitTextFillColor = "transparent";
        el.style.backgroundSize = "220% 220%";
        el.style.backgroundPosition = `${50 + dx}% ${50 + dy}%`;
        el.style.opacity = String(0.15 + t * 0.85);
      } else {
        // Restore plain dim color — no gradient hack
        el.style.backgroundImage = "none";
        el.style.webkitBackgroundClip = "unset";
        el.style.backgroundClip = "unset";
        el.style.webkitTextFillColor = "unset";
        el.style.color = "oklch(1 0 0 / 0.12)";
        el.style.opacity = "1";
      }
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    letterRefs.current.forEach((el) => {
      if (!el) return;
      el.style.backgroundImage = "none";
      el.style.webkitBackgroundClip = "unset";
      el.style.backgroundClip = "unset";
      el.style.webkitTextFillColor = "unset";
      el.style.color = "oklch(1 0 0 / 0.12)";
      el.style.opacity = "1";
    });
  }, []);

  return (
    <span
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-flex"
    >
      {MARQUEE_LETTERS.map((char, i) => (
        <span
          key={i}
          ref={(el) => { letterRefs.current[i] = el; }}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            color: "oklch(1 0 0 / 0.12)",
            transition: "opacity 0.18s ease, transform 0.18s ease",
          } as React.CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

const WORDMARK = "NATIVE RITUALS".split("");
const RADIUS = 220;

function CursorWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const cx = e.clientX;
    const cy = e.clientY;

    letterRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const lx = r.left + r.width / 2;
      const ly = r.top + r.height / 2;

      const dist = Math.sqrt((cx - lx) ** 2 + (cy - ly) ** 2);
      const t = Math.max(0, 1 - dist / RADIUS); // 1 = under cursor, 0 = far

      // Angle from cursor to letter — drives which shimmer colour shows
      const angle = Math.atan2(ly - cy, lx - cx); // -π to π
      const angleDeg = ((angle * 180) / Math.PI + 360) % 360;

      el.style.setProperty("--t", String(t));
      el.style.setProperty("--angle", `${angleDeg}deg`);
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    letterRefs.current.forEach((el) => {
      if (el) el.style.setProperty("--t", "0");
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="absolute inset-x-0 bottom-0 flex items-end justify-center overflow-hidden pb-2 select-none cursor-default"
      aria-hidden
    >
      <div
        className="flex tracking-tighter"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 14vw, 12rem)",
          fontWeight: 700,
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        {WORDMARK.map((char, i) => (
          <span
            key={i}
            ref={(el) => { letterRefs.current[i] = el; }}
            className="cursor-letter"
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              backgroundImage: [
                // Layer 1 — deep champagne base
                "linear-gradient(135deg,"
                + "oklch(0.92 0.08 92) 0%,"
                + "oklch(0.78 0.16 82) 25%,"
                + "oklch(0.96 0.06 95) 45%,"
                + "oklch(0.68 0.18 78) 65%,"
                + "oklch(0.88 0.12 88) 80%,"
                + "oklch(0.74 0.15 84) 100%)",
              ].join(","),
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              // opacity: near-invisible at rest, full gold under cursor
              opacity: "calc(0.035 + var(--t, 0) * 0.965)",
              // Subtle scale pulse on the hottest letters
              transform: "scale(calc(1 + var(--t, 0) * 0.04))",
              transition: "opacity 0.2s ease, transform 0.2s ease",
              // Shift the gradient angle with cursor direction for shimmer
              backgroundSize: "200% 200%",
              backgroundPosition:
                "calc(50% + var(--t, 0) * 30%) calc(50% - var(--t, 0) * 20%)",
            } as React.CSSProperties}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

const LINKS = {
  Explore: ["Shilajit Resin", "Ashwagandha", "Shilajit Shots", "Bundles"],
  Learn:   ["Our Story", "Sourcing", "Lab Results", "Benefits"],
  Support: ["FAQ", "Shipping", "Returns", "Contact"],
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden">

      {/* ── Marquee strip ── */}
      <div className="relative border-y border-white/5 py-10 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
          className="flex w-max gap-12 whitespace-nowrap"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {i % 2 === 0
                ? <MarqueeWord />
                : <span className="text-serif-italic text-gold-gradient">ancient wisdom</span>}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Editorial CTA band ── */}
      <div className="relative overflow-hidden border-b border-white/5">
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="hero-glow-gold absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_auto]">

            {/* Left — big headline */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-5 text-[10px] uppercase tracking-[0.4em] text-gold/60"
              >
                Begin your ritual
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                className="text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-tight"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                Your body has been{" "}
                <span className="text-serif-italic text-gold-gradient">waiting</span>
                <br />for this.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
              >
                Three products. One ritual. Sourced from the Himalayas,
                tested in the lab, and built for the long game.
              </motion.p>
            </div>

            {/* Right — newsletter glass card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="glass-strong w-full max-w-sm rounded-[2rem] p-8"
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold/70">Stay in the ritual</p>
              <p className="mt-2 mb-6 text-sm leading-relaxed text-muted-foreground">
                Early access, sourcing stories &amp; restocks — straight to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold/50"
                />
                <button className="w-full rounded-full bg-gradient-to-r from-[oklch(0.88_0.1_90)] via-[oklch(0.78_0.14_85)] to-[oklch(0.62_0.13_78)] py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90">
                  Join the ritual →
                </button>
              </div>
              <p className="mt-4 text-center text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
                No spam. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Nav grid ── */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand col */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-2 md:col-span-1 flex flex-col gap-7"
          >
            <img src="/logo.png" alt="Native Rituals" className="h-8 w-auto self-start" />
            <p className="max-w-[22ch] text-sm leading-relaxed text-muted-foreground">
              Himalayan Shilajit and Ayurvedic adaptogens — sourced at origin,
              tested for purity, crafted for the modern body.
            </p>
            {/* Social pills */}
            <div className="flex gap-2">
              {["IG", "TK", "YT", "X"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="glass flex h-9 w-9 items-center justify-center rounded-full text-[9px] font-bold uppercase tracking-widest text-muted-foreground transition-all hover:border-gold/30 hover:text-gold"
                >
                  {s}
                </a>
              ))}
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {["Lab Tested", "GMP Certified", "No Fillers"].map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/8 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50"
                >
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Link cols */}
          {Object.entries(LINKS).map(([heading, items], i) => (
            <motion.div
              key={heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.07 }}
            >
              <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-gold/60">{heading}</p>
              <ul className="space-y-3.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 md:flex-row md:items-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/40">
            © {new Date().getFullYear()} Native Rituals · All rights reserved
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms", "Cookie Settings"].map((l) => (
              <a key={l} href="#" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 transition-colors hover:text-muted-foreground">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Large background wordmark — cursor fills each letter with gold */}
      <CursorWordmark />

    </footer>
  );
}
