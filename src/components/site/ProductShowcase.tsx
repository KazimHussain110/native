import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import glassBottle from "@/assets/product-glass-bottle.png";
import petBottle from "@/assets/product-pet-bottle.png";
import aluminumCan from "@/assets/product-aluminum-can.png";
import cosmeticJar from "@/assets/product-cosmetic-jar.png";
import dropper from "@/assets/product-dropper.png";
import foodContainer from "@/assets/product-food-container.png";

const products = [
  { title: "Glass Bottles", tag: "Beverage · Spirits", img: glassBottle, note: "Flint & amber, up to 1.5L" },
  { title: "PET Bottles", tag: "Water · Personal Care", img: petBottle, note: "Recycled, ultra-clarity" },
  { title: "Aluminum Cans", tag: "Beverage · Beauty", img: aluminumCan, note: "Matte, satin, mirror finishes" },
  { title: "Cosmetic Jars", tag: "Skincare · Luxury", img: cosmeticJar, note: "Emerald & flint options" },
  { title: "Droppers & Serums", tag: "Cosmetic · Pharma", img: dropper, note: "Calibrated pipettes" },
  { title: "Food Containers", tag: "Gourmet · Retail", img: foodContainer, note: "Airtight, tamper-evident" },
];

export function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="products" ref={ref} className="relative overflow-hidden py-32 md:py-40">
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-glow-emerald absolute left-1/2 top-40 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-40" />
      </motion.div>

      <SectionHeading
        eyebrow="The Collection"
        title={
          <>
            Seven vessels, <span className="text-serif-italic text-gold-gradient">infinite</span> intent.
          </>
        }
        copy="Each format is engineered in-house — from mould design and material formulation to finish, decoration and cap fitment."
      />

      <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <ProductCard key={p.title} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ p, i }: { p: (typeof products)[number]; i: number }) {
  const stagger = i % 3;
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -12, rotate: -1 }}
      className="group glass relative overflow-hidden rounded-3xl p-8"
      style={{ marginTop: `${stagger * 24}px` }}
    >
      {/* Gold glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--gold) 22%, transparent), transparent 60%)",
        }}
      />
      <div className="relative flex h-64 items-center justify-center">
        <img
          src={p.img}
          alt={p.title}
          loading="lazy"
          className="h-full w-auto object-contain transition-transform duration-[900ms] ease-out group-hover:scale-110 group-hover:-rotate-3 drop-shadow-[0_25px_25px_oklch(0_0_0/0.45)]"
        />
      </div>
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-gold/80">{p.tag}</p>
          <h3 className="mt-2 text-2xl md:text-3xl">{p.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
        </div>
        <span className="glass grid h-11 w-11 shrink-0 place-items-center rounded-full text-gold transition-transform duration-500 group-hover:rotate-45">
          →
        </span>
      </div>
    </motion.article>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-[10px] uppercase tracking-[0.35em] text-gold"
      >
        — {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
        className="mt-6 text-balance text-4xl leading-[1.05] md:text-6xl lg:text-7xl"
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
