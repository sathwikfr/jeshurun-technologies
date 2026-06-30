"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { 
  Check, 
  Settings, 
  Smartphone, 
  Database, 
  Cloud, 
  Calculator, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  TrendingUp,
  Cpu,
  Layers,
  Repeat,
  Share2,
  Code2,
  ShieldCheck
} from "lucide-react";
import { PremiumCTA } from "@/components/PremiumCTA";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MethodologyTimeline } from "@/components/MethodologyTimeline";
import {
  ReactLogo,
  NextJsLogo,
  NodeJsLogo,
  PythonLogo,
  KafkaLogo,
  DockerLogo,
  KubernetesLogo,
} from "@/components/TechLogos";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 22 } }
};

/* ─── CAPABILITIES DATA ─── */
const CAPABILITIES = [
  {
    title: "Cloud-Native Engineering",
    slug: "cloud-native",
    image: "/software_cloud_native_1782241218531.png",
    description: "Build secure and scalable cloud-native applications designed for reliability, performance, and future growth.",
    features: ["Serverless Architectures", "Kubernetes Orchestration", "Auto-Scaling Infrastructure"],
    icon: <Cloud className="w-6 h-6 text-[#2563EB]" />,
    size: "large" // md:col-span-8
  },
  {
    title: "Legacy Modernization",
    slug: "legacy-modernization",
    image: "/software_legacy_modernization_1782241231249.png",
    description: "Modernize and migrate outdated monolithic systems into fast, modular architectures without disrupting your operations.",
    features: ["Strangler Fig Pattern", "Zero-Downtime Migration"],
    icon: <Database className="w-6 h-6 text-[#06B6D4]" />,
    size: "small" // md:col-span-4
  },
  {
    title: "Mobile Experience Architecture",
    slug: "mobile-architecture",
    image: "/software_mobile_architecture_1782241242495.png",
    description: "Deliver enterprise-grade native and cross-platform mobile applications that provide seamless, secure experiences.",
    features: ["React Native / Flutter", "MDM Integration"],
    icon: <Smartphone className="w-6 h-6 text-[#06B6D4]" />,
    size: "small" // md:col-span-4
  },
  {
    title: "Enterprise API & Data Pipelines",
    slug: "enterprise-api",
    image: "/software_data_pipelines_1782241256781.png",
    description: "Connect your entire software ecosystem with robust APIs and real-time data streaming pipelines.",
    features: ["Event-Driven Architecture", "Kafka / RabbitMQ", "GraphQL Federated Graphs"],
    icon: <Layers className="w-6 h-6 text-[#2563EB]" />,
    size: "large" // md:col-span-8
  }
];

/* ─── SDLC DATA ─── */
const SDLC_STAGES = [
  {
    title: "Product Discovery",
    desc: "Business analysis, requirements gathering, and solution definition.",
    icon: <Cpu className="w-6 h-6" />
  },
  {
    title: "Architecture & Design",
    desc: "System blueprinting, UX planning, and technical design.",
    icon: <Layers className="w-6 h-6" />
  },
  {
    title: "Engineering & Quality Assurance",
    desc: "Development, testing, code review, and performance optimization.",
    icon: <Code2 className="w-6 h-6" />
  },
  {
    title: "Deployment & Long-Term Support",
    desc: "Production deployment, monitoring, maintenance, and continuous improvement.",
    icon: <Settings className="w-6 h-6" />
  }
];

