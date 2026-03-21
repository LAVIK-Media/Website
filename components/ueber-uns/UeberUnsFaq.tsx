"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export default function UeberUnsFaq({ items }: { items: FaqItem[] }) {
  const reduced = useReducedMotion();

  return (
    <div className="mx-auto max-w-2xl space-y-3">
      {items.map((faq, i) => (
        <motion.div
          key={faq.q}
          initial={reduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-32px" }}
          transition={{ delay: i * 0.05, duration: 0.55, ease }}
          whileHover={reduced ? {} : { y: -2 }}
        >
          <details className="group rounded-2xl bg-[#0a1210]/50 ring-1 ring-white/[0.06] transition-[box-shadow,ring-color] duration-300 open:shadow-[0_12px_40px_rgba(0,0,0,0.25)] open:ring-[#1FBF8F]/25">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-sm font-semibold text-[#E8EFEC] marker:content-none [&::-webkit-details-marker]:hidden">
              {faq.q}
              <ChevronDown className="h-4 w-4 shrink-0 text-[#6F8580] transition duration-300 group-open:rotate-180 group-open:text-[#1FBF8F]/80" />
            </summary>
            <div className="px-5 pb-4 pt-1">
              <p className="text-sm leading-relaxed text-[#9BAFA8]">{faq.a}</p>
            </div>
          </details>
        </motion.div>
      ))}
    </div>
  );
}
