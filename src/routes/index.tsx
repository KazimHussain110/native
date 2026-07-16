import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { ClientMarquee } from "@/components/site/ClientMarquee";
import { ProductShowcase } from "@/components/site/ProductShowcase";
import { Process } from "@/components/site/Process";
import { Industries } from "@/components/site/Industries";
import { Sustainability } from "@/components/site/Sustainability";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact, Footer } from "@/components/site/Contact";
import { CursorGlow } from "@/components/site/CursorGlow";
import { ScrollProgress } from "@/components/site/ScrollProgress";

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
          "Glass, PET, aluminum, jars and custom packaging — designed, moulded and finished in-house.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative bg-background">
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <Hero />
      <ClientMarquee />
      <ProductShowcase />
      <Process />
      <Industries />
      <Stats />
      <Sustainability />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
