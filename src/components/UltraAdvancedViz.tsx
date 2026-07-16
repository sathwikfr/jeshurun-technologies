"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Cpu, Zap, Activity, ShieldAlert, Network, Workflow, Layers, Eye } from "lucide-react";

/**
 * ULTRA MODE: Quantum Core Visualization
 * A hyper-advanced isometric component built with raw SVGs, Framer Motion, 
 * and deep Glassmorphism for Awwwards-level aesthetics.
 */
export function UltraAdvancedViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  const shouldReduceMotion = useReducedMotion();

  // Multi-layered floating animations for zero-gravity feel
  const floatBase = (delay: number, amplitude: number = 10, duration: number = 6): any => ({
    y: shouldReduceMotion ? 0 : [`-${amplitude}px`, `${amplitude}px`, `-${amplitude}px`],
    transition: { duration, repeat: Infinity, ease: "easeInOut", delay },
  });

  const rotateFloat = (delay: number): any => ({
    y: shouldReduceMotion ? 0 : ["-15px", "15px", "-15px"],
    rotateZ: shouldReduceMotion ? 0 : [-2, 2, -2],
    rotateX: shouldReduceMotion ? 0 : [5, -5, 5],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut", delay },
  });

  return (
    <div 
      ref={ref} 
      className="relative w-full max-w-[1000px] mx-auto h-[500px] md:h-[650px] flex items-center justify-center perspective-[2500px] group overflow-visible"
    >
      {/* ── AMBIENT ENVIRONMENT (Particles & Grids) ────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        {/* Animated Cyber Grid */}
        <div 
          className="absolute inset-0 transition-transform duration-[2000ms] group-hover:scale-110"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(34, 211, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 255, 0.05) 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            transform: 'rotateX(60deg) translateY(-100px) translateZ(-200px)'
          }} 
        />
        {/* Core Radiance Blobs */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* ── HYPER-ADVANCED ISOMETRIC SVG CORE ────────────────────────────── */}
      <motion.div
        className="relative z-10 scale-[0.6] sm:scale-75 md:scale-100 transform-style-3d drop-shadow-[0_0_50px_rgba(34,211,255,0.4)]"
        initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0, rotateX: 0, ...floatBase(0, 15, 8) } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg width="600" height="600" viewBox="0 0 400 400" className="overflow-visible">
          <defs>
            {/* Ultra Gradients - Inner Core (Hot Plasma) */}
            <linearGradient id="coreTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cffafe" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient id="coreLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <linearGradient id="coreRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#164e63" />
            </linearGradient>

            {/* Ultra Gradients - Outer Magnetic Shell (Glassy Purple/Cyan) */}
            <linearGradient id="shellTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(167,139,250,0.5)" />
              <stop offset="100%" stopColor="rgba(45,212,191,0.2)" />
            </linearGradient>
            <linearGradient id="shellLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(124,58,237,0.4)" />
              <stop offset="100%" stopColor="rgba(30,58,138,0.1)" />
            </linearGradient>
            <linearGradient id="shellRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(79,70,229,0.4)" />
              <stop offset="100%" stopColor="rgba(15,23,42,0.2)" />
            </linearGradient>

            {/* Bloom Filters */}
            <filter id="intenseBloom" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" result="blur1" />
              <feGaussianBlur stdDeviation="15" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <filter id="lightBloom" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* 1. Base Anti-Gravity Pedestal */}
          <g className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-8">
            <path d="M 200 320 L 320 260 L 200 200 L 80 260 Z" fill="rgba(15,23,42,0.6)" stroke="#38bdf8" strokeWidth="1" filter="url(#lightBloom)" />
            <path d="M 200 340 L 340 270 L 200 200 L 60 270 Z" fill="none" stroke="rgba(34,211,255,0.4)" strokeWidth="2" strokeDasharray="10 10" className="animate-[dash_4s_linear_infinite]" />
          </g>

          {/* 2. Quantum Data Streams (Rings) */}
          <g className="transition-all duration-[1200ms] opacity-0 group-hover:opacity-100 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transformOrigin: '200px 200px' }}>
            <ellipse cx="200" cy="200" rx="140" ry="60" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4 12" style={{ transform: 'rotate(15deg)', transformOrigin: '200px 200px' }} filter="url(#intenseBloom)" />
            <ellipse cx="200" cy="200" rx="130" ry="50" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="20 40" style={{ transform: 'rotate(-25deg)', transformOrigin: '200px 200px' }} filter="url(#intenseBloom)" />
            
            {/* Orbiting Orbs */}
            <circle cx="60" cy="235" r="4" fill="#fff" filter="url(#intenseBloom)" />
            <circle cx="330" cy="165" r="3" fill="#22d3ee" filter="url(#intenseBloom)" />
          </g>

          {/* 3. The INNER CORE (Pulsing Energy Matrix) */}
          <g className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-125 origin-[200px_200px]">
            <motion.g animate={!shouldReduceMotion ? { y: [-6, 6, -6] } : {}} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              {/* Back Faces for Depth */}
              <path d="M 200 130 L 160 150 L 160 200 L 200 170 Z" fill="rgba(8,145,178,0.4)" />
              <path d="M 200 130 L 240 150 L 240 200 L 200 170 Z" fill="rgba(22,78,99,0.4)" />
              
              {/* Front Faces */}
              <path d="M 200 220 L 160 200 L 160 150 L 200 170 Z" fill="url(#coreLeft)" filter="url(#intenseBloom)" />
              <path d="M 200 220 L 240 200 L 240 150 L 200 170 Z" fill="url(#coreRight)" filter="url(#intenseBloom)" />
              <path d="M 200 170 L 240 150 L 200 130 L 160 150 Z" fill="url(#coreTop)" filter="url(#intenseBloom)" />
              
              {/* Internal Circuit Lines */}
              <path d="M 160 175 L 180 185 L 180 205" stroke="#cffafe" strokeWidth="1.5" fill="none" opacity="0.8" />
              <path d="M 240 175 L 220 185 L 220 205" stroke="#cffafe" strokeWidth="1.5" fill="none" opacity="0.5" />
            </motion.g>
          </g>

          {/* 4. The EXPLOSIVE OUTER MAGNETIC SHELL */}
          
          {/* Shell: Left Bottom Wing */}
          <g className="transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-[40px] group-hover:translate-y-[20px] group-hover:opacity-30 origin-[200px_200px]">
            <path d="M 200 270 L 100 220 L 100 120 L 200 170 Z" fill="url(#shellLeft)" stroke="#a855f7" strokeWidth="1.5" />
            <path d="M 100 170 L 150 195" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            {/* Tech Dots */}
            <circle cx="120" cy="140" r="2" fill="#fff" opacity="0.5" />
            <circle cx="120" cy="150" r="2" fill="#fff" opacity="0.5" />
          </g>
          
          {/* Shell: Right Bottom Wing */}
          <g className="transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[40px] group-hover:translate-y-[20px] group-hover:opacity-30 origin-[200px_200px]">
            <path d="M 200 270 L 300 220 L 300 120 L 200 170 Z" fill="url(#shellRight)" stroke="#3b82f6" strokeWidth="1.5" />
            <path d="M 300 170 L 250 195" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            {/* Tech Dots */}
            <circle cx="280" cy="140" r="2" fill="#fff" opacity="0.5" />
            <circle cx="280" cy="150" r="2" fill="#fff" opacity="0.5" />
          </g>

          {/* Shell: Top Cap (Lifts up aggressively) */}
          <g className="transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[60px] group-hover:opacity-30 origin-[200px_200px]">
            <path d="M 200 170 L 300 120 L 200 70 L 100 120 Z" fill="url(#shellTop)" stroke="#2dd4bf" strokeWidth="2" />
            {/* Cyber Circuit overlay on Top */}
            <path d="M 150 120 L 200 145 L 250 120" stroke="#5eead4" strokeWidth="1.5" fill="none" opacity="0.6" />
            <circle cx="200" cy="145" r="3" fill="#fff" filter="url(#intenseBloom)" />
          </g>

          {/* Central Hover Laser Beam (Only visible on hover) */}
          <g className="transition-all duration-[1200ms] opacity-0 group-hover:opacity-100 ease-out">
            <rect x="198" y="0" width="4" height="200" fill="url(#coreLeft)" filter="url(#intenseBloom)" />
            <circle cx="200" cy="0" r="8" fill="#fff" filter="url(#intenseBloom)" />
          </g>
        </svg>
      </motion.div>


      {/* ── ZERO-GRAVITY GLASSMORPHIC UI CARDS ────────────────────────────── */}
      
      {/* 1. TOP LEFT: Core Stability Radar */}
      <motion.div
        className="absolute top-[5%] md:top-[15%] left-0 md:left-4 z-20 bg-[#030914]/80 backdrop-blur-xl border border-[#22d3ee]/30 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] w-52 md:w-64"
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, x: -50, rotateY: 20 }}
        animate={isInView ? { opacity: 1, x: 0, rotateY: 0, ...rotateFloat(0) } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22d3ee]/10 border border-[#22d3ee]/50 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,255,0.3)]">
              <ShieldAlert className="w-5 h-5 text-[#22d3ee]" />
            </div>
            <div>
              <p className="text-[10px] text-[#22d3ee] font-bold uppercase tracking-[0.2em] leading-tight">Quantum</p>
              <p className="text-sm text-white font-medium">Stability Field</p>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,255,1)] animate-pulse" />
        </div>
        
        {/* Animated Radar Graph */}
        <div className="h-16 w-full relative bg-[#0a1930] rounded-lg border border-white/5 overflow-hidden flex items-end px-1 pb-1 gap-1">
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
          
          {/* Bars */}
          {[60, 40, 80, 50, 90, 70, 100, 60, 85].map((h, i) => (
             <motion.div 
               key={i} 
               className="flex-1 rounded-sm bg-gradient-to-t from-[#0891b2] to-[#22d3ee] shadow-[0_0_8px_rgba(34,211,255,0.5)] relative z-10"
               initial={{ height: "10%" }}
               animate={isInView ? { height: `${h}%` } : {}}
               transition={{ duration: 1.5, delay: 0.5 + i * 0.1, type: "spring", bounce: 0.4 }}
             />
          ))}
        </div>
      </motion.div>

      {/* 2. BOTTOM LEFT: Neural Link Active */}
      <motion.div
        className="absolute bottom-[5%] md:bottom-[15%] left-4 md:left-[10%] z-30 bg-[#030914]/80 backdrop-blur-xl border border-[#a855f7]/30 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] w-48"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1, ...floatBase(1, 12, 7) } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="absolute inset-0 bg-[#a855f7] blur-md opacity-50 rounded-full" />
            <div className="relative w-8 h-8 rounded-full bg-[#1e1b4b] border border-[#a855f7] flex items-center justify-center">
              <Network className="w-4 h-4 text-[#d8b4fe]" />
            </div>
          </div>
          <div>
            <p className="text-[9px] text-[#c084fc] font-bold uppercase tracking-widest">Neural Net</p>
            <p className="text-xs text-white font-semibold">Synced</p>
          </div>
        </div>
        <div className="w-full bg-[#1e1b4b] rounded-full h-1.5 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#7e22ce] to-[#d8b4fe] rounded-full relative"
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
          >
             <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/40 blur-sm animate-[shimmer_2s_infinite]" />
          </motion.div>
        </div>
      </motion.div>

      {/* 3. RIGHT MIDDLE: Processing Threads */}
      <motion.div
        className="absolute top-[40%] md:top-1/2 -translate-y-1/2 right-0 md:right-4 z-20 bg-[#030914]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] w-56 md:w-64"
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, x: 50, rotateY: -20 }}
        animate={isInView ? { opacity: 1, x: 0, rotateY: 0, ...rotateFloat(2.5) } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
      >
        <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-3">
          <div>
            <h4 className="text-white text-sm font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#38bdf8]" /> Processing Threads
            </h4>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-medium">Qubit Distribution</p>
          </div>
          <div className="bg-[#38bdf8]/10 text-[#38bdf8] text-[9px] font-bold px-2 py-1 rounded-md border border-[#38bdf8]/30">
            99.9%
          </div>
        </div>

        <div className="space-y-3">
          {/* Thread 1 */}
          <div className="group/thread">
            <div className="flex justify-between text-[10px] font-semibold text-slate-300 mb-1">
              <span>Logical Qubits</span>
              <span className="text-[#38bdf8]">4,096</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div className="h-full bg-[#38bdf8] rounded-full shadow-[0_0_8px_#38bdf8]" initial={{ width: "0%" }} animate={isInView ? { width: "85%" } : {}} transition={{ duration: 1.5, delay: 1.2 }} />
            </div>
          </div>
          
          {/* Thread 2 */}
          <div className="group/thread">
            <div className="flex justify-between text-[10px] font-semibold text-slate-300 mb-1">
              <span>Error Correction</span>
              <span className="text-[#a855f7]">Active</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div className="h-full bg-[#a855f7] rounded-full shadow-[0_0_8px_#a855f7]" initial={{ width: "0%" }} animate={isInView ? { width: "65%" } : {}} transition={{ duration: 1.5, delay: 1.4 }} />
            </div>
          </div>

          {/* Thread 3 */}
          <div className="group/thread">
            <div className="flex justify-between text-[10px] font-semibold text-slate-300 mb-1">
              <span>Entanglement Rate</span>
              <span className="text-[#10b981]">Optimum</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div className="h-full bg-[#10b981] rounded-full shadow-[0_0_8px_#10b981]" initial={{ width: "0%" }} animate={isInView ? { width: "95%" } : {}} transition={{ duration: 1.5, delay: 1.6 }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hover Instruction Chip (Disappears on hover) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center gap-2 shadow-2xl">
          <Eye className="w-4 h-4 text-white animate-pulse" />
          <span className="text-xs text-white font-medium uppercase tracking-widest">Hover to Explode Core</span>
        </div>
      </div>

    </div>
  );
}
