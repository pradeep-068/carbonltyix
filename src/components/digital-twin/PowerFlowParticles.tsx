import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface PowerFlowParticlesProps {
  paths: Array<{ start: [number, number, number]; end: [number, number, number] }>;
  count?: number;
}

export default function PowerFlowParticles({ paths, count = 60 }: PowerFlowParticlesProps) {
  const ref = useRef<THREE.Points>(null);

  const { positions, velocities, pathIndices } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    const idx = new Uint8Array(count);
    for (let i = 0; i < count; i++) {
      const pi = Math.floor(Math.random() * paths.length);
      idx[i] = pi;
      vel[i] = 0.3 + Math.random() * 0.7;
      const t = Math.random();
      const p = paths[pi];
      pos[i * 3] = p.start[0] + (p.end[0] - p.start[0]) * t;
      pos[i * 3 + 1] = p.start[1] + (p.end[1] - p.start[1]) * t;
      pos[i * 3 + 2] = p.start[2] + (p.end[2] - p.start[2]) * t;
    }
    return { positions: pos, velocities: vel, pathIndices: idx };
  }, [paths, count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const pi = pathIndices[i];
      const p = paths[pi];
      const dx = p.end[0] - p.start[0];
      const dy = p.end[1] - p.start[1];
      const dz = p.end[2] - p.start[2];
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const speed = velocities[i] * delta;

      arr[i * 3] += (dx / len) * speed;
      arr[i * 3 + 1] += (dy / len) * speed;
      arr[i * 3 + 2] += (dz / len) * speed;

      // Check if past end, reset to start
      const tx = (arr[i * 3] - p.start[0]) / (dx || 0.001);
      if (tx > 1 || tx < 0) {
        arr[i * 3] = p.start[0];
        arr[i * 3 + 1] = p.start[1];
        arr[i * 3 + 2] = p.start[2];
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#22c55e" transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}
