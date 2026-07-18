import { motion } from "motion/react";
import { SectionHeading } from "./ProductShowcase";

const quotes = [
  {
    q: "I've tried every Shilajit on the market. Native Rituals is the only one that actually tastes and feels like the real thing. My energy levels changed within a week.",
    a: "James R. · Verified Customer",
    product: "Pure Shilajit Resin",
    img: "/products/01.png",
  },
  {
    q: "The Ashwagandha is genuinely the best I've used. I sleep deeper, I'm less reactive to stress, and I actually notice when I skip a day.",
    a: "Priya M. · Verified Customer",
    product: "Ashwagandha Extract",
    img: "/products/02.png",
  },
  {
    q: "The Shilajit shots are now part of my morning non-negotiables. Clean, no sugar, and I can feel the difference in my training recovery.",
    a: "Tom K. · Verified Customer",
    product: "Shilajit Shots",
    img: "/products/03.png",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32 md:py-40" style={{ backgroundImage: "url('/testimonials-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="pointer-events-none absolute inset-0 bg-black/60" />
      <div className="relative z-10">
      <SectionHeading
        eyebrow="Voices"
        title={<>Real people, <span className="text-serif-italic text-gold-gradient">real results</span>.</>}
      />
      <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-3 md:items-stretch">
        {quotes.map((q, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: i * 0.12 }}
            className="glass relative flex flex-col rounded-3xl p-8"
          >
            {/* Product badge */}
            <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-3 py-2 w-fit">
              <img src={q.img} alt={q.product} className="h-8 w-8 object-contain drop-shadow-[0_4px_8px_oklch(0_0_0/0.4)]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{q.product}</span>
            </div>

            <div className="text-6xl leading-none text-gold-gradient" style={{ fontFamily: "var(--font-display)" }}>"</div>
            <p className="mt-2 flex-1 text-lg leading-relaxed text-foreground/90" style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300 }}>
              {q.q}
            </p>
            <footer className="mt-8 border-t border-white/10 pt-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
              — {q.a}
            </footer>
          </motion.blockquote>
        ))}
      </div>
      </div>
    </section>
  );
}