export default function Software() {
  const router = useRouter();
  const [activeCapability, setActiveCapability] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCapability(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );

    const targets = ["cloud-native", "legacy-modernization", "mobile-architecture", "enterprise-api", "methodology"];
    targets.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-transparent min-h-screen">
      
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="w-full pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden bg-background border-b border-border">
        {/* Subtle Enterprise Grid Background */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(37, 99, 235, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(37, 99, 235, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
          }}
        />
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="container px-6 sm:px-8 mx-auto relative z-10"
        >
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <motion.div variants={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Core Competency
            </motion.div>
            <motion.h1 variants={item} className="text-5xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-none">
              <span className="text-[#2563EB]">Enterprise</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4]">
                Software
              </span>
            </motion.h1>
            <motion.p variants={item} className="text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed font-semibold max-w-2xl mx-auto">
              We design, architect, and deploy highly resilient software systems tailored for global scale and rigorous security compliance.
            </motion.p>

            {/* Capability Strip */}
            <motion.div variants={item} className="w-full mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap justify-center gap-3 w-full">
                {[
                  { label: "Cloud-Native Engineering", target: "cloud-native" },
                  { label: "Legacy Modernization", target: "legacy-modernization" },
                  { label: "Mobile Experience Architecture", target: "mobile-architecture" },
                  { label: "Enterprise APIs", target: "enterprise-api" },
                  { label: "Event-Driven Systems", target: "enterprise-api" },
                  { label: "Secure Software Delivery", target: "methodology" }
                ].map((pill, idx) => {
                  const isActive = activeCapability === pill.target;

                  return (
                    <motion.button 
                      key={pill.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
                      whileHover={{ 
                        y: -3, 
                        scale: 1.03,
                        boxShadow: "0 10px 24px rgba(30,95,255,0.2)",
                        borderColor: "#1E5FFF",
                        backgroundColor: "rgba(30,95,255,0.05)",
                        color: "#1E5FFF"
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        const el = document.getElementById(pill.target);
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - 120;
                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                      }}
                      className={`relative px-5 py-2.5 rounded-full border text-sm font-bold transition-colors duration-300 outline-none ${
                        isActive 
                          ? "border-[#1E5FFF] bg-[#EEF3FF] dark:bg-[#1E5FFF]/10 text-[#1E5FFF]" 
                          : "bg-card border-border text-foreground shadow-sm"
                      }`}
                    >
                      {isActive && (
                        <motion.div 
                          className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(30,95,255,0.4)]"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      <span className="relative z-10">{pill.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══════ CAPABILITIES BENTO GRID ═══════ */}
      <section className="w-full py-16 md:py-24 bg-muted/10">
        <div className="container px-6 sm:px-8 mx-auto">
          <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Software Engineering Domains
            </h2>
            <p className="text-muted-foreground font-medium text-lg">
              Full-stack capabilities designed to accelerate digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
            {CAPABILITIES.map((cap, idx) => (
              <motion.div 
                key={idx}
                id={cap.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative scroll-mt-32 ${
                  cap.size === "large" ? "md:col-span-8" : "md:col-span-4"
                }`}
              >
                <div onClick={() => router.push(`/software/${cap.slug}`)} className="block h-full cursor-pointer outline-none">
                  <SpotlightCard className="h-full border border-border bg-card group flex flex-col p-0 rounded-3xl overflow-hidden shadow-sm hover-card-effect">
                    {/* Top card banner image */}
                  <div className="h-48 w-full overflow-hidden relative border-b border-border">
                    <Image
                      src={cap.image}
                      alt={cap.title}
                      fill
                      className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-border">
                        <div className="h-14 w-14 rounded-xl bg-primary/10 flex shrink-0 items-center justify-center group-hover:bg-primary/20 group-hover:scale-[1.02] transition-all duration-300">
                          {cap.icon}
                        </div>
                        <h3 className="text-2xl font-extrabold text-foreground tracking-tight">{cap.title}</h3>
                      </div>
                      <div className="pt-6 mb-6">
                        <p className="text-muted-foreground text-lg leading-relaxed font-medium mb-6">
                          {cap.description}
                        </p>
                        <ul className="space-y-3">
                          {cap.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-center text-sm font-bold text-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-border mt-auto">
                      <span
                        className="inline-flex items-center gap-2 text-sm font-extrabold text-primary group/btn hover:text-primary/80 transition-colors"
                      >
                        Explore Capability
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════ TECHNOLOGY STACK ═══════ */}
      <section className="w-full py-20 md:py-32 bg-card relative border-t border-border">
        <div className="container px-6 sm:px-8 mx-auto text-center space-y-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Technology Stack
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Our engineering foundation is built on enterprise-grade frameworks that scale globally.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 items-center"
          >
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <ReactLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <NextJsLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <NodeJsLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <PythonLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100 font-bold text-foreground text-xl tracking-tight">
              Java
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100 font-bold text-foreground text-xl tracking-tight">
              Spring Boot
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100 font-bold text-foreground text-xl tracking-tight">
              Flutter
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100 font-bold text-foreground text-xl tracking-tight">
              React Native
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <KafkaLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100 font-bold text-foreground text-xl tracking-tight">
              GraphQL
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <DockerLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <KubernetesLogo className="h-12 w-auto" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ DELIVERY METHODOLOGY ═══════ */}
      <div id="methodology" className="scroll-mt-32">
        <MethodologyTimeline
          badge="PROCESS"
          title="Software Delivery Methodology"
          subtitle="How we build, modernize, and scale mission-critical enterprise software systems."
          steps={SDLC_STAGES}
        />
      </div>

    </div>
  );
}
