import { useEffect, useRef } from "react";

interface GridPoint {
  x: number;
  y: number;
  z: number;
  vz: number;
  pulse: number;
}

export function CyberGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    let t = 0;
    let mx = 0, my = 0;
    const points: GridPoint[] = [];

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      points.length = 0;
      const cols = Math.floor(w / 60);
      const rows = Math.floor(h / 60);
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          points.push({
            x: i * 60,
            y: j * 60,
            z: Math.random() * 100 - 50,
            vz: (Math.random() - 0.5) * 0.5,
            pulse: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width - 0.5;
      my = (e.clientY - rect.top) / rect.height - 0.5;
    };

    let rafId = 0;
    const tick = () => {
      t += 0.015;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(0, 245, 255, 0.15)";
      ctx.lineWidth = 0.5;
      const cols = Math.floor(w / 60);
      const rows = Math.floor(h / 60);
      
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        for (let j = 0; j <= rows; j++) {
          const p = points[i * (rows + 1) + j];
          if (!p) continue;
          p.pulse += 0.02;
          const offsetZ = Math.sin(p.pulse + t) * 20 + mx * 30;
          const px = p.x + mx * (p.z + offsetZ) * 0.3;
          const py = p.y + my * (p.z + offsetZ) * 0.2 + Math.sin(t + p.x * 0.01) * 10;
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      for (let j = 0; j <= rows; j++) {
        ctx.beginPath();
        for (let i = 0; i <= cols; i++) {
          const p = points[i * (rows + 1) + j];
          if (!p) continue;
          p.pulse += 0.02;
          const offsetZ = Math.sin(p.pulse + t) * 20 + mx * 30;
          const px = p.x + mx * (p.z + offsetZ) * 0.3;
          const py = p.y + my * (p.z + offsetZ) * 0.2 + Math.sin(t + p.x * 0.01) * 10;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      for (const p of points) {
        p.pulse += 0.03;
        const pulseIntensity = (Math.sin(p.pulse) + 1) / 2;
        const offsetZ = Math.sin(p.pulse + t) * 20 + mx * 30;
        const px = p.x + mx * (p.z + offsetZ) * 0.3;
        const py = p.y + my * (p.z + offsetZ) * 0.2 + Math.sin(t + p.x * 0.01) * 10;
        
        if (pulseIntensity > 0.7) {
          const gradient = ctx.createRadialGradient(px, py, 0, px, py, 8);
          gradient.addColorStop(0, `rgba(0, 245, 255, ${pulseIntensity * 0.8})`);
          gradient.addColorStop(1, "rgba(0, 245, 255, 0)");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fill();
        }

        if (Math.random() < 0.001) {
          ctx.strokeStyle = "rgba(123, 47, 255, 0.5)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + (Math.random() - 0.5) * 100, py + (Math.random() - 0.5) * 100);
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    init();
    tick();
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 pointer-events-none opacity-40"
      aria-hidden
    />
  );
}