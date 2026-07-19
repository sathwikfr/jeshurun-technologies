"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, Variants, useInView } from "framer-motion";
import {
  Check,
  Settings,
  Smartphone,
  Database,
  Cloud,
  ArrowRight,
  Cpu,
  Layers,
  Code2,
  FileText,
  GitBranch,
  Shield,
  Zap,
  Package,
  Search, PenTool, CloudUpload } from "lucide-react";
import { PremiumCTA } from "@/components/PremiumCTA";
import { useRouter } from "next/navigation";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { AnimatedCounter } from "@/components/HeroStatsPanel";
import {
  CloudNativeViz,
  LegacyModernizationViz,
  MobileArchitectureViz,
  EnterpriseAPIViz,
  DataPipelinesViz,
} from "@/components/SoftwareVisuals";

const enterpriseContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const enterpriseItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } },
};

const CAPABILITIES = [
  {
    title: "Cloud-Native Engineering",
    slug: "cloud-native",
    Viz: CloudNativeViz,
    image: "/images/cloud_native_engineering_workspace.png",
    vizBg: "bg-blue-500/5",
    description: "Build secure and scalable cloud-native applications designed for reliability, performance, and future growth.",
    features: ["Serverless Architectures", "Kubernetes Orchestration", "Auto-Scaling Infrastructure"],
    icon: <Cloud className="w-6 h-6 text-[#2563EB]" />,
    size: "large",
    accentColor: "from-blue-600 to-blue-400",
    accentText: "text-blue-600 dark:text-blue-400",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/20",
    stat: "99.99%",
    statLabel: "Target Uptime SLA",
    counter: { target: 99.99, suffix: "%", isNumeric: true }
  },
  {
    title: "Legacy Modernization",
    slug: "legacy-modernization",
    Viz: LegacyModernizationViz,
    image: "/images/legacy_modernization_transition.png",
    vizBg: "bg-cyan-500/5",
    description: "Modernize and migrate outdated monolithic systems into fast, modular architectures without disrupting your operations.",
    features: ["Strangler Fig Pattern", "Zero-Downtime Migration"],
    icon: <Database className="w-6 h-6 text-[#06B6D4]" />,
    size: "small",
    accentColor: "from-cyan-600 to-cyan-400",
    accentText: "text-cyan-600 dark:text-cyan-400",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/20",
    stat: "60%",
    statLabel: "Avg. TCO Reduction",
    counter: { target: 60, suffix: "%", isNumeric: true }
  },
  {
    title: "Mobile Experience Architecture",
    slug: "mobile-architecture",
    Viz: MobileArchitectureViz,
    image: "/images/mobile_architecture_wireframes.png",
    vizBg: "bg-violet-500/5",
    description: "Deliver enterprise-grade native and cross-platform mobile applications that provide seamless, secure experiences.",
    features: ["React Native / Flutter", "MDM Integration"],
    icon: <Smartphone className="w-6 h-6 text-[#7C3AED]" />,
    size: "small",
    accentColor: "from-violet-600 to-violet-400",
    accentText: "text-violet-600 dark:text-violet-400",
    accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/20",
    stat: "4.9/5",
    statLabel: "App Store Average",
    counter: { target: 4.9, suffix: "/5", isNumeric: false }
  },
  {
    title: "Enterprise APIs",
    slug: "enterprise-api",
    Viz: EnterpriseAPIViz,
    image: "/images/enterprise_api_network.png",
    vizBg: "bg-indigo-500/5",
    description: "Connect your entire software ecosystem with robust APIs and real-time data streaming pipelines.",
    features: ["Event-Driven Architecture", "Kafka / RabbitMQ", "GraphQL Federated Graphs"],
    icon: <Layers className="w-6 h-6 text-[#2563EB]" />,
    size: "large",
    accentColor: "from-indigo-600 to-indigo-400",
    accentText: "text-indigo-600 dark:text-indigo-400",
    accentBg: "bg-indigo-500/10",
    accentBorder: "border-indigo-500/20",
    stat: "<10ms",
    statLabel: "API Response Latency",
    counter: { target: 10, prefix: "<", suffix: "ms", isNumeric: false }
  },
  {
    title: "Data Pipelines & Analytics",
    slug: "data-pipelines",
    Viz: DataPipelinesViz,
    image: "/images/data_pipelines_flow.png",
    vizBg: "bg-amber-500/5",
    description: "Design and deploy real-time streaming pipelines and data warehouses that turn operational data into competitive intelligence.",
    features: ["Apache Kafka / Flink", "Snowflake / BigQuery", "dbt Transformation Layers"],
    icon: <Zap className="w-6 h-6 text-[#F59E0B]" />,
    size: "small",
    accentColor: "from-amber-500 to-orange-400",
    accentText: "text-amber-600 dark:text-amber-400",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/20",
    stat: "1B+",
    statLabel: "Events Processed / Day",
    counter: { target: 1, suffix: "B+", isNumeric: false }
  },
];

