import { motion } from "motion/react";
import { MagneticButton } from "./MagneticButton";
import { useRef, useCallback } from "react";
import { Facebook, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative z-0 min-h-screen py-32 md:py-40">
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
            <span style={{ color: "#4a7c52" }}>Start your </span>
            <span className="text-serif-italic text-gold-gradient">ritual</span>
            <span style={{ color: "#4a7c52" }}> today.</span>
          </h2>
          <p className="mt-6 max-w-lg text-muted-foreground">
            Questions about which product is right for you? Want to know more about our sourcing or
            testing? We read every message and reply within 24 hours.
          </p>

          <form className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Your name" placeholder="Jane Doe" />
            <Field label="Email" placeholder="jane@email.com" type="email" />
            <div className="md:col-span-2">
              <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Your message
              </label>
              <textarea
                rows={4}
                placeholder="I'd like to know more about Shilajit resin and which strength to start with…"
                className="w-full resize-none rounded-2xl border border-black/8 bg-black/[0.02] p-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
              />
            </div>
          </form>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <MagneticButton>Send Message →</MagneticButton>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              or ·{" "}
              <a className="text-gold" href="mailto:hello@nativerituals.co">
                hello@nativerituals.co
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-full border border-black/8 bg-black/[0.02] px-5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
      />
    </div>
  );
}

function PinterestIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

const SOCIALS = [
  { name: "Facebook", icon: Facebook },
  { name: "Instagram", icon: Instagram },
  { name: "YouTube", icon: Youtube },
  { name: "LinkedIn", icon: Linkedin },
  { name: "Pinterest", icon: PinterestIcon },
];

const GOLD_TEXT: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(135deg, oklch(0.92 0.08 92) 0%, oklch(0.68 0.18 78) 40%, oklch(0.88 0.12 88) 70%, oklch(0.74 0.15 84) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export function Footer({ footerRef }: { footerRef?: React.RefObject<HTMLElement | null> }) {
  return (
    <footer
      ref={footerRef}
      className="relative z-0 w-full overflow-hidden bg-[#4a7c52] md:fixed md:bottom-0 md:left-0 md:right-0"
      style={{
        backgroundImage: "url('/footer-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 pt-14 pb-10 md:grid-cols-3 md:gap-0 md:px-8 md:pt-32 md:pb-24">
        {/* ── Column 1: Logo + Tagline + Socials ── */}
        <div className="flex flex-col items-center gap-5 text-center md:items-start md:gap-6 md:border-r md:border-white/15 md:pr-12 md:text-left">
          <div className="flex flex-col items-center gap-1">
            <div
              aria-hidden
              className="select-none whitespace-nowrap leading-none tracking-tighter text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 8vw, 5rem)",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              NATIVE
            </div>
            <div
              aria-hidden
              className="select-none whitespace-nowrap leading-none tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 5vw, 3rem)",
                fontWeight: 700,
                textTransform: "uppercase",
                ...GOLD_TEXT,
              }}
            >
              Rituals
            </div>
            <img src="/logo.png" alt="Native Rituals" className="mt-2 h-10 w-auto md:h-14" />
          </div>
          <p className="max-w-xs text-base leading-relaxed text-white/80">
            We craft premium Himalayan supplements rooted in centuries-old tradition. Every product
            is ethically sourced, rigorously tested, and designed to elevate your daily wellness
            ritual.
          </p>
          <div className="flex justify-center gap-4 md:justify-start">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href="#"
                aria-label={s.name}
                className="flex items-center justify-center transition-colors hover:opacity-70"
              >
                <s.icon className="h-6 w-6" style={{ color: "oklch(0.88 0.12 88)" }} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Column 2: Pages — Shop + Company ── */}
        <div className="flex justify-center gap-14 border-t border-white/15 pt-8 text-center md:justify-start md:gap-16 md:border-t-0 md:border-r md:border-white/15 md:px-12 md:pt-0 md:text-left">
          <div className="flex flex-col gap-4">
            <h3
              className="text-sm font-bold uppercase tracking-[0.2em] text-white/50"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Shop
            </h3>
            <div className="flex flex-col gap-5 mt-4">
              <a
                href="/shop"
                className="text-sm font-medium text-white transition-colors hover:text-white/70"
              >
                All Products
              </a>
              <a
                href="/shop"
                className="text-sm font-medium text-white transition-colors hover:text-white/70"
              >
                Shilajit
              </a>
              <a
                href="/shop"
                className="text-sm font-medium text-white transition-colors hover:text-white/70"
              >
                Ashwagandha
              </a>
              <a
                href="/cart"
                className="text-sm font-medium text-white transition-colors hover:text-white/70"
              >
                Cart
              </a>
              <a
                href="/wishlist"
                className="text-sm font-medium text-white transition-colors hover:text-white/70"
              >
                Wishlist
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3
              className="text-sm font-bold uppercase tracking-[0.2em] text-white/50"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Company
            </h3>
            <div className="flex flex-col gap-5 mt-4">
              <a
                href="/"
                className="text-sm font-medium text-white transition-colors hover:text-white/70"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-sm font-medium text-white transition-colors hover:text-white/70"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-sm font-medium text-white transition-colors hover:text-white/70"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* ── Column 3: Newsletter ── */}
        <div className="flex flex-col border-t border-white/15 pt-8 text-center md:border-t-0 md:pt-0 md:pl-12 md:text-left">
          <h3
            className="text-sm font-bold uppercase tracking-[0.2em] text-white/50"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Newsletter
          </h3>
          <div className="mt-6">
            <p className="text-sm leading-relaxed text-white/70">
              Subscribe for exclusive offers, wellness tips, and new arrivals.
            </p>
            <form className="mx-auto mt-5 flex max-w-md md:mx-0 md:mt-6" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-l-lg border border-r-0 border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/40 focus:bg-white/15"
              />
              <button
                type="submit"
                className="shrink-0 rounded-r-lg px-4 py-3 text-black transition-opacity hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.92 0.08 92) 0%, oklch(0.74 0.15 84) 100%)",
                }}
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
            <div className="mx-auto mt-6 grid max-w-sm grid-cols-4 gap-3 md:mx-0 md:mt-8">
              {[1, 2, 3, 4].map((n) => (
                <img
                  key={n}
                  src={`/footer-badge-${n}.png`}
                  alt={`Badge ${n}`}
                  className="h-auto w-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom copyright bar ── */}
      <div className="flex flex-wrap justify-center gap-3 border-t border-white/10 px-5 py-5 text-center text-[9px] uppercase tracking-[0.18em] text-white/40 sm:gap-6 sm:px-6 sm:py-6 sm:text-[10px] sm:tracking-[0.25em]">
        <a href="#" className="transition-colors hover:text-white/60">
          Terms &amp; Conditions
        </a>
        <span className="mx-3 hidden sm:inline text-white/20">|</span>
        <a href="#" className="transition-colors hover:text-white/60">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
