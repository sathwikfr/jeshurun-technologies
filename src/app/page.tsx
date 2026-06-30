"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, Variants, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Activity, Monitor, Shield, Layers, Users, Clock, Award, Briefcase, Globe, Code, Cloud, Server, Cpu, Zap, Infinity, Brain, ShieldCheck, ChevronRight, Play, Headset, BarChart } from "lucide-react";
import { PremiumCTA } from "@/components/PremiumCTA";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MethodologyTimeline } from "@/components/MethodologyTimeline";
import dynamic from "next/dynamic";
import { TechOrbit } from "@/components/TechOrbit";
import { AwsLogo, AzureLogo, GcpLogo, ReactLogo, NextJsLogo, NodeJsLogo, DockerLogo, KubernetesLogo, PythonLogo, TerraformLogo, GithubActionsLogo } from "@/components/TechLogos";
import { CloudROICalculator } from "@/components/CloudROICalculator";
import { insightsData } from "@/lib/insightsData";
import { caseStudiesData } from "@/lib/caseStudiesData";
import { HeroBackground } from "@/components/HeroBackground";
import { GlobalNetworkMap } from "@/components/GlobalNetworkMap";
import { WorldMap } from "@/components/WorldMap";
import { HeroStatsPanel } from "@/components/HeroStatsPanel";


const enterpriseContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const enterpriseItem: Variants = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

function AnimatedCounter({ target, suffix = "", prefix = "", delay = 0 }: { target: number; suffix?: string; prefix?: string, delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1800, bounce: 0 });
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
      // Don't format with commas if it has a decimal point since our only decimal is 99.9 and we don't need commas there
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

/* ─── TECHNOLOGY ECOSYSTEM DATA ─── */
const techCategories = [
  {
    category: "Cloud Platforms",
    items: [
      { name: "AWS", icon: <AwsLogo className="w-6 h-6" />, color: "#FF9900" },
      { name: "Azure", icon: <AzureLogo className="w-6 h-6" />, color: "#0078D4" },
      { name: "GCP", icon: <GcpLogo className="w-6 h-6" />, color: "#4285F4" },
    ]
  },
  {
    category: "Engineering",
    items: [
      { name: "React", icon: <ReactLogo className="w-6 h-6" />, color: "#61DAFB" },
      { name: "Next.js", icon: <NextJsLogo className="w-6 h-6" />, color: "#0F172A" },
      { name: "Node.js", icon: <NodeJsLogo className="w-6 h-6" />, color: "#339933" },
      { name: "Python", icon: <PythonLogo className="w-6 h-6" />, color: "#3776AB" },
    ]
  },
  {
    category: "DevOps & Infrastructure",
    items: [
      { name: "Docker", icon: <DockerLogo className="w-6 h-6" />, color: "#2496ED" },
      { name: "Kubernetes", icon: <KubernetesLogo className="w-6 h-6" />, color: "#326CE5" },
      { name: "DevOps", icon: <Infinity className="w-5 h-5" />, color: "#06B6D4" },
    ]
  },
  {
    category: "Security & Intelligence",
    items: [
      { name: "AI", icon: <Brain className="w-5 h-5" />, color: "#8B5CF6" },
      { name: "Cybersecurity", icon: <ShieldCheck className="w-5 h-5" />, color: "#EF4444" },
    ]
  }
];

