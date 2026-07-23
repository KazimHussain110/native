import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup } from "motion/react";
import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { products } from "@/routes/products/$slug";

const SPRING = { type: "spring" as const, stiffness: 400, damping: 40, mass: 0.6 };
const CIRCUMFERENCE = 2 * Math.PI * 20;

function Stars({ rating, uid }: { rating: number; uid: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        const fill = Math.min(1, Math.max(0, rating - (s - 1)));
        const id = `sg-${uid}-${s}`;
        return (
          <svg key={s} width="13" height="13" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={id}>
                <stop offset={`${fill * 100}%`} stopColor="oklch(0.78 0.14 85)" />
                <stop offset={`${fill * 100}%`} stopColor="oklch(0.78 0.14 85 / 0.2)" />
              </linearGradient>
            </defs>
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={`url(#${id})`}
            />
          </svg>
        );
      })}
    </div>
  );
}

function ProductCard({
  p, i, onClick, dimmed,
}: {
  p: (typeof products)[number];
  i: number;
  onClick: (i: number) => void;
  dimmed: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.article
      layoutId={`card-${p.slug}`}
      onClick={() => {
        if (window.innerWidth < 768) {
          navigate({ to: "/products/$slug", params: { slug: p.slug } });
        } else {
          onClick(i);
        }
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      animate={{ opacity: dimmed ? 0.35 : 1, scale: dimmed ? 0.97 : 1 }}
      transition={SPRING}
      style={{ borderRadius: 24 }}
      className="group relative flex flex-col overflow-hidden md:cursor-pointer"
    >
      {/* Image — white bg */}
      <div className="relative flex h-48 w-full items-center justify-center rounded-t-3xl bg-white p-5 md:h-64 md:p-8">
        <motion.img
          layoutId={`img-${p.slug}`}
          src={p.img}
          alt={p.title}
          transition={SPRING}
          style={{ width: 130, height: 170, objectFit: "contain" }}
          className="drop-shadow-[0_25px_25px_oklch(0_0_0/0.45)]"
        />
      </div>

      {/* Info — glass bg */}
      <div className="glass rounded-b-3xl p-5 md:p-8">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-base md:text-xl">{p.title}</h3>
            <div className="mt-1.5 flex items-center gap-2">
              <Stars rating={p.rating} uid={p.slug} />
              <span className="text-[11px] text-muted-foreground">({p.reviews})</span>
            </div>
            <p className="mt-1.5 text-base font-semibold text-gold md:text-lg">{p.price}</p>
          </div>

          {/* Arrow circle — desktop only */}
          <div className="relative hidden h-11 w-11 shrink-0 place-items-center md:grid">
            <svg className="absolute inset-0 -rotate-90" width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="20" fill="none" stroke="oklch(1 0 0 / 0.1)" strokeWidth="1.5" />
              <circle
                cx="22" cy="22" r="20"
                fill="none"
                stroke="oklch(0.78 0.14 85)"
                strokeWidth="1.5"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={hovered ? 0 : CIRCUMFERENCE}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)" }}
              />
            </svg>
            <span className="relative text-gold transition-transform duration-500 group-hover:rotate-45">→</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ExpandedCard({ p, onClose }: { p: (typeof products)[number]; onClose: () => void }) {
  return (
    <>
      <motion.div
        className="pointer-events-auto fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      <motion.div
        layoutId={`card-${p.slug}`}
        transition={SPRING}
        style={{ borderRadius: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="glass pointer-events-auto fixed inset-0 z-50 m-auto flex h-fit w-full max-w-4xl overflow-hidden"
      >
        {/* Left — image + details */}
        <div className="flex flex-1 flex-col justify-between border-r border-black/8 p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.25 }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold/70">{p.tag}</p>
            <h2 className="mt-3 text-4xl md:text-5xl">{p.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
          </motion.div>

          <div className="my-8 flex items-center justify-center">
            <motion.img
              layoutId={`img-${p.slug}`}
              src={p.img}
              alt={p.title}
              transition={SPRING}
              style={{ width: 180, height: 220, objectFit: "contain" }}
              className="drop-shadow-[0_30px_40px_oklch(0_0_0/0.5)]"
            />
          </div>

          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, delay: 0.3 }}
          >
            {p.details.map((d) => (
              <span key={d} className="rounded-full border border-black/8 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {d}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right — price + actions */}
        <motion.div
          className="flex w-72 shrink-0 flex-col justify-between p-10"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, delay: 0.28 }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Starting from</p>
            <p className="mt-2 text-5xl font-semibold text-gold">{p.price}</p>
            <p className="mt-1 text-xs text-muted-foreground">per unit · MOQ 5,000</p>

            <div className="mt-6 flex items-center gap-3">
              <Stars rating={p.rating} uid={`expanded-${p.slug}`} />
              <span className="text-sm text-foreground">{p.rating}</span>
              <span className="text-xs text-muted-foreground">({p.reviews})</span>
            </div>

            <div className="mt-4 space-y-1.5">
              {[5, 4, 3].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="w-3 text-[10px] text-muted-foreground">{star}</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-black/8">
                    <motion.div
                      className="h-full rounded-full bg-gold/60"
                      initial={{ width: 0 }}
                      animate={{ width: star === 5 ? "72%" : star === 4 ? "20%" : "8%" }}
                      transition={{ delay: 0.4, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full rounded-full bg-gradient-to-r from-[oklch(0.88_0.1_90)] via-[oklch(0.78_0.14_85)] to-[oklch(0.62_0.13_78)] py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90">
              Add to Cart
            </button>
            <button className="w-full rounded-full border border-black/10 py-3.5 text-sm uppercase tracking-[0.15em] text-foreground transition-colors hover:border-gold/50 hover:text-gold">
              Learn More
            </button>
          </div>
        </motion.div>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-black/8 text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
        >
          ✕
        </button>
      </motion.div>
    </>
  );
}

export function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="products" ref={ref} className="relative overflow-hidden py-32 md:py-40">
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-glow-emerald absolute left-1/2 top-40 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-40" />
      </motion.div>

      <SectionHeading
        eyebrow="The Collection"
        title={<><span style={{ color: "#4a7c52" }}>Featured products</span>.</>}
      />

      <LayoutGroup>
        <div className="mx-auto mt-20 grid max-w-7xl grid-cols-2 gap-4 px-6 md:grid-cols-4 md:gap-6" style={{ isolation: "isolate" }}>
          {products.map((p, i) => (
            <ProductCard
              key={p.slug}
              p={p}
              i={i}
              onClick={(idx) => setActiveIndex(idx)}
              dimmed={activeIndex !== null && activeIndex !== i}
            />
          ))}
        </div>

        <AnimatePresence>
          {activeIndex !== null && (
            <ExpandedCard
              p={products[activeIndex]}
              onClose={() => setActiveIndex(null)}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  );
}

export function SectionHeading({
  eyebrow: _eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
        className="mt-6 text-[clamp(2rem,8vw,9rem)] leading-[1.05]"
      >
        {title}
      </motion.h2>
      {copy && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          {copy}
        </motion.p>
      )}
    </div>
  );
}
