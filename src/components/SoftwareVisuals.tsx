"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// 1. CLOUD-NATIVE VIZ
// Restyled/scaled version of InfrastructureViz's "server nodes with particle" pattern
export function CloudNativeViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "50px" });

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center relative bg-transparent overflow-hidden">
      <style>{`
        @keyframes cnServerPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; filter: drop-shadow(0 0 4px rgba(34, 197, 94, 0.6)); }
        }
        @keyframes cnDataLink {
          0% { stroke-dashoffset: 40; opacity: 0; }
          20%, 80% { opacity: 1; }
          100% { stroke-dashoffset: -40; opacity: 0; }
        }
      `}</style>

      <svg viewBox="0 0 220 80" className="w-full h-full max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Connection Paths */}
        <g stroke="rgba(37,99,235,0.15)" strokeWidth="1.5" fill="none">
          <path d="M 40 40 L 100 20" />
          <path d="M 40 40 L 100 40" />
          <path d="M 40 40 L 100 60" />
        </g>

        {/* Animated Particles flowing (Single motion along paths) */}
        <g stroke="#22C55E" strokeWidth="2" fill="none" strokeDasharray="6 30" strokeLinecap="round">
          <path 
            d="M 40 40 L 100 20" 
            style={{ 
              animation: "cnDataLink 2s linear infinite", 
              animationPlayState: isInView ? "running" : "paused" 
            }} 
          />
          <path 
            d="M 40 40 L 100 40" 
            style={{ 
              animation: "cnDataLink 2.4s linear infinite 0.3s", 
              animationPlayState: isInView ? "running" : "paused" 
            }} 
          />
          <path 
            d="M 40 40 L 100 60" 
            style={{ 
              animation: "cnDataLink 2.2s linear infinite 0.6s", 
              animationPlayState: isInView ? "running" : "paused" 
            }} 
          />
        </g>

        {/* Main Central / Load Balancer Node */}
        <rect x={12} y={26} width={28} height={28} rx={6} fill="rgba(37,99,235,0.08)" stroke="rgba(37,99,235,0.3)" strokeWidth="1.5" />
        <circle cx={26} cy={40} r={5} fill="#2563EB" />

        {/* Child Pod Nodes (pulsing sequentially on-screen) */}
        {[20, 40, 60].map((y, i) => (
          <g key={i}>
            <rect x={100} y={y - 8} width={20} height={16} rx={4} fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
            <circle 
              cx={110} 
              cy={y} 
              r={2.5} 
              fill="#22C55E" 
              style={{ 
                animation: `cnServerPulse ${2.0 + i * 0.4}s ease-in-out infinite`,
                animationPlayState: isInView ? "running" : "paused" 
              }} 
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

// 2. LEGACY MODERNIZATION VIZ
// Slow-looping cross-fade or slide transition between a "before" and "after" architecture sketch
export function LegacyModernizationViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "50px" });
  const [isAfter, setIsAfter] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setIsAfter((prev) => !prev);
    }, 3500); // 3.5s toggle loop
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center relative bg-transparent overflow-hidden">
      <AnimatePresence mode="wait">
        {!isAfter ? (
          // BEFORE: Legacy Monolith
          <motion.div
            key="before"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <svg viewBox="0 0 220 80" className="w-full h-full max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Messy connections */}
              <g stroke="rgba(239,68,68,0.2)" strokeWidth="1.2" fill="none">
                <path d="M 20 20 C 60 40, 80 10, 110 40" />
                <path d="M 20 60 C 50 20, 90 70, 110 40" />
                <path d="M 110 40 C 130 10, 170 30, 200 20" />
                <path d="M 110 40 C 140 70, 180 50, 200 60" />
              </g>
              
              {/* Monolithic Server */}
              <rect x={85} y={15} width={50} height={50} rx={8} fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" />
              <rect x={93} y={23} width={34} height={8} rx={2} fill="rgba(239,68,68,0.15)" />
              <rect x={93} y={35} width={34} height={8} rx={2} fill="rgba(239,68,68,0.15)" />
              <rect x={93} y={47} width={34} height={8} rx={2} fill="rgba(239,68,68,0.15)" />

              {/* Server Warning Lights */}
              <circle cx={121} cy={27} r={1.5} fill="#EF4444" className="animate-pulse" />
              <circle cx={121} cy={39} r={1.5} fill="#EF4444" className="animate-pulse" />
              <circle cx={121} cy={51} r={1.5} fill="#EF4444" className="animate-pulse" />

              <text x={110} y={75} textAnchor="middle" fill="#EF4444" fontSize={8} fontWeight={800} letterSpacing="0.05em">LEGACY MONOLITH</text>
            </svg>
          </motion.div>
        ) : (
          // AFTER: Decoupled Services
          <motion.div
            key="after"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <svg viewBox="0 0 220 80" className="w-full h-full max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Clean structured pipelines */}
              <g stroke="rgba(6,182,212,0.25)" strokeWidth="1.2" fill="none">
                <path d="M 20 40 L 70 40" />
                <path d="M 70 40 L 140 20" />
                <path d="M 70 40 L 140 40" />
                <path d="M 70 40 L 140 60" />
              </g>

              {/* API Gateway */}
              <rect x={55} y={28} width={30} height={24} rx={6} fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" />
              <text x={70} y={42} textAnchor="middle" fill="#06B6D4" fontSize={7} fontWeight={800}>GW</text>

              {/* 3 microservices */}
              {[20, 40, 60].map((y, i) => (
                <rect key={i} x={140} y={y - 8} width={26} height={16} rx={4} fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
              ))}
              
              <circle cx={153} cy={20} r={1.5} fill="#10B981" />
              <circle cx={153} cy={40} r={1.5} fill="#10B981" />
              <circle cx={153} cy={60} r={1.5} fill="#10B981" />

              <text x={110} y={75} textAnchor="middle" fill="#10B981" fontSize={8} fontWeight={800} letterSpacing="0.05em">API-FIRST MICROSERVICES</text>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
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
