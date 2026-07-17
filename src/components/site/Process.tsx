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

const PANEL_H = 100; // vh per step
const TOTAL_SCROLL = steps.length * PANEL_H; // 500vh

function StepPanel({
  step,
  index,
  progress,
}: {
  step: (typeof steps)[number];
  index: number;
  progress: ReturnType<typeof useTransform>;
}) {
  // Each panel is active when progress is in [index/n, (index+1)/n]
  const n = steps.length;
  const enter = index / n;
  const active = (index + 0.5) / n;
  const exit = (index + 1) / n;

  const opacity = useTransform(progress, [enter, active, exit], [0, 1, 0]);
  const y = useTransform(progress, [enter, active, exit], [60, 0, -60]);
  const scale = useTransform(progress, [enter, active, exit], [0.96, 1, 0.96]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 -pt-5 lg:pt-0"
      style={{ opacity, y, scale }}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1fr_auto_1fr]">

        {/* Left — number + title */}
        <div className="text-right hidden lg:block">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold/60">Step {step.n}</p>
          <h3
            className="mt-3 text-[clamp(4rem,9vw,8rem)] leading-none text-foreground/10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {step.n}
          </h3>
        </div>

        {/* Centre — main content */}
        <div className="flex flex-col items-center text-center lg:max-w-md">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold lg:hidden">Step {step.n}</p>
          <h2
            className="mt-2 text-[clamp(3rem,7vw,5.5rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {step.title}
          </h2>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{step.sub}</p>

          <div className="mt-1 h-px w-12 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">{step.body}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {step.detail.map((d) => (
              <span
                key={d}
                className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Right — index counter */}
        <div className="hidden lg:flex items-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40">
            {index + 1} / {steps.length}
          </span>
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

  // Gold spine fill
  const spineHeight = useTransform(smooth, [0, 1], ["0%", "100%"]);

  // Active dot index
  const dotProgress = useTransform(smooth, [0, 1], [0, steps.length]);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative"
      style={{ height: `${TOTAL_SCROLL}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="hero-glow-emerald absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20" />
        </div>

        {/* Section label — top */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="absolute left-1/2 top-20 -translate-x-1/2 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-gold/70">The Process</p>
          <h2
            className="mt-2 text-balance text-2xl leading-tight md:text-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From mountain{" "}
            <span className="text-serif-italic text-gold-gradient">to ritual</span>.
          </h2>
        </motion.div>

        {/* Vertical progress spine — right edge */}
        <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-0 md:flex"
          style={{ height: 240 }}>
          {/* Rail */}
          <div className="relative h-full w-px bg-white/8 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-gold via-gold/70 to-transparent"
              style={{ height: spineHeight }}
            />
          </div>
          {/* Dots */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col justify-between py-0">
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

        {/* Bottom scroll hint — fades out after first step */}
        <motion.p
          style={{ opacity: useTransform(smooth, [0, 0.15], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground/50"
        >
          Scroll to explore
        </motion.p>

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
  const isActive = useTransform(dotProgress, (v) => v >= index && v < index + 1);
  const scale = useTransform(dotProgress, [index - 0.3, index, index + 0.5, index + 1], [1, 1.6, 1.6, 1]);
  const glow = useTransform(dotProgress, [index - 0.3, index, index + 0.5, index + 1], [0, 1, 1, 0]);

  return (
    <div className="relative flex items-center gap-3">
      <motion.div
        style={{ scale }}
        className="h-1.5 w-1.5 rounded-full border border-gold/50 bg-background"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gold"
          style={{ opacity: glow }}
        />
      </motion.div>
      <motion.span
        style={{ opacity: glow }}
        className="absolute left-4 text-[9px] uppercase tracking-[0.25em] text-gold/70 whitespace-nowrap"
      >
        {label}
      </motion.span>
    </div>
  );
}
