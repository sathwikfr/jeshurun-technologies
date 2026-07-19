"use client";

import { use, useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Quote,
  ShieldCheck,
  X as XIcon,
} from "lucide-react";
import { PremiumCTA } from "@/components/PremiumCTA";
import { 
  CloudNativeViz, 
  LegacyModernizationViz, 
  MobileArchitectureViz, 
  EnterpriseAPIViz, 
  DataPipelinesViz 
} from "@/components/SoftwareVisuals";
import { FloatingSidebarNav } from "@/components/FloatingSidebarNav";
import { ExpertSpotlight } from "@/components/ExpertSpotlight";
import { RelatedCaseStudies } from "@/components/RelatedCaseStudies";

/* ==========================================================================
   FRAMER MOTION VARIANTS — Editorial design system
   ========================================================================== */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const expandWidth: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
};

const tableRow: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ==========================================================================
   ANIMATED STAT COUNTER
   ========================================================================== */

function AnimatedStatValue({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(value);

  const parsed = useMemo(() => {
    const match = value.match(/^([^0-9]*)([\d.]+)(.*)$/);
    if (!match) return null;
    return {
      prefix: match[1],
      targetNum: parseFloat(match[2]),
      suffix: match[3],
      isDecimal: match[2].includes("."),
      decimals: match[2].includes(".") ? match[2].split(".")[1].length : 0,
    };
  }, [value]);

  useEffect(() => {
    if (!isInView || !parsed || prefersReducedMotion) {
      if (!isInView) return;
      setDisplayValue(value);
      return;
    }
    const duration = 1500;
    const startTime = performance.now();
    let frameId: number;
    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsed!.targetNum * eased;
      setDisplayValue(
        `${parsed!.prefix}${parsed!.isDecimal ? current.toFixed(parsed!.decimals) : Math.round(current)}${parsed!.suffix}`
      );
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    }
    setDisplayValue(`${parsed.prefix}0${parsed.suffix}`);
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, parsed, prefersReducedMotion, value]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-editorial text-foreground">
      {!parsed || prefersReducedMotion ? value : displayValue}
    </div>
  );
}

/* ==========================================================================
   ACCENT LINE
   ========================================================================== */

function AccentLine() {
  return (
    <div className="w-full container px-6 sm:px-8 mx-auto">
      <motion.div
        variants={expandWidth}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20px" }}
        className="h-px bg-gradient-to-r from-primary/40 via-primary/20 to-transparent"
      />
    </div>
  );
}

/* ==========================================================================
   SOFTWARE ENGINEERING CATEGORIES DICTIONARY
   ========================================================================== */

