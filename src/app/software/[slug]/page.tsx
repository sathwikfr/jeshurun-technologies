"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Cloud,
  RefreshCw,
  Smartphone,
  Server,
  X as XIcon,
  ChevronDown,
  Quote,
  Zap,
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
    iconName: "Cloud" | "RefreshCw" | "Smartphone" | "Server" | "Zap";
    overview: string;
    image: string;
    features: string[];
    benefits: string[];
    metrics: { label: string; value: string }[];
    ctaTitleTop?: string;
    ctaTitleHighlight?: string;
    ctaDescription?: string;
    comparison: { without: string; with: string }[];
    caseStudyOutcomes: string[];
    testimonial: {
      quote: string;
      author: string;
      role: string;
      company: string;
      stat: string;
      statLabel: string;
    };
    faqs: { q: string; a: string }[];
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
    caseStudyOutcomes: [
      "99.99% uptime maintained post-migration",
      "40% reduction in infrastructure costs",
      "3× faster deployment cadence",
    ],
    ctaTitleTop: "Ready to Build",
    ctaTitleHighlight: "Resilient, Cloud-Native Systems?",
    ctaDescription: "Discuss your architecture goals with our engineers and design hyper-scalable microservices built for the cloud.",
    comparison: [
      { without: "Monolithic bottlenecks during traffic spikes", with: "Elastic microservices that autoscale instantly" },
      { without: "High infrastructure costs for idle capacity", with: "Optimized serverless resource allocation" },
      { without: "Slow, risky monolithic deployments", with: "Automated, zero-downtime canary releases" },
      { without: "Vendor lock-in with single providers", with: "Portable Kubernetes-native workloads" },
    ],
    testimonial: {
      quote: "Migrating to a cloud-native architecture with Jeshurun was a game changer. Our system now handles 10x the load during peak events seamlessly.",
      author: "Sarah Jenkins",
      role: "VP of Engineering",
      company: "Fintech Global",
      stat: "10x",
      statLabel: "Scalability Increase",
    },
    faqs: [
      { q: "Do you support AWS, Azure, and GCP?", a: "Yes, our cloud-native solutions are built on Kubernetes and Terraform, allowing for multi-cloud or agnostic deployments depending on your enterprise needs." },
      { q: "How long does a typical migration take?", a: "Depending on the complexity of the monolith, phased migrations generally run between 3 to 9 months, prioritizing high-impact services first." },
      { q: "How do you ensure data consistency across microservices?", a: "We utilize event-driven architectures with Kafka and implement Saga patterns to guarantee distributed transaction integrity." },
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
    caseStudyOutcomes: [
      "Zero minutes of unexpected downtime during migration",
      "2× release velocity post-modernization",
      "40% reduction in maintenance overhead",
    ],
    ctaTitleTop: "Ready to Modernize",
    ctaTitleHighlight: "Your Legacy Systems?",
    ctaDescription: "Discuss your current stack with our consultants and design a modernization roadmap that minimizes risk and disruption.",
    comparison: [
      { without: "High maintenance costs for outdated code", with: "Modern, maintainable API-first architectures" },
      { without: "Severe security vulnerabilities", with: "Enterprise-grade compliance and security" },
      { without: "Inability to integrate with modern tools", with: "Seamless ecosystem integrations via REST/GraphQL" },
      { without: "Risk of complete system failure", with: "Highly available, distributed deployments" },
    ],
    testimonial: {
      quote: "The Jeshurun team successfully untangled a 15-year-old monolith without a single minute of unexpected downtime. Our release velocity has doubled.",
      author: "Michael Chang",
      role: "Chief Technology Officer",
      company: "HealthCore Systems",
      stat: "0 min",
      statLabel: "Unexpected Downtime",
    },
    faqs: [
      { q: "What is the Strangler Fig pattern?", a: "It's a modernization strategy where we gradually replace specific pieces of functionality in a legacy system with new applications and services, minimizing risk." },
      { q: "Do we need to freeze feature development during modernization?", a: "No. By using API gateways and modularization, your teams can continue building new features in parallel with the modernization effort." },
      { q: "What happens to our legacy database?", a: "We employ data synchronization tools to keep the legacy and modern databases in sync until the final cutover is complete." },
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
    caseStudyOutcomes: [
      "99% data sync success rate in offline conditions",
      "+85% enterprise user adoption within 90 days",
      "-30% time to market vs. native-only approach",
    ],
    ctaTitleTop: "Ready to Build",
    ctaTitleHighlight: "Your Next Mobile Experience?",
    ctaDescription: "Discuss your product vision with our mobile architects and design an application built for performance and scale.",
    comparison: [
      { without: "Fragmented codebases for iOS and Android", with: "Unified, cross-platform code architecture" },
      { without: "Poor offline functionality", with: "Robust offline data synchronization" },
      { without: "Inconsistent user experiences", with: "Native-feeling, responsive UI components" },
      { without: "Security risks with local storage", with: "Encrypted, MDM-compliant data handling" },
    ],
    testimonial: {
      quote: "Our field technicians rely heavily on offline capabilities. The mobile architecture designed by Jeshurun has virtually eliminated data sync conflicts.",
      author: "David Ross",
      role: "Director of Field Operations",
      company: "Logistics Plus",
      stat: "99%",
      statLabel: "Sync Success Rate",
    },
    faqs: [
      { q: "Do you build native or cross-platform apps?", a: "We specialize in both, but heavily leverage React Native and Flutter for enterprises looking to maximize efficiency without compromising performance." },
      { q: "How do you handle offline functionality?", a: "We use local-first database solutions like WatermelonDB or Realm, coupled with background sync queues to ensure data integrity when connectivity returns." },
      { q: "Are your mobile apps secure enough for healthcare/finance?", a: "Yes. We implement certificate pinning, biometric authentication, and strict Keychain/Keystore encryption to meet compliance standards." },
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
    caseStudyOutcomes: [
      "3× faster frontend development velocity",
      "<50ms API latency at 10,000 events per second",
      "99.99% API uptime with federated gateway",
    ],
    ctaTitleTop: "Ready to Connect",
    ctaTitleHighlight: "Your Enterprise Systems?",
    ctaDescription: "Discuss your integration needs with our API engineers and design a connectivity layer built for security and scale.",
    comparison: [
      { without: "Point-to-point integration spaghetti", with: "Centralized, federated API gateways" },
      { without: "Over-fetching and slow client performance", with: "Optimized GraphQL querying" },
      { without: "Batch processing delays", with: "Real-time, event-driven streaming" },
      { without: "Inconsistent API security policies", with: "Unified authentication and rate-limiting" },
    ],
    testimonial: {
      quote: "The federated GraphQL layer completely transformed how our frontend teams consume data. Development cycles are significantly faster now.",
      author: "Elena Rodriguez",
      role: "Lead Software Architect",
      company: "E-Commerce Enterprise",
      stat: "3x",
      statLabel: "Development Velocity",
    },
    faqs: [
      { q: "When should we use GraphQL vs REST?", a: "GraphQL is excellent for complex client applications needing flexible data fetching, while REST remains ideal for simpler, caching-heavy, or server-to-server integrations." },
      { q: "What event streaming platforms do you use?", a: "We predominantly build on Apache Kafka for high-throughput enterprise streaming, and RabbitMQ for complex routing and task queues." },
      { q: "How do you manage API versioning?", a: "We advocate for non-breaking API evolution (especially with GraphQL), but support standard URI or Header-based versioning for REST endpoints." },
    ],
  },
  "data-pipelines": {
    title: "Data Pipelines & Analytics",
    subtitle: "Real-time streaming and enterprise analytics platforms",
    description: "Design and deploy event-driven data pipelines that unify your operational data into real-time intelligence for faster business decisions.",
    iconName: "Zap",
    overview: "Our Data Pipelines practice builds the connective tissue between your operational systems and your business intelligence layer. Using Apache Kafka, Snowflake, and dbt, we design low-latency streaming architectures that give decision-makers live visibility into the metrics that matter.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    features: [
      "Apache Kafka / Flink Streaming",
      "Snowflake & BigQuery Warehouses",
      "dbt Transformation Layers",
      "Real-Time BI Dashboards",
    ],
    benefits: [
      "Sub-minute data freshness across all systems",
      "Unified data model eliminating reporting silos",
      "Version-controlled, tested transformation logic",
      "GDPR-compliant data governance by design",
    ],
    metrics: [
      { label: "Data Latency", value: "<3min" },
      { label: "Faster Decisions", value: "60%" },
      { label: "Cost Savings (year 1)", value: "€1.2M" },
    ],
    caseStudyOutcomes: [
      "Claims data latency reduced from 24h to <3 minutes",
      "60% faster underwriting decisions on commercial accounts",
      "€1.2M in annual infrastructure cost savings",
    ],
    ctaTitleTop: "Ready to Unify",
    ctaTitleHighlight: "Your Data Into a Real-Time Layer?",
    ctaDescription: "Discuss your data architecture needs with our pipeline engineers and design a streaming platform built for enterprise scale.",
    comparison: [
      { without: "Overnight batch jobs delivering stale data", with: "Real-time event streams with sub-minute freshness" },
      { without: "Manual ETL scripts breaking unpredictably", with: "Automated, tested dbt transformations in version control" },
      { without: "Siloed systems requiring custom exports", with: "CDC connectors capturing change events from all sources" },
      { without: "Reports generated manually by data analysts", with: "Self-serve BI dashboards backed by live materialized views" },
    ],
    testimonial: {
      quote: "Our underwriters now see live claims data the moment it happens. The impact on our renewal turnaround has been transformative — we went from reacting slowly to leading every conversation.",
      author: "Patrick Daly",
      role: "Chief Actuary",
      company: "Irish Insurance Group",
      stat: "<3min",
      statLabel: "Claims Data Latency",
    },
    faqs: [
      { q: "What's the difference between Kafka and a traditional ETL tool?", a: "Traditional ETL tools run on a schedule, creating batched, stale data. Kafka is an event streaming platform — data flows continuously in real time as changes occur in source systems, enabling true real-time analytics." },
      { q: "Do you support existing databases without modifying them?", a: "Yes. We use Change Data Capture (CDC) via Debezium, which reads the database write-ahead log without touching the source system or impacting its performance." },
      { q: "How do you ensure data quality in the pipeline?", a: "We implement dbt data tests (schema checks, uniqueness, referential integrity) that run on every transformation, plus automated anomaly detection on key metrics to alert on unexpected data distributions." },
      { q: "What BI tools do you integrate with?", a: "We connect to Power BI, Looker, Tableau, Metabase, and Grafana depending on your team's toolchain. We also build custom React-based dashboards for embedded analytics use cases." },
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
  Zap: <Zap className="w-8 h-8 text-amber-500" />,
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/50 transition-colors duration-200 gap-4"
      >
        <span className="text-sm font-bold text-foreground leading-snug">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="shrink-0 text-muted-foreground"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed font-medium border-t border-border pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
              <SpotlightCard className="p-6 bg-card border border-border rounded-2xl shadow-sm hover-card-effect space-y-1.5 h-full">
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

        {/* ── Section 1: VS Comparison Table ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-8 pt-8"
        >
          <motion.div variants={fadeUp} className="text-center space-y-3">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-primary/5 text-primary border-primary/10"
            >
              Impact Comparison
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Without Us vs. With Jeshurun
            </h2>
            <p className="text-muted-foreground font-medium text-sm max-w-xl mx-auto">
              See the real operational difference our {category.title} practice
              makes for enterprise clients.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-2xl border border-border shadow-sm"
          >
            {/* Header */}
            <div className="grid grid-cols-2">
              <div className="px-6 py-4 flex items-center gap-2 bg-red-50/60 dark:bg-red-950/20">
                <XIcon className="w-4 h-4 text-red-500" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 dark:text-red-400">
                  Without Jeshurun
                </span>
              </div>
              <div className="px-6 py-4 flex items-center gap-2 border-l border-border bg-emerald-50/60 dark:bg-emerald-950/20">
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                  With Jeshurun
                </span>
              </div>
            </div>
            {/* Rows */}
            {category.comparison.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 border-t border-border ${i % 2 === 0 ? "bg-card" : "bg-muted/10"}`}
              >
                <div className="px-6 py-4 flex items-start gap-3 border-r border-border">
                  <span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center mt-0.5 shrink-0">
                    <XIcon className="w-3 h-3 text-red-400" />
                  </span>
                  <span className="text-sm text-muted-foreground font-medium leading-snug">
                    {row.without}
                  </span>
                </div>
                <div className="px-6 py-4 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-3 h-3 text-emerald-500" />
                  </span>
                  <span className="text-sm text-foreground font-bold leading-snug">
                    {row.with}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Section 2: Case Study / Testimonial ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring" as const, stiffness: 80, damping: 22 }}
          className="pt-8"
        >
          <SpotlightCard className="p-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary),0.05)_0%,transparent_60%)] pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Side: Case Study Card (40%) */}
              <div className="lg:col-span-5 bg-muted/20 border-b lg:border-b-0 lg:border-r border-border p-8 sm:p-12 space-y-8">
                <div className="space-y-2">
                  <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest bg-primary/10 text-primary rounded-full shadow-sm">
                    CLIENT SUCCESS STORY
                  </span>
                  <h3 className="text-2xl font-black text-foreground pt-2">
                    {category.title} Delivery
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Engagement Type</div>
                    <div className="text-sm font-extrabold text-foreground">Enterprise Build</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Region</div>
                    <div className="text-sm font-extrabold text-foreground">Europe & Global</div>
                  </div>
                </div>

                <div className="space-y-1 border-t border-border pt-6">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold pb-2">Verified Outcomes</div>
                  <ul className="space-y-3">
                    {category.caseStudyOutcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-sm font-bold text-foreground">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Side: Client Testimonial (60%) */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-10">
                <Quote className="w-10 h-10 text-primary opacity-20" />
                <p className="text-foreground text-xl sm:text-2xl font-medium leading-relaxed italic opacity-90">
                  &ldquo;{category.testimonial.quote}&rdquo;
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-border">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg text-primary-foreground bg-primary shadow-md shrink-0">
                      {category.testimonial.author.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-base font-black text-foreground tracking-tight">
                        {category.testimonial.author}
                      </p>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wide">
                        {category.testimonial.role} · {category.testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-2xl font-black text-foreground">{category.testimonial.stat}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{category.testimonial.statLabel}</div>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* ── Section 3: FAQ Accordion ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-6 pt-8"
        >
          <motion.div variants={fadeUp} className="space-y-2">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-primary/5 text-primary border-primary/10"
            >
              Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-3 max-w-3xl">
            {category.faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
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
            <PremiumCTA 
              variant="software" 
              titleTop={category.ctaTitleTop}
              titleHighlight={category.ctaTitleHighlight}
              description={category.ctaDescription}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
