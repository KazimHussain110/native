import { AnimatePresence, motion } from "motion/react";
import {
  Award,
  BatteryCharging,
  Brain,
  ChevronLeft,
  ChevronRight,
  Dna,
  HeartPulse,
  MoonStar,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const industries = [
  {
    name: "Energy & Focus",
    formula: "Shilajit resin",
    target: "Mitochondrial energy & mental clarity",
    description:
      "Fulvic acid and 85+ trace minerals support steady cellular energy and sharper focus—without relying on stimulants.",
    detail:
      "A foundational daily ritual designed for demanding days. Purified Himalayan shilajit helps replenish mineral reserves and supports the body’s natural energy pathways.",
    benefits: ["Steady daily energy", "Clearer concentration", "Mineral replenishment"],
    Icon: BatteryCharging,
    image: "/products/01.png",
    rotation: -4,
    y: 8,
  },
  {
    name: "Stress Relief",
    formula: "Ashwagandha",
    target: "Cortisol balance & everyday resilience",
    description:
      "A full-spectrum root extract created to help the body adapt to daily pressure, unwind, and return to equilibrium.",
    detail:
      "This adaptogenic ritual supports a calmer response to modern stressors while preserving alertness and drive throughout the day.",
    benefits: ["Calmer stress response", "Balanced mood", "Everyday resilience"],
    Icon: Brain,
    image: "/products/02.png",
    rotation: 3,
    y: -8,
  },
  {
    name: "Hormonal Balance",
    formula: "Adaptogenic blend",
    target: "Adrenal, thyroid & hormonal support",
    description:
      "A considered blend of traditional adaptogens that supports the systems responsible for hormonal rhythm and vitality.",
    detail:
      "Built for consistency rather than quick fixes, this blend works with the body’s own regulatory systems to support sustainable balance.",
    benefits: ["Healthy hormonal rhythm", "Adrenal support", "Sustained vitality"],
    Icon: Dna,
    image: "/products/03.png",
    rotation: -2,
    y: 12,
  },
  {
    name: "Deep Recovery",
    formula: "Mineral complex",
    target: "Physical & cognitive restoration",
    description:
      "Trace minerals depleted by modern diets and active lifestyles help restore the foundations of physical and mental recovery.",
    detail:
      "A mineral-rich recovery ritual for post-training, demanding work, and the quiet rebuilding that happens between high-output days.",
    benefits: ["Post-effort recovery", "Mineral restoration", "Sustained performance"],
    Icon: MoonStar,
    image: "/products/01.png",
    rotation: 4,
    y: -5,
  },
  {
    name: "Immune Support",
    formula: "Shilajit shots",
    target: "Daily defense & gut support",
    description:
      "Convenient bioactive support for the immune system, inflammatory balance, and the gut ecosystem at the center of wellbeing.",
    detail:
      "A simple, travel-ready format that makes foundational immune support easier to keep consistent through changing seasons and schedules.",
    benefits: ["Everyday immune defense", "Gut ecosystem support", "Convenient daily format"],
    Icon: ShieldCheck,
    image: "/products/02.png",
    rotation: -3,
    y: 9,
  },
  {
    name: "Longevity",
    formula: "Daily ritual",
    target: "Whole-body vitality over time",
    description:
      "Centuries of Ayurvedic use meet thoughtful modern formulation in a ritual designed for the long game.",
    detail:
      "Longevity is the outcome of small, repeatable choices. This daily foundation supports energy, recovery, resilience, and vitality together.",
    benefits: ["Long-term vitality", "Daily consistency", "Whole-body support"],
    Icon: HeartPulse,
    image: "/products/03.png",
    rotation: 4,
    y: -2,
  },
] as const;

type Industry = (typeof industries)[number];

function ConnectingLine({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <motion.svg
      aria-hidden="true"
      className="pointer-events-none absolute bottom-1 left-[4%] z-10 h-20 w-[92%] overflow-visible"
      viewBox="0 0 1000 80"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <defs>
        <linearGradient id="industry-line" x1="0%" x2="100%">
          <stop offset="0%" stopColor="var(--emerald)" stopOpacity=".45" />
          <stop offset="18%" stopColor="var(--gold)" stopOpacity=".72" />
          <stop offset="50%" stopColor="var(--gold-soft)" />
          <stop offset="82%" stopColor="var(--gold)" stopOpacity=".72" />
          <stop offset="100%" stopColor="var(--emerald)" stopOpacity=".45" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 24 39 C 110 33, 154 57, 252 48 C 343 40, 388 27, 493 39 C 596 51, 644 57, 746 43 C 835 31, 895 35, 976 48"
        fill="none"
        stroke="url(#industry-line)"
        strokeWidth="2.6"
        style={{ filter: "drop-shadow(0 0 4px color-mix(in oklab, var(--gold) 65%, transparent))" }}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
      {[
        [24, 39],
        [210, 50],
        [395, 31],
        [580, 50],
        [768, 40],
        [976, 48],
      ].map(([cx, cy], index) => (
        <motion.g
          key={cx}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 + index * 0.08, type: "spring" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <circle cx={cx} cy={cy} r="8" fill="var(--gold)" opacity=".34" />
          <circle cx={cx} cy={cy} r="3.2" fill="var(--gold-soft)" />
          <circle cx={cx} cy={cy} r="1.2" fill="white" />
        </motion.g>
      ))}
    </motion.svg>
  );
}

function IndustryCard({
  industry,
  index,
  fanned,
  onClick,
}: {
  industry: Industry;
  index: number;
  fanned: boolean;
  onClick: () => void;
}) {
  const spread = (index - (industries.length - 1) / 2) * 158;
  const stackX = Math.round((index - (industries.length - 1) / 2) * 8);

  return (
    <motion.button
      type="button"
      aria-label={`Explore ${industry.name}`}
      onClick={onClick}
      className="group absolute left-1/2 top-1/2 h-[clamp(320px,52svh,400px)] w-[268px] overflow-hidden rounded-[1.25rem] border border-gold/25 bg-[color-mix(in_oklab,var(--gold-soft)_18%,var(--background))] p-4 text-left shadow-[0_18px_42px_rgba(24,31,25,.13)] hover:border-gold/70 focus-visible:z-[60] focus-visible:border-gold/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      initial={false}
      animate={{
        x: fanned ? spread - 134 : stackX - 134,
        y: fanned ? industry.y - 200 : index * 4 - 200,
        rotate: 0,
        zIndex: fanned ? index + 1 : industries.length - index,
      }}
      whileHover={{ y: industry.y - 224, zIndex: 60 }}
      whileFocus={{ y: industry.y - 224, zIndex: 60 }}
      transition={{
        type: "tween",
        duration: fanned ? 0.42 : 0.34,
        delay: fanned ? index * 0.018 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald via-gold to-emerald opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,color-mix(in_oklab,var(--emerald)_10%,transparent),transparent_48%)]" />
      <div className="relative flex h-full flex-col">
        <div className="relative h-[58%] shrink-0 overflow-hidden rounded-xl border border-black/10 bg-white">
          <img
            src={industry.image}
            alt={`${industry.name} Native Rituals product`}
            draggable={false}
            className="h-full w-full object-contain p-2"
            style={{ imageRendering: "auto" }}
          />
        </div>

        <h3 className="mt-5 truncate text-[21px] leading-tight text-foreground">{industry.name}</h3>

        <p className="mt-3 line-clamp-3 text-xs leading-[1.65] text-muted-foreground">
          {industry.description}
        </p>
      </div>
    </motion.button>
  );
}

function DetailPanel({
  industry,
  index,
  onClose,
  onNavigate,
}: {
  industry: Industry;
  index: number;
  onClose: () => void;
  onNavigate: (direction: -1 | 1) => void;
}) {
  const Icon = industry.Icon;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onNavigate(-1);
      if (event.key === "ArrowRight") onNavigate(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onNavigate]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${industry.name} details`}
      className="fixed inset-0 z-[100] grid place-items-center bg-foreground/20 px-3 py-4 backdrop-blur-md md:px-4 md:py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className="custom-scrollbar relative max-h-[94svh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-black/8 bg-background shadow-[0_30px_100px_rgba(20,28,22,.22)] md:max-h-[88vh] md:rounded-[2rem]"
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/8 bg-background/90 px-4 py-3 backdrop-blur-xl md:px-5 md:py-4">
          <span className="font-mono text-[10px] tracking-[0.25em] text-gold">
            BENEFIT PROFILE · 0{index + 1}
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => onNavigate(-1)}
              className="grid h-9 w-9 place-items-center rounded-full border border-black/8 text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
              aria-label="Previous benefit"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate(1)}
              className="grid h-9 w-9 place-items-center rounded-full border border-black/8 text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
              aria-label="Next benefit"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-gold/25 bg-gold/8 text-gold transition-colors hover:bg-gold/15"
              aria-label="Close details"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-5 p-4 sm:p-9 md:grid-cols-[.8fr_1.2fr] md:gap-8 md:p-11">
          <div className="relative min-h-64 overflow-hidden rounded-2xl border border-gold/15 bg-[radial-gradient(circle_at_45%_35%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_56%)]">
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid h-36 w-36 place-items-center rounded-full border border-gold/20 bg-background/40 text-gold shadow-[0_0_80px_color-mix(in_oklab,var(--gold)_20%,transparent)] backdrop-blur-sm">
                <Icon className="h-16 w-16 stroke-[1.15]" />
              </div>
            </div>
            <div className="absolute inset-x-4 bottom-4 flex justify-between rounded-lg border border-black/8 bg-background/75 px-3 py-2 font-mono text-[9px] tracking-[0.16em] text-muted-foreground backdrop-blur">
              <span>NATIVE RITUALS</span>
              <span>DAILY FORMULA</span>
            </div>
          </div>

          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-gold/20 bg-gold/8 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-gold">
                {industry.formula}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-gold" /> Thoughtfully formulated
              </span>
            </div>
            <h2 className="text-3xl leading-tight sm:text-4xl">{industry.name}</h2>
            <p className="mt-2 text-sm italic text-gold">{industry.target}</p>
            <div className="my-6 rounded-xl border border-black/8 bg-black/[.025] p-4">
              <div className="mb-1.5 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-gold">
                <Award className="h-3.5 w-3.5" /> Core ritual focus
              </div>
              <p className="text-sm leading-relaxed text-foreground">{industry.description}</p>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">{industry.detail}</p>
            <div className="mt-7">
              <p className="mb-3 flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-gold">
                <Sparkles className="h-3.5 w-3.5" /> Designed to support
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                {industry.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="rounded-xl border border-black/8 bg-background px-3 py-3 text-xs leading-snug text-muted-foreground"
                  >
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Industries() {
  const [hovered, setHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const fanned = hovered;

  const navigate = (direction: -1 | 1) => {
    setSelectedIndex((current) => {
      if (current === null) return 0;
      return (current + direction + industries.length) % industries.length;
    });
  };

  return (
    <section
      id="industries"
      className="relative h-auto max-h-none w-full max-w-full overflow-hidden bg-emerald bg-cover bg-center bg-no-repeat py-8 sm:py-10 md:h-[100svh] md:max-h-[100svh] md:py-[clamp(2rem,6svh,7rem)]"
      style={{ backgroundImage: "url('/industries-bg.png')" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,color-mix(in_oklab,var(--gold)_16%,transparent),transparent_46%)]" />

      <div className="relative mx-auto flex h-auto max-w-7xl flex-col px-3 sm:px-5 md:h-full md:px-8">
        <header className="flex shrink-0 flex-col items-center px-2 pb-5 text-center md:px-0 md:pb-[clamp(1rem,3svh,2rem)]">
          <div>
            <h2 className="text-[clamp(2.25rem,11vw,3.25rem)] leading-[1.02] font-light tracking-tight md:text-[clamp(2.75rem,7vw,4.5rem)] md:leading-normal">
              <span className="text-background">What nature </span>
              <span className="text-serif-italic text-gold-gradient">already knew</span>
              <span className="text-background">.</span>
            </h2>
          </div>
        </header>

        <div
          ref={showcaseRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative mx-auto hidden min-h-0 w-full max-w-[1100px] flex-1 md:block"
        >
          {industries.map((industry, index) => (
            <IndustryCard
              key={industry.name}
              industry={industry}
              index={index}
              fanned={fanned}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
          <AnimatePresence>
            <ConnectingLine visible={fanned} />
          </AnimatePresence>
        </div>

        <div
          className="industries-mobile-carousel mx-auto flex h-[clamp(305px,58svh,370px)] w-full max-w-full shrink-0 snap-x snap-mandatory items-stretch gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-[calc((100vw-min(82vw,270px))/2)] pb-2 touch-pan-x sm:gap-4 md:hidden"
          aria-label="Industries carousel"
        >
          {industries.map((industry, index) => {
            return (
              <motion.button
                key={industry.name}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="h-full w-[min(82vw,270px)] min-w-[min(82vw,270px)] shrink-0 snap-center overflow-hidden rounded-2xl border border-gold/25 bg-[color-mix(in_oklab,var(--gold-soft)_18%,var(--background))] p-3.5 text-left shadow-sm sm:p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="mb-3 h-[56%] min-h-0 overflow-hidden rounded-xl border border-black/8 bg-white sm:h-[57%]">
                  <img
                    src={industry.image}
                    alt={`${industry.name} Native Rituals product`}
                    draggable={false}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <h3 className="text-[1.05rem] leading-tight text-emerald-700">{industry.name}</h3>
                <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <DetailPanel
            industry={industries[selectedIndex]}
            index={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            onNavigate={navigate}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
