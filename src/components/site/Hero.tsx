import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { MagneticButton } from "./MagneticButton";
import glassBottle from "@/assets/product-glass-bottle.png";
import petBottle from "@/assets/product-pet-bottle.png";
import aluminumCan from "@/assets/product-aluminum-can.png";
import cosmeticJar from "@/assets/product-cosmetic-jar.png";
import dropper from "@/assets/product-dropper.png";
import foodContainer from "@/assets/product-food-container.png";
import pumpBottle from "@/assets/product-pump-bottle.png";
import cap from "@/assets/product-cap.png";

type FloatItem = {
  src: string;
  alt: string;
  // position as % of container
  x: string;
  y: string;
  size: number;
  rot: number;
  depth: number; // parallax strength 0..1
  delay: number;
  drift: number; // seconds for float loop
  scrollY: number; // px offset at full scroll
  scrollRot: number;
};

const items: FloatItem[] = [
  { src: glassBottle, alt: "Glass spray bottle", x: "8%", y: "18%", size: 260, rot: -8, depth: 0.9, delay: 0.35, drift: 7, scrollY: -140, scrollRot: -18 },
  { src: pumpBottle, alt: "Amber pump bottle", x: "82%", y: "14%", size: 240, rot: 10, depth: 0.7, delay: 0.55, drift: 8, scrollY: -220, scrollRot: 22 },
  { src: cosmeticJar, alt: "Emerald cosmetic jar", x: "16%", y: "62%", size: 200, rot: -14, depth: 0.5, delay: 0.75, drift: 9, scrollY: 260, scrollRot: -30 },
  { src: dropper, alt: "White dropper bottle", x: "72%", y: "60%", size: 220, rot: 12, depth: 0.6, delay: 0.65, drift: 10, scrollY: 220, scrollRot: 40 },
  { src: aluminumCan, alt: "Matte aluminum can", x: "44%", y: "78%", size: 200, rot: -5, depth: 0.4, delay: 0.9, drift: 8, scrollY: 340, scrollRot: -12 },
  { src: petBottle, alt: "Frosted PET bottle", x: "58%", y: "10%", size: 200, rot: 6, depth: 0.8, delay: 0.5, drift: 9, scrollY: -300, scrollRot: 24 },
  { src: foodContainer, alt: "Food container with gold lid", x: "88%", y: "44%", size: 180, rot: -10, depth: 0.55, delay: 1.05, drift: 11, scrollY: 60, scrollRot: 18 },
  { src: cap, alt: "Premium bottle cap", x: "6%", y: "42%", size: 140, rot: 20, depth: 0.65, delay: 1.15, drift: 7, scrollY: -60, scrollRot: -50 },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  const { scrollY } = useScroll();
  const scrollProgress = useTransform(scrollY, [0, 900], [0, 1]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const headlineY = useTransform(scrollY, [0, 600], [0, -80]);
  const headlineOpacity = useTransform(scrollY, [0, 400], [1, 0.15]);

  return (
    <section ref={containerRef} className="grain relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Backdrop gradients */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="hero-glow-emerald absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full"
          style={{ animation: "bg-drift 18s ease-in-out infinite" }}
        />
        <motion.div
          className="hero-glow-gold absolute right-[-10%] top-[10%] h-[600px] w-[600px] rounded-full"
          style={{ animation: "bg-drift 22s ease-in-out infinite reverse" }}
        />
        <motion.div
          className="hero-glow-emerald absolute bottom-[-10%] left-1/3 h-[500px] w-[500px] rounded-full opacity-70"
          style={{ animation: "bg-drift 26s ease-in-out infinite" }}
        />
        {/* Particles */}
        <Particles />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_85%)]" />
      </div>

      {/* Floating products */}
      <div className="pointer-events-none absolute inset-0">
        {items.map((it, i) => (
          <FloatingProduct key={i} item={it} smx={smx} smy={smy} scrollProgress={scrollProgress} />
        ))}
      </div>

      {/* Center content */}
      <motion.div
        style={{ y: headlineY, opacity: headlineOpacity }}
        className="relative z-10 flex max-w-4xl flex-col items-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          Est. 1978 · ISO 9001 Certified
        </motion.span>

        <h1 className="text-balance text-6xl leading-[0.95] md:text-8xl lg:text-[8.5rem]">
          <motion.span
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            className="block"
          >
            Packaging,
          </motion.span>
          <motion.span
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
            className="block text-serif-italic text-gold-gradient"
          >
            perfected.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 max-w-xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          A quiet obsession with glass, plastic and metal — engineered into vessels
          that carry the world's most demanding brands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.15 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>Explore the Collection →</MagneticButton>
          <MagneticButton variant="ghost">Watch the Process</MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span>Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 block h-4 bg-gradient-to-b from-gold to-transparent"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function FloatingProduct({
  item,
  smx,
  smy,
  scrollProgress,
}: {
  item: FloatItem;
  smx: ReturnType<typeof useSpring>;
  smy: ReturnType<typeof useSpring>;
  scrollProgress: ReturnType<typeof useTransform<number, number>>;
}) {
  const px = useTransform(smx, (v) => v * item.depth * 40);
  const py = useTransform(smy, (v) => v * item.depth * 40);
  const sy = useTransform(scrollProgress, [0, 1], [0, item.scrollY]);
  const srot = useTransform(scrollProgress, [0, 1], [0, item.scrollRot]);
  const sop = useTransform(scrollProgress, [0, 0.9], [1, 0]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: item.x,
        top: item.y,
        width: item.size,
        height: item.size,
        x: px,
        y: py,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        style={{ y: sy, rotate: srot, opacity: sop }}
        initial={{ opacity: 0, scale: 0.6, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, delay: item.delay, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div
          className="relative h-full w-full"
          style={{
            ["--rot" as string]: `${item.rot}deg`,
            animation: `float-y ${item.drift}s ease-in-out ${item.delay}s infinite`,
            transformStyle: "preserve-3d",
          } as React.CSSProperties}
        >
          {/* Glow behind */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 scale-125 rounded-full opacity-40 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--gold) 30%, transparent) 0%, transparent 60%)",
            }}
          />
          <img
            src={item.src}
            alt={item.alt}
            width={item.size}
            height={item.size}
            className="h-full w-full select-none object-contain drop-shadow-[0_30px_35px_oklch(0_0_0/0.55)]"
            draggable={false}
          />
          {/* Reflection */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-[-30%] mx-auto h-6 w-2/3 rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(ellipse, oklch(0 0 0 / 0.6) 0%, transparent 70%)",
              filter: "blur(6px)",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Particles() {
  const dots = Array.from({ length: 28 });
  return (
    <div className="absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const size = 1 + ((i * 7) % 3);
        const dur = 8 + ((i * 3) % 10);
        const isGold = i % 3 === 0;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: isGold ? "var(--gold)" : "var(--emerald-glow)",
              boxShadow: isGold
                ? "0 0 12px var(--gold)"
                : "0 0 12px var(--emerald-glow)",
            }}
            animate={{ y: [0, -40, 0], opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: dur, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}
