"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 220;
const CONNECT_DISTANCE = 1.6;
const RADIUS = 3.4;
const PULSE_COUNT = 50;

/** Generates points roughly distributed across a lopsided sphere, so the
 *  mesh reads as organic (brain-like) rather than a perfect geometric form. */
function useNodePositions() {
  return useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = RADIUS * (0.65 + Math.random() * 0.35);
      const x = r * Math.sin(phi) * Math.cos(theta) * 1.15;
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.85;
      const z = r * Math.cos(phi) * 0.9;
      positions.push(new THREE.Vector3(x, y, z));
    }
    return positions;
  }, []);
}

/** Returns actual edge pairs (not just a flat position array) so pulses
 *  can travel between two known endpoints. */
function useEdges(positions: THREE.Vector3[]) {
  return useMemo(() => {
    const edges: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < CONNECT_DISTANCE) {
          edges.push([positions[i], positions[j]]);
        }
      }
    }
    return edges;
  }, [positions]);
}

/** Soft radial-gradient sprite, generated on a canvas — this is what turns
 *  a flat dot into a glowing point when combined with additive blending. */
function useGlowTexture(color: string) {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.25, color);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, [color]);
}

function NeuralMesh() {
  const group = useRef<THREE.Group>(null);
  const positions = useNodePositions();
  const edges = useEdges(positions);

  const glowTexture = useGlowTexture("rgba(0,229,199,0.85)");
  const pulseTexture = useGlowTexture("rgba(255,255,255,0.9)");

  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(positions.length * 3);
    positions.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [positions]);

  const lineGeometry = useMemo(() => {
    const segments: number[] = [];
    edges.forEach(([a, b]) => segments.push(a.x, a.y, a.z, b.x, b.y, b.z));
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(segments), 3));
    return geo;
  }, [edges]);

  // pulses: bright points that travel along a random edge, then reassign
  const pulses = useMemo(
    () =>
      Array.from({ length: PULSE_COUNT }, () => ({
        edge: edges[Math.floor(Math.random() * edges.length)],
        t: Math.random(),
        speed: 0.15 + Math.random() * 0.3,
      })),
    [edges]
  );

  const pulseGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pulses.length * 3), 3));
    return geo;
  }, [pulses]);

  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.08;
    // snappier lerp (0.05 vs original 0.03) — reads more "responsive HUD",
    // less "slow ambient drift"
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * 0.18, 0.05);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -mouse.x * 0.1, 0.05);

    const posAttr = pulseGeometry.attributes.position as THREE.BufferAttribute;
    pulses.forEach((pulse, i) => {
      pulse.t += delta * pulse.speed;
      if (pulse.t > 1) {
        pulse.t = 0;
        pulse.edge = edges[Math.floor(Math.random() * edges.length)];
      }
      const [a, b] = pulse.edge;
      posAttr.setXYZ(
        i,
        THREE.MathUtils.lerp(a.x, b.x, pulse.t),
        THREE.MathUtils.lerp(a.y, b.y, pulse.t),
        THREE.MathUtils.lerp(a.z, b.z, pulse.t)
      );
    });
    posAttr.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#5b6bff" transparent opacity={0.22} />
      </lineSegments>

      <points geometry={pointsGeometry}>
        <pointsMaterial
          map={glowTexture}
          color="#00f0d8"
          size={0.16}
          sizeAttenuation
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <points geometry={pulseGeometry}>
        <pointsMaterial
          map={pulseTexture}
          color="#ffffff"
          size={0.22}
          sizeAttenuation
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [1.5, 0, 8.5], fov: 42 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.75]}>
        <ambientLight intensity={0.6} />
        <NeuralMesh />
      </Canvas>
    </div>
  );
}