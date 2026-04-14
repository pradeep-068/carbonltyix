import { useEffect, useRef } from 'react';

export default function GridNetworkViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    let animFrame: number;
    let t = 0;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.08)';
      ctx.lineWidth = 0.5;
      const gridSize = 30;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Central hub
      const cx = w / 2;
      const cy = h / 2;

      // Rotating rings
      for (let r = 0; r < 3; r++) {
        const radius = 40 + r * 25;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 197, 94, ${0.15 - r * 0.04})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Dots on ring
        for (let i = 0; i < 4 + r * 2; i++) {
          const angle = (i / (4 + r * 2)) * Math.PI * 2 + t * (0.5 - r * 0.15);
          const dx = cx + Math.cos(angle) * radius;
          const dy = cy + Math.sin(angle) * radius;
          ctx.beginPath();
          ctx.arc(dx, dy, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(34, 197, 94, 0.7)';
          ctx.fill();
        }
      }

      // Central icon (globe-like)
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Cross lines through center
      ctx.beginPath();
      ctx.moveTo(cx - 18, cy);
      ctx.lineTo(cx + 18, cy);
      ctx.moveTo(cx, cy - 18);
      ctx.lineTo(cx, cy + 18);
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Ellipse
      ctx.beginPath();
      ctx.ellipse(cx, cy, 18, 10, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
      ctx.stroke();

      t += 0.01;
      animFrame = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="panel h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Grid Network</span>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-primary pulse-glow" />
          <span className="text-[10px] font-mono text-primary">3D View</span>
        </div>
      </div>
      <div className="flex-1 relative">
        <canvas ref={canvasRef} className="w-full h-full" />
        <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          Live Grid Monitoring
        </p>
      </div>
    </div>
  );
}
