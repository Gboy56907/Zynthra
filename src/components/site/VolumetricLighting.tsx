import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function VolumetricLighting() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.6, 0.6, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ y: y1, opacity, scale }}
        className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="volumetric1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.66 0.21 230)" stopOpacity="0.4" />
              <stop offset="40%" stopColor="oklch(0.66 0.21 230)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="oklch(0.66 0.21 230)" stopOpacity="0" />
            </radialGradient>
            <filter id="blur-volumetric">
              <feGaussianBlur stdDeviation="40" />
            </filter>
          </defs>
          <ellipse cx="50%" cy="50%" rx="50" ry="50" fill="url(#volumetric1)" filter="url(#blur-volumetric)" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: y2, opacity, scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 1.1]) }}
        className="absolute -bottom-1/3 -right-1/4 w-[600px] h-[600px] rounded-full"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="volumetric2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.55 0.22 270)" stopOpacity="0.35" />
              <stop offset="50%" stopColor="oklch(0.55 0.22 270)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="oklch(0.55 0.22 270)" stopOpacity="0" />
            </radialGradient>
            <filter id="blur-volumetric2">
              <feGaussianBlur stdDeviation="30" />
            </filter>
          </defs>
          <ellipse cx="50%" cy="50%" rx="50" ry="50" fill="url(#volumetric2)" filter="url(#blur-volumetric2)" />
        </svg>
      </motion.div>

      <motion.div
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.25, 0.1]),
          y: useTransform(scrollYProgress, [0, 1], [0, -30])
        }}
        className="absolute inset-0"
      >
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="godray" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.66 0.21 230)" stopOpacity="0" />
              <stop offset="50%" stopColor="oklch(0.66 0.21 230)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="oklch(0.66 0.21 230)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path 
            d="M0,0 L200,0 L180,100 L20,100 Z" 
            fill="url(#godray)"
            transform="translate(0, -20)"
          />
          <path 
            d="M50,0 L80,0 L70,100 L30,100 Z" 
            fill="url(#godray)"
            transform="translate(0, -30)"
            opacity="0.5"
          />
          <path 
            d="M120,0 L160,0 L150,100 L110,100 Z" 
            fill="url(#godray)"
            transform="translate(0, -10)"
            opacity="0.3"
          />
        </svg>
      </motion.div>
    </div>
  );
}