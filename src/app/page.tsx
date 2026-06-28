"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1800, bounce: 0 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

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
  const [hovered, setHovered] = useState(false);
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center justify-center h-[120px] bg-card border rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden p-4 text-center select-none"
      style={{
        borderColor: hovered ? brandColor : `${brandColor}40`,
        boxShadow: hovered 
          ? `0 12px 24px ${brandColor}20, 0 0 15px ${brandColor}15` 
          : `0 4px 10px ${brandColor}06`,
      }}
    >
      {/* Real Unsplash background image with low opacity on idle, zooming on hover */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-50/50 dark:bg-slate-950/40 pointer-events-none">
        <img
          src={tech.image}
          alt={tech.name}
          className="w-full h-full object-cover opacity-[0.04] dark:opacity-[0.06] group-hover:opacity-[0.16] dark:group-hover:opacity-[0.24] scale-[1.02] group-hover:scale-[1.12] transition-all duration-500 ease-out pointer-events-none"
        />
        {/* Color overlay matching tech color */}
        <div 
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{ 
            backgroundColor: brandColor,
            opacity: hovered ? (isDark ? 0.12 : 0.08) : (isDark ? 0.05 : 0.03)
          }}
        />
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full pointer-events-none">
        {/* Logo container: colorful on idle, slightly scales and shifts on hover */}
        <div 
          className="w-10 h-10 flex items-center justify-center transition-all duration-300 shrink-0"
          style={{
            opacity: hovered ? 1 : 0.9,
            transform: hovered ? "translateY(-4px)" : "none",
          }}
        >
          {tech.logo}
        </div>

        <span 
          className="text-xs font-black text-foreground mt-2 transition-transform duration-300"
          style={{
            transform: hovered ? "translateY(-2px)" : "none",
          }}
        >
          {tech.name}
        </span>

        {/* Description fades in on hover */}
        <p 
          className="text-[9px] text-muted-foreground font-bold transition-opacity duration-300 mt-1 max-w-[130px] line-clamp-2 leading-relaxed"
          style={{
            opacity: hovered ? 1 : 0,
          }}
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
      className="group relative flex flex-col rounded-3xl border border-border bg-card transition-all duration-300 h-[440px] shadow-sm hover:border-[#2563EB] hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] hover:-translate-y-1 cursor-pointer select-none overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Image Header */}
      <div className="relative w-full h-40 shrink-0 overflow-hidden bg-slate-900 border-b border-border/40">
        <img 
          src={insight.image} 
          alt={insight.title}
          loading="lazy"
          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
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
      className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-8 transition-all duration-300 h-[340px] shadow-sm hover:border-[#2563EB] hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] hover:-translate-y-1 cursor-pointer select-none"
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

export default function Home() {
  const [stats, setStats] = useState({
    clientsCount: 14,
    experienceYears: 8,
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
            experienceYears: data.experienceYears || 8,
            engineersCount: data.engineersCount || 45,
          });
        }
      } catch (err) {
        console.error("Failed to load counters stats:", err);
      }
    }
    loadStats();
  }, []);

  const trustLogos = [
    { name: "Astellas", src: "/logos/astellas.webp" },
    { name: "Vodafone", src: "/logos/vodafone.webp" },
    { name: "Boston Scientific", src: "/logos/bostonScien.svg" },
    { name: "Ergo", src: "/logos/ergo.webp" },
    { name: "Pfizer", src: "/logos/pfizer.webp" },
    { name: "Tech Placements", src: "/logos/techPlacements.jpeg" },
  ];

  const doubleLogos = [...trustLogos, ...trustLogos];

  const services = [
    {
      title: "IT Consulting",
      desc: "Strategic technology planning to align your technical assets with key business metrics.",
      icon: <Layers className="w-6 h-6" />,
      href: "/services/it-consulting"
    },
    {
      title: "Project Management",
      desc: "Methodical agile project delivery ensuring deadlines are met with quality safeguards.",
      icon: <Activity className="w-6 h-6" />,
      href: "/services/project-management"
    },
    {
      title: "Test Management",
      desc: "Rigorous quality assurance testing pipelines built for modern enterprise applications.",
      icon: <Shield className="w-6 h-6" />,
      href: "/services/test-management"
    },
    {
      title: "Infrastructure",
      desc: "Optimized, secure network architectures and server migrations built for scale.",
      icon: <Monitor className="w-6 h-6" />,
      href: "/services/infrastructure-management"
    },
    {
      title: "Software Engineering",
      desc: "Custom enterprise applications built with modern architectures and clean code practices.",
      icon: <Code className="w-6 h-6" />,
      href: "/software"
    },
    {
      title: "Cloud Transformation",
      desc: "Seamless cloud migrations and multi-cloud strategies optimized for performance and cost.",
      icon: <Cloud className="w-6 h-6" />,
      href: "/technology/cloud-solutions"
    },
    {
      title: "AI Solutions",
      desc: "Intelligent automation, predictive analytics, and generative AI pipelines for business growth.",
      icon: <Cpu className="w-6 h-6" />,
      href: "/technology/ai-machine-learning"
    },
    {
      title: "DevOps",
      desc: "Streamlined CI/CD pipelines, infrastructure as code, and container orchestration at scale.",
      icon: <Zap className="w-6 h-6" />,
      href: "/technology/devops"
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center relative min-h-screen bg-transparent overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════
          HERO CANVAS
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[100vh] lg:min-h-[800px] pt-24 md:pt-32 pb-16 md:pb-0 overflow-hidden bg-[#FAFBFC] dark:bg-[#0B1220]">
        
        {/* Layer 0: Ambient Background Layer */}
        <WorldMap isAmbient={true} />

        {/* Layer 1: Base World Map (Right Panel) */}
        <WorldMap />

        {/* Layer 2: Hero Content (Left Column) */}
        <div className="relative z-20 w-full h-full container mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center">
          
          <motion.div 
            variants={enterpriseContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10px" }}
            className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-[45%] py-20 mt-12 md:mt-0"
          >
            
            {/* 1. BADGE/PILL */}
            <motion.div variants={enterpriseItem} className="flex items-center gap-2 bg-[#EEF3FF] dark:bg-blue-900/30 border border-[#D6E4FF] dark:border-blue-800 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 tracking-wider uppercase">
                Global Enterprise Consulting
              </span>
            </motion.div>

            {/* 2. MAIN HEADING */}
            <motion.h1 variants={enterpriseItem} className="font-extrabold tracking-tight text-[40px] md:text-[64px] lg:text-[72px] leading-[1.05] flex flex-col m-0 p-0 text-[#0B1220] dark:text-white">
              <span>Empowering</span>
              <span>Your</span>
              <span className="text-blue-600">Digital Future</span>
            </motion.h1>

            {/* 3. PARAGRAPH */}
            <motion.p variants={enterpriseItem} className="mt-6 text-gray-600 dark:text-gray-400 text-base md:text-[17px] leading-[1.6] max-w-[440px]">
              Expert IT consulting and technology solutions tailored to accelerate innovation, improve operational efficiency, and drive measurable business growth.
            </motion.p>

            {/* 4. BUTTON ROW */}
            <motion.div variants={enterpriseItem} className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center md:justify-start">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full py-[14px] px-[28px] shadow-sm flex items-center justify-center transition-colors w-full sm:w-auto">
                Get Started <span className="ml-2 font-normal">→</span>
              </button>
              <button className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-[#0B1220] dark:text-white font-medium border border-gray-300 dark:border-gray-700 rounded-full py-[14px] px-[28px] flex items-center justify-center transition-colors w-full sm:w-auto">
                Explore Services <span className="ml-2 font-normal">→</span>
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right Column (Reserved for Map - Currently populated by absolute WorldMap layer) */}
          <div className="w-full md:w-[55%] hidden md:block"></div>
        </div>
      </section>




      {/* ═══════ TRUSTED PARTNERS SECTION ═══════ */}
      <section className="w-full py-16 md:py-20 relative z-10 border-t border-border">
        <div className="container px-6 sm:px-8 mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Trusted Technology Partner</h2>
            <p className="text-muted-foreground text-sm font-medium max-w-lg mx-auto">Empowering enterprise brands across Ireland and Europe with innovative technology solutions.</p>
          </div>

          <div className="relative w-full overflow-hidden py-6">
            {/* Fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="animate-marquee flex items-center gap-20">
              {doubleLogos.map((logo, index) => (
                <div key={`${logo.name}-${index}`} className="flex items-center justify-center min-w-[140px] h-12 hover:scale-[1.02] transition-all duration-500 group">
                  <img 
                    src={logo.src} 
                    alt={`${logo.name} Logo`} 
                    className="max-w-[130px] max-h-9 object-contain select-none pointer-events-none transition-all duration-500"
                  />
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
                <SpotlightCard className="h-full flex flex-col p-7 space-y-4 border border-border bg-card group hover:border-[#2563EB]/20 rounded-2xl">
                  <div className="h-11 w-11 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center group-hover:bg-[#2563EB]/20 group-hover:scale-[1.02] transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.desc}
                  </p>
                  <Link href={service.href} className="text-[#2563EB] font-bold text-sm hover:underline mt-auto pt-4 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-300">
                    Learn more &rarr;
                  </Link>
                </SpotlightCard>
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
                <div className="p-6 bg-card border border-border rounded-2xl shadow-sm flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2563EB] flex items-center justify-center mb-6">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-foreground mb-1"><AnimatedCounter target={14} /></h4>
                    <p className="text-sm font-bold text-foreground">Enterprise Clients</p>
                    <p className="text-[11px] text-muted-foreground mt-1">across Ireland & Europe</p>
                  </div>
                </div>
                <div className="p-6 bg-card border border-border rounded-2xl shadow-sm flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2563EB] flex items-center justify-center mb-6">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-foreground mb-1"><AnimatedCounter target={99.9} suffix="%" /></h4>
                    <p className="text-sm font-bold text-foreground">SLA Uptime</p>
                    <p className="text-[11px] text-muted-foreground mt-1">guaranteed availability</p>
                  </div>
                </div>
                <div className="p-6 bg-card border border-border rounded-2xl shadow-sm flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2563EB] flex items-center justify-center mb-6">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-foreground mb-1"><AnimatedCounter target={8} /></h4>
                    <p className="text-sm font-bold text-foreground">Years Experience</p>
                    <p className="text-[11px] text-muted-foreground mt-1">in enterprise IT</p>
                  </div>
                </div>
                <div className="p-6 bg-card border border-border rounded-2xl shadow-sm flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2563EB] flex items-center justify-center mb-6">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-foreground mb-1"><AnimatedCounter target={45} /></h4>
                    <p className="text-sm font-bold text-foreground">Certified Engineers</p>
                    <p className="text-[11px] text-muted-foreground mt-1">across disciplines</p>
                  </div>
                </div>
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
