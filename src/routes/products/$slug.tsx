import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { LockKeyhole, Minus, Plus, RefreshCw, Truck, X, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Contact";
import { CursorGlow } from "@/components/site/CursorGlow";

export const products = [
  {
    slug: "pure-shilajit-resin",
    title: "Shilajit Resin",
    img: "/products/01.png",
    price: "$49.99",
    rating: 4.9,
    reviews: 1284,
    desc: "Authentic Grade-A Himalayan Shilajit resin, harvested at 16,000ft. Rich in fulvic acid and 85+ trace minerals. Zero fillers, zero additives — just pure ancient resin as nature intended.",
  },
  {
    slug: "ashwagandha",
    title: "Ashwagandha",
    img: "/products/02.png",
    price: "$34.99",
    rating: 4.8,
    reviews: 876,
    desc: "Full-spectrum KSM-66 Ashwagandha root extract standardised to 5% withanolides. Clinically studied for stress, cortisol balance and sustained energy without stimulants.",
  },
  {
    slug: "shilajit-shots",
    title: "Shilajit Shots",
    img: "/products/03.png",
    price: "$29.99",
    rating: 4.7,
    reviews: 643,
    desc: "Daily 30ml Shilajit shots blended with Vitamin B12 and adaptogenic herbs. No sugar, no fillers. The fastest way to bring ancient mineral intelligence into your modern morning.",
  },
  {
    slug: "ritual-bundle",
    title: "  Ritual Bundle",
    img: "/products/01.png",
    price: "$99.99",
    rating: 5.0,
    reviews: 412,
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
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.img ?? "");
  const [zoomOpen, setZoomOpen] = useState(false);

  const galleryImages = product
    ? Array.from(new Set([product.img, "/products/01.png", "/products/02.png", "/products/03.png"]))
    : [];

  useEffect(() => {
    if (product) setActiveImage(product.img);
    setZoomOpen(false);
  }, [product]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Link to="/" className="mt-4 inline-block text-gold underline">
            ← Back home
          </Link>
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
            className="grid grid-cols-[56px_minmax(0,1fr)] gap-3 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-4"
          >
            <div className="flex flex-col gap-3">
              {galleryImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  className={`aspect-square overflow-hidden rounded-xl border bg-background p-1.5 transition-colors ${
                    activeImage === image
                      ? "border-gold shadow-[0_0_0_1px_var(--gold)]"
                      : "border-black/10 hover:border-gold/50"
                  }`}
                  aria-label={`View product image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-contain"
                    draggable={false}
                  />
                </button>
              ))}
            </div>

            <div className="glass relative flex min-h-[360px] items-center justify-center rounded-3xl p-8 sm:min-h-[440px] sm:p-12">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={product.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-72 max-w-full object-contain drop-shadow-[0_30px_50px_oklch(0_0_0/0.5)] sm:h-80"
                />
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className="absolute right-4 bottom-4 grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-background/90 text-foreground shadow-md backdrop-blur transition-colors hover:border-gold/50 hover:text-gold"
                aria-label="Zoom product image"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
            </div>
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

            <div className="mt-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Quantity
              </p>
              <div className="flex w-fit items-center rounded-full border border-black/10 bg-background p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  disabled={quantity === 1}
                  className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span
                  className="w-10 text-center text-sm font-semibold text-foreground"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="flex-1 rounded-full bg-gradient-to-r from-[oklch(0.88_0.1_90)] via-[oklch(0.78_0.14_85)] to-[oklch(0.62_0.13_78)] py-4 text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90">
                Add to Cart
              </button>
              <button className="flex-1 rounded-full bg-emerald py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-emerald-deep">
                Buy Now
              </button>
            </div>

            <div className="mt-2 grid grid-cols-1 divide-y divide-black/8 rounded-2xl border border-black/8 bg-background/60 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="flex items-center justify-center gap-2.5 py-3 text-center text-[11px] font-medium text-muted-foreground sm:px-3">
                <Truck className="h-4 w-4 shrink-0 text-emerald" />
                <span>Free Shipping on Orders $75+</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 py-3 text-center text-[11px] font-medium text-muted-foreground sm:px-3">
                <RefreshCw className="h-4 w-4 shrink-0 text-emerald" />
                <span>30-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 py-3 text-center text-[11px] font-medium text-muted-foreground sm:px-3">
                <LockKeyhole className="h-4 w-4 shrink-0 text-emerald" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setZoomOpen(false);
            }}
          >
            <motion.div
              className="relative flex max-h-[92svh] w-full max-w-4xl items-center justify-center rounded-3xl bg-background p-8 shadow-2xl sm:p-12"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <img
                src={activeImage}
                alt={product.title}
                className="max-h-[78svh] max-w-full object-contain"
              />
              <button
                type="button"
                onClick={() => setZoomOpen(false)}
                className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-background text-foreground transition-colors hover:border-gold/50 hover:text-gold"
                aria-label="Close zoomed image"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </main>
  );
}
