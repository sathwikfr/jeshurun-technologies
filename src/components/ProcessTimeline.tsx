"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

export interface ProcessStep {
  title: string;
  desc: string;
  icon: ReactNode;
  accentColor: string; // "blue-600", "blue-500", "cyan-500", "cyan-400"
}

interface ProcessTimelineProps {
  badge: string;
  title: string;
  subtitle?: string;
  steps: ProcessStep[];
}

export function ProcessTimeline({ badge, title, subtitle, steps }: ProcessTimelineProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const colorMap: Record<string, { borderBottom: string; borderAll: string; bg: string; text: string; bgSolid: string }> = {
    "blue-600": { borderBottom: "border-b-blue-600", borderAll: "border-blue-600", bg: "bg-blue-600/10", text: "text-blue-600 dark:text-blue-400", bgSolid: "bg-blue-600" },
    "blue-500": { borderBottom: "border-b-blue-500", borderAll: "border-blue-500", bg: "bg-blue-500/10", text: "text-blue-500 dark:text-blue-400", bgSolid: "bg-blue-500" },
    "cyan-500": { borderBottom: "border-b-cyan-500", borderAll: "border-cyan-500", bg: "bg-cyan-500/10", text: "text-cyan-500 dark:text-cyan-400", bgSolid: "bg-cyan-500" },
    "cyan-400": { borderBottom: "border-b-cyan-400", borderAll: "border-cyan-400", bg: "bg-cyan-400/10", text: "text-cyan-600 dark:text-cyan-400", bgSolid: "bg-cyan-500" },
  };

  return (
    <section className="w-full pt-24 pb-32 bg-transparent relative">
      <div className="container px-6 sm:px-8 mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20 space-y-4">
          <span className="text-sm font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full">
            {badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mt-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto mt-4">
              {subtitle}
            </p>
          )}
          {/* Gradient underline bar restored */}
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto mt-8 rounded-full shadow-sm" />
        </div>

        <div className="relative">
          {/* Horizontal Timeline Line */}
          <div className="hidden md:block absolute top-[44px] left-0 w-full h-[2px] bg-border z-0">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {/* Hover Pulse Animation */}
            {hoveredStep !== null && (
              <motion.div
                className="absolute top-0 left-0 h-full w-[10%] bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
                initial={{ left: "-10%", opacity: 0 }}
                animate={{ 
                  left: ["-10%", `${hoveredStep * 25 + 5}%`],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => {
              const mappedColors = colorMap[step.accentColor] || colorMap["blue-600"];
              return (
                <div 
                  key={i} 
                  className="h-full flex flex-col items-center md:items-start text-center md:text-left group"
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Step Number Above */}
                  <div className="w-full flex justify-center md:justify-start mb-6">
                    <span className="text-xs font-black text-muted-foreground/50 tracking-widest bg-background px-2 relative z-10">
                      STEP 0{i + 1}
                    </span>
                  </div>

                  {/* Circular Node */}
                  <div className="hidden md:flex w-full justify-start mb-8 relative">
                    {/* Glow Effect */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: hoveredStep === i ? 0.6 : 0, 
                        scale: hoveredStep === i ? 1.8 : 0.8 
                      }}
                      transition={{ duration: 0.3 }}
                      className={`absolute w-5 h-5 rounded-full ${mappedColors.bgSolid} blur-md z-0 ml-6`}
                    />
                    
                    {/* Main Node */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      animate={{ scale: hoveredStep === i ? 1.3 : 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-5 h-5 rounded-full border-4 ${mappedColors.borderAll} z-10 ml-6 transition-colors duration-300 ${
                        hoveredStep === i ? mappedColors.bgSolid : "bg-background"
                      }`}
                    />
                  </div>

                  {/* Content Card with bottom border */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className={`flex-1 w-full flex flex-col bg-card border border-border p-8 rounded-2xl shadow-sm hover-card-effect border-b-4 ${mappedColors.borderBottom} transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg`}
                  >
                    {/* Icon in soft circular badge */}
                    <div className={`w-14 h-14 rounded-full ${mappedColors.bg} flex items-center justify-center ${mappedColors.text} mb-6 shrink-0`}>
                      {step.icon}
                    </div>

                    <h4 className="text-xl font-bold text-foreground mb-3 min-h-[3.5rem]">
                      {step.title}
                    </h4>
                    
                    {/* Underline Accent */}
                    <div className={`w-10 h-1 rounded-full ${mappedColors.bgSolid} mb-4 opacity-70`} />

                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
