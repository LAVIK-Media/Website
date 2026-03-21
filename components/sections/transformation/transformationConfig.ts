/**
 * Scroll-driven transformation animation configuration — v4.1
 *
 * Progress 0–1 mapped to 5 phases across 500vh:
 *   1. holdOld      — Show old website statically (with fade-in)
 *   2. scatter      — ~21 old tiles scatter in wave from center, frame chrome fades
 *   3. transition   — Old tiles drift/fade, new tiles appear scattered
 *   4. assemble     — ~17 new tiles converge (outside→center), frame chrome returns
 *   5. holdNew      — Show new website assembled (with fade-out)
 *
 * No zoomCta — animation ends cleanly, user scrolls to next section naturally.
 */

// ── Phase boundaries (time-based, 8s animation) ──
// No hold phases — animation starts instantly, ends instantly
export const PHASES = {
  holdOld:   { start: 0.00, end: 0.005 },  // ~40ms, basically instant
  scatter:   { start: 0.005, end: 0.28 },
  transition:{ start: 0.28, end: 0.48 },
  assemble:  { start: 0.48, end: 0.98 },
  holdNew:   { start: 0.98, end: 1.00 },   // ~160ms, barely there
} as const;

// ── Frame chrome animation timing ──
export const FRAME_ANIM = {
  fadeOutStart: 0.01,
  fadeOutEnd: 0.20,
  fadeInStart: 0.56,
  fadeInEnd: 0.90,
} as const;

// ── Camera keyframes (perspectiveOrigin %, translateZ px) ──
export const CAMERA = {
  holdOld:    { ox: 50, oy: 50, z: 0 },
  scatter:    { ox: 53, oy: 47, z: 60 },
  transition: { ox: 47, oy: 53, z: 40 },
  assemble:   { ox: 50, oy: 50, z: 0 },
} as const;

// ── Old website tile IDs (match data-tile attributes) ──
export const OLD_TILES = [
  "old-navbar",
  "old-marquee",
  "old-hero-image",
  "old-hero-text",
  "old-sidebar-header",
  "old-sidebar-links-1",
  "old-sidebar-links-2",
  "old-sidebar-counter",
  "old-sidebar-date",
  "old-content-heading",
  "old-content-text",
  "old-content-images",
  "old-hours-heading",
  "old-hours-table",
  "old-hours-note",
  "old-news-heading",
  "old-news-card",
  "old-news-credit",
  "old-footer-copy",
  "old-footer-credit",
  "old-footer-links",
] as const;

// ── New website tile IDs ──
export const NEW_TILES = [
  "new-nav-logo",
  "new-nav-links",
  "new-hero-bg",
  "new-hero-badge",
  "new-hero-title",
  "new-hero-desc",
  "new-hero-buttons",
  "new-stats-strip",
  "new-feature-1",
  "new-feature-2",
  "new-feature-3",
  "new-products-heading",
  "new-product-1",
  "new-product-2",
  "new-footer-brand",
  "new-footer-contact",
] as const;

// ── Scatter vector type ──
export type ScatterVector = {
  tx: number;
  ty: number;
  tz: number;
  rx: number;
  ry: number;
  rz: number;
  s: number;
};

// ── Tile position map for wave stagger (normalized 0–1) ──
export interface TilePosition {
  cx: number;
  cy: number;
}

const OLD_POSITIONS: Record<string, TilePosition> = {
  "old-navbar":          { cx: 0.5, cy: 0.03 },
  "old-marquee":         { cx: 0.5, cy: 0.07 },
  "old-hero-image":      { cx: 0.5, cy: 0.16 },
  "old-hero-text":       { cx: 0.5, cy: 0.16 },
  "old-sidebar-header":  { cx: 0.15, cy: 0.32 },
  "old-sidebar-links-1": { cx: 0.15, cy: 0.40 },
  "old-sidebar-links-2": { cx: 0.15, cy: 0.50 },
  "old-sidebar-counter": { cx: 0.15, cy: 0.60 },
  "old-sidebar-date":    { cx: 0.15, cy: 0.68 },
  "old-content-heading": { cx: 0.62, cy: 0.32 },
  "old-content-text":    { cx: 0.62, cy: 0.38 },
  "old-content-images":  { cx: 0.62, cy: 0.46 },
  "old-hours-heading":   { cx: 0.62, cy: 0.55 },
  "old-hours-table":     { cx: 0.62, cy: 0.62 },
  "old-hours-note":      { cx: 0.62, cy: 0.70 },
  "old-news-heading":    { cx: 0.62, cy: 0.74 },
  "old-news-card":       { cx: 0.62, cy: 0.80 },
  "old-news-credit":     { cx: 0.62, cy: 0.86 },
  "old-footer-copy":     { cx: 0.50, cy: 0.92 },
  "old-footer-credit":   { cx: 0.50, cy: 0.95 },
  "old-footer-links":    { cx: 0.50, cy: 0.98 },
};

