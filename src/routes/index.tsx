import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { ClientMarquee } from "@/components/site/ClientMarquee";
import { ProductShowcase } from "@/components/site/ProductShowcase";
import { Process } from "@/components/site/Process";
import { ProcessCircuit } from "@/components/site/ProcessCircuit";
import { Industries } from "@/components/site/Industries";
import { Sustainability } from "@/components/site/Sustainability";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact, Footer } from "@/components/site/Contact";
import { CursorGlow } from "@/components/site/CursorGlow";
import { useState, useRef, useEffect, type CSSProperties } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "VerdantVessel — Luxury Packaging Manufacturing" },
      {
        name: "description",
        content:
          "Premium manufacturer of glass, PET, aluminum and cosmetic packaging. Vessels engineered for the world's most demanding brands.",
      },
      { property: "og:title", content: "VerdantVessel — Luxury Packaging Manufacturing" },
      {
        property: "og:description",
        content:
          "Premium manufacturer of glass, PET, aluminum and cosmetic packaging. Vessels engineered for the world's most demanding brands.",
      },
    ],
  }),
});

function Index() {
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const update = () => setFooterHeight(el.offsetHeight);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <main className="relative w-full max-w-full overflow-x-clip bg-background md:overflow-x-visible">
      <CursorGlow />
      <div
        className="relative z-10 mb-0 bg-background md:mb-[var(--footer-height)]"
        style={{ "--footer-height": `${footerHeight}px` } as CSSProperties}
      >
        <Nav />
        <Hero />
        <ClientMarquee />
        <ProductShowcase />
        <Sustainability />
        <Process />
        <ProcessCircuit />
        <Industries />
        <Testimonials />
        <Stats />
        <Contact />
      </div>
      <Footer footerRef={footerRef} />
    </main>
  );
}
