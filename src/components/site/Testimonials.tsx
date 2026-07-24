import { motion } from "motion/react";
import { useState, useCallback, useEffect, useRef } from "react";
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

const VISIBLE = 3;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
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
  const [slideDirection, setSlideDirection] = useState<-1 | 0 | 1>(0);
  const [slideTarget, setSlideTarget] = useState(0);
  const [step, setStep] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => {
    if (slideDirection !== 0) return;
    setSlideTarget((index - 1 + reviews.length) % reviews.length);
    setSlideDirection(-1);
  }, [index, slideDirection]);

  const next = useCallback(() => {
    if (slideDirection !== 0) return;
    setSlideTarget((index + 1) % reviews.length);
    setSlideDirection(1);
  }, [index, slideDirection]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const cards = track.children;
      if (cards.length > 1) {
        setStep((cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft);
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [index, slideDirection]);

  const trackReviews = [];
  const trackStart = slideDirection === -1 ? index - 1 : index;
  const trackLength = slideDirection === 0 ? VISIBLE : VISIBLE + 1;
  for (let i = 0; i < trackLength; i++) {
    trackReviews.push(reviews[(trackStart + i + reviews.length) % reviews.length]);
  }

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--background)_0%,color-mix(in_oklab,var(--emerald)_5%,var(--background))_52%,var(--background)_100%)] py-20 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[58rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/5 blur-3xl" />
      <div className="relative z-10">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-5xl px-6 text-center md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(2.75rem,6vw,6.5rem)] leading-[0.98]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span style={{ color: "#4a7c52" }}>Real people, </span>
            <span className="text-serif-italic text-gold-gradient">real results</span>.
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 h-px w-24 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
          />
        </div>

        {/* Carousel */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-emerald/15 bg-white/95 text-emerald shadow-sm backdrop-blur-md transition-[color,border-color,transform] hover:scale-105 hover:border-gold/60 hover:text-gold md:left-4 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Cards */}
          <div className="mx-8 overflow-hidden py-2 md:mx-16">
            <motion.div
              key={`${index}-${slideDirection}`}
              ref={trackRef}
              className="flex items-stretch gap-5 md:gap-6"
              initial={{ x: slideDirection === -1 ? -step : 0 }}
              animate={{
                x:
                  slideDirection === 1
                    ? -step
                    : slideDirection === -1
                      ? 0
                      : 0,
              }}
              style={{
                willChange: slideDirection === 0 ? "auto" : "transform",
              }}
              transition={
                slideDirection === 0
                  ? { duration: 0 }
                  : { duration: 0.68, ease: [0.22, 1, 0.36, 1] }
              }
              onAnimationComplete={() => {
                if (slideDirection === 0) return;
                setIndex(slideTarget);
                setSlideDirection(0);
              }}
            >
              {trackReviews.map((r, cardIndex) => (
                    <motion.div
                      key={`${r.name}-${cardIndex}`}
                      className="group relative flex h-[400px] w-[calc(100vw-6.5rem)] max-w-[420px] flex-shrink-0 flex-col overflow-hidden rounded-[1.75rem] border border-emerald/20 bg-[color-mix(in_oklab,var(--card)_94%,white)] p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-gold/55 sm:p-8 md:h-[440px] md:w-[calc((100%_-_3rem)/3)] md:max-w-none"
                      style={{ contain: "layout paint" }}
                    >
                      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
                      <div className="flex items-start justify-between">
                        <Stars rating={r.rating} />
                        <span
                          aria-hidden="true"
                          className="-mt-3 text-6xl leading-none text-emerald/20 transition-colors group-hover:text-emerald/30"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          “
                        </span>
                      </div>

                      {/* Review title */}
                      <h3 className="mt-8 text-[1.45rem] leading-tight text-foreground md:text-[1.6rem]">
                        {r.title}
                      </h3>

                      {/* Review text */}
                      <p className="mt-4 flex-1 text-[0.95rem] leading-7 text-muted-foreground md:text-base">
                        {r.text}
                      </p>

                      {/* Avatar + name at bottom */}
                      <div className="mt-7 flex items-center gap-3 border-t border-emerald/10 pt-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald text-sm font-semibold text-white ring-4 ring-emerald/8">
                          {r.initial}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{r.name}</p>
                          <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-emerald/70">
                            Verified customer
                          </p>
                        </div>
                      </div>
                    </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-emerald/15 bg-white/95 text-emerald shadow-sm backdrop-blur-md transition-[color,border-color,transform] hover:scale-105 hover:border-gold/60 hover:text-gold md:right-4 md:h-12 md:w-12"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2 md:mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (slideDirection !== 0 || i === index) return;
                setIndex(i);
              }}
              aria-label={`Go to testimonial group ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-emerald" : "w-1.5 bg-emerald/20 hover:bg-emerald/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
