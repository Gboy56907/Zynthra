import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HolographicWaves() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 0.5, 0.5, 0.2]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div style={{ rotate, scale, opacity }} className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full border border-cyan/20" style={{ borderTopColor: "rgba(0,245,255,0.4)", borderBottomColor: "rgba(123,47,255,0.2)" }} />
      </motion.div>
      <motion.div style={{ rotate: useTransform(scrollYProgress, [0, 1], [360, 0]), scale: useTransform(scrollYProgress, [0, 1], [1, 0.7]) }} className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full border border-violet/20" style={{ borderLeftColor: "rgba(123,47,255,0.4)", borderRightColor: "rgba(0,245,255,0.2)" }} />
      </motion.div>
      <motion.div style={{ scale: useTransform(scrollYProgress, [0, 1], [1.5, 0.5]) }} className="absolute inset-0 flex items-center justify-center">
        <div className="w-[400px] h-[400px] rounded-full border border-coral/20" style={{ borderTopColor: "rgba(255,107,107,0.3)", borderBottomColor: "rgba(0,245,255,0.1)" }} />
      </motion.div>
    </div>
  );
}

export function EnergyRings() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const y = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <motion.div ref={ref} style={{ y }} className="absolute inset-0 pointer-events-none">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          style={{ rotate }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div 
            className="rounded-full border border-dashed"
            style={{
              width: (i + 1) * 120,
              height: (i + 1) * 120,
              borderColor: i % 2 === 0 ? "rgba(0,245,255,0.2)" : "rgba(123,47,255,0.15)",
              animationDirection: i % 2 === 0 ? "normal" : "reverse",
              animationDuration: `${8 + i * 2}s`,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function ScanLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.3) 2px, rgba(0,245,255,0.3) 4px)",
        }}
      />
      <div 
        className="absolute inset-0 animate-scan"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(0,245,255,0.1) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

export function FloatingParticles3D() {
  const ref = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            background: Math.random() > 0.5 ? "rgba(0,245,255,0.6)" : "rgba(123,47,255,0.6)",
            boxShadow: `0 0 ${Math.random() * 20 + 10}px ${Math.random() > 0.5 ? "rgba(0,245,255,0.5)" : "rgba(123,47,255,0.5)"}`,
            animation: `floatParticle ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

export function GridFloor() {
  const ref = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let w = 0, h = 0, dpr = 1;
    let t = 0;
    
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    
    let rafId = 0;
    const tick = () => {
      t += 0.02;
      ctx.clearRect(0, 0, w, h);
      
      const gridSize = 40;
      const perspective = 0.4;
      
      ctx.strokeStyle = "rgba(0, 245, 255, 0.1)";
      ctx.lineWidth = 0.5;
      
      for (let i = -20; i <= 20; i++) {
        const z = i * gridSize + (t * 50) % gridSize;
        const scale = perspective / (perspective + z * 0.01);
        const y = h / 2 + (z - 100) * scale * 2;
        
        if (y > 0 && y < h) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      }
      
      for (let i = -30; i <= 30; i++) {
        const x = w / 2 + i * gridSize;
        const gradient = ctx.createLinearGradient(x, 0, x, h);
        gradient.addColorStop(0, "rgba(0, 245, 255, 0.15)");
        gradient.addColorStop(0.5, "rgba(123, 47, 255, 0.1)");
        gradient.addColorStop(1, "transparent");
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      
      rafId = requestAnimationFrame(tick);
    };
    
    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  
  return (
    <canvas
      ref={ref}
      className="absolute bottom-0 left-0 w-full h-[300px] pointer-events-none opacity-30"
      style={{ transform: "perspective(500px) rotateX(60deg)", transformOrigin: "bottom" }}
      aria-hidden
    />
  );
}