import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "James R.",
    initial: "J",
    title: "Life changing product",
    text: "I've tried every Shilajit on the market. Native Rituals is the only one that actually tastes and feels like the real thing. My energy levels changed within a week.",
    rating: 5,
  },
  {
    name: "Priya M.",
    initial: "P",
    title: "Best Ashwagandha I've used",
    text: "The Ashwagandha is genuinely the best I've used. I sleep deeper, I'm less reactive to stress, and I actually notice when I skip a day.",
    rating: 5,
  },
  {
    name: "Tom K.",
    initial: "T",
    title: "Part of my daily ritual now",
    text: "The Shilajit shots are now part of my morning non-negotiables. Clean, no sugar, and I can feel the difference in my training recovery.",
    rating: 5,
  },
  {
    name: "Sarah L.",
    initial: "S",
    title: "Exceptional quality and purity",
    text: "You can genuinely taste the difference with Native Rituals. The shilajit resin dissolves perfectly and the effects on my focus and endurance are undeniable.",
    rating: 5,
  },
  {
    name: "Rohan P.",
    initial: "R",
    title: "Finally something that works",
    text: "After years of trying supplements that did nothing, Native Rituals changed everything. My recovery times dropped and my sleep quality improved dramatically.",
    rating: 5,
  },
  {
    name: "Emma W.",
    initial: "E",
    title: "My morning non-negotiable",
    text: "The ritual bundle was the best purchase I made this year. Every product feels premium and you can tell there are zero fillers. True purity.",
    rating: 5,
  },
  {
    name: "Daniel K.",
    initial: "D",
    title: "Game changer for training",
    text: "I've been using the shilajit shots before my workouts and the difference in my endurance is night and day. Clean energy without any jitters or crash.",
    rating: 5,
  },
  {
    name: "Aisha M.",
    initial: "A",
    title: "Stress relief that actually works",
    text: "The Ashwagandha extract has been incredible for my anxiety. I feel calmer, more focused, and my cortisol levels have visibly improved on my blood work.",
    rating: 5,
  },
  {
    name: "Chris B.",
    initial: "C",
    title: "Worth every penny",
    text: "Premium products at a fair price. The certificate of analysis included with every order gives me full confidence in what I'm putting in my body.",
    rating: 5,
  },
];

const CARD_WIDTH = 300;
const GAP = 24;
const VISIBLE = 3;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={s <= rating ? "oklch(0.78 0.14 85)" : "oklch(0.78 0.14 85 / 0.2)"}
          />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const maxIndex = reviews.length - VISIBLE;

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i === 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const visibleReviews = [];
  for (let i = 0; i < VISIBLE; i++) {
    visibleReviews.push(reviews[(index + i) % reviews.length]);
  }

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="relative z-10">
        {/* Heading */}
        <div className="mx-auto max-w-4xl px-6 text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[10px] uppercase tracking-[0.45em] text-gold/70"
          >
            Voices
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 text-[clamp(2rem,8vw,9rem)] leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span style={{ color: "#4a7c52" }}>Real people, </span>
            <span className="text-serif-italic text-gold-gradient">real results</span>.
          </motion.h2>
        </div>

        {/* Carousel */}
        <div className="relative mx-auto max-w-6xl px-6">
          {/* Prev button */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-foreground shadow-md transition-colors hover:border-gold/50 hover:text-gold md:-translate-x-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Cards */}
          <div className="overflow-hidden mx-4 md:mx-10">
            <div className="flex gap-6">
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleReviews.map((r, i) => {
                  const slideDirection = direction > 0 ? 1 : -1;
                  return (
                    <motion.div
                      key={`${index}-${i}`}
                      initial={{ opacity: 0, x: slideDirection * 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -slideDirection * 300 }}
                      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                      className="flex-shrink-0 flex flex-col rounded-2xl border border-black/8 p-8 bg-white min-h-[400px]"
                      style={{ width: CARD_WIDTH }}
                    >
                      {/* Green quotation mark */}
                      <div className="text-7xl leading-none font-bold" style={{ fontFamily: "var(--font-display)", color: "#4a7c52" }}>"</div>

                      {/* Stars */}
                      <div className="mt-4">
                        <Stars rating={r.rating} />
                      </div>

                      {/* Review title */}
                      <h3 className="mt-5 text-lg font-semibold text-foreground">{r.title}</h3>

                      {/* Review text */}
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{r.text}</p>

                      {/* Avatar + name at bottom */}
                      <div className="mt-6 flex items-center gap-3 border-t border-black/8 pt-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4a7c52] text-white text-sm font-semibold">
                          {r.initial}
                        </div>
                        <span className="text-sm font-medium text-foreground">{r.name}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-foreground shadow-md transition-colors hover:border-gold/50 hover:text-gold md:translate-x-2"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-[#4a7c52]" : "w-2 bg-black/15 hover:bg-black/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
