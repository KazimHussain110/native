import { motion } from "motion/react";

const steps = [
  {
    n: "01",
    title: "Source",
    body: "Hand-harvested from Himalayan rock faces above 16,000ft.",
  },
  {
    n: "02",
    title: "Purify",
    body: "Triple-stage purification with third-party lab testing for heavy metals and potency.",
  },
  {
    n: "03",
    title: "Formulate",
    body: "Active compounds standardised to therapeutic levels. Every dose delivers.",
  },
  {
    n: "04",
    title: "Craft",
    body: "GMP-certified production. Amber glass and recyclable eco-friendly packaging.",
  },
  {
    n: "05",
    title: "Deliver",
    body: "Tracked end-to-end. Certificate of analysis included with every order.",
  },
];

const GOLD_BORDER = "1px solid oklch(0.78 0.12 85 / 0.4)";

export function Process() {
  return (
    <section id="process" className="relative h-screen w-full overflow-hidden">
      {/* Background image — no overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img src="/bg-ccheck.png" alt="" className="h-full w-full object-cover" />
      </div>

      {/* Heading — top */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute left-0 right-0 top-8 text-center md:top-12"
      >
        <h2
          className="text-balance text-[clamp(2rem,5vw,4.5rem)] leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span style={{ color: "#4a7c52" }}>From mountain </span>
          <span className="text-serif-italic text-gold-gradient">to ritual</span>.
        </h2>
      </motion.div>

      {/* 5 Step Cards — centered */}
      <div className="absolute inset-0 flex items-center justify-center px-6 pt-20 pb-6 md:pt-24">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center rounded-2xl p-5 text-center"
              style={{ border: GOLD_BORDER }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: "#4a7c52" }}
              >
                <span
                  className="text-sm font-extrabold leading-none"
                  style={{ fontFamily: "var(--font-display)", ...GOLD_TEXT }}
                >
                  {step.n}
                </span>
              </div>

              <h3
                className="mt-4 text-xl font-bold uppercase tracking-wide"
                style={{ fontFamily: "var(--font-display)", color: "#2a3c2e" }}
              >
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#3a4a3e" }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const GOLD_TEXT: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(135deg, oklch(0.92 0.08 92) 0%, oklch(0.68 0.18 78) 40%, oklch(0.88 0.12 88) 70%, oklch(0.74 0.15 84) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
