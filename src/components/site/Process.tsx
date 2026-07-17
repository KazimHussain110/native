import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { SectionHeading } from "./ProductShowcase";

const steps = [
  {
    n: "01", title: "Source", sub: "Origin & Harvest",
    body: "Our Shilajit is hand-harvested from Himalayan rock faces above 16,000ft. Ashwagandha roots are grown in certified organic farms in Madhya Pradesh, India.",
    detail: ["Himalayan origin", "Organic certified", "Ethical harvest"],
  },
  {
    n: "02", title: "Purify", sub: "Lab Testing & Filtration",
    body: "Every batch undergoes triple-stage purification and third-party lab testing for heavy metals, microbials and potency before it ever reaches a jar.",
    detail: ["Third-party tested", "Heavy metal screened", "Potency verified"],
  },
  {
    n: "03", title: "Formulate", sub: "Blending & Standardisation",
    body: "Active compounds are standardised to therapeutic levels — fulvic acid in Shilajit, withanolides in Ashwagandha — so every dose delivers exactly what it promises.",
    detail: ["Standardised actives", "No fillers", "Therapeutic dose"],
  },
  {
    n: "04", title: "Craft", sub: "Production & Packaging",
    body: "Produced in GMP-certified facilities. Packaged in amber glass and recyclable materials to preserve potency and reduce environmental impact.",
    detail: ["GMP certified", "Amber glass", "Eco packaging"],
  },
  {
    n: "05", title: "Deliver", sub: "To Your Door",
    body: "Shipped with care, tracked end-to-end. Every order includes a certificate of analysis so you know exactly what you're putting in your body.",
    detail: ["COA included", "Tracked shipping", "Satisfaction guarantee"],
  },
];

// 4 card-widths + gaps to pan card 5 fully into view
const CARD_W = 420;
const GAP = 24;
const PAN_PX = 4 * (CARD_W + GAP); // 1776px

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex-shrink-0"
      style={{ width: CARD_W }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 30 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Ghost number watermark */}
      <div className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-[9rem] font-bold leading-none text-white/[0.03]">
        {step.n}
      </div>

      <motion.div
        className="glass relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-8"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Step {step.n}</p>
            <h3 className="mt-2 text-4xl md:text-5xl">{step.title}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{step.sub}</p>
          </div>
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 text-xs text-gold/60">
            {index + 1}/{steps.length}
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{step.body}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {step.detail.map((d) => (
            <span key={d} className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {d}
            </span>
          ))}
        </div>

        {/* Bottom gold line fills when card is active */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-gold via-gold/60 to-transparent"
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [trackTop, setTrackTop] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackTop(trackRef.current.getBoundingClientRect().top + window.scrollY);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Pan starts exactly when sticky pins (scrollY === trackTop)
  // and ends when scrollY === trackTop + PAN_PX (sticky releases)
  const rawX = useTransform(scrollY, [trackTop, trackTop + PAN_PX], [0, -PAN_PX]);
  const x = useSpring(rawX, { stiffness: 60, damping: 20 });

  // Progress line: 0% → 100% as rawX goes 0 → -PAN_PX
  const lineWidth = useTransform(rawX, [0, -PAN_PX], ["0%", "100%"]);
  const springLine = useSpring(lineWidth, { stiffness: 80, damping: 22 });

  return (
    <section id="process" className="relative py-32 md:py-40">
      <SectionHeading
        eyebrow="The Process"
        title={<>From mountain <span className="text-serif-italic text-gold-gradient">to ritual</span>.</>}
        copy="Five deliberate steps between the Himalayas and your morning routine."
      />

      {/* Track height = viewport height (sticky duration) + PAN_PX (scroll needed to pan fully) */}
      <div ref={trackRef} className="relative mt-24" style={{ height: `calc(100vh + ${PAN_PX}px)` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">

          {/* Progress rail */}
          <div className="relative mx-auto mb-10 h-px w-full max-w-5xl px-6">
            <div className="h-full w-full rounded-full bg-white/8" />
            <motion.div
              className="absolute inset-y-0 left-6 rounded-full bg-gradient-to-r from-gold via-gold/70 to-transparent"
              style={{ width: springLine }}
            />
            <div className="absolute inset-y-0 left-6 right-6 flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s.n} className="relative flex flex-col items-center">
                  <div className="h-2.5 w-2.5 rounded-full border border-gold/60 bg-background shadow-[0_0_12px_oklch(0.78_0.14_85/0.5)]" />
                  <span className="absolute top-4 text-[9px] uppercase tracking-[0.2em] text-gold/50">{s.n}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="overflow-visible px-[max(2rem,calc((100vw-1280px)/2+1.5rem))]">
            <motion.div className="flex gap-6" style={{ x }}>
              {steps.map((s, i) => (
                <StepCard key={s.n} step={s} index={i} />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
