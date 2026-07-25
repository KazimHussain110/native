import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Facebook,
  Heart,
  Instagram,
  Menu,
  ShoppingCart,
  X,
  Youtube,
} from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

function useStoreSafe() {
  try {
    return useStore();
  } catch {
    return { cart: [], wishlist: [] };
  }
}

const NAV = [
  { label: "Products", href: "/shop" },
  { label: "Benefits", href: "/#process" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.266 2.37 4.266 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

const SOCIALS = [
  { name: "Facebook", icon: Facebook },
  { name: "Instagram", icon: Instagram },
  { name: "YouTube", icon: Youtube },
  { name: "LinkedIn", icon: LinkedinIcon },
  { name: "Pinterest", icon: PinterestIcon },
];

export function Nav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#products");
  const { cart, wishlist } = useStoreSafe();
  const useWhiteControls = pathname === "/" && overHero;

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setOverHero(y < Math.max(80, window.innerHeight - 120));
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
      { rootMargin: "-40% 0px -55% 0px" },
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
        className={`relative mx-auto grid w-full min-w-0 grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-center transition-all duration-500 md:flex md:justify-between md:gap-4 ${
          scrolled
            ? "max-w-4xl rounded-full border border-black/8 bg-black/[0.04] px-3 py-2.5 backdrop-blur-md md:px-5 md:py-3"
            : "max-w-5xl rounded-full border border-black/8 bg-black/[0.02] px-3 py-3 backdrop-blur-md md:px-6 md:py-4"
        }`}
      >
        {/* Mobile menu */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`grid h-10 w-10 place-items-center rounded-full transition-colors md:hidden ${
            useWhiteControls
              ? "text-white hover:text-white/75"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Logo */}
        <a href="/" className="flex min-w-0 items-center justify-self-center md:justify-self-auto">
          <img src="/logo.png" alt="Native Rituals" className="h-11 w-auto max-w-full md:h-12" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`group relative rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors ${
                useWhiteControls
                  ? "text-white/80 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
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
        <div className="hidden items-center gap-1 md:flex">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className={`relative hidden h-10 w-10 place-items-center rounded-full transition-colors md:grid ${
              useWhiteControls
                ? "text-white/80 hover:bg-white/10 hover:text-white"
                : "text-muted-foreground hover:bg-black/5 hover:text-gold"
            }`}
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
            className={`relative hidden h-10 w-10 place-items-center rounded-full transition-colors md:grid ${
              useWhiteControls
                ? "text-white/80 hover:bg-white/10 hover:text-white"
                : "text-muted-foreground hover:bg-black/5 hover:text-gold"
            }`}
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

        </div>

        {/* Mobile cart */}
        <Link
          to="/cart"
          className={`relative grid h-10 w-10 place-items-center rounded-full transition-colors md:hidden ${
            useWhiteControls
              ? "text-white hover:text-white/75"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label={`Cart${cart.length > 0 ? `, ${cart.length} items` : ""}`}
        >
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[8px] font-bold text-ink">
              {cart.length}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-0 mt-2 min-h-[72svh] max-h-[calc(100svh-6.5rem)] w-full max-w-full overflow-y-auto rounded-[1.75rem] bg-[color-mix(in_oklab,var(--gold-soft)_10%,var(--background))] p-5 shadow-[0_28px_80px_rgba(18,45,28,.18)] md:hidden"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
              <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-gold/12 blur-3xl" />
              <div className="absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-emerald/8 blur-3xl" />
            </div>

            <div className="relative flex min-h-[calc(72svh-2.5rem)] flex-col">
              <nav className="flex flex-col">
                {NAV.map((n, index) => (
                  <motion.a
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + index * 0.045,
                      duration: 0.28,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group flex items-center rounded-2xl px-3 py-4 text-emerald-deep transition-colors hover:bg-emerald/5 hover:text-gold"
                  >
                    <span
                      className="flex-1 text-[1.65rem] leading-none"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {n.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-emerald/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto">
                <div className="mb-4 px-2">
                  <div className="flex justify-center gap-2">
                    {SOCIALS.map((social) => (
                      <a
                        key={social.name}
                        href="#"
                        aria-label={social.name}
                        className="grid h-9 w-9 place-items-center rounded-full bg-emerald/6 text-emerald transition-colors hover:bg-emerald/12 hover:text-gold"
                      >
                        <social.icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/wishlist"
                  onClick={() => setOpen(false)}
                  className="flex min-w-0 items-center justify-center gap-2 rounded-xl bg-emerald/5 px-3 py-3 text-[11px] font-semibold text-emerald-deep transition-colors hover:bg-emerald/10 hover:text-gold"
                >
                  <Heart className="h-4 w-4 shrink-0 text-gold" />
                  <span>Wishlist</span>
                  {wishlist.length > 0 && (
                    <span className="rounded-full bg-gold px-1.5 py-0.5 text-[8px] font-bold text-ink">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setOpen(false)}
                  className="flex min-w-0 items-center justify-center gap-2 rounded-xl bg-emerald/5 px-3 py-3 text-[11px] font-semibold text-emerald-deep transition-colors hover:bg-emerald/10 hover:text-gold"
                >
                  <ShoppingCart className="h-4 w-4 shrink-0 text-gold" />
                  <span>Cart</span>
                  {cart.length > 0 && (
                    <span className="rounded-full bg-gold px-1.5 py-0.5 text-[8px] font-bold text-ink">
                      {cart.length}
                    </span>
                  )}
                </Link>
                </div>

                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-between rounded-xl bg-emerald-gradient px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_12px_30px_rgba(42,89,55,.18)] transition-opacity hover:opacity-90"
                >
                  <span>Shop the collection</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
