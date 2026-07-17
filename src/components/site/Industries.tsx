import { motion } from "motion/react";
import { useState } from "react";
import { SectionHeading } from "./ProductShowcase";

const industries = [
  { name: "Energy & Focus",       count: "Shilajit resin",    desc: "Fulvic acid and 85+ minerals fuel mitochondrial energy and sharpen mental clarity without stimulants.",         icon: "✦" },
  { name: "Stress Relief",        count: "Ashwagandha",       desc: "KSM-66 root extract clinically proven to lower cortisol, ease anxiety and build resilience to daily stress.",   icon: "◈" },
  { name: "Hormonal Balance",     count: "Adaptogenic blend", desc: "Ancient adaptogens that support testosterone, thyroid and adrenal health naturally and sustainably.",          icon: "⬡" },
  { name: "Deep Recovery",        count: "Mineral complex",   desc: "Replenish trace minerals depleted by modern diet and stress for faster physical and cognitive recovery.",        icon: "◇" },
  { name: "Immune Support",       count: "Shilajit shots",    desc: "Bioactive compounds that prime the immune system, reduce inflammation and support gut microbiome health.",       icon: "◉" },
  { name: "Longevity",            count: "Daily ritual",      desc: "Centuries of Ayurvedic use backed by modern science — formulas designed for the long game, not quick fixes.",    icon: "⬟" },
];

// Each card's stacked offset relative to the grid origin
// Grid is 3-col, card ~w-64 h-56. Stack sits roughly at col-0 row-0 center.
// We compute where each card needs to START (stack) vs END (grid cell).
// Stack: all cards pile near center-left with rotation
// Container width = 3*308-20 = 904px, card width = 288px → center = (904-288)/2 = 308px
const STACK_CENTER_X = 308;
const STACK_CENTER_Y = 20;

const STACK: { x: number; y: number; rot: number }[] = [
  { x: STACK_CENTER_X +  0,  y: STACK_CENTER_Y +  0, rot:  0  },
  { x: STACK_CENTER_X - 14,  y: STACK_CENTER_Y + 10, rot: -6  },
  { x: STACK_CENTER_X + 16,  y: STACK_CENTER_Y + 18, rot:  7  },
  { x: STACK_CENTER_X - 22,  y: STACK_CENTER_Y + 28, rot: -11 },
  { x: STACK_CENTER_X + 20,  y: STACK_CENTER_Y + 38, rot:  9  },
  { x: STACK_CENTER_X -  8,  y: STACK_CENTER_Y + 50, rot: -4  },
];

function Card({
  industry,
  index,
  expanded,
}: {
  industry: (typeof industries)[number];
  index: number;
  expanded: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const s = STACK[index];

  // Grid position: 3 columns
  // Each cell is ~288px wide + 20px gap = 308px, height ~224px + 20px = 244px
  const col = index % 3;
  const row = Math.floor(index / 3);
  const CELL_W = 308;
  const CELL_H = 244;

  // In stacked mode every card sits at (0,0) with its stack offset.
  // In grid mode card needs to be at its grid cell offset from (0,0).
  const gridX = col * CELL_W;
  const gridY = row * CELL_H;

  return (
    <motion.div
      className="absolute"
      style={{ width: 288, height: 224, perspective: 1000, top: 0, left: 0 }}
      animate={
        expanded
          ? { x: gridX, y: gridY, rotate: 0, zIndex: 1, opacity: 1 }
          : { x: s.x,   y: s.y,   rotate: s.rot, zIndex: 6 - index, opacity: 1 }
      }
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 26,
        delay: expanded ? index * 0.07 : (5 - index) * 0.05,
      }}
      onHoverStart={() => { if (expanded) setFlipped(true);  }}
      onHoverEnd={()   => { if (expanded) setFlipped(false); }}
    >
      {/* Flip inner */}
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front */}
        <div
          className="glass absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-5"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-start justify-between">
            <span className="text-2xl text-gold/60">{industry.icon}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold/70">0{index + 1}</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{industry.count}</p>
            <h3 className="mt-2 text-lg leading-tight">{industry.name}</h3>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-5"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, color-mix(in oklab, var(--gold) 18%, var(--background)), var(--background))",
            border: "1px solid color-mix(in oklab, var(--gold) 25%, transparent)",
          }}
        >
          <span className="text-3xl text-gold">{industry.icon}</span>
          <div>
            <h3 className="text-base leading-tight text-gold">{industry.name}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{industry.desc}</p>
          </div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-gold/60">{industry.count}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Industries() {
  const [expanded, setExpanded] = useState(false);

  // Container height: stacked ~300px, expanded 2 rows = 2*244 = 488px
  const containerH = expanded ? 488 : 300;

  return (
    <section id="industries" className="relative py-32 md:py-40">
      <SectionHeading
        eyebrow="Benefits"
        title={<>What nature <span className="text-serif-italic text-gold-gradient">already knew</span>.</>}
      />

      <div className="mx-auto mt-20 max-w-6xl px-6">

        {/* Mobile — plain 2-col grid */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.07 }}
              className="glass flex flex-col justify-between rounded-2xl p-5"
              style={{ minHeight: 160 }}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl text-gold/60">{ind.icon}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold/70">0{i + 1}</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{ind.count}</p>
                <h3 className="mt-1.5 text-base leading-tight">{ind.name}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{ind.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop — stacked / hover-to-expand canvas */}
        <motion.div
          className="relative mx-auto hidden md:block"
          style={{ maxWidth: 3 * 308 - 20 }}
          animate={{ height: containerH }}
          transition={{ type: "spring", stiffness: 180, damping: 28, delay: expanded ? 0 : 0.4 }}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
        >
          {industries.map((ind, i) => (
            <Card key={ind.name} industry={ind} index={i} expanded={expanded} />
          ))}

          {/* <motion.p
            animate={{ opacity: expanded ? 0 : 1, y: expanded ? 10 : 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
          >
            Hover to explore
          </motion.p> */}
        </motion.div>

      </div>
    </section>
  );
}
