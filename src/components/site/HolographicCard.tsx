import { ReactNode } from "react";

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}

export function HolographicCard({ children, className = "" }: HolographicCardProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative glass-strong rounded-2xl overflow-hidden border border-white/10">
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(0,245,255,0.15) 0%, transparent 50%, rgba(123,47,255,0.15) 100%)",
          }}
        />
        
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)",
            animation: "holo-shine 3s ease-in-out infinite",
          }}
        />

        <div 
          className="absolute top-0 left-0 w-full h-[1px] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, oklch(0.66 0.21 230), transparent)",
          }}
        />
        
        <div 
          className="absolute bottom-0 left-0 w-full h-[1px] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, oklch(0.55 0.22 270), transparent)",
          }}
        />

        <div className="relative z-10">{children}</div>
      </div>

      <div
        className="absolute inset-0 -z-10 rounded-2xl blur-xl pointer-events-none"
        style={{ 
          background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(123,47,255,0.2))",
        }}
      />
    </div>
  );
}

export function HolographicBorder({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div 
        className="absolute -inset-[1px] rounded-2xl opacity-60"
        style={{
          background: "linear-gradient(135deg, oklch(0.66 0.21 230), oklch(0.65 0.18 25) 50%, oklch(0.55 0.22 270))",
          backgroundSize: "200% 200%",
          animation: "holo-border-flow 4s ease infinite",
        }}
      />
      <div className="relative bg-background rounded-2xl">{children}</div>
    </div>
  );
}