"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
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
} from "lucide-react";
import { PremiumCTA } from "@/components/PremiumCTA";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MethodologyTimeline } from "@/components/MethodologyTimeline";

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

const CAPABILITIES = [
  {
    title: "Cloud-Native Engineering",
    slug: "cloud-native",
    image: "/software_cloud_native_1782241218531.png",
    description: "Build secure and scalable cloud-native applications designed for reliability, performance, and future growth.",
    features: ["Serverless Architectures", "Kubernetes Orchestration", "Auto-Scaling Infrastructure"],
    icon: <Cloud className="w-6 h-6 text-[#2563EB]" />,
    size: "large",
    accentColor: "from-blue-600 to-blue-400",
    accentText: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Legacy Modernization",
    slug: "legacy-modernization",
    image: "/software_legacy_modernization_1782241231249.png",
    description: "Modernize and migrate outdated monolithic systems into fast, modular architectures without disrupting your operations.",
    features: ["Strangler Fig Pattern", "Zero-Downtime Migration"],
    icon: <Database className="w-6 h-6 text-[#06B6D4]" />,
    size: "small",
    accentColor: "from-cyan-600 to-cyan-400",
    accentText: "text-cyan-600 dark:text-cyan-400",
  },
  {
    title: "Mobile Experience Architecture",
    slug: "mobile-architecture",
    image: "/software_mobile_architecture_1782241242495.png",
    description: "Deliver enterprise-grade native and cross-platform mobile applications that provide seamless, secure experiences.",
    features: ["React Native / Flutter", "MDM Integration"],
    icon: <Smartphone className="w-6 h-6 text-[#06B6D4]" />,
    size: "small",
    accentColor: "from-violet-600 to-violet-400",
    accentText: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "Enterprise API & Data Pipelines",
    slug: "enterprise-api",
    image: "/software_data_pipelines_1782241256781.png",
    description: "Connect your entire software ecosystem with robust APIs and real-time data streaming pipelines.",
    features: ["Event-Driven Architecture", "Kafka / RabbitMQ", "GraphQL Federated Graphs"],
    icon: <Layers className="w-6 h-6 text-[#2563EB]" />,
    size: "large",
    accentColor: "from-indigo-600 to-indigo-400",
    accentText: "text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Data Pipelines & Analytics",
    slug: "data-pipelines",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description: "Design and deploy real-time streaming pipelines and data warehouses that turn operational data into competitive intelligence.",
    features: ["Apache Kafka / Flink", "Snowflake / BigQuery", "dbt Transformation Layers"],
    icon: <Zap className="w-6 h-6 text-[#F59E0B]" />,
    size: "small",
    accentColor: "from-amber-500 to-orange-400",
    accentText: "text-amber-600 dark:text-amber-400",
  },
];

const SDLC_STAGES = [
  {
    title: "Product Discovery",
    desc: "Business analysis, requirements gathering, and solution definition.",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    title: "Architecture & Design",
    desc: "System blueprinting, UX planning, and technical design.",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    title: "Engineering & Quality Assurance",
    desc: "Development, testing, code review, and performance optimization.",
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    title: "Deployment & Long-Term Support",
    desc: "Production deployment, monitoring, maintenance, and continuous improvement.",
    icon: <Settings className="w-6 h-6" />,
  },
];

const DELIVERABLES = [
  { icon: <FileText className="w-5 h-5" />, title: "Architecture Decision Records", desc: "Version-controlled ADRs documenting every design choice and trade-off." },
  { icon: <GitBranch className="w-5 h-5" />, title: "Production-Ready Codebases", desc: "Clean, tested, documented code with 80%+ coverage and automated linting." },
  { icon: <Shield className="w-5 h-5" />, title: "Security & Compliance Audits", desc: "OWASP scanning, dependency vulnerability checks, and compliance evidence packs." },
  { icon: <Zap className="w-5 h-5" />, title: "CI/CD Pipelines", desc: "Fully automated build, test, and deploy pipelines from day one of delivery." },
  { icon: <Package className="w-5 h-5" />, title: "Containerized Deployments", desc: "Docker images and Kubernetes manifests with Helm chart configuration." },
  { icon: <Check className="w-5 h-5" />, title: "SLA-Backed Operations", desc: "Post-launch monitoring, incident response, and formal SLA agreement." },
];

