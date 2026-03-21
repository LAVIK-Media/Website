"use client";

import { useRef, useState, useEffect } from "react";
import { getFrameUrl } from "./introConfig";

interface FrameSequenceConfig {
  basePath: string;
  frameCount: number;
  extension: string;
  preloadCount: number;
  /** If true, don't start loading yet */
  defer?: boolean;
}

interface FrameSequenceResult {
  frames: React.MutableRefObject<HTMLImageElement[]>;
  ready: boolean;
  progress: number;
}

export function useFrameSequence(config: FrameSequenceConfig): FrameSequenceResult {
  const { basePath, frameCount, extension, preloadCount, defer } = config;
  const frames = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const loadedCount = useRef(0);
  const initialized = useRef(false);

  useEffect(() => {
    if (defer || initialized.current) return;
    initialized.current = true;

    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = () => {
        loadedCount.current++;
        const p = loadedCount.current / frameCount;
        setProgress(p);
        if (loadedCount.current >= preloadCount && !ready) {
          setReady(true);
        }
      };
      img.onerror = () => {
        // Count errors as "loaded" to prevent blocking
        loadedCount.current++;
      };
      img.src = getFrameUrl(basePath, i, extension);
      imgs.push(img);
    }

    frames.current = imgs;
  }, [basePath, frameCount, extension, preloadCount, defer, ready]);

  return { frames, ready, progress };
}
