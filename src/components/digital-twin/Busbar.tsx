import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface BusbarProps {
  start: [number, number, number];
  end: [number, number, number];
  energized?: boolean;
}

export default function Busbar({ start, end, energized = true }: BusbarProps) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const dz = end[2] - start[2];
  const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const midX = (start[0] + end[0]) / 2;
  const midY = (start[1] + end[1]) / 2;
  const midZ = (start[2] + end[2]) / 2;

  const rotation = useMemo(() => {
    const dir = new THREE.Vector3(dx, dy, dz).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(up, dir);
    const euler = new THREE.Euler().setFromQuaternion(quat);
    return [euler.x, euler.y, euler.z] as [number, number, number];
  }, [dx, dy, dz]);

  return (
    <group>
      {/* Main conductor */}
      <mesh position={[midX, midY, midZ]} rotation={rotation}>
        <cylinderGeometry args={[0.025, 0.025, length, 8]} />
        <meshStandardMaterial
          color={energized ? '#22c55e' : '#333'}
          emissive={energized ? '#22c55e' : '#000'}
          emissiveIntensity={energized ? 0.4 : 0}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}
