import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  id?: string;
}

export default function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
  id,
}: GlassCardProps) {
  return (
    <div
      id={id}
      className={cn(
        "rounded-2xl",
        "bg-[#0F1F1A]/70 backdrop-blur-xl",
        "border border-[#1C2B26]",
        hover && [
          "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:bg-[#132822]/80 hover:border-[#0F7A5A]/25",
          "hover:-translate-y-1",
          "hover:shadow-[0_20px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(15,122,90,0.09)]",
        ],
        glow && "shadow-[0_0_40px_rgba(15,122,90,0.12)]",
        className
      )}
    >
      {children}
    </div>
  );
}
