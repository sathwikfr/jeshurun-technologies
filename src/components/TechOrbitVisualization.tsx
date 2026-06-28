"use client";

import React from "react";
import { motion } from "framer-motion";

export function TechOrbitVisualization() {
  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto flex items-center justify-center">
      {/* Central Node */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="relative flex items-center justify-center w-20 h-20 bg-card rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.15)] border border-border">
          <div className="w-12 h-12 bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-inner">
            JT
          </div>
          <div className="absolute inset-0 rounded-2xl border-2 border-[#2563EB]/20 animate-ping" style={{ animationDuration: '3s' }} />
        </div>
      </div>

      {/* Orbit Rings */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {/* Ring 1 */}
        <div className="absolute w-[200px] h-[200px] rounded-full border border-border border-dashed" />
        {/* Ring 2 */}
        <div className="absolute w-[300px] h-[300px] rounded-full border border-border" />
        {/* Ring 3 */}
        <div className="absolute w-[400px] h-[400px] rounded-full border border-border border-dashed" />
      </div>

      {/* Orbiting Nodes using Framer Motion */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[200px] h-[200px] z-15 flex items-center justify-center pointer-events-none"
      >
        <div className="absolute top-0 -translate-y-1/2 w-3 h-3 rounded-full bg-[#0078D4] shadow-[0_0_10px_#0078D4]" />
        <div className="absolute bottom-0 translate-y-1/2 w-2 h-2 rounded-full bg-[#FF9900] shadow-[0_0_10px_#FF9900]" />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-[300px] h-[300px] z-15 flex items-center justify-center pointer-events-none"
      >
        <div className="absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-[#61DAFB] shadow-[0_0_12px_#61DAFB]" />
        <div className="absolute right-0 translate-x-1/2 w-3 h-3 rounded-full bg-[#326CE5] shadow-[0_0_12px_#326CE5]" />
        <div className="absolute bottom-1/4 -translate-x-1/2 w-2 h-2 rounded-full bg-[#3776AB] shadow-[0_0_10px_#3776AB]" />
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[400px] h-[400px] z-15 flex items-center justify-center pointer-events-none"
      >
        <div className="absolute top-1/4 translate-x-1/2 w-3 h-3 rounded-full bg-[#2496ED] shadow-[0_0_10px_#2496ED]" />
        <div className="absolute bottom-0 translate-y-1/2 w-4 h-4 rounded-full bg-[#8B5CF6] shadow-[0_0_15px_#8B5CF6]" />
        <div className="absolute left-1/4 -translate-y-1/2 w-2 h-2 rounded-full bg-[#EF4444] shadow-[0_0_8px_#EF4444]" />
      </motion.div>

      {/* Decorative Network Lines (Static) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0" viewBox="0 0 400 400">
        <line x1="200" y1="200" x2="100" y2="50" stroke="#0F172A" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="200" x2="350" y2="120" stroke="#0F172A" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="200" x2="80" y2="280" stroke="#0F172A" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="200" x2="280" y2="350" stroke="#0F172A" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
    </div>
  );
}
