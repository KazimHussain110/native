import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from "motion/react";
import { useRef } from "react";

const BASE = "/hero-banner-parallex-layers/hero-banner-parallex-layers";

const LAYERS = [
  { src: `${BASE}/hero-banner-layer-1.png`,      scrollSpeed: 0.10, hoverStrength: 22 },
  { src: `${BASE}/hero-banner-text-layer-2.png`, scrollSpeed: 0.22, hoverStrength: 16 },
  { src: `${BASE}/bottom-sote-layer-3.png`,      scrollSpeed: 0.36, hoverStrength: 8  },
  { src: `${BASE}/main-bottle-layer-4.png`,      scrollSpeed: 0.55, hoverStrength: 4  },
];

function ParallaxLayer({
  src,
  scrollSpeed,
  hoverStrength,
  springX,
  springY,
}: {
  src: string;
  scrollSpeed: number;
  hoverStrength: number;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}) {
  const { scrollY } = useScroll();
  const scrollOffset = useTransform(scrollY, [0, 800], [0, 800 * scrollSpeed]);
  const x = useTransform(springX, (v) => v * hoverStrength);
  const y = useTransform([scrollOffset, springY], ([s, hy]: number[]) => s + hy * hoverStrength);

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden
      style={{ x, y }}
      className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
    />
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.8 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.8 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - left) / width  * 2 - 1);
    rawY.set((e.clientY - top)  / height * 2 - 1);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mobile / tablet static banner */}
      <img
        src="/mobile-hero-banner.png"
        alt=""
        aria-hidden
        className="md:hidden absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Desktop parallax layers */}
      <div className="hidden md:block">
        {LAYERS.map((l) => (
          <ParallaxLayer
            key={l.src}
            src={l.src}
            scrollSpeed={l.scrollSpeed}
            hoverStrength={l.hoverStrength}
            springX={springX}
            springY={springY}
          />
        ))}
      </div>
    </section>
  );
}
