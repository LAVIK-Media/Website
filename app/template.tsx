"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}
