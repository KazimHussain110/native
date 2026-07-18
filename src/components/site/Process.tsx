import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

const steps = [
  {
    n: "01",
    title: "Source",
    sub: "Origin & Harvest",
    body: "Hand-harvested from Himalayan rock faces above 16,000ft. Ashwagandha roots grown in certified organic farms in Madhya Pradesh — untouched by shortcuts.",
    detail: ["Himalayan origin", "Organic certified", "Ethical harvest"],
  },
  {
    n: "02",
    title: "Purify",
    sub: "Lab Testing & Filtration",
    body: "Triple-stage purification. Third-party lab testing for heavy metals, microbials and potency. Every batch cleared before it ever reaches a jar.",
    detail: ["Third-party tested", "Heavy metal screened", "Potency verified"],
  },
  {
    n: "03",
    title: "Formulate",
    sub: "Blending & Standardisation",
    body: "Active compounds standardised to therapeutic levels — fulvic acid in Shilajit, withanolides in Ashwagandha. Every dose delivers exactly what it promises.",
    detail: ["Standardised actives", "No fillers", "Therapeutic dose"],
  },
  {
    n: "04",
    title: "Craft",
    sub: "Production & Packaging",
    body: "Produced in GMP-certified facilities. Packaged in amber glass and recyclable materials to preserve potency and reduce environmental impact.",
    detail: ["GMP certified", "Amber glass", "Eco packaging"],
  },
  {
    n: "05",
    title: "Deliver",
    sub: "To Your Door",
    body: "Shipped with care, tracked end-to-end. Every order includes a certificate of analysis so you know exactly what you're putting in your body.",
    detail: ["COA included", "Tracked shipping", "Satisfaction guarantee"],
  },
];

const PANEL_H = 100;
const TOTAL_SCROLL = steps.length * PANEL_H;

function StepPanel({
  step,
  index,
  progress,
}: {
  step: (typeof steps)[number];
  index: number;
  progress: ReturnType<typeof useTransform>;
}) {
  const n = steps.length;
  const enter = index / n;
  const active = (index + 0.5) / n;
  const exit = (index + 1) / n;

  const opacity = useTransform(progress, [enter, active, exit], [index === 0 ? 1 : 0, 1, 0]);
  const y = useTransform(progress, [enter, active, exit], [index === 0 ? 0 : 60, 0, -60]);
  const scale = useTransform(progress, [enter, active, exit], [0.97, 1, 0.97]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 pt-40"
      style={{ opacity, y, scale }}
    >
      <div className="mx-auto w-full max-w-xl">
        {/* Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 p-4 backdrop-blur-xl md:p-6">
          {/* Giant ghost number */}
          <span
            className="pointer-events-none absolute -right-4 -top-6 select-none text-[10rem] leading-none text-white/5 md:text-[14rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {step.n}
          </span>

          {/* Eyebrow */}
          <p className="text-[10px] uppercase tracking-[0.45em] text-gold/70">
            Step {step.n} — {step.sub}
          </p>

          {/* Title */}
          <h2
            className="mt-3 text-[clamp(3.5rem,8vw,6rem)] leading-[0.92]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {step.title}
          </h2>

          {/* Divider */}
          <div className="mt-5 h-px w-16 bg-gradient-to-r from-gold/80 to-transparent" />

          {/* Body */}
          <p className="mt-3 max-w-lg text-xs leading-relaxed text-white/60">
            {step.body}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {step.detail.map((d) => (
              <span
                key={d}
                className="rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-gold/80"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Step counter bottom-right */}
          <p className="mt-4 text-right text-[10px] uppercase tracking-[0.35em] text-white/20">
            {index + 1} / {steps.length}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const spineHeight = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const dotProgress = useTransform(smooth, [0, 1], [0, steps.length]);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative"
      style={{ height: `${TOTAL_SCROLL}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background image + overlay */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="/bg-ccheck.png"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Section label — top */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="absolute left-1/2 top-8 -translate-x-1/2 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-gold/70">The Process</p>
          <h2
            className="mt-2 text-balance text-[clamp(2rem,6vw,5rem)] leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From mountain{" "}
            <span className="text-serif-italic text-gold-gradient">to ritual</span>.
          </h2>
        </motion.div>

        {/* Vertical progress spine — right edge */}
        <div
          className="absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-center md:flex"
          style={{ height: 240 }}
        >
          <div className="relative h-full w-px overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-gold via-gold/70 to-transparent"
              style={{ height: spineHeight }}
            />
          </div>
          <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 flex-col justify-between">
            {steps.map((s, i) => (
              <DotIndicator key={s.n} index={i} dotProgress={dotProgress} label={s.n} />
            ))}
          </div>
        </div>

        {/* Step panels */}
        <div className="relative h-full">
          {steps.map((step, i) => (
            <StepPanel key={step.n} step={step} index={i} progress={smooth} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DotIndicator({
  index,
  dotProgress,
  label,
}: {
  index: number;
  dotProgress: ReturnType<typeof useTransform>;
  label: string;
}) {
  const scale = useTransform(dotProgress, [index - 0.3, index, index + 0.5, index + 1], [1, 1.6, 1.6, 1]);
  const glow = useTransform(dotProgress, [index - 0.3, index, index + 0.5, index + 1], [0, 1, 1, 0]);

  return (
    <div className="relative flex items-center gap-3">
      <motion.div
        style={{ scale }}
        className="h-1.5 w-1.5 rounded-full border border-gold/50 bg-black"
      >
        <motion.div className="absolute inset-0 rounded-full bg-gold" style={{ opacity: glow }} />
      </motion.div>
      <motion.span
        style={{ opacity: glow }}
        className="absolute left-4 whitespace-nowrap text-[9px] uppercase tracking-[0.25em] text-gold/70"
      >
        {label}
      </motion.span>
    </div>
  );
}