export default function Software() {
  const router = useRouter();
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
    const targets = ["cloud-native", "legacy-modernization", "mobile-architecture", "enterprise-api", "data-pipelines", "methodology"];
    targets.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-transparent min-h-screen">

      {/* HERO SECTION */}
      <section className="w-full pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden bg-background border-b border-border">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(37, 99, 235, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(37, 99, 235, 0.04) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        <motion.div
          variants={enterpriseContainer}
          initial="hidden"
          animate="show"
          className="container px-6 sm:px-8 mx-auto relative z-10"
        >
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <motion.div variants={enterpriseItem} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Software Engineering
            </motion.div>
            <motion.h1 variants={enterpriseItem} className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-foreground">
              <span className="text-[#2563EB]">Enterprise</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4]">Software</span>
            </motion.h1>
            <motion.p variants={enterpriseItem} className="text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed font-semibold max-w-2xl mx-auto">
              We design, architect, and deploy highly resilient software systems tailored for global scale and rigorous security compliance.
            </motion.p>
            <motion.div variants={enterpriseItem} className="w-full mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap justify-center gap-3 w-full">
                {[
                  { label: "Cloud-Native Engineering", target: "cloud-native" },
                  { label: "Legacy Modernization", target: "legacy-modernization" },
                  { label: "Mobile Architecture", target: "mobile-architecture" },
                  { label: "Enterprise APIs", target: "enterprise-api" },
                  { label: "Data Pipelines", target: "data-pipelines" },
                  { label: "Secure Software Delivery", target: "methodology" },
                ].map((pill, idx) => {
                  const isActive = activeCapability === pill.target;
                  return (
                    <motion.button
                      key={pill.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
                      whileHover={{ y: -3, scale: 1.03, boxShadow: "0 10px 24px rgba(30,95,255,0.2)", borderColor: "#1E5FFF", backgroundColor: "rgba(30,95,255,0.05)", color: "#1E5FFF" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        const el = document.getElementById(pill.target);
                        if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 120; window.scrollTo({ top: y, behavior: "smooth" }); }
                      }}
                      className={`relative px-5 py-2.5 rounded-full border text-sm font-bold transition-colors duration-300 outline-none ${isActive ? "border-[#1E5FFF] bg-[#EEF3FF] dark:bg-[#1E5FFF]/10 text-[#1E5FFF]" : "bg-card border-border text-foreground shadow-sm"}`}
                    >
                      {isActive && (
                        <motion.div className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(30,95,255,0.4)]" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
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

      {/* CAPABILITIES BENTO GRID */}
      <section className="w-full py-20 md:py-28 bg-card">
        <div className="container px-6 sm:px-8 mx-auto">
          <div className="text-center mb-14 space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Software Engineering Domains</h2>
            <p className="text-muted-foreground font-medium text-lg">Five engineering capabilities, each purpose-built for enterprise delivery challenges.</p>
          </div>
          <motion.div
            variants={enterpriseContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto"
          >
            {CAPABILITIES.map((cap, idx) => (
              <motion.div
                key={idx}
                id={cap.slug}
                variants={enterpriseItem}
                className={`group relative scroll-mt-32 ${cap.size === "large" ? "md:col-span-8" : "md:col-span-4"}`}
              >
                <div onClick={() => router.push(`/software/${cap.slug}`)} className="block h-full cursor-pointer outline-none">
                  <SpotlightCard className="h-full border border-border bg-card group flex flex-col p-0 rounded-3xl overflow-hidden shadow-sm hover-card-effect">
                    <div className={`h-[3px] w-full bg-gradient-to-r ${cap.accentColor}`} />
                    <div className="h-44 w-full overflow-hidden relative border-b border-border">
                      <Image
                        src={cap.image}
                        alt={cap.title}
                        fill
                        className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pb-5 border-b border-border">
                          <div className="h-11 w-11 rounded-xl bg-primary/10 flex shrink-0 items-center justify-center group-hover:bg-primary/20 group-hover:scale-[1.05] transition-all duration-300">
                            {cap.icon}
                          </div>
                          <h3 className="text-xl font-extrabold text-foreground tracking-tight">{cap.title}</h3>
                        </div>
                        <div className="pt-5 mb-5">
                          <p className="text-muted-foreground text-base leading-relaxed font-medium mb-4">{cap.description}</p>
                          <ul className="space-y-2">
                            {cap.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-center text-sm font-bold text-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="pt-5 border-t border-border mt-auto">
                        <span className={`inline-flex items-center gap-2 text-sm font-extrabold ${cap.accentText} group/btn hover:opacity-80 transition-opacity`}>
                          Explore Capability
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section className="w-full py-20 md:py-28 bg-background border-t border-border">
        <div className="container px-6 sm:px-8 mx-auto">
          <div className="text-center mb-14 space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-2">
              Every Engagement
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">What We Deliver</h2>
            <p className="text-muted-foreground font-medium text-lg">Tangible, enterprise-grade outputs � not just advice � on every software engagement.</p>
          </div>
          <motion.div
            variants={enterpriseContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
          >
            {DELIVERABLES.map((d, i) => (
              <motion.div key={i} variants={enterpriseItem}>
                <div className="group p-6 border border-border bg-card rounded-2xl hover:border-primary/30 hover:shadow-md transition-all duration-300 h-full flex flex-col gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                    {d.icon}
                  </div>
                  <h3 className="text-base font-bold text-foreground">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DELIVERY METHODOLOGY */}
      <div id="methodology" className="scroll-mt-32 w-full">
        <MethodologyTimeline
          badge="PROCESS"
          title="Software Delivery Methodology"
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
