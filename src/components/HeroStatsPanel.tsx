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
    icon: <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400 drop-shadow-sm" strokeWidth={1.5} />,
    number: 150,
    suffix: "+",
    label: "PROJECTS DELIVERED",
    description: "Successful engagements across industries.",
    delay: 0,
  },
  {
    id: 2,
    icon: <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400 drop-shadow-sm" strokeWidth={1.5} />,
    number: 20,
    suffix: "+",
    label: "TECHNOLOGY DOMAINS",
    description: "Deep expertise in modern enterprise stacks.",
    delay: 150,
  },
  {
    id: 3,
    icon: <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 drop-shadow-sm" strokeWidth={1.5} />,
    number: 6,
    suffix: "",
    label: "GLOBAL DELIVERY HUBS",
    description: "Distributed engineering across timezones.",
    delay: 300,
  },
  {
    id: 4,
    icon: <Headset className="w-4 h-4 text-blue-600 dark:text-blue-400 drop-shadow-sm" strokeWidth={1.5} />,
    number: 24,
    suffix: "/7",
    label: "ENTERPRISE SUPPORT",
    description: "Continuous monitoring and proactive reliability.",
    delay: 450,
  },
];

export function HeroStatsPanel() {
  return (
    <div className="w-full relative z-30 pointer-events-auto flex justify-center pb-4">
      {/* 
        ONE UNIFIED DASHBOARD STRIP
      */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full rounded-xl bg-white/40 dark:bg-[#0B1220]/40 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm overflow-hidden"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-black/10 dark:divide-white/10">
          {statsData.map((stat, i) => (
            <motion.div 
              key={stat.id} 
              className="flex flex-col items-center justify-center p-3 lg:p-4 transition-colors hover:bg-black/5 dark:hover:bg-white/5 min-w-0"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col xl:flex-row items-center xl:items-start gap-2 xl:gap-3 text-center xl:text-left min-w-0 w-full">
                {/* Icon Container */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-400/10 shrink-0 mt-1">
                  {/* Slow rotating partial-arc border */}
                  <div className="absolute inset-0 rounded-full border border-blue-500/20 dark:border-blue-400/20 border-t-blue-500/80 dark:border-t-blue-400/80 animate-[spin_6s_linear_infinite]" />
                  <div className="relative z-10">{stat.icon}</div>
                </div>
                
                {/* Text Layout */}
                <div className="flex flex-col min-w-0">
                  <div className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white leading-none tracking-tight mb-1 drop-shadow-md">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} delay={stat.delay} />
                  </div>
                  <div className="text-[9px] md:text-[10px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest leading-none drop-shadow-md mb-1.5">
                    {stat.label}
                  </div>
                  <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-snug w-full truncate xl:whitespace-normal xl:overflow-visible text-wrap">
                    {stat.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
