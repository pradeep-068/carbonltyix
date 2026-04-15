interface CapacitorBankProps {
  position: [number, number, number];
  id: string;
  onClick: (id: string) => void;
}

export default function CapacitorBank({ position, id, onClick }: CapacitorBankProps) {
  return (
    <group
      position={position}
      onClick={(e) => { e.stopPropagation(); onClick(id); }}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'default'; }}
    >
      {/* Base frame */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.8, 0.15, 0.5]} />
        <meshStandardMaterial color="#080808" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Capacitor cans */}
      {[-0.25, 0, 0.25].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 0.55, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.7, 12]} />
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Top terminal */}
          <mesh position={[x, 0.95, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1.5} />
          </mesh>
        </group>
      ))}

      {/* Connecting bar */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[0.6, 0.02, 0.02]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}
