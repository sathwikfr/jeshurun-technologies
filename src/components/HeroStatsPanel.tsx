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
      const timer = setTimeout(() => {
        motionValue.set(target);
      }, delay);
      return () => clearTimeout(timer);
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
    icon: <Briefcase className="w-4 h-4" strokeWidth={1.5} />,
    number: 150,
    suffix: "+",
    label: "PROJECTS DELIVERED",
    description: "Successful engagements across industries.",
    delay: 0,
    accentColor: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-500/10 dark:bg-blue-400/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderHover: "hover:border-l-blue-500",
  },
  {
    id: 2,
    icon: <Layers className="w-4 h-4" strokeWidth={1.5} />,
    number: 20,
    suffix: "+",
    label: "TECHNOLOGY DOMAINS",
    description: "Deep expertise in modern enterprise stacks.",
    delay: 150,
    accentColor: "from-indigo-500 to-indigo-600",
    iconBg: "bg-indigo-500/10 dark:bg-indigo-400/10",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    borderHover: "hover:border-l-indigo-500",
  },
  {
    id: 3,
    icon: <Globe className="w-4 h-4" strokeWidth={1.5} />,
    number: 6,
    suffix: "",
    label: "GLOBAL DELIVERY HUBS",
    description: "Distributed engineering across timezones.",
    delay: 300,
    accentColor: "from-cyan-500 to-cyan-600",
    iconBg: "bg-cyan-500/10 dark:bg-cyan-400/10",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    borderHover: "hover:border-l-cyan-500",
  },
  {
    id: 4,
    icon: <Headset className="w-4 h-4" strokeWidth={1.5} />,
    number: 24,
    suffix: "/7",
    label: "ENTERPRISE SUPPORT",
    description: "Continuous monitoring and proactive reliability.",
    delay: 450,
    accentColor: "from-emerald-500 to-emerald-600",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-400/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    borderHover: "hover:border-l-emerald-500",
  },
];

export function HeroStatsPanel() {
  return (
    <div className="w-full relative z-30 pointer-events-auto flex justify-center pb-4 sm:pb-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="w-full rounded-2xl bg-white/50 dark:bg-[#080f1f]/60 backdrop-blur-xl border border-black/8 dark:border-white/10 shadow-xl overflow-hidden"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-black/8 dark:divide-white/8">
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.id}
              className={`group relative flex flex-col items-center justify-center p-4 lg:p-5 xl:p-6 transition-all duration-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] min-w-0 border-l-2 border-l-transparent ${stat.borderHover} cursor-default`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {/* Subtle stat-specific top accent line on hover */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stat.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="flex flex-col xl:flex-row items-center xl:items-start gap-2.5 xl:gap-4 text-center xl:text-left min-w-0 w-full">
                {/* Icon Container */}
                <div className={`relative flex items-center justify-center w-10 h-10 rounded-xl ${stat.iconBg} shrink-0`}>
                  {/* Breathing glow */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${stat.accentColor} blur-md`}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.08, 0.22, 0.08]
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5
                    }}
                  />
                  <div className={`relative z-10 ${stat.iconColor}`}>{stat.icon}</div>
                </div>

                {/* Text Layout */}
                <div className="flex flex-col min-w-0">
                  <div className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white leading-none tracking-tight mb-1">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} delay={stat.delay} />
                  </div>
                  <div className="text-[9px] md:text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest leading-none mb-1.5">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 leading-snug hidden xl:block">
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
