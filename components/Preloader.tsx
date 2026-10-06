"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 400);
          return 100;
        }
        const step = prev < 70 ? Math.random() * 15 + 8 : Math.random() * 6 + 2;
        return Math.min(prev + step, 100);
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0A0A0C] pointer-events-auto"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.span
              className="font-mono text-[80px] sm:text-[120px] font-extrabold text-[#F5F5F0] tabular-nums leading-none"
              key={Math.floor(progress)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {Math.floor(progress).toString().padStart(3, "0")}
            </motion.span>
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}