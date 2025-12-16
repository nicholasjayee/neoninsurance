"use client";

import { motion } from "framer-motion";

export function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center glass bg-brand-light/90"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-4 w-4 rounded-full bg-brand-primary"
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm font-medium text-brand-text-secondary uppercase tracking-widest"
        >
          Loading
        </motion.p>
      </div>
    </motion.div>
  );
}
