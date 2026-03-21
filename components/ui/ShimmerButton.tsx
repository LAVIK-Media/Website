"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface ShimmerButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  /** default: brand green + shimmer · quiet: dark glass, minimal blur, no shimmer */
  variant?: "default" | "quiet";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function ShimmerButton({
  href,
  onClick,
  children,
  className,
  size = "md",
  variant = "default",
  type = "button",
  disabled = false,
}: ShimmerButtonProps) {
  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-6 py-3.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const base = cn(
    "relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl overflow-hidden",
    variant === "default" && [
      "bg-[#0F7A5A] text-[#F2F5F4]",
      "transition-all duration-300",
      "hover:bg-[#159A73] hover:shadow-[0_0_28px_rgba(15,122,90,0.5)]",
    ],
    variant === "quiet" && [
      "border border-[#1f3d2b]/45 bg-[#050806]/55 text-[#f2f5f4]",
      "backdrop-blur-[6px] shadow-none",
      "transition-all duration-300",
      "hover:border-[#1f3d2b]/70 hover:bg-[#0a1210]/75",
      "active:scale-[0.99]",
    ],
    variant === "default" && "active:scale-[0.98]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none",
    sizeClasses[size],
    className
  );

  const shimmerEl =
    variant === "default" ? (
      <span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
          backgroundSize: "500px 100%",
          animation: "shimmer 2.5s linear infinite",
        }}
      />
    ) : null;

  const content = (
    <>
      {shimmerEl}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const motionWrap = (node: ReactNode) => (
    <motion.span
      className="inline-flex"
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
    >
      {node}
    </motion.span>
  );

  if (href) {
    return motionWrap(
      <Link href={href} className={base}>
        {content}
      </Link>
    );
  }

  return motionWrap(
    <button onClick={onClick} className={base} type={type} disabled={disabled}>
      {content}
    </button>
  );
}
