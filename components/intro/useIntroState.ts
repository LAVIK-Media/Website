"use client";

import { useRef, useState, useCallback } from "react";

export type IntroPhase =
  | "loading"
  | "intro-scrub"
  | "transition"
  | "done";

interface IntroStateResult {
  phase: IntroPhase;
  phaseRef: React.MutableRefObject<IntroPhase>;
  setPhase: (p: IntroPhase) => void;
}

export function useIntroState(): IntroStateResult {
  const [phase, setPhaseState] = useState<IntroPhase>("loading");
  const phaseRef = useRef<IntroPhase>("loading");

  const setPhase = useCallback((p: IntroPhase) => {
    phaseRef.current = p;
    setPhaseState(p);
  }, []);

  return { phase, phaseRef, setPhase };
}
