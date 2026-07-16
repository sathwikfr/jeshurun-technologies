"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";

// 1. CLOUD-NATIVE VIZ
// Restyled/scaled version of InfrastructureViz's "server nodes with particle" pattern
export function CloudNativeViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "50px" });
  const shouldReduceMotion = useReducedMotion();

  const float = (delay: number, dy = 10): any => ({
    y: shouldReduceMotion ? 0 : [`-${dy}px`, `${dy}px`, `-${dy}px`],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
  });

  return (
    <div ref={ref} className="relative w-full h-[400px] flex items-center justify-center group overflow-visible">

      {/* ── Central Kubernetes / API Gateway Core ─────────────────── */}
      <motion.div
        className="relative z-10 drop-shadow-[0_0_40px_rgba(34,197,94,0.35)] scale-90 md:scale-100"
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0, ...float(0, 6) } : { opacity: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg width="220" height="220" viewBox="0 0 200 200" className="overflow-visible">
          <defs>
            {/* Outer Shell Gradients */}
            <linearGradient id="cnTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(134,239,172,0.55)" />
              <stop offset="100%" stopColor="rgba(34,197,94,0.15)" />
            </linearGradient>
            <linearGradient id="cnLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(22,163,74,0.5)" />
              <stop offset="100%" stopColor="rgba(6,78,59,0.15)" />
            </linearGradient>
            <linearGradient id="cnRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(21,128,61,0.5)" />
              <stop offset="100%" stopColor="rgba(20,83,45,0.2)" />
            </linearGradient>

            {/* Inner Core Gradients */}
            <linearGradient id="cnCoreTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d1fae5" />
              <stop offset="100%" stopColor="#6ee7b7" />
            </linearGradient>
            <linearGradient id="cnCoreLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="cnCoreRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            <filter id="cnGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="cnPlatformGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Glowing Platform Base */}
          <motion.path
            d="M 100 130 L 168 93 L 100 56 L 32 93 Z"
            fill="rgba(21,128,61,0.35)"
            filter="url(#cnPlatformGlow)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.5 }}
          />
          <motion.path
            d="M 100 148 L 180 105 L 100 62 L 20 105 Z"
            fill="none"
            stroke="rgba(52,211,153,0.3)"
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          {/* Orbiting Kubernetes Ring (shows on hover) */}
          <g className="transition-all duration-700 opacity-0 group-hover:opacity-100" style={{ transformOrigin: '100px 65px' }}>
            <ellipse cx="100" cy="65" rx="78" ry="34" fill="none" stroke="rgba(52,211,153,0.4)" strokeWidth="1" strokeDasharray="4 4" style={{ transform: 'rotate(10deg)', transformOrigin: '100px 65px' }} />
            <ellipse cx="100" cy="65" rx="78" ry="34" fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth="1" strokeDasharray="2 6" style={{ transform: 'rotate(-20deg)', transformOrigin: '100px 65px' }} />
          </g>

          {/* Inner Core (K8s control plane) */}
          <g className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.3] origin-[100px_65px]">
            <motion.g animate={!shouldReduceMotion ? { y: [-3, 3, -3] } : {}} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              {/* Back depth faces */}
              <path d="M 100 32 L 80 42 L 80 67 L 100 52 Z" fill="rgba(16,185,129,0.25)" />
              <path d="M 100 32 L 120 42 L 120 67 L 100 52 Z" fill="rgba(5,150,105,0.25)" />
              {/* Core faces */}
              <path d="M 100 77 L 80 67 L 80 42 L 100 52 Z" fill="url(#cnCoreLeft)" filter="url(#cnGlow)" />
              <path d="M 100 77 L 120 67 L 120 42 L 100 52 Z" fill="url(#cnCoreRight)" filter="url(#cnGlow)" />
              <path d="M 100 52 L 120 42 L 100 32 L 80 42 Z" fill="url(#cnCoreTop)" filter="url(#cnGlow)" />
            </motion.g>
          </g>

          {/* Outer Glass Shell — explodes on hover */}
          {/* Left Face */}
          <g className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-6 group-hover:translate-y-3 group-hover:opacity-40">
            <path d="M 100 115 L 50 90 L 50 40 L 100 65 Z" fill="url(#cnLeft)" stroke="#4ade80" strokeWidth="0.75" />
            <path d="M 50 75 L 75 87.5" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </g>
          {/* Right Face */}
          <g className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6 group-hover:translate-y-3 group-hover:opacity-40">
            <path d="M 100 115 L 150 90 L 150 40 L 100 65 Z" fill="url(#cnRight)" stroke="#22c55e" strokeWidth="0.75" />
            <path d="M 150 75 L 125 87.5" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </g>
          {/* Top Face */}
          <g className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-12 group-hover:opacity-40">
            <path d="M 100 65 L 150 40 L 100 15 L 50 40 Z" fill="url(#cnTop)" stroke="#bbf7d0" strokeWidth="1" />
            <circle cx="100" cy="40" r="4" fill="#ffffff" filter="url(#cnGlow)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
          </g>
        </svg>
      </motion.div>

      {/* ── Floating Card: Replicas Running (Top-Right) ─────────────── */}
      <motion.div
        className="absolute top-8 right-4 md:right-8 z-20 bg-white/90 dark:bg-[#030f1a]/85 backdrop-blur-md border border-slate-200 dark:border-green-500/30 rounded-xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] w-44"
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0, ...float(0.4, 9) } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-green-500/15 dark:bg-green-500/20 rounded-md">
            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </div>
          <span className="text-[10px] text-slate-700 dark:text-green-200 font-semibold uppercase tracking-wider">Replicas</span>
        </div>
        <div className="flex items-end gap-1 h-7">
          {[65, 80, 55, 95, 70, 100].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-green-500/70 dark:bg-green-400/80 rounded-t-sm"
              initial={{ height: "10%" }}
              animate={isInView ? { height: `${h}%` } : {}}
              transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>
        <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-1.5 text-right font-medium">6 / 6 healthy</p>
      </motion.div>

      {/* ── Floating Card: CI/CD Pipeline (Bottom-Right) ──────────── */}
      <motion.div
        className="absolute bottom-14 right-0 md:-right-2 z-20 bg-white/90 dark:bg-[#030f1a]/85 backdrop-blur-md border border-slate-200 dark:border-green-500/30 rounded-xl p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] w-48"
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0, ...float(1.2, 8) } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-emerald-500/15 dark:bg-emerald-500/20 rounded-md">
            <svg className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <span className="text-[10px] text-slate-700 dark:text-emerald-200 font-semibold uppercase tracking-wider">CI / CD Pipeline</span>
        </div>
        <div className="space-y-2.5">
          {["Build", "Test", "Deploy"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <motion.div
                className="w-3.5 h-3.5 rounded-full bg-green-500 flex-shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: "spring", delay: 1 + i * 0.3 }}
              />
              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full flex-1 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ duration: 1.2, delay: 1.2 + i * 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium w-6 text-right">✓</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Floating Card: Auto-Scale Status (Left) ──────────────────── */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-0 md:left-2 z-20 bg-white/90 dark:bg-[#030f1a]/85 backdrop-blur-md border border-slate-200 dark:border-cyan-500/30 rounded-xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] w-44"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0, ...float(2, 11) } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-cyan-500/15 dark:bg-cyan-500/20 rounded-md">
            <svg className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <span className="text-[10px] text-slate-700 dark:text-cyan-200 font-semibold uppercase tracking-wider">Auto-Scale</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-medium">
            <span className="text-slate-500 dark:text-slate-400">CPU</span>
            <span className="text-cyan-600 dark:text-cyan-400">38%</span>
          </div>
          <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div className="h-full bg-cyan-400 rounded-full" initial={{ width: "0%" }} animate={isInView ? { width: "38%" } : {}} transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }} />
          </div>
          <div className="flex justify-between text-[10px] font-medium mt-2">
            <span className="text-slate-500 dark:text-slate-400">MEM</span>
            <span className="text-green-600 dark:text-green-400">61%</span>
          </div>
          <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div className="h-full bg-green-400 rounded-full" initial={{ width: "0%" }} animate={isInView ? { width: "61%" } : {}} transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }} />
          </div>
          <p className="text-[9px] text-slate-500 dark:text-slate-500 mt-2 font-medium">Scaling: <span className="text-green-500">Nominal</span></p>
        </div>
      </motion.div>

    </div>
  );
}