// heroStats is managed globally by HeroStatsPanel
function OfferingStrip({ cap, router, index }: { cap: any; router: any; index: number }) {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <div id={cap.slug} className="py-16 md:py-24 scroll-mt-28" ref={ref}>
      <div className="w-full container px-6 sm:px-8 mx-auto">
        <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-20 items-center`}>
          {/* VISUAL PANEL */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -32 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[46%] shrink-0"
          >
            <div className={`relative rounded-2xl overflow-hidden border ${cap.accentBorder} shadow-lg aspect-[4/3] bg-muted group flex items-center justify-center`}>
              {/* Photorealistic image background */}
              <Image
                src={cap.image}
                alt={cap.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/10 to-transparent pointer-events-none" />

              {/* Proof stat badge */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/15 rounded-xl px-4 py-2.5 text-center min-w-[120px]">
                <div className="text-white text-2xl font-black leading-none min-h-[1.5rem]">
                  {cap.counter.isNumeric ? (
                    <AnimatedCounter 
                      target={cap.counter.target} 
                      prefix={cap.counter.prefix || ""} 
                      suffix={cap.counter.suffix || ""} 
                      delay={100}
                    />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 5 }}
                      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 5 }}
                      transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 100 }}
                    >
                      {cap.stat}
                    </motion.div>
                  )}
                </div>
                <div className="text-white/70 text-[9px] font-bold uppercase tracking-wider mt-1">
                  {cap.statLabel}
                </div>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Engineering Delivery
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              {cap.title}
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
              {cap.description}
            </p>

            <ul className="space-y-3 pt-2">
              {cap.features.map((tag: string, i: number) => (
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

            <div className="pt-6">
              <button 
                onClick={() => router.push(`/software/${cap.slug}`)}
                className="group inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-full text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Offering
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const SDLC_STAGES = [
  { title: "Product Discovery", desc: "Business analysis, requirements gathering, and solution definition.", icon: <Search className="w-6 h-6" />, accentColor: "blue-600" },
  { title: "Architecture & Design", desc: "System blueprinting, UX planning, and technical design.", icon: <PenTool className="w-6 h-6" />, accentColor: "blue-500" },
  { title: "Engineering & Quality Assurance", desc: "Development, testing, code review, and performance optimization.", icon: <Code2 className="w-6 h-6" />, accentColor: "cyan-500" },
  { title: "Deployment & Long-Term Support", desc: "Production deployment, monitoring, maintenance, and continuous improvement.", icon: <CloudUpload className="w-6 h-6" />, accentColor: "cyan-400" },
];


export default function Software() {
  const router = useRouter();
  const [activeCapability, setActiveCapability] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveCapability(entry.target.id); }); },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );
    ["cloud-native", "legacy-modernization", "mobile-architecture", "enterprise-api", "data-pipelines", "methodology"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-transparent min-h-dvh">

      {/* HERO */}
      <section className="w-full min-h-dvh pt-24 pb-12 md:pt-32 flex items-center relative overflow-hidden bg-background border-b border-border">
        
        {/* Layer 0.5: Galaxy Spiral Particle Animation */}

        <motion.div variants={enterpriseContainer} initial="hidden" animate="show" className="w-full container px-6 sm:px-8 mx-auto relative z-10">
          {/* Subtle glowing orb behind text for perfect contrast */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-background/60 blur-[100px] rounded-full pointer-events-none -z-10 dark:bg-[#0B0E14]/70" />
          <div className="flex flex-col items-center text-center space-y-6 max-w-5xl mx-auto">
            <motion.div variants={enterpriseItem} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-md border border-primary/20 text-[13px] font-extrabold uppercase tracking-[0.15em] text-primary shadow-[0_0_30px_rgba(18,171,219,0.15)] ring-1 ring-white/10">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full w-2 h-2 bg-primary shadow-[0_0_10px_rgba(18,171,219,1)]"></span>
              </span>
              Software Engineering
            </motion.div>
            
            <motion.h1 variants={enterpriseItem} className="text-6xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.05] text-foreground drop-shadow-xl relative z-10">
              <span className="text-foreground">Enterprise</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#12ABDB] via-[#0070AD] to-[#12ABDB] animate-gradient-text drop-shadow-[0_4px_32px_rgba(18,171,219,0.4)]">
                Software
              </span>
            </motion.h1>
            
            <motion.p variants={enterpriseItem} className="text-slate-700 dark:text-slate-300 text-xl sm:text-2xl leading-relaxed font-semibold max-w-2xl mx-auto">
              We design, architect, and deploy highly resilient software systems tailored for global scale and rigorous security compliance.
            </motion.p>

            {/* PILL NAVIGATION */}
            <motion.div variants={enterpriseItem} className="w-full mt-8 pt-8 relative">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                Explore offerings <ArrowRight className="w-3 h-3 rotate-90" />
              </div>
              <div className="flex flex-wrap justify-center gap-3 w-full bg-card/40 backdrop-blur-md p-5 sm:p-7 rounded-3xl border border-border/50 shadow-inner">
                {[
                  { label: "Cloud-Native Engineering", target: "cloud-native" },
                  { label: "Legacy Modernization", target: "legacy-modernization" },
                  { label: "Mobile Architecture", target: "mobile-architecture" },
                  { label: "Enterprise APIs", target: "enterprise-api" },
                  { label: "Data Pipelines", target: "data-pipelines" },
                  { label: "Secure Software Delivery", target: "methodology" },
                ].map((pill, idx) => {
                  return (
                    <motion.button
                      key={pill.label}
                      whileHover={{ y: -4, scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const el = document.getElementById(pill.target);
                        if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 100; window.scrollTo({ top: y, behavior: "smooth" }); }
                      }}
                      className="px-6 py-3 rounded-full border border-border/60 bg-background/80 text-sm font-bold text-foreground shadow-sm hover:border-primary/40 transition-colors"
                    >
                      {pill.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* OFFERING SECTIONS (Alternating Layout) */}
      <section className="w-full bg-background flex flex-col border-t border-border">
        {CAPABILITIES.map((cap, index) => (
          <div key={cap.slug} className="border-b border-border/40 last:border-0 relative">
            <OfferingStrip cap={cap} router={router} index={index} />
          </div>
        ))}
      </section>


      {/* METHODOLOGY */}
      <div id="methodology" className="scroll-mt-32 w-full">
        <ProcessTimeline
          badge="PROCESS"
          title="Our Engineering Delivery Process"
          subtitle="How we build, modernize, and scale mission-critical enterprise software systems."
          steps={SDLC_STAGES}
        />
      </div>

      {/* CTA */}
      <PremiumCTA
        variant="software"
        titleTop="Have a Software Challenge"
        titleHighlight="We Should Solve Together?"
        description="Explore our capabilities above or talk to our engineering team about your next build."
      />
    </div>
  );
}
