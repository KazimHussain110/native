import { motion } from "motion/react";
import { SectionHeading } from "./ProductShowcase";

export function Sustainability() {
  return (
    <section id="sustainability" className="relative overflow-hidden py-32 md:py-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-glow-emerald absolute left-1/4 top-20 h-[500px] w-[500px] rounded-full opacity-50" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="glass-strong relative aspect-square overflow-hidden rounded-[2rem] p-8">
            <div className="absolute inset-4 rounded-[1.5rem] border border-gold/20" />
            <div className="absolute inset-0 grid place-items-center">
              <motion.svg
                viewBox="0 0 200 200"
                className="h-3/4 w-3/4"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <defs>
                  <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.14 85)" />
                    <stop offset="50%" stopColor="oklch(0.42 0.1 165)" />
                    <stop offset="100%" stopColor="oklch(0.78 0.14 85)" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="90" fill="none" stroke="url(#ring)" strokeWidth="1" strokeDasharray="3 8" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="url(#ring)" strokeWidth="1" opacity="0.4" />
                <circle cx="100" cy="100" r="45" fill="none" stroke="url(#ring)" strokeWidth="1" opacity="0.7" />
              </motion.svg>
            </div>
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="text-6xl text-gold-gradient" style={{ fontFamily: "var(--font-display)" }}>98%</div>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">Recyclable Output</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div>
          <SectionHeading
            eyebrow="Sustainability"
            title={<>Made to <span className="text-serif-italic text-gold-gradient">outlive</span> a trend.</>}
          />
          <div className="mt-10 space-y-6">
            {[
              { t: "100% rPET & rHDPE lines", d: "Post-consumer recycled resins with virgin-grade clarity." },
              { t: "Closed-loop glass", d: "Cullet returned, melted, reborn — up to 90% recycled content." },
              { t: "Carbon-scored batches", d: "Every order ships with a full CO₂e report and offset option." },
            ].map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * i }}
                className="flex gap-5 border-b border-white/5 pb-6"
              >
                <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/40 text-xs text-gold">
                  0{i + 1}
                </span>
                <div>
                  <h4 className="text-xl">{f.t}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