// 2. LEGACY MODERNIZATION VIZ
// Slow-looping cross-fade or slide transition between a "before" and "after" architecture sketch
export function LegacyModernizationViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "50px" });
  const shouldReduceMotion = useReducedMotion();
  const [isAfter, setIsAfter] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setIsAfter((prev) => !prev);
    }, 5000); // 5s toggle loop for longer reading time
    return () => clearInterval(interval);
  }, [isInView]);

  const float = (delay: number, dy = 10): any => ({
    y: shouldReduceMotion ? 0 : [`-${dy}px`, `${dy}px`, `-${dy}px`],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
  });

  return (
    <div ref={ref} className="relative w-full h-[400px] flex items-center justify-center group overflow-visible">
      
      {/* ── Central Architecture Core (SVG) ────────────────────────── */}
      <motion.div
        className="relative z-10 scale-90 md:scale-100"
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0, ...float(0, 6) } : { opacity: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg width="240" height="240" viewBox="0 0 200 200" className="overflow-visible">
          <defs>
            {/* Legacy Monolith Gradients */}
            <linearGradient id="legTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <linearGradient id="legLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            <linearGradient id="legRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>

            {/* Modern Microservices Gradients */}
            <linearGradient id="modTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="modLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="modRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>

            <filter id="glowMod" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glowLeg" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Glowing Platform Base */}
          <motion.path
            d="M 100 140 L 180 100 L 100 60 L 20 100 Z"
            fill={!isAfter ? "rgba(185,28,28,0.2)" : "rgba(4,120,87,0.2)"}
            filter="url(#glowMod)"
            transition={{ duration: 1 }}
          />
          <motion.path
            d="M 100 155 L 190 110 L 100 65 L 10 110 Z"
            fill="none"
            stroke={!isAfter ? "rgba(239,68,68,0.3)" : "rgba(52,211,153,0.3)"}
            strokeWidth="1.5"
            transition={{ duration: 1 }}
          />

          <AnimatePresence mode="wait">
            {!isAfter ? (
              // BEFORE: Legacy Monolith (Clunky, singular)
              <motion.g
                key="legacy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Clunky Data lines trying to route */}
                <path d="M 100 130 L 30 95" stroke="rgba(239,68,68,0.6)" strokeWidth="3" strokeDasharray="6 6" className="animate-[dash_1s_linear_infinite]" />
                <path d="M 100 130 L 170 95" stroke="rgba(239,68,68,0.6)" strokeWidth="3" strokeDasharray="6 6" className="animate-[dash_1.5s_linear_infinite]" />

                <g transform="translate(100, 95) scale(1.4)">
                  <path d="M 0 -35 L 35 -17.5 L 0 0 L -35 -17.5 Z" fill="url(#legTop)" />
                  <path d="M -35 -17.5 L 0 0 L 0 35 L -35 17.5 Z" fill="url(#legLeft)" />
                  <path d="M 35 -17.5 L 0 0 L 0 35 L 35 17.5 Z" fill="url(#legRight)" />
                  {/* Warning Lights */}
                  <circle cx="0" cy="15" r="3" fill="#fecaca" filter="url(#glowLeg)" className="animate-pulse" />
                  <circle cx="-15" cy="5" r="3" fill="#fecaca" filter="url(#glowLeg)" className="animate-[ping_1.5s_ease-out_infinite]" />
                </g>
              </motion.g>
            ) : (
              // AFTER: Modern Microservices (Sleek, distributed)
              <motion.g
                key="modern"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Clean Laser Routing */}
                <path d="M 100 120 L 50 95" stroke="rgba(52,211,153,0.8)" strokeWidth="2" strokeDasharray="4 6" className="animate-[dash_0.8s_linear_infinite]" />
                <path d="M 100 120 L 150 95" stroke="rgba(52,211,153,0.8)" strokeWidth="2" strokeDasharray="4 6" className="animate-[dash_1s_linear_infinite]" />
                <path d="M 100 120 L 100 65" stroke="rgba(52,211,153,0.8)" strokeWidth="2" strokeDasharray="4 6" className="animate-[dash_1.2s_linear_infinite]" />

                {/* Central API Gateway */}
                <g transform="translate(100, 115) scale(0.9)">
                  <path d="M 0 -25 L 25 -12.5 L 0 0 L -25 -12.5 Z" fill="url(#modTop)" filter="url(#glowMod)" />
                  <path d="M -25 -12.5 L 0 0 L 0 25 L -25 12.5 Z" fill="url(#modLeft)" />
                  <path d="M 25 -12.5 L 0 0 L 0 25 L 25 12.5 Z" fill="url(#modRight)" />
                </g>

                {/* Node 1 */}
                <g transform="translate(50, 90) scale(0.7)">
                  <path d="M 0 -20 L 20 -10 L 0 0 L -20 -10 Z" fill="url(#modTop)" />
                  <path d="M -20 -10 L 0 0 L 0 20 L -20 10 Z" fill="url(#modLeft)" />
                  <path d="M 20 -10 L 0 0 L 0 20 L 20 10 Z" fill="url(#modRight)" />
                </g>

                {/* Node 2 */}
                <g transform="translate(150, 90) scale(0.7)">
                  <path d="M 0 -20 L 20 -10 L 0 0 L -20 -10 Z" fill="url(#modTop)" />
                  <path d="M -20 -10 L 0 0 L 0 20 L -20 10 Z" fill="url(#modLeft)" />
                  <path d="M 20 -10 L 0 0 L 0 20 L 20 10 Z" fill="url(#modRight)" />
                </g>

                {/* Node 3 */}
                <g transform="translate(100, 60) scale(0.7)">
                  <path d="M 0 -20 L 20 -10 L 0 0 L -20 -10 Z" fill="url(#modTop)" />
                  <path d="M -20 -10 L 0 0 L 0 20 L -20 10 Z" fill="url(#modLeft)" />
                  <path d="M 20 -10 L 0 0 L 0 20 L 20 10 Z" fill="url(#modRight)" />
                </g>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </motion.div>

      {/* ── HTML Floating Cards ─────────────────────────────────────── */}
      
      {/* 1. System Health Card (Top Left) */}
      <motion.div
        className="absolute top-6 left-0 md:left-4 z-20 bg-white/90 dark:bg-[#030f1a]/85 backdrop-blur-md border rounded-xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] w-44 transition-colors duration-700"
        style={{ borderColor: !isAfter ? 'rgba(239,68,68,0.3)' : 'rgba(52,211,153,0.3)' }}
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0, ...float(0.5, 9) } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <motion.div 
            className="p-1.5 rounded-md"
            animate={{ backgroundColor: !isAfter ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)' }}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke={!isAfter ? "#ef4444" : "#10b981"} strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </motion.div>
          <span className="text-[10px] text-slate-700 dark:text-slate-200 font-semibold uppercase tracking-wider">System Health</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-medium">
            <span className="text-slate-500 dark:text-slate-400">CPU Load</span>
            <motion.span animate={{ color: !isAfter ? "#ef4444" : "#10b981" }}>{!isAfter ? "98%" : "32%"}</motion.span>
          </div>
          <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full rounded-full"
              animate={{ width: !isAfter ? "98%" : "32%", backgroundColor: !isAfter ? "#ef4444" : "#10b981" }} 
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-medium mt-1">
            <span className="text-slate-500 dark:text-slate-400">Memory</span>
            <motion.span animate={{ color: !isAfter ? "#f97316" : "#34d399" }}>{!isAfter ? "95%" : "45%"}</motion.span>
          </div>
          <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full rounded-full"
              animate={{ width: !isAfter ? "95%" : "45%", backgroundColor: !isAfter ? "#f97316" : "#34d399" }} 
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* 2. Deploy Cycle Card (Bottom Right) */}
      <motion.div
        className="absolute bottom-12 right-0 md:right-4 z-20 bg-white/90 dark:bg-[#030f1a]/85 backdrop-blur-md border rounded-xl p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] w-48 transition-colors duration-700"
        style={{ borderColor: !isAfter ? 'rgba(239,68,68,0.3)' : 'rgba(52,211,153,0.3)' }}
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0, ...float(1.2, 7) } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <motion.div className="p-1.5 rounded-md" animate={{ backgroundColor: !isAfter ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)' }}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke={!isAfter ? "#ef4444" : "#10b981"} strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </motion.div>
            <span className="text-[10px] text-slate-700 dark:text-slate-200 font-semibold uppercase tracking-wider">Deploy Cycle</span>
          </div>
          <motion.span 
            className="text-[10px] font-bold"
            animate={{ color: !isAfter ? "#ef4444" : "#10b981" }}
          >
            {!isAfter ? "4 Hours" : "5 Mins"}
          </motion.span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
          <motion.div 
            className="h-full rounded-full"
            animate={{ width: !isAfter ? "15%" : "100%", backgroundColor: !isAfter ? "#ef4444" : "#10b981" }}
            transition={{ duration: !isAfter ? 4.5 : 1.5, ease: !isAfter ? "linear" : "easeInOut" }} // slow progress for legacy, fast for modern
          />
        </div>
      </motion.div>

      {/* 3. Risk Level Indicator (Top Right) */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 right-0 md:right-8 z-20 bg-white/90 dark:bg-[#030f1a]/85 backdrop-blur-md border rounded-xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] w-40 flex items-center gap-3 transition-colors duration-700"
        style={{ borderColor: !isAfter ? 'rgba(239,68,68,0.3)' : 'rgba(52,211,153,0.3)' }}
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0, ...float(1.8, 10) } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.div 
          className="relative flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
          animate={{ backgroundColor: !isAfter ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)' }}
        >
          <motion.div 
            className="absolute inset-0 rounded-full border-2"
            animate={{ borderColor: !isAfter ? 'rgba(239,68,68,0.5)' : 'rgba(16,185,129,0.5)', scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: !isAfter ? 1 : 2, repeat: Infinity, ease: "easeOut" }} // Fast pulse for legacy risk
          />
          <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24" fill="none" stroke={!isAfter ? "#ef4444" : "#10b981"} strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </motion.div>
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Architecture</span>
          <motion.span 
            className="text-xs font-bold"
            animate={{ color: !isAfter ? "#ef4444" : "#10b981" }}
          >
            {!isAfter ? "High Risk" : "Stable"}
          </motion.span>
        </div>
      </motion.div>

    </div>
  );
}

// 3. MOBILE ARCHITECTURE VIZ
// Device-frame outline with a subtle shimmer/scroll effect inside the screen area
export function MobileArchitectureViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "50px" });

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center relative bg-transparent overflow-hidden">
      <style>{`
        @keyframes mobileShimmer {
          0% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <svg viewBox="0 0 220 80" className="w-full h-full max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Phone Frame */}
        <rect x={85} y={6} width={50} height={68} rx={9} fill="rgba(124,58,237,0.04)" stroke="rgba(124,58,237,0.35)" strokeWidth={1.5} />
        
        {/* Notch */}
        <path d="M 103 6 L 117 6 C 117 8, 103 8, 103 6" fill="rgba(124,58,237,0.35)" />

        {/* Screen Clip Area */}
        <g clipPath="url(#phone-screen-clip)">
          <defs>
            <clipPath id="phone-screen-clip">
              <rect x={88} y={10} width={44} height={60} rx={6} />
            </clipPath>
          </defs>

          {/* Scrolling UI items */}
          <g 
            style={{ 
              animation: "mobileShimmer 4s ease-in-out infinite", 
              animationPlayState: isInView ? "running" : "paused" 
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={92} y={14 + i * 18} width={36} height={12} rx={3} fill="rgba(124,58,237,0.08)" stroke="rgba(124,58,237,0.2)" strokeWidth={0.5} />
                <rect x={96} y={18 + i * 18} width={14} height={2} rx={1} fill="rgba(124,58,237,0.3)" />
                <rect x={96} y={22 + i * 18} width={24} height={1.5} rx={0.7} fill="rgba(124,58,237,0.15)" />
              </g>
            ))}
          </g>
        </g>
        
        {/* Home Button Indicator */}
        <circle cx={110} cy={70} r={2} fill="rgba(124,58,237,0.3)" />
      </svg>
    </div>
  );
}

// 4. ENTERPRISE API VIZ
// Animated connection lines drawing between 2-3 nodes — simple SVG stroke-dashoffset animation
export function EnterpriseAPIViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "50px" });

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center relative bg-transparent overflow-hidden">
      <style>{`
        @keyframes apiFlow {
          0% { stroke-dashoffset: 20; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>

      <svg viewBox="0 0 220 80" className="w-full h-full max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Nodes */}
        {/* Client (left) */}
        <circle cx={35} cy={40} r={10} fill="rgba(79,70,229,0.08)" stroke="rgba(79,70,229,0.35)" strokeWidth={1.5} />
        <text x={35} y={43} textAnchor="middle" fill="#4F46E5" fontSize={8} fontWeight={800}>CLI</text>

        {/* API Gateway (center) */}
        <circle cx={110} cy={40} r={14} fill="rgba(79,70,229,0.12)" stroke="rgba(79,70,229,0.5)" strokeWidth={2} />
        <text x={110} y={43} textAnchor="middle" fill="#4F46E5" fontSize={8} fontWeight={800}>API</text>

        {/* Database (right) */}
        <circle cx={185} cy={40} r={10} fill="rgba(79,70,229,0.08)" stroke="rgba(79,70,229,0.35)" strokeWidth={1.5} />
        <text x={185} y={43} textAnchor="middle" fill="#4F46E5" fontSize={8} fontWeight={800}>DB</text>

        {/* Connection line 1: Client -> API */}
        <path 
          d="M 45 40 L 96 40" 
          stroke="#4F46E5" 
          strokeWidth="1.5" 
          strokeDasharray="4 4" 
          style={{ 
            animation: "apiFlow 1.5s linear infinite",
            animationPlayState: isInView ? "running" : "paused"
          }} 
        />

        {/* Connection line 2: API -> DB */}
        <path 
          d="M 124 40 L 175 40" 
          stroke="#4F46E5" 
          strokeWidth="1.5" 
          strokeDasharray="4 4" 
          style={{ 
            animation: "apiFlow 2s linear infinite",
            animationPlayState: isInView ? "running" : "paused"
          }} 
        />
      </svg>
    </div>
  );
}

// 5. DATA PIPELINES VIZ
// Particles flowing left-to-right along a pipe outline, reusing the dataPacket keyframe inline
export function DataPipelinesViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "50px" });

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center relative bg-transparent overflow-hidden">
      <style>{`
        @keyframes dpPacket {
          0% { stroke-dashoffset: 100; opacity: 0; }
          10%, 90% { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
      `}</style>

      <svg viewBox="0 0 220 80" className="w-full h-full max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Pipe Outline */}
        <path 
          d="M 20 40 L 200 40" 
          stroke="rgba(245,158,11,0.15)" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />

        {/* Animated Particles flowing along the pipe */}
        <path 
          d="M 20 40 L 200 40" 
          stroke="#F59E0B" 
          strokeWidth="2" 
          strokeDasharray="8 60" 
          strokeLinecap="round"
          style={{ 
            animation: "dpPacket 3s linear infinite", 
            animationPlayState: isInView ? "running" : "paused" 
          }} 
        />

        {/* Ingest Source Node (Left) */}
        <circle cx={20} cy={40} r={5} fill="#F59E0B" />
        
        {/* Processing Node (Center) */}
        <rect x={98} y={28} width={24} height={24} rx={5} fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" />
        <circle cx={110} cy={40} r={4} fill="#F59E0B" className="animate-pulse" />

        {/* Warehouse Dest Node (Right) */}
        <circle cx={200} cy={40} r={6} fill="none" stroke="#F59E0B" strokeWidth="2" />
        <circle cx={200} cy={40} r={2} fill="#F59E0B" />
      </svg>
    </div>
  );
}
