import * as THREE from 'three';

interface SurgeArresterProps {
  position: [number, number, number];
  id: string;
  onClick: (id: string) => void;
}

export default function SurgeArrester({ position, id, onClick }: SurgeArresterProps) {
  return (
    <group
      position={position}
      onClick={(e) => { e.stopPropagation(); onClick(id); }}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'default'; }}
    >
      {/* Base */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.3]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Stacked insulator discs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, 0.3 + i * 0.15, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.1, 12]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#1a1a1a' : '#111'} metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* Top cap */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.1, 12]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
      </mesh>

      {/* Ground wire */}
      <mesh position={[0.15, 0.5, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 1, 4]} />
        <meshStandardMaterial color="#333" roughness={0.9} />
      </mesh>
    </group>
  );
}
