"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Activity, Shield, TrendingUp, CheckCircle, Bug, Search, Cloud, Database, Network, Kanban, Target, Users, BarChart3, Check } from "lucide-react";
import { AwsLogo, AzureLogo, GcpLogo } from "@/components/TechLogos";

export function AnimatedServiceVisual({ slug = "it-consulting" }: { slug?: string }) {
  if (slug === "test-management") {
    return <TestManagementVisual />;
  }
  if (slug === "infrastructure-management") {
    return <InfrastructureManagementVisual />;
  }
  if (slug === "project-management") {
    return <ProjectManagementVisual />;
  }
  return <ITConsultingVisual />;
}

// Reusable floating animation
const useFloatingAnimation = (delay: number): any => {
  const shouldReduceMotion = useReducedMotion();
  return {
    y: shouldReduceMotion ? 0 : ["-10px", "10px", "-10px"],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    },
  };
};

/* ==========================================================================
 IT CONSULTING VISUAL (The original server core)
 ========================================================================== */
function ITConsultingVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();
  const floating0 = useFloatingAnimation(0);
  const floating1 = useFloatingAnimation(1);
  const floating2 = useFloatingAnimation(2.5);

  return (
    <div ref={ref} className="relative w-full h-[400px] flex items-center justify-center perspective-[1000px] group">
      <motion.div
        className="relative z-10 drop-shadow-[0_0_30px_rgba(37,99,235,0.4)] scale-90 md:scale-100"
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg width="320" height="320" viewBox="0 0 200 200" className="overflow-visible">
          <defs>
            <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="cubeLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="cubeRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Base Platform */}
          <motion.path
            d="M 100 130 L 170 95 L 100 60 L 30 95 Z"
            fill="rgba(30, 58, 138, 0.3)"
            stroke="rgba(96, 165, 250, 0.4)"
            strokeWidth="1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.path
            d="M 100 145 L 180 105 L 100 65 L 20 105 Z"
            fill="none"
            stroke="rgba(37, 99, 235, 0.2)"
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          {/* Core Cube Faces */}
          <path d="M 100 115 L 50 90 L 50 40 L 100 65 Z" fill="url(#cubeLeft)" stroke="#60a5fa" strokeWidth="0.5" />
          <path d="M 100 115 L 150 90 L 150 40 L 100 65 Z" fill="url(#cubeRight)" stroke="#3b82f6" strokeWidth="0.5" />
          <path d="M 100 65 L 150 40 L 100 15 L 50 40 Z" fill="url(#cubeTop)" stroke="#93c5fd" strokeWidth="1" />

          {/* Data Lines */}
          <motion.path d="M 50 75 L 90 95" stroke="url(#glowLine)" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={isInView && !shouldReduceMotion ? { pathLength: [0, 1, 0], opacity: [0, 1, 0] } : {}} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }} />
          <motion.path d="M 150 75 L 110 95" stroke="url(#glowLine)" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={isInView && !shouldReduceMotion ? { pathLength: [0, 1, 0], opacity: [0, 1, 0] } : {}} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 }} />
          
          <motion.path d="M 100 50 L 115 42 L 100 35 L 85 42 Z" fill="#bfdbfe" animate={!shouldReduceMotion ? { y: [-2, 2, -2] } : {}} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        </svg>
      </motion.div>

      {/* Card 1 */}
      <motion.div className="absolute top-10 right-4 md:right-10 z-20 bg-white/90 dark:bg-[#07132a]/80 backdrop-blur-md border border-slate-200 dark:border-blue-500/30 rounded-xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] w-40" initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0, ...floating0 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-blue-500/20 rounded-md text-blue-400"><TrendingUp className="w-3.5 h-3.5" /></div>
          <span className="text-[10px] text-slate-800 dark:text-blue-200 font-semibold uppercase tracking-wider">Business Impact</span>
        </div>
        <div className="flex items-end gap-1 h-6">
          <motion.div className="w-2 bg-blue-500 rounded-t-sm" initial={{ height: "20%" }} animate={{ height: "60%" }} transition={{ duration: 1.5, delay: 1 }} />
          <motion.div className="w-2 bg-blue-500 rounded-t-sm" initial={{ height: "40%" }} animate={{ height: "40%" }} transition={{ duration: 1.5, delay: 1.2 }} />
          <motion.div className="w-2 bg-blue-400 rounded-t-sm" initial={{ height: "30%" }} animate={{ height: "80%" }} transition={{ duration: 1.5, delay: 1.4 }} />
          <motion.div className="w-2 bg-cyan-400 rounded-t-sm" initial={{ height: "50%" }} animate={{ height: "100%" }} transition={{ duration: 1.5, delay: 1.6 }} />
        </div>
      </motion.div>

      {/* Card 2 */}
      <motion.div className="absolute bottom-16 right-0 md:-right-4 z-20 bg-white/90 dark:bg-[#07132a]/80 backdrop-blur-md border border-slate-200 dark:border-blue-500/30 rounded-xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] w-44" initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0, ...floating1 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
         <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-cyan-500/20 rounded-md text-cyan-400"><Activity className="w-3.5 h-3.5" /></div>
          <span className="text-[10px] text-slate-800 dark:text-cyan-200 font-semibold uppercase tracking-wider">Architecture</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-6 h-3 bg-blue-500/40 border border-blue-400/50 rounded-sm" />
          <div className="w-[1px] h-2 bg-blue-500/50" />
          <div className="w-16 h-[1px] bg-blue-500/50 flex justify-between">
            <div className="w-[1px] h-2 bg-blue-500/50 relative left-0 top-0" />
            <div className="w-[1px] h-2 bg-blue-500/50 relative right-0 top-0" />
          </div>
          <div className="flex gap-4">
             <div className="w-6 h-3 bg-cyan-500/30 border border-cyan-400/50 rounded-sm" />
             <div className="w-6 h-3 bg-cyan-500/30 border border-cyan-400/50 rounded-sm" />
          </div>
        </div>
      </motion.div>

      {/* Card 3 */}
      <motion.div className="absolute top-1/2 -translate-y-1/2 left-0 md:left-4 z-20 bg-white/90 dark:bg-[#07132a]/80 backdrop-blur-md border border-slate-200 dark:border-blue-500/30 rounded-xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] w-48" initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0, ...floating2 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-indigo-500/20 rounded-md text-indigo-400"><Shield className="w-4 h-4" /></div>
          <span className="text-xs text-slate-800 dark:text-indigo-200 font-semibold uppercase tracking-wider">Strategic Roadmap</span>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              </div>
              <div className="h-1.5 bg-blue-900 rounded-full w-full overflow-hidden">
                <motion.div className="h-full bg-blue-400" initial={{ width: "0%" }} animate={isInView ? { width: i === 1 ? "100%" : i === 2 ? "80%" : "60%" } : {}} transition={{ duration: 1.5, delay: 1 + (i * 0.2) }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
 TEST MANAGEMENT VISUAL (Animated Laptop & QA Pipeline)
 ========================================================================== */
function TestManagementVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const floating0 = useFloatingAnimation(0);
  const floating1 = useFloatingAnimation(1);

  return (
    <div ref={ref} className="relative w-full h-[400px] flex items-center justify-center perspective-[1000px] group">
      <motion.div
        className="relative z-10 drop-shadow-[0_0_30px_rgba(37,99,235,0.4)] scale-90 md:scale-100"
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg width="340" height="260" viewBox="0 0 240 180" className="overflow-visible">
          <defs>
             <linearGradient id="laptopScreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#172554" />
            </linearGradient>
            <linearGradient id="laptopBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>

          {/* Isometric Laptop Base */}
          <path d="M 30 140 L 210 140 L 190 160 L 50 160 Z" fill="url(#laptopBody)" stroke="#60a5fa" strokeWidth="0.5" />
          <path d="M 50 160 L 190 160 L 190 165 L 50 165 Z" fill="#1e3a8a" />
          {/* Isometric Keyboard area */}
          <path d="M 50 145 L 190 145 L 180 155 L 60 155 Z" fill="#172554" opacity="0.6" />

          {/* Laptop Screen (Upright) */}
          <path d="M 45 40 L 195 40 L 195 135 L 45 135 Z" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
          <path d="M 50 45 L 190 45 L 190 130 L 50 130 Z" fill="url(#laptopScreen)" />
          
          {/* Animated code lines on screen */}
          <motion.rect x="60" y="55" width="40" height="4" rx="2" fill="#60a5fa" initial={{ opacity: 0 }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.rect x="60" y="65" width="60" height="4" rx="2" fill="#3b82f6" initial={{ opacity: 0 }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />
          <motion.rect x="60" y="75" width="30" height="4" rx="2" fill="#93c5fd" initial={{ opacity: 0 }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} />
          <motion.rect x="60" y="85" width="50" height="4" rx="2" fill="#3b82f6" initial={{ opacity: 0 }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, delay: 1.5, repeat: Infinity }} />
          
          <motion.circle cx="150" cy="85" r="25" fill="none" stroke="#2563eb" strokeWidth="3" />
          <motion.circle cx="150" cy="85" r="20" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "150px 85px" }} />
        </svg>
      </motion.div>

      {/* Floating Pie Chart Card (Left) */}
      <motion.div className="absolute top-12 left-0 md:-left-4 z-20 bg-white/90 dark:bg-[#07132a]/90 backdrop-blur-md border border-slate-200 dark:border-blue-500/50 rounded-xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex items-center gap-4 w-40" initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0, ...floating0 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
        <div className="relative w-10 h-10 rounded-full bg-blue-900 border border-[#07132a] flex-shrink-0">
          <div className="absolute inset-0 bg-blue-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 50%)' }} />
          <div className="absolute inset-0 bg-cyan-400 rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 0 100%, 0 0, 50% 0)' }} />
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          <div className="h-1.5 bg-blue-400/80 rounded-full w-full" />
          <div className="h-1.5 bg-blue-500/60 rounded-full w-4/5" />
          <div className="h-1.5 bg-blue-600/40 rounded-full w-3/5" />
        </div>
      </motion.div>

      {/* Floating Shield (Center Bottom) */}
      <motion.div className="absolute bottom-16 left-1/2 -translate-x-12 z-20 bg-blue-600 rounded-full p-4 shadow-[0_0_30px_rgba(37,99,235,0.6)] border border-blue-400" initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1, ...floating0 } : { opacity: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <Shield className="w-10 h-10 text-white" />
      </motion.div>

      {/* QA Pipeline Checklist Card */}
      <motion.div className="absolute top-6 right-0 md:right-8 z-20 bg-white/90 dark:bg-[#07132a]/90 backdrop-blur-md border border-slate-200 dark:border-blue-500/50 rounded-xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] w-48" initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0, ...floating1 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-green-500/20 rounded-md text-green-500"><CheckCircle className="w-4 h-4" /></div>
          <span className="text-xs text-slate-800 dark:text-green-200 font-semibold uppercase tracking-wider">Test Suite</span>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <motion.div 
                className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: "spring", delay: 1 + (i * 0.3) }}
              >
                <CheckCircle className="w-3 h-3 text-white" />
              </motion.div>
              <div className="h-2 bg-slate-200 dark:bg-blue-900 rounded-full w-full" />
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Floating Line Chart Card (Bottom Right) */}
      <motion.div className="absolute bottom-8 right-0 md:-right-4 z-20 bg-white/90 dark:bg-[#07132a]/90 backdrop-blur-md border border-slate-200 dark:border-blue-500/50 rounded-xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] w-40" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, ...floating1 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
        <svg viewBox="0 0 100 40" className="w-full h-12 overflow-visible">
          <path d="M 0 35 L 20 20 L 40 25 L 70 5 L 100 15" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="0" cy="35" r="2" fill="#22d3ee" />
          <circle cx="20" cy="20" r="2" fill="#22d3ee" />
          <circle cx="40" cy="25" r="2" fill="#22d3ee" />
          <circle cx="70" cy="5" r="2" fill="#22d3ee" />
          <circle cx="100" cy="15" r="2" fill="#22d3ee" />
          
          {/* Grid lines */}
          <line x1="0" y1="0" x2="0" y2="40" stroke="#1e3a8a" strokeWidth="0.5" />
          <line x1="25" y1="0" x2="25" y2="40" stroke="#1e3a8a" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="50" y2="40" stroke="#1e3a8a" strokeWidth="0.5" />
          <line x1="75" y1="0" x2="75" y2="40" stroke="#1e3a8a" strokeWidth="0.5" />
          <line x1="100" y1="0" x2="100" y2="40" stroke="#1e3a8a" strokeWidth="0.5" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
 INFRASTRUCTURE MANAGEMENT VISUAL (Server Stack & Cloud)
 ========================================================================== */
function InfrastructureManagementVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const floating0 = useFloatingAnimation(0);
  const floating1 = useFloatingAnimation(1.5);
  const floating2 = useFloatingAnimation(0.8);

  return (
    <div ref={ref} className="relative w-full h-[400px] flex items-center justify-center perspective-[1000px] group">
      <motion.div
        className="relative z-10 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)] scale-90 md:scale-100"
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg width="240" height="280" viewBox="0 0 200 240" className="overflow-visible">
          <defs>
             <linearGradient id="serverFace" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient id="serverTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>

          {/* Base Plate */}
           <motion.path d="M 100 230 L 190 190 L 100 150 L 10 190 Z" fill="none" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} />

          {/* Server 1 (Bottom) */}
          <g transform="translate(0, 140)">
            <path d="M 40 40 L 160 40 L 160 70 L 40 70 Z" fill="url(#serverFace)" stroke="#0ea5e9" strokeWidth="1" />
            <path d="M 100 20 L 160 40 L 100 60 L 40 40 Z" fill="url(#serverTop)" stroke="#38bdf8" strokeWidth="1" />
            {/* Blinking lights */}
            <motion.circle cx="140" cy="55" r="3" fill="#22d3ee" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
            <motion.circle cx="125" cy="55" r="3" fill="#3b82f6" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </g>

          {/* Server 2 (Middle) */}
          <g transform="translate(0, 95)">
            <path d="M 40 40 L 160 40 L 160 70 L 40 70 Z" fill="url(#serverFace)" stroke="#0ea5e9" strokeWidth="1" />
            <path d="M 100 20 L 160 40 L 100 60 L 40 40 Z" fill="url(#serverTop)" stroke="#38bdf8" strokeWidth="1" />
            <motion.circle cx="140" cy="55" r="3" fill="#22d3ee" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            <motion.circle cx="125" cy="55" r="3" fill="#3b82f6" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
          </g>

          {/* Server 3 (Top) */}
          <g transform="translate(0, 50)">
            <path d="M 40 40 L 160 40 L 160 70 L 40 70 Z" fill="url(#serverFace)" stroke="#0ea5e9" strokeWidth="1" />
            <path d="M 100 20 L 160 40 L 100 60 L 40 40 Z" fill="url(#serverTop)" stroke="#38bdf8" strokeWidth="1" />
            <motion.circle cx="140" cy="55" r="3" fill="#22d3ee" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
            <motion.circle cx="125" cy="55" r="3" fill="#3b82f6" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.1, repeat: Infinity }} />
          </g>

          {/* Floating Data Link to Cloud */}
          <motion.path d="M 100 65 L 100 20" stroke="#0ea5e9" strokeWidth="3" strokeDasharray="4 4" animate={{ strokeDashoffset: [-20, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        </svg>
      </motion.div>

      {/* Giant Cloud Icon floating above */}
      <motion.div className="absolute top-0 md:-top-4 z-20 text-cyan-400 drop-shadow-[0_0_40px_rgba(6,182,212,0.6)]" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, ...floating0 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
        <Cloud className="w-24 h-24 fill-cyan-500/20" />
      </motion.div>

      {/* Cloud Provider Nodes */}
      <motion.div className="absolute top-1/4 -right-4 md:right-8 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex items-center gap-3.5 shadow-xl" initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0, ...floating1 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
        <div className="w-10 h-10 rounded-lg bg-[#FF9900]/10 dark:bg-[#FF9900]/20 flex items-center justify-center shadow-sm">
          <AwsLogo className="w-6 h-6 object-contain" />
        </div>
        <div className="w-10 h-10 rounded-lg bg-[#00A4EF]/10 dark:bg-[#00A4EF]/20 flex items-center justify-center shadow-sm">
          <AzureLogo className="w-6 h-6 object-contain" />
        </div>
        <div className="w-10 h-10 rounded-lg bg-[#4285F4]/10 dark:bg-[#4285F4]/20 flex items-center justify-center shadow-sm">
          <GcpLogo className="w-6 h-6 object-contain" />
        </div>
      </motion.div>

      {/* Network Traffic Card */}
      <motion.div className="absolute bottom-12 -left-4 md:left-4 z-20 bg-white/90 dark:bg-[#07132a]/90 backdrop-blur-md border border-slate-200 dark:border-cyan-500/30 rounded-xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] w-44" initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0, ...floating2 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-cyan-500/20 rounded-md text-cyan-400"><Network className="w-4 h-4" /></div>
          <span className="text-[10px] text-slate-800 dark:text-cyan-200 font-semibold uppercase tracking-wider">Edge CDN Routing</span>
        </div>
        <div className="h-10 flex items-end gap-1">
           {[...Array(8)].map((_, i) => (
             <motion.div key={i} className="w-3 bg-cyan-500/80 rounded-t-sm flex-1" initial={{ height: "10%" }} animate={{ height: `${Math.random() * 80 + 20}%` }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror", delay: i * 0.1 }} />
           ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
 PROJECT MANAGEMENT VISUAL (Agile / Flow)
 ========================================================================== */
function ProjectManagementVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const floating0 = useFloatingAnimation(0);
  const floating1 = useFloatingAnimation(0.5);
  const floating2 = useFloatingAnimation(1);
  const floating3 = useFloatingAnimation(1.5);

  return (
    <div ref={ref} className="relative w-full h-[450px] flex items-center justify-center overflow-hidden group perspective-[1200px]">
      
      {/* High-Level Background Particle Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none transition-opacity duration-1000 group-hover:opacity-30" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      {/* Background Ambient Glows */}
      <motion.div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none" animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none" animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} />

      {/* Floating Energy Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={`particle-${i}`} className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 blur-[1px] z-0" initial={{ x: Math.random() * 400 - 200, y: Math.random() * 400 - 200, opacity: 0 }} animate={{ y: [Math.random() * 400 - 200, Math.random() * -200 - 100], opacity: [0, 0.8, 0] }} transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }} />
      ))}

      {/* Main Roadmap Board */}
      <motion.div
        className="relative z-10 w-[380px] bg-gradient-to-br from-[#07132a]/95 to-[#030a1a]/95 backdrop-blur-2xl border border-blue-500/30 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden"
        initial={{ opacity: 0, x: -40, y: 10, scale: 0.85 }}
        animate={isInView ? { opacity: 1, x: -20, y: 0, scale: 0.95 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glassmorphism Shimmer Effect */}
        <motion.div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/5 to-transparent w-[200%] skew-x-[-20deg]" animate={{ translateX: ["-100%", "200%"] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }} />

        {/* Board Left Edge Highlight (creates 3D thickness effect) */}
        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400 via-cyan-400 to-indigo-600 rounded-l-2xl shadow-[0_0_20px_rgba(59,130,246,0.8)]" />

        <h3 className="text-white font-bold text-lg mb-4 tracking-wide flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
           PROJECT ROADMAP
        </h3>
        
        {/* Table Header */}
        <div className="flex border-b border-blue-500/30 pb-2 mb-3 text-[10px] font-semibold text-blue-200 uppercase tracking-widest pl-10">
          <div className="flex-1 text-center">Plan</div>
          <div className="flex-1 text-center">Develop</div>
          <div className="flex-1 text-center">Test</div>
          <div className="flex-1 text-center">Deploy</div>
        </div>

        {/* Grid Background Lines */}
        <div className="absolute top-[80px] bottom-6 left-[60px] right-6 flex justify-between pointer-events-none">
          {[...Array(4)].map((_, i) => (
             <div key={i} className="w-px h-full bg-gradient-to-b from-blue-500/20 to-transparent" />
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-4 relative">
          {/* Row 1 */}
          <div className="flex items-center gap-4 group/row cursor-default">
            <div className="w-5 h-5 rounded-full border border-blue-400/50 bg-blue-500/10 flex items-center justify-center shrink-0 transition-colors group-hover/row:border-blue-400 group-hover/row:bg-blue-500/30">
              <Check className="w-3 h-3 text-blue-300" />
            </div>
            <div className="flex-1 relative h-4">
              <motion.div className="absolute left-[5%] top-0 h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.6)] border border-blue-300/50 overflow-hidden" initial={{ width: 0 }} animate={isInView ? { width: "45%" } : {}} transition={{ duration: 1, delay: 0.5 }}>
                 <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 animate-[shimmer_2s_infinite]" />
              </motion.div>
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex items-center gap-4 border-t border-blue-500/10 pt-4 group/row cursor-default">
            <div className="w-5 h-5 rounded-full border border-blue-400/50 bg-blue-500/10 flex items-center justify-center shrink-0 transition-colors group-hover/row:border-blue-400 group-hover/row:bg-blue-500/30">
              <Check className="w-3 h-3 text-cyan-300" />
            </div>
            <div className="flex-1 relative h-4">
              <motion.div className="absolute left-[30%] top-0 h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)] border border-cyan-300/50 overflow-hidden" initial={{ width: 0 }} animate={isInView ? { width: "35%" } : {}} transition={{ duration: 1, delay: 0.7 }}>
                 <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 animate-[shimmer_2s_infinite_0.5s]" />
              </motion.div>
            </div>
          </div>
          {/* Row 3 */}
          <div className="flex items-center gap-4 border-t border-blue-500/10 pt-4 group/row cursor-default">
            <div className="w-5 h-5 rounded-full border border-blue-400/50 bg-blue-500/10 flex items-center justify-center shrink-0 transition-colors group-hover/row:border-blue-400 group-hover/row:bg-blue-500/30">
              <Check className="w-3 h-3 text-indigo-300" />
            </div>
            <div className="flex-1 relative h-4">
              <motion.div className="absolute left-[55%] top-0 h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.6)] border border-indigo-300/50 overflow-hidden" initial={{ width: 0 }} animate={isInView ? { width: "40%" } : {}} transition={{ duration: 1, delay: 0.9 }}>
                 <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 animate-[shimmer_2s_infinite_1s]" />
              </motion.div>
            </div>
          </div>
          {/* Row 4 */}
          <div className="flex items-center gap-4 border-t border-blue-500/10 pt-4 group/row cursor-default">
            <div className="w-5 h-5 rounded-full border border-blue-400/50 bg-blue-500/10 flex items-center justify-center shrink-0 transition-colors group-hover/row:border-blue-400 group-hover/row:bg-blue-500/30">
              <Check className="w-3 h-3 text-purple-300" />
            </div>
            <div className="flex-1 relative h-4">
              <motion.div className="absolute left-[40%] top-0 h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.6)] border border-purple-300/50 overflow-hidden" initial={{ width: 0 }} animate={isInView ? { width: "35%" } : {}} transition={{ duration: 1, delay: 1.1 }}>
                 <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 animate-[shimmer_2s_infinite_1.5s]" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Team Card (Center Front) */}
      <motion.div 
        className="absolute bottom-8 left-[15%] md:left-1/4 z-30 bg-[#0a1938]/90 backdrop-blur-xl border border-blue-400/40 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] hover:scale-110 transition-transform cursor-pointer"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1, ...floating0 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-600/10 rounded-2xl" />
        <Users className="w-12 h-12 text-cyan-400 relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        
        {/* Dotted Connection Lines */}
        <svg className="absolute -right-[90px] top-1/2 -translate-y-1/2 w-[90px] h-[60px] overflow-visible pointer-events-none">
          <motion.path d="M 0 30 L 45 30 L 45 -10 L 90 -10" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4 4" className="opacity-60" animate={{ strokeDashoffset: [-20, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
          <circle cx="90" cy="-10" r="4" fill="#22d3ee" className="shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
        </svg>
      </motion.div>

      {/* Right Side Metrics Cards */}
      <div className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {/* Card 1 */}
        <motion.div 
          className="group/card bg-gradient-to-r from-[#07132a]/95 to-[#050d1f]/95 backdrop-blur-xl border border-blue-500/30 rounded-xl p-3.5 pr-8 flex items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)] min-w-[210px] hover:border-blue-400/60 hover:shadow-[0_10px_40px_rgba(59,130,246,0.3)] transition-all cursor-pointer"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0, ...floating1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="w-10 h-10 rounded-full border border-blue-500/50 bg-blue-500/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover/card:bg-blue-500/20 group-hover/card:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all">
            <Target className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-wider group-hover/card:text-blue-300 transition-colors">On Time</p>
            <p className="text-slate-400 text-[10px]">Delivery</p>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          className="group/card bg-gradient-to-r from-[#07132a]/95 to-[#050d1f]/95 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-3.5 pr-8 flex items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)] min-w-[210px] hover:border-cyan-400/60 hover:shadow-[0_10px_40px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0, ...floating2 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="w-10 h-10 rounded-full border border-cyan-500/50 bg-cyan-500/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover/card:bg-cyan-500/20 group-hover/card:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
            <Shield className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-wider group-hover/card:text-cyan-300 transition-colors">On Budget</p>
            <p className="text-slate-400 text-[10px]">Cost Control</p>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          className="group/card bg-gradient-to-r from-[#07132a]/95 to-[#050d1f]/95 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-3.5 pr-8 flex items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)] min-w-[210px] hover:border-indigo-400/60 hover:shadow-[0_10px_40px_rgba(99,102,241,0.3)] transition-all cursor-pointer"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0, ...floating3 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="w-10 h-10 rounded-xl border border-indigo-500/50 bg-indigo-500/10 flex items-end justify-center gap-1 shrink-0 px-2 py-2 shadow-[0_0_15px_rgba(99,102,241,0.2)] group-hover/card:bg-indigo-500/20 group-hover/card:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all">
            <div className="w-1.5 h-[40%] bg-indigo-400 rounded-sm" />
            <div className="w-1.5 h-[70%] bg-cyan-400 rounded-sm" />
            <div className="w-1.5 h-[100%] bg-white rounded-sm" />
          </div>
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-wider group-hover/card:text-indigo-300 transition-colors">High Quality</p>
            <p className="text-slate-400 text-[10px]">Risk Managed</p>
          </div>
        </motion.div>
      </div>

      {/* 3D Pie Chart (Bottom Right) */}
      <motion.div 
        className="absolute bottom-6 right-16 z-30 drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]"
        initial={{ opacity: 0, scale: 0, rotateX: 60 }}
        animate={isInView ? { opacity: 1, scale: 1, rotateX: 60, ...floating0 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        whileHover={{ scale: 1.1, rotateX: 50 }}
      >
        <svg width="110" height="110" viewBox="-50 -50 100 100" className="overflow-visible transform scale-y-75 cursor-pointer">
          {/* Slice 1 (Purple) */}
          <path d="M 0 0 L 40 -20 A 45 45 0 0 1 0 45 Z" fill="url(#piePurple)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="hover:opacity-90 transition-opacity" />
          {/* Slice 2 (Blue) */}
          <path d="M -5 -3 L -45 5 A 45 45 0 0 0 -5 42 Z" fill="url(#pieBlue)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="hover:opacity-90 transition-opacity" />
          {/* Slice 3 (Cyan) - Offset */}
          <path d="M -5 -8 L 30 -30 A 45 45 0 0 0 -35 -20 Z" fill="url(#pieCyan)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="hover:opacity-90 transition-opacity" />
          
          {/* 3D Sides */}
          <path d="M 0 45 L 0 55 A 45 45 0 0 0 40 -10 L 40 -20 A 45 45 0 0 1 0 45 Z" fill="#5b21b6" />
          <path d="M -5 42 L -5 52 A 45 45 0 0 1 -45 15 L -45 5 A 45 45 0 0 0 -5 42 Z" fill="#1e40af" />
          <path d="M -40 -17 L -40 -7 A 45 45 0 0 1 35 -27 L 35 -37 A 45 45 0 0 0 -40 -17 Z" fill="#0891b2" />

          <defs>
            <linearGradient id="piePurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="pieBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="pieCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

    </div>
  );
}
