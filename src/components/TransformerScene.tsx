import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useState, useMemo } from 'react';
import TransformerUnit from './digital-twin/TransformerUnit';
import CircuitBreaker from './digital-twin/CircuitBreaker';
import SurgeArrester from './digital-twin/SurgeArrester';
import Busbar from './digital-twin/Busbar';
import CapacitorBank from './digital-twin/CapacitorBank';
import PowerFlowParticles from './digital-twin/PowerFlowParticles';
import InspectPanel from './digital-twin/InspectPanel';

function GridFloor() {
  return (
    <gridHelper args={[30, 40, '#22c55e', '#0a1a0a']} position={[0, -0.15, 0]} />
  );
}

function AmbientParticles() {
  const positions = useMemo(() => {
    const pos = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#22c55e" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

export default function TransformerScene() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (id: string) => setSelected(id);
  const handleClose = () => setSelected(null);

  const powerPaths = useMemo(() => [
    // Main busbar flow (top horizontal)
    { start: [-6, 3.2, 0] as [number, number, number], end: [6, 3.2, 0] as [number, number, number] },
    // Down to transformers
    { start: [-4, 3.2, 0] as [number, number, number], end: [-4, 2.5, 0] as [number, number, number] },
    { start: [0, 3.2, 0] as [number, number, number], end: [0, 2.5, 0] as [number, number, number] },
    { start: [4, 3.2, 0] as [number, number, number], end: [4, 2.5, 0] as [number, number, number] },
    // Lower busbar
    { start: [-6, 0, 0] as [number, number, number], end: [6, 0, 0] as [number, number, number] },
  ], []);

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [10, 7, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'hsl(0, 0%, 3%)' }}
      >
        <fog attach="fog" args={['#000', 12, 30]} />
        <ambientLight intensity={0.15} />
        <directionalLight position={[8, 12, 8]} intensity={0.5} color="#ffffff" />
        <pointLight position={[-5, 5, -3]} intensity={0.6} color="#22c55e" distance={15} />
        <pointLight position={[5, 3, 5]} intensity={0.3} color="#22c55e" distance={12} />
        <spotLight position={[0, 10, 0]} intensity={0.4} angle={0.4} penumbra={1} color="#22c55e" />

        {/* === TRANSFORMERS === */}
        <TransformerUnit position={[-4, 0, 0]} id="TR-01" status="operational" onClick={handleClick} />
        <TransformerUnit position={[0, 0, 0]} id="TR-02" status="operational" onClick={handleClick} />
        <TransformerUnit position={[4, 0, 0]} id="TR-03" status="maintenance" onClick={handleClick} />

        {/* === CIRCUIT BREAKERS === */}
        <CircuitBreaker position={[-4, 0, 2]} id="CB-01" closed={true} onClick={handleClick} />
        <CircuitBreaker position={[0, 0, 2]} id="CB-02" closed={true} onClick={handleClick} />
        <CircuitBreaker position={[4, 0, 2]} id="CB-03" closed={false} onClick={handleClick} />

        {/* === SURGE ARRESTERS === */}
        <SurgeArrester position={[-6, 0, 0]} id="SA-01" onClick={handleClick} />
        <SurgeArrester position={[6, 0, 0]} id="SA-02" onClick={handleClick} />

        {/* === CAPACITOR BANK === */}
        <CapacitorBank position={[-2, 0, -2.5]} id="CAP-01" onClick={handleClick} />

        {/* === BUSBARS === */}
        {/* Upper main busbar */}
        <Busbar start={[-7, 3.2, 0]} end={[7, 3.2, 0]} energized />
        {/* Vertical drops to transformers */}
        <Busbar start={[-4, 3.2, 0]} end={[-4, 2.5, 0]} energized />
        <Busbar start={[0, 3.2, 0]} end={[0, 2.5, 0]} energized />
        <Busbar start={[4, 3.2, 0]} end={[4, 2.5, 0]} energized={false} />
        {/* Lower busbar */}
        <Busbar start={[-7, 0, 2]} end={[7, 0, 2]} energized />
        {/* Connections CB to lower busbar */}
        <Busbar start={[-4, 0, 0]} end={[-4, 0, 2]} energized />
        <Busbar start={[0, 0, 0]} end={[0, 0, 2]} energized />
        <Busbar start={[4, 0, 0]} end={[4, 0, 2]} energized={false} />

        {/* === POWER FLOW PARTICLES === */}
        <PowerFlowParticles paths={powerPaths} count={80} />

        <AmbientParticles />
        <GridFloor />
        <ContactShadows position={[0, -0.14, 0]} opacity={0.3} scale={20} blur={2.5} color="#000" />
        <Environment preset="night" />
        <OrbitControls
          enablePan
          minDistance={4}
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>

      {/* Overlay label */}
      <div className="absolute top-4 left-4 panel-glow px-4 py-3">
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Digital Twin • Live Substation</p>
        <p className="text-sm font-display font-bold text-primary tracking-wider">UHV SUBSTATION 1000kV</p>
        <p className="text-[9px] font-mono text-muted-foreground mt-1">3 Transformers • 3 Breakers • 2 Arresters • 1 Cap Bank</p>
      </div>

      {/* Inspect panel */}
      <InspectPanel selectedId={selected} onClose={handleClose} />

      {/* Bottom stats */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-3">
        {[
          { label: 'TR-01', value: 'ONLINE', color: 'text-primary' },
          { label: 'TR-02', value: 'ONLINE', color: 'text-primary' },
          { label: 'TR-03', value: 'MAINT', color: 'text-yellow-500' },
          { label: 'Grid', value: '1000 kV', color: 'text-primary' },
          { label: 'Load', value: '3,200 MW', color: 'text-primary' },
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
