import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Subtle parallax on the bg image
  const bgY = useTransform(scrollY, [0, 700], [0, 80]);
  const contentY = useTransform(scrollY, [0, 600], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Full-bleed background image */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 scale-[1.08]"
      >
        <img
          src="/hero-bg.png"
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Dark gradient — left side readable, right side reveals image */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent" />
      {/* Bottom fade into page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--background)] to-transparent" />

      {/* Content — left-aligned */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-36"
      >
        <div className="max-w-2xl">

          {/* Headline */}
          <h1 className="text-[clamp(3.5rem,8vw,7rem)] leading-[0.93]">
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
              className="block text-foreground"
            >
              Ancient wisdom,
            </motion.span>
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
              className="block text-serif-italic text-gold-gradient"
            >
              modern ritual.
            </motion.span>
          </h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Pure Himalayan Shilajit, Ashwagandha and adaptogenic blends —
            sourced from the source, crafted for the modern body.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>Shop the Collection →</MagneticButton>
            <MagneticButton variant="ghost">Our Story</MagneticButton>
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
