"use client";

import { useEffect, useRef, type MutableRefObject, type RefObject } from "react";

interface CanvasRendererConfig {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  frames: MutableRefObject<HTMLImageElement[]>;
  fps: number;
  mode: "loop" | "scrub" | "paused";
  scrubProgress?: MutableRefObject<number>;
  onLoopComplete?: () => void;
}

export function useCanvasRenderer(config: CanvasRendererConfig) {
  const { canvasRef, frames, fps, mode, scrubProgress, onLoopComplete } = config;
  const rafId = useRef(0);
  const lastFrameIndex = useRef(-1);
  const startTime = useRef(0);

  // Resize canvas to match viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [canvasRef]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || mode === "paused") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    startTime.current = performance.now();
    lastFrameIndex.current = -1;

    function drawFrame(img: HTMLImageElement) {
      if (!ctx || !canvas) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;

      // Cover-fit: scale image to cover canvas, centered
      const scale = Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) / 2;
      const y = (ch - h) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
    }

    function tick() {
      const frameArray = frames.current;
      if (!frameArray.length) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      const frameCount = frameArray.length;
      let index: number;

      if (mode === "loop") {
        const elapsed = performance.now() - startTime.current;
        const totalFrameIndex = Math.floor((elapsed / 1000) * fps);
        index = totalFrameIndex % frameCount;

        // Detect loop completion
        if (
          lastFrameIndex.current > frameCount * 0.8 &&
          index < frameCount * 0.2
        ) {
          onLoopComplete?.();
        }
      } else {
        // scrub mode
        const progress = scrubProgress?.current ?? 0;
        index = Math.min(
          Math.floor(progress * (frameCount - 1)),
          frameCount - 1
        );
      }

      // Only redraw when frame changes
      if (index !== lastFrameIndex.current) {
        const img = frameArray[index];
        if (img?.complete && img.naturalWidth > 0) {
          drawFrame(img);
        }
        lastFrameIndex.current = index;
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, [canvasRef, frames, fps, mode, scrubProgress, onLoopComplete]);
}
