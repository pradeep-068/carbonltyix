import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CircuitBreakerProps {
  position: [number, number, number];
  id: string;
  closed: boolean;
  onClick: (id: string) => void;
}

export default function CircuitBreaker({ position, id, closed, onClick }: CircuitBreakerProps) {
  const armRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (armRef.current) {
      const target = closed ? 0 : Math.PI / 4;
      armRef.current.rotation.z += (target - armRef.current.rotation.z) * 0.05;
    }
  });

  const color = closed ? '#22c55e' : '#ef4444';

  return (
    <group
      position={position}
      onClick={(e) => { e.stopPropagation(); onClick(id); }}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'default'; }}
    >
      {/* Base pedestal */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.4, 0.3, 0.4]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Support columns */}
      <mesh position={[-0.12, 0.6, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0.12, 0.6, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Moving arm */}
      <mesh ref={armRef} position={[0, 0.95, 0]}>
        <boxGeometry args={[0.3, 0.04, 0.04]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>

      {/* Status indicator */}
      <mesh position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>

      {/* Insulator discs */}
      {[0.4, 0.55, 0.7].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.025, 12]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}
