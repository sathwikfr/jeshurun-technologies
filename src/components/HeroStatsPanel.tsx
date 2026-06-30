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
    icon: <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />,
    number: 150,
    suffix: "+",
    label: "PROJECTS DELIVERED",
    delay: 0,
  },
  {
    id: 2,
    icon: <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />,
    number: 20,
    suffix: "+",
    label: "TECHNOLOGY DOMAINS",
    delay: 150,
  },
  {
    id: 3,
    icon: <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />,
    number: 6,
    suffix: "",
    label: "GLOBAL DELIVERY HUBS",
    delay: 300,
  },
  {
    id: 4,
    icon: <Headset className="w-5 h-5 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />,
    number: 24,
    suffix: "/7",
    label: "ENTERPRISE SUPPORT",
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
        className="w-full rounded-2xl md:rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-sm overflow-hidden"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-black/10 dark:divide-white/10">
          {statsData.map((stat, i) => (
            <motion.div 
              key={stat.id} 
              className="flex flex-col items-center justify-center p-4 md:p-5 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col xl:flex-row items-center gap-3 text-center xl:text-left">
                {/* Icon Container */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-400/10 shrink-0">
                  {stat.icon}
                </div>
                
                {/* Text Layout */}
                <div className="flex flex-col">
                  <div className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white leading-none tracking-tight mb-1">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} delay={stat.delay} />
                  </div>
                  <div className="text-[9px] md:text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest leading-none">
                    {stat.label}
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
