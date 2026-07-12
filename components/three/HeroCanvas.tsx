"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

/**
 * "Momentum field" — GPU particle streams flowing left-to-right in curved
 * light-trail lanes. All particle motion is computed in the vertex shader
 * from a per-particle seed + time, so the CPU cost per frame is one uniform
 * update regardless of particle count.
 */

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;

  attribute float aSeed;
  attribute float aSpeed;
  attribute float aLane;
  attribute float aAmp;
  attribute float aPhase;
  attribute float aSize;
  attribute float aDepth;
  attribute float aHue;

  varying float vAlpha;
  varying vec3 vColor;

  const vec3 LIME = vec3(0.804, 0.949, 0.0);   // #cdf200
  const vec3 PINE = vec3(0.608, 0.816, 0.8);   // #9bd0cc
  const vec3 PURPLE = vec3(0.871, 0.718, 1.0); // #deb7ff

  void main() {
    float W = 26.0;

    // Progress along the stream, wrapping seamlessly.
    float prog = fract(aSeed + uTime * aSpeed);
    float x = prog * W - W * 0.5;

    // Curved stream: two stacked sine harmonics per lane.
    float y = aLane
      + sin(x * 0.32 + aPhase) * aAmp
      + sin(x * 0.11 + aPhase * 2.7) * aAmp * 0.6;
    float z = aDepth;

    // Field bends away from the pointer with a smooth falloff.
    vec2 toP = vec2(x, y) - uMouse;
    float dist = length(toP);
    float influence = smoothstep(3.5, 0.0, dist);
    vec2 push = toP / max(dist, 0.0001) * influence;
    x += push.x * 0.6;
    y += push.y * 1.1;

    vec4 mv = modelViewMatrix * vec4(x, y, z, 1.0);
    gl_Position = projectionMatrix * mv;

    // Fade heads/tails so streams dissolve at the frame edges.
    float fade = smoothstep(0.0, 0.12, prog) * (1.0 - smoothstep(0.82, 1.0, prog));
    vAlpha = fade * (0.35 + 0.65 * smoothstep(-4.0, 1.5, z));

    gl_PointSize = aSize * uPixelRatio * (14.0 / -mv.z);

    vColor = aHue < 0.72
      ? mix(LIME, PINE, aHue / 0.72)
      : mix(PINE, PURPLE, (aHue - 0.72) / 0.28);
  }
`;

const FRAGMENT = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float core = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(vColor, core * vAlpha * 0.55);
  }
`;

// Deterministic PRNG: pure for a given seed, keeps the field stable between
// mounts and keeps render-path code side-effect free.
function mulberry32(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ParticleField({ count }: { count: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const mouseTarget = useRef(new THREE.Vector2(999, 999));
  const { viewport } = useThree();

  const attrs = useMemo(() => {
    const rand = mulberry32(0x60d15);
    const position = new Float32Array(count * 3); // consumed as draw range only
    const seed = new Float32Array(count);
    const speed = new Float32Array(count);
    const lane = new Float32Array(count);
    const amp = new Float32Array(count);
    const phase = new Float32Array(count);
    const pSize = new Float32Array(count);
    const depth = new Float32Array(count);
    const hue = new Float32Array(count);

    const LANES = 14;
    for (let i = 0; i < count; i++) {
      const laneIdx = i % LANES;
      seed[i] = rand();
      speed[i] = 0.016 + rand() * 0.03;
      lane[i] = (laneIdx / (LANES - 1) - 0.5) * 11 + (rand() - 0.5) * 0.5;
      amp[i] = 0.5 + rand() * 1.4;
      phase[i] = laneIdx * 1.7 + rand() * 0.6;
      pSize[i] = 1.4 + rand() * 2.6;
      depth[i] = -4 + rand() * 5.5;
      hue[i] = rand();
    }
    return { position, seed, speed, lane, amp, phase, pSize, depth, hue };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uPixelRatio: { value: 1 },
    }),
    []
  );

  useFrame((state, delta) => {
    const mat = material.current;
    if (!mat) return;
    mat.uniforms.uTime.value += Math.min(delta, 0.05);
    mat.uniforms.uPixelRatio.value = state.gl.getPixelRatio();

    // Pointer in world units on the z=0 plane, damped for a fluid feel.
    const p = state.pointer;
    if (p.x !== 0 || p.y !== 0) {
      mouseTarget.current.set(
        (p.x * viewport.width) / 2,
        (p.y * viewport.height) / 2
      );
    }
    const m = mat.uniforms.uMouse.value as THREE.Vector2;
    m.lerp(mouseTarget.current, 1 - Math.pow(0.001, delta));
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[attrs.position, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[attrs.seed, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[attrs.speed, 1]} />
        <bufferAttribute attach="attributes-aLane" args={[attrs.lane, 1]} />
        <bufferAttribute attach="attributes-aAmp" args={[attrs.amp, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[attrs.phase, 1]} />
        <bufferAttribute attach="attributes-aSize" args={[attrs.pSize, 1]} />
        <bufferAttribute attach="attributes-aDepth" args={[attrs.depth, 1]} />
        <bufferAttribute attach="attributes-aHue" args={[attrs.hue, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroCanvas({ active }: { active: boolean }) {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;
  const count = isMobile ? 1600 : 6000;

  return (
    <Canvas
      className="hero-canvas-fade-in"
      dpr={isMobile ? [1, 1.25] : [1, 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 10], fov: 50 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <group rotation={[-0.08, 0, -0.05]}>
        <ParticleField count={count} />
      </group>
    </Canvas>
  );
}
