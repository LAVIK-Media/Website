"use client";

import {
  useRef,
  useMemo,
  useEffect,
  useState,
  useCallback,
  type RefObject,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

/**
 * No text texture — only bbox of the real DOM <h1> (uniforms).
 * Fog diverts around that box analytically (SDF), like flow around a stone.
 */
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec2 uMouseVel;
  uniform float uMousePhase;
  uniform float uFreezeTime;
  uniform vec2 uBoxCenter;
  uniform vec2 uBoxHalf;

  varying vec2 vUv;

  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float n01(float v) { return v * 0.5 + 0.5; }

  // Rounded rect (iq) — p = uv - center, b = half-extents, r = corner radius
  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + vec2(r);
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  float fbmFog(vec2 p, float t) {
    float s = 0.0;
    float a = 0.52;
    vec2 q = p;
    s += a * n01(snoise(vec3(q, t)));
    q *= 2.08;
    a *= 0.52;
    s += a * n01(snoise(vec3(q, t + 1.7)));
    q *= 2.05;
    a *= 0.52;
    s += a * n01(snoise(vec3(q, t + 3.1)));
    q *= 2.05;
    a *= 0.52;
    s += a * n01(snoise(vec3(q, t + 4.8)));
    return clamp(s, 0.0, 1.0);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    float mTrail = 0.0;
    float mTrailT = 0.0;
    float mTrailDSeg = 0.0;
    float time = uFreezeTime > 0.0 ? uFreezeTime : uTime;

    float ex = 2.5 / max(uResolution.x, 1.0);
    vec2 pRel = uv - uBoxCenter;
    float cornerR = min(uBoxHalf.x, uBoxHalf.y) * 0.22;
    float d = sdRoundedBox(pRel, uBoxHalf, cornerR);
    float dL = sdRoundedBox(pRel - vec2(ex, 0.0), uBoxHalf, cornerR);
    float dR = sdRoundedBox(pRel + vec2(ex, 0.0), uBoxHalf, cornerR);
    float dD = sdRoundedBox(pRel - vec2(0.0, ex), uBoxHalf, cornerR);
    float dU = sdRoundedBox(pRel + vec2(0.0, ex), uBoxHalf, cornerR);
    vec2 gSdf = vec2(dR - dL, dU - dD);
    float edgeMag = length(gSdf);
    vec2 nrm = normalize(gSdf + vec2(1.0e-5));
    vec2 tangent = vec2(-nrm.y, nrm.x);

    float tl = uBoxCenter.x - uBoxHalf.x;
    float cy = uBoxCenter.y;

    float spanClamp = smoothstep(tl - 0.14, tl + 0.06, uv.x);

    float tip = clamp((uv.x - tl) / max(1.0 - tl, 0.08), 0.0, 1.0);
    float coneHalfH = mix(0.09, 0.46, pow(tip, 2.35));
    float dy = abs(uv.y - cy);
    float cone = exp(-(dy * dy) / max(coneHalfH * coneHalfH, 1.0e-5));

    vec2 lightPos = vec2(1.14, cy);
    vec2 toPix = (uv - lightPos) * vec2(1.0, 1.15);
    float dist = length(toPix);

    float edgeBoost = smoothstep(0.72, 1.0, uv.x);

    // Slower overall motion (~32%)
    float tSlow = time * 0.68;

    float flow = tSlow * 0.13;
    float rayTime = tSlow * 0.092;

    float smokeTime = tSlow * 0.118;
    float warpX = snoise(vec3(uv.x * 1.1 + smokeTime * 1.35, uv.y * 0.8, 10.0)) * 0.06;
    float warpY = snoise(vec3(uv.x * 0.8, uv.y * 0.95 - smokeTime * 0.75, 12.0)) * 0.048;
    vec2 wuv = uv + vec2(warpX, warpY);

    // "Stone in water": stronger slip + split around obstacle
    vec2 wind = vec2(-1.0, 0.0);
    float hull = smoothstep(0.0, 0.38, d) * (1.0 - smoothstep(0.46, 1.18, d));
    vec2 slip = wind - nrm * dot(wind, nrm);
    wuv += slip * hull * 0.14;
    wuv += tangent * sin(tSlow * 2.0 + d * 42.0) * hull * 0.24;
    wuv += tangent * cos(tSlow * 1.35 + dot(uv, vec2(28.0, 19.0))) * hull * 0.12;
    wuv += tangent * sin(tSlow * 2.85 + d * 58.0) * hull * 0.1;
    wuv += nrm * sin(tSlow * 1.45 + edgeMag * 26.0) * hull * 0.078;
    vec2 outFromCenter = normalize(uv - uBoxCenter + vec2(1.0e-4));
    wuv += outFromCenter * hull * sin(tSlow * 1.55 + dot(uv, vec2(16.0, 11.0))) * 0.055;
    // Wake: eddy downstream (left) of block
    float wake = smoothstep(tl - 0.42, tl - 0.06, uv.x) * (1.0 - smoothstep(tl - 0.02, tl + 0.12, uv.x));
    wake *= exp(-abs(uv.y - cy) * 5.5);
    wuv += vec2(0.0, 1.0) * sin(tSlow * 1.7 + uv.x * 24.0) * wake * 0.072;
    wuv += vec2(1.0, 0.0) * sin(tSlow * 2.2 + uv.y * 31.0) * wake * 0.035;

    // Thin trail *behind* cursor (segment tail → tip); swirl only on that line
    if (uMouse.x >= 0.0) {
      vec2 vel = uMouseVel * vec2(aspect, 1.0);
      float speed = length(vel);
      if (speed > 4.5) {
        vec2 dir = vel / speed;
        float tailLen = clamp(0.04 + speed * 0.0001, 0.048, 0.095);
        vec2 tip = uMouse;
        vec2 tail = uMouse - dir * tailLen;
        vec2 ba = (tail - tip) * vec2(aspect, 1.0);
        vec2 pa = (uv - tip) * vec2(aspect, 1.0);
        float segL2 = dot(ba, ba);
        float tseg = clamp(dot(pa, ba) / max(segL2, 1.0e-6), 0.0, 1.0);
        float dSeg = length(pa - ba * tseg);
        float mt = uMousePhase;
        float lineW = 0.0031;
        float trailMask = exp(-(dSeg * dSeg) / max(lineW * lineW, 1.0e-8));
        trailMask *= smoothstep(0.0, 0.1, speed - 4.5);
        trailMask *= smoothstep(1.0, 0.4, tseg);
        mTrail = trailMask;
        mTrailT = tseg;
        mTrailDSeg = dSeg;
        vec2 perp = vec2(-dir.y, dir.x);
        float swirl = sin(mt * 2.4 + tseg * 36.0 + dSeg * 120.0);
        wuv += perp * trailMask * swirl * 0.0045;
        wuv += perp * trailMask * 0.0018 * sin(mt * 1.8 + tseg * 14.0);
      }
    }

    float edgeZone = hull * smoothstep(0.04, 0.4, d);

    wuv += vec2(
      snoise(vec3(wuv * 6.0 + tSlow * 0.4, 8.0)),
      snoise(vec3(wuv * 6.0 + tSlow * 0.35, 9.0))
    ) * 0.018 * (0.4 + cone * 0.6);

    float ray1 = snoise(vec3(
      wuv.x * 2.4 + rayTime * 1.65,
      wuv.y * 6.5 + sin(flow * 0.55) * 0.1,
      1.3
    ));
    ray1 = clamp(ray1 * 0.5 + 0.5, 0.0, 1.0);
    ray1 = pow(ray1, 1.15);
    ray1 = smoothstep(0.14, 0.9, ray1);

    float ray2 = snoise(vec3(
      wuv.x * 4.5 + rayTime * 2.0,
      wuv.y * 12.0,
      5.5
    ));
    ray2 = clamp(ray2 * 0.5 + 0.5, 0.0, 1.0);
    ray2 = pow(ray2, 1.65);
    ray2 = smoothstep(0.16, 0.85, ray2);
    float rays = ray1 * 0.55 + ray2 * 0.45;

    vec2 advect = vec2(smokeTime * 1.55, smokeTime * 0.35);
    advect += nrm * hull * smokeTime * 0.11;
    float fogBody = fbmFog(wuv * vec2(1.65, 1.15) + advect, smokeTime * 0.8);
    float fogMid = fbmFog(wuv * vec2(4.2, 3.1) + advect * 1.8, smokeTime * 1.2 + 2.0);
    float fogFine = n01(snoise(vec3(
      wuv.x * 9.0 + smokeTime * 2.8,
      wuv.y * 7.5 - smokeTime * 2.1,
      16.0
    )));
    fogFine = pow(fogFine, 1.85);
    float turbulence = n01(snoise(vec3(
      wuv.x * 14.0 + smokeTime * 3.2,
      wuv.y * 11.0 + smokeTime * 2.6,
      21.0
    )));
    turbulence = pow(turbulence, 2.1);

    float smoke = fogBody * 0.42 + fogMid * 0.32 + fogFine * 0.18 + turbulence * 0.12;

    float wispFront = n01(snoise(vec3(
      uv.x * 18.0 + tSlow * 1.55,
      uv.y * 16.0 - tSlow * 1.25,
      6.0
    )));
    wispFront = pow(wispFront, 2.4) * edgeZone;

    float lightCore = exp(-dist * 2.35);
    float lightWash = exp(-dist * 1.05);

    float hFade = cone * spanClamp * (0.55 + 0.45 * edgeBoost);
    hFade *= smoothstep(tl - 0.05, tl + 0.2, uv.x);

    float shapedRays = rays * hFade * lightWash * 2.05;
    float shapedSmoke = smoke * hFade * 1.12;

    float density = 0.0;
    density += lightCore * cone * spanClamp * 0.72;
    density += shapedRays;
    density += shapedSmoke * (lightWash * 0.78 + 0.22);
    density += lightCore * smoke * cone * spanClamp * 0.52;
    density += wispFront * hFade * lightWash * 0.85;

    density *= 0.6;

    // Readable interaction: fog piles in a thin shell around the headline box,
    // slightly clearer "wake" downstream (left) of the block
    float halo = exp(-(d * d) / max(0.088 * 0.088, 1.0e-6));
    halo *= smoothstep(0.0, 0.62, d) * (1.0 - smoothstep(0.95, 1.35, d));
    halo *= hFade * cone;
    density += halo * 0.48;

    float wakeShadow = smoothstep(tl - 0.52, tl - 0.03, uv.x);
    wakeShadow *= (1.0 - smoothstep(tl + 0.01, tl + 0.22, uv.x));
    wakeShadow *= exp(-abs(uv.y - cy) * (3.8 / max(uBoxHalf.y, 0.04)));
    density *= (1.0 - wakeShadow * 0.34);

    // Soft, rounded falloff: less fog *behind* the line, but no hard black rectangle
    float fogSoft = smoothstep(-0.07, 0.11, d);
    density *= mix(0.72, 1.0, fogSoft);

    if (mTrail > 0.0001) {
      float wisp = 0.62 + 0.38 * sin(uMousePhase * 2.0 + mTrailT * 22.0 + mTrailDSeg * 85.0);
      density += mTrail * 0.0065 * wisp;
    }

    float edgeFade = 1.0;
    edgeFade *= smoothstep(0.0, 0.05, uv.y);
    edgeFade *= smoothstep(1.0, 0.95, uv.y);
    edgeFade *= smoothstep(0.0, 0.03, uv.x);
    density *= edgeFade;

    density = max(density, 0.0);
    density = 1.0 - exp(-density * 2.4);

    vec3 bgColor     = vec3(0.012, 0.018, 0.016);
    vec3 deepGreen   = vec3(0.02, 0.06, 0.045);
    vec3 midGreen    = vec3(0.04, 0.18, 0.13);
    vec3 brightGreen = vec3(0.07, 0.32, 0.22);
    vec3 hotGreen    = vec3(0.12, 0.48, 0.34);
    vec3 peakWhite   = vec3(0.45, 0.62, 0.55);

    vec3 color = bgColor;
    color = mix(color, deepGreen,   smoothstep(0.0,  0.08, density));
    color = mix(color, midGreen,    smoothstep(0.05, 0.20, density));
    color = mix(color, brightGreen, smoothstep(0.15, 0.38, density));
    color = mix(color, hotGreen,    smoothstep(0.30, 0.55, density));
    color = mix(color, peakWhite,   smoothstep(0.50, 0.85, density));

    float coreBright = exp(-dist * 4.5) * density;
    vec3 silver = vec3(0.65, 0.72, 0.68);
    color = mix(color, silver, smoothstep(0.3, 0.7, coreBright) * 0.3);

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;

type PlumeBounds = {
  boxCenter: THREE.Vector2;
  boxHalf: THREE.Vector2;
};

type SmokePlaneProps = {
  freezeTime: number;
  mouseUv: { x: number; y: number };
  plumeBounds: PlumeBounds;
};

function SmokePlane({ freezeTime, mouseUv, plumeBounds }: SmokePlaneProps) {
  const { size } = useThree();
  const mouseRef = useRef({ x: -1, y: -1 });
  const smoothMouse = useRef({ x: -1, y: -1 });
  const prevRawMouse = useRef({ x: -1, y: -1 });
  const velSmooth = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(-1, -1) },
      uMouseVel: { value: new THREE.Vector2(0, 0) },
      uMousePhase: { value: 0 },
      uFreezeTime: { value: 0 },
      uBoxCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uBoxHalf: { value: new THREE.Vector2(0.2, 0.08) },
    }),
    []
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size.width, size.height, uniforms]);

  useEffect(() => {
    uniforms.uFreezeTime.value = freezeTime;
    uniforms.uBoxCenter.value.copy(plumeBounds.boxCenter);
    uniforms.uBoxHalf.value.copy(plumeBounds.boxHalf);
  }, [freezeTime, uniforms, plumeBounds.boxCenter, plumeBounds.boxHalf]);

  useFrame((_, delta) => {
    mouseRef.current.x = mouseUv.x;
    mouseRef.current.y = mouseUv.y;
    if (freezeTime <= 0.0) {
      uniforms.uTime.value += delta;
    }
    uniforms.uMousePhase.value += delta;

    const lerpFactor = 0.045;
    smoothMouse.current.x +=
      (mouseRef.current.x - smoothMouse.current.x) * lerpFactor;
    smoothMouse.current.y +=
      (mouseRef.current.y - smoothMouse.current.y) * lerpFactor;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const dt = Math.max(delta, 1e-4);
    const inUv = (x: number, y: number) =>
      x >= 0 && y >= 0 && x <= 1 && y <= 1;
    if (inUv(mx, my) && inUv(prevRawMouse.current.x, prevRawMouse.current.y)) {
      const vx = (mx - prevRawMouse.current.x) / dt;
      const vy = (my - prevRawMouse.current.y) / dt;
      const lerpV = 0.38;
      velSmooth.current.x += (vx - velSmooth.current.x) * lerpV;
      velSmooth.current.y += (vy - velSmooth.current.y) * lerpV;
      const cap = 42;
      velSmooth.current.x = THREE.MathUtils.clamp(velSmooth.current.x, -cap, cap);
      velSmooth.current.y = THREE.MathUtils.clamp(velSmooth.current.y, -cap, cap);
    } else {
      velSmooth.current.x *= 0.88;
      velSmooth.current.y *= 0.88;
    }
    prevRawMouse.current = { x: mx, y: my };

    uniforms.uMouse.value.set(smoothMouse.current.x, smoothMouse.current.y);
    uniforms.uMouseVel.value.set(velSmooth.current.x, velSmooth.current.y);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function shouldDisableWebGL() {
  if (typeof window === "undefined") return true;
  const narrowTouch =
    window.innerWidth < 768 &&
    window.matchMedia("(pointer: coarse)").matches;
  return narrowTouch;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type HeroHeadlineSmokeProps = {
  sectionRef: RefObject<HTMLElement | null>;
  textRef: RefObject<HTMLElement | null>;
  className?: string;
};

const DEFAULT_BOX: PlumeBounds = {
  boxCenter: new THREE.Vector2(0.5, 0.52),
  boxHalf: new THREE.Vector2(0.28, 0.06),
};

export default function HeroHeadlineSmoke({
  sectionRef,
  textRef,
  className = "",
}: HeroHeadlineSmokeProps) {
  const [renderGl, setRenderGl] = useState(false);
  const [freezeTime, setFreezeTime] = useState(0);
  const [mouseUv, setMouseUv] = useState({ x: -1, y: -1 });
  const [plumeBounds, setPlumeBounds] = useState<PlumeBounds>({
    boxCenter: DEFAULT_BOX.boxCenter.clone(),
    boxHalf: DEFAULT_BOX.boxHalf.clone(),
  });

  useEffect(() => {
    const el = sectionRef.current;
    const onMove = (e: MouseEvent) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      setMouseUv({
        x: (e.clientX - r.left) / r.width,
        y: 1 - (e.clientY - r.top) / r.height,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [sectionRef]);

  const updateHeadlineBox = useCallback(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const sRect = section.getBoundingClientRect();
    const tRect = textEl.getBoundingClientRect();
    const w = sRect.width;
    const h = sRect.height;

    const textLeft = (tRect.left - sRect.left) / w;
    const textRight = (tRect.right - sRect.left) / w;
    const vTop = (sRect.bottom - tRect.top) / h;
    const vBottom = (sRect.bottom - tRect.bottom) / h;

    const cx = (textLeft + textRight) / 2;
    const cy = (vTop + vBottom) / 2;
    const padX = 0.005;
    const padY = 0.004;
    const hx = (textRight - textLeft) / 2 + padX;
    const hy = (vTop - vBottom) / 2 + padY;

    setPlumeBounds({
      boxCenter: new THREE.Vector2(
        Math.max(0.02, Math.min(0.98, cx)),
        Math.max(0.06, Math.min(0.94, cy))
      ),
      boxHalf: new THREE.Vector2(
        Math.max(0.05, hx),
        Math.max(0.03, hy)
      ),
    });
  }, [sectionRef, textRef]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ro = new ResizeObserver(() => updateHeadlineBox());
    ro.observe(section);
    const textEl = textRef.current;
    if (textEl) ro.observe(textEl);

    const onScroll = () => updateHeadlineBox();
    window.addEventListener("scroll", onScroll, { passive: true });

    updateHeadlineBox();
    const id = requestAnimationFrame(() => updateHeadlineBox());

    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionRef, textRef, updateHeadlineBox]);

  useEffect(() => {
    setRenderGl(!shouldDisableWebGL());
    setFreezeTime(prefersReducedMotion() ? 0.42 : 0);
  }, []);

  if (!renderGl) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[#030504]" />
        <div className="absolute -right-[5%] top-1/2 h-[min(130%,32rem)] w-[min(95%,48rem)] -translate-y-1/2 rounded-full bg-[#0F7A5A]/[0.14] blur-[110px]" />
        <div className="absolute right-0 top-1/2 h-[min(100%,26rem)] w-[min(60%,28rem)] -translate-y-1/2 rounded-full bg-[#1FBF8F]/[0.09] blur-[90px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,transparent_0%,#030504_55%)]" />
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 1] }}
        style={{
          width: "100%",
          height: "100%",
          background: "#030504",
        }}
      >
        <SmokePlane
          freezeTime={freezeTime}
          mouseUv={mouseUv}
          plumeBounds={plumeBounds}
        />
      </Canvas>
    </div>
  );
}
