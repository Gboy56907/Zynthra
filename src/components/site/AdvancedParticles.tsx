import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
  hue: number;
}

export function AdvancedParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    const particles: Particle[] = [];
    const particleCount = 120;

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    };

    const createParticle = (): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 500 - 250,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.5 - 0.1,
      vz: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      hue: Math.random() > 0.5 ? 190 : 280,
    });

    let rafId = 0;
    let t = 0;

    const tick = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.y < -50) {
          p.y = h + 50;
          p.x = Math.random() * w;
          p.z = Math.random() * 500 - 250;
        }

        const depth = (p.z + 250) / 500;
        const scale = 0.3 + depth * 1.2;
        const alpha = p.alpha * depth;
        
        const projectedX = w / 2 + (p.x - w / 2) * depth;
        const projectedY = h / 2 + (p.y - h / 2) * depth;

        const gradient = ctx.createRadialGradient(
          projectedX, projectedY, 0,
          projectedX, projectedY, p.size * scale
        );

        if (p.hue === 190) {
          gradient.addColorStop(0, `rgba(0, 245, 255, ${alpha})`);
          gradient.addColorStop(1, "rgba(0, 245, 255, 0)");
        } else {
          gradient.addColorStop(0, `rgba(123, 47, 255, ${alpha})`);
          gradient.addColorStop(1, "rgba(123, 47, 255, 0)");
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, p.size * scale, 0, Math.PI * 2);
        ctx.fill();

        if (Math.random() < 0.001) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(projectedX - 20, projectedY - 20);
          ctx.lineTo(projectedX + 20, projectedY + 20);
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    init();
    tick();

    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 pointer-events-none opacity-60"
      aria-hidden
    />
  );
}