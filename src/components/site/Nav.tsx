import { motion } from "motion/react";

const links = ["Products", "Process", "Industries", "Sustainability", "Contact"];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-6 pt-6"
    >
      <nav className="glass flex w-full max-w-6xl items-center justify-between rounded-full px-6 py-3">
        <a href="#" className="flex items-center gap-2 text-sm font-medium tracking-widest">
          <span className="inline-block h-2 w-2 rounded-full bg-gold shadow-[0_0_16px_oklch(0.78_0.14_85)]" />
          <span className="uppercase">Verdant<span className="text-gold-gradient">Vessel</span></span>
        </a>
        <ul className="hidden items-center gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="transition-colors hover:text-gold">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full border border-gold/40 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-gold transition-all hover:bg-gold hover:text-ink"
        >
          Request Quote
        </a>
      </nav>
    </motion.header>
  );
}