const NEW_POSITIONS: Record<string, TilePosition> = {
  "new-nav-logo":      { cx: 0.25, cy: 0.03 },
  "new-nav-links":     { cx: 0.75, cy: 0.03 },
  "new-hero-bg":       { cx: 0.50, cy: 0.18 },
  "new-hero-badge":    { cx: 0.30, cy: 0.12 },
  "new-hero-title":    { cx: 0.30, cy: 0.20 },
  "new-hero-desc":     { cx: 0.30, cy: 0.28 },
  "new-hero-buttons":  { cx: 0.30, cy: 0.34 },
  "new-stats-strip":   { cx: 0.50, cy: 0.42 },
  "new-feature-1":     { cx: 0.17, cy: 0.53 },
  "new-feature-2":     { cx: 0.50, cy: 0.53 },
  "new-feature-3":     { cx: 0.83, cy: 0.53 },
  "new-products-heading": { cx: 0.50, cy: 0.66 },
  "new-product-1":       { cx: 0.30, cy: 0.78 },
  "new-product-2":       { cx: 0.70, cy: 0.78 },
  "new-footer-brand":  { cx: 0.30, cy: 0.95 },
  "new-footer-contact":{ cx: 0.70, cy: 0.95 },
};

// ── Seeded pseudo-random ──
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Generate scatter vector — reduced magnitudes to keep tiles on screen */
function generateScatter(
  index: number,
  _total: number,
  pos: TilePosition,
  seed: number
): ScatterVector {
  const rng = seededRandom(seed + index * 127);

  const angleFromCenter = Math.atan2(pos.cy - 0.5, pos.cx - 0.5);
  const dist = Math.sqrt((pos.cx - 0.5) ** 2 + (pos.cy - 0.5) ** 2);

  // Reduced spread to keep tiles visible on smaller screens
  const spreadMultiplier = 0.9 + dist * 0.8;
  const baseAngle = angleFromCenter + (rng() - 0.5) * 1.2;
  const magnitude = 10 + rng() * 15; // 10–25 vw/vh (was 18–40)

  const tx = Math.cos(baseAngle) * magnitude * spreadMultiplier;
  const ty = Math.sin(baseAngle) * magnitude * spreadMultiplier;
  const tz = 150 + rng() * 300;    // 150–450px (was 250–700)
  const rx = (rng() - 0.5) * 60;   // ±30°
  const ry = (rng() - 0.5) * 60;   // ±30°
  const rz = (rng() - 0.5) * 36;   // ±18°
  const s = 0.70 + rng() * 0.15;   // 0.70–0.85

  return { tx, ty, tz, rx, ry, rz, s };
}

// ── Generate all scatter vectors procedurally ──
export const OLD_SCATTER: Record<string, ScatterVector> = {};
OLD_TILES.forEach((id, i) => {
  OLD_SCATTER[id] = generateScatter(i, OLD_TILES.length, OLD_POSITIONS[id], 42);
});

export const NEW_SCATTER: Record<string, ScatterVector> = {};
NEW_TILES.forEach((id, i) => {
  NEW_SCATTER[id] = generateScatter(i, NEW_TILES.length, NEW_POSITIONS[id], 137);
});

// ── Wave stagger: distance-from-center based ──
function computeWaveStagger(positions: Record<string, TilePosition>, ids: readonly string[]): Record<string, number> {
  const distances: Record<string, number> = {};
  let maxDist = 0;
  for (const id of ids) {
    const pos = positions[id];
    const d = Math.sqrt((pos.cx - 0.5) ** 2 + (pos.cy - 0.5) ** 2);
    distances[id] = d;
    if (d > maxDist) maxDist = d;
  }
  const stagger: Record<string, number> = {};
  for (const id of ids) {
    stagger[id] = maxDist > 0 ? (distances[id] / maxDist) * 0.35 : 0;
  }
  return stagger;
}

export const OLD_STAGGER = computeWaveStagger(OLD_POSITIONS, OLD_TILES);
export const NEW_STAGGER = computeWaveStagger(NEW_POSITIONS, NEW_TILES);

// ── Particle seed data ──
export const PARTICLE_COUNT = 20;

export interface ParticleSeed {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  delay: number;
}

export const PARTICLES: ParticleSeed[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const rng = seededRandom(777 + i * 31);
  const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
  const radius = 12 + rng() * 28;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    dx: (rng() - 0.5) * 24,
    dy: (rng() - 0.5) * 18 - 6,
    size: 2 + rng() * 5,
    color: i % 4 === 0 ? "#0F7A5A" : i % 4 === 1 ? "#1FBF8F" : i % 4 === 2 ? "#ff8c00" : "#b8860b",
    delay: rng() * 0.4,
  };
});

// ── Easing helpers ──

export function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeIn(t: number): number {
  return t * t * t;
}

export function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

export function mapRange(value: number, inStart: number, inEnd: number): number {
  return Math.max(0, Math.min(1, (value - inStart) / (inEnd - inStart)));
}
