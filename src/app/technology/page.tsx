"use client";

import { useState, useEffect, useRef } from "react";
import { motion, Variants, useInView, useReducedMotion } from "framer-motion";
import {
  Cloud, Database, ShieldCheck, Cpu, Network, Workflow, ArrowRight,
  Code2, Settings,
  Compass, Globe, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PremiumCTA } from "@/components/PremiumCTA";
import { ProcessTimeline } from "@/components/ProcessTimeline";

import { GalaxySpiral } from "@/components/GalaxySpiral";
import { AnimatedCounter } from "@/components/HeroStatsPanel";

const enterpriseContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const enterpriseItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

const SDLC_STAGES = [
  {
    title: "Discovery & Architecture",
    desc: "System design, threat modeling, and architecture planning.",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    title: "Agile Engineering",
    desc: "Modern development powered by CI/CD and automation.",
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    title: "QA & Security Auditing",
    desc: "Automated testing, penetration testing, and compliance validation.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    title: "DevOps & Global Scale",
    desc: "Multi-region deployment and continuous operational monitoring.",
    icon: <Settings className="w-6 h-6" />,
  },
];

// heroStats is managed globally by HeroStatsPanel
function TechnologyStrip({ tech, router, index }: { tech: any; router: any; index: number }) {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  const pulseNodes = [
    { top: "25%", left: "30%", delay: 0 },
    { top: "60%", left: "70%", delay: 1.5 },
    { top: "40%", left: "50%", delay: 0.7 },
  ];

  return (
    <div id={tech.slug} className="py-16 md:py-24 scroll-mt-28" ref={ref}>
      <div className="container px-6 sm:px-8 mx-auto">
        <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-20 items-center`}>
          {/* IMAGE PANEL */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -32 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[46%] shrink-0"
          >
            <div className={`relative rounded-2xl overflow-hidden border ${tech.accentBorder} shadow-lg aspect-[4/3] bg-muted group flex items-center justify-center`}>
              {/* Photorealistic image background with hover scale */}
              <Image
                src={tech.image}
                alt={tech.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Glowing Pulse Nodes Overlay */}
              {!prefersReducedMotion && isInView && pulseNodes.map((node, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 rounded-full bg-cyan-400/20 blur-xl pointer-events-none mix-blend-screen"
                  style={{ top: node.top, left: node.left }}
                  animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.5, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Title Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2.5 bg-black/40 backdrop-blur-md border border-white/15 rounded-xl px-3.5 py-2">
                <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${tech.accentColor} flex items-center justify-center text-white shrink-0 relative overflow-hidden`}>
                  {tech.slug === "cybersecurity" && (
                    <>
                      <style>{`
                        @keyframes scanSweepInline {
                          0%, 10% { transform: translateX(-110%); opacity: 0; }
                          20% { opacity: 1; }
                          80% { opacity: 1; }
                          90%, 100% { transform: translateX(250%); opacity: 0; }
                        }
                      `}</style>
                      <div 
                        className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#EF4444] to-transparent shadow-[0_0_6px_rgba(239,68,68,0.9)] z-20 left-0"
                        style={{ 
                          animation: "scanSweepInline 3s linear infinite",
                          animationPlayState: isInView ? "running" : "paused"
                        }}
                      />
                    </>
                  )}
                  <span className="scale-[0.8]">{tech.icon}</span>
                </div>
                <span className="text-white text-sm font-bold tracking-wide">{tech.title}</span>
              </div>

              {/* Stat Badge */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/15 rounded-xl px-4 py-2.5 text-center min-w-[120px]">
                <div className="text-white text-2xl font-black leading-none min-h-[1.5rem]">
                  {tech.counter.isNumeric ? (
                    <AnimatedCounter 
                      target={tech.counter.target} 
                      prefix={tech.counter.prefix || ""} 
                      suffix={tech.counter.suffix || ""} 
                      delay={100}
                    />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 5 }}
                      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 5 }}
                      transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 100 }}
                    >
                      {tech.stat}
                    </motion.div>
                  )}
                </div>
                <div className="text-white/70 text-[9px] font-bold uppercase tracking-widest mt-1">{tech.statLabel}</div>
              </div>
            </div>
          </motion.div>

          {/* CONTENT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 32 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="flex-1 space-y-6 min-w-0"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${tech.accentBg} ${tech.accentText} border ${tech.accentBorder} text-xs font-bold uppercase tracking-wider`}>
              <span className={`w-1.5 h-1.5 rounded-full bg-current`} />
              Domain Expertise
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              {tech.title}
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
              {tech.description}
            </p>

            <ul className="space-y-3 pt-2">
              {tech.tags.map((tag: string, i: number) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-base font-semibold text-foreground"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  {tag}
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button 
                onClick={() => router.push(`/technology/${tech.slug}`)}
                className="group inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-full text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore {tech.title}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const TECH_PROCESS = [
  {
    title: "Discovery & Architecture",
    desc: "Comprehensive analysis of existing capabilities and strategic target state mapping.",
    icon: <Compass className="w-6 h-6" />,
    accentColor: "blue-600"
  },
  {
    title: "Agile Engineering",
    desc: "Iterative development cycles ensuring rapid feature delivery and high test coverage.",
    icon: <Cpu className="w-6 h-6" />,
    accentColor: "blue-500"
  },
  {
    title: "QA & Security Auditing",
    desc: "Continuous automated testing and penetration testing across all environments.",
    icon: <ShieldCheck className="w-6 h-6" />,
    accentColor: "cyan-500"
  },
  {
    title: "DevOps & Global Scale",
    desc: "Infrastructure-as-code deployment and auto-scaling production release.",
    icon: <Globe className="w-6 h-6" />,
    accentColor: "cyan-400"
  }
];

export default function Technology() {
  const router = useRouter();

  const technologies = [
    {
      title: "Cloud Solutions",
      slug: "cloud-solutions",
      image: "/images/cloud_solutions_datacenter.png",
      description: "Build secure and scalable cloud environments across AWS, Azure, and GCP to support business growth and uninterrupted operations.",
      icon: <Cloud className="w-6 h-6" />,
      accentColor: "from-blue-600 to-blue-400",
      accentBg: "bg-blue-500/10",
      accentText: "text-blue-600 dark:text-blue-400",
      accentBorder: "border-blue-500/20",
      stat: "3 Platforms",
      statLabel: "AWS • Azure • GCP",
      tags: ["Multi-Cloud", "Auto-Scaling", "Cost Optimisation"],
      counter: { target: 3, suffix: " Platforms", isNumeric: true }
    },
    {
      title: "Data Management",
      slug: "data-management",
      image: "/images/data_management_analytics.png",
      description: "Design resilient data lakes and advanced analytics pipelines to turn raw information into actionable business intelligence.",
      icon: <Database className="w-6 h-6" />,
      accentColor: "from-indigo-600 to-indigo-400",
      accentBg: "bg-indigo-500/10",
      accentText: "text-indigo-600 dark:text-indigo-400",
      accentBorder: "border-indigo-500/20",
      stat: "100%",
      statLabel: "SLA Match Rate",
      tags: ["Data Lakes", "ETL Pipelines", "GDPR Compliant"],
      counter: { target: 100, suffix: "%", isNumeric: true }
    },
    {
      title: "Cybersecurity",
      slug: "cybersecurity",
      image: "/images/cybersecurity_operations.png",
      description: "Implement Zero-Trust architectures to protect your mission-critical digital assets against emerging global threats.",
      icon: <ShieldCheck className="w-6 h-6" />,
      accentColor: "from-red-600 to-rose-400",
      accentBg: "bg-red-500/10",
      accentText: "text-red-600 dark:text-red-400",
      accentBorder: "border-red-500/20",
      stat: "<1s",
      statLabel: "Threat Detection",
      tags: ["Zero-Trust", "ISO 27001", "Pen Testing"],
      counter: { target: 1, prefix: "<", suffix: "s", isNumeric: false }
    },
    {
      title: "AI & Machine Learning",
      slug: "ai-machine-learning",
      image: "/images/ai_machine_learning_lab.png",
      description: "Deploy intelligent automation and predictive models to increase operational agility and drive strategic innovation.",
      icon: <Cpu className="w-6 h-6" />,
      accentColor: "from-violet-600 to-purple-400",
      accentBg: "bg-violet-500/10",
      accentText: "text-violet-600 dark:text-violet-400",
      accentBorder: "border-violet-500/20",
      stat: "<50ms",
      statLabel: "Response Latency",
      tags: ["GenAI / LLMs", "Predictive Models", "MLOps"],
      counter: { target: 50, prefix: "<", suffix: "ms", isNumeric: false }
    },
    {
      title: "Network Infrastructure",
      slug: "network-infrastructure",
      image: "/images/network_infrastructure_ops.png",
      description: "Optimize high-throughput network backbones for secure, low-latency global connectivity.",
      icon: <Network className="w-6 h-6" />,
      accentColor: "from-sky-600 to-cyan-400",
      accentBg: "bg-sky-500/10",
      accentText: "text-sky-600 dark:text-sky-400",
      accentBorder: "border-sky-500/20",
      stat: "10Gbps",
      statLabel: "Network Bandwidth",
      tags: ["SD-WAN", "Edge CDN", "DDoS Protection"],
      counter: { target: 10, suffix: "Gbps", isNumeric: false }
    },
    {
      title: "DevOps",
      slug: "devops",
      image: "/images/devops_pipeline_ops.png",
      description: "Accelerate software delivery with automated CI/CD pipelines and infrastructure-as-code for reliable, rapid deployments.",
      icon: <Workflow className="w-6 h-6" />,
      accentColor: "from-emerald-600 to-green-400",
      accentBg: "bg-emerald-500/10",
      accentText: "text-emerald-600 dark:text-emerald-400",
      accentBorder: "border-emerald-500/20",
      stat: "Instant",
      statLabel: "Rollback Speed",
      tags: ["CI/CD Automation", "IaC (Terraform)", "Observability"],
      counter: { target: 1, prefix: "<", suffix: "s (Instant)", isNumeric: false }
    },
  ];

  const capabilityMap: Record<string, string> = {
    "Enterprise Architecture": "network-infrastructure",
    "High-Availability Cloud": "cloud-solutions",
    "DevSecOps": "devops",
    "AI Automation": "ai-machine-learning",
    "Data Engineering": "data-management",
    "Zero-Trust Security": "cybersecurity",
  };

  const [activeCapability, setActiveCapability] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveCapability(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );
    Object.values(capabilityMap).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-transparent min-h-dvh">

      {/* HERO BANNER */}
      <section className="w-full pt-32 pb-20 md:pt-40 md:pb-28 relative z-10 bg-background overflow-hidden border-b border-border">
        
        {/* Layer 0.5: Galaxy Spiral Particle Animation */}
        <div className="absolute inset-0 w-full h-full z-[1] overflow-hidden pointer-events-none">
          <GalaxySpiral />
        </div>

        <motion.div
          variants={enterpriseContainer}
          initial="hidden"
          animate="show"
          className="container px-6 sm:px-8 mx-auto relative z-10"
        >
          {/* Subtle glowing orb behind text for perfect contrast */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-background/60 blur-[100px] rounded-full pointer-events-none -z-10 dark:bg-[#0B0E14]/70" />
          <div className="flex flex-col items-center text-center space-y-6 max-w-5xl mx-auto">
            <motion.div
              variants={enterpriseItem}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-md border border-primary/20 text-[13px] font-extrabold uppercase tracking-[0.15em] text-primary shadow-[0_0_30px_rgba(18,171,219,0.15)] ring-1 ring-white/10"
            >
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full w-2 h-2 bg-primary shadow-[0_0_10px_rgba(18,171,219,1)]"></span>
              </span>
              Technology Domains
            </motion.div>
            
            <motion.h1 variants={enterpriseItem} className="text-6xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.05] text-foreground drop-shadow-xl relative z-10">
              <span className="text-foreground">Technology</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#12ABDB] via-[#0070AD] to-[#12ABDB] animate-gradient-text drop-shadow-[0_4px_32px_rgba(18,171,219,0.4)]">
                Expertise
              </span>
            </motion.h1>
            
            <motion.p variants={enterpriseItem} className="text-slate-700 dark:text-slate-300 text-xl sm:text-2xl leading-relaxed font-semibold max-w-2xl mx-auto">
              Six technology domains. One integrated delivery partner. Built for complex, multi-national enterprise requirements.
            </motion.p>
            
            {/* PILL NAVIGATION */}
            <motion.div variants={enterpriseItem} className="w-full mt-8 pt-8 relative">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/30 to-transparent" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                Jump to a domain <ArrowRight className="w-3 h-3 rotate-90" />
              </div>
              <div className="flex flex-wrap justify-center gap-3 w-full bg-card/40 backdrop-blur-md p-5 sm:p-7 rounded-3xl border border-border/50 shadow-inner">
                {Object.keys(capabilityMap).map((capability, idx) => {
                  const targetId = capabilityMap[capability];
                  return (
                    <motion.button
                      key={capability}
                      whileHover={{ y: -4, scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const el = document.getElementById(targetId);
                        if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 100; window.scrollTo({ top: y, behavior: "smooth" }); }
                      }}
                      className="px-6 py-3 rounded-full border border-border/60 bg-background/80 text-sm font-bold text-foreground shadow-sm hover:border-[#06B6D4]/40 transition-colors"
                    >
                      {capability}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* DOMAIN SECTIONS (Alternating Layout) */}
      <section className="w-full bg-background flex flex-col border-t border-border">
        {technologies.map((tech, index) => (
          <div key={tech.slug} className="border-b border-border/40 last:border-0 relative">
            <TechnologyStrip tech={tech} router={router} index={index} />
          </div>
        ))}
      </section>

      {/* DELIVERY METHODOLOGY */}
      <ProcessTimeline
          badge="DELIVERY METHOD"
          title="Our Technology Delivery Framework"
          steps={TECH_PROCESS}
        />

      {/* CTA */}
      <PremiumCTA
        variant="technology"
        titleTop="Ready to Modernize"
        titleHighlight="Your Technology Stack?"
        description="Speak with our technology architects and identify the right domains to accelerate your digital transformation goals."
      />
    </div>
  );
}
