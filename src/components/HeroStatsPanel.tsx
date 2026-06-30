"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { Briefcase, Layers, Globe, Headset } from "lucide-react";

function AnimatedCounter({ target, suffix = "", prefix = "", delay = 0 }: { target: number, suffix?: string, prefix?: string, delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    mass: 1
  });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(target);
      }, delay);
    }
  }, [isInView, motionValue, target, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplay(Math.round(latest).toLocaleString("en-US"));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

const statsData = [
  {
    id: 1,
    icon: <Briefcase className="w-6 h-6 text-blue-400" strokeWidth={1.5} />,
    number: 150,
    suffix: "+",
    label: "PROJECTS DELIVERED",
    description: "Successfully delivering enterprise solutions worldwide.",
    delay: 0,
  },
  {
    id: 2,
    icon: <Layers className="w-6 h-6 text-blue-400" strokeWidth={1.5} />,
    number: 20,
    suffix: "+",
    label: "TECHNOLOGY DOMAINS",
    description: "Deep expertise across modern enterprise tech stacks.",
    delay: 150,
  },
  {
    id: 3,
    icon: <Globe className="w-6 h-6 text-blue-400" strokeWidth={1.5} />,
    number: 6,
    suffix: "",
    label: "GLOBAL DELIVERY HUBS",
    description: "Distributed engineering teams across key timezones.",
    delay: 300,
  },
  {
    id: 4,
    icon: <Headset className="w-6 h-6 text-blue-400" strokeWidth={1.5} />,
    number: 24,
    suffix: "/7",
    label: "ENTERPRISE SUPPORT",
    description: "Continuous monitoring and proactive system reliability.",
    delay: 450,
  },
];

export function HeroStatsPanel() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full relative z-30 pointer-events-auto pb-0 mt-0 lg:mt-2 flex justify-center">
      {/* 
        ONE LARGE GLASS PANEL
      */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full rounded-[32px] overflow-hidden"
        style={{
          backgroundColor: "rgba(13,23,42,0.72)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Animated border glow to connect with hero */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent opacity-80" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[30px] bg-blue-500/10 blur-[30px] rounded-full pointer-events-none" />

        {/* Background Effects */}
        {/* 1. Subtle Animated Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-cyan-900/5 to-transparent pointer-events-none" />
        
        {/* 2. Moving Noise Texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />

        {/* 3. Slow Floating Particles (Static dots via CSS for performance/simplicity) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/20"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%" 
              }}
              animate={{ 
                x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                y: [Math.random() * 100 + "%", Math.random() * 100 + "%"]
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* 4. Glass reflection moving left to right over 12s */}
        <motion.div
          className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] pointer-events-none"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity }}
        />

        {/* Panel Content Layout */}
        <div className="relative z-10 flex flex-col md:grid md:grid-cols-2 xl:grid-cols-4 w-full">
          {statsData.map((stat, index) => (
            <div key={stat.id} className="relative group">
              {/* Vertical Divider (Except for last item in row/desktop) */}
              {index !== statsData.length - 1 && (
                <div className="hidden xl:block absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent transition-colors duration-300 group-hover:via-white/20" />
              )}
              {/* Tablet Dividers */}
              {index % 2 === 0 && (
                <div className="hidden md:block xl:hidden absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent transition-colors duration-300 group-hover:via-white/20" />
              )}
              {index < 2 && (
                <div className="hidden md:block xl:hidden absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-colors duration-300 group-hover:via-white/20" />
              )}
              {/* Mobile Divider */}
              {index !== statsData.length - 1 && (
                <div className="block md:hidden absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-colors duration-300 group-hover:via-white/20" />
              )}

              {/* Metric Item */}
              <motion.div 
                className="flex flex-col items-center xl:items-start p-3 md:p-4 lg:p-5 transition-colors duration-300 group-hover:bg-white/[0.02] h-full"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Icon Section */}
                <div className="relative mb-2">
                  {/* Soft blue radial glow behind icon */}
                  <div className="absolute inset-0 bg-blue-500/30 blur-[20px] rounded-full scale-150 opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Icon Container with breathing glow */}
                  <motion.div 
                    className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#2563EB]/15 border border-[#60A5FA]/35"
                    animate={{ boxShadow: ["0 0 0px rgba(96,165,250,0)", "0 0 15px rgba(96,165,250,0.3)", "0 0 0px rgba(96,165,250,0)"] }}
                    transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                  >
                    {stat.icon}
                  </motion.div>
                </div>

                {/* Number */}
                <motion.div 
                  className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-white leading-none tracking-tight mb-1 group-hover:scale-[1.03] origin-center xl:origin-left transition-transform duration-300"
                >
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} delay={stat.delay} />
                </motion.div>

                {/* Label */}
                <div className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[1px] md:tracking-[2px] leading-tight mb-1 md:mb-2 text-center xl:text-left">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-[11px] md:text-[12px] text-gray-500 leading-snug text-center xl:text-left">
                  {stat.description}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
