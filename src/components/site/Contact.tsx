import { motion } from "motion/react";
import { MagneticButton } from "./MagneticButton";

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
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold">— Begin</p>
          <h2 className="mt-4 text-balance text-5xl leading-[1.05] md:text-7xl">
            Let's shape the <span className="text-serif-italic text-gold-gradient">next</span> vessel.
          </h2>
          <p className="mt-6 max-w-lg text-muted-foreground">
            Tell us about your product, volume, and launch window. We'll return a moodboard,
            material recommendations, and a first-quote within 48 hours.
          </p>

          <form className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Your name" placeholder="Jane Doe" />
            <Field label="Company" placeholder="Maison Noir" />
            <Field label="Email" placeholder="jane@brand.co" type="email" />
            <Field label="Est. volume" placeholder="50,000 units" />
            <div className="md:col-span-2">
              <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Project</label>
              <textarea
                rows={4}
                placeholder="A 100ml amber glass pump bottle for a serum launch in Q3…"
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
              />
            </div>
          </form>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <MagneticButton>Send Brief →</MagneticButton>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              or · <a className="text-gold" href="mailto:hello@verdantvessel.co">hello@verdantvessel.co</a>
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

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
        <div className="flex items-center gap-2 text-sm tracking-widest">
          <span className="inline-block h-2 w-2 rounded-full bg-gold" />
          <span className="uppercase">Verdant<span className="text-gold-gradient">Vessel</span></span>
        </div>
        <div className="flex flex-wrap gap-8 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          <a href="#products" className="hover:text-gold">Products</a>
          <a href="#process" className="hover:text-gold">Process</a>
          <a href="#industries" className="hover:text-gold">Industries</a>
          <a href="#sustainability" className="hover:text-gold">Sustainability</a>
          <a href="#contact" className="hover:text-gold">Contact</a>
        </div>
        <p className="text-xs text-muted-foreground/70">© {new Date().getFullYear()} VerdantVessel Manufacturing.</p>
      </div>
    </footer>
  );
}
