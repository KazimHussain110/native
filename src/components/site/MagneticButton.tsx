import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "gold" | "ghost";
}

export function MagneticButton({ children, variant = "gold", className = "", ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  };

  const base =
    "magnetic-btn relative inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm uppercase tracking-[0.18em] font-medium overflow-hidden";
  const styles =
    variant === "gold"
      ? "text-ink bg-gradient-to-br from-[oklch(0.88_0.1_90)] via-[oklch(0.78_0.14_85)] to-[oklch(0.62_0.13_78)] shadow-[0_10px_40px_-10px_oklch(0.78_0.14_85/0.6)] hover:shadow-[0_20px_60px_-10px_oklch(0.78_0.14_85/0.8)]"
      : "text-foreground border border-white/15 hover:border-gold/60 hover:text-gold";

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles} ${className}`}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </button>
  );
}
