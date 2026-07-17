import { AnimatePresence, motion } from "motion/react";

export function Loader({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* Ambient radial glow behind logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="pointer-events-none absolute h-[500px] w-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(0.78 0.14 85 / 0.12) 0%, oklch(0.78 0.14 85 / 0.04) 45%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Logo */}
          <motion.img
            src="/logo.png"
            alt="Native Rituals"
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative mb-10 h-14 w-auto"
          />

          {/* Dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-1 w-1 rounded-full"
                style={{ background: "oklch(0.78 0.14 85)" }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Bottom progress line */}
          <motion.div
            className="fixed bottom-0 left-0 h-[1.5px] w-full origin-left"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.78 0.14 85 / 0.7), transparent)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
