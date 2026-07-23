import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import { Search, X, ShoppingCart, Heart } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Contact";
import { CursorGlow } from "@/components/site/CursorGlow";
import { products } from "@/routes/products/$slug";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
  head: () => ({
    meta: [
      { title: "Shop — Native Rituals" },
      { name: "description", content: "Shop pure Himalayan Shilajit, Ashwagandha and adaptogenic blends." },
    ],
  }),
});

const CIRCUMFERENCE = 2 * Math.PI * 20;

const FILTERS = ["All", "Shilajit", "Ashwagandha", "Bundles"];

function filterProducts(filter: string, query: string) {
  const q = query.toLowerCase().trim();
  return products.filter((p) => {
    const matchesFilter = filter === "All" || p.title.toLowerCase().includes(filter.toLowerCase());
    const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        const fill = Math.min(1, Math.max(0, rating - (s - 1)));
        const id = `shop-sg-${s}-${rating}`;
        return (
          <svg key={s} width="12" height="12" viewBox="0 0 24 24">
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

function ProductCard({ p, i, onCart, onWishlist, wishlisted, inCart }: {
  p: (typeof products)[number];
  i: number;
  onCart: (slug: string) => void;
  onWishlist: (slug: string) => void;
  wishlisted: boolean;
  inCart: boolean;
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  function handleCart(e: React.MouseEvent) {
    e.stopPropagation();
    onCart(p.slug);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 1500);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.stopPropagation();
    onWishlist(p.slug);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigate({ to: "/products/$slug", params: { slug: p.slug } })}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl"
      style={{
        background: "color-mix(in oklab, oklch(0 0 0) 2%, transparent)",
        border: "1px solid color-mix(in oklab, oklch(0 0 0) 6%, transparent)",
      }}
    >
      {/* Image area */}
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-black/[0.02] md:h-72">
        <motion.img
          src={p.img}
          alt={p.title}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="h-44 w-auto object-contain drop-shadow-[0_20px_30px_oklch(0_0_0/0.5)]"
        />


        {/* Wishlist button — top right */}
        <button
          onClick={handleWishlist}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-black/8 bg-background/60 transition-colors hover:border-gold/40"
        >
          <Heart
            className="h-3.5 w-3.5 transition-colors"
            style={{ color: wishlisted ? "oklch(0.78 0.14 85)" : "oklch(0.68 0.02 100)", fill: wishlisted ? "oklch(0.78 0.14 85)" : "none" }}
          />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
        <div>
          <h3 className="mt-1.5 text-base leading-tight md:text-lg">{p.title}</h3>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <Stars rating={p.rating} />
              <span className="text-[10px] text-muted-foreground">({p.reviews})</span>
            </div>
            <p className="mt-1 text-lg font-semibold text-gold">{p.price}</p>
          </div>

          {/* Cart button with border-fill circle */}
          <div className="relative h-11 w-11 shrink-0">
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
            <button
              onClick={handleCart}
              className="absolute inset-0 grid place-items-center"
            >
              <AnimatePresence mode="wait">
                {cartAdded ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="text-[10px] text-gold"
                  >
                    ✓
                  </motion.span>
                ) : (
                  <motion.div key="cart" initial={{ scale: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                    <ShoppingCart className="h-3.5 w-3.5 text-gold" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const { addToCart, toggleWishlist, cart, wishlist } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = filterProducts(activeFilter, query);

  return (
    <main className="relative min-h-screen bg-background">
      <CursorGlow />
      <Nav />

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="hero-glow-gold absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-32 pt-36">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-16 text-center"
        >
          <h1
            className="text-[clamp(2.8rem,6vw,5rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span style={{ color: "#4a7c52" }}>Shop </span><span className="text-serif-italic text-gold-gradient">Native Rituals</span><span style={{ color: "#4a7c52" }}>.</span>
          </h1>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-12 flex flex-col items-center gap-4"
        >
          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-full border border-black/8 bg-black/[0.02] py-3 pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-gold/50 focus:bg-black/[0.04]"
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-gold"
                >
                  <X className="h-3.5 w-3.5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`rounded-full border px-5 py-2 text-[10px] uppercase tracking-[0.25em] transition-all duration-300 ${
                  activeFilter === f
                    ? "border-gold/60 bg-gold/10 text-gold"
                    : "border-black/8 text-muted-foreground hover:border-black/15 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              key="grid"
              className="grid grid-cols-2 gap-5 lg:grid-cols-4"
            >
              {filtered.map((p, i) => (
                <ProductCard key={p.slug} p={p} i={i} onCart={addToCart} onWishlist={toggleWishlist} wishlisted={wishlist.includes(p.slug)} inCart={cart.includes(p.slug)} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center"
            >
              <p className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>No results found.</p>
              <p className="mt-3 text-sm text-muted-foreground">Try a different search or filter.</p>
              <button
                onClick={() => { setQuery(""); setActiveFilter("All"); }}
                className="mt-6 rounded-full border border-black/8 px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 flex flex-wrap justify-center gap-8 border-t border-black/5 pt-12"
        >
          {["Free shipping over $60", "30-day guarantee", "Lab verified · COA included", "Ethically sourced"].map((t) => (
            <p key={t} className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">{t}</p>
          ))}
        </motion.div>

      </div>

      <Footer />
    </main>
  );
}
