"use client";

import React from "react";
import { motion } from "framer-motion";

export function CTABackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Subtle Radial Glows */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-[100px] opacity-70" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4]/5 rounded-full blur-[120px] opacity-50" />

      {/* Center Glow behind Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)]" />

      {/* Faint SVG Globe Silhouette (Right Side Anchored) */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-48 w-[800px] h-[800px] opacity-[0.03]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#3B82F6]" fill="none" stroke="currentColor" strokeWidth="0.2">
          {/* Latitude Lines */}
          <ellipse cx="50" cy="50" rx="45" ry="15" />
          <ellipse cx="50" cy="50" rx="45" ry="30" />
          <ellipse cx="50" cy="50" rx="45" ry="45" />
          
          {/* Longitude Lines */}
          <ellipse cx="50" cy="50" rx="15" ry="45" />
          <ellipse cx="50" cy="50" rx="30" ry="45" />
          
          <circle cx="50" cy="50" r="45" />
        </svg>
      </div>

      {/* Network Nodes & Abstract Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
        <path d="M-100 100 L200 300 L400 150 L600 400 L900 100 L1100 250" fill="none" stroke="#60A5FA" strokeWidth="1" strokeDasharray="5 5" />
        <path d="M-50 400 L150 200 L350 350 L700 150 L1050 350" fill="none" stroke="#2563EB" strokeWidth="1" strokeDasharray="4 6" />
      </svg>

      {/* Floating Data Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#2563EB]/30 shadow-[0_0_8px_rgba(37,99,235,0.2)]"
          initial={{
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh",
            opacity: Math.random() * 0.5 + 0.1,
            scale: Math.random() * 1.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50 + "vh"],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
}
