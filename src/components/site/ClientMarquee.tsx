const clients = [
  "SHILAJIT", "ASHWAGANDHA", "PURE RESIN", "ADAPTOGEN", "HIMALAYAN", "AYURVEDA",
  "SHILAJIT SHOTS", "FULVIC ACID", "ANCIENT HERB", "VITALITY", "GROUNDING", "RITUAL",
];

export function ClientMarquee() {
  const row = [...clients, ...clients];
  return (
    <section className="relative border-y border-white/5 py-10">
      <p className="mb-6 text-center text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
        Rooted in Ayurveda · Trusted by 10,000+ customers
      </p>
      <div className="relative overflow-hidden mask-fade">
        <div
          className="flex w-max gap-16 whitespace-nowrap"
          style={{ animation: "marquee 40s linear infinite" }}
        >
          {row.map((c, i) => (
            <span
              key={i}
              className="text-2xl tracking-[0.3em] text-muted-foreground/60 transition-colors hover:text-gold md:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <style>{`.mask-fade{mask-image:linear-gradient(90deg,transparent,black 12%,black 88%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,black 12%,black 88%,transparent)}`}</style>
    </section>
  );
}
