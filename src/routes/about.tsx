import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Contact";
import { CursorGlow } from "@/components/site/CursorGlow";
import { Leaf, Shield, Heart, Sparkles, Award, Globe } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "Our Story — Native Rituals" },
      {
        name: "description",
        content:
          "Learn more about Native Rituals and our commitment to pure Himalayan shilajit and adaptogenic herbs.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <CursorGlow />
      <Nav />

      {/* Hero Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="hero-glow-emerald absolute -left-20 top-1/4 h-[600px] w-[600px] rounded-full opacity-15" />
        <div className="hero-glow-gold absolute -right-20 top-1/2 h-[600px] w-[600px] rounded-full opacity-15" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        {/* Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-24 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-gold/70">Our Philosophy</p>
          <h1
            className="mt-4 text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span style={{ color: "#4a7c52" }}>Formed by </span>
            <span className="text-serif-italic text-gold-gradient">nature</span>
            <span style={{ color: "#4a7c52" }}>,</span>
            <br />
            <span style={{ color: "#4a7c52" }}>Perfected by </span>
            <span className="text-serif-italic text-gold-gradient">ritual</span>
            <span style={{ color: "#4a7c52" }}>.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            We build Bridges between ancient Ayurvedic wisdom and modern clinical validation. No
            shortcuts. No fillers. Just pure elemental force.
          </p>
        </motion.div>

        {/* Brand Narrative Section */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">The Genesis</span>
            <h2
              className="text-3xl md:text-4xl leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "#4a7c52" }}
            >
              Born from a pursuit of absolute purity.
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Native Rituals was founded with a singular, uncompromising mission: to salvage true
              adaptogenic intelligence from a compromised supplements market.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We spent years journeying to high-altitude pristine regions, partnering directly with
              local Himalayan families who have harvested shilajit for generations. By skipping
              industrial middle-men, we ensure that every gram of our resin is collected ethically,
              purified under strict low-temperature standards, and validated by independent
              accredited laboratories.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden glass p-8 border border-black/6 flex flex-col justify-center items-center h-[350px] bg-gradient-to-br from-black/[0.02] to-transparent"
          >
            <div className="absolute inset-0 bg-radial-gradient from-gold/5 to-transparent pointer-events-none" />
            <img
              src="/products/02.png"
              alt="Native Rituals premium adaptogens"
              className="h-56 w-auto object-contain drop-shadow-[0_20px_40px_oklch(0_0_0/0.4)] hover:scale-105 transition-transform duration-700"
            />
            <div className="mt-4 text-center">
              <span className="text-xs font-mono text-gold/80">AUTHENTIC HIMALAYAN FLORA</span>
            </div>
          </motion.div>
        </div>

        {/* Pillars / Values Bento Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold">Our Standards</span>
            <h2
              className="mt-3 text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-display)", color: "#4a7c52" }}
            >
              The Pillars of Native Rituals
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Globe,
                title: "16,000ft Wildcrafted Sourcing",
                desc: "Our Shilajit is exclusively harvested from untouched Himalayan cliffs at extreme altitudes, where pristine geological activity mineralizes organic compounds over centuries.",
              },
              {
                icon: Shield,
                title: "Triple Lab Verification",
                desc: "Every single production batch undergoes strict third-party lab verification for heavy metals, microbials, and fulvic acid percentages. We post public COAs for absolute transparency.",
              },
              {
                icon: Leaf,
                title: "Active Biophotonic Protection",
                desc: "To protect our active botanical complexes from light-induced molecular degradation, all adaptogens are packaged in premium biophotonic violet glass or recyclable aluminum.",
              },
              {
                icon: Sparkles,
                title: "Full-Spectrum Extraction",
                desc: "We use gentle, solvent-free water extractions to preserve the entire synergy of the herbs, ensuring you receive the exact holistic profiles designed by nature.",
              },
              {
                icon: Heart,
                title: "Fair-Trade Partnerships",
                desc: "We work directly with local families in high-altitude communities, guaranteeing fair wages and supporting ecological preservation efforts in their indigenous lands.",
              },
              {
                icon: Award,
                title: "No Fillers, Ever",
                desc: "Zero binders, zero synthetic flow agents, zero chemical flavor enhancers. Our products contain 100% active ingredients. True purity has nothing to hide.",
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="glass rounded-2xl p-6 border border-black/5 hover:border-gold/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-full bg-gold/5 border border-gold/15 flex items-center justify-center mb-5 text-gold">
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <h3
                    className="text-lg font-medium text-foreground mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Storytelling Timeline/Journey */}
        <div className="mb-32">
          <div className="mx-auto max-w-3xl">
            <h2
              className="text-3xl md:text-4xl text-center mb-16"
              style={{ fontFamily: "var(--font-display)", color: "#4a7c52" }}
            >
              The Sourcing Journey
            </h2>

            <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-4 before:w-[1px] before:bg-black/8">
              {[
                {
                  step: "01",
                  title: "Ethical Harvest",
                  desc: "Local indigenous harvesters climb the high cliffs of the Himalayas to hand-gather raw shilajit exudates during hot summer months when the resin naturally seeps from the rocks.",
                },
                {
                  step: "02",
                  title: "Natural Purification",
                  desc: "The raw resin is thoroughly dissolved in pure Himalayan spring water and filtered multi-stage to remove any rock dust, followed by slow sun-drying to maintain full mineral integrity.",
                },
                {
                  step: "03",
                  title: "Quality Verification",
                  desc: "The purified resin is shipped to international ISO-certified labs for comprehensive safety screenings and compound validation, including HPLC testing for fulvic acid content.",
                },
                {
                  step: "04",
                  title: "Biophotonic Guard",
                  desc: "Once verified pure, the resin is bottled directly into light-blocking glass jars, protecting the ancient nutrients from solar deterioration until the moment it reaches your hands.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative pl-12 flex flex-col gap-1.5"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[11px] top-1.5 h-2 w-2 rounded-full bg-gold ring-4 ring-background" />

                  <span className="text-[10px] font-mono tracking-widest text-gold">
                    {item.step}
                  </span>
                  <h3
                    className="text-xl font-medium text-foreground"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-xl">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-3xl p-12 md:p-16 text-center border border-gold/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-radial-gradient from-gold/5 via-transparent to-transparent pointer-events-none" />
          <h2
            className="text-3xl md:text-5xl leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span style={{ color: "#4a7c52" }}>Elevate your daily </span>
            <span className="text-serif-italic text-gold-gradient">vessel</span>
            <span style={{ color: "#4a7c52" }}>.</span>
          </h2>
          <p className="mx-auto max-w-md text-sm text-muted-foreground mb-8">
            Experience the difference of ancient elemental extracts purified with clean scientific
            integrity.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/shop"
              className="rounded-full bg-gradient-to-r from-[oklch(0.88_0.1_90)] via-[oklch(0.78_0.14_85)] to-[oklch(0.62_0.13_78)] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-opacity hover:opacity-90 inline-block"
            >
              Explore Products
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-black/8 bg-black/[0.02] hover:bg-black/[0.04] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-all inline-block"
            >
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