const refinedTechCategories = [
  {
    category: "Cloud Platforms",
    items: [
      { name: "AWS", logo: <AwsLogo className="w-10 h-10" />, desc: "Enterprise Cloud Platform", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300", color: "#FF9900" },
      { name: "Azure", logo: <AzureLogo className="w-10 h-10" />, desc: "Microsoft Cloud Services", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=300", color: "#0078D4" },
      { name: "GCP", logo: <GcpLogo className="w-10 h-10" />, desc: "Scalable Infrastructure", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300", color: "#4285F4" },
    ]
  },
  {
    category: "Engineering",
    items: [
      { name: "React", logo: <ReactLogo className="w-10 h-10" />, desc: "Component Architecture", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=300", color: "#61DAFB" },
      { name: "Next.js", logo: <NextJsLogo className="w-10 h-10" />, desc: "Server Side Rendering", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=300", color: "#ffffff" },
      { name: "Node.js", logo: <NodeJsLogo className="w-10 h-10" />, desc: "Scalable Runtime Engine", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=300", color: "#339933" },
      { name: "Python", logo: <PythonLogo className="w-10 h-10" />, desc: "Data & Systems Analysis", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=300", color: "#3776AB" },
    ]
  },
  {
    category: "DevOps & Infrastructure",
    items: [
      { name: "Docker", logo: <DockerLogo className="w-10 h-10" />, desc: "Container Platform", image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=300", color: "#2496ED" },
      { name: "Kubernetes", logo: <KubernetesLogo className="w-10 h-10" />, desc: "Container Orchestration", image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=300", color: "#326CE5" },
      { name: "DevOps", logo: <Infinity className="w-8 h-8 text-[#06B6D4]" />, desc: "Continuous Pipelines", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300", color: "#06B6D4" },
    ]
  },
  {
    category: "Security & Intelligence",
    items: [
      { name: "AI", logo: <Brain className="w-8 h-8 text-[#8B5CF6]" />, desc: "Neural System Models", image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=300", color: "#8B5CF6" },
      { name: "Cybersecurity", logo: <ShieldCheck className="w-8 h-8 text-[#EF4444]" />, desc: "Threat Vector Auditing", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=300", color: "#EF4444" },
      { name: "Compliance", logo: <Shield className="w-8 h-8 text-[#10B981]" />, desc: "HIPAA & PCI-DSS Audits", image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=300", color: "#10B981" },
    ]
  }
];

function TechCard({ tech }: { tech: typeof refinedTechCategories[0]["items"][0] }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);

  const brandColor = tech.name === "Next.js" ? (isDark ? "#ffffff" : "#0f172a") : tech.color;

  return (
    <div
      className="group relative flex flex-col items-center justify-center h-[120px] bg-card border rounded-2xl cursor-pointer overflow-hidden p-4 text-center select-none hover-card-effect"
      style={{
        borderColor: `${brandColor}40`,
        boxShadow: `0 4px 10px ${brandColor}06`,
      }}
    >
      {/* Real Unsplash background image with low opacity on idle, zooming on hover */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-50/50 dark:bg-slate-950/40 pointer-events-none">
        <Image
          src={tech.image}
          alt={tech.name}
          fill
          className="object-cover opacity-[0.04] dark:opacity-[0.06] group-hover:opacity-[0.16] dark:group-hover:opacity-[0.24] scale-[1.02] group-hover:scale-[1.12] transition-all duration-500 ease-out pointer-events-none"
        />
        {/* Color overlay matching tech color */}
        <div 
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none opacity-5 dark:opacity-3 group-hover:opacity-10 dark:group-hover:opacity-10"
          style={{ 
            backgroundColor: brandColor
          }}
        />
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full pointer-events-none">
        {/* Logo container: colorful on idle, slightly scales and shifts on hover */}
        <div 
          className="w-10 h-10 flex items-center justify-center transition-all duration-300 shrink-0 opacity-90 group-hover:opacity-100 group-hover:-translate-y-1"
        >
          {tech.logo}
        </div>

        <span 
          className="text-xs font-black text-foreground mt-2 transition-transform duration-300 group-hover:-translate-y-0.5"
        >
          {tech.name}
        </span>

        {/* Description fades in on hover */}
        <p 
          className="text-[9px] text-muted-foreground font-bold transition-opacity duration-300 mt-1 max-w-[130px] line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100"
        >
          {tech.desc}
        </p>
      </div>
    </div>
  );
}

interface InsightCardProps {
  insight: typeof insightsData[0];
}

function InsightCard({ insight }: InsightCardProps) {
  const router = useRouter();
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsPreviewActive(true);
    }, 450); // 450ms delay
  };

  const handleMouseLeave = () => {
    setIsPreviewActive(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(`/insights/${insight.slug}`);
      });
    } else {
      router.push(`/insights/${insight.slug}`);
    }
  };
  return (
    <div
      className="group relative flex flex-col rounded-3xl border border-border bg-card transition-all h-[440px] shadow-sm hover-card-effect cursor-pointer select-none overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Image Header */}
      <div className="relative w-full h-40 shrink-0 overflow-hidden bg-slate-900 border-b border-border/40">
        <Image 
          src={insight.image} 
          alt={insight.title}
          fill
          className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div className="flex-1 flex flex-col">
          {/* Category & Title */}
          <div className="mb-4">
            <span className="text-[10px] font-extrabold tracking-widest text-[#2563EB] uppercase block mb-1.5">
              {insight.category}
            </span>
            <h3 className="text-xl font-black leading-snug text-foreground group-hover:text-[#2563EB] transition-colors duration-300 line-clamp-2">
              {insight.title}
            </h3>
          </div>

          {/* Content Area with static height space */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {!isPreviewActive ? (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <p className="text-xs text-muted-foreground line-clamp-4 leading-relaxed font-medium">
                    {insight.desc}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="insights"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="h-full"
                >
                  <span className="text-[9px] font-black uppercase text-muted-foreground tracking-wider block mb-2">
                    KEY INSIGHTS
                  </span>
                  <ul className="space-y-1.5">
                    {insight.keyInsights.slice(0, 3).map((ki, i) => (
                      <li key={i} className="text-xs font-semibold text-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                        {ki}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Hint Action Line */}
        <div className="pt-4 border-t border-border/60 mt-4 relative">
          <AnimatePresence mode="wait">
            {!isPreviewActive ? (
              <motion.div
                key="hover-hint"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold"
              >
                <span>{insight.date}</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/60 group-hover:text-[#2563EB] transition-colors duration-300">
                  Hover to read &rarr;
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="click-cta"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between text-xs text-[#2563EB] font-bold"
              >
                <span>{insight.date}</span>
                <span className="inline-flex items-center gap-1">
                  Click to read more &rarr;
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

interface CaseStudyCardProps {
  study: typeof caseStudiesData[0];
}

function CaseStudyCard({ study }: CaseStudyCardProps) {
  const router = useRouter();
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsPreviewActive(true);
    }, 450); // 450ms delay
  };

  const handleMouseLeave = () => {
    setIsPreviewActive(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(`/case-studies/${study.id}`);
      });
    } else {
      router.push(`/case-studies/${study.id}`);
    }
  };

  return (
    <div
      className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-8 transition-all h-[340px] shadow-sm hover-card-effect cursor-pointer select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="flex-1 flex flex-col">
        {/* Category & Title */}
        <div className="mb-4">
          <span className="text-[10px] font-extrabold tracking-widest text-[#2563EB] uppercase block mb-1.5 font-mono">
            CASE STUDY • {study.industry}
          </span>
          <h3 className="text-xl font-black leading-snug text-foreground group-hover:text-[#2563EB] transition-colors duration-300 line-clamp-2">
            {study.title}
          </h3>
        </div>

        {/* Content Area with static height space */}
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {!isPreviewActive ? (
              <motion.div
                key="challenge-solution"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full space-y-3"
              >
                <div className="text-left">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">Challenge</span>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                    {study.challenge}
                  </p>
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">Solution</span>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                    {study.solution}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="metrics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="h-full text-left"
              >
                <span className="text-[9px] font-black uppercase text-muted-foreground tracking-wider block mb-3 font-mono">
                  KEY OUTCOMES
                </span>
                <ul className="space-y-2">
                  {study.metrics.slice(0, 3).map((metric, i) => (
                    <li key={i} className="text-xs font-bold text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      <span className="text-[#2563EB]">{metric.value}</span>
                      <span className="text-muted-foreground font-semibold">— {metric.label}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Hint Action Line */}
      <div className="pt-4 border-t border-border/60 mt-4 relative">
        <AnimatePresence mode="wait">
          {!isPreviewActive ? (
            <motion.div
              key="hover-hint"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold"
            >
              <span>{study.category}</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/60 group-hover:text-[#2563EB] transition-colors duration-300">
                Hover to read &rarr;
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="click-cta"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between text-xs text-[#2563EB] font-bold"
            >
              <span>{study.category}</span>
              <span className="group/cta inline-flex items-center gap-1 text-xs font-extrabold text-[#2563EB]">
                Click to explore case study
                <ArrowRight size={12} className="transition-transform duration-300 group-hover/cta:translate-x-1.5" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const trustLogos = [
  { name: "Astellas", src: "/logos/astellas.webp" },
  { name: "Vodafone", src: "/logos/vodafone.webp" },
  { name: "Boston Scientific", src: "/logos/bostonScien.svg" },
  { name: "Ergo", src: "/logos/ergo.webp" },
  { name: "Pfizer", src: "/logos/pfizer.webp" },
  { name: "Tech Placements", src: "/logos/techPlacements.jpeg" },
];

// --- MICRO-VISUALIZATION COMPONENTS FOR TECH STAT CARDS ---
function EnterpriseClientsViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  
  // Use first 5 logos to create the overlapping avatar row
  const displayLogos = trustLogos.slice(0, 5);

  return (
    <div ref={ref} className="w-full h-16 flex items-center justify-start relative mt-3 bg-transparent overflow-hidden">
      <div className="flex items-center justify-center -space-x-3 px-2">
        {displayLogos.map((logo, index) => (
          <div 
            key={logo.name}
            className="w-10 h-10 rounded-full border-2 border-[#F8FAFC] dark:border-[#0F172A] bg-white dark:bg-white flex items-center justify-center overflow-hidden shadow-sm relative transition-all duration-300 hover:-translate-y-1 hover:z-50"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'scale(1)' : 'scale(0.8)',
              transition: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`,
              zIndex: 10 - index
            }}
            title={logo.name}
          >
            <div className="relative w-7 h-7 flex items-center justify-center">
              <Image 
                src={logo.src}
                alt={logo.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SLAUptimeViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-16 flex items-center justify-center relative mt-3 rounded-md bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
      <style>{`
        @keyframes serverPing {
          0%, 80%, 100% { opacity: 0.3; }
          90% { opacity: 1; box-shadow: 0 0 8px #22C55E; }
        }
        @keyframes scanLine {
          0% { transform: translateX(-100%); opacity: 0; }
          10%, 90% { opacity: 1; }
          100% { transform: translateX(200%); opacity: 0; }
        }
      `}</style>
      
      {/* Background Matrix */}
      <div className="absolute inset-0 z-0 flex items-center justify-center gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            {[...Array(3)].map((_, j) => (
              <div 
                key={j} 
                className="w-4 h-1.5 rounded-[1px] bg-[#22C55E]"
                style={{
                  animation: "serverPing 4s infinite",
                  animationDelay: `${(i * 3 + j) * 0.15}s`,
                  animationPlayState: isInView ? "running" : "paused",
                  opacity: 0.3
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Scanner Effect */}
      <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-[#22C55E]/20 to-transparent z-10"
           style={{ animation: "scanLine 3s linear infinite", animationPlayState: isInView ? "running" : "paused" }} />
           
      {/* 99.9% Badge */}
      <div className="absolute z-20 px-1.5 py-0.5 bg-white dark:bg-[#0B1220] border border-[#22C55E]/40 rounded text-[8px] font-bold text-[#22C55E] tracking-wider shadow-[0_0_10px_rgba(34,197,94,0.15)]">
        UP
      </div>
    </div>
  );
}

function ExperienceTimelineViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-16 flex items-center justify-center relative mt-3 rounded-md bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
      <style>{`
        @keyframes drawTimeline {
          0% { stroke-dashoffset: 150; }
          50%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes popNode {
          0%, 10% { transform: scale(0); opacity: 0; }
          30%, 100% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
      
      {/* SVG Path */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 160 64" strokeWidth="2">
          {/* Background Track */}
          <path d="M 30 32 L 130 32" className="stroke-[#3B82F6] opacity-20" fill="none" strokeLinecap="round" />
          
          {/* Animated Fill */}
          <path 
            d="M 30 32 L 130 32" 
            className="stroke-[#2563EB] dark:stroke-[#60A5FA]" 
            fill="none" 
            strokeLinecap="round" 
            strokeDasharray="150"
            style={{ animation: "drawTimeline 4s ease-out infinite", animationPlayState: isInView ? "running" : "paused" }} 
          />
        </svg>
      </div>

      {/* Nodes */}
      <div className="absolute inset-0 z-10 flex items-center justify-between px-7">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="w-2.5 h-2.5 rounded-full bg-white dark:bg-[#0F172A] border-2 border-[#2563EB] shadow-[0_0_5px_rgba(37,99,235,0.5)]"
            style={{ 
              animation: "popNode 4s ease-out infinite", 
              animationDelay: `${0.5 + i * 0.4}s`,
              animationPlayState: isInView ? "running" : "paused",
              opacity: 0
            }}
          />
        ))}
      </div>
    </div>
  );
}

function CertifiedEngineersViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-16 flex items-center justify-center relative mt-3 rounded-md bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
      <style>{`
        @keyframes certSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes certPop {
          0%, 100% { transform: translateY(0); box-shadow: 0 0 0 rgba(0,0,0,0); }
          50% { transform: translateY(-4px); box-shadow: 0 4px 10px rgba(14,165,233,0.3); }
        }
      `}</style>

      {/* Background Orbit/Lines */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 160 64">
           <path d="M 80 40 C 50 40, 20 20, 50 20 C 80 20, 110 20, 110 40 C 140 40, 140 20, 110 20" fill="none" className="stroke-[#0EA5E9] opacity-20" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center gap-4">
        {/* Code Eng */}
        <div className="w-7 h-7 rounded bg-white dark:bg-[#0B1220] border border-[#0EA5E9]/50 flex items-center justify-center relative"
             style={{ animation: "certPop 3s ease-in-out infinite 0s", animationPlayState: isInView ? "running" : "paused" }}>
           <Code className="w-3.5 h-3.5 text-[#0EA5E9]" />
           <div className="absolute -inset-1 border border-[#0EA5E9]/20 rounded border-dashed" style={{ animation: "certSpin 8s linear infinite", animationPlayState: isInView ? "running" : "paused" }} />
        </div>
        
        {/* Cloud Eng */}
        <div className="w-8 h-8 rounded bg-white dark:bg-[#0B1220] border border-[#3B82F6]/50 flex items-center justify-center relative z-20"
             style={{ animation: "certPop 3s ease-in-out infinite 1s", animationPlayState: isInView ? "running" : "paused" }}>
           <Cloud className="w-4 h-4 text-[#3B82F6]" />
           <div className="absolute -inset-1 border border-[#3B82F6]/30 rounded-md border-dashed" style={{ animation: "certSpin 10s linear infinite reverse", animationPlayState: isInView ? "running" : "paused" }} />
        </div>
        
        {/* Security Eng */}
        <div className="w-7 h-7 rounded bg-white dark:bg-[#0B1220] border border-[#16A34A]/50 flex items-center justify-center relative"
             style={{ animation: "certPop 3s ease-in-out infinite 2s", animationPlayState: isInView ? "running" : "paused" }}>
           <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
           <div className="absolute -inset-1 border border-[#16A34A]/20 rounded border-dashed" style={{ animation: "certSpin 8s linear infinite", animationPlayState: isInView ? "running" : "paused" }} />
        </div>
      </div>
    </div>
  );
}

// --- MICRO-VISUALIZATION COMPONENTS FOR CORE COMPETENCIES ---
function ITConsultingViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 relative max-w-[200px] flex items-center justify-center mt-2 rounded-lg bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
      <style>{`
        @keyframes networkPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(30, 95, 255, 0.1); }
          50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(30, 95, 255, 0.4); }
        }
        @keyframes flowData {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20%, 80% { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
      `}</style>
      
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 200 96" strokeWidth="1.5">
          {/* Static paths */}
          <g className="stroke-[#1E5FFF] opacity-20 dark:opacity-40" fill="none">
            <path d="M 100 48 L 40 25" />
            <path d="M 100 48 L 160 25" />
            <path d="M 100 48 L 40 75" />
            <path d="M 100 48 L 160 75" />
          </g>
          {/* Animated data pulses */}
          <g className="stroke-[#22D3EE] dark:stroke-[#3B82F6]" strokeWidth="2" fill="none" strokeDasharray="15 150" strokeLinecap="round">
            <path d="M 100 48 L 40 25" style={{ animation: "flowData 2s linear infinite", animationPlayState: isInView ? "running" : "paused" }} />
            <path d="M 100 48 L 160 25" style={{ animation: "flowData 2.5s linear infinite 0.5s", animationPlayState: isInView ? "running" : "paused" }} />
            <path d="M 100 48 L 40 75" style={{ animation: "flowData 2.2s linear infinite 1s", animationPlayState: isInView ? "running" : "paused" }} />
            <path d="M 100 48 L 160 75" style={{ animation: "flowData 2.8s linear infinite 1.5s", animationPlayState: isInView ? "running" : "paused" }} />
          </g>
          {/* Outer Nodes */}
          <g className="fill-[#1E5FFF]">
            <circle cx="40" cy="25" r="3" />
            <circle cx="160" cy="25" r="3" />
            <circle cx="40" cy="75" r="3" />
            <circle cx="160" cy="75" r="3" />
          </g>
        </svg>
      </div>

      {/* Center Node */}
      <div 
        className="relative z-10 w-10 h-10 bg-white dark:bg-[#0B1220] border border-[#1E5FFF]/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(30,95,255,0.2)] dark:shadow-[0_0_15px_rgba(30,95,255,0.4)]"
        style={{ animation: "networkPulse 3s ease-in-out infinite", animationPlayState: isInView ? "running" : "paused" }}
      >
        <div className="w-4 h-4 bg-gradient-to-br from-[#22D3EE] to-[#1E5FFF] rounded-full" />
      </div>
      
      {/* Node Labels */}
      <div className="absolute top-[8px] left-[15px] text-[8px] font-bold text-slate-500 dark:text-slate-400 tracking-wider">DISCOVER</div>
      <div className="absolute top-[8px] right-[25px] text-[8px] font-bold text-slate-500 dark:text-slate-400 tracking-wider">PLAN</div>
      <div className="absolute bottom-[8px] left-[25px] text-[8px] font-bold text-slate-500 dark:text-slate-400 tracking-wider">ALIGN</div>
      <div className="absolute bottom-[8px] right-[15px] text-[8px] font-bold text-slate-500 dark:text-slate-400 tracking-wider">SCALE</div>
    </div>
  );
}

function ProjectManagementViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 flex flex-col justify-center px-4 py-2 max-w-[200px] relative mt-2 rounded-lg bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
      <style>{`
        @keyframes barFill {
          0%, 10% { transform: scaleX(0); opacity: 0; }
          30%, 90% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0); opacity: 0; }
        }
        @keyframes floatTask {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
      
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 flex justify-between px-6 py-2">
        <div className="w-px h-full bg-[#1E5FFF]" />
        <div className="w-px h-full bg-[#1E5FFF]" />
        <div className="w-px h-full bg-[#1E5FFF]" />
        <div className="w-px h-full bg-[#1E5FFF]" />
      </div>

      <div className="flex flex-col gap-3 z-10 w-full relative">
        {/* Row 1 */}
        <div className="w-full h-3 bg-slate-200/50 dark:bg-slate-800/50 rounded-sm relative flex items-center px-1">
          <div className="absolute left-1 h-1.5 w-[40%] bg-gradient-to-r from-[#1E5FFF] to-[#22D3EE] rounded-sm origin-left shadow-[0_0_8px_rgba(30,95,255,0.4)]" style={{ animation: "barFill 4s ease-out infinite", animationPlayState: isInView ? "running" : "paused" }} />
          <div className="absolute left-[45%] w-[30%] h-4 bg-white dark:bg-[#0B1220] rounded-sm border border-slate-300 dark:border-slate-600 shadow-sm" style={{ animation: "floatTask 3s ease-in-out infinite", animationPlayState: isInView ? "running" : "paused" }} />
        </div>
        
        {/* Row 2 */}
        <div className="w-full h-3 bg-slate-200/50 dark:bg-slate-800/50 rounded-sm relative flex items-center px-1">
          <div className="absolute left-[30%] h-1.5 w-[50%] bg-gradient-to-r from-[#A855F7] to-[#EC4899] rounded-sm origin-left shadow-[0_0_8px_rgba(168,85,247,0.4)]" style={{ animation: "barFill 4s ease-out infinite 0.8s", animationPlayState: isInView ? "running" : "paused" }} />
        </div>
        
        {/* Row 3 */}
        <div className="w-full h-3 bg-slate-200/50 dark:bg-slate-800/50 rounded-sm relative flex items-center px-1">
          <div className="absolute left-[10%] h-1.5 w-[70%] bg-gradient-to-r from-[#22C55E] to-[#10B981] rounded-sm origin-left shadow-[0_0_8px_rgba(34,197,94,0.4)]" style={{ animation: "barFill 4s ease-out infinite 1.5s", animationPlayState: isInView ? "running" : "paused" }} />
          <div className="absolute left-[85%] w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_5px_#22C55E]" style={{ animation: "floatTask 3s ease-in-out infinite 1s", animationPlayState: isInView ? "running" : "paused" }} />
        </div>
      </div>
    </div>
  );
}

function TestManagementViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 flex items-center justify-center relative max-w-[200px] mt-2 rounded-lg bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
      <style>{`
        @keyframes scanSweep {
          0%, 10% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          90%, 100% { transform: translateX(250%); opacity: 0; }
        }
        @keyframes passGlow {
          0%, 15% { background-color: rgba(51, 65, 85, 0.1); box-shadow: none; border-color: transparent; }
          20%, 90% { background-color: #10B981; box-shadow: 0 0 10px rgba(16,185,129,0.5); border-color: #34D399; }
          95%, 100% { background-color: rgba(51, 65, 85, 0.1); box-shadow: none; border-color: transparent; }
        }
        @keyframes checkmarkPop {
          0%, 20% { transform: scale(0) rotate(-45deg); opacity: 0; }
          25%, 90% { transform: scale(1) rotate(0); opacity: 1; }
          95%, 100% { transform: scale(0) rotate(45deg); opacity: 0; }
        }
      `}</style>

      {/* Grid Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 dark:opacity-20">
        <div className="w-full h-full border-[0.5px] border-[#10B981] [background-image:linear-gradient(#10B981_0.5px,transparent_0.5px),linear-gradient(90deg,#10B981_0.5px,transparent_0.5px)] [background-size:16px_16px]" />
      </div>

      <div className="flex items-center gap-3 z-10 w-full px-6 relative">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex-1 aspect-square rounded-md bg-slate-300 dark:bg-slate-700/50 border border-slate-400 dark:border-slate-600 flex items-center justify-center relative overflow-hidden transition-all duration-300"
            style={{ animation: `passGlow 4s ease-out infinite ${i * 0.3}s`, animationPlayState: isInView ? "running" : "paused" }}>
            {/* Checkmark Icon */}
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
              style={{ animation: `checkmarkPop 4s cubic-bezier(0.34, 1.56, 0.64, 1) infinite ${i * 0.3}s`, animationPlayState: isInView ? "running" : "paused" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ))}
        
        {/* Scanner Line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#22D3EE] to-transparent shadow-[0_0_15px_#22D3EE] z-20 left-4"
          style={{ animation: "scanSweep 4s linear infinite", animationPlayState: isInView ? "running" : "paused" }}
        />
      </div>
    </div>
  );
}

function InfrastructureViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 flex items-center justify-center relative max-w-[200px] mt-2 rounded-lg bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
      <style>{`
        @keyframes serverPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; box-shadow: 0 0 12px rgba(34, 197, 94, 0.6); }
        }
        @keyframes dataLink {
          0% { stroke-dashoffset: 60; opacity: 0; }
          20%, 80% { opacity: 1; }
          100% { stroke-dashoffset: -60; opacity: 0; }
        }
      `}</style>
      
      {/* Background connections */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 200 96" strokeWidth="1.5">
          <g className="stroke-[#1E5FFF] opacity-20 dark:opacity-40" fill="none">
            <path d="M 60 48 L 140 30" />
            <path d="M 60 48 L 140 66" />
          </g>
          <g className="stroke-[#22C55E]" strokeWidth="2" fill="none" strokeDasharray="10 60" strokeLinecap="round">
            <path d="M 60 48 L 140 30" style={{ animation: "dataLink 2s linear infinite", animationPlayState: isInView ? "running" : "paused" }} />
            <path d="M 60 48 L 140 66" style={{ animation: "dataLink 2.5s linear infinite 0.5s", animationPlayState: isInView ? "running" : "paused" }} />
          </g>
        </svg>
      </div>

      <div className="flex items-center justify-between w-full px-10 z-10">
        {/* Main Server Node */}
        <div className="w-10 h-16 bg-white dark:bg-[#0B1220] border border-slate-300 dark:border-[#1E5FFF]/50 rounded-md shadow-lg flex flex-col justify-evenly px-1.5 py-1 z-10 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#1E5FFF]/0 via-[#1E5FFF]/10 to-[#1E5FFF]/0 blur-sm rounded-lg" />
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-sm flex items-center px-1 gap-1">
              <div className="w-1 h-1 rounded-full bg-[#22C55E]" style={{ animation: `serverPulse ${2 + i * 0.5}s ease-in-out infinite`, animationPlayState: isInView ? "running" : "paused" }} />
              <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-600 rounded-full" />
            </div>
          ))}
        </div>

        {/* Child Nodes */}
        <div className="flex flex-col gap-3 z-10">
          <div className="w-8 h-6 bg-white dark:bg-[#0B1220] border border-slate-300 dark:border-[#22C55E]/50 rounded-md shadow-md flex flex-col justify-center px-1.5 gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" style={{ animation: "serverPulse 2s ease-in-out infinite 0.5s", animationPlayState: isInView ? "running" : "paused" }} />
          </div>
          <div className="w-8 h-6 bg-white dark:bg-[#0B1220] border border-slate-300 dark:border-[#22C55E]/50 rounded-md shadow-md flex flex-col justify-center px-1.5 gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" style={{ animation: "serverPulse 3s ease-in-out infinite 1s", animationPlayState: isInView ? "running" : "paused" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SoftwareEngineeringViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 flex flex-col justify-start px-3 py-2 max-w-[200px] border border-slate-200 dark:border-slate-700/60 shadow-inner relative mt-2 rounded-lg bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden">
      <style>{`
        @keyframes scrollCode {
          0% { transform: translateY(0); }
          20%, 30% { transform: translateY(-16px); }
          50%, 60% { transform: translateY(-32px); }
          80%, 90% { transform: translateY(-48px); }
          100% { transform: translateY(-64px); }
        }
        @keyframes compileGlow {
          0%, 100% { box-shadow: 0 0 0px rgba(34, 197, 94, 0); border-color: rgba(51, 65, 85, 0.2); }
          50% { box-shadow: 0 0 15px rgba(34, 197, 94, 0.3); border-color: rgba(34, 197, 94, 0.6); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Editor Header */}
      <div className="flex items-center justify-between w-full border-b border-slate-300 dark:border-slate-700/50 pb-1.5 mb-1.5 z-10">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
        </div>
        <div className="text-[6px] text-slate-500 dark:text-slate-400 font-mono tracking-wider">main.rs</div>
      </div>

      {/* Code Area */}
      <div className="relative flex-1 w-full overflow-hidden font-mono text-[7px] leading-[14px] text-slate-700 dark:text-slate-300 z-10"
           style={{ animation: "compileGlow 4s ease-in-out infinite", animationPlayState: isInView ? "running" : "paused", border: "1px solid", borderRadius: "4px", padding: "2px 4px" }}>
        
        <div className="absolute top-0 left-0 right-0 flex flex-col"
             style={{ animation: "scrollCode 10s steps(4, end) infinite", animationPlayState: isInView ? "running" : "paused" }}>
          
          <div className="flex"><span className="text-[#A855F7]">fn</span>&nbsp;<span className="text-[#1E5FFF] dark:text-[#3B82F6]">main</span>()&nbsp;&#123;</div>
          <div className="flex pl-2"><span className="text-[#10B981]">let</span>&nbsp;sys&nbsp;=&nbsp;System::new();</div>
          <div className="flex pl-2">sys.optimize();</div>
          <div className="flex pl-2 text-[#F59E0B]">sys.deploy()</div>
          <div className="flex">&#125;</div>
          <div className="flex"><span className="text-slate-400 dark:text-slate-500">// Build success</span></div>
          <div className="flex"><span className="text-[#1E5FFF] dark:text-[#3B82F6]">&gt;</span><span className="w-1 h-2 bg-slate-500 dark:bg-slate-300 ml-0.5 mt-0.5" style={{ animation: "cursorBlink 1s step-end infinite" }} /></div>
        </div>
      </div>
    </div>
  );
}

function CloudTransformationViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 flex items-center justify-between px-4 max-w-[200px] relative mt-2 rounded-lg bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
      <style>{`
        @keyframes uploadData {
          0% { transform: translateY(20px) translateX(-10px) scale(0.8); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-20px) translateX(10px) scale(1); opacity: 0; }
        }
        @keyframes cloudPulse {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(30, 95, 255, 0.2)); transform: translateY(0); }
          50% { filter: drop-shadow(0 0 15px rgba(30, 95, 255, 0.5)); transform: translateY(-2px); }
        }
        @keyframes serverOn {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Local Server (Left) */}
      <div className="flex flex-col gap-1.5 z-10">
        {[0, 1].map(i => (
          <div key={i} className="w-8 h-3.5 bg-white dark:bg-[#0B1220] border border-slate-300 dark:border-slate-600 rounded flex items-center px-1 shadow-sm relative">
            <div className="w-1 h-1 rounded-full bg-[#1E5FFF]" style={{ animation: "serverOn 2s ease-in-out infinite", animationPlayState: isInView ? "running" : "paused" }} />
          </div>
        ))}
      </div>

      {/* Migration Stream (Center) */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
         {/* Particles */}
         {[0, 1, 2, 3].map(i => (
           <div 
             key={i}
             className="absolute w-2 h-2 rounded bg-gradient-to-tr from-[#1E5FFF] to-[#22D3EE] shadow-[0_0_8px_rgba(30,95,255,0.6)]"
             style={{ 
               animation: `uploadData ${2 + i * 0.5}s ease-in-out infinite ${i * 0.4}s`,
               animationPlayState: isInView ? "running" : "paused",
               opacity: 0
             }}
           />
         ))}
      </div>

      {/* Cloud Environment (Right) */}
      <div className="relative z-10 text-[#1E5FFF] bg-white dark:bg-[#0B1220] rounded-xl p-1.5 border border-[#1E5FFF]/40 shadow-md flex items-center justify-center"
           style={{ animation: "cloudPulse 4s ease-in-out infinite", animationPlayState: isInView ? "running" : "paused" }}>
        <Cloud className="w-7 h-7" />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#22C55E] rounded-full border-2 border-white dark:border-[#0F172A]" />
      </div>
    </div>
  );
}

function AISolutionsViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 relative max-w-[200px] flex items-center justify-center mt-2 rounded-lg bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
      <style>{`
        @keyframes aiPulse {
          0%, 100% { box-shadow: 0 0 10px rgba(168, 85, 247, 0.2), inset 0 0 10px rgba(168, 85, 247, 0.1); }
          50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.5), inset 0 0 15px rgba(168, 85, 247, 0.3); }
        }
        @keyframes dataPacket {
          0% { stroke-dashoffset: 100; opacity: 0; }
          10%, 90% { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
      `}</style>
      
      {/* Circuit Traces */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 200 96" strokeWidth="1">
          {/* Static Background Traces */}
          <g className="stroke-[#1E5FFF] opacity-20 dark:opacity-40" fill="none">
            {/* Top Left */}
            <path d="M 0 20 L 40 20 L 60 35" />
            <path d="M 0 35 L 30 35 L 50 48" />
            {/* Top Right */}
            <path d="M 200 20 L 160 20 L 140 35" />
            <path d="M 200 35 L 170 35 L 150 48" />
            {/* Bottom Left */}
            <path d="M 0 76 L 40 76 L 60 61" />
            <path d="M 0 61 L 30 61 L 50 48" />
            {/* Bottom Right */}
            <path d="M 200 76 L 160 76 L 140 61" />
            <path d="M 200 61 L 170 61 L 150 48" />
            
            {/* Additional verticalish lines */}
            <path d="M 70 0 L 70 15 L 80 25" />
            <path d="M 130 0 L 130 15 L 120 25" />
            <path d="M 70 96 L 70 81 L 80 71" />
            <path d="M 130 96 L 130 81 L 120 71" />
          </g>

          {/* Animated Data Packets */}
          <g className="stroke-[#A855F7] dark:stroke-[#22D3EE]" strokeWidth="1.5" fill="none" strokeDasharray="15 150" strokeLinecap="round">
            <path d="M 0 20 L 40 20 L 60 35" style={{ animation: "dataPacket 2s linear infinite", animationPlayState: isInView ? "running" : "paused" }} />
            <path d="M 200 76 L 160 76 L 140 61" style={{ animation: "dataPacket 2.5s linear infinite 0.5s", animationPlayState: isInView ? "running" : "paused" }} />
            <path d="M 0 61 L 30 61 L 50 48" style={{ animation: "dataPacket 2.2s linear infinite 1.2s", animationPlayState: isInView ? "running" : "paused" }} />
            <path d="M 130 0 L 130 15 L 120 25" style={{ animation: "dataPacket 1.8s linear infinite 0.8s", animationPlayState: isInView ? "running" : "paused" }} />
          </g>

          {/* Glowing Nodes */}
          <g className="fill-[#A855F7] dark:fill-[#3B82F6]" opacity="0.8">
            <circle cx="20" cy="20" r="1.5" />
            <circle cx="15" cy="35" r="1.5" />
            <circle cx="180" cy="20" r="1.5" />
            <circle cx="185" cy="35" r="1.5" />
            <circle cx="20" cy="76" r="1.5" />
            <circle cx="15" cy="61" r="1.5" />
            <circle cx="180" cy="76" r="1.5" />
            <circle cx="185" cy="61" r="1.5" />
          </g>
        </svg>
      </div>

      {/* Central Chip */}
      <div 
        className="relative z-10 w-[42px] h-[42px] bg-white dark:bg-[#0A0F1C] border border-purple-400 dark:border-[#A855F7] flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(168,85,247,0.15)] dark:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        style={{ animation: "aiPulse 3s ease-in-out infinite", animationPlayState: isInView ? "running" : "paused" }}
      >
        {/* Inner glow frame */}
        <div className="absolute inset-[2px] border border-purple-300/50 dark:border-[#22D3EE]/30 rounded-[1px]" />
        
        {/* Text */}
        <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-cyan-500 dark:from-white dark:to-[#A855F7]">
          AI
        </span>

        {/* Chip Pins (Top & Bottom) */}
        <div className="absolute -top-[4px] inset-x-1 flex justify-evenly">
          <div className="w-[1.5px] h-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
          <div className="w-[1.5px] h-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
          <div className="w-[1.5px] h-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
          <div className="w-[1.5px] h-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
        </div>
        <div className="absolute -bottom-[4px] inset-x-1 flex justify-evenly">
          <div className="w-[1.5px] h-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
          <div className="w-[1.5px] h-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
          <div className="w-[1.5px] h-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
          <div className="w-[1.5px] h-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
        </div>
        
        {/* Chip Pins (Left & Right) */}
        <div className="absolute -left-[4px] inset-y-1 flex flex-col justify-evenly">
          <div className="h-[1.5px] w-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
          <div className="h-[1.5px] w-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
          <div className="h-[1.5px] w-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
          <div className="h-[1.5px] w-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
        </div>
        <div className="absolute -right-[4px] inset-y-1 flex flex-col justify-evenly">
          <div className="h-[1.5px] w-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
          <div className="h-[1.5px] w-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
          <div className="h-[1.5px] w-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
          <div className="h-[1.5px] w-[4px] bg-purple-400 dark:bg-[#3B82F6]" />
        </div>
      </div>
    </div>
  );
}

function DevOpsViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 flex items-center justify-center relative max-w-[200px] mt-2 rounded-lg bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
      <style>{`
        @keyframes drawInfinity {
          0% { stroke-dashoffset: 300; opacity: 0; }
          10%, 90% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes pulseNode {
          0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 5px rgba(34, 197, 94, 0.2); border-color: rgba(34, 197, 94, 0.4); }
          50% { transform: translate(-50%, -50%) scale(1.1); box-shadow: 0 0 15px rgba(34, 197, 94, 0.6); border-color: rgba(34, 197, 94, 1); }
        }
        @keyframes pulseNodeBlue {
          0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 5px rgba(30, 95, 255, 0.2); border-color: rgba(30, 95, 255, 0.4); }
          50% { transform: translate(-50%, -50%) scale(1.1); box-shadow: 0 0 15px rgba(30, 95, 255, 0.6); border-color: rgba(30, 95, 255, 1); }
        }
      `}</style>
      
      {/* Infinity Loop SVG */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <svg className="w-[120px] h-[60px] overflow-visible" viewBox="0 0 120 60">
           {/* Static Track */}
           <path 
             d="M 30 30 C 30 10, 60 10, 60 30 C 60 50, 90 50, 90 30 C 90 10, 60 10, 60 30 C 60 50, 30 50, 30 30 Z" 
             fill="none" 
             strokeWidth="3" 
             className="stroke-slate-200 dark:stroke-slate-700/60" 
           />
           {/* Animated Stream */}
           <path 
             d="M 30 30 C 30 10, 60 10, 60 30 C 60 50, 90 50, 90 30 C 90 10, 60 10, 60 30 C 60 50, 30 50, 30 30 Z" 
             fill="none" 
             strokeWidth="4" 
             className="stroke-[#22C55E]" 
             strokeLinecap="round"
             strokeDasharray="40 260"
             style={{ animation: "drawInfinity 3s linear infinite", animationPlayState: isInView ? "running" : "paused", filter: "drop-shadow(0 0 4px #22C55E)" }}
           />
        </svg>
      </div>

      {/* Nodes */}
      <div className="absolute inset-0 z-10">
         {/* Build Node */}
         <div className="absolute w-6 h-6 rounded-full bg-white dark:bg-[#0B1220] border-2 border-[#22C55E] flex items-center justify-center" style={{ animation: "pulseNode 3s ease-in-out infinite", animationPlayState: isInView ? "running" : "paused", left: "calc(50% - 30px)", top: "50%" }}>
           <Code className="w-3 h-3 text-[#22C55E]" />
         </div>
         {/* Deploy Node */}
         <div className="absolute w-6 h-6 rounded-full bg-white dark:bg-[#0B1220] border-2 border-[#1E5FFF] flex items-center justify-center" style={{ animation: "pulseNodeBlue 3s ease-in-out infinite 1.5s", animationPlayState: isInView ? "running" : "paused", left: "calc(50% + 30px)", top: "50%" }}>
           <Cloud className="w-3 h-3 text-[#1E5FFF]" />
         </div>
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isMarqueeInView = useInView(marqueeRef, { margin: "200px" });

  const calculateExperience = () => {
    const incDate = new Date("2017-01-12");
    const now = new Date();
    let years = now.getFullYear() - incDate.getFullYear();
    if (now.getMonth() < incDate.getMonth() || (now.getMonth() === incDate.getMonth() && now.getDate() < incDate.getDate())) {
      years--;
    }
    return years;
  };

  const [stats, setStats] = useState({
    clientsCount: 14,
    experienceYears: calculateExperience(),
    engineersCount: 45,
  });

  // Apple-style mouse parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  const [isHeroActionHovered, setIsHeroActionHovered] = useState(false);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats({
            clientsCount: data.clientsCount || 14,
            experienceYears: calculateExperience(), // Override API response to guarantee correct calculation
            engineersCount: data.engineersCount || 45,
          });
        }
      } catch (err) {
        console.error("Failed to load counters stats:", err);
      }
    }
    loadStats();
  }, []);


  const services = [
    {
      title: "IT Consulting",
      desc: "Strategic technology planning to align your technical assets with key business metrics.",
      icon: <Layers className="w-6 h-6" />,
      href: "/services/it-consulting",
      viz: ITConsultingViz
    },
    {
      title: "Project Management",
      desc: "Methodical agile project delivery ensuring deadlines are met with quality safeguards.",
      icon: <Activity className="w-6 h-6" />,
      href: "/services/project-management",
      viz: ProjectManagementViz
    },
    {
      title: "Test Management",
      desc: "Rigorous quality assurance testing pipelines built for modern enterprise applications.",
      icon: <Shield className="w-6 h-6" />,
      href: "/services/test-management",
      viz: TestManagementViz
    },
    {
      title: "Infrastructure",
      desc: "Optimized, secure network architectures and server migrations built for scale.",
      icon: <Monitor className="w-6 h-6" />,
      href: "/services/infrastructure-management",
      viz: InfrastructureViz
    },
    {
      title: "Software Engineering",
      desc: "Custom enterprise applications built with modern architectures and clean code practices.",
      icon: <Code className="w-6 h-6" />,
      href: "/software",
      viz: SoftwareEngineeringViz
    },
    {
      title: "Cloud Transformation",
      desc: "Architecting resilient multi-cloud environments and accelerating migration to modernize enterprise infrastructure.",
      icon: <Cloud className="w-6 h-6" />,
      href: "/technology/cloud-solutions",
      viz: CloudTransformationViz
    },
    {
      title: "AI Solutions",
      desc: "Deploying predictive models and generative AI pipelines to automate workflows and unlock operational intelligence.",
      icon: <Cpu className="w-6 h-6" />,
      href: "/technology/ai-machine-learning",
      viz: AISolutionsViz
    },
    {
      title: "DevOps",
      desc: "Streamlined CI/CD pipelines, infrastructure as code, and container orchestration at scale.",
      icon: <Zap className="w-6 h-6" />,
      href: "/technology/devops",
      viz: DevOpsViz
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center relative min-h-screen bg-transparent overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════
          HERO CANVAS
      ═══════════════════════════════════════════════════ */}
      <section id="hero-section" className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-white dark:bg-[#050810]" onMouseMove={handleMouseMove}>
        <style>{`
          .scrim-diagonal { background: linear-gradient(110deg, rgba(245,248,255,0.98) 0%, rgba(245,248,255,0.95) 20%, rgba(245,248,255,0.8) 40%, rgba(245,248,255,0.4) 55%, transparent 75%); }
          .scrim-mobile { background: linear-gradient(to right, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 60%, transparent 100%); }
          .dark .scrim-mobile { background: linear-gradient(to right, rgba(5,8,16,0.98) 0%, rgba(5,8,16,0.95) 60%, rgba(5,8,16,0.7) 85%, transparent 100%); }
        `}</style>
        
        {/* Layer 0: Full-Bleed Map Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <WorldMap forceDark={true} />
        </div>

        {/* Layer 1: Protective Gradient Scrim (Desktop) */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block scrim-diagonal dark:hidden" />
        
        {/* Layer 1: Protective Gradient Scrim (Mobile - Stronger & Wider) */}
        <div className="absolute inset-0 z-10 pointer-events-none md:hidden scrim-mobile dark:hidden" />

        {/* Layer 2: Hero Content */}
        <div className="relative z-20 w-full container mx-auto px-6 sm:px-8 pt-24 pb-4 lg:pt-[80px] xl:pt-[90px] 2xl:pt-[160px] flex flex-col min-h-screen justify-between pointer-events-none">
          
          <div className="flex flex-col md:flex-row items-center md:items-stretch w-full flex-1 pb-6 lg:pb-8 xl:pb-10 2xl:pb-20 pointer-events-none">
            <motion.div 
              variants={enterpriseContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10px" }}
              className="flex flex-col justify-center gap-6 md:gap-8 lg:gap-8 2xl:gap-12 items-center md:items-start text-center md:text-left w-full md:w-[60%] lg:w-[50%] h-full pointer-events-auto"
            >
              
              {/* 1. BADGE/PILL */}
              <motion.div variants={enterpriseItem} className="flex items-center gap-2.5 bg-[#EEF3FF] border border-[#D6E4FF] dark:bg-white/5 dark:border-white/10 rounded-full px-4 py-1.5 shadow-sm backdrop-blur-md">
                <div className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75 dark:bg-[#5EC8FF]"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-[#5EC8FF]"></span>
                </div>
                <span className="text-[13px] lg:text-[14px] font-bold text-blue-700 dark:text-white tracking-wider uppercase">
                  Global Enterprise Consulting
                </span>
              </motion.div>

              <div className="flex flex-col items-center md:items-start w-full gap-4 lg:gap-5 2xl:gap-6">
                {/* 2. MAIN HEADING */}
                <motion.h1 variants={enterpriseItem} className="font-extrabold tracking-tight text-[44px] md:text-[54px] lg:text-[44px] xl:text-[50px] leading-[1.05] m-0 p-0 text-[#0B1220] dark:text-[#F5F7FA]">
                  <span className="block">Empowering</span>
                  <span className="block">Your</span>
                  <span 
                    className="animate-text-gradient text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-[#3B82F6] dark:to-[#22D3EE] block mt-1 2xl:mt-2"
                  >
                    Digital Future
                  </span>
                </motion.h1>

                {/* 3. PARAGRAPH */}
                <motion.p variants={enterpriseItem} className="text-gray-600 dark:text-[#B8C0CC] text-base md:text-lg lg:text-[16px] xl:text-[18px] leading-[1.6] max-w-[540px] lg:max-w-[520px] xl:max-w-[600px]">
                  Enterprise IT consulting and engineering for organizations across Ireland, Europe, the Middle East, and India — architecting resilient systems, accelerating delivery, and turning complex technology challenges into measurable business outcomes.
                </motion.p>
              </div>

              {/* 4. BUTTON ROW */}
              <motion.div variants={enterpriseItem} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center md:justify-start">
                <button className="text-base md:text-[17px] bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full py-3 px-7 lg:py-3.5 lg:px-8 shadow-sm flex items-center justify-center transition-colors w-full sm:w-auto">
                  Get Started <span className="ml-2 font-normal">→</span>
                </button>
                <button className="text-base md:text-[17px] bg-transparent hover:bg-gray-50 text-[#0B1220] border-[#9CA7B5] dark:hover:bg-white/5 dark:text-white font-medium border-[1.5px] dark:border-white/30 rounded-full py-3 px-7 lg:py-3.5 lg:px-8 flex items-center justify-center transition-colors w-full sm:w-auto">
                  Explore Services <span className="ml-2 font-normal">→</span>
                </button>
              </motion.div>
            </motion.div>
            
            {/* Spacer for Right Column (Map Focus Area) */}
            <div className="hidden md:block md:w-[40%] lg:w-[50%]"></div>
          </div>
          
          {/* 5. STATS CARDS (Bottom Aligned) */}
          <HeroStatsPanel />
        </div>
      </section>




      {/* ═══════ TRUSTED PARTNERS SECTION ═══════ */}
      <section className="w-full py-16 md:py-20 relative z-10 bg-white dark:bg-background">
        <div className="container px-6 sm:px-8 mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Trusted by Enterprise Leaders</h2>
            <p className="text-muted-foreground text-sm font-medium max-w-lg mx-auto">Partnering with global organizations across pharmaceuticals, telecommunications, and insurance to deliver mission-critical technology systems.</p>
          </div>

          <div 
            ref={marqueeRef}
            className="relative w-full overflow-hidden py-6"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
          >
            <div className={`flex w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] will-change-transform`} style={{ animationPlayState: isMarqueeInView ? "running" : "paused" }}>
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-20 pr-20">
                  {trustLogos.map((logo, index) => (
                    <div key={`${logo.name}-${index}`} className="flex items-center justify-center min-w-[140px] h-12 hover:scale-[1.02] transition-transform duration-500 group relative">
                      <Image 
                        src={logo.src} 
                        alt={`${logo.name} Logo`} 
                        fill
                        className="object-contain select-none pointer-events-none transition-all duration-500"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ═══════ SERVICES SECTION — 8 SERVICES ═══════ */}
      <section className="w-full py-20 md:py-32 relative z-10 bg-card border-t border-border">
        <div className="container px-6 sm:px-8 mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground tracking-tight">Core Competencies</h2>
            <p className="text-muted-foreground text-lg font-medium">Comprehensive services tailored to meet complex, multi-national enterprise requirements.</p>
          </div>

          <motion.div 
            variants={enterpriseContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-4"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={enterpriseItem}>
                <div onClick={() => router.push(service.href)} className="block cursor-pointer outline-none h-full">
                  <SpotlightCard borderGlow={false} className="h-full flex flex-col p-7 border border-border bg-card group rounded-2xl hover-card-effect">
                  <div className="h-11 w-11 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center group-hover:bg-[#2563EB]/20 group-hover:scale-[1.02] transition-all duration-300 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  <div className="w-full mt-auto mb-4 shrink-0 flex items-center justify-center">
                    {service.viz && <service.viz />}
                  </div>
                  <span className="text-[#2563EB] font-bold text-sm hover:underline inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-300">
                    Learn more &rarr;
                  </span>
                </SpotlightCard>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* ═══════ TECHNOLOGY ECOSYSTEM ═══════ */}
      <section className="w-full py-20 md:py-32 relative z-10 border-t border-border bg-[#F8FAFC] dark:bg-background">
        <div className="container px-6 sm:px-8 mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-[#2563EB]/10 inline-block px-3 py-1 rounded-full mb-2">Technology Ecosystem</h2>
            <h3 className="text-3xl font-extrabold sm:text-4xl text-foreground tracking-tight">Enterprise-Grade Technology Stack</h3>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">Industry-leading tools and platforms powering our consulting and delivery capabilities.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 pt-8">
            {/* Left: Stats Box */}
            <div className="lg:col-span-5 flex items-start">
              <div className="w-full grid grid-cols-2 gap-4 h-full">
                <SpotlightCard borderGlow={false} className="flex flex-col justify-end h-full shadow-sm hover-card-effect p-5">
                  <div className="flex flex-col items-start gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2563EB] flex items-center justify-center shrink-0">
                      <Users size={18} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-foreground leading-none"><AnimatedCounter target={stats.clientsCount} /></h4>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-xs font-bold text-foreground">Enterprise Clients</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 mb-2">across Ireland & Europe</p>
                    <EnterpriseClientsViz />
                  </div>
                </SpotlightCard>

                <SpotlightCard borderGlow={false} className="flex flex-col justify-end h-full shadow-sm hover-card-effect p-5">
                  <div className="flex flex-col items-start gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2563EB] flex items-center justify-center shrink-0">
                      <Award size={18} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-foreground leading-none"><AnimatedCounter target={99.9} suffix="%" /></h4>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-xs font-bold text-foreground">SLA Uptime</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 mb-2">guaranteed availability</p>
                    <SLAUptimeViz />
                  </div>
                </SpotlightCard>

                <SpotlightCard borderGlow={false} className="flex flex-col justify-end h-full shadow-sm hover-card-effect p-5">
                  <div className="flex flex-col items-start gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2563EB] flex items-center justify-center shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-foreground leading-none"><AnimatedCounter target={stats.experienceYears} suffix="+" /></h4>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-xs font-bold text-foreground">Years Experience</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 mb-2">in enterprise IT</p>
                    <ExperienceTimelineViz />
                  </div>
                </SpotlightCard>

                <SpotlightCard borderGlow={false} className="flex flex-col justify-end h-full shadow-sm hover-card-effect p-5">
                  <div className="flex flex-col items-start gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2563EB] flex items-center justify-center shrink-0">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-foreground leading-none"><AnimatedCounter target={stats.engineersCount} /></h4>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-xs font-bold text-foreground">Certified Engineers</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 mb-2">across disciplines</p>
                    <CertifiedEngineersViz />
                  </div>
                </SpotlightCard>
              </div>
            </div>

            {/* Right: Categorized Technology Ecosystem Grid */}
            <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-8">
              {/* Cloud Platforms & Engineering (First 2 categories) */}
              {refinedTechCategories.slice(0, 2).map((cat) => (
                <div key={cat.category} className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground/80 border-b border-border/60 pb-1.5 font-mono">
                    {cat.category}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {cat.items.map((tech) => (
                      <TechCard key={tech.name} tech={tech} />
                    ))}
                  </div>
                </div>
              ))}

              {/* DevOps & Security Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {refinedTechCategories.slice(2, 4).map((cat) => (
                  <div key={cat.category} className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground/80 border-b border-border/60 pb-1.5 font-mono">
                      {cat.category}
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {cat.items.map((tech) => (
                        <TechCard key={tech.name} tech={tech} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════ CORPORATE INTELLIGENCE (INSIGHTS & RESEARCH REPORTS) ═══════ */}
      <section id="corporate-intelligence" className="w-full py-20 md:py-32 relative z-10 bg-background border-t border-border">
        <div className="container px-6 sm:px-8 mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-[#2563EB]/10 inline-block px-3 py-1 rounded-full mb-2">
              Corporate Intelligence
            </h2>
            <h3 className="text-3xl font-extrabold sm:text-4xl text-foreground tracking-tight">
              Insights & Research Reports
            </h3>
            <p className="text-muted-foreground text-lg font-medium">
              Explore our latest engineering audits, AI telemetry models, and digital transformation guides.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 pt-8">
            {insightsData.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
        </div>
      </section>

      <PremiumCTA variant="home" />
    </div>
  );
}
