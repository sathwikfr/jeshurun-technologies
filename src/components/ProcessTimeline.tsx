"use client";

import { ReactNode, useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export interface ProcessStep {
  title: string;
  desc: string;
  icon: ReactNode;
  accentColor?: string;
}

interface ProcessTimelineProps {
  badge: string;
  title: string;
  subtitle?: string;
  steps: ProcessStep[];
}

export function ProcessTimeline({ badge, title, subtitle, steps }: ProcessTimelineProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  // Calculate width percentage for filled blue timeline segment up to hovered card
  const activeLineWidthPercent = hoveredStep !== null && steps.length > 1
    ? (hoveredStep / (steps.length - 1)) * 100
    : 0;

  return (
    <section ref={containerRef} className="w-full py-20 md:py-28 bg-transparent relative overflow-hidden">
      <div className="container px-6 sm:px-8 mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-foreground/80 uppercase tracking-widest bg-secondary border border-border px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {badge}
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial text-foreground tracking-tight max-w-3xl mx-auto">
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}

          <div className="w-16 h-1 bg-border dark:bg-zinc-800 mx-auto mt-6 rounded-full" />
        </div>

        <div className="relative">
          {/* ════════════════════════════════════════════════════════════════
              DESKTOP CONNECTED TIMELINE LINE & STEP MARKERS
          ════════════════════════════════════════════════════════════════ */}
          <div className="hidden md:block relative w-full mb-10">
            {/* Background Track Line (Neutral by default) */}
            <div className="absolute top-1/2 left-[12.5%] right-[12.5%] -translate-y-1/2 h-[2px] bg-slate-200 dark:bg-zinc-800 z-0">
              {/* Blue Filled Segment — Only active on hover */}
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.5)] transition-all duration-300 ease-out"
                style={{ width: `${activeLineWidthPercent}%` }}
              />
            </div>

            {/* Step Marker Dots Row */}
            <div className="grid grid-cols-4 gap-6 lg:gap-8 relative z-10">
              {steps.map((_, i) => {
                const isHovered = hoveredStep === i;
                const isPassed = hoveredStep !== null && i < hoveredStep;

                return (
                  <div key={i} className="flex justify-center items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: (isInView || shouldReduceMotion) ? 1 : 0 }}
                      transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : i * 0.12 }}
                      onMouseEnter={() => setHoveredStep(i)}
                      onMouseLeave={() => setHoveredStep(null)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        isHovered
                          ? "bg-blue-500 text-white scale-125 border-blue-400 ring-4 ring-blue-500/25 shadow-[0_0_14px_rgba(37,99,235,0.6)] z-20"
                          : isPassed
                          ? "bg-blue-500/20 border-2 border-blue-500 text-blue-500 z-10"
                          : "bg-background dark:bg-[#121214] border-2 border-slate-300 dark:border-zinc-700 z-10"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        isHovered
                          ? "bg-white"
                          : isPassed
                          ? "bg-blue-500"
                          : "bg-slate-400 dark:bg-zinc-600"
                      }`} />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              MOBILE VERTICAL CONNECTED TIMELINE LINE
          ════════════════════════════════════════════════════════════════ */}
          <div className="block md:hidden absolute left-5 top-6 bottom-6 w-[2px] bg-slate-200 dark:bg-zinc-800 z-0">
            <div
              className="w-full bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.5)] transition-all duration-300 ease-out"
              style={{ height: `${activeLineWidthPercent}%` }}
            />
          </div>

          {/* ════════════════════════════════════════════════════════════════
              STEP CARDS GRID
          ════════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8 relative z-10 pl-12 md:pl-0">
            {steps.map((step, i) => {
              const isHovered = hoveredStep === i;
              const isPassed = hoveredStep !== null && i < hoveredStep;

              return (
                <div key={i} className="relative flex flex-col h-full">
                  {/* Mobile Marker Dot */}
                  <div className="block md:hidden absolute -left-12 top-6 -translate-x-1/2 z-10">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isHovered
                        ? "bg-blue-500 scale-125 ring-4 ring-blue-500/25 shadow-[0_0_12px_rgba(37,99,235,0.6)]"
                        : isPassed
                        ? "bg-blue-500/20 border-2 border-blue-500"
                        : "bg-background dark:bg-[#121214] border-2 border-slate-300 dark:border-zinc-700"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isHovered
                          ? "bg-white"
                          : isPassed
                          ? "bg-blue-500"
                          : "bg-slate-400 dark:bg-zinc-600"
                      }`} />
                    </div>
                  </div>

                  {/* Editorial Card — Restrained Blue Top Border on Hover */}
                  <motion.div
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                    animate={{ opacity: (isInView || shouldReduceMotion) ? 1 : 0, y: (isInView || shouldReduceMotion) ? 0 : 24 }}
                    transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : i * 0.12 }}
                    onMouseEnter={() => setHoveredStep(i)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`relative flex-1 w-full flex flex-col bg-card dark:bg-[#18181c] border border-border dark:border-zinc-800/80 border-t-[3px] p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden ${
                      isHovered
                        ? "border-t-blue-500 dark:border-t-blue-400 shadow-xl"
                        : "border-t-slate-300 dark:border-t-zinc-800 shadow-sm"
                    }`}
                  >
                    {/* Top Row: Eyebrow on left, Composed Visual Unit (Bare Icon + Ghost Numeral) on right */}
                    <div className="relative z-10 flex items-start justify-between gap-4 mb-8 sm:mb-10">
                      {/* Step Eyebrow */}
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 pt-2 sm:pt-3">
                        PHASE 0{i + 1}
                      </span>

                      {/* Composed Visual Unit: Bare Icon + Ghost Numeral */}
                      <div className="flex items-center gap-2.5 sm:gap-3 select-none pointer-events-none -mt-2 -mr-2 sm:-mr-3">
                        {/* Bare Outlined Icon (32-36px, no fill/border/padding box) */}
                        <div className={`transition-all duration-300 flex items-center justify-center [&>svg]:!w-8 [&>svg]:!h-8 sm:[&>svg]:!w-9 sm:[&>svg]:!h-9 [&>svg]:!stroke-[1.5] ${
                          isHovered
                            ? "text-blue-600 dark:text-blue-400 scale-[1.08]"
                            : "text-slate-400 dark:text-zinc-500 scale-100"
                        }`}>
                          {step.icon}
                        </div>

                        {/* Ghost Numeral (editorial, low opacity 8-9%) */}
                        <span className="text-6xl sm:text-7xl font-black font-editorial text-foreground/[0.08] dark:text-white/[0.09] tracking-tighter leading-none">
                          0{i + 1}
                        </span>
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="relative z-10 text-lg sm:text-xl font-bold text-foreground mb-3 leading-snug">
                      {step.title}
                    </h3>
                    
                    {/* Title Accent Underline */}
                    <div className="relative z-10 w-8 h-0.5 bg-border dark:bg-zinc-800 group-hover:bg-blue-500 group-hover:w-14 transition-all duration-300 mb-4" />

                    {/* Description Text — Always 100% visible */}
                    <p className="relative z-10 text-sm font-medium text-muted-foreground leading-relaxed flex-1">
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
