"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;

  varying vec2 vUv;

  // ── Simplex 3D noise ──────────────────────────────────────────────
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

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    float time = uTime;

    // ── LIGHT SOURCE — LEFT side ──────────────────────────────────
    vec2 lightPos = vec2(-0.15, 0.45);

    // Distance from light — elliptical (wider horizontally)
    vec2 ld = (uv - lightPos) * vec2(0.55, 1.4);
    float lightDist = length(ld);

    // ── VERTICAL CONFINEMENT — fog in a horizontal band ───────────
    // Gaussian band centered at y≈0.45, matching text area
    float vertBand = exp(-pow((uv.y - 0.45) * 2.2, 2.0));
    // Wider secondary band for atmospheric spill
    float vertWide = exp(-pow((uv.y - 0.45) * 1.2, 2.0));

    // ── HORIZONTAL FALLOFF — strong on left, fades right ──────────
    float hFade = smoothstep(1.1, 0.0, uv.x);
    hFade = pow(hFade, 1.8);

    // ── LIGHT RAYS — anisotropic streaks from light source ────────
    // These are the key visual feature — bright horizontal beams
    float rayTime = time * 0.015;

    // Primary rays — long horizontal streaks
    float ray1 = snoise(vec3(
      uv.x * 1.5 - rayTime * 0.4,
      uv.y * 4.0,
      1.0
    ));
    ray1 = clamp(ray1 * 0.5 + 0.5, 0.0, 1.0);
    ray1 = pow(ray1, 1.5);
    ray1 = smoothstep(0.2, 0.8, ray1);

    // Secondary rays — finer detail streaks
    float ray2 = snoise(vec3(
      uv.x * 3.0 - rayTime * 0.6,
      uv.y * 8.0,
      5.0
    ));
    ray2 = clamp(ray2 * 0.5 + 0.5, 0.0, 1.0);
    ray2 = pow(ray2, 2.0);
    ray2 = smoothstep(0.25, 0.75, ray2);

    // Combine rays
    float rays = ray1 * 0.7 + ray2 * 0.3;

    // ── SMOKE / FOG LAYERS ────────────────────────────────────────
    float smokeTime = time * 0.02;

    // Domain warp for organic smoke movement
    float warpX = snoise(vec3(uv.x * 0.8 - smokeTime * 0.3, uv.y * 0.6, 10.0)) * 0.08;
    float warpY = snoise(vec3(uv.x * 0.6, uv.y * 0.8 - smokeTime * 0.2, 12.0)) * 0.05;
    vec2 wuv = uv + vec2(warpX, warpY);

    // Slow-moving large smoke volumes
    float smoke1 = snoise(vec3(
      wuv.x * 1.2 - smokeTime * 0.35,
      wuv.y * 0.8,
      3.0
    ));
    smoke1 += snoise(vec3(
      wuv.x * 2.4 - smokeTime * 0.5,
      wuv.y * 1.6,
      7.0
    )) * 0.4;
    smoke1 = clamp(smoke1 * 0.5 + 0.5, 0.0, 1.0);
    smoke1 = smoothstep(0.15, 0.65, smoke1);

    // Faster, finer smoke wisps
    float smoke2 = snoise(vec3(
      wuv.x * 3.5 - smokeTime * 0.7,
      wuv.y * 2.5,
      15.0
    ));
    smoke2 = clamp(smoke2 * 0.5 + 0.5, 0.0, 1.0);
    smoke2 = pow(smoke2, 2.2);
    smoke2 = smoothstep(0.15, 0.6, smoke2);

    // Very fine turbulence
    float turbulence = snoise(vec3(
      wuv.x * 6.0 - smokeTime * 1.2,
      wuv.y * 5.0,
      20.0
    ));
    turbulence = clamp(turbulence * 0.5 + 0.5, 0.0, 1.0);
    turbulence = pow(turbulence, 3.0);

    // Combine smoke
    float smoke = smoke1 * 0.6 + smoke2 * 0.3 + turbulence * 0.1;

    // ── COMPOSE — light rays + smoke, confined to band ────────────
    // Light core — bright concentrated glow from source
    float lightCore = exp(-lightDist * 2.5);
    // Broader light wash — reaches across more of the screen
    float lightWash = exp(-lightDist * 1.2);

    // Rays shaped by vertical band and horizontal falloff
    float shapedRays = rays * vertBand * hFade * lightWash * 2.5;

    // Smoke shaped by band (slightly wider than rays)
    float shapedSmoke = smoke * vertWide * hFade;

    // Final density
    float density = 0.0;
    density += lightCore * vertBand * 1.2;             // bright core
    density += shapedRays;                              // light rays/beams
    density += shapedSmoke * (lightWash * 0.8 + 0.2);  // smoke modulated by light
    density += lightCore * smoke * vertBand * 0.8;      // smoke near light source

    // ── MOUSE — very subtle ripple (like xAI) ────────────────────
    vec2 mPos = uMouse;
    if (mPos.x > 0.0) {
      float mDist = length((uv - mPos) * vec2(aspect, 1.0));
      // Gentle displacement of fog — NOT a dark hole
      float mouseInfluence = smoothstep(0.15, 0.0, mDist) * 0.12;
      // Shift the density slightly based on noise near mouse
      float mouseNoise = snoise(vec3(
        uv.x * 4.0 + time * 0.1,
        uv.y * 4.0,
        time * 0.5
      ));
      density += mouseInfluence * mouseNoise * density;
    }

    // ── EDGE FADE ─────────────────────────────────────────────────
    float edgeFade = 1.0;
    edgeFade *= smoothstep(0.0, 0.12, uv.y);   // top
    edgeFade *= smoothstep(1.0, 0.88, uv.y);   // bottom
    edgeFade *= smoothstep(1.0, 0.8, uv.x);    // right
    density *= edgeFade;

    // Clamp and tone-map
    density = max(density, 0.0);
    density = 1.0 - exp(-density * 2.5); // filmic tonemap

    // ── COLOR RAMP — emerald green with silver/white highlights ───
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

    // Silver/white highlights near light core
    float coreBright = exp(-lightDist * 5.0) * density;
    vec3 silver = vec3(0.65, 0.72, 0.68);
    color = mix(color, silver, smoothstep(0.3, 0.7, coreBright) * 0.35);

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const mouseRef = useRef({ x: -1, y: -1 });
  const smoothMouse = useRef({ x: -1, y: -1 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(-1, -1) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;

    // Smooth mouse with gentle lerp
    const lerpFactor = 0.03;
    smoothMouse.current.x +=
      (mouseRef.current.x - smoothMouse.current.x) * lerpFactor;
    smoothMouse.current.y +=
      (mouseRef.current.y - smoothMouse.current.y) * lerpFactor;

    uniforms.uMouse.value.set(
      smoothMouse.current.x,
      1.0 - smoothMouse.current.y
    );
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroShader({ className }: { className?: string }) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(!isMobileDevice() && !prefersReducedMotion());
  }, []);

  if (!shouldRender) {
    return (
      <div className={className} aria-hidden="true">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[25%] -left-[10%] w-[500px] h-[400px] bg-[#0F7A5A]/[0.15] rounded-full blur-[160px]" />
          <div className="absolute top-[35%] left-[5%] w-[300px] h-[300px] bg-[#1FBF8F]/[0.08] rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,transparent_15%,#030504_65%)]" />
        </div>
      </div>
    );
  }

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 1] }}
        style={{ background: "#030504" }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
