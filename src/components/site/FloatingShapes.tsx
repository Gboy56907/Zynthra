import { useEffect, useRef } from "react";

interface FloatingShape {
  type: "cube" | "sphere" | "ring" | "pyramid";
  size: number;
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  duration: number;
  delay: number;
  color: "cyan" | "violet" | "coral";
}

const SHAPES: FloatingShape[] = [
  { type: "cube", size: 80, x: 10, y: 15, z: -100, rotateX: 25, rotateY: 35, rotateZ: 10, duration: 12, delay: 0, color: "cyan" },
  { type: "ring", size: 120, x: 85, y: 20, z: -150, rotateX: 45, rotateY: 0, rotateZ: 20, duration: 15, delay: 2, color: "violet" },
  { type: "pyramid", size: 60, x: 75, y: 70, z: -80, rotateX: 30, rotateY: 45, rotateZ: 0, duration: 10, delay: 1, color: "coral" },
  { type: "sphere", size: 50, x: 20, y: 80, z: -120, rotateX: 0, rotateY: 0, rotateZ: 0, duration: 14, delay: 0.5, color: "cyan" },
  { type: "cube", size: 45, x: 60, y: 10, z: -90, rotateX: 15, rotateY: 60, rotateZ: 25, duration: 11, delay: 3, color: "violet" },
  { type: "ring", size: 70, x: 30, y: 45, z: -60, rotateX: 60, rotateY: 30, rotateZ: 15, duration: 13, delay: 1.5, color: "coral" },
];

const COLOR_VARS = {
  cyan: { primary: "oklch(0.66 0.21 230)", glow: "rgba(0,245,255,0.4)" },
  violet: { primary: "oklch(0.55 0.22 270)", glow: "rgba(123,47,255,0.4)" },
  coral: { primary: "oklch(0.65 0.18 25)", glow: "rgba(255,107,107,0.4)" },
};

export function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 2;
      const y = ((e.clientY - top) / height - 0.5) * 2;
      
      containerRef.current.style.setProperty("--mouse-x", String(x));
      containerRef.current.style.setProperty("--mouse-y", String(y));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ "--mouse-x": 0, "--mouse-y": 0 } as React.CSSProperties}
    >
      {SHAPES.map((shape, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            transformStyle: "preserve-3d",
            perspective: "1000px",
            animation: `float3d ${shape.duration}s ease-in-out ${shape.delay}s infinite`,
          }}
        >
          <div
            className="relative"
            style={{
              width: shape.size,
              height: shape.size,
              transformStyle: "preserve-3d",
              transform: `translateZ(calc(var(--mouse-x) * ${shape.z * 0.3}px)) translateY(calc(var(--mouse-y) * ${shape.z * 0.2}px)) rotateX(${shape.rotateX}deg) rotateY(${shape.rotateY}deg) rotateZ(${shape.rotateZ}deg)`,
            }}
          >
            <Shape3D type={shape.type} size={shape.size} color={shape.color} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Shape3D({ type, size, color }: { type: FloatingShape["type"]; size: number; color: FloatingShape["color"] }) {
  const colors = COLOR_VARS[color];
  const half = size / 2;
  const border = `2px solid ${colors.primary}`;
  
  if (type === "cube") {
    return (
      <div className="relative" style={{ width: size, height: size, transformStyle: "preserve-3d" }}>
        {/* Front */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}15, ${colors.primary}05)`,
            border,
            transform: `translateZ(${half}px)`,
          }}
        />
        {/* Back */}
        <div 
          className="absolute inset-0"
          style={{
            background: `${colors.primary}10`,
            border,
            transform: `rotateY(180deg) translateZ(${half}px)`,
          }}
        />
        {/* Left */}
        <div 
          className="absolute inset-0"
          style={{
            background: `${colors.primary}08`,
            border,
            transform: `rotateY(-90deg) translateZ(${half}px)`,
          }}
        />
        {/* Right */}
        <div 
          className="absolute inset-0"
          style={{
            background: `${colors.primary}08`,
            border,
            transform: `rotateY(90deg) translateZ(${half}px)`,
          }}
        />
        {/* Top */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}20, transparent)`,
            border,
            transform: `rotateX(90deg) translateZ(${half}px)`,
          }}
        />
        {/* Bottom */}
        <div 
          className="absolute inset-0"
          style={{
            background: `${colors.primary}05`,
            border,
            transform: `rotateX(-90deg) translateZ(${half}px)`,
          }}
        />
        {/* Glow */}
        <div 
          className="absolute inset-0 blur-xl"
          style={{
            background: colors.glow,
            transform: `translateZ(${half * 2}px)`,
          }}
        />
      </div>
    );
  }
  
  if (type === "sphere") {
    return (
      <div 
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 30% 30%, ${colors.primary}60, ${colors.primary}20, transparent)`,
          boxShadow: `0 0 60px ${colors.glow}, inset 0 0 30px ${colors.glow}`,
        }}
      />
    );
  }
  
  if (type === "ring") {
    return (
      <div 
        className="rounded-full"
        style={{
          width: size,
          height: size,
          border: `3px solid ${colors.primary}`,
          boxShadow: `0 0 30px ${colors.glow}, inset 0 0 30px ${colors.glow}`,
          background: "transparent",
        }}
      />
    );
  }
  
  if (type === "pyramid") {
    return (
      <div style={{ width: size, height: size, transformStyle: "preserve-3d" }}>
        <div 
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            borderLeft: `${half}px solid transparent`,
            borderRight: `${half}px solid transparent`,
            borderBottom: `${size * 0.8}px solid ${colors.primary}40`,
            transform: "rotateX(-30deg)",
          }}
        />
        <div 
          style={{
            position: "absolute",
            width: size,
            height: size * 0.4,
            background: `${colors.primary}20`,
            border,
            transform: "translateY(100%) rotateX(90deg)",
          }}
        />
      </div>
    );
  }
  
  return null;
}