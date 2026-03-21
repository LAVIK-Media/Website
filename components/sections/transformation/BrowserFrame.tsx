"use client";

import { ReactNode, forwardRef } from "react";

interface BrowserFrameProps {
  url: string;
  variant: "old" | "new";
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Browser chrome wrapper (traffic light dots, URL bar, content slot).
 * Two visual variants:
 *  - "old" → grey Windows-era browser chrome
 *  - "new" → sleek dark browser matching LAVIK design system
 */
const BrowserFrame = forwardRef<HTMLDivElement, BrowserFrameProps>(
  function BrowserFrame({ url, variant, children, className = "", style: externalStyle }, ref) {
    const isOld = variant === "old";

    return (
      <div
        ref={ref}
        className={`relative flex flex-col rounded-2xl ${className}`}
        style={{
          width: "min(85vw, 1100px)",
          height: "min(75vh, 700px)",
          boxShadow: isOld
            ? "0 8px 40px rgba(0,0,0,0.5)"
            : "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(15,122,90,0.08)",
          border: isOld
            ? "1px solid rgba(180,180,180,0.15)"
            : "1px solid #1C2B26",
          ...externalStyle,
        }}
      >
        {/* ── Toolbar ── */}
        <div
          data-frame-chrome
          className="flex items-center gap-3 px-4 shrink-0"
          style={{
            height: isOld ? 36 : 42,
            background: isOld
              ? "linear-gradient(to bottom, #d4d0c8, #c0bbb4)"
              : "#0A1411",
            borderBottom: isOld
              ? "1px solid #a0a0a0"
              : "1px solid #1C2B26",
          }}
        >
          {/* Traffic-light dots */}
          <div className="flex gap-1.5">
            {isOld ? (
              <>
                <div
                  className="w-3 h-3 rounded-sm border flex items-center justify-center text-[7px] font-bold leading-none"
                  style={{
                    background: "#d4d0c8",
                    borderColor: "#808080",
                    color: "#333",
                  }}
                >
                  ✕
                </div>
                <div
                  className="w-3 h-3 rounded-sm border"
                  style={{
                    background: "#d4d0c8",
                    borderColor: "#808080",
                  }}
                />
                <div
                  className="w-3 h-3 rounded-sm border"
                  style={{
                    background: "#d4d0c8",
                    borderColor: "#808080",
                  }}
                />
              </>
            ) : (
              <>
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </>
            )}
          </div>

          {/* URL bar */}
          <div
            className="flex-1 flex items-center px-3 gap-2 rounded-md overflow-hidden"
            style={{
              height: isOld ? 22 : 26,
              background: isOld ? "#ffffff" : "#132822",
              border: isOld ? "1px inset #808080" : "none",
            }}
          >
            {!isOld && (
              <div className="w-2 h-2 rounded-full bg-[#1FBF8F]/40 shrink-0" />
            )}
            <span
              className="truncate"
              style={{
                fontSize: isOld ? 11 : 10,
                fontFamily: isOld ? "Arial, sans-serif" : "monospace",
                color: isOld ? "#333" : "rgba(78,122,106,0.7)",
              }}
            >
              {url}
            </span>
          </div>
        </div>

        {/* ── Content viewport ── */}
        <div
          className="flex-1 relative overflow-hidden"
          style={{
            background: isOld ? "#f5f0e8" : "#060D0A",
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default BrowserFrame;
