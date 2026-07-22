"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AwsLogo, AzureLogo, GcpLogo } from "@/components/TechLogos";
import { Activity, Server } from "lucide-react";

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

export function TechOrbitVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();
  
  const floatingCore = useFloatingAnimation(0);
  const floatingAws = useFloatingAnimation(1);
  const floatingAzure = useFloatingAnimation(2);
  const floatingGcp = useFloatingAnimation(3);

  return (
    <div ref={ref} className="relative w-full h-[450px] max-w-[500px] mx-auto flex items-center justify-center perspective-[1200px] group">
      
      {/* Container holding the SVG isometric grid and nodes */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center drop-shadow-[0_20px_40px_rgba(6,182,212,0.3)]"
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0, ...floatingCore } : { opacity: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg width="400" height="400" viewBox="0 0 400 400" className="overflow-visible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <defs>
            {/* SVG Gradients for Isometric Blocks */}
            <linearGradient id="coreTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="coreLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="coreRight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.6" />
            </linearGradient>

            <linearGradient id="nodeTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F1F5F9" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="nodeLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="nodeRight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#64748B" stopOpacity="0.6" />
            </linearGradient>

            <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="platformGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            
            {/* Server Core Gradients */}
            <linearGradient id="serverTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient id="serverLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <linearGradient id="serverRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* Isometric Base Grid Layer */}
          <g transform="translate(200, 220) scale(1.5)">
            {/* Base platform */}
            <path d="M0 -30 L100 20 L0 70 L-100 20 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(6,182,212,0.15)" strokeWidth="1" />
            
            {/* Grid Lines */}
            <path d="M-50 -5 L50 45" stroke="rgba(6,182,212,0.1)" strokeWidth="1" />
            <path d="M50 -5 L-50 45" stroke="rgba(6,182,212,0.1)" strokeWidth="1" />

            {/* Glowing Data Lines connecting to nodes */}
            <path d="M0 20 L60 -10" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_3s_linear_infinite]" />
            <path d="M0 20 L-60 50" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_3s_linear_infinite]" />
            <path d="M0 20 L-60 -10" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_3s_linear_infinite]" />
          </g>

          {/* Central Core Server Stack */}
          <g transform="translate(200, 200) scale(1.5)">
            {/* Glowing Platform Base */}
            <motion.path
              d="M 0 25 L 68 -12 L 0 -49 L -68 -12 Z"
              fill="rgba(6, 182, 212, 0.2)"
              filter="url(#platformGlow)"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.5 }}
            />
            <motion.path
              d="M 0 43 L 80 0 L 0 -43 L -80 0 Z"
              fill="none"
              stroke="rgba(6, 182, 212, 0.4)"
              strokeWidth="1.5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* Orbiting Tech Ring (shows on hover) */}
            <g className="transition-all duration-700 opacity-0 group-hover:opacity-100" style={{ transformOrigin: '0px -10px' }}>
              <ellipse cx="0" cy="-10" rx="78" ry="34" fill="none" stroke="rgba(37, 99, 235, 0.6)" strokeWidth="1" strokeDasharray="4 4" style={{ transform: 'rotate(10deg)', transformOrigin: '0px -10px' }} />
              <ellipse cx="0" cy="-10" rx="78" ry="34" fill="none" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="1" strokeDasharray="2 6" style={{ transform: 'rotate(-20deg)', transformOrigin: '0px -10px' }} />
            </g>

            {/* Inner Core (Server Stack) */}
            <g className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.15] origin-[0px_-10px]">
              <motion.g animate={!shouldReduceMotion ? { y: [-3, 3, -3] } : {}} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                {/* Back depth faces (shadows) */}
                <path d="M 0 -43 L -20 -33 L -20 -8 L 0 -23 Z" fill="rgba(8, 145, 178, 0.25)" />
                <path d="M 0 -43 L 20 -33 L 20 -8 L 0 -23 Z" fill="rgba(14, 165, 233, 0.25)" />
                
                {/* Server Unit 1 (Bottom) */}
                <g transform="translate(0, 5)">
                  <path d="M 0 -23 L -20 -33 L -20 -23 L 0 -13 Z" fill="url(#serverLeft)" filter="url(#coreGlow)" />
                  <path d="M 0 -23 L 20 -33 L 20 -23 L 0 -13 Z" fill="url(#serverRight)" filter="url(#coreGlow)" />
                  <path d="M 0 -43 L 20 -33 L 0 -23 L -20 -33 Z" fill="url(#serverTop)" filter="url(#coreGlow)" />
                </g>
                
                {/* Server Unit 2 (Middle) */}
                <g transform="translate(0, -5)">
                  <path d="M 0 -23 L -20 -33 L -20 -23 L 0 -13 Z" fill="url(#serverLeft)" filter="url(#coreGlow)" />
                  <path d="M 0 -23 L 20 -33 L 20 -23 L 0 -13 Z" fill="url(#serverRight)" filter="url(#coreGlow)" />
                  <path d="M 0 -43 L 20 -33 L 0 -23 L -20 -33 Z" fill="url(#serverTop)" filter="url(#coreGlow)" />
                </g>

                {/* Server Unit 3 (Top) */}
                <g transform="translate(0, -15)">
                  <path d="M 0 -23 L -20 -33 L -20 -23 L 0 -13 Z" fill="url(#serverLeft)" filter="url(#coreGlow)" />
                  <path d="M 0 -23 L 20 -33 L 20 -23 L 0 -13 Z" fill="url(#serverRight)" filter="url(#coreGlow)" />
                  <path d="M 0 -43 L 20 -33 L 0 -23 L -20 -33 Z" fill="url(#serverTop)" filter="url(#coreGlow)" />
                  
                  {/* Server lights */}
                  <circle cx="-12" cy="-27" r="1.5" fill="#fff" filter="url(#coreGlow)" className="animate-pulse" />
                  <circle cx="-6" cy="-24" r="1.5" fill="#38bdf8" filter="url(#coreGlow)" className="animate-pulse" style={{ animationDelay: '200ms' }} />
                </g>
              </motion.g>
            </g>

            {/* Outer Glass Shell — explodes on hover */}
            {/* Left Face */}
            <g className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-6 group-hover:translate-y-3 group-hover:opacity-40">
              <path d="M 0 40 L -50 15 L -50 -35 L 0 -10 Z" fill="url(#coreLeft)" stroke="#38bdf8" strokeWidth="0.75" />
              <path d="M -50 0 L -25 12.5" stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            </g>
            {/* Right Face */}
            <g className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6 group-hover:translate-y-3 group-hover:opacity-40">
              <path d="M 0 40 L 50 15 L 50 -35 L 0 -10 Z" fill="url(#coreRight)" stroke="#3b82f6" strokeWidth="0.75" />
              <path d="M 50 0 L 25 12.5" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            </g>
            {/* Top Face */}
            <g className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-12 group-hover:opacity-40">
              <path d="M 0 -10 L 50 -35 L 0 -60 L -50 -35 Z" fill="url(#coreTop)" stroke="#bae6fd" strokeWidth="1" />
              <circle cx="0" cy="-35" r="4" fill="#ffffff" filter="url(#coreGlow)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
            </g>
          </g>
        </svg>

        {/* Orbiting Nodes (Absolute positioned HTML Elements over SVG) */}
        
        {/* AWS Node */}
        <motion.div 
          className="absolute z-30" 
          style={{ top: "30%", left: "70%" }}
          animate={floatingAws}
        >
          <div className="relative">
            {/* Isometric Pedestal SVG */}
            <svg width="60" height="60" viewBox="0 0 60 60" className="absolute top-4 left-1/2 -translate-x-1/2 -z-10 overflow-visible">
              <g transform="translate(30, 20) scale(0.6)">
                <ellipse cx="0" cy="30" rx="20" ry="10" fill="rgba(0,0,0,0.2)" filter="blur(2px)" />
                <path d="M0 -15 L20 -5 L0 5 L-20 -5 Z" fill="url(#nodeTop)" />
                <path d="M-20 -5 L0 5 L0 20 L-20 10 Z" fill="url(#nodeLeft)" />
                <path d="M20 -5 L0 5 L0 20 L20 10 Z" fill="url(#nodeRight)" />
              </g>
            </svg>
            <div className="w-12 h-12 bg-white dark:bg-[#161616] rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.15)] border border-[#FF9900]/40 flex items-center justify-center p-2">
              <AwsLogo className="w-full h-full object-contain" />
            </div>
          </div>
        </motion.div>

        {/* Azure Node */}
        <motion.div 
          className="absolute z-30" 
          style={{ top: "70%", left: "20%" }}
          animate={floatingAzure}
        >
          <div className="relative">
            <svg width="60" height="60" viewBox="0 0 60 60" className="absolute top-4 left-1/2 -translate-x-1/2 -z-10 overflow-visible">
              <g transform="translate(30, 20) scale(0.6)">
                <ellipse cx="0" cy="30" rx="20" ry="10" fill="rgba(0,0,0,0.2)" filter="blur(2px)" />
                <path d="M0 -15 L20 -5 L0 5 L-20 -5 Z" fill="url(#nodeTop)" />
                <path d="M-20 -5 L0 5 L0 20 L-20 10 Z" fill="url(#nodeLeft)" />
                <path d="M20 -5 L0 5 L0 20 L20 10 Z" fill="url(#nodeRight)" />
              </g>
            </svg>
            <div className="w-12 h-12 bg-white dark:bg-[#161616] rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.15)] border border-[#00A4EF]/40 flex items-center justify-center p-2">
              <AzureLogo className="w-full h-full object-contain" />
            </div>
          </div>
        </motion.div>

        {/* GCP Node */}
        <motion.div 
          className="absolute z-30" 
          style={{ top: "25%", left: "15%" }}
          animate={floatingGcp}
        >
          <div className="relative">
            <svg width="60" height="60" viewBox="0 0 60 60" className="absolute top-4 left-1/2 -translate-x-1/2 -z-10 overflow-visible">
              <g transform="translate(30, 20) scale(0.6)">
                <ellipse cx="0" cy="30" rx="20" ry="10" fill="rgba(0,0,0,0.2)" filter="blur(2px)" />
                <path d="M0 -15 L20 -5 L0 5 L-20 -5 Z" fill="url(#nodeTop)" />
                <path d="M-20 -5 L0 5 L0 20 L-20 10 Z" fill="url(#nodeLeft)" />
                <path d="M20 -5 L0 5 L0 20 L20 10 Z" fill="url(#nodeRight)" />
              </g>
            </svg>
            <div className="w-12 h-12 bg-white dark:bg-[#161616] rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.15)] border border-[#4285F4]/40 flex items-center justify-center p-2">
              <GcpLogo className="w-full h-full object-contain" />
            </div>
          </div>
        </motion.div>

      </motion.div>

      {/* Floating UI Cards */}
      <motion.div 
        className="absolute top-10 right-2 md:right-4 z-40 bg-white dark:bg-[#161616] border border-slate-200 dark:border-cyan-500/30 rounded-xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-48"
        initial={{ opacity: 0, y: 30, x: 20 }}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-green-500/10 dark:bg-green-500/20 rounded-md text-green-600 dark:text-green-400">
            <Activity className="w-4 h-4" />
          </div>
          <span className="text-[10px] text-slate-800 dark:text-green-300 font-semibold uppercase tracking-wider">Cluster Health</span>
        </div>
        <div className="flex justify-between items-center px-1">
          <span className="text-sm font-medium dark:text-slate-200">Uptime</span>
          <span className="text-sm font-bold text-green-600 dark:text-green-400">99.999%</span>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-12 left-2 md:left-4 z-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-blue-500/30 rounded-xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-44"
        initial={{ opacity: 0, y: -30, x: -20 }}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-blue-500/10 dark:bg-blue-500/20 rounded-md text-blue-600 dark:text-blue-400">
            <Server className="w-4 h-4" />
          </div>
          <span className="text-[10px] text-slate-800 dark:text-blue-300 font-semibold uppercase tracking-wider">Active Nodes</span>
        </div>
        <div className="flex justify-between items-end gap-1 h-8 px-1">
          {[...Array(6)].map((_, i) => (
             <motion.div key={i} className="w-3 bg-blue-500/80 rounded-t-sm flex-1 shadow-[0_0_8px_rgba(59,130,246,0.6)]" initial={{ height: "20%" }} animate={{ height: `${[45, 80, 55, 95, 70, 60][i]}%` }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "mirror", delay: i * 0.15 }} />
           ))}
        </div>
      </motion.div>

    </div>
  );
}
