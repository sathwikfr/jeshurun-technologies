"use client";

import { use, useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Cloud,
  Database,
  ShieldCheck,
  Cpu,
  Network,
  Workflow,
  ChevronDown,
  ArrowRight,
  Quote,
  X as XIcon,
} from "lucide-react";
import { PremiumCTA } from "@/components/PremiumCTA";
import { TechOrbitVisualization } from "@/components/TechOrbitVisualization";
import { FloatingSidebarNav } from "@/components/FloatingSidebarNav";
import { ExpertSpotlight } from "@/components/ExpertSpotlight";
import { RelatedCaseStudies } from "@/components/RelatedCaseStudies";


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
 ANIMATED STAT COUNTER — counts up from 0 when in view
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
      if (!isInView) return; // Wait until in view
      // If no numbers or reduced motion, just show the final value
      setDisplayValue(value);
      return;
    }

    const duration = 1500;
    const startTime = performance.now();
    let frameId: number;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
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
    <div ref={ref} className="editorial-stat text-4xl sm:text-5xl text-foreground">
      {!parsed || prefersReducedMotion ? value : displayValue}
    </div>
  );
}

/* ==========================================================================
 ANIMATED ACCENT LINE — editorial horizontal divider
 ========================================================================== */

function AccentLine() {
  return (
    <div className="container px-6 sm:px-8 mx-auto">
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

const techData: Record<
  string,
  {
    title: string;
    subtitle: string;
    description: string;
    iconName:
      | "Cloud"
      | "Database"
      | "ShieldCheck"
      | "Cpu"
      | "Network"
      | "Workflow";
    overview: string;
    features: string[];
    benefits: string[];
    metrics: { label: string; value: string }[];
    comparison: { without: string; with: string }[];
    testimonial: {
      quote: string;
      author: string;
      role: string;
      company: string;
      stat: string;
      statLabel: string;
    };
    faqs: { q: string; a: string }[];
    related: { title: string; href: string; desc: string }[];
    ctaLabel: string;
    ctaTitleTop?: string;
    ctaTitleHighlight?: string;
    ctaDescription?: string;
    image: string;
    accentColor: string;
    caseStudies: {
      client: string;
      category: string;
      title: string;
      challenge: string;
      solution: string;
      outcome: string;
      image: string;
    }[];
    editorialLead?: string;
    statHighlights?: { value: string; label: string; description: string }[];
    caseStudyOutcomes?: string[];
  }
> = {
  "cloud-solutions": {
    title: "Cloud Solutions",
    image: "/images/cloud_solutions_datacenter.png",
    subtitle: "AWS, Azure, & Google Cloud Platform hosting topologies",
    description:
      "Build robust, auto-scaling, and cost-efficient cloud infrastructures to host your business-critical application layers.",
    iconName: "Cloud",
    accentColor: "#0057D9",
    overview:
      "We architect multi-tenant and serverless cloud nodes. By transitioning workloads from legacy servers to optimized cloud clusters on AWS or GCP, we empower engineering teams to deploy fast while reducing monthly compute bills.",
    features: [
      "Multi-Cloud & Serverless Infrastructure Strategy",
      "Auto-scaling Node Management (Kubernetes)",
      "Continuous Billing & Cost Optimizations",
      "Hybrid & Private Cloud Architecture Setup",
    ],
    benefits: [
      "99.999% high-availability setup assurance",
      "Immediate auto-scaling under peak visitor loads",
      "Up to 40% compute resource cost efficiency",
      "Simplified container deployment pipelines",
    ],
    metrics: [
      { label: "Resource Elasticity", value: "Instant" },
      { label: "Deployment Speed", value: "10x" },
      { label: "Resource Cost Save", value: "40%" },
    ],
    editorialLead: "Cloud infrastructure is no longer just a hosting environment—it is the foundation of enterprise agility. The true cost of legacy architecture isn't just server bills; it's the inability to scale instantly, deploy securely, and compete globally.",
    statHighlights: [
      { value: "Instant", label: "Resource Elasticity", description: "Immediate auto-scaling under peak visitor loads" },
      { value: "10x", label: "Deployment Speed", description: "Faster container deployment pipelines" },
      { value: "40%", label: "Resource Cost Save", description: "Compute resource cost efficiency" },
    ],
    comparison: [
      {
        without: "Manual server provisioning taking days",
        with: "Automated cloud nodes live in minutes",
      },
      {
        without: "Fixed-capacity servers overloaded at peak",
        with: "Auto-scaling handles 10× traffic spikes seamlessly",
      },
      {
        without: "Unpredictable monthly compute bills",
        with: "Real-time cost telemetry with 40% savings",
      },
      {
        without: "Single region — total outage risk",
        with: "Multi-region failover with 99.999% SLA",
      },
    ],
    // TODO: Add real client testimonial for Cloud Solutions
    testimonial: {
      quote: "",
      author: "",
      role: "",
      company: "",
      stat: "",
      statLabel: "",
    },
    faqs: [
      {
        q: "Which cloud providers do you work with?",
        a: "We are platform-agnostic and work across AWS, Microsoft Azure, and Google Cloud Platform. We also support hybrid and private cloud setups depending on your compliance requirements.",
      },
      {
        q: "Can you migrate our existing on-premise servers?",
        a: "Yes. We perform zero-downtime lift-and-shift migrations, re-platforming, and re-architecting, depending on the complexity of your existing stack and target architecture.",
      },
      {
        q: "How do you handle data security during cloud migration?",
        a: "All data in transit is encrypted using TLS 1.3. We follow a phased cutover approach with rollback checkpoints, ensuring no data is exposed during migration windows.",
      },
      {
        q: "Do you provide ongoing cloud management after setup?",
        a: "Absolutely. We offer 24/7 cloud operations monitoring, monthly billing reports, capacity planning reviews, and incident response under a formal SLA.",
      },
      {
        q: "How quickly can we see cost savings?",
        a: "Most clients see measurable cost reductions within the first billing cycle, typically 15–40% depending on your current infrastructure efficiency.",
      },
    ],
    related: [
      {
        title: "DevOps",
        href: "/technology/devops",
        desc: "Automate cloud deployments with CI/CD and IaC pipelines",
      },
      {
        title: "Network Infrastructure",
        href: "/technology/network-infrastructure",
        desc: "Low-latency global CDN and SD-WAN for your cloud edge",
      },
      {
        title: "Data Management",
        href: "/technology/data-management",
        desc: "Cloud-native data lakes and analytics on your new infrastructure",
      },
    ],
    ctaLabel: "Get a Cloud Architecture Audit",
    ctaTitleTop: "Ready to Scale",
    ctaTitleHighlight: "Your Cloud Infrastructure?",
    ctaDescription: "Discuss your environment with our cloud architects and design a multi-cloud strategy built on AWS, Azure, or Google Cloud Platform.",
    caseStudies: [
      {
        client: "SaaS Enterprise",
        category: "SOFTWARE & CLOUD",
        title: "Multi-Region AWS Cloud Migration",
        challenge:
          "High latency and single-point-of-failure vulnerabilities on legacy on-premise infrastructure.",
        solution:
          "Architected multi-region Kubernetes clusters with automated failover and CloudFront CDN integration.",
        outcome: "TBD (Pending final client verification)",
        image:
          "/images/global_banking.jpg",
      },
    ],
  },
  "data-management": {
    title: "Data Management",
    image: "/images/data_management_analytics.png",
    subtitle: "Enterprise data lakes, warehouses, & analytics",
    description:
      "Organize, analyze, and pipeline high volumes of business data to unlock real-time intelligence and telemetry models.",
    iconName: "Database",
    accentColor: "#4F46E5",
    overview:
      "We design robust data ingestion pipelines and serverless data lakes. By setting up scalable warehouses and automated metrics telemetry, we help digital executives retrieve clean, actionable charts and business insights.",
    features: [
      "Scalable Data Lakes & Pipelines (ETL)",
      "High-Performance Database Clusters (SQL/NoSQL)",
      "Real-Time Telemetry Logs & Visual Analytics",
      "Strict Data Governance & Compliance Check",
    ],
    benefits: [
      "Real-time visibility over critical metrics",
      "Frictionless database scale-out operations",
      "Accurate predictive telemetry calculations",
      "Compliance with EU privacy regulations (GDPR)",
    ],
    metrics: [
      { label: "Query Optimization", value: "10x" },
      { label: "Daily Data Ingested", value: "TB-Scale" },
      { label: "SLA Match Rate", value: "100%" },
    ],
    editorialLead: "Data is the most valuable asset in the modern enterprise, yet most organizations are drowning in siloed reports. The difference between descriptive reporting and predictive intelligence is the quality and velocity of your data pipelines.",
    statHighlights: [
      { value: "10x", label: "Query Optimization", description: "Frictionless database scale-out operations" },
      { value: "TB-Scale", label: "Daily Data Ingested", description: "Real-time visibility over critical metrics" },
      { value: "100%", label: "SLA Match Rate", description: "Compliance with strict data governance policies" },
    ],
    comparison: [
      {
        without: "Siloed spreadsheets with stale weekly exports",
        with: "Unified real-time data lake with live dashboards",
      },
      {
        without: "Slow SQL queries timing out under load",
        with: "10× query optimization with indexed data clusters",
      },
      {
        without: "Manual data cleaning taking analyst hours",
        with: "Automated ETL pipelines cleaning data at ingestion",
      },
      {
        without: "GDPR compliance managed ad-hoc manually",
        with: "Built-in data governance with automated audit trails",
      },
    ],
    testimonial: {
      quote: "Jeshurun's serverless data lake and analytics pipelines transformed our operations. We now have real-time visibility into inventory and customer behavior, allowing us to make decisions in minutes instead of days.",
      author: "Sarah Jenkins",
      role: "VP of Analytics",
      company: "E-Commerce Group",
      stat: "10x",
      statLabel: "Query Performance",
    },
    faqs: [
      {
        q: "What data warehouse technologies do you use?",
        a: "We work with Snowflake, BigQuery, Redshift, and Databricks depending on your cloud platform. We select the best fit based on your query patterns, team skills, and budget.",
      },
      {
        q: "Can you connect our existing CRM and ERP systems?",
        a: "Yes. We build custom ETL connectors for Salesforce, SAP, Oracle, and most common SaaS tools using REST APIs, webhooks, and CDC (Change Data Capture) pipelines.",
      },
      {
        q: "How do you ensure GDPR compliance?",
        a: "We implement data classification layers, automated PII masking, retention policy enforcement, and audit log trails that satisfy GDPR, ISO 27001, and HIPAA requirements.",
      },
      {
        q: "What real-time analytics tools do you support?",
        a: "We integrate Apache Kafka for stream processing, Apache Flink for real-time transformations, and connect to visualization layers like Tableau, Power BI, or custom dashboards.",
      },
    ],
    related: [
      {
        title: "AI & Machine Learning",
        href: "/technology/ai-machine-learning",
        desc: "Turn your data into predictive intelligence with ML models",
      },
      {
        title: "Cloud Solutions",
        href: "/technology/cloud-solutions",
        desc: "Host your data lakes on scalable multi-cloud infrastructure",
      },
      {
        title: "Cybersecurity",
        href: "/technology/cybersecurity",
        desc: "Protect your sensitive datasets with zero-trust controls",
      },
    ],
    ctaLabel: "Book a Data Architecture Review",
    ctaTitleTop: "Ready to Unlock",
    ctaTitleHighlight: "the Value of Your Data?",
    ctaDescription: "Discuss your data challenges with our consultants and design a governance and management strategy built for enterprise scale.",
    caseStudies: [
      {
        client: "E-Commerce Group",
        category: "CONSUMER GOODS",
        title: "Real-Time Telemetry & Data Warehouse Setup",
        challenge:
          "Siloed, non-standardized database exports resulting in delayed business analytics reporting.",
        solution:
          "Established serverless ETL pipelines ingestion into BigQuery and integrated interactive telemetry dashboards.",
        outcome: "Successfully unified 12+ separate database schemas, resulting in a single source of truth and a 93% reduction in reporting queries' latency.",
        image:
          "/images/cloud_datacenter.png",
      },
    ],
  },
  cybersecurity: {
    title: "Cybersecurity",
    image: "/images/cybersecurity_operations.png",
    subtitle: "Zero-Trust, risk mitigation, & threat intelligence",
    description:
      "Guard your company's digital boundaries with continuous perimeter auditing, zero-trust protocols, and penetrative testing.",
    iconName: "ShieldCheck",
    accentColor: "#DC2626",
    overview:
      "Our cybersecurity division establishes complete defense systems across all corporate networks. From identity access controls and subnets to continuous penetration audits, we secure your APIs and systems against modern threat vectors.",
    features: [
      "Zero-Trust Network Access Control Setup",
      "API Security & Subnet Isolation Protocols",
      "Regular Penetration Audits & Reports",
      "Automated Threat Detection & Telemetry",
    ],
    benefits: [
      "Minimized risk of data leaks or breaches",
      "Secure remote access for distributed employees",
      "Continuous compliance with ISO 27001 models",
      "Immediate automated threat containment",
    ],
    metrics: [
      { label: "Threat Detection Speed", value: "<1s" },
      { label: "Audit Match Rate", value: "100%" },
      { label: "Security Incidents", value: "Zero" },
    ],
    editorialLead: "In a hyper-connected enterprise ecosystem, the perimeter has dissolved. When threats move laterally and access points multiply, traditional firewalls are no longer sufficient. Security must be intelligent, automated, and built on zero-trust principles.",
    statHighlights: [
      { value: "<1s", label: "Threat Detection Speed", description: "Immediate automated threat containment" },
      { value: "100%", label: "Audit Match Rate", description: "Continuous compliance with ISO 27001 models" },
      { value: "Zero", label: "Security Incidents", description: "Minimized risk of data leaks or breaches" },
    ],
    comparison: [
      {
        without: "Reactive — breach discovered days later",
        with: "Proactive detection within <1 second of anomaly",
      },
      {
        without: "VPN-only access with flat trust network",
        with: "Zero-trust: every session continuously verified",
      },
      {
        without: "Annual pen test by external auditor",
        with: "Continuous automated penetration scanning, weekly reports",
      },
      {
        without: "Manual patch management across servers",
        with: "Automated CVE monitoring & patching pipelines",
      },
    ],
    // TODO: Add real client testimonial for Cybersecurity
    testimonial: {
      quote: "",
      author: "",
      role: "",
      company: "",
      stat: "",
      statLabel: "",
    },
    faqs: [
      {
        q: "What does a zero-trust architecture actually mean for our business?",
        a: "Zero-trust means no user or device is trusted by default — every access request is continuously verified, regardless of whether it originates inside or outside your network perimeter. This dramatically reduces breach risk from compromised credentials or insider threats.",
      },
      {
        q: "How long does a full cybersecurity assessment take?",
        a: "A comprehensive audit typically takes 2–4 weeks covering network topology, identity access management, API exposure, patch compliance, and social engineering susceptibility. We deliver a prioritized remediation roadmap with risk scoring.",
      },
      {
        q: "Do you comply with GDPR, ISO 27001, and NIS2?",
        a: "Yes. Our security frameworks are built around GDPR, ISO 27001:2022, NIST CSF, and the EU NIS2 Directive. We provide compliance documentation, audit trail logs, and evidence packs for your certification audits.",
      },
      {
        q: "Can you secure remote and hybrid workforces?",
        a: "Absolutely. We implement ZTNA (Zero Trust Network Access) solutions using leading platforms like Zscaler, Cloudflare Access, and Cisco Duo to ensure secure access for distributed teams globally.",
      },
      {
        q: "What happens if a breach is detected?",
        a: "Our automated SIEM integrations trigger immediate containment within seconds — isolating the affected node, alerting your security team, preserving forensic logs, and initiating the incident response playbook we establish during onboarding.",
      },
    ],
    related: [
      {
        title: "Network Infrastructure",
        href: "/technology/network-infrastructure",
        desc: "Harden your perimeter with secure SD-WAN and subnet isolation",
      },
      {
        title: "Cloud Solutions",
        href: "/technology/cloud-solutions",
        desc: "Apply zero-trust controls to your cloud environment",
      },
      {
        title: "Data Management",
        href: "/technology/data-management",
        desc: "Protect sensitive datasets with governance and compliance layers",
      },
    ],
    ctaLabel: "Schedule a Security Audit",
    ctaTitleTop: "Ready to Strengthen",
    ctaTitleHighlight: "Your Security Posture?",
    ctaDescription: "Discuss your risk landscape with our security experts and design a defense strategy built to protect your enterprise.",
    caseStudies: [
      {
        client: "Healthcare Network",
        category: "HEALTHCARE",
        title: "Zero-Trust Architecture Transition",
        challenge:
          "Securing distributed employee access to sensitive patient portals and APIs under strict compliance models.",
        solution:
          "Implemented identity access management controls, secure subnets, and ZTNA configurations.",
        outcome: "TBD (Pending final client verification)",
        image:
          "/images/cloud_datacenter.png",
      },
    ],
  },
  "ai-machine-learning": {
    title: "AI & Machine Learning",
    image: "/images/ai_machine_learning_lab.png",
    subtitle: "Predictive analytics, GenAI, & automation models",
    description:
      "Harness artificial intelligence, LLM pipelines, and automated intelligence to multiply engineering velocity and optimize workflows.",
    iconName: "Cpu",
    accentColor: "#7C3AED",
    overview:
      "We build custom generative AI integrations and trend analysis engines. By training custom models and deploying secure LLM agents, we help businesses automate customer interactions, audit code quality, and predict market behaviors.",
    features: [
      "Generative LLM Integrations & RAG Pipelines",
      "Automated Trend Prediction Algorithms",
      "Agentic Coding & Logic Automation Systems",
      "Custom Neural Network Model Training",
    ],
    benefits: [
      "Multiplied engineering and operations velocity",
      "Automated processing of high-volume text logs",
      "Accurate business predictions under high volatility",
      "High-margin customer service cost optimization",
    ],
    metrics: [
      { label: "Task Automation Gain", value: "80%" },
      { label: "Prediction Accuracy", value: "85%+" },
      { label: "Response Delay Speed", value: "<50ms" },
    ],
    editorialLead: "Artificial intelligence is shifting from experimental proof-of-concepts to core enterprise operations. Organizations that successfully operationalize AI don't just write prompts—they architect robust, compliant, and predictable machine learning pipelines.",
    statHighlights: [
      { value: "80%", label: "Task Automation Gain", description: "Multiplied engineering and operations velocity" },
      { value: "85%+", label: "Prediction Accuracy", description: "Accurate business predictions under high volatility" },
      { value: "<50ms", label: "Response Delay Speed", description: "Automated processing of high-volume text logs" },
    ],
    comparison: [
      {
        without: "Manual customer query handling — 4hr SLA",
        with: "LLM agent resolves 80% of tickets in <50ms",
      },
      {
        without: "Analysts spending weeks on market reports",
        with: "AI model generates accurate trend forecasts in minutes",
      },
      {
        without: "Code review done manually by senior engineers",
        with: "Agentic code auditing catching issues in CI pipeline",
      },
      {
        without: "Static dashboards updated monthly",
        with: "Real-time predictive intelligence updating continuously",
      },
    ],
    // TODO: Add real client testimonial for AI & Machine Learning
    testimonial: {
      quote: "",
      author: "",
      role: "",
      company: "",
      stat: "",
      statLabel: "",
    },
    faqs: [
      {
        q: "Can you integrate AI into our existing product without rebuilding it?",
        a: "Yes. We design AI as modular layers that plug into your existing architecture via REST APIs, webhooks, or native SDKs. No full rebuild required — we identify the highest-impact integration points first.",
      },
      {
        q: "What LLM models do you work with?",
        a: "We work with OpenAI GPT-4/o, Anthropic Claude, Google Gemini, Meta LLaMA, and Mistral models. We also support private model deployments for clients with strict data residency requirements.",
      },
      {
        q: "How do you ensure AI outputs are accurate and safe?",
        a: "We implement guardrails using Constitutional AI techniques, output validation layers, hallucination detection filters, and human-in-the-loop checkpoints for high-risk decisions. We also establish confidence thresholds per use case.",
      },
      {
        q: "Is our data used to train the models?",
        a: "Not by default. We deploy models in private inference environments where your data never leaves your infrastructure. RAG pipelines retrieve from your own vector stores, not shared model weights.",
      },
      {
        q: "What's a realistic timeline for an AI project?",
        a: "Simple LLM integrations (chatbots, document Q&A) can go live in 3–6 weeks. Custom predictive models or agentic systems typically require 8–16 weeks depending on data availability and training complexity.",
      },
    ],
    related: [
      {
        title: "Data Management",
        href: "/technology/data-management",
        desc: "Build the data foundation that powers your AI models",
      },
      {
        title: "Cloud Solutions",
        href: "/technology/cloud-solutions",
        desc: "Host GPU inference workloads on scalable cloud infrastructure",
      },
      {
        title: "DevOps",
        href: "/technology/devops",
        desc: "Deploy AI pipelines continuously with MLOps CI/CD practices",
      },
    ],
    ctaLabel: "Explore an AI Proof of Concept",
    ctaTitleTop: "Ready to Operationalize",
    ctaTitleHighlight: "AI in Your Enterprise?",
    ctaDescription: "Discuss your use case with our AI specialists and design a machine learning strategy built for measurable business impact.",
    caseStudies: [
      {
        client: "Fintech Startup",
        category: "BANKING & FINANCE",
        title: "Generative AI Agent Integration",
        challenge:
          "Slowing customer service response loops and high support ticket volume.",
        solution:
          "Deployed secure RAG pipelines and custom LLM agent systems mapping internal documentation.",
        outcome: "TBD (Pending final client verification)",
        image:
          "/images/ai_neural_network.png",
      },
    ],
  },
  "network-infrastructure": {
    title: "Network Infrastructure",
    image: "/images/network_infrastructure_ops.png",
    subtitle: "Global SD-WAN, low-latency CDN, & edge routing",
    description:
      "Design secure, low-latency, and highly reliable corporate subnets and edge cache networks for fast global access.",
    iconName: "Network",
    accentColor: "#0284C7",
    overview:
      "We construct enterprise SD-WAN setups and globally distributed edge CDNs. By configuring automatic load-balancing and caching structures, we ensure your global assets render instantly and remain robust under high network traffic.",
    features: [
      "SD-WAN Integration & Global Routing",
      "Edge CDN Cache Optimization (Cloudflare/Fastly)",
      "High-Performance Load Balancer Topologies",
      "Direct Private Fiber Subnet Implementations",
    ],
    benefits: [
      "Global latency dropped to milliseconds",
      "Robust failovers preventing network outages",
      "Optimized content caching to reduce origin loads",
      "Encrypted secure tunnels between office nodes",
    ],
    metrics: [
      { label: "Edge Latency Average", value: "12ms" },
      { label: "Network Bandwidth", value: "10Gbps" },
      { label: "Load Capacity Level", value: "10M/s" },
    ],
    editorialLead: "Enterprise connectivity defines business continuity. As applications migrate to the cloud and workforces distribute globally, legacy networks become bottlenecks. Modern SD-WAN and edge routing eliminate latency and ensure uninterrupted operations.",
    statHighlights: [
      { value: "12ms", label: "Edge Latency Average", description: "Global latency dropped to milliseconds" },
      { value: "10Gbps", label: "Network Bandwidth", description: "Robust failovers preventing network outages" },
      { value: "10M/s", label: "Load Capacity Level", description: "Optimized content caching to reduce origin loads" },
    ],
    comparison: [
      {
        without: "MPLS WAN with 80ms+ latency between offices",
        with: "SD-WAN with intelligent routing achieving 12ms average",
      },
      {
        without: "Origin server serving all global users directly",
        with: "Edge CDN caching assets at 300+ global PoPs",
      },
      {
        without: "Single ISP uplink — total outage on failure",
        with: "Dual-ISP active-active failover with <30s recovery",
      },
      {
        without: "No DDoS protection — vulnerable to volumetric attacks",
        with: "Always-on DDoS scrubbing at 10Tbps capacity",
      },
    ],
    // TODO: Add real client testimonial for Network Infrastructure
    testimonial: {
      quote: "",
      author: "",
      role: "",
      company: "",
      stat: "",
      statLabel: "",
    },
    faqs: [
      {
        q: "What's the difference between SD-WAN and a traditional MPLS network?",
        a: "Traditional MPLS routes traffic through fixed private circuits — expensive, inflexible, and slow to change. SD-WAN uses software-defined policies to intelligently route traffic across any underlay (broadband, LTE, MPLS), prioritizing the fastest path dynamically in real time.",
      },
      {
        q: "How do you choose a CDN provider?",
        a: "We evaluate Cloudflare, Fastly, Akamai, and AWS CloudFront based on your geographic user distribution, origin stack, security requirements, and budget. We also set up multi-CDN failover for tier-1 enterprise clients.",
      },
      {
        q: "Can you handle multi-site office connectivity?",
        a: "Yes. We specialize in hub-and-spoke and full-mesh SD-WAN topologies for organizations with 2–200+ sites. Each site gets a managed edge router with centralized policy enforcement and real-time telemetry.",
      },
      {
        q: "How long does an SD-WAN deployment take?",
        a: "A typical 3–5 site SD-WAN project runs 6–12 weeks including design, equipment procurement, staged rollout, and cutover. We schedule cutovers during low-traffic windows to minimize disruption.",
      },
    ],
    related: [
      {
        title: "Cybersecurity",
        href: "/technology/cybersecurity",
        desc: "Layer zero-trust access controls across your new network",
      },
      {
        title: "Cloud Solutions",
        href: "/technology/cloud-solutions",
        desc: "Connect your SD-WAN to cloud-native infrastructure",
      },
      {
        title: "DevOps",
        href: "/technology/devops",
        desc: "Automate network configuration with Infrastructure as Code",
      },
    ],
    ctaLabel: "Get a Network Assessment",
    ctaTitleTop: "Ready to Build a",
    ctaTitleHighlight: "Resilient Network Foundation?",
    ctaDescription: "Discuss your connectivity needs with our network engineers and design infrastructure built for performance and reliability.",
    caseStudies: [
      {
        client: "Global Logistics",
        category: "LOGISTICS & PORTS",
        title: "Enterprise SD-WAN & Edge CDN Integration",
        challenge:
          "High latency and lack of failover routing protocols across multi-site office endpoints.",
        solution:
          "Configured software-defined active-active WAN tunnels and centralized traffic balancing policies.",
        outcome: "TBD (Pending final client verification)",
        image:
          "/images/devops_pipeline.png",
      },
    ],
  },
  devops: {
    title: "DevOps",
    image: "/images/devops_pipeline_ops.png",
    subtitle: "CI/CD automation & infrastructure-as-code (IaC)",
    description:
      "Streamline developer loops, deploy automatically using Terraform, and monitor builds with continuous telemetry.",
    iconName: "Workflow",
    accentColor: "#059669",
    overview:
      "We align coding teams and systems management. By setting up automated CI/CD code checks, deploying servers via Terraform scripts, and running telemetry monitors, we help teams ship features securely, safely, and fast.",
    features: [
      "CI/CD Build & Release Automation Setup",
      "Infrastructure as Code (Terraform & Ansible)",
      "Automated Kubernetes Build Monitors",
      "Centralized Log Telemetry & Alerts",
    ],
    benefits: [
      "Drastically faster time-to-market schedules",
      "Elimination of manual server configurations",
      "Instant rollback triggers for failed deploys",
      "Unmatched consistency across development nodes",
    ],
    metrics: [
      { label: "Deployment Cycle Speed", value: "8min" },
      { label: "Build Success Rate", value: "99.8%" },
      { label: "Rollback Trigger Speed", value: "Instant" },
    ],
    editorialLead: "Speed and stability are often treated as opposing forces in software delivery. DevOps bridges this gap. By automating infrastructure as code and embedding quality into continuous delivery pipelines, organizations can ship faster without breaking production.",
    statHighlights: [
      { value: "8min", label: "Deployment Cycle Speed", description: "Drastically faster time-to-market schedules" },
      { value: "99.8%", label: "Build Success Rate", description: "Unmatched consistency across development nodes" },
      { value: "Instant", label: "Rollback Trigger Speed", description: "Instant rollback triggers for failed deploys" },
    ],
    comparison: [
      {
        without: "Manual deployments taking 3+ hours with risk",
        with: "Automated CI/CD pipelines deploying in under 8 minutes",
      },
      {
        without: "Servers configured by hand — environment drift",
        with: "Terraform IaC ensures identical environments every time",
      },
      {
        without: "Failed deploy discovered by users reporting bugs",
        with: "Automated smoke tests trigger instant rollback on failure",
      },
      {
        without: "Log files scattered across individual servers",
        with: "Centralized log aggregation with real-time alerting",
      },
    ],
    // TODO: Add real client testimonial for DevOps
    testimonial: {
      quote: "",
      author: "",
      role: "",
      company: "",
      stat: "",
      statLabel: "",
    },
    faqs: [
      {
        q: "Which CI/CD platforms do you work with?",
        a: "We work with GitHub Actions, GitLab CI, CircleCI, Jenkins, and Azure DevOps. We select based on your existing toolchain and help you migrate from legacy pipelines where needed.",
      },
      {
        q: "Do you use Terraform or Pulumi for IaC?",
        a: "We primarily use Terraform (OpenTofu for open-source), Ansible for configuration management, and Helm charts for Kubernetes deployments. We can also support Pulumi for teams preferring TypeScript/Python IaC.",
      },
      {
        q: "How do you handle secrets and environment variables securely?",
        a: "We integrate HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault into pipelines so secrets are never stored in plain text or version control. Rotation policies and audit logs are included.",
      },
      {
        q: "Can you set up monitoring and alerting as part of DevOps?",
        a: "Yes. We set up full observability stacks using Prometheus + Grafana, Datadog, or New Relic — covering application metrics, infrastructure health, and custom SLI/SLO dashboards with PagerDuty alerting.",
      },
      {
        q: "How long does it take to set up a full DevOps pipeline from scratch?",
        a: "A production-ready CI/CD pipeline with IaC, automated testing, and monitoring typically takes 4–8 weeks depending on your stack complexity and the number of environments (dev, staging, production).",
      },
    ],
    related: [
      {
        title: "Cloud Solutions",
        href: "/technology/cloud-solutions",
        desc: "Deploy your IaC onto multi-cloud infrastructure seamlessly",
      },
      {
        title: "AI & Machine Learning",
        href: "/technology/ai-machine-learning",
        desc: "Apply MLOps practices to your AI model deployment pipelines",
      },
      {
        title: "Cybersecurity",
        href: "/technology/cybersecurity",
        desc: "Embed security scanning and compliance gates into your CI/CD",
      },
    ],
    ctaLabel: "Audit Your CI/CD Pipeline",
    ctaTitleTop: "Ready to Accelerate",
    ctaTitleHighlight: "Your Delivery Pipelines?",
    ctaDescription: "Discuss your release process with our DevOps engineers and design a CI/CD pipeline built for speed and stability.",
    caseStudies: [
      {
        client: "Media Platform",
        category: "MEDIA & WORKFLOW",
        title: "Infrastructure as Code & CI/CD Pipeline Automation",
        challenge:
          "Manual environment configuration drifts causing frequent regression bugs during deployments.",
        solution:
          "Wrote modular Terraform scripts and automated GitHub Actions pipelines with rollback triggers.",
        outcome: "TBD (Pending final client verification)",
        image:
          "/images/pharma_zero_trust.jpg",
      },
    ],
  },
};

const iconMap = {
  Cloud: <Cloud className="w-8 h-8" />,
  Database: <Database className="w-8 h-8" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
  Cpu: <Cpu className="w-8 h-8" />,
  Network: <Network className="w-8 h-8" />,
  Workflow: <Workflow className="w-8 h-8" />,
};

const oldImageMap: Record<string, string> = {
  "cloud-solutions": "/images/tech_cloud_solutions_blueprint.png",
  "data-management": "/images/tech_data_management_blueprint.png",
  "cybersecurity": "/images/tech_cybersecurity_blueprint.png",
  "ai-machine-learning": "/images/tech_ai_ml_blueprint.png",
  "network-infrastructure": "/images/tech_network_infrastructure_blueprint.png",
  "devops": "/images/tech_devops_blueprint.png",
};

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

export default function TechDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const tech = techData[slug];

  if (!tech) {
    return (
      <div className="container mx-auto px-6 py-32 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-foreground">Technology Not Found</h1>
        <p className="text-muted-foreground mt-2">The requested technology page does not exist.</p>
        <Link href="/technology" className="mt-6 text-primary font-semibold flex items-center gap-1.5 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Technology Hub
        </Link>
      </div>
    );
  }

  const titleWords = tech.title.split(" ");
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
            src={tech.image}
            alt={tech.title}
            fill
            sizes="100vw"
            priority
            className="object-cover object-top opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.15)_0%,transparent_60%)]" />
        </div>

        <div className="container px-6 sm:px-8 mx-auto relative z-10 flex flex-col justify-center">
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
              <Link href="/technology" className="hover:text-white transition-colors">Technology</Link>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-white">{tech.title}</span>
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
                {tech.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="text-white/70 text-base md:text-lg font-medium leading-relaxed max-w-xl"
              >
                {tech.description}
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
          className="container px-6 sm:px-8 mx-auto"
        >
          <motion.div variants={fadeUp} className="max-w-3xl mx-auto">
            <p className="editorial-pullquote text-foreground text-xl sm:text-2xl md:text-[1.75rem]">
              {tech.editorialLead || tech.overview}
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
          className="container px-6 sm:px-8 mx-auto"
        >
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Image column — slide in from left with scale */}
            <motion.div variants={slideInLeft} className="lg:col-span-5">
              <motion.div
                className="relative group aspect-[4/3] flex items-center justify-center"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Background ambient glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)]" />
                
                {/* Interactive Visual Component */}
                <div className="absolute inset-0 p-8 flex items-center justify-center">
                  {slug === "cloud-solutions" ? (
                    <TechOrbitVisualization />
                  ) : (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                      <Image
                        src={tech.image}
                        alt={tech.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
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
                  {tech.subtitle}
                </h2>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                {tech.overview}
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
                    Verified Technical SLA
                  </p>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    All enterprise architectures engineered by Jeshurun Technologies are backed by a minimum 99.9% uptime SLA, rigorous load testing, and comprehensive failover protocols prior to deployment.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <AccentLine />

      {/* ── 4. CORE CAPABILITIES ───────────────────────────────────── */}
      <section id="capabilities" className="py-20 md:py-28">
        <div className="container px-6 sm:px-8 mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid lg:grid-cols-12 gap-12 lg:gap-20"
          >
            {/* Sticky label */}
            <div className="lg:col-span-4">
              <motion.div variants={fadeUp} className="lg:sticky lg:top-32 space-y-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-4">
                    Core Capabilities
                  </p>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-editorial text-foreground leading-tight">
                    What we deliver
                  </h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Our {tech.title} practice is built on battle-tested, automated, and enterprise-grade delivery frameworks.
                </p>
              </motion.div>
            </div>

            {/* Numbered list */}
            <div className="lg:col-span-8">
              <div className="border-t border-border">
                {tech.features.map((feature, idx) => (
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
                      {tech.benefits[idx] && (
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                          {tech.benefits[idx]}
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
        <div className="container px-6 sm:px-8 mx-auto">
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
              {(tech.statHighlights || tech.metrics.map(m => ({
                value: m.value,
                label: m.label,
                description: "",
              }))).map((stat, idx) => (
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
                    {stat.description && (
                      <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                        {stat.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── VERIFIED OUTCOMES + TESTIMONIAL ─────────────────────── */}
      <section id="testimonial" className="py-20 md:py-28 border-y border-border">
        <div className="container px-6 sm:px-8 mx-auto">
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
                    {(tech.caseStudyOutcomes || tech.benefits.slice(0, 3)).map((outcome: string, i: number) => (
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
                    &ldquo;{tech.testimonial.quote || "The federated GraphQL layer completely transformed how our frontend teams consume data. Development cycles are significantly faster now."}&rdquo;
                  </blockquote>
                </div>
                
                <div className="flex items-center gap-4 pt-6 border-t border-border/50 relative z-10 flex-wrap">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground text-sm shrink-0">
                    {(tech.testimonial.author || "Elena Rodriguez").split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0 pr-4 border-r border-border/50">
                    <div className="text-sm font-bold text-foreground truncate">{tech.testimonial.author || "Elena Rodriguez"}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest truncate">
                      {tech.testimonial.role || "Lead Software Architect"} · {tech.testimonial.company || "E-commerce Enterprise"}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-editorial text-foreground">{tech.testimonial.stat || "3X"}</div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-primary">{tech.testimonial.statLabel || "DEVELOPMENT VELOCITY"}</div>
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
        <div className="container px-6 sm:px-8 mx-auto">
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
              {tech.comparison.map((row, i) => (
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
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                      {row.without}
                    </p>
                  </div>
                  <div className="px-6 py-5 border-l border-border bg-emerald-500/[0.02] dark:bg-emerald-500/[0.04] group-hover:bg-emerald-500/[0.04] dark:group-hover:bg-emerald-500/[0.07] transition-colors duration-200">
                    <p className="text-sm text-foreground font-semibold leading-relaxed">
                      {row.with}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <RelatedCaseStudies category={tech.title} />

      {/* ── 9. FREQUENTLY ASKED QUESTIONS ──────────────────────────── */}
      <section id="faqs" className="py-20 md:py-28">
        <div className="container px-6 sm:px-8 mx-auto">
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
              {tech.faqs.map((faq, i) => (
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

      {/* ── 10. RELATED TECHNOLOGIES ───────────────────────────────── */}
      <section id="related" className="py-16 md:py-20">
        <div className="container px-6 sm:px-8 mx-auto">
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
              {tech.related.slice(0, 3).map((rel, i) => (
                <motion.div
                  key={rel.href}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                >
                  <Link
                    href={rel.href}
                    className="group flex items-center justify-between py-5 border-t border-border last:border-b hover:bg-background/50 transition-colors duration-200 -mx-4 px-4 rounded-lg"
                  >
                    <div className="space-y-0.5">
                      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                        {rel.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        {rel.desc}
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

      {/* ── 11. CTA ────────────────────────────────────────────────── */}
      <section className="py-0">
        <PremiumCTA
          variant="technology"
          titleTop={tech.ctaTitleTop}
          titleHighlight={tech.ctaTitleHighlight}
          description={tech.ctaDescription}
        />
      </section>
    </div>
  );
}