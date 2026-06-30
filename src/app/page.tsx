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
                <span>{insight.readTime} • {insight.date}</span>
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
                <span>Estimated: {insight.readTime.split(' ')[0]} Min</span>
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
  const logos = trustLogos.slice(0, 5);
  return (
    <div className="flex items-center mt-3 h-8 w-full max-w-[120px]">
      {logos.map((logo, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.8 }}
          className="w-7 h-7 rounded-full border-[1.5px] border-card bg-white dark:bg-white shadow-sm flex items-center justify-center -ml-2.5 first:ml-0 relative overflow-hidden"
          style={{ zIndex: 5 - i }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            <Image src={logo.src} alt={logo.name} fill className="object-contain p-1" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

function SLAUptimeViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="flex items-center mt-3 h-5 w-full max-w-[120px] bg-slate-100 dark:bg-slate-800/60 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700/50 relative">
      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
      <div
        style={{ animation: "slideRight 2s linear infinite", animationPlayState: isInView ? "running" : "paused" }}
        className="absolute top-0 bottom-0 w-1/2 flex items-center justify-center opacity-90"
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#22C55E]/40 to-transparent absolute inset-0" />
        <div className="w-1.5 h-3.5 bg-[#22C55E] rounded-full shadow-[0_0_8px_2px_rgba(34,197,94,0.8)] relative z-10" />
      </div>
    </div>
  );
}

function ExperienceTimelineViz() {
  return (
    <div className="flex items-center justify-between mt-3 h-6 w-full max-w-[120px] relative">
      <div className="absolute inset-x-0 h-1 bg-slate-200 dark:bg-slate-800/80 rounded-full overflow-hidden">
        {/* Static fill */}
        <div className="h-full w-full bg-[#2563EB]/80" />
        
        {/* Shimmer / Glow pulse */}
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
          viewport={{ once: false }}
          className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 z-10 relative" />
      ))}
    </div>
  );
}

function CertifiedEngineersViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  const skills = [
    { Icon: Cloud, color: "text-[#1E5FFF]", bg: "bg-[#1E5FFF]/10 dark:bg-[#1E5FFF]/20", border: "border-[#1E5FFF]/20" },
    { Icon: Code, color: "text-[#0EA5E9]", bg: "bg-[#0EA5E9]/10 dark:bg-[#0EA5E9]/20", border: "border-[#0EA5E9]/20" },
    { Icon: ShieldCheck, color: "text-[#16A34A]", bg: "bg-[#16A34A]/10 dark:bg-[#16A34A]/20", border: "border-[#16A34A]/20" },
  ];
  return (
    <div ref={ref} className="flex items-center justify-between mt-3 h-8 w-full max-w-[100px] relative">
      <style>{`
        @keyframes floatBob {
          0%, 100% { transform: translateY(-3px); }
          50% { transform: translateY(3px); }
        }
      `}</style>
      <div className="absolute left-4 right-4 h-[1px] border-t border-dashed border-slate-300 dark:border-slate-700/50 top-1/2 -translate-y-1/2 z-0" />
      {skills.map(({ Icon, color, bg, border }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: i * 0.15 }}
          viewport={{ once: false, amount: 0.8 }}
          className={`w-7 h-7 rounded-md flex items-center justify-center shadow-sm relative z-10 border ${bg} ${border} ${color}`}
        >
          <div style={{ animation: `floatBob 2.5s ease-in-out infinite ${i * 0.6}s`, animationPlayState: isInView ? "running" : "paused" }}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// --- MICRO-VISUALIZATION COMPONENTS FOR CORE COMPETENCIES ---
function ITConsultingViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 flex items-center justify-center relative max-w-[200px] mt-2">
      <style>{`
        @keyframes roadPulse {
          0% { stroke-dashoffset: 200; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: -200; opacity: 0; }
        }
        @keyframes labelFade {
          0%, 100% { opacity: 0.3; transform: translateY(2px); }
          50% { opacity: 1; transform: translateY(0); color: #1E5FFF; }
        }
        @keyframes ambientGlow {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(30, 95, 255, 0.2)); }
          50% { filter: drop-shadow(0 0 8px rgba(30, 95, 255, 0.6)); }
        }
      `}</style>
      <svg className="absolute inset-0 w-full h-full overflow-visible z-0" viewBox="0 0 200 80" preserveAspectRatio="none">
        <path d="M 10 60 L 50 30 L 100 50 L 150 20 L 190 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-200 dark:text-slate-700/60" />
        <path d="M 10 60 L 50 30 L 100 50 L 150 20 L 190 40" fill="none" stroke="#1E5FFF" strokeWidth="2.5" 
          strokeDasharray="40 400"
          strokeLinecap="round"
          style={{ animation: "roadPulse 4s linear infinite", animationPlayState: isInView ? "running" : "paused" }}
          className="drop-shadow-[0_0_6px_#1E5FFF]"
        />
      </svg>
      {[ 
        { x: "10px", y: "60px", delay: "0.2s", label: "DISCOVER" },
        { x: "50px", y: "30px", delay: "0.9s", label: "PLAN" },
        { x: "100px", y: "50px", delay: "1.8s", label: "ALIGN" },
        { x: "150px", y: "20px", delay: "2.7s", label: "DEPLOY" },
        { x: "190px", y: "40px", delay: "3.4s", label: "SCALE" },
      ].map((pos, i) => (
        <div key={i} className="absolute z-10 flex flex-col items-center" style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}>
           <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#1E5FFF] bg-card" style={{ animation: "ambientGlow 3s ease-in-out infinite", animationDelay: pos.delay, animationPlayState: isInView ? "running" : "paused" }} />
           <div className="absolute top-3.5 text-[8px] font-bold tracking-wider text-slate-400 dark:text-slate-500 whitespace-nowrap" style={{ animation: `labelFade 4s ease-in-out infinite ${pos.delay}`, animationPlayState: isInView ? "running" : "paused" }}>
             {pos.label}
           </div>
        </div>
      ))}
    </div>
  );
}

function ProjectManagementViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 flex items-start justify-between max-w-[200px] gap-2 relative mt-2">
      <style>{`
        @keyframes cardMove {
          0%, 15% { transform: translate(0px, 0px); opacity: 1; }
          20%, 35% { transform: translate(32px, -8px) rotate(4deg) scale(1.05); opacity: 0.9; box-shadow: 0 4px 12px rgba(30,95,255,0.2); }
          40%, 75% { transform: translate(66px, 12px); opacity: 1; }
          80%, 100% { transform: translate(66px, 12px); opacity: 0; }
        }
        @keyframes pulseCol {
          0%, 100% { background-color: rgba(30, 95, 255, 0.05); }
          50% { background-color: rgba(30, 95, 255, 0.15); }
        }
      `}</style>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex-1 h-full bg-slate-100/80 dark:bg-slate-800/40 rounded-lg p-2 flex flex-col gap-1.5 border border-slate-200/80 dark:border-slate-700/50 overflow-hidden relative">
           <div className="w-full h-1.5 bg-slate-300/80 dark:bg-slate-600 rounded-sm mb-1" />
           {i === 0 && (
             <>
               <div className="w-full h-6 bg-white dark:bg-slate-700 rounded-md shadow-sm border border-slate-200 dark:border-slate-600 opacity-30 p-1 flex flex-col gap-1">
                 <div className="w-3/4 h-1 bg-[#1E5FFF]/30 rounded-full" />
                 <div className="w-1/2 h-1 bg-slate-200 dark:bg-slate-600 rounded-full" />
               </div>
             </>
           )}
           {i === 1 && (
             <>
               <div className="w-full h-6 bg-white dark:bg-slate-700 rounded-md shadow-sm border border-slate-200 dark:border-slate-600 opacity-60 p-1 flex flex-col gap-1">
                 <div className="w-2/3 h-1 bg-[#22C55E]/40 rounded-full" />
                 <div className="w-1/2 h-1 bg-slate-200 dark:bg-slate-600 rounded-full" />
               </div>
               <div className="w-full h-6 bg-white dark:bg-slate-700 rounded-md shadow-sm border border-slate-200 dark:border-slate-600 opacity-20 p-1 flex flex-col gap-1" />
             </>
           )}
           {i === 2 && (
             <>
               <div className="w-full h-6 bg-white dark:bg-slate-700 rounded-md shadow-sm border border-slate-200 dark:border-slate-600 opacity-90 p-1 flex flex-col gap-1">
                 <div className="w-full h-1 bg-slate-200 dark:bg-slate-600 rounded-full" />
                 <div className="w-1/3 h-1 bg-[#22C55E]/80 rounded-full" />
               </div>
             </>
           )}
           {/* Active column indicator */}
           {i === 1 && <div className="absolute inset-0 z-0 pointer-events-none" style={{ animation: "pulseCol 4s ease-in-out infinite", animationPlayState: isInView ? "running" : "paused" }} />}
        </div>
      ))}
      <div 
        className="absolute top-[32px] left-[8px] w-[30%] h-6 bg-white dark:bg-slate-700 border border-[#1E5FFF]/60 rounded-md shadow-[0_2px_8px_rgba(30,95,255,0.15)] z-10 p-1 flex flex-col gap-1"
        style={{ animation: "cardMove 5s ease-in-out infinite", animationPlayState: isInView ? "running" : "paused" }}
      >
        <div className="w-3/4 h-1 bg-[#1E5FFF] rounded-full" />
        <div className="w-1/2 h-1 bg-slate-200 dark:bg-slate-500 rounded-full" />
      </div>
    </div>
  );
}

function TestManagementViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 flex items-center justify-between gap-4 max-w-[200px] mt-2 relative">
      <style>{`
        @keyframes testPop {
          0%, 15% { transform: scale(0); opacity: 0; }
          20%, 90% { transform: scale(1); opacity: 1; }
          95%, 100% { transform: scale(0); opacity: 0; }
        }
        @keyframes lineFill {
          0%, 15% { transform: scaleX(0); }
          25%, 90% { transform: scaleX(1); }
          95%, 100% { transform: scaleX(0); }
        }
        @keyframes counterTick {
          0% { content: "0%"; color: #64748b; }
          25% { content: "25%"; color: #64748b; }
          50% { content: "50%"; color: #64748b; }
          75% { content: "75%"; color: #64748b; }
          85%, 90% { content: "100%"; color: #22c55e; }
          95%, 100% { content: "0%"; color: #64748b; }
        }
        @keyframes counterTickDark {
          0% { content: "0%"; color: #94a3b8; }
          25% { content: "25%"; color: #94a3b8; }
          50% { content: "50%"; color: #94a3b8; }
          75% { content: "75%"; color: #94a3b8; }
          85%, 90% { content: "100%"; color: #4ade80; }
          95%, 100% { content: "0%"; color: #94a3b8; }
        }
        .animate-counter::after {
          content: "0%";
          animation: counterTick 5s steps(1) infinite;
        }
        .dark .animate-counter::after {
          animation: counterTickDark 5s steps(1) infinite;
        }
      `}</style>
      <div className="flex-1 flex flex-col justify-between h-full py-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="w-3.5 h-3.5 rounded-[4px] border-[1.5px] border-slate-300 dark:border-slate-600 flex items-center justify-center relative shrink-0">
              <div 
                style={{ animation: `testPop 5s ease-out infinite ${i * 0.8}s`, animationPlayState: isInView ? "running" : "paused" }}
                className="absolute inset-0 bg-[#22C55E] rounded-[2px] flex items-center justify-center shadow-[0_0_8px_rgba(34,197,94,0.4)]"
              >
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-[#1E5FFF] origin-left"
                style={{ animation: `lineFill 5s ease-out infinite ${i * 0.8}s`, animationPlayState: isInView ? "running" : "paused" }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-12 h-12 rounded-full border-[3px] border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-inner relative bg-card">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="21" cy="21" r="18" fill="none" stroke="#22C55E" strokeWidth="3" strokeDasharray="113" strokeDashoffset="113"
             style={{ animation: "lineFill 5s ease-in-out infinite 0.5s", animationPlayState: isInView ? "running" : "paused" }}
          />
        </svg>
        <span className="text-[12px] font-black animate-counter" style={{ animationPlayState: isInView ? "running" : "paused" }} />
      </div>
    </div>
  );
}

function InfrastructureViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 relative max-w-[200px] flex items-center justify-center mt-2">
      <style>{`
        @keyframes nodePulseLg {
          0%, 100% { transform: scale(0.9); box-shadow: 0 0 0px rgba(30,95,255,0); }
          50% { transform: scale(1.2); box-shadow: 0 0 12px rgba(30,95,255,0.6); }
        }
        @keyframes packetMove1 {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20%, 80% { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
      `}</style>
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <svg className="w-[180px] h-[80px] overflow-visible stroke-slate-200 dark:stroke-slate-700/60" strokeWidth="1.5">
          <path d="M 90 40 L 20 20 M 90 40 L 20 60 M 90 40 L 160 20 M 90 40 L 160 60 M 20 20 L 20 60 M 160 20 L 160 60 M 90 10 L 90 40" fill="none" />
          <path d="M 20 20 L 90 40 L 160 60" fill="none" stroke="#1E5FFF" strokeWidth="2.5" strokeDasharray="30 200" style={{ animation: "packetMove1 3s linear infinite", animationPlayState: isInView ? "running" : "paused" }} className="drop-shadow-[0_0_4px_#1E5FFF]" />
          <path d="M 160 20 L 90 40 L 20 60" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeDasharray="30 200" style={{ animation: "packetMove1 3.5s linear infinite 1s", animationPlayState: isInView ? "running" : "paused" }} className="drop-shadow-[0_0_4px_#22C55E]" />
          <path d="M 90 10 L 90 40" fill="none" stroke="#1E5FFF" strokeWidth="2.5" strokeDasharray="20 100" style={{ animation: "packetMove1 2s linear infinite 0.5s", animationPlayState: isInView ? "running" : "paused" }} />
        </svg>
      </div>
      {[
        { x: "20px", y: "20px", type: "small" },
        { x: "20px", y: "60px", type: "small" },
        { x: "160px", y: "20px", type: "small" },
        { x: "160px", y: "60px", type: "small" },
        { x: "90px", y: "10px", type: "small" },
        { x: "90px", y: "40px", type: "large" },
      ].map((pos, i) => (
        <div 
          key={i} 
          className={`absolute bg-card border-[1.5px] border-[#1E5FFF] z-10 flex items-center justify-center ${pos.type === "large" ? 'w-4 h-4 rounded-md' : 'w-2.5 h-2.5 rounded-full'}`}
          style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
        >
          <div 
            className={`bg-[#1E5FFF] ${pos.type === "large" ? 'w-2 h-2 rounded-sm' : 'w-full h-full rounded-full'}`}
            style={{ animation: pos.type === "large" ? "nodePulseLg 3s ease-in-out infinite" : "none", animationPlayState: isInView ? "running" : "paused" }}
          />
        </div>
      ))}
    </div>
  );
}

function SoftwareEngineeringViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 flex flex-col justify-start bg-[#F8FAFC] dark:bg-[#0F172A] rounded-lg px-4 py-3 max-w-[200px] border border-slate-200 dark:border-slate-700/60 shadow-inner relative overflow-hidden mt-2">
      <style>{`
        @keyframes typeLine1 { 0%, 10% { width: 0; opacity: 1; } 30%, 100% { width: 100%; opacity: 1; } }
        @keyframes typeLine2 { 0%, 35% { width: 0; opacity: 0; } 36% { opacity: 1; } 55%, 100% { width: 100%; opacity: 1; } }
        @keyframes typeLine3 { 0%, 60% { width: 0; opacity: 0; } 61% { opacity: 1; } 80%, 100% { width: 100%; opacity: 1; } }
        @keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes successFlash { 0%, 80% { opacity: 0; transform: scale(0.5); } 85%, 95% { opacity: 1; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
      <div className="flex items-center gap-1.5 mb-2.5 opacity-60">
        <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
        <div className="w-2 h-2 rounded-full bg-[#EAB308]" />
        <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
      </div>
      <div className="flex flex-col gap-1.5 font-mono text-[10px] tracking-tight text-left">
        <div className="relative flex items-center h-3 w-fit">
          <span className="text-[#1E5FFF] font-bold mr-1.5">&gt;</span>
          <div className="relative inline-flex items-center overflow-hidden">
            <span className="text-slate-700 dark:text-slate-300 whitespace-nowrap pr-1">sys.init()</span>
            <div className="absolute top-0 bottom-0 right-0 bg-[#F8FAFC] dark:bg-[#0F172A] origin-left" style={{ left: 0, animation: "typeLine1 5s steps(10, end) infinite", animationPlayState: isInView ? "running" : "paused" }} />
          </div>
        </div>
        <div className="relative flex items-center h-3 w-fit">
          <span className="text-[#1E5FFF] font-bold mr-1.5">&gt;</span>
          <div className="relative inline-flex items-center overflow-hidden">
            <span className="text-slate-700 dark:text-slate-300 whitespace-nowrap pr-1">build_pkg()</span>
            <div className="absolute top-0 bottom-0 right-0 bg-[#F8FAFC] dark:bg-[#0F172A] origin-left" style={{ left: 0, animation: "typeLine2 5s steps(10, end) infinite", animationPlayState: isInView ? "running" : "paused" }} />
          </div>
        </div>
        <div className="relative flex items-center h-3 w-fit">
          <span className="text-[#1E5FFF] font-bold mr-1.5">&gt;</span>
          <div className="relative inline-flex items-center overflow-hidden">
            <span className="text-slate-700 dark:text-slate-300 whitespace-nowrap pr-1">deploy()</span>
            <div className="absolute top-0 bottom-0 right-0 bg-[#F8FAFC] dark:bg-[#0F172A] origin-left" style={{ left: 0, animation: "typeLine3 5s steps(10, end) infinite", animationPlayState: isInView ? "running" : "paused" }} />
          </div>
          <div className="w-1.5 h-3 bg-[#1E5FFF] ml-1" style={{ animation: "cursorBlink 0.8s step-end infinite", animationPlayState: isInView ? "running" : "paused" }} />
        </div>
      </div>
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
        <div className="text-[#22C55E] text-[8px] font-bold uppercase tracking-wider" style={{ opacity: 0, animation: "successFlash 5s ease-out infinite", animationPlayState: isInView ? "running" : "paused" }}>SUCCESS</div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_6px_#22C55E]" style={{ opacity: 0, animation: "successFlash 5s ease-out infinite", animationPlayState: isInView ? "running" : "paused" }} />
      </div>
    </div>
  );
}

function CloudTransformationViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 flex flex-col items-center justify-start relative max-w-[200px] overflow-hidden mt-2 pt-2">
      <style>{`
        @keyframes cloudFloat {
          0%, 100% { transform: translateY(0); filter: drop-shadow(0 4px 12px rgba(30, 95, 255, 0.4)); }
          50% { transform: translateY(-4px); filter: drop-shadow(0 8px 20px rgba(30, 95, 255, 0.6)); }
        }
        @keyframes particleUpLarge {
          0% { transform: translateY(30px) scale(0.5); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(0px) scale(1); opacity: 0; }
        }
        @keyframes lineDash {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full stroke-[#1E5FFF]/20" strokeWidth="1.5">
          {[ 
            { x1: "20%", x2: "40%" },
            { x1: "50%", x2: "50%" },
            { x1: "80%", x2: "60%" }
          ].map((line, i) => (
             <line key={i} x1={line.x1} y1="100%" x2={line.x2} y2="40%" strokeDasharray="4 4" style={{ animation: "lineDash 2s linear infinite", animationPlayState: isInView ? "running" : "paused" }} />
          ))}
        </svg>
      </div>
      <div className="relative z-10 text-[#1E5FFF] bg-white dark:bg-slate-800 rounded-full p-2 border border-[#1E5FFF]/30" style={{ animation: "cloudFloat 4s ease-in-out infinite", animationPlayState: isInView ? "running" : "paused" }}>
        <Cloud className="w-8 h-8" fill="currentColor" fillOpacity={0.2} />
      </div>
      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div 
            key={i}
            className="w-1.5 h-1.5 bg-[#1E5FFF] rounded-full shadow-[0_0_6px_#1E5FFF]"
            style={{ animation: `particleUpLarge 2.5s ease-in infinite ${i * 0.4}s`, animationPlayState: isInView ? "running" : "paused", opacity: 0 }}
          />
        ))}
      </div>
    </div>
  );
}

function AISolutionsViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 relative max-w-[200px] flex items-center justify-center mt-2">
      <style>{`
        @keyframes neuralFire {
          0%, 100% { opacity: 0.2; transform: scale(0.8); background-color: transparent; }
          20%, 40% { opacity: 1; transform: scale(1.3); background-color: #1E5FFF; box-shadow: 0 0 10px #1E5FFF; }
        }
        @keyframes pathFire {
          0%, 100% { opacity: 0.1; filter: drop-shadow(0 0 0px #1E5FFF); }
          20%, 40% { opacity: 1; filter: drop-shadow(0 0 4px #1E5FFF); }
        }
      `}</style>
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <svg className="w-[180px] h-[80px] overflow-visible" strokeWidth="1.5">
          {[
            { x1: "15%", y1: "50%", x2: "40%", y2: "20%", delay: "0s" },
            { x1: "15%", y1: "50%", x2: "40%", y2: "80%", delay: "0.2s" },
            { x1: "40%", y1: "20%", x2: "65%", y2: "50%", delay: "0.4s" },
            { x1: "40%", y1: "80%", x2: "65%", y2: "50%", delay: "0.6s" },
            { x1: "65%", y1: "50%", x2: "90%", y2: "20%", delay: "0.8s" },
            { x1: "65%", y1: "50%", x2: "90%", y2: "80%", delay: "1.0s" },
          ].map((line, i) => (
             <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#1E5FFF" style={{ opacity: 0.1, animation: `pathFire 3s ease-in-out infinite ${line.delay}`, animationPlayState: isInView ? "running" : "paused" }} />
          ))}
        </svg>
      </div>
      {[
        { left: "15%", top: "50%", delay: "0s" },
        { left: "40%", top: "20%", delay: "0.2s" },
        { left: "40%", top: "80%", delay: "0.2s" },
        { left: "65%", top: "50%", delay: "0.6s" },
        { left: "90%", top: "20%", delay: "0.8s" },
        { left: "90%", top: "80%", delay: "1.0s" },
      ].map((pos, i) => (
        <div 
          key={i} 
          className="absolute w-2 h-2 bg-card border-[1.5px] border-[#1E5FFF] rounded-full z-10 transition-colors"
          style={{ left: pos.left, top: pos.top, transform: "translate(-50%, -50%)", animation: `neuralFire 3s ease-in-out infinite ${pos.delay}`, animationPlayState: isInView ? "running" : "paused" }}
        />
      ))}
    </div>
  );
}

function DevOpsViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  return (
    <div ref={ref} className="w-full h-24 flex items-center justify-between relative max-w-[200px] mt-2">
      <style>{`
        @keyframes pipelineSweep {
          0% { transform: translateX(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(500%); opacity: 0; }
        }
        @keyframes stageActive {
          0%, 100% { border-color: transparent; }
          15%, 35% { border-color: #1E5FFF; box-shadow: 0 0 12px rgba(30, 95, 255, 0.4); }
        }
        @keyframes iconSpin {
          0% { transform: rotate(0deg); opacity: 0.2; }
          15%, 35% { transform: rotate(180deg); opacity: 1; color: #1E5FFF; }
          50%, 100% { transform: rotate(360deg); opacity: 0.2; }
        }
      `}</style>
      <div className="absolute left-2 right-2 h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
        <div 
          className="w-1/4 h-full bg-[#1E5FFF] shadow-[0_0_10px_#1E5FFF]"
          style={{ animation: "pipelineSweep 4s linear infinite", animationPlayState: isInView ? "running" : "paused" }}
        />
      </div>
      {[0, 1, 2, 3, 4].map((i) => (
        <div 
          key={i}
          className="w-6 h-6 bg-card border-[2px] border-slate-200 dark:border-slate-700 rounded-full relative z-10 flex items-center justify-center overflow-hidden transition-colors"
          style={{ animation: `stageActive 4s ease-in-out infinite ${i * 0.8}s`, animationPlayState: isInView ? "running" : "paused" }}
        >
          {i === 4 ? (
             <svg className="w-3 h-3 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{ animation: `iconSpin 4s ease-in-out infinite ${i * 0.8}s`, animationPlayState: isInView ? "running" : "paused" }}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
             </svg>
          ) : (
             <svg className="w-3 h-3 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ animation: `iconSpin 4s ease-in-out infinite ${i * 0.8}s`, animationPlayState: isInView ? "running" : "paused" }}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
             </svg>
          )}
        </div>
      ))}
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
      desc: "Seamless cloud migrations and multi-cloud strategies optimized for performance and cost.",
      icon: <Cloud className="w-6 h-6" />,
      href: "/technology/cloud-solutions",
      viz: CloudTransformationViz
    },
    {
      title: "AI Solutions",
      desc: "Intelligent automation, predictive analytics, and generative AI pipelines for business growth.",
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
      <section id="hero-section" className="relative w-full min-h-[100vh] lg:h-[100vh] lg:max-h-[100vh] lg:min-h-0 flex flex-col justify-center overflow-hidden bg-white dark:bg-[#050810]" onMouseMove={handleMouseMove}>
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
        <div className="relative z-20 w-full container mx-auto px-6 sm:px-8 pt-32 pb-8 lg:pt-[100px] xl:pt-[120px] lg:pb-6 flex flex-col h-full min-h-[100vh] lg:h-auto lg:min-h-0 pointer-events-none">
          
          <div className="flex flex-col md:flex-row items-center w-full my-auto pb-12 lg:pb-4 pointer-events-none">
            <motion.div 
              variants={enterpriseContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10px" }}
              className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-[60%] lg:w-[50%] pointer-events-auto"
            >
              
              {/* 1. BADGE/PILL */}
              <motion.div variants={enterpriseItem} className="flex items-center gap-2.5 bg-[#EEF3FF] border border-[#D6E4FF] dark:bg-white/5 dark:border-white/10 rounded-full px-4 py-1.5 mb-6 lg:mb-3 shadow-sm backdrop-blur-md">
                <div className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75 dark:bg-[#5EC8FF]"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-[#5EC8FF]"></span>
                </div>
                <span className="text-[13px] lg:text-[14px] font-bold text-blue-700 dark:text-white tracking-wider uppercase">
                  Global Enterprise Consulting
                </span>
              </motion.div>

              {/* 2. MAIN HEADING */}
              <motion.h1 variants={enterpriseItem} className="font-extrabold tracking-tight text-[48px] md:text-[64px] lg:text-[52px] xl:text-[60px] leading-[1.05] flex flex-col m-0 p-0 text-[#0B1220] dark:text-[#F5F7FA]">
                <span>Empowering</span>
                <span>Your</span>
                <span 
                  className="animate-text-gradient text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-[#3B82F6] dark:to-[#22D3EE]"
                >
                  Digital Future
                </span>
              </motion.h1>

              {/* 3. PARAGRAPH */}
              <motion.p variants={enterpriseItem} className="mt-6 lg:mt-4 text-gray-600 dark:text-[#B8C0CC] text-lg md:text-[19px] lg:text-[17px] xl:text-[18px] leading-[1.6] max-w-[480px] lg:max-w-[440px] xl:max-w-[500px]">
                Expert IT consulting and technology solutions tailored to accelerate innovation, improve operational efficiency, and drive measurable business growth.
              </motion.p>

              {/* 4. BUTTON ROW */}
              <motion.div variants={enterpriseItem} className="mt-8 lg:mt-6 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center md:justify-start">
                <button className="text-lg bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full py-[14px] px-[28px] lg:py-[12px] lg:px-[24px] shadow-sm flex items-center justify-center transition-colors w-full sm:w-auto">
                  Get Started <span className="ml-2 font-normal">→</span>
                </button>
                <button className="text-lg bg-transparent hover:bg-gray-50 text-[#0B1220] border-[#9CA7B5] dark:hover:bg-white/5 dark:text-white font-medium border-[1.5px] dark:border-white/30 rounded-full py-[14px] px-[28px] lg:py-[12px] lg:px-[24px] flex items-center justify-center transition-colors w-full sm:w-auto">
                  Explore Services <span className="ml-2 font-normal">→</span>
                </button>
              </motion.div>
            </motion.div>
            
            {/* Spacer for Right Column (Map Focus Area) */}
            <div className="hidden md:block md:w-[40%] lg:w-[50%]"></div>
          </div>
          
          {/* 5. STATS CARDS (Bottom Aligned) */}
          <div className="w-full mt-auto relative z-30 pointer-events-auto">
            <motion.div 
              variants={enterpriseContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pb-4 md:pb-0"
            >
              
              {/* Card 1 */}
              <motion.div variants={enterpriseItem}>
                <SpotlightCard borderGlow={false} className="relative w-full !bg-white/70 dark:!bg-slate-900/70 backdrop-blur-md border border-gray-200/50 dark:border-slate-800/50 rounded-[16px] p-4 lg:p-3 xl:p-4 flex flex-col justify-start text-left cursor-pointer h-full hover-card-effect overflow-hidden shadow-sm">
                  <div className="w-9 h-9 md:w-11 md:h-11 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-xl bg-[#1E5FFF]/10 flex items-center justify-center mb-3 lg:mb-2 text-[#1E5FFF]">
                    <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-[24px] md:text-[28px] lg:text-[18px] xl:text-[22px] font-bold text-[#0B1220] dark:text-white leading-none mb-1.5 lg:mb-1"><AnimatedCounter target={150} suffix="+" delay={0} /></div>
                  <div className="text-[10px] md:text-[11px] lg:text-[10px] xl:text-[11px] font-semibold text-gray-500 uppercase tracking-wider leading-[1.3]">Projects<br/>Delivered</div>
                </SpotlightCard>
              </motion.div>

              {/* Card 2 */}
              <motion.div variants={enterpriseItem}>
                <SpotlightCard borderGlow={false} className="relative w-full !bg-white/70 dark:!bg-slate-900/70 backdrop-blur-md border border-gray-200/50 dark:border-slate-800/50 rounded-[16px] p-4 lg:p-3 xl:p-4 flex flex-col justify-start text-left cursor-pointer h-full hover-card-effect overflow-hidden shadow-sm">
                  <div className="w-9 h-9 md:w-11 md:h-11 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-xl bg-[#1E5FFF]/10 flex items-center justify-center mb-3 lg:mb-2 text-[#1E5FFF]">
                    <Layers className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-[24px] md:text-[28px] lg:text-[18px] xl:text-[22px] font-bold text-[#0B1220] dark:text-white leading-none mb-1.5 lg:mb-1"><AnimatedCounter target={20} suffix="+" delay={150} /></div>
                  <div className="text-[10px] md:text-[11px] lg:text-[10px] xl:text-[11px] font-semibold text-gray-500 uppercase tracking-wider leading-[1.3]">Technology<br/>Domains</div>
                </SpotlightCard>
              </motion.div>

              {/* Card 3 */}
              <motion.div variants={enterpriseItem}>
                <SpotlightCard borderGlow={false} className="relative w-full !bg-white/70 dark:!bg-slate-900/70 backdrop-blur-md border border-gray-200/50 dark:border-slate-800/50 rounded-[16px] p-4 lg:p-3 xl:p-4 flex flex-col justify-start text-left cursor-pointer h-full hover-card-effect overflow-hidden shadow-sm">
                  <div className="w-9 h-9 md:w-11 md:h-11 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-xl bg-[#1E5FFF]/10 flex items-center justify-center mb-3 lg:mb-2 text-[#1E5FFF]">
                    <Globe className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-[24px] md:text-[28px] lg:text-[18px] xl:text-[22px] font-bold text-[#0B1220] dark:text-white leading-none mb-1.5 lg:mb-1"><AnimatedCounter target={6} delay={300} /></div>
                  <div className="text-[10px] md:text-[11px] lg:text-[10px] xl:text-[11px] font-semibold text-gray-500 uppercase tracking-wider leading-[1.3]">Global Delivery<br/>Hubs</div>
                </SpotlightCard>
              </motion.div>

              {/* Card 4 */}
              <motion.div variants={enterpriseItem}>
                <SpotlightCard borderGlow={false} className="relative w-full !bg-white/70 dark:!bg-slate-900/70 backdrop-blur-md border border-gray-200/50 dark:border-slate-800/50 rounded-[16px] p-4 lg:p-3 xl:p-4 flex flex-col justify-start text-left cursor-pointer h-full hover-card-effect overflow-hidden shadow-sm">
                  <div className="w-9 h-9 md:w-11 md:h-11 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-xl bg-[#1E5FFF]/10 flex items-center justify-center mb-3 lg:mb-2 text-[#1E5FFF]">
                    <Headset className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-[24px] md:text-[28px] lg:text-[18px] xl:text-[22px] font-bold text-[#0B1220] dark:text-white leading-none mb-1.5 lg:mb-1"><AnimatedCounter target={24} suffix="/7" delay={450} /></div>
                  <div className="text-[10px] md:text-[11px] lg:text-[10px] xl:text-[11px] font-semibold text-gray-500 uppercase tracking-wider leading-[1.3]">Enterprise<br/>Support</div>
                </SpotlightCard>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>




      {/* ═══════ TRUSTED PARTNERS SECTION ═══════ */}
      <section className="w-full py-16 md:py-20 relative z-10 bg-white dark:bg-background">
        <div className="container px-6 sm:px-8 mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Trusted Technology Partner</h2>
            <p className="text-muted-foreground text-sm font-medium max-w-lg mx-auto">Empowering enterprise brands across Ireland and Europe with innovative technology solutions.</p>
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
                  <SpotlightCard borderGlow={false} className="h-full flex flex-col p-7 space-y-4 border border-border bg-card group rounded-2xl hover-card-effect">
                  <div className="h-11 w-11 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center group-hover:bg-[#2563EB]/20 group-hover:scale-[1.02] transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="w-full py-1">
                    {service.viz && <service.viz />}
                  </div>
                  <span className="text-[#2563EB] font-bold text-sm hover:underline mt-auto inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-300">
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
      <section className="w-full py-20 md:py-32 relative z-10 border-t border-border bg-[#F8FAFC] dark:bg-background overflow-hidden">
        <div className="container px-6 sm:px-8 mx-auto space-y-12">
          <div className="text-center md:text-left max-w-3xl space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-[#2563EB]/10 inline-block px-3 py-1 rounded-full mb-2">Technology Ecosystem</h2>
            <h3 className="text-3xl font-extrabold sm:text-4xl text-foreground tracking-tight">Enterprise-Grade Technology Stack</h3>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">Industry-leading tools and platforms powering our consulting and delivery capabilities.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 pt-8">
            {/* Left: Stats Box */}
            <div className="lg:col-span-5 flex items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <SpotlightCard borderGlow={false} className="flex flex-col justify-between shadow-sm hover-card-effect p-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2563EB] flex items-center justify-center mb-6">
                    <Users size={20} />
                  </div>
                  <div className="w-full">
                    <h4 className="text-3xl font-black text-foreground mb-1"><AnimatedCounter target={stats.clientsCount} /></h4>
                    <p className="text-sm font-bold text-foreground">Enterprise Clients</p>
                    <p className="text-[11px] text-muted-foreground mt-1">across Ireland & Europe</p>
                    <EnterpriseClientsViz />
                  </div>
                </SpotlightCard>
                <SpotlightCard borderGlow={false} className="flex flex-col justify-between shadow-sm hover-card-effect p-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2563EB] flex items-center justify-center mb-6">
                    <Award size={20} />
                  </div>
                  <div className="w-full">
                    <h4 className="text-3xl font-black text-foreground mb-1"><AnimatedCounter target={99.9} suffix="%" /></h4>
                    <p className="text-sm font-bold text-foreground">SLA Uptime</p>
                    <p className="text-[11px] text-muted-foreground mt-1">guaranteed availability</p>
                    <SLAUptimeViz />
                  </div>
                </SpotlightCard>
                <SpotlightCard borderGlow={false} className="flex flex-col justify-between shadow-sm hover-card-effect p-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2563EB] flex items-center justify-center mb-6">
                    <Clock size={20} />
                  </div>
                  <div className="w-full">
                    <h4 className="text-3xl font-black text-foreground mb-1"><AnimatedCounter target={stats.experienceYears} /></h4>
                    <p className="text-sm font-bold text-foreground">Years Experience</p>
                    <p className="text-[11px] text-muted-foreground mt-1">in enterprise IT</p>
                    <ExperienceTimelineViz />
                  </div>
                </SpotlightCard>
                <SpotlightCard borderGlow={false} className="flex flex-col justify-between shadow-sm hover-card-effect p-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2563EB] flex items-center justify-center mb-6">
                    <Briefcase size={20} />
                  </div>
                  <div className="w-full">
                    <h4 className="text-3xl font-black text-foreground mb-1"><AnimatedCounter target={stats.engineersCount} /></h4>
                    <p className="text-sm font-bold text-foreground">Certified Engineers</p>
                    <p className="text-[11px] text-muted-foreground mt-1">across disciplines</p>
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

      {/* ═══════ FOOTER ═══════ */}
      <footer className="w-full py-12 border-t border-border bg-background text-center">
        <p className="text-muted-foreground text-sm">© 2026 Jeshurun. All rights reserved.</p>
      </footer>
    </div>
  );
}
