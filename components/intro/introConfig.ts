export const INTRO_CONFIG = {
  intro: {
    basePath: "/frames/intro",
    frameCount: 121,
    fps: 24,
    width: 1920,
    height: 1068,
    extension: "jpg",
    preloadCount: 30,
  },
  scroll: {
    basePath: "/frames/scroll",
    frameCount: 48,
    fps: 24,
    width: 1920,
    height: 1080,
    extension: "jpg",
    preloadCount: 48, // preload all — it's only 48 frames and auto-plays fast
  },
  // Height of the scroll spacer for the intro scrub (in vh) — weniger = weniger Maus-/Trackpad-Weg
  introScrollHeight: 135,
  // Duration for the auto-play transition (ms)
  transitionDuration: 880,
  // Fade-out duration when transitioning to landing page (ms)
  fadeOutDuration: 500,
} as const;

/** Build the URL for a specific frame */
export function getFrameUrl(
  basePath: string,
  index: number,
  extension: string
): string {
  const padded = String(index + 1).padStart(4, "0");
  return `${basePath}/frame-${padded}.${extension}`;
}
