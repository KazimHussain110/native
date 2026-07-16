import { motion } from "motion/react";
import { SectionHeading } from "./ProductShowcase";

const quotes = [
  {
    q: "They treat glass the way perfumers treat scent — as a language. Our launches feel considered because our vessels are.",
    a: "Head of Packaging, Maison Noir",
  },
  {
    q: "The only partner who returned samples better than the brief. Their gold hot-stamp is unmatched.",
    a: "Creative Director, Aurelia",
  },
  {
    q: "Reliable at scale, obsessive on detail. Fifteen years and not a single missed launch window.",
    a: "COO, Kin·do Beverages",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32 md:py-40">
      <SectionHeading
        eyebrow="Voices"
        title={<>What our <span className="text-serif-italic text-gold-gradient">makers</span> say.</>}
      />
      <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
        {quotes.map((q, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: i * 0.12 }}
            className="glass relative rounded-3xl p-8"
            style={{ marginTop: `${(i % 2) * 40}px` }}
          >
            <div className="text-6xl leading-none text-gold-gradient" style={{ fontFamily: "var(--font-display)" }}>"</div>
            <p className="mt-2 text-lg leading-relaxed text-foreground/90" style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300 }}>
              {q.q}
            </p>
            <footer className="mt-8 border-t border-white/10 pt-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
              — {q.a}
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
