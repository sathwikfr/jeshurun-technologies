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



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-br from-blue-50 via-slate-50 to-white dark:from-[#020a1a] dark:via-[#051630] dark:to-[#010613] transition-colors duration-500"
    >
      {/* Legacy background animations (particles & blobs) removed to prevent clashing with GalaxySpiral */}

      {/* FIXED BOTTOM GRADIENT - responsive to theme */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-50 via-slate-50/80 dark:from-slate-950 dark:via-slate-950/80 to-transparent z-10 transition-colors duration-500" />
    </motion.div>
  );
}
