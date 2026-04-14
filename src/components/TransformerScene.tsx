import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function TransformerModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Main transformer body */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[2.2, 2.4, 1.5]} />
        <meshStandardMaterial color="#1a2a3a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Cooling fins - left */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`fin-l-${i}`} position={[-1.2, 0.4 + i * 0.35, 0]}>
          <boxGeometry args={[0.15, 0.25, 1.2]} />
          <meshStandardMaterial color="#2a3a4a" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}

      {/* Cooling fins - right */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`fin-r-${i}`} position={[1.2, 0.4 + i * 0.35, 0]}>
          <boxGeometry args={[0.15, 0.25, 1.2]} />
          <meshStandardMaterial color="#2a3a4a" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}

      {/* HV Bushings */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <group key={`bushing-${i}`} position={[x, 2.8, 0]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.12, 1.2, 8]} />
            <meshStandardMaterial color="#4a2a1a" metalness={0.3} roughness={0.6} />
          </mesh>
          {/* Insulator rings */}
          {[0, 0.25, 0.5].map((y, j) => (
            <mesh key={j} position={[0, -0.3 + y, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.05, 12]} />
              <meshStandardMaterial color="#5a3a2a" metalness={0.2} roughness={0.7} />
            </mesh>
          ))}
          {/* Top connector - glowing */}
          <mesh position={[0, 0.65, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color="#06d6a0"
              emissive="#06d6a0"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      ))}

      {/* Base */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[2.8, 0.3, 2]} />
        <meshStandardMaterial color="#1a2530" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Control panel on front */}
      <mesh position={[0, 1, 0.76]}>
        <boxGeometry args={[0.8, 0.6, 0.02]} />
        <meshStandardMaterial color="#0a1520" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Status LED indicators */}
      {[-0.2, 0, 0.2].map((x, i) => (
        <mesh key={`led-${i}`} position={[x, 1.15, 0.78]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color={i === 2 ? "#f59e0b" : "#06d6a0"}
            emissive={i === 2 ? "#f59e0b" : "#06d6a0"}
            emissiveIntensity={1}
          />
        </mesh>
      ))}

      {/* Cables */}
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={`cable-${i}`} position={[x, 2.6, -0.5]}>
          <cylinderGeometry args={[0.02, 0.02, 1.5, 6]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function GridFloor() {
  return (
    <gridHelper
      args={[20, 20, '#06b6d4', '#0a2a3a']}
      position={[0, -0.65, 0]}
    />
  );
}

export default function TransformerScene() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [4, 3, 4], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 5]} intensity={0.8} color="#e0f0ff" />
        <pointLight position={[-3, 4, -2]} intensity={0.4} color="#06b6d4" />
        <pointLight position={[3, 2, 3]} intensity={0.3} color="#06d6a0" />

        <TransformerModel />
        <GridFloor />
        <ContactShadows
          position={[0, -0.64, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          color="#000"
        />
        <Environment preset="night" />
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Overlay label */}
      <div className="absolute top-4 left-4 panel-glow px-3 py-2">
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Digital Twin</p>
        <p className="text-sm font-semibold text-primary">UHV Transformer Unit-01</p>
      </div>
    </div>
  );
}
