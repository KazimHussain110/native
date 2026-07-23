import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 3,    suffix: "+",  label: "years sourcing" },
  { value: 10,   suffix: "k+", label: "customers" },
  { value: 85,   suffix: "+",  label: "trace minerals" },
  { value: 100,  suffix: "%",  label: "lab verified" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img src="/stats-bg.png" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="glass-strong grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative bg-background/40 p-10 text-center backdrop-blur-md"
            >
              <div className="text-5xl md:text-7xl text-gold-gradient" style={{ fontFamily: "var(--font-display)" }}>
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
