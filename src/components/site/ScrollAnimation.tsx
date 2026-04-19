import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxSection({ children, className = "", speed = 1 }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const shouldReduceMotion = useReducedMotion();
  const y = shouldReduceMotion ? 0 : useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={ref} 
      style={{ y, opacity }} 
      className={className}
      {...(shouldReduceMotion ? {} : { willChange: "transform, opacity" })}
    >
      {children}
    </motion.div>
  );
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
}

export function ScrollReveal({ children, className = "", delay = 0, direction = "up" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  const y = shouldReduceMotion ? 0 : useTransform(smoothProgress, [0, 1], direction === "up" ? 80 : direction === "down" ? -80 : 0);
  const x = shouldReduceMotion ? 0 : useTransform(smoothProgress, [0, 1], direction === "left" ? 80 : direction === "right" ? -80 : 0);
  const scale = shouldReduceMotion ? 1 : useTransform(smoothProgress, [0, 0.5, 1], direction === "scale" ? [0.8, 1, 1] : [1, 1, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={ref} 
      style={{ y, x, scale, opacity, transition: { delay } }} 
      className={className}
      {...(shouldReduceMotion ? {} : { willChange: "transform, opacity" })}
    >
      {children}
    </motion.div>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  floatSpeed?: number;
  rotation?: boolean;
}

export function FloatingElement({ children, className = "", floatSpeed = 6, rotation = false }: FloatingElementProps) {
  return (
    <motion.div
      animate={rotation 
        ? { 
            y: [0, -20, 0], 
            rotate: [0, 5, 0, -5, 0],
          }
        : { 
            y: [0, -15, 0],
            x: [0, 10, 0, -10, 0],
          }
      }
      transition={{
        duration: floatSpeed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export function StaggerContainer({ children, className = "", stagger = 0.1 }: StaggerContainerProps) {
  const childArray = Array.isArray(children) ? children : [children];
  
  return (
    <div className={className}>
      {childArray.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: i * stagger, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}