const softwareData: Record<
  string,
  {
    title: string;
    subtitle: string;
    description: string;
    overview: string;
    image: string;
    features: string[];
    benefits: string[];
    metrics: { label: string; value: string }[];
    editorialLead: string;
    statHighlights: { value: string; label: string; description: string }[];
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
    overview:
      "Our Cloud-Native Engineering practice focuses on building systems designed explicitly for modern cloud environments. By leveraging microservices, containerization, and dynamic orchestration, we eliminate legacy bottlenecks and ensure your applications can scale infinitely on demand.",
    image:
      "/images/cloud_native_engineering_workspace.png",
    features: [
      "Serverless Architectures",
      "Kubernetes Orchestration",
      "Auto-Scaling",
      "Multi-Cloud Deployments (AWS / Azure / GCP)",
    ],
    benefits: [
      "Infinite horizontal scalability eliminates capacity ceilings",
      "Reduced infrastructure overhead through serverless resource allocation",
      "Faster time-to-market via automated canary release pipelines",
      "High availability and fault tolerance built into the architecture",
    ],
    metrics: [
      { label: "Uptime SLA", value: "99.99%" },
      { label: "Cost Reduction", value: "30%" },
      { label: "Deployment Speed", value: "4x" },
    ],
    editorialLead: "Cloud-native is not a deployment strategy — it is an engineering philosophy. Organizations that commit to microservices and serverless from first principles don't just reduce infrastructure costs; they remove the architectural ceilings that limit growth.",
    statHighlights: [
      { value: "99.99%", label: "Uptime SLA", description: "Uptime maintained post-migration across all client deployments" },
      { value: "30%", label: "Cost Reduction", description: "Infrastructure cost savings through serverless resource optimization" },
      { value: "4x", label: "Deployment Speed", description: "Faster deployment cadence vs. monolithic pre-migration baseline" },
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
    overview:
      "We help enterprises untangle years of technical debt. Using the Strangler Fig pattern, we systematically migrate monolithic applications into modular microservices without disrupting your ongoing business operations.",
    image:
      "/images/legacy_modernization_transition.png",
    features: [
      "Strangler Fig Pattern",
      "Zero-Downtime Migration",
      "API-First Architecture",
      "Monolith Modularization",
    ],
    benefits: [
      "Systematic elimination of compounding technical debt",
      "Seamless operational transition with no service interruption",
      "Enhanced system security and regulatory compliance",
      "Future-proof technology stack that attracts top engineering talent",
    ],
    metrics: [
      { label: "Downtime Risk", value: "0%" },
      { label: "Performance Boost", value: "2x" },
      { label: "Maintenance Drop", value: "40%" },
    ],
    editorialLead: "Technical debt compounds silently until it becomes an existential risk. Legacy systems that took years to accumulate can be systematically modernized without bringing the business to a halt — if the right patterns and discipline are applied from day one.",
    statHighlights: [
      { value: "0%", label: "Downtime Risk", description: "Zero minutes of unexpected downtime across all legacy migrations" },
      { value: "2x", label: "Release Velocity", description: "Release velocity post-modernization vs. legacy baseline" },
      { value: "40%", label: "Maintenance Drop", description: "Reduction in ongoing maintenance overhead after cutover" },
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
    overview:
      "Our Mobile Experience Architecture practice designs iOS and Android applications built for enterprise scale. We focus on offline synchronization, rigorous mobile device management (MDM) integration, and flawless user experiences using React Native and Flutter.",
    image:
      "/images/mobile_architecture_wireframes.png",
    features: [
      "React Native & Flutter Development",
      "Complex Offline Data Synchronization",
      "Mobile Device Management (MDM)",
      "Biometric Security Integration",
    ],
    benefits: [
      "Unified cross-platform codebases that cut ongoing maintenance costs",
      "Enterprise-grade mobile security meeting HIPAA and PCI standards",
      "Seamless offline capabilities keeping field teams productive anywhere",
      "Intuitive, native-feeling UX for complex enterprise workflows",
    ],
    metrics: [
      { label: "User Adoption", value: "+85%" },
      { label: "Crash-Free Rate", value: "99.9%" },
      { label: "Time to Market", value: "-30%" },
    ],
    editorialLead: "The mobile channel is no longer a secondary touchpoint — it is where enterprise workflows live. Field teams, executives, and customers demand applications that work flawlessly offline, load instantly, and meet the strictest security compliance requirements.",
    statHighlights: [
      { value: "85%", label: "User Adoption", description: "Enterprise user adoption within 90 days of launch" },
      { value: "99.9%", label: "Crash-Free Rate", description: "Application stability across iOS and Android devices" },
      { value: "30%", label: "Faster Market", description: "Time-to-market reduction vs. native-only approach" },
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
    overview:
      "Data is the lifeblood of the modern enterprise. We architect high-throughput, event-driven data pipelines using Kafka and RabbitMQ, alongside federated GraphQL gateways that provide a unified access layer for your entire service ecosystem.",
    image:
      "/images/enterprise_api_network.png",
    features: [
      "Event-Driven Architecture",
      "Kafka / RabbitMQ Streaming",
      "GraphQL Federation",
      "Secure API Gateways",
    ],
    benefits: [
      "Real-time data synchronization across all enterprise services",
      "Unified data access layer removing point-to-point integration sprawl",
      "Highly decoupled service architecture enabling independent deployments",
      "Enterprise-grade rate limiting, auth, and observability built in",
    ],
    metrics: [
      { label: "API Latency", value: "<50ms" },
      { label: "Data Throughput", value: "10k/s" },
      { label: "System Uptime", value: "99.99%" },
    ],
    editorialLead: "Point-to-point integrations are the technical debt of the data layer. Federated API gateways and event-driven pipelines replace brittle, hand-rolled connectors with a single, observable, and resilient connectivity standard across the entire enterprise.",
    statHighlights: [
      { value: "50", label: "API Latency (ms)", description: "Sub-50ms response times at 10,000 events per second" },
      { value: "10000", label: "Events / Second", description: "Throughput sustained across federated gateway clusters" },
      { value: "99.99%", label: "System Uptime", description: "API gateway availability across all client deployments" },
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
    overview: "Our Data Pipelines practice builds the connective tissue between your operational systems and your business intelligence layer. Using Apache Kafka, Snowflake, and dbt, we design low-latency streaming architectures that give decision-makers live visibility into the metrics that matter.",
    image: "/images/data_pipelines_flow.png",
    features: [
      "Apache Kafka / Flink Streaming",
      "Snowflake & BigQuery Warehouses",
      "dbt Transformation Layers",
      "Real-Time BI Dashboards",
    ],
    benefits: [
      "Sub-minute data freshness across all operational and reporting systems",
      "Unified data model that eliminates reporting silos between departments",
      "Version-controlled, tested transformation logic that fails loudly, never silently",
      "GDPR-compliant data governance and lineage tracking by design",
    ],
    metrics: [
      { label: "Data Latency", value: "<3min" },
      { label: "Faster Decisions", value: "60%" },
      { label: "Cost Savings (year 1)", value: "€1.2M" },
    ],
    editorialLead: "The gap between raw operational data and business intelligence is where millions of euros are lost every year. Real-time data pipelines don't just accelerate reporting — they transform reactive organizations into ones that lead every conversation.",
    statHighlights: [
      { value: "3", label: "Minutes Latency", description: "Claims data latency reduced from 24 hours to under 3 minutes" },
      { value: "60%", label: "Faster Decisions", description: "Faster underwriting decisions on commercial accounts" },
      { value: "1.2", label: "€M Year 1 Savings", description: "Annual infrastructure cost savings in the first year" },
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

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border-t border-border"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group gap-4"
      >
        <span className="text-[1.0625rem] font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors duration-200"
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
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base text-muted-foreground leading-relaxed font-medium max-w-3xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ==========================================================================
   PAGE COMPONENT
   ========================================================================== */

export default function SoftwareDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const category = softwareData[slug];

  if (!category) {
    return (
      <div className="w-full container mx-auto px-6 py-32 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-foreground">Software Category Not Found</h1>
        <p className="text-muted-foreground mt-2">The requested software page does not exist.</p>
        <Link href="/software" className="mt-6 text-primary font-semibold flex items-center gap-1.5 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Software Hub
        </Link>
      </div>
    );
  }

  const titleWords = category.title.split(" ");
  const titleFirstWord = titleWords[0];
  const titleRest = titleWords.slice(1).join(" ");

  return (
    <div className="min-h-dvh bg-background relative overflow-x-hidden selection:bg-primary/20">
      <FloatingSidebarNav 
        sections={[
          { id: "overview", label: "Overview" },
          { id: "capabilities", label: "Capabilities" },
          { id: "outcomes", label: "Outcomes" },
          { id: "faqs", label: "FAQs" }
        ]}
      />

      {/* ── 1. HERO ────────────────────────────────────────────────── */}
      <section className="w-full pt-16 pb-8 md:pt-20 md:pb-12 relative overflow-hidden bg-slate-950 text-white shadow-xl">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={category.image}
            alt={category.title}
            fill
            sizes="100vw"
            priority
            className="object-cover object-top opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.15)_0%,transparent_60%)]" />
        </div>

        <div className="w-full container px-6 sm:px-8 mx-auto relative z-10 flex flex-col justify-center">
          {/* Breadcrumb — fade in */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 mb-8"
          >
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <Link href="/software" className="hover:text-white transition-colors">Software</Link>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-white">{category.title}</span>
            </nav>
          </motion.div>

          <div className="flex-grow mb-8">
            <motion.div
              variants={staggerSlow}
              initial="hidden"
              animate="show"
              className="max-w-4xl space-y-8"
            >
              {/* Editorial Headline — Playfair Display */}
              <motion.h1
                variants={fadeUp}
                className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight"
              >
                {titleFirstWord} <span className="text-blue-400">{titleRest}</span>
              </motion.h1>

              {/* Subtitle — clean sans-serif contrast */}
              <motion.p
                variants={fadeUp}
                className="text-white/90 text-lg sm:text-xl font-medium leading-relaxed"
              >
                {category.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="text-white/70 text-base md:text-lg font-medium leading-relaxed max-w-xl"
              >
                {category.description}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. EDITORIAL INTRODUCTION ──────────────────────────────── */}
      <section className="py-24 md:py-32 !border-t-0">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="w-full container px-6 sm:px-8 mx-auto"
        >
          <motion.div variants={fadeUp} className="max-w-3xl mx-auto">
            <p className="editorial-pullquote text-foreground text-xl sm:text-2xl md:text-[1.75rem]">
              {category.editorialLead || category.overview}
            </p>
          </motion.div>

          {/* Animated accent line */}
          <motion.div
            variants={expandWidth}
            className="max-w-3xl mx-auto mt-16 h-px bg-gradient-to-r from-primary/30 via-primary/15 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── 3. DOMAIN OVERVIEW ─────────────────────────────────────── */}
      <section id="overview" className="py-20 md:py-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full container px-6 sm:px-8 mx-auto"
        >
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Image column — slide in from left with scale */}
            <motion.div variants={slideInLeft} className="lg:col-span-5">
              <motion.div
                className="relative overflow-hidden group aspect-[4/3] flex items-center justify-center"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Background ambient glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)]" />
                
                {/* Interactive Visual Component */}
                <div className="absolute inset-0">
                  {slug === "cloud-native" && <CloudNativeViz />}
                  {slug === "legacy-modernization" && <LegacyModernizationViz />}
                  {slug === "mobile-architecture" && <MobileArchitectureViz />}
                  {slug === "enterprise-api" && <EnterpriseAPIViz />}
                  {slug === "data-pipelines" && <DataPipelinesViz />}
                </div>

                {/* Viewfinder Corners */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-cyan-500/30" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-cyan-500/30" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-cyan-500/30" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-cyan-500/30" />

                {/* Subtle border glow on hover */}
                <div className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-cyan-500/20 transition-colors duration-300 pointer-events-none" />
              </motion.div>
            </motion.div>

            {/* Narrative column — slide in from right */}
            <motion.div variants={slideInRight} className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <motion.p
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xs font-bold uppercase tracking-widest text-primary"
                >
                  Domain Overview
                </motion.p>
                <h2 className="font-editorial text-2xl sm:text-3xl md:text-[2.25rem] text-foreground tracking-tight leading-tight">
                  {category.subtitle}
                </h2>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                {category.overview}
              </p>

              {/* Icon + SLA guarantee — subtle hover lift */}
              <motion.div
                className="flex items-start gap-4 p-5 rounded-lg bg-card border border-border transition-colors duration-300 hover:border-primary/20"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                    Engineering Quality Guarantee
                  </p>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    All software deliveries are governed by robust CI/CD pipelines, strict code quality audits, and automated security scanning prior to every production release.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── 4. CORE CAPABILITIES ───────────────────────────────────── */}
      <section id="capabilities" className="py-20 md:py-28">
        <div className="w-full container px-6 sm:px-8 mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid lg:grid-cols-12 gap-12 lg:gap-20"
          >
            <div className="lg:col-span-4">
              <motion.div variants={fadeUp} className="lg:sticky lg:top-32 space-y-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-4">
                    Core Capabilities
                  </p>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-editorial text-foreground leading-tight">
                    What we build
                  </h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Our {category.title} practice is built on standardized, automated, and battle-tested engineering frameworks.
                </p>
              </motion.div>
            </div>
            <div className="lg:col-span-8">
              <div className="border-t border-border">
                {category.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    variants={tableRow}
                    whileHover={{ x: 8 }}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 py-6 sm:py-8 border-b border-border group cursor-default"
                  >
                    <span className="text-sm font-bold text-primary/40 shrink-0 tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {feature}
                      </h4>
                      {category.benefits[idx] && (
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                          {category.benefits[idx]}
                        </p>
                      )}
                    </div>
                    <motion.div
                      className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 ml-4"
                    >
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AccentLine />

      {/* ── 5. MEASURABLE OUTCOMES ─────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="w-full container px-6 sm:px-8 mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-16"
          >
            <motion.div variants={fadeUp} className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Outcomes
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl md:text-[2.25rem] text-foreground tracking-tight leading-tight">
                Measurable impact
              </h3>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden"
            >
              {category.statHighlights.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
                  className="bg-background p-8 sm:p-10 relative group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-0" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative z-10 space-y-3 transform transition-transform duration-500 group-hover:-translate-y-1">
                    <AnimatedStatValue value={stat.value} />
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 + idx * 0.15 }}
                      className="w-12 h-px bg-primary/40 transition-all duration-500 group-hover:w-24 group-hover:bg-primary"
                    />
                    <p className="text-sm font-bold uppercase tracking-wider text-primary">
                      {stat.label}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. VERIFIED OUTCOMES + TESTIMONIAL ─────────────────────── */}
      <section id="success" className="py-20 md:py-28 border-y border-border">
        <div className="w-full container px-6 sm:px-8 mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-stretch"
          >
            {/* Outcomes */}
            <motion.div variants={fadeUp} className="flex flex-col h-full lg:pr-8 lg:py-10">
              <div className="mb-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-4">
                  Client Success
                </p>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-editorial text-foreground leading-tight">
                  Verified engagement outcomes.
                </h3>
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div className="space-y-6 mb-8">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold border-b border-border pb-3">Verified Outcomes</p>
                  <ul className="space-y-5">
                    {(category.caseStudyOutcomes || category.benefits.slice(0, 3)).map((outcome: string, i: number) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-base font-medium text-foreground leading-snug">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2">Engagement Type</div>
                    <div className="text-sm font-bold text-foreground">Enterprise Build</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2">Region</div>
                    <div className="text-sm font-bold text-foreground">Europe & Global</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial */}
            <motion.div variants={fadeUp} className="h-full">
              <div className="p-8 lg:p-10 rounded-3xl border border-border h-full flex flex-col justify-between relative overflow-hidden">
                
                <div className="relative z-10">
                  <Quote className="w-8 h-8 text-primary mb-8" />
                  <blockquote className="text-base md:text-lg lg:text-xl font-editorial text-foreground leading-relaxed mb-10">
                    &ldquo;{category.testimonial.quote || "The federated GraphQL layer completely transformed how our frontend teams consume data. Development cycles are significantly faster now."}&rdquo;
                  </blockquote>
                </div>
                
                <div className="flex items-center gap-4 pt-6 border-t border-border/50 relative z-10 flex-wrap">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground text-sm shrink-0">
                    {(category.testimonial.author || "Elena Rodriguez").split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0 pr-4 border-r border-border/50">
                    <div className="text-sm font-bold text-foreground truncate">{category.testimonial.author || "Elena Rodriguez"}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest truncate">
                      {category.testimonial.role || "Lead Software Architect"} · {category.testimonial.company || "E-commerce Enterprise"}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-editorial text-foreground">{category.testimonial.stat || "3X"}</div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-primary">{category.testimonial.statLabel || "DEVELOPMENT VELOCITY"}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <ExpertSpotlight />
          </motion.div>
        </div>
      </section>

      {/* ── 7. IMPACT COMPARISON ───────────────────────────────────── */}
      <section id="comparison" className="py-20 md:py-28">
        <div className="w-full container px-6 sm:px-8 mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-12"
          >
            <motion.div variants={fadeUp} className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Impact Comparison
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl md:text-[2.25rem] text-foreground tracking-tight leading-tight">
                Without Us vs. With Jeshurun
              </h3>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="overflow-hidden rounded-xl border border-border"
            >
              {/* Table header */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 bg-background"
              >
                <div className="px-6 py-4 border-b border-border">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Without strategic partner
                  </span>
                </div>
                <div className="px-6 py-4 border-b border-l border-border">
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                    With Jeshurun Technologies
                  </span>
                </div>
              </motion.div>
              {/* Rows */}
              {category.comparison.map((row, i) => (
                <motion.div
                  key={i}
                  variants={tableRow}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: i * 0.08 }}
                  className="grid grid-cols-2 border-t border-border first:border-t-0 group"
                >
                  <div className="px-6 py-5 bg-red-500/[0.02] dark:bg-red-500/[0.04] group-hover:bg-red-500/[0.04] dark:group-hover:bg-red-500/[0.07] transition-colors duration-200">
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{row.without}</p>
                  </div>
                  <div className="px-6 py-5 border-l border-border bg-emerald-500/[0.02] dark:bg-emerald-500/[0.04] group-hover:bg-emerald-500/[0.04] dark:group-hover:bg-emerald-500/[0.07] transition-colors duration-200">
                    <p className="text-sm text-foreground font-semibold leading-relaxed">{row.with}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 8. FREQUENTLY ASKED QUESTIONS ──────────────────────────── */}
      <section id="faqs" className="py-20 md:py-28">
        <div className="w-full container px-6 sm:px-8 mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp} className="max-w-3xl mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Frequently Asked
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl md:text-[2.25rem] text-foreground tracking-tight leading-tight">
                Common questions
              </h3>
            </motion.div>
            <div className="max-w-3xl">
              {category.faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-border"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 9. RELATED SOFTWARE PRACTICES ──────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="w-full container px-6 sm:px-8 mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeUp} className="mb-10">
              <h2 className="font-editorial text-xl sm:text-2xl text-foreground tracking-tight">
                Related practice areas
              </h2>
            </motion.div>
            <div className="space-y-0">
              {Object.entries(softwareData)
                .filter(([s]) => s !== slug)
                .slice(0, 3)
                .map(([s, related], i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  >
                    <Link
                      href={`/software/${s}`}
                      className="group flex items-center justify-between py-5 border-t border-border last:border-b hover:bg-background/50 transition-colors duration-200 -mx-4 px-4 rounded-lg"
                    >
                      <div className="space-y-0.5">
                        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium">
                          {related.subtitle}
                        </p>
                      </div>
                      <ArrowRight
                        className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      <RelatedCaseStudies category={category.title} />

      {/* ── 10. CTA ────────────────────────────────────────────────── */}
      <section id="contact" className="py-0">
        <PremiumCTA
          variant="software"
          titleTop={category.ctaTitleTop}
          titleHighlight={category.ctaTitleHighlight}
          description={category.ctaDescription}
        />
      </section>
    </div>
  );
}