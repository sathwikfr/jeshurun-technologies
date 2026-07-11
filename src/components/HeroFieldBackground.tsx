"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion, useSpring, useMotionValue, useInView, useReducedMotion } from "framer-motion";

interface HeroFieldBackgroundProps {
  blobOneColor?: string;
  blobTwoColor?: string;
}

export function HeroFieldBackground({
  blobOneColor = "bg-cyan-500/30",
  blobTwoColor = "bg-blue-600/30",
}: HeroFieldBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "200px" });
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 60, mass: 1.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x * 35);
      mouseY.set(y * 35);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion, isInView]);

  // Generate deterministic random particles
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-br from-blue-50 via-slate-50 to-white dark:from-[#020a1a] dark:via-[#051630] dark:to-[#010613] transition-colors duration-500"
    >
      {/* LAYER 1: Ambient Floating Particles (Replaces Grid) */}
      {!shouldReduceMotion && (
        <motion.div style={{ x: smoothX, y: smoothY }} className="absolute inset-0">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute bg-blue-500/30 dark:bg-cyan-400/40 rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                boxShadow: `0 0 ${p.size * 3}px rgba(6, 182, 212, 0.8)`,
              }}
              animate={isInView ? {
                y: [0, -150, 0],
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 1.5, 1],
              } : { y: 0, opacity: 0.1 }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* LAYER 2: Breathing Ambient Blobs */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/50 dark:bg-blue-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen blur-[128px]"
          animate={(!shouldReduceMotion && isInView) ? {
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
            x: [0, 60, 0],
            y: [0, 30, 0],
          } : { scale: 1, opacity: 0.6, x: 0 }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-200/50 dark:bg-cyan-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen blur-[128px]"
          animate={(!shouldReduceMotion && isInView) ? {
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.9, 0.5],
            x: [0, -70, 0],
            y: [0, -40, 0],
          } : { scale: 1, opacity: 0.5, x: 0 }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Constellation removed as requested */}

      {/* FIXED BOTTOM GRADIENT - responsive to theme */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-50 via-slate-50/80 dark:from-slate-950 dark:via-slate-950/80 to-transparent z-10 transition-colors duration-500" />
    </motion.div>
  );
}
