"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface MethodologyStep {
  title: string;
  desc: string;
  icon: ReactNode;
}

interface MethodologyTimelineProps {
  badge?: string;
  title: string;
  subtitle?: string;
  steps: MethodologyStep[];
  variant?: "default" | "cards" | "zigzag" | "compact-loop";
}

export function MethodologyTimeline({
  badge = "PROCESS",
  title,
  subtitle,
  steps,
  variant = "default",
}: MethodologyTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Scroll-linked animation for the timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (variant !== "compact-loop") return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [variant]);

  useEffect(() => {
    if (variant !== "compact-loop" || !isInView) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [variant, isInView, steps.length]);
  return (
    <section className="w-full py-24 bg-transparent relative overflow-hidden">
      <div className="container px-6 sm:px-8 mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="text-sm font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full">
            {badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto mt-4">
              {subtitle}
            </p>
          )}
        </div>

        {variant === "default" && (
          <div className={steps.length === 5 ? "grid grid-cols-1 md:grid-cols-5 gap-8 relative" : "grid grid-cols-1 md:grid-cols-4 gap-8 relative"}>
          {/* Timeline connector (desktop only) */}
          <div
            className="hidden md:block absolute top-12 h-0.5 bg-border -translate-y-1/2 overflow-hidden"
            style={{ 
              left: `${100 / (steps.length * 2)}%`, 
              width: `${100 - (100 / steps.length)}%` 
            }}
          >
            <motion.div 
               className="h-full bg-primary"
               initial={{ width: "0%" }}
               whileInView={{ width: "100%" }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            />
          </div>

          {steps.map((stage, i) => (
            <div
              key={i}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="text-xs font-black text-muted-foreground/50 mb-3 tracking-widest">
                0{i + 1}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center text-primary mb-6 shadow-sm group-hover:-translate-y-1 group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300">
                {stage.icon}
              </div>
              <h4 className="text-lg font-extrabold text-foreground mb-3">
                {stage.title}
              </h4>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed px-2">
                {stage.desc}
              </p>
              {i < steps.length - 1 && (
                <div className="md:hidden mt-6 text-muted-foreground/30">
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </div>
              )}
            </div>
          ))}
          </div>
        )}

        {variant === "cards" && (
          <div className={steps.length === 5 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"}>
            {steps.map((stage, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={i}
                className="flex flex-col bg-card border border-border p-6 rounded-2xl shadow-sm hover-card-effect"
              >
                <div className="flex items-center gap-4 mb-4 border-b border-border/50 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {stage.icon}
                  </div>
                  <div className="text-sm font-black text-muted-foreground/40 tracking-widest leading-none">
                    STEP {i + 1}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {stage.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stage.desc}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {variant === "zigzag" && (
          <div className="flex flex-col space-y-4 md:space-y-5 relative max-w-4xl mx-auto py-4">
            {/* Center line for desktop */}
            <div className="hidden md:block absolute top-4 bottom-4 left-1/2 w-0.5 bg-border -translate-x-1/2" />
            
            {steps.map((stage, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className="relative flex flex-col md:flex-row items-center justify-between w-full">
                  {/* Connector dot */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background z-10" />
                  
                  {/* Content Box */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -20 : 20, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`w-full md:w-[45%] flex flex-col bg-card border border-border p-4 sm:p-5 rounded-2xl shadow-sm hover-card-effect ${
                      isEven ? "md:mr-auto md:text-right md:items-end" : "md:ml-auto md:text-left md:items-start"
                    }`}
                  >
                    <div className="text-[10px] sm:text-xs font-black text-primary tracking-widest mb-2 bg-primary/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                      PHASE 0{i + 1}
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mb-3">
                      {stage.icon}
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-foreground mb-1 sm:mb-2">
                      {stage.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {stage.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}
        {variant === "compact-loop" && (
          <div 
            ref={containerRef}
            className="flex flex-col space-y-2 md:space-y-3 relative max-w-4xl mx-auto py-4"
          >
            {/* Background line for desktop */}
            <div className="hidden md:block absolute top-4 bottom-4 left-1/2 w-0.5 bg-border -translate-x-1/2 z-0" />
            
            {/* Scroll-linked active line */}
            <motion.div 
              className="hidden md:block absolute top-4 left-1/2 w-0.5 bg-blue-600 dark:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.8)] -translate-x-1/2 z-0 origin-top" 
              style={{ height: lineHeight, bottom: "1rem" }}
            />
            
            {steps.map((stage, i) => {
              const isActive = i === activeIndex;
              const isEven = i % 2 === 0;
              return (
                <div key={i} className="relative flex flex-col md:flex-row items-center justify-between w-full z-10">
                  {/* Connector dot */}
                  <div className={`hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full ring-4 ring-background z-10 transition-all duration-500 ${
                    isActive ? "bg-blue-600 dark:bg-blue-500 scale-125 shadow-[0_0_15px_rgba(37,99,235,0.5)]" : "bg-primary/20"
                  }`} />
                  
                  {/* Content (Box-less Floating Style) */}
                  <div 
                    className={`w-full md:w-[45%] flex items-start gap-4 p-2 sm:p-4 transition-all duration-500 ease-out text-left group ${
                      isEven ? "md:mr-auto md:text-right md:flex-row-reverse" : "md:ml-auto"
                    } ${
                      isActive 
                        ? "opacity-100 scale-[1.02] z-20" 
                        : "opacity-40 scale-100 z-10"
                    }`}
                  >
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.2)]"
                        : "bg-primary/5 text-muted-foreground"
                    }`}>
                      {stage.icon}
                    </div>
                    <div className="flex flex-col pt-1">
                      <div className={`flex items-center gap-3 mb-1 ${isEven ? "md:flex-row-reverse" : ""}`}>
                        <span className={`text-xs sm:text-sm font-black tracking-[0.2em] transition-colors duration-500 ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-muted-foreground"
                        }`}>
                          0{i + 1}
                        </span>
                        <h4 className={`text-lg sm:text-xl font-serif transition-colors duration-500 ${isActive ? "text-slate-900 dark:text-white" : "text-foreground"}`}>
                          {stage.title}
                        </h4>
                      </div>
                      <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${isActive ? "text-slate-600 dark:text-slate-400 font-medium" : "text-muted-foreground"}`}>
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
