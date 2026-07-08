"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useInView, useReducedMotion } from "framer-motion";

interface HeroFieldBackgroundProps {
  blobOneColor?: string;
  blobTwoColor?: string;
}

export function HeroFieldBackground({
  blobOneColor = "bg-blue-600/15",
  blobTwoColor = "bg-indigo-600/15",
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
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinate system so center of screen is (0,0)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      // Max parallax drift of 35px
      mouseX.set(x * 35);
      mouseY.set(y * 35);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* LAYER 1: Subtle Animated Grid with Parallax Drift (Disabled on Reduced Motion) */}
      {!shouldReduceMotion && (
        <motion.div 
          style={{ x: smoothX, y: smoothY }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-[-150px]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(100, 150, 255, 0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 150, 255, 0.025) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(ellipse at 50% 35%, black 50%, transparent 85%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 35%, black 50%, transparent 85%)",
            }}
          />
        </motion.div>
      )}

      {/* LAYER 2: Breathing Ambient Blobs (Static on Reduced Motion) */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <motion.div 
          className={`absolute top-[5%] left-[15%] w-[800px] h-[600px] rounded-[100%] blur-[140px] mix-blend-screen ${blobOneColor}`}
          animate={(!shouldReduceMotion && isInView) ? {
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.9, 0.6],
            x: [0, 40, 0],
          } : { scale: 1, opacity: 0.6, x: 0 }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute top-[25%] right-[10%] w-[900px] h-[700px] rounded-[100%] blur-[160px] mix-blend-screen ${blobTwoColor}`}
          animate={(!shouldReduceMotion && isInView) ? {
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
            x: [0, -50, 0],
          } : { scale: 1, opacity: 0.5, x: 0 }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* LAYER 3: Minimal Constellation (Disabled on Reduced Motion) */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-screen hidden lg:flex">
          <svg className="w-full h-full max-w-[1400px] mx-auto" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 700">
            <motion.g
              animate={isInView ? { opacity: [0.4, 0.8, 0.4] } : { opacity: 0.4 }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Lines */}
              <line x1="250" y1="180" x2="520" y2="280" stroke="rgba(100,150,255,0.15)" strokeWidth="1" />
              <line x1="520" y1="280" x2="880" y2="220" stroke="rgba(100,150,255,0.15)" strokeWidth="1" />
              <line x1="520" y1="280" x2="650" y2="520" stroke="rgba(100,150,255,0.15)" strokeWidth="1" />
              <line x1="650" y1="520" x2="380" y2="580" stroke="rgba(100,150,255,0.15)" strokeWidth="1" />
              <line x1="650" y1="520" x2="950" y2="450" stroke="rgba(100,150,255,0.15)" strokeWidth="1" />
              <line x1="120" y1="350" x2="250" y2="180" stroke="rgba(100,150,255,0.1)" strokeWidth="1" />
              <line x1="880" y1="220" x2="1080" y2="300" stroke="rgba(100,150,255,0.1)" strokeWidth="1" />
              <line x1="950" y1="450" x2="1080" y2="300" stroke="rgba(100,150,255,0.1)" strokeWidth="1" />
              
              {/* Nodes */}
              <circle cx="250" cy="180" r="3.5" fill="rgba(100,150,255,0.4)" />
              <circle cx="520" cy="280" r="4.5" fill="rgba(100,150,255,0.7)" />
              <circle cx="880" cy="220" r="3" fill="rgba(100,150,255,0.4)" />
              <circle cx="650" cy="520" r="4" fill="rgba(100,150,255,0.6)" />
              <circle cx="380" cy="580" r="2.5" fill="rgba(100,150,255,0.3)" />
              <circle cx="950" cy="450" r="3.5" fill="rgba(100,150,255,0.5)" />
              <circle cx="120" cy="350" r="2" fill="rgba(100,150,255,0.3)" />
              <circle cx="1080" cy="300" r="2.5" fill="rgba(100,150,255,0.4)" />
            </motion.g>
          </svg>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background z-10" />
    </motion.div>
  );
}
