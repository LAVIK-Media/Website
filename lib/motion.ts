/** Gemeinsame Motion-Werte – ruhig, „pro“, wenig Bounce */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const transitionReveal = {
  duration: 0.75,
  ease: easeOutExpo,
} as const;

export const transitionSnappy = {
  duration: 0.45,
  ease: easeOutExpo,
} as const;

export const springNav = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
};
