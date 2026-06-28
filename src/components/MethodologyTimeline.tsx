import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
}

export function MethodologyTimeline({
  badge = "PROCESS",
  title,
  subtitle,
  steps,
}: MethodologyTimelineProps) {
  return (
    <section className="w-full py-24 bg-background border-y border-border relative overflow-hidden">
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
      </div>
    </section>
  );
}
