import { motion } from "motion/react";
import { SectionHeading } from "./ProductShowcase";

const industries = [
  { name: "Beauty & Skincare", count: "120+ brands" },
  { name: "Spirits & Beverages", count: "80+ labels" },
  { name: "Pharmaceuticals", count: "GMP certified" },
  { name: "Gourmet Food", count: "40+ producers" },
  { name: "Home Fragrance", count: "Luxury tier" },
  { name: "Nutraceuticals", count: "Serum & droppers" },
];

export function Industries() {
  return (
    <section id="industries" className="relative py-32 md:py-40">
      <SectionHeading
        eyebrow="Industries"
        title={<>The verticals we <span className="text-serif-italic text-gold-gradient">quietly</span> supply.</>}
      />
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 md:grid-cols-3 md:mx-auto md:px-0" style={{ marginInline: "auto", maxWidth: "72rem" }}>
        {industries.map((it, i) => (
          <motion.div
            key={it.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.06 }}
            className="group relative min-h-56 overflow-hidden bg-background p-8 transition-colors hover:bg-white/[0.03]"
          >
            <div className="absolute right-6 top-6 text-[10px] uppercase tracking-[0.3em] text-gold/70">0{i + 1}</div>
            <div className="flex h-full flex-col justify-end">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{it.count}</p>
              <h3 className="mt-3 text-2xl md:text-3xl">{it.name}</h3>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px translate-y-full bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-700 group-hover:translate-y-0" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
