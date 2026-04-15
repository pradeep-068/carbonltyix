import { useRef } from 'react';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface TransformerUnitProps {
  position: [number, number, number];
  id: string;
  status: 'operational' | 'maintenance' | 'fault' | 'offline';
  onClick: (id: string) => void;
}

const STATUS_COLORS: Record<string, string> = {
  operational: '#22c55e',
  maintenance: '#eab308',
  fault: '#ef4444',
  offline: '#6b7280',
};

export default function TransformerUnit({ position, id, status, onClick }: TransformerUnitProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowColor = STATUS_COLORS[status];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1 + position[0]) * 0.03;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => { e.stopPropagation(); onClick(id); }}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'default'; }}
    >
      {/* Main body */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1.6, 1.8, 1.1]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Status glow strip */}
      <mesh position={[0, 1, 0.56]}>
        <boxGeometry args={[1.6, 0.04, 0.01]} />
        <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={2} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.1, 0.56]}>
        <boxGeometry args={[1.6, 0.04, 0.01]} />
        <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={2} transparent opacity={0.8} />
      </mesh>

      {/* Cooling fins */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`fin-l-${i}`} position={[-0.9, 0.2 + i * 0.28, 0]}>
          <boxGeometry args={[0.1, 0.16, 0.9]} />
          <meshStandardMaterial color="#111" metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`fin-r-${i}`} position={[0.9, 0.2 + i * 0.28, 0]}>
          <boxGeometry args={[0.1, 0.16, 0.9]} />
          <meshStandardMaterial color="#111" metalness={0.85} roughness={0.3} />
        </mesh>
      ))}

      {/* HV Bushings */}
      {[-0.4, 0, 0.4].map((x, i) => (
        <group key={`bushing-${i}`} position={[x, 2.2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.04, 0.08, 1, 12]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
          </mesh>
          {[0, 0.18, 0.36].map((y, j) => (
            <mesh key={j} position={[0, -0.3 + y, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
            </mesh>
          ))}
          <Float speed={2} floatIntensity={0.2}>
            <mesh position={[0, 0.55, 0]}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={2} />
            </mesh>
          </Float>
        </group>
      ))}

      {/* Base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[2, 0.2, 1.5]} />
        <meshStandardMaterial color="#080808" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[2.02, 0.015, 1.52]} />
        <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={1} transparent opacity={0.3} />
      </mesh>

      {/* Control panel */}
      <mesh position={[0, 0.8, 0.56]}>
        <boxGeometry args={[0.6, 0.5, 0.015]} />
        <meshStandardMaterial color="#050505" metalness={0.5} roughness={0.5} />
      </mesh>
      {[-0.15, -0.05, 0.05, 0.15].map((x, i) => (
        <mesh key={`led-${i}`} position={[x, 0.95, 0.575]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshStandardMaterial
            color={status === 'fault' && i > 1 ? '#ef4444' : glowColor}
            emissive={status === 'fault' && i > 1 ? '#ef4444' : glowColor}
            emissiveIntensity={2}
          />
        </mesh>
      ))}

      {/* ID label plane */}
      <mesh position={[0, 1.95, 0.57]}>
        <planeGeometry args={[0.5, 0.12]} />
        <meshStandardMaterial color="#000" emissive={glowColor} emissiveIntensity={0.05} />
      </mesh>
    </group>
  );
}
