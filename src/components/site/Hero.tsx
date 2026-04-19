import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Play, ChevronDown, ShieldCheck, Globe2, Zap, BadgeCheck, X } from "lucide-react";
import { FloatingShapes } from "./FloatingShapes";
import { VolumetricLighting } from "./VolumetricLighting";
import { CyberGrid } from "./CyberGrid";
import { HolographicWaves, EnergyRings } from "./HolographicEffects";
import { NxButton } from "./NxButton";
import { AuthModal } from "./AuthModal";

const LINE_2_WORD = "Everything.".split("");
const TRUST = [
  { icon: ShieldCheck, label: "SOC 2 Certified" },
  { icon: BadgeCheck, label: "GDPR Ready" },
  { icon: Zap, label: "99.99% Uptime" },
  { icon: Globe2, label: "ISO 27001" },
];

export function Hero() {
  const [demo, setDemo] = useState(false);
  const [auth, setAuth] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background" />
        
        <CyberGrid />
        <VolumetricLighting />
        <HolographicWaves />
        <EnergyRings />
        <FloatingShapes />
        
        <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-cyan/10 animate-pulse-glow blur-3xl" />
        <div className="absolute top-[30%] right-[10%] w-48 h-48 rounded-full bg-violet/10 animate-pulse-glow blur-3xl animate-delay-200" />
        <div className="absolute bottom-[20%] left-[15%] w-56 h-56 rounded-full bg-coral/10 animate-pulse-glow blur-3xl animate-delay-400" />
        
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
        
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center top, transparent 0%, var(--background) 60%)",
        }} />
      </div>

      <motion.div 
        style={{ y: yHero, opacity: opacityHero, scale: scaleHero }}
        className="relative z-10 mx-auto max-w-7xl px-6 w-full text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="inline-flex items-center gap-3 rounded-full glass px-4 py-2 text-xs font-mono"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan animate-neon-flicker"></span>
          </span>
          <span className="text-cyan">NexaAgent v3</span>
          <span className="text-muted-foreground">with GPT-5.2 reasoning</span>
          <motion.span 
            animate={{ x: [0, 3, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-cyan"
          >
            →
          </motion.span>
        </motion.div>

        <motion.h1 
          style={{ y: titleY }}
          className="mt-8 font-display font-extrabold leading-[0.92] tracking-[-0.04em] text-[clamp(3rem,10vw,8rem)]"
        >
          <motion.span
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="inline-block"
          >
            The Intelligence
          </motion.span>
          <br />
          <span className="text-foreground/90">
            <Stagger text="Layer for " delay={2.0} />
          </span>
          <span className="text-gradient inline-flex italic relative">
            {LINE_2_WORD.map((c: string, i: number) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -90, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                transition={{ delay: 2.4 + i * 0.05, duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
          </span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 2.95, duration: 1, repeat: Infinity }}
            className="inline-block w-[0.06em] h-[0.8em] ml-2 align-baseline bg-cyan"
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.6 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground"
        >
          Zynthra unifies AI agents, voice intelligence, cloud communication, and automation into one sovereign platform — built for enterprises that refuse to compromise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,245,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-brand opacity-50 blur-lg animate-pulse-glow" />
            <NxButton size="lg" onClick={() => setAuth(true)}>
              Start Building Free
              <motion.span 
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-1"
              >
                →
              </motion.span>
            </NxButton>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NxButton size="lg" variant="ghost" onClick={() => setDemo(true)} className="glass">
              <Play className="h-4 w-4" /> Watch Demo
            </NxButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.3, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {TRUST.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 3.4 + i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs cursor-pointer"
            >
              <t.icon className="h-3.5 w-3.5 text-cyan" /> 
              <span className="font-medium">{t.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-xs"
      >
        <span className="uppercase tracking-widest text-[10px]">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0], scale: [1, 1.1, 1] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
          className="relative"
        >
          <ChevronDown className="h-5 w-5" />
          <motion.div 
            className="absolute inset-0 bg-cyan/30 blur-sm"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {demo && (
        <div className="fixed inset-0 z-[100] grid place-items-center p-6 bg-background/90 backdrop-blur-xl" onClick={() => setDemo(false)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl aspect-video glass-strong rounded-2xl overflow-hidden border border-cyan/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-violet/5" />
            <div className="absolute inset-0 animate-pulse-border border-2 border-transparent rounded-2xl" />
            
            <button 
              onClick={() => setDemo(false)} 
              className="absolute right-4 top-4 z-10 p-3 rounded-xl glass hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="relative h-full w-full flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-center"
              >
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-cyan/20 blur-2xl animate-pulse-glow rounded-full" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="relative"
                  >
                    <Play className="h-16 w-16 text-cyan" />
                  </motion.div>
                </div>
                <p className="mt-6 font-display text-2xl font-bold">Demo video coming soon</p>
                <p className="mt-2 text-sm text-muted-foreground">A guided walkthrough of Zynthra's platform.</p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="h-1 w-20 rounded-full bg-white/10 overflow-hidden">
                    <motion.div 
                      className="h-full bg-cyan"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">Loading...</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}

      <AuthModal open={auth} onClose={() => setAuth(false)} />
    </section>
  );
}

function Stagger({ text, delay = 1.6 }: { text: string; delay?: number; }) {
  return (
    <span className="inline-flex">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, z: -50 }}
          animate={{ opacity: 1, y: 0, z: 0 }}
          transition={{ delay: delay + i * 0.035, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ display: "inline-block" }}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
}