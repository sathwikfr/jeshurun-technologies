"use client";

import { use } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Cloud,
  RefreshCw,
  Smartphone,
  Server,
  Terminal,
  Cpu,
} from "lucide-react";
import { PremiumCTA } from "@/components/PremiumCTA";
import { SpotlightCard } from "@/components/SpotlightCard";

/* ==========================================================================
   SOFTWARE ENGINEERING CATEGORIES DICTIONARY
   ========================================================================== */

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 22 },
  },
};

const softwareData: Record<
  string,
  {
    title: string;
    subtitle: string;
    description: string;
    iconName: "Cloud" | "RefreshCw" | "Smartphone" | "Server";
    overview: string;
    image: string;
    features: string[];
    benefits: string[];
    metrics: { label: string; value: string }[];
  }
> = {
  "cloud-native": {
    title: "Cloud-Native Engineering",
    subtitle: "Architecting resilient, hyper-scalable microservices",
    description:
      "Deploy serverless architectures and Kubernetes orchestrations on AWS, Azure, and GCP for maximum scalability.",
    iconName: "Cloud",
    overview:
      "Our Cloud-Native Engineering practice focuses on building systems designed explicitly for modern cloud environments. By leveraging microservices, containerization, and dynamic orchestration, we eliminate legacy bottlenecks and ensure your applications can scale infinitely on demand.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    features: [
      "Serverless Architectures",
      "Kubernetes Orchestration",
      "Auto-Scaling",
      "Multi-Cloud Deployments (AWS / Azure / GCP)",
    ],
    benefits: [
      "Infinite horizontal scalability",
      "Reduced infrastructure overhead",
      "Faster time-to-market for new features",
      "High availability and fault tolerance",
    ],
    metrics: [
      { label: "Uptime SLA", value: "99.99%" },
      { label: "Cost Reduction", value: "30%" },
      { label: "Deployment Speed", value: "4x" },
    ],
  },
  "legacy-modernization": {
    title: "Legacy Modernization",
    subtitle: "Refactoring and migrating monolithic systems",
    description:
      "Transform outdated infrastructure into modern, API-first architectures with zero-downtime migrations.",
    iconName: "RefreshCw",
    overview:
      "We help enterprises untangle years of technical debt. Using the Strangler Fig pattern, we systematically migrate monolithic applications into modular microservices without disrupting your ongoing business operations.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    features: [
      "Strangler Fig Pattern",
      "Zero-Downtime Migration",
      "API-First Architecture",
      "Monolith Modularization",
    ],
    benefits: [
      "Elimination of technical debt",
      "Seamless operational transition",
      "Enhanced system security and compliance",
      "Future-proof technology stack",
    ],
    metrics: [
      { label: "Downtime Risk", value: "0%" },
      { label: "Performance Boost", value: "2x" },
      { label: "Maintenance Drop", value: "40%" },
    ],
  },
  "mobile-architecture": {
    title: "Mobile Architecture",
    subtitle: "Enterprise-grade native and cross-platform apps",
    description:
      "Build secure, high-performance mobile applications that integrate seamlessly with your enterprise ecosystem.",
    iconName: "Smartphone",
    overview:
      "Our Mobile Experience Architecture practice designs iOS and Android applications built for enterprise scale. We focus on offline synchronization, rigorous mobile device management (MDM) integration, and flawless user experiences using React Native and Flutter.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    features: [
      "React Native & Flutter Development",
      "Complex Offline Data Synchronization",
      "Mobile Device Management (MDM)",
      "Biometric Security Integration",
    ],
    benefits: [
      "Unified cross-platform codebases",
      "Enterprise-grade mobile security",
      "Seamless offline capabilities",
      "Intuitive UX/UI for enterprise tools",
    ],
    metrics: [
      { label: "User Adoption", value: "+85%" },
      { label: "Crash-Free Rate", value: "99.9%" },
      { label: "Time to Market", value: "-30%" },
    ],
  },
  "enterprise-api": {
    title: "Enterprise API",
    subtitle: "Robust GraphQL and REST APIs with data streaming",
    description:
      "Architect scalable event-driven data pipelines and federated APIs to unify your enterprise services.",
    iconName: "Server",
    overview:
      "Data is the lifeblood of the modern enterprise. We architect high-throughput, event-driven data pipelines using Kafka and RabbitMQ, alongside federated GraphQL gateways that provide a unified access layer for your entire service ecosystem.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    features: [
      "Event-Driven Architecture",
      "Kafka / RabbitMQ Streaming",
      "GraphQL Federation",
      "Secure API Gateways",
    ],
    benefits: [
      "Real-time data synchronization",
      "Unified data access across services",
      "Highly decoupled service architecture",
      "Enterprise-grade rate limiting and security",
    ],
    metrics: [
      { label: "API Latency", value: "<50ms" },
      { label: "Data Throughput", value: "10k/s" },
      { label: "System Uptime", value: "99.99%" },
    ],
  },
};

