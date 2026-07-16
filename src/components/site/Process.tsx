import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionHeading } from "./ProductShowcase";

const steps = [
  { n: "01", title: "Design", body: "CAD prototyping, mould engineering, material selection — with recyclability scored before a drop of resin is poured." },
  { n: "02", title: "Form", body: "Blow, injection, extrusion and hot-fill lines running 24/7 across three ISO-audited facilities." },
  { n: "03", title: "Finish", body: "Frosting, spraying, hot-stamp gold, silk-screen, embossing. Every surface tuned to the light of your brand." },
  { n: "04", title: "Deliver", body: "Global logistics with carbon-tracked shipments. Traceable from batch to bottle to shelf." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const line = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} className="relative py-32 md:py-40">
      <SectionHeading
        eyebrow="The Process"
        title={
          <>
            Four movements, <span className="text-serif-italic text-gold-gradient">one obsession</span>.
          </>
        }
      />
      <div className="relative mx-auto mt-24 max-w-5xl px-6">
        <div className="absolute left-8 top-0 h-full w-px bg-white/10 md:left-1/2">
          <motion.div style={{ height: line }} className="w-px bg-gradient-to-b from-gold via-emerald to-transparent" />
        </div>
        <div className="space-y-24">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
              className={`relative flex flex-col gap-6 md:grid md:grid-cols-2 md:items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className={`glass rounded-3xl p-8 ${i % 2 ? "md:ml-12" : "md:mr-12"}`}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Step {s.n}</p>
                <h3 className="mt-3 text-4xl md:text-5xl">{s.title}</h3>
                <p className="mt-4 text-muted-foreground">{s.body}</p>
              </div>
              <div className="absolute left-8 top-8 h-4 w-4 -translate-x-1/2 rounded-full border border-gold bg-background shadow-[0_0_20px_oklch(0.78_0.14_85/0.6)] md:left-1/2 md:top-1/2 md:-translate-y-1/2" />
              <div className="hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
