import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Contact";
import { CursorGlow } from "@/components/site/CursorGlow";

export const products = [
  {
    slug: "pure-shilajit-resin",
    title: "Pure Shilajit Resin",
    img: "/products/01.png",
    price: "$49.99",
    rating: 4.9,
    reviews: 1284,
    details: ["85+ minerals", "Fulvic acid rich", "Lab tested", "100% pure"],
    desc: "Authentic Grade-A Himalayan Shilajit resin, harvested at 16,000ft. Rich in fulvic acid and 85+ trace minerals. Zero fillers, zero additives — just pure ancient resin as nature intended.",
  },
  {
    slug: "ashwagandha",
    title: "Ashwagandha",
    img: "/products/02.png",
    price: "$34.99",
    rating: 4.8,
    reviews: 876,
    details: ["KSM-66 certified", "5% withanolides", "Stress relief", "Vegan caps"],
    desc: "Full-spectrum KSM-66 Ashwagandha root extract standardised to 5% withanolides. Clinically studied for stress, cortisol balance and sustained energy without stimulants.",
  },
  {
    slug: "shilajit-shots",
    title: "Shilajit Shots",
    img: "/products/03.png",
    price: "$29.99",
    rating: 4.7,
    reviews: 643,
    details: ["Ready to drink", "No sugar", "Fulvic + B12", "30-day supply"],
    desc: "Daily 30ml Shilajit shots blended with Vitamin B12 and adaptogenic herbs. No sugar, no fillers. The fastest way to bring ancient mineral intelligence into your modern morning.",
  },
  {
    slug: "ritual-bundle",
    title: "The Ritual Bundle",
    img: "/products/01.png",
    price: "$99.99",
    rating: 5.0,
    reviews: 412,
    details: ["All 3 products", "Save 25%", "Free shipping", "30-day supply"],
    desc: "The complete Native Rituals stack — Shilajit Resin, Ashwagandha Extract and Shilajit Shots together. Everything you need to build a daily ritual that actually works.",
  },
];

export const Route = createFileRoute("/products/$slug")({
  component: ProductPage,
});

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => {
        const fill = Math.min(1, Math.max(0, rating - (s - 1)));
        return (
          <svg key={s} width="14" height="14" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`sg-${s}`}>
                <stop offset={`${fill * 100}%`} stopColor="oklch(0.78 0.14 85)" />
                <stop offset={`${fill * 100}%`} stopColor="oklch(0.78 0.14 85 / 0.2)" />
              </linearGradient>
            </defs>
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={`url(#sg-${s})`}
            />
          </svg>
        );
      })}
    </div>
  );
}

function ProductPage() {
  const { slug } = Route.useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Link to="/" className="mt-4 inline-block text-gold underline">← Back home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-background">
      <CursorGlow />
      <Nav />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="hero-glow-gold absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-gold"
          >
            ← Back
          </Link>
        </motion.div> */}

        <div className="mt-12 grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="glass flex items-center justify-center rounded-3xl p-16"
          >
            <img
              src={product.img}
              alt={product.title}
              className="h-72 w-auto object-contain drop-shadow-[0_30px_50px_oklch(0_0_0/0.5)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex flex-col gap-5"
          >
            <h1 className="text-4xl leading-[1.05] md:text-5xl lg:text-6xl">{product.title}</h1>

            <div className="flex items-center gap-3">
              <Stars rating={product.rating} />
              <span className="text-sm text-foreground">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <p className="text-3xl font-semibold text-gold">{product.price}</p>
            <p className="text-base leading-relaxed text-muted-foreground">{product.desc}</p>

            <div className="flex flex-wrap gap-2">
              {product.details.map((d) => (
                <span key={d} className="rounded-full border border-black/8 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {d}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button className="flex-1 rounded-full bg-gradient-to-r from-[oklch(0.88_0.1_90)] via-[oklch(0.78_0.14_85)] to-[oklch(0.62_0.13_78)] py-4 text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90">
                Add to Cart
              </button>
              <button className="flex-1 rounded-full border border-black/10 py-4 text-sm uppercase tracking-[0.15em] text-foreground transition-colors hover:border-gold/50 hover:text-gold">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
