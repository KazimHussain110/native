import { motion, useScroll, useTransform, useSpring, useInView, MotionValue } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { SectionHeading } from "./ProductShowcase";

const steps = [
  {
    n: "01",
    title: "Energy",
    sub: "Sustained Vitality",
    body: "Shilajit's fulvic acid complex enhances mitochondrial function, delivering clean, sustained energy without the crash of stimulants.",
  },
  {
    n: "02",
    title: "Calm",
    sub: "Stress & Cortisol",
    body: "KSM-66 Ashwagandha is clinically proven to reduce cortisol by up to 28%, bringing calm focus and resilience to daily stress.",
  },
  {
    n: "03",
    title: "Restore",
    sub: "Recovery & Minerals",
    body: "85+ trace minerals and bioactive compounds replenish what modern life depletes — supporting deep recovery, hormonal balance and cellular repair.",
  },
];

const VB_W = 800;
const VB_H = 500;

// Card center anchor points — tight inverted triangle
const ANCHORS = [
  { cx: 160, cy: 130 }, // top-left  — 01
  { cx: 640, cy: 130 }, // top-right — 02
  { cx: 400, cy: 400 }, // bottom-center — 03
];

// Arrows: 01→02, 02→03, 03→01
// Each arrow goes from the edge of one card toward the edge of the next
// with a gentle quadratic curve bowing outward
const ARROWS = [
  {
    // 01 → 02: left to right across the top, bows upward
    x1: 230, y1: 110,
    x2: 570, y2: 110,
    qx: 400, qy:  50,
  },
  {
    // 02 → 03: top-right down to bottom-center, bows right
    x1: 660, y1: 185,
    x2: 460, y2: 355,
    qx: 700, qy: 310,
  },
  {
    // 03 → 01: bottom-center up to top-left, bows left
    x1: 340, y1: 355,
    x2: 140, y2: 185,
    qx: 100, qy: 310,
  },
];

const ARROW_LEN = 200;

/* ── Animated arrow ── */
function Arrow({ a, offset }: { a: typeof ARROWS[number]; offset: MotionValue<number> }) {
  const d = `M ${a.x1} ${a.y1} Q ${a.qx} ${a.qy} ${a.x2} ${a.y2}`;
  return (
    <>
      {/* Dim track */}
      <path d={d} stroke="oklch(1 0 0 / 0.08)" strokeWidth="1.2" fill="none" markerEnd="url(#arr-dim)" />
      {/* Gold animated */}
      <motion.path
        d={d}
        stroke="oklch(0.78 0.14 85)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        markerEnd="url(#arr-gold)"
        strokeDasharray={ARROW_LEN}
        style={{ strokeDashoffset: offset }}
      />
    </>
  );
}

/* ── Card ── */
function CircuitCard({ anchor, step, index, progress }: {
  anchor: { cx: number; cy: number };
  step: (typeof steps)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const isLeft   = index === 0;
  const isRight  = index === 1;
  const isBottom = index === 2;

  const leftPct = (anchor.cx / VB_W) * 100;
  const topPct  = (anchor.cy / VB_H) * 100;

  return (
    <div
      ref={ref}
      className="absolute"
      style={{
        left: `${leftPct}%`,
        top:  `${topPct}%`,
        width: "clamp(180px, 22vw, 240px)",
        transform: isLeft   ? "translate(-50%, -50%)"
                 : isRight  ? "translate(-50%, -50%)"
                 : "translate(-50%, -50%)",
      }}
    >
      <motion.div
        className="glass relative overflow-hidden rounded-2xl p-5"
        initial={{ opacity: 0, y: isBottom ? 16 : isLeft ? -16 : -16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
        whileHover={{ y: -5 }}
      >
        <p className="text-[9px] uppercase tracking-[0.3em] text-gold/60">{step.sub}</p>
        <h3 className="mt-2 text-xl md:text-2xl">{step.title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.body}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.25em] text-gold/40">Step {step.n}</span>
          <span className="text-xs text-gold/40">→</span>
        </div>
      </motion.div>
    </div>
  );
}

export function ProcessCircuit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 55, damping: 20 });

  // Three arrows draw in sequence
  const off0 = useTransform(progress, [0.05, 0.4],  [ARROW_LEN, 0]);
  const off1 = useTransform(progress, [0.35, 0.7],  [ARROW_LEN, 0]);
  const off2 = useTransform(progress, [0.65, 0.95], [ARROW_LEN, 0]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40">
      <SectionHeading
        eyebrow="How It Flows"
        title={<>What it does <span className="text-serif-italic text-gold-gradient">for you</span>.</>}
        copy="Three core benefits. One daily ritual."
      />

      <div className="relative mx-auto mt-20 max-w-3xl px-6">
        <div className="relative w-full" style={{ paddingBottom: isMobile ? "145%" : `${(VB_H / VB_W) * 100}%` }}>

          {/* SVG arrows only — no loop */}
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
          >
            <defs>
              <marker id="arr-gold" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 Z" fill="oklch(0.78 0.14 85)" />
              </marker>
              <marker id="arr-dim" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 Z" fill="oklch(1 0 0 / 0.1)" />
              </marker>
            </defs>

            <Arrow a={ARROWS[0]} offset={off0} />
            <Arrow a={ARROWS[1]} offset={off1} />
            <Arrow a={ARROWS[2]} offset={off2} />
          </svg>

          {/* Cards */}
          {ANCHORS.map((anchor, i) => (
            <CircuitCard
              key={steps[i].n}
              anchor={anchor}
              step={steps[i]}
              index={i}
              progress={progress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
