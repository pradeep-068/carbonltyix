import { useEffect, useRef, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import PageTitle from '@/components/PageTitle';
import TransformerScene from '@/components/TransformerScene';
import { motion } from 'framer-motion';
import { Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DigitalTwin = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [immersive, setImmersive] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  };

  const Controls = (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => setImmersive((v) => !v)}
        className="h-8 gap-1.5 font-mono text-[10px] uppercase tracking-wider"
      >
        {immersive ? <PanelLeftOpen className="h-3.5 w-3.5" /> : <PanelLeftClose className="h-3.5 w-3.5" />}
        {immersive ? 'Show UI' : 'Immersive'}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={toggleFullscreen}
        className="h-8 gap-1.5 font-mono text-[10px] uppercase tracking-wider"
      >
        {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </Button>
    </div>
  );

  const SceneBlock = (
    <div
      ref={containerRef}
      className={
        immersive || isFullscreen
          ? 'fixed inset-0 z-50 bg-background'
          : 'h-[calc(100vh-260px)] rounded-lg overflow-hidden border border-border relative'
      }
    >
      <TransformerScene />
      {(immersive || isFullscreen) && (
        <div className="absolute top-4 right-4 z-10">{Controls}</div>
      )}
      {(immersive || isFullscreen) && (
        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center text-[10px] font-mono text-muted-foreground tracking-wider z-10">
          Drag to orbit • Scroll to zoom • Right-click to pan
        </p>
      )}
    </div>
  );

  if (immersive || isFullscreen) {
    return SceneBlock;
  }

  return (
    <DashboardLayout title="Digital Twin" subtitle="">
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <PageTitle first="DIGITAL" highlight="TWIN" subtitle="3D virtual replica of UHV substation — click equipment to inspect" />
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />Operational</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-yellow-500" />Maintenance</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" />Fault</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-muted-foreground" />Offline</span>
            </div>
            {Controls}
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="panel-glow flex items-center gap-6 px-4 py-2.5 flex-wrap"
        >
          <div className="text-xs font-mono"><span className="text-muted-foreground">Grid Voltage: </span><span className="text-primary font-bold">1000.0 kV</span></div>
          <div className="text-xs font-mono"><span className="text-muted-foreground">Frequency: </span><span className="text-primary font-bold">50.00 Hz</span></div>
          <div className="text-xs font-mono"><span className="text-muted-foreground">System Efficiency: </span><span className="text-primary font-bold">98.2%</span></div>
          <div className="text-xs font-mono"><span className="text-muted-foreground">Renewable Share: </span><span className="text-primary font-bold">35%</span></div>
          <div className="text-xs font-mono"><span className="text-muted-foreground">Active Sensors: </span><span className="text-primary font-bold">247</span></div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary pulse-glow" />
            <span className="text-[10px] font-mono text-primary uppercase tracking-wider">LIVE</span>
          </div>
        </motion.div>

        {/* 3D Scene */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {SceneBlock}
        </motion.div>

        <p className="text-center text-[10px] font-mono text-muted-foreground tracking-wider">
          Drag to orbit • Scroll to zoom • Right-click to pan
        </p>
      </div>
    </DashboardLayout>
  );
};

export default DigitalTwin;
