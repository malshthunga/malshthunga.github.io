"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 220;
const CONNECT_DISTANCE = 1.6;
const RADIUS = 3.4;

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

function buildConnections(positions: THREE.Vector3[]) {
  const segments: number[] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const d = positions[i].distanceTo(positions[j]);
      if (d < CONNECT_DISTANCE) {
        segments.push(
          positions[i].x, positions[i].y, positions[i].z,
          positions[j].x, positions[j].y, positions[j].z
        );
      }
    }
  }
  return new Float32Array(segments);
}

function NeuralMesh() {
  const group = useRef<THREE.Group>(null);
  const positions = useNodePositions();
  const linePositions = useMemo(() => buildConnections(positions), [positions]);

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
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [linePositions]);

  const { mouse } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.08;
    // gentle parallax toward the pointer
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * 0.15, 0.03);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -mouse.x * 0.08, 0.03);
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#6e5af0" transparent opacity={0.3} />
      </lineSegments>
      <points geometry={pointsGeometry}>
        <pointsMaterial color="#00e5c7" size={0.05} sizeAttenuation transparent opacity={0.8} />
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
