import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Heart, ShoppingCart } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Contact";
import { CursorGlow } from "@/components/site/CursorGlow";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
  head: () => ({ meta: [{ title: "Wishlist — Native Rituals" }] }),
});

function WishlistPage() {
  const { wishlistItems, toggleWishlist, addToCart, cart } = useStore();
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen bg-background">
      <CursorGlow />
      <Nav />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="hero-glow-emerald absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20" />
      </div>

      <div className="mx-auto max-w-4xl px-6 pb-32 pt-36">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-[clamp(2.2rem,5vw,4rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span style={{ color: "#4a7c52" }}>Your </span>
          <span className="text-serif-italic text-gold-gradient">Wishlist</span>
          <span style={{ color: "#4a7c52" }}>.</span>
        </motion.h1>

        <AnimatePresence mode="popLayout">
          {wishlistItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6 py-32 text-center"
            >
              <Heart className="h-12 w-12 text-muted-foreground/30" />
              <p className="text-lg text-muted-foreground">Your wishlist is empty.</p>
              <button
                onClick={() => navigate({ to: "/shop" })}
                className="rounded-full border border-black/8 px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
              >
                Browse Products
              </button>
            </motion.div>
          ) : (
            <motion.div key="items" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {wishlistItems.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative flex flex-col overflow-hidden rounded-2xl"
                  style={{
                    background: "color-mix(in oklab, oklch(0 0 0) 2%, transparent)",
                    border: "1px solid color-mix(in oklab, oklch(0 0 0) 6%, transparent)",
                  }}
                >
                  {/* Remove from wishlist */}
                  <button
                    onClick={() => toggleWishlist(p.slug)}
                    className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full border border-black/8 bg-background/60 transition-colors hover:border-gold/40"
                  >
                    <Heart className="h-3.5 w-3.5 fill-gold text-gold" />
                  </button>

                  {/* Image */}
                  <div
                    className="flex h-48 cursor-pointer items-center justify-center bg-black/[0.02]"
                    onClick={() => navigate({ to: "/products/$slug", params: { slug: p.slug } })}
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      className="h-36 w-auto object-contain drop-shadow-[0_15px_25px_oklch(0_0_0/0.5)]"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-gold/60">{p.tag}</p>
                      <h3
                        className="mt-1 cursor-pointer text-base leading-tight transition-colors hover:text-gold"
                        onClick={() =>
                          navigate({ to: "/products/$slug", params: { slug: p.slug } })
                        }
                      >
                        {p.title}
                      </h3>
                      <p className="mt-1 text-base font-semibold text-gold">{p.price}</p>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(p.slug);
                        navigate({ to: "/cart" });
                      }}
                      className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-[10px] uppercase tracking-[0.2em] transition-all ${
                        cart.includes(p.slug)
                          ? "border border-gold/40 text-gold"
                          : "bg-gradient-to-r from-[oklch(0.88_0.1_90)] via-[oklch(0.78_0.14_85)] to-[oklch(0.62_0.13_78)] text-ink"
                      }`}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      {cart.includes(p.slug) ? "In Cart" : "Add to Cart"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
