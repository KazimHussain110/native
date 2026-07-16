import { motion } from "motion/react";

export function Sustainability() {
  return (
    <section id="sustainability" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left — landscape image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <img
                src="/hero-bg.png"
                alt="Native Rituals sourcing"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/50 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex flex-col gap-5"
          >
            <h2
              className="text-4xl leading-[1.05] md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Rooted in the{" "}
              <span className="text-serif-italic text-gold-gradient">ancient world</span>.
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              Native Rituals was born from a simple frustration: the supplements
              industry had forgotten where it came from. Shilajit was being sold
              in plastic tubs with ingredient lists no one could pronounce.
              Ashwagandha was being diluted, standardised down to nothing, and
              dressed up in marketing that promised everything and delivered little.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground">
              We went back to the source. Literally. Our founders travelled to the
              Himalayan ranges of Ladakh and the farms of Madhya Pradesh to find
              partners who still harvested the way their grandparents did — with
              patience, with respect for the land, and with no shortcuts.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground">
              Every product we make carries a certificate of analysis from an
              independent third-party lab. Every batch is tested for heavy metals,
              microbial contamination and active compound potency before it ships.
              We publish the results. We have nothing to hide because we have
              nothing to hide behind.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground">
              This is not wellness as a trend. This is a return to what worked
              for thousands of years — brought into your morning with the rigour
              and transparency that modern life demands.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
