"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, Variants, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Activity, Monitor, Shield, Layers, Users, Clock, Award, Briefcase, Globe, Code, Cloud, Server, Cpu, Zap, Infinity, Brain, ShieldCheck, ChevronRight, Play, Headset, BarChart, Mail } from "lucide-react";
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
    <div className="relative group w-full h-[120px] isolate">
      {/* Ambient base glow (soft radial) - Stays on the floor */}
      <div 
        className="absolute -bottom-3 left-1/2 w-[75%] h-[32px] rounded-[50%] blur-[12px] opacity-75 dark:opacity-[0.85] pointer-events-none transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.3] z-0"
        style={{ 
          backgroundColor: brandColor,
          transform: 'translateX(-50%) translateZ(0)'
        }}
      />
      
      {/* Sharp glass edge (3D pedestal effect) - Stays on the floor */}
      <div 
        className="absolute -bottom-1 left-1/2 w-[65%] h-[20px] rounded-[100%] pointer-events-none transition-all duration-500 opacity-100 group-hover:scale-110 z-0"
        style={{ 
          borderBottom: `3px solid ${brandColor}`,
          boxShadow: `inset 0 -12px 20px -4px ${brandColor}`,
          filter: `drop-shadow(0 -2px 6px ${brandColor})`,
          transform: 'translateX(-50%) translateZ(0)'
        }}
      />

      {/* The Lifting Card Container */}
      <div
        className="relative flex flex-col items-center justify-center h-full bg-card border rounded-2xl cursor-pointer overflow-hidden p-4 text-center select-none z-10 transition-all duration-500 group-hover:-translate-y-2.5"
        style={{
          borderColor: `${brandColor}40`,
          boxShadow: `0 4px 10px ${brandColor}06`,
        }}
      >
        {/* Dynamic Inner border that lights up with brand color on hover */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${brandColor}80` }}
        />
      {/* Real Unsplash background image with low opacity on idle, zooming on hover */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-50/50 dark:bg-slate-950/40 pointer-events-none">
        <Image
          src={tech.image}
          alt={tech.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
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
      className="group relative flex flex-col rounded-3xl border border-border bg-card transition-all min-h-[440px] shadow-sm hover:shadow-[0_8px_40px_-12px_rgba(29,78,216,0.2)] hover:border-[#1D4ED8]/30 cursor-pointer select-none overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Image Header */}
      <div className="relative w-full h-48 shrink-0 overflow-hidden bg-slate-900 border-b-2 border-blue-600 group-hover:border-blue-500 transition-colors duration-500">
        <Image 
          src={insight.image} 
          alt={insight.title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.05] transition-all duration-700"
        />
        {/* Duotone Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1D4ED8] to-[#0F766E] mix-blend-multiply opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
        
        {/* Bottom shadow blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90" />
        
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-extrabold tracking-widest text-white uppercase shadow-lg group-hover:bg-[#1D4ED8]/80 group-hover:border-[#1D4ED8] transition-colors duration-500">
          {insight.category}
        </div>
      </div>

      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div className="flex-1 flex flex-col">
          {/* Title */}
          <div className="mb-4 mt-2">
            <h3 className="text-xl font-black leading-snug text-foreground group-hover:text-[#2563EB] transition-colors duration-300 line-clamp-2 flex items-start justify-between gap-3">
              <span>{insight.title}</span>
              <ArrowRight className="w-5 h-5 shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#2563EB] mt-0.5" />
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
    <div ref={ref} className="w-full h-16 flex items-center justify-center relative mt-3 rounded-md bg-background dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
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
  const isInView = useInView(ref, { once: false, margin: "-10px" });
  
  return (
    <div ref={ref} className="w-full h-16 flex items-center justify-center relative mt-3 rounded-md bg-gradient-to-br from-slate-100 to-slate-50 dark:from-[#0F172A] dark:to-[#0B1121] overflow-hidden border border-slate-200/50 dark:border-slate-800/80 shadow-inner group">
      
      {/* Background Track */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 160 64">
          <path d="M 20 32 L 140 32" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          <motion.path 
            d="M 20 32 L 140 32" 
            stroke="url(#blueGlowExp)" 
            strokeWidth="3"
            fill="none" 
            strokeLinecap="round" 
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="blueGlowExp" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Nodes */}
      <div className="absolute inset-0 z-10 flex items-center justify-between px-[18px]">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative flex items-center justify-center w-3 h-3">
            <div className="absolute w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
            
            <motion.div 
              className="absolute w-3 h-3 rounded-full bg-white dark:bg-[#0F172A] border-2 border-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "backOut", delay: i * 0.3 }}
            />
            
            {/* Ambient Pulse After Draw */}
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-blue-400 opacity-0"
              animate={isInView ? { scale: [1, 2.5], opacity: [0, 0.4, 0] } : {}}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 + (i * 0.2) }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CertifiedEngineersViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-16 flex items-center justify-center relative mt-3 rounded-md bg-background dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
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
    <div ref={ref} className="w-full h-24 relative max-w-[200px] flex items-center justify-center mt-2 rounded-lg bg-background dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
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
    <div ref={ref} className="w-full h-24 flex flex-col justify-center px-4 py-2 max-w-[200px] relative mt-2 rounded-lg bg-background dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
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
    <div ref={ref} className="w-full h-24 flex items-center justify-center relative max-w-[200px] mt-2 rounded-lg bg-background dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
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
    <div ref={ref} className="w-full h-24 flex items-center justify-center relative max-w-[200px] mt-2 rounded-lg bg-background dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
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
    <div ref={ref} className="w-full h-24 flex flex-col justify-start px-3 py-2 max-w-[200px] border border-slate-200 dark:border-slate-700/60 shadow-inner relative mt-2 rounded-lg bg-background dark:bg-[#0F172A] overflow-hidden">
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
    <div ref={ref} className="w-full h-24 flex items-center justify-between px-4 max-w-[200px] relative mt-2 rounded-lg bg-background dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
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
    <div ref={ref} className="w-full h-24 relative max-w-[200px] flex items-center justify-center mt-2 rounded-lg bg-background dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
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
    <div ref={ref} className="w-full h-24 flex items-center justify-center relative max-w-[200px] mt-2 rounded-lg bg-background dark:bg-[#0F172A] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-inner">
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
      tags: ["Tech Roadmap", "Architecture Design", "Digital Transformation"],
      viz: ITConsultingViz
    },
    {
      title: "Project Management",
      desc: "Methodical agile project delivery ensuring deadlines are met with quality safeguards.",
      icon: <Activity className="w-6 h-6" />,
      href: "/services/project-management",
      tags: ["Agile & Scrum", "Risk Management", "Stakeholder Alignment"],
      viz: ProjectManagementViz
    },
    {
      title: "Test Management",
      desc: "Rigorous quality assurance testing pipelines built for modern enterprise applications.",
      icon: <Shield className="w-6 h-6" />,
      href: "/services/test-management",
      tags: ["QA Automation", "CI/CD Setup"],
      viz: TestManagementViz
    },
    {
      title: "Infrastructure Management",
      desc: "Optimized, secure network architectures and server migrations built for scale.",
      icon: <Monitor className="w-6 h-6" />,
      href: "/services/infrastructure-management",
      tags: ["Cloud Networks", "24/7 Monitoring"],
      viz: InfrastructureViz
    },
    {
      title: "Software Engineering",
      desc: "Custom enterprise applications built with modern architectures and clean code practices.",
      icon: <Code className="w-6 h-6" />,
      href: "/software",
      tags: ["Full-Stack", "Enterprise APIs"],
      viz: SoftwareEngineeringViz
    },
    {
      title: "Cloud Transformation",
      desc: "Architecting resilient multi-cloud environments and accelerating migration to modernize enterprise infrastructure.",
      icon: <Cloud className="w-6 h-6" />,
      href: "/technology/cloud-solutions",
      tags: ["Multi-Cloud", "Migration"],
      viz: CloudTransformationViz
    },
    {
      title: "AI Solutions",
      desc: "Deploying predictive models and generative AI pipelines to automate workflows and unlock operational intelligence.",
      icon: <Cpu className="w-6 h-6" />,
      href: "/technology/ai-machine-learning",
      tags: ["Generative AI", "Predictive Analytics"],
      viz: AISolutionsViz
    },
    {
      title: "DevOps",
      desc: "Streamlined CI/CD pipelines, infrastructure as code, and container orchestration at scale.",
      icon: <Zap className="w-6 h-6" />,
      href: "/technology/devops",
      tags: ["IaC", "Containerization"],
      viz: DevOpsViz
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center relative min-h-dvh bg-transparent overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════
          HERO CANVAS
      ═══════════════════════════════════════════════════ */}
      <section id="hero-section" className="relative w-full min-h-dvh flex flex-col justify-center overflow-hidden bg-background dark:bg-background" onMouseMove={handleMouseMove}>
        <style>{`
          .scrim-diagonal { background: linear-gradient(110deg, rgba(245,248,255,0.98) 0%, rgba(245,248,255,0.95) 20%, rgba(245,248,255,0.85) 40%, rgba(245,248,255,0.55) 58%, rgba(245,248,255,0.15) 72%, transparent 88%); }
          .scrim-mobile { background: linear-gradient(to right, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 60%, transparent 100%); }
          .dark .scrim-mobile { background: linear-gradient(to right, rgba(11,14,20,0.98) 0%, rgba(11,14,20,0.95) 60%, rgba(11,14,20,0.7) 85%, transparent 100%); }
          .scrim-diagonal-dark { background: linear-gradient(110deg, rgba(11,14,20,0.97) 0%, rgba(11,14,20,0.93) 20%, rgba(11,14,20,0.82) 40%, rgba(11,14,20,0.50) 58%, rgba(11,14,20,0.12) 72%, transparent 88%); }
        `}</style>
        
        {/* Layer 0: Full-Bleed Map Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <WorldMap forceDark={true} />
        </div>


        {/* Layer 1: Protective Gradient Scrim (Desktop – Light Mode) */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block dark:hidden scrim-diagonal" />

        {/* Layer 1: Protective Gradient Scrim (Desktop – Dark Mode) */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block light-hidden scrim-diagonal-dark" />
        
        {/* Layer 1: Protective Gradient Scrim (Mobile - Stronger & Wider) */}
        <div className="absolute inset-0 z-10 pointer-events-none md:hidden scrim-mobile dark:hidden" />

        {/* Layer 2: Hero Content */}
        <div className="relative z-20 w-full container mx-auto px-6 sm:px-8 pt-24 pb-4 lg:pt-[110px] xl:pt-[120px] 2xl:pt-[160px] flex flex-col min-h-dvh justify-between pointer-events-none">
          
          <div className="flex flex-col md:flex-row items-center md:items-stretch w-full flex-1 pb-2 lg:pb-4 xl:pb-6 2xl:pb-20 pointer-events-none">
            <motion.div 
              variants={enterpriseContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10px" }}
              className="flex flex-col justify-center gap-5 md:gap-6 lg:gap-5 xl:gap-6 2xl:gap-12 items-center md:items-start text-center md:text-left w-full md:w-[60%] lg:w-[50%] h-full pointer-events-auto"
            >
              
              {/* 1. BADGE/PILL */}
              <motion.div variants={enterpriseItem} className="flex items-center gap-2.5 bg-[#EEF3FF] border border-[#D6E4FF] dark:bg-white/5 dark:border-white/10 rounded-full px-4 py-1.5 shadow-sm backdrop-blur-md">
                <div className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75 dark:bg-[#5EC8FF]"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-[#5EC8FF]"></span>
                </div>
                <span className="text-[13px] lg:text-[14px] font-bold text-blue-700 dark:text-white tracking-wider uppercase">
                  GLOBAL ENTERPRISE CONSULTING
                </span>
              </motion.div>

              <div className="flex flex-col items-center md:items-start w-full gap-3 lg:gap-4 2xl:gap-6">
                {/* 2. MAIN HEADING */}
                <motion.h1 variants={enterpriseItem} className="font-extrabold tracking-tight text-[44px] md:text-[54px] lg:text-[44px] xl:text-[52px] leading-[1.05] m-0 p-0 text-[#0B1220] dark:text-[#F5F7FA]">
                  <span className="block">Engineering the</span>
                  <span className="block">Future of</span>
                  <span
                    className="animate-text-gradient text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 dark:from-[#3B82F6] dark:via-[#60A5FA] dark:to-[#22D3EE] block mt-1 2xl:mt-2"
                  >
                    Global Enterprise.
                  </span>
                </motion.h1>

                {/* 3. PARAGRAPH */}
                <motion.p variants={enterpriseItem} className="text-gray-600 dark:text-[#B8C0CC] text-base md:text-lg lg:text-[16px] xl:text-[18px] leading-[1.6] max-w-[540px] lg:max-w-[520px] xl:max-w-[600px]">
                  Architecting resilient cloud infrastructure, robust software engineering pipelines, and mission-critical digital transformations for global industry leaders.
                </motion.p>
              </div>

              {/* 4. BUTTON ROW */}
              <motion.div variants={enterpriseItem} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center md:justify-start mt-2">
                <Link
                  href="/contact"
                  aria-label="Schedule a consultation"
                  className="text-[15px] md:text-base bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-full py-3 px-7 lg:py-3.5 lg:px-8 shadow-[0_4px_20px_rgba(37,99,235,0.45)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.55)] flex items-center justify-center transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
                >
                  Schedule Consultation <span className="ml-2" aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/services"
                  aria-label="Explore our enterprise services"
                  className="text-[15px] md:text-base bg-transparent hover:bg-white/80 text-[#0B1220] border-blue-400/60 dark:hover:bg-white/8 dark:text-white font-medium border-[1.5px] dark:border-white/30 rounded-full py-3 px-7 lg:py-3.5 lg:px-8 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
                >
                  Our Services <span className="ml-2" aria-hidden="true">→</span>
                </Link>
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
      <section className="w-full py-16 md:py-20 relative z-10 bg-background" aria-label="Trusted Partners">
        <div className="w-full container px-6 sm:px-8 mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Our Clients
            </div>
            <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground tracking-tight">Trusted by Enterprise Leaders</h2>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">Partnering with global organizations across pharmaceuticals, telecommunications, and insurance to deliver mission-critical technology systems.</p>
          </div>

          <div 
            ref={marqueeRef}
            className="relative w-full overflow-hidden py-6"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
          >
            <div className="flex w-max will-change-transform" style={{ animation: 'marquee 30s linear infinite', animationPlayState: isMarqueeInView ? 'running' : 'paused' }} onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')} onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = isMarqueeInView ? 'running' : 'paused')}>
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



      {/* ═══════ SERVICES SECTION — TWO-TIER REDESIGN ═══════ */}
      <section className="w-full py-20 md:py-32 relative z-10 bg-background border-t border-border overflow-hidden" aria-label="Services">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(37,99,235,0.04) 0%, transparent 60%)' }} aria-hidden="true" />
        <div className="w-full container px-6 sm:px-8 mx-auto space-y-14 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-2">
              How We Deliver
            </div>
            <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground tracking-tight">One Partner. Full Technology Lifecycle.</h2>
            <p className="text-muted-foreground text-lg font-medium">From architecture strategy to cloud operations — comprehensive services built for complex, multi-national enterprise requirements.</p>
          </div>

          <motion.div
            variants={enterpriseContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-14"
          >
            {/* ── TIER 1: Featured Practice Areas ── */}
            <div className="grid gap-6 md:grid-cols-2">
            {/* IT Consulting */}
            <motion.div variants={enterpriseItem} className="h-full">
              <div
                onClick={() => router.push('/services/it-consulting')}
                className="cursor-pointer group h-full rounded-2xl border border-border bg-card overflow-hidden hover-card-effect flex flex-col"
                role="link"
                aria-label="Explore IT Consulting practice area"
              >
                <div className="h-[3px] w-full bg-gradient-to-r from-blue-600 to-blue-400" />
                <div className="flex flex-col flex-1 p-7 xl:p-8 gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors duration-200">
                        <Layers className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">IT Consulting</h3>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed max-w-[260px]">Strategic technology planning to align your technical assets with key business metrics.</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-3xl font-black text-foreground leading-none">20+</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">Tech Domains</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {services[0].tags?.map(f => (
                      <span key={f} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">{f}</span>
                    ))}
                  </div>
                  <div className="w-full rounded-xl bg-background/60 border border-border flex items-center justify-center py-2 flex-1 min-h-[100px]">
                    <ITConsultingViz />
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
                    Explore Practice <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Project Management */}
            <motion.div variants={enterpriseItem} className="h-full">
              <div
                onClick={() => router.push('/services/project-management')}
                className="cursor-pointer group h-full rounded-2xl border border-border bg-card overflow-hidden hover-card-effect flex flex-col"
                role="link"
                aria-label="Explore Project Management practice area"
              >
                <div className="h-[3px] w-full bg-gradient-to-r from-indigo-600 to-indigo-400" />
                <div className="flex flex-col flex-1 p-7 xl:p-8 gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:bg-indigo-500/20 transition-colors duration-200">
                        <Activity className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Project Management</h3>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed max-w-[260px]">Methodical agile project delivery ensuring deadlines are met with quality safeguards.</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-3xl font-black text-foreground leading-none">150+</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">Projects</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {services[1].tags?.map(f => (
                      <span key={f} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">{f}</span>
                    ))}
                  </div>
                  <div className="w-full rounded-xl bg-background/60 border border-border flex items-center justify-center py-2 flex-1 min-h-[100px]">
                    <ProjectManagementViz />
                  </div>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
                    Explore Practice <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </motion.div>
            </div>

          {/* ── TIER 2: Extended Capabilities (remaining 6 services) ── */}
          <div className="space-y-6">
              <motion.div variants={enterpriseItem} className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground px-2">Extended Capabilities</span>
                <div className="h-px flex-1 bg-border" />
              </motion.div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.slice(2).map((service) => {
                  const VizComponent = service.viz;
                  return (
                    <motion.div key={service.title} variants={enterpriseItem}>
                      <div
                        onClick={() => router.push(service.href)}
                        className="group h-full flex flex-col p-5 border border-border bg-card rounded-xl hover-card-effect cursor-pointer gap-3 relative overflow-hidden"
                        role="link"
                        aria-label={`Explore ${service.title} practice area`}
                      >
                        {/* Subtle top glow line on hover */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/60 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="flex items-start justify-between gap-2">
                          <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-[1.05] transition-all duration-200">
                            {service.icon}
                          </div>
                        </div>
                        
                        <div className="mt-1">
                          <h3 className="text-base font-bold text-foreground">{service.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed mt-1 line-clamp-2">{service.desc}</p>
                        </div>

                        {VizComponent && (
                          <div className="w-full rounded-xl bg-background/60 border border-border flex items-center justify-center py-2 flex-1 min-h-[90px] overflow-hidden my-1">
                            <div className="scale-[0.85] origin-center w-full flex justify-center">
                              <VizComponent />
                            </div>
                          </div>
                        )}

                        <span className="text-primary font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300 mt-auto pt-1">
                          Explore Practice <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* View All Services */}
          <div className="flex justify-center pt-2">
            <Link href="/services" className="group inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors duration-200">
              View All Services
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>



      {/* ═══════ TECHNOLOGY ECOSYSTEM ═══════ */}
      <section className="w-full py-20 md:py-32 relative z-10 border-t border-border bg-background" aria-label="Technology Ecosystem">
        <div className="w-full container px-6 sm:px-8 mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2563EB]/8 text-[#2563EB] border border-[#2563EB]/15 mb-2">
              Technology Ecosystem
            </div>
            <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground tracking-tight">Enterprise-Grade Technology Stack</h2>
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
                  <div className="flex items-center justify-between border-b-2 border-primary/20 pb-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono">
                      {cat.category}
                    </h4>
                    <Link href="/technology" className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group/link">
                      View all <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>
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
                    <div className="flex items-center justify-between border-b-2 border-primary/20 pb-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono">
                        {cat.category}
                      </h4>
                      <Link href="/technology" className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group/link">
                        View all <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {cat.items.map((tech) => (
                        <TechCard key={tech.name} tech={tech} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Explore CTA Row */}
          <div className="flex justify-center pt-2">
            <a
              href="/technology"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors group"
            >
              Explore Our Full Technology Stack
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-200"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>


      {/* ═══════ CORPORATE INTELLIGENCE (INSIGHTS & RESEARCH REPORTS) ═══════ */}
      <section id="corporate-intelligence" className="w-full py-20 md:py-32 relative z-10 bg-background border-t border-border" aria-label="Corporate Intelligence">
        <div className="w-full container px-6 sm:px-8 mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2563EB]/8 text-[#2563EB] border border-[#2563EB]/15 mb-2">
              Corporate Intelligence
            </div>
            <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground tracking-tight">
              Insights &amp; Research Reports
            </h2>
            <p className="text-muted-foreground text-lg font-medium">
              Explore our latest engineering audits, AI telemetry models, and digital transformation guides.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 pt-8">
            {insightsData.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
          {/* View All Insights */}
          <div className="flex justify-center pt-4">
            <Link href="/insights" className="group inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors duration-200">
              View All Insights
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>


      {/* ── Newsletter CTA Strip ── */}
      <div className="relative z-10 border-t border-b border-border/60 bg-background mt-20">
        <div className="w-full px-6 sm:px-12 md:px-24 lg:px-32 py-10 md:py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-md">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-2">
                Stay Connected
              </div>
              <h3 className="text-xl font-extrabold text-foreground tracking-tight">
                Enterprise Technology Insights
              </h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Research reports, cloud strategies, and digital transformation briefs — delivered to your inbox.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all duration-300 shadow-[0_4px_16px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.5)] hover:scale-[1.02] shrink-0"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Get in Touch
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
