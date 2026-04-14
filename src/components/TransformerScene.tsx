import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function EnergyRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed;
      ref.current.rotation.x = Math.PI / 2;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.015, 8, 64]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.6} />
    </mesh>
  );
}

function ParticleField() {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = Math.random() * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#22c55e" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function TransformerModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Main transformer body */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[2.2, 2.4, 1.5]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* Body edge glow lines */}
      <mesh position={[0, 1.2, 0.76]}>
        <planeGeometry args={[2.2, 2.4]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.1} transparent opacity={0.05} />
      </mesh>

      {/* Cooling fins - left */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`fin-l-${i}`} position={[-1.2, 0.2 + i * 0.28, 0]}>
          <boxGeometry args={[0.12, 0.18, 1.2]} />
          <meshStandardMaterial color="#111" metalness={0.85} roughness={0.3} />
        </mesh>
      ))}

      {/* Cooling fins - right */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`fin-r-${i}`} position={[1.2, 0.2 + i * 0.28, 0]}>
          <boxGeometry args={[0.12, 0.18, 1.2]} />
          <meshStandardMaterial color="#111" metalness={0.85} roughness={0.3} />
        </mesh>
      ))}

      {/* HV Bushings */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <group key={`bushing-${i}`} position={[x, 2.8, 0]}>
          <mesh>
            <cylinderGeometry args={[0.06, 0.1, 1.4, 12]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Insulator rings */}
          {[0, 0.2, 0.4, 0.6].map((y, j) => (
            <mesh key={j} position={[0, -0.4 + y, 0]}>
              <cylinderGeometry args={[0.14, 0.14, 0.04, 16]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
            </mesh>
          ))}
          {/* Top connector - glowing green */}
          <Float speed={2} floatIntensity={0.3}>
            <mesh position={[0, 0.75, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color="#22c55e"
                emissive="#22c55e"
                emissiveIntensity={2}
              />
            </mesh>
          </Float>
          {/* Energy beam from top */}
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.8, 4]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={3} transparent opacity={0.4} />
          </mesh>
        </group>
      ))}

      {/* Base */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[2.8, 0.3, 2]} />
        <meshStandardMaterial color="#080808" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Base green edge line */}
      <mesh position={[0, -0.01, 0]}>
        <boxGeometry args={[2.82, 0.02, 2.02]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1} transparent opacity={0.4} />
      </mesh>

      {/* Control panel */}
      <mesh position={[0, 1, 0.76]}>
        <boxGeometry args={[0.9, 0.7, 0.02]} />
        <meshStandardMaterial color="#050505" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Panel border glow */}
      <mesh position={[0, 1, 0.77]}>
        <boxGeometry args={[0.92, 0.72, 0.005]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} transparent opacity={0.15} />
      </mesh>

      {/* Status LED indicators */}
      {[-0.25, -0.08, 0.08, 0.25].map((x, i) => (
        <mesh key={`led-${i}`} position={[x, 1.2, 0.78]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial
            color={i === 3 ? "#eab308" : "#22c55e"}
            emissive={i === 3 ? "#eab308" : "#22c55e"}
            emissiveIntensity={2}
          />
        </mesh>
      ))}

      {/* Screen display on panel */}
      <mesh position={[0, 0.85, 0.775]}>
        <planeGeometry args={[0.6, 0.25]} />
        <meshStandardMaterial color="#0a1a0a" emissive="#22c55e" emissiveIntensity={0.08} />
      </mesh>

      {/* Cables */}
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={`cable-${i}`} position={[x, 2.6, -0.5]}>
          <cylinderGeometry args={[0.02, 0.02, 1.5, 6]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </mesh>
      ))}

      {/* Energy rings around transformer */}
      <group position={[0, 1.2, 0]}>
        <EnergyRing radius={1.8} speed={0.3} color="#22c55e" />
        <EnergyRing radius={2.2} speed={-0.2} color="#16a34a" />
        <EnergyRing radius={2.6} speed={0.15} color="#15803d" />
      </group>
    </group>
  );
}

function GridFloor() {
  return (
    <gridHelper
      args={[20, 30, '#22c55e', '#0a1a0a']}
      position={[0, -0.65, 0]}
    />
  );
}

export default function TransformerScene() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [4.5, 3.5, 4.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'hsl(0, 0%, 3%)' }}
      >
        <fog attach="fog" args={['#000', 8, 20]} />
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 8, 5]} intensity={0.5} color="#ffffff" />
        <pointLight position={[-3, 4, -2]} intensity={0.6} color="#22c55e" distance={12} />
        <pointLight position={[3, 2, 3]} intensity={0.3} color="#22c55e" distance={10} />
        <spotLight position={[0, 8, 0]} intensity={0.4} angle={0.3} penumbra={1} color="#22c55e" />

        <TransformerModel />
        <ParticleField />
        <GridFloor />
        <ContactShadows
          position={[0, -0.64, 0]}
          opacity={0.3}
          scale={10}
          blur={2.5}
          color="#000"
        />
        <Environment preset="night" />
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Overlay label */}
      <div className="absolute top-4 left-4 panel-glow px-4 py-3">
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Digital Twin • Live</p>
        <p className="text-sm font-display font-bold text-primary tracking-wider">UHV TRANSFORMER UNIT-01</p>
      </div>

      {/* Stats overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-3">
        {[
          { label: 'Status', value: 'ONLINE', color: 'text-primary' },
          { label: 'Uptime', value: '99.97%', color: 'text-primary' },
          { label: 'Health', value: 'OPTIMAL', color: 'text-primary' },
        ].map((s) => (
          <div key={s.label} className="panel-glow px-3 py-2 flex-1">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{s.label}</p>
            <p className={`text-xs font-mono font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