const iconMap = {
  Cloud: <Cloud className="w-8 h-8 text-[#2563EB] dark:text-[#60A5FA]" />,
  RefreshCw: (
    <RefreshCw className="w-8 h-8 text-[#2563EB] dark:text-[#60A5FA]" />
  ),
  Smartphone: (
    <Smartphone className="w-8 h-8 text-[#2563EB] dark:text-[#60A5FA]" />
  ),
  Server: <Server className="w-8 h-8 text-[#2563EB] dark:text-[#60A5FA]" />,
};

export default function SoftwareDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const category = softwareData[slug];

  if (!category) {
    return (
      <div className="container mx-auto px-6 py-32 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-extrabold text-foreground">
          Software Category Not Found
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">
          The requested software page does not exist.
        </p>
        <Link
          href="/software"
          className="mt-6 text-primary font-bold flex items-center gap-1.5 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Software
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent relative overflow-x-hidden pt-28 pb-20">
      <div className="container px-6 sm:px-8 mx-auto space-y-12 relative z-10">
        {/* Back Link */}
        <div className="flex justify-start">
          <Link
            href="/software"
            className="group inline-flex items-center gap-2 text-sm font-extrabold text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Software Hub
          </Link>
        </div>

        {/* Hero Banner Section */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-4xl">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs font-bold uppercase tracking-wider text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Enterprise Software Engineering
          </motion.div>
          <motion.div variants={fadeUp}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-none">
              {category.title}
            </h1>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-500 text-lg sm:text-xl md:text-2xl font-bold leading-normal">
              {category.subtitle}
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed font-semibold max-w-3xl">
              {category.description}
            </p>
          </motion.div>
        </motion.div>

        {/* Dynamic Metrics Grid */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {category.metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="h-full"
            >
              <SpotlightCard className="p-6 bg-muted/30 dark:bg-card border border-border rounded-2xl shadow-sm hover-card-effect space-y-1.5 h-full">
                <div className="text-3xl font-black min-h-[40px] flex items-center text-primary">
                  {metric.value ? (
                    metric.value
                  ) : (
                    <span className="text-muted-foreground font-medium">
                      --
                    </span>
                  )}
                </div>
                <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest">
                  {metric.label}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Structure Split Section */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Left: Strategic Overview (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl border border-border shadow-md bg-background">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-64 object-cover object-center hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </motion.div>

            {/* Practice Overview Container */}
            <motion.div variants={fadeUp} className="p-6 sm:p-8 bg-card border border-border rounded-2xl space-y-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                {iconMap[category.iconName]}
              </div>
              <h2 className="text-2xl font-extrabold text-foreground">
                Architecture Overview
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-semibold">
                {category.overview}
              </p>
            </motion.div>

            {/* Core Features list container */}
            <motion.div variants={fadeUp} className="p-6 sm:p-8 bg-card border border-border rounded-2xl space-y-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground">
                Engineering Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    <span className="text-sm font-bold text-foreground leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Benefits & SLA Cards (5 cols) */}
          <motion.div variants={fadeUp} className="lg:col-span-5 h-full">
            <SpotlightCard className="p-6 sm:p-8 border border-border bg-card hover-card-effect flex flex-col h-full rounded-2xl shadow-sm">
              <h3 className="text-xl font-extrabold text-foreground tracking-tight pb-4">
                Business Impact
              </h3>
              <p className="text-muted-foreground text-sm font-semibold pb-6 border-b border-border">
                How our clients succeed using this specific software engineering
                discipline:
              </p>

              <ul className="space-y-4 pt-6 flex-1">
                {category.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    </span>
                    <span className="text-sm font-bold text-muted-foreground leading-tight">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              {/* SLA Details footer */}
              <div className="p-4 rounded-xl bg-background border border-border mt-8 space-y-2">
                <div className="text-[10px] font-bold text-primary uppercase tracking-widest">
                  Engineering Quality Guarantee
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                  All software deliveries are governed by robust CI/CD
                  pipelines, strict code quality audits, and automated security
                  scanning.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>

        {/* ── CTA Banner ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="pt-12"
        >
          <div className="-mx-6 sm:-mx-12">
            <PremiumCTA variant="software" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
