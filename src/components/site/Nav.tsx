import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Menu, X } from "lucide-react";

const NAV = [
  { label: "Products", href: "#products" },
  { label: "Benefits", href: "#process" },
  { label: "Our Story", href: "#sustainability" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#products");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
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
        <a href="#top" className="flex items-center">
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
        <div className="flex items-center gap-2">
          <button className="hidden h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-gold md:grid">
            <Search className="h-4 w-4" />
          </button>
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

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
