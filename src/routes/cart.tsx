import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, ShoppingBag } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Contact";
import { CursorGlow } from "@/components/site/CursorGlow";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Cart — Native Rituals" }] }),
});

function CartPage() {
  const { cartItems, removeFromCart } = useStore();
  const navigate = useNavigate();

  const total = cartItems
    .reduce((sum, p) => sum + parseFloat(p.price.replace("$", "")), 0)
    .toFixed(2);

  return (
    <main className="relative min-h-screen bg-background">
      <CursorGlow />
      <Nav />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="hero-glow-gold absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20" />
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
          <span className="text-serif-italic text-gold-gradient">Cart</span>
          <span style={{ color: "#4a7c52" }}>.</span>
        </motion.h1>

        <AnimatePresence mode="popLayout">
          {cartItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6 py-32 text-center"
            >
              <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
              <p className="text-lg text-muted-foreground">Your cart is empty.</p>
              <button
                onClick={() => navigate({ to: "/shop" })}
                className="rounded-full border border-black/8 px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
              >
                Browse Products
              </button>
            </motion.div>
          ) : (
            <motion.div key="items" className="flex flex-col gap-4">
              {cartItems.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-5 rounded-2xl p-4 md:p-5"
                  style={{
                    background: "color-mix(in oklab, oklch(0 0 0) 2%, transparent)",
                    border: "1px solid color-mix(in oklab, oklch(0 0 0) 6%, transparent)",
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-20 w-20 shrink-0 cursor-pointer object-contain"
                    onClick={() => navigate({ to: "/products/$slug", params: { slug: p.slug } })}
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-gold/60">{p.tag}</p>
                    <h3
                      className="cursor-pointer text-base leading-tight hover:text-gold transition-colors"
                      onClick={() => navigate({ to: "/products/$slug", params: { slug: p.slug } })}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm font-semibold text-gold">{p.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(p.slug)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/8 text-muted-foreground transition-colors hover:border-red-500/40 hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ))}

              {/* Summary */}
              <motion.div
                layout
                className="mt-6 rounded-2xl p-6"
                style={{
                  background: "color-mix(in oklab, oklch(0 0 0) 2%, transparent)",
                  border: "1px solid color-mix(in oklab, var(--gold) 14%, transparent)",
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                  </p>
                  <p className="text-2xl font-semibold text-gold">${total}</p>
                </div>
                <button className="mt-5 w-full rounded-full bg-gradient-to-r from-[oklch(0.88_0.1_90)] via-[oklch(0.78_0.14_85)] to-[oklch(0.62_0.13_78)] py-4 text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90">
                  Checkout →
                </button>
                <button
                  onClick={() => navigate({ to: "/shop" })}
                  className="mt-3 w-full rounded-full border border-black/8 py-3.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-black/15 hover:text-foreground"
                >
                  Continue Shopping
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
