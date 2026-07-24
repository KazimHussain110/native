import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Contact";
import { CursorGlow } from "@/components/site/CursorGlow";
import { MagneticButton } from "@/components/site/MagneticButton";
import { Mail, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Native Rituals" },
      {
        name: "description",
        content: "Get in touch with Native Rituals.",
      },
    ],
  }),
});

const FAQS = [
  {
    q: "Which product should I start with?",
    a: "If you're new to adaptogens, we recommend starting with our Pure Shilajit Resin. It's our most popular product and delivers noticeable results within the first week.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3–5 business days. Every order is tracked end-to-end and includes a certificate of analysis.",
  },
  {
    q: "Do you offer a money-back guarantee?",
    a: "Yes. If you're not satisfied within 30 days of purchase, we'll refund you in full — no questions asked.",
  },
  {
    q: "Are your products third-party tested?",
    a: "Every batch is tested by an independent lab for heavy metals, microbials, and potency before it leaves our facility.",
  },
];

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-full border border-black/8 bg-black/[0.02] px-5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
      />
    </div>
  );
}

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      className="border-b border-black/8"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-5 text-left text-sm font-medium transition-colors hover:text-gold"
      >
        {q}
        <span
          className={`ml-4 shrink-0 text-gold transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>
      </motion.div>
    </motion.div>
  );
}

function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <CursorGlow />
      <Nav />

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="hero-glow-gold absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-32 pt-36">
        {/* Hero heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-20 text-center"
        >
          <h1
            className="mt-4 text-[clamp(3rem,8vw,7rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span style={{ color: "#4a7c52" }}>We'd love to </span>
            <span className="text-serif-italic text-gold-gradient">hear from you</span>
            <span style={{ color: "#4a7c52" }}>.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground">
            Questions about products, sourcing, or your order? We read every message and reply
            ASAP.
          </p>
        </motion.div>

        {/* Two-column layout with separator */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex-1"
          >
            <h2 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              Send a message
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill in the form and we'll get back to you shortly.
            </p>

            <form className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Your name" placeholder="Jane Doe" />
              <Field label="Email" placeholder="jane@email.com" type="email" />
              <div className="md:col-span-2">
                <Field label="Subject" placeholder="Which product is right for me?" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="I'd like to know more about Shilajit resin and which strength to start with…"
                  className="w-full resize-none rounded-2xl border border-black/8 bg-black/[0.02] p-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
                />
              </div>
            </form>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <MagneticButton>Send Message →</MagneticButton>
            </div>
          </motion.div>

          {/* Separator */}
          <div className="h-px w-full bg-black/8 lg:h-auto lg:w-px lg:self-stretch" />

          {/* Right — info card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="w-full lg:w-[360px] shrink-0"
          >
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
              Contact Info
            </h3>
            <div className="mt-5 space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "hello@nativerituals.co",
                  href: "mailto:hello@nativerituals.co",
                },
                { icon: MapPin, label: "Origin", value: "United States" },
                { icon: Clock, label: "Response time", value: "Within 42 hours" },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/20 bg-gold/5">
                    <Icon className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {label}
                    </p>
                    {href ? (
                      <a href={href} className="mt-1 block text-sm text-gold hover:underline">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-foreground/90">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-24 max-w-3xl"
        >
          <div className="mb-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.45em] text-gold/70">FAQ</p>
            <h2
              className="mt-3 text-[clamp(2rem,5vw,4rem)] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span style={{ color: "#4a7c52" }}>Common </span>
              <span className="text-serif-italic text-gold-gradient">questions</span>
              <span style={{ color: "#4a7c52" }}>.</span>
            </h2>
          </div>
          <div>
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} i={i} />
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
