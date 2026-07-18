import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

function useStoreSafe() {
  try { return useStore(); } catch { return { cart: [], wishlist: [] }; }
}

const NAV = [
  { label: "Products", href: "/shop" },
  { label: "Benefits", href: "/#process" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#products");
  const { cart, wishlist } = useStoreSafe();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY && y > 80);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: hidden ? "-120%" : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "px-3 pt-3" : "px-6 pt-6"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between gap-4 transition-all duration-500 ${
          scrolled
            ? "glass-strong max-w-3xl rounded-full px-5 py-3"
            : "max-w-4xl rounded-full border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md"
        }`}
      >
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="/logo.png" alt="Native Rituals" className="h-8 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="relative">
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] bg-gold transition-all duration-300 ${
                    active === item.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </span>
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative hidden h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-gold md:grid"
          >
            <Heart className="h-4 w-4" />
            {wishlist.length > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-ink">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative hidden h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-gold md:grid"
          >
            <ShoppingCart className="h-4 w-4" />
            {cart.length > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-ink">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Shop Now CTA */}
          <Link
            to="/shop"
            className="hidden rounded-full bg-gradient-to-r from-[oklch(0.88_0.1_90)] via-[oklch(0.78_0.14_85)] to-[oklch(0.62_0.13_78)] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink transition-opacity hover:opacity-90 md:block"
          >
            Shop Now
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong mx-3 mt-2 overflow-hidden rounded-3xl p-4 md:hidden"
          >
            <div className="flex flex-col">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground hover:bg-white/10 hover:text-gold"
                >
                  {n.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2 border-t border-white/5 pt-3">
                <Link to="/wishlist" onClick={() => setOpen(false)} className="flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs text-muted-foreground hover:bg-white/10 hover:text-gold">
                  <Heart className="h-4 w-4" /> Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
                </Link>
                <Link to="/cart" onClick={() => setOpen(false)} className="flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs text-muted-foreground hover:bg-white/10 hover:text-gold">
                  <ShoppingCart className="h-4 w-4" /> Cart {cart.length > 0 && `(${cart.length})`}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
