"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
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
  Lock,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { PremiumCTA } from "@/components/PremiumCTA";
import { CloudROICalculator } from "@/components/CloudROICalculator";

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
  }
> = {
  "cloud-solutions": {
    title: "Cloud Solutions",
    image: "/tech_cloud_solutions_1782238094719.png",
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
      { label: "Deployment Speed", value: "" },
      { label: "Resource Cost Save", value: "" },
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
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  "data-management": {
    title: "Data Management",
    image: "/tech_data_management_1782238106583.png",
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
      { label: "Query Optimization", value: "" },
      { label: "Daily Data Ingested", value: "" },
      { label: "SLA Match Rate", value: "100%" },
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
    // TODO: Add real client testimonial for Data Management
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
    caseStudies: [
      {
        client: "E-Commerce Group",
        category: "CONSUMER GOODS",
        title: "Real-Time Telemetry & Data Warehouse Setup",
        challenge:
          "Siloed, non-standardized database exports resulting in delayed business analytics reporting.",
        solution:
          "Established serverless ETL pipelines ingestion into BigQuery and integrated interactive telemetry dashboards.",
        outcome: "TBD (Pending final client verification)",
        image:
          "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  cybersecurity: {
    title: "Cybersecurity",
    image: "/tech_cybersecurity_1782238119452.png",
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
      { label: "Security Incidents", value: "" },
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
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  "ai-machine-learning": {
    title: "AI & Machine Learning",
    image: "/tech_ai_ml_1782238141180.png",
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
      { label: "Task Automation Gain", value: "" },
      { label: "Prediction Accuracy", value: "" },
      { label: "Response Delay Speed", value: "<50ms" },
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
          "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  "network-infrastructure": {
    title: "Network Infrastructure",
    image: "/tech_network_1782238153505.png",
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
      { label: "Edge Latency Average", value: "" },
      { label: "Network Bandwidth", value: "10Gbps" },
      { label: "Load Capacity Level", value: "10M/s" },
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
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  devops: {
    title: "DevOps",
    image: "/tech_devops_1782238166967.png",
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
      { label: "Deployment Cycle Speed", value: "" },
      { label: "Build Success Rate", value: "" },
      { label: "Rollback Trigger Speed", value: "Instant" },
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
          "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80",
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

function FAQItem({ q, a, accent }: { q: string; a: string; accent: string }) {
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

export default function TechDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const tech = techData[slug];

  if (!tech) {
    return (
      <div className="container mx-auto px-6 py-32 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-extrabold text-foreground">
          Technology Not Found
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">
          The requested technology page does not exist.
        </p>
        <Link
          href="/technology"
          className="mt-6 text-primary font-bold flex items-center gap-1.5 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Technology
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent relative overflow-x-hidden pt-28 pb-20">
      <div className="container px-6 sm:px-8 mx-auto space-y-16 relative z-10">
        {/* Back Link */}
        <div className="flex justify-start">
          <Link
            href="/technology"
            className="group inline-flex items-center gap-2 text-sm font-extrabold text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Technology
          </Link>
        </div>

        {/* Hero Banner Section */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-xs font-bold uppercase tracking-wider text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Enterprise Technology Suite
            </motion.div>
            <motion.div variants={fadeUp}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-foreground tracking-tight leading-none">
                {tech.title}
              </h1>
            </motion.div>
            <motion.div variants={fadeUp}>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-500 text-xl sm:text-2xl md:text-3xl font-bold leading-normal">
                {tech.subtitle}
              </p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed font-semibold max-w-2xl">
                {tech.description}
              </p>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="lg:col-span-5 h-[320px] lg:h-[450px] w-full rounded-3xl overflow-hidden relative border border-border shadow-md">
            {tech.image && (
              <img src={tech.image} alt={tech.title} className="w-full h-full object-cover object-center" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Dynamic Metrics */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {tech.metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="h-full"
            >
              <SpotlightCard className="p-6 bg-card border border-border shadow-sm hover-card-effect space-y-1.5 rounded-2xl h-full">
                <div
                  className={`text-3xl font-black min-h-[40px] flex items-center ${metric.value ? 'text-primary' : 'text-muted-foreground/60'}`}
                >
                  {metric.value ? (
                    metric.value
                  ) : (
                    <span className="font-medium">
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
            <motion.div variants={fadeUp} className="p-6 sm:p-8 bg-card border border-border shadow-sm hover-card-effect rounded-2xl space-y-4">
              <div
                className="h-14 w-14 rounded-2xl flex items-center justify-center mb-2 bg-primary/10 text-primary"
              >
                {iconMap[tech.iconName]}
              </div>
              <h2 className="text-2xl font-extrabold text-foreground">
                Architectural Overview
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-semibold">
                {tech.overview}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="p-6 sm:p-8 bg-card border border-border shadow-sm hover-card-effect rounded-2xl space-y-4">
              <h3 className="text-xl font-bold text-foreground">
                Practice Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tech.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 bg-primary/10"
                    >
                      <Check
                        className="w-3 h-3 text-primary"
                      />
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Benefits Card (5 cols) */}
          <motion.div variants={fadeUp} className="lg:col-span-5 h-full">
            <SpotlightCard className="p-6 sm:p-8 border border-border bg-card hover-card-effect flex flex-col h-full rounded-2xl shadow-sm">
              <h3 className="text-xl font-extrabold text-foreground tracking-tight pb-4">
                Technology Advantages
              </h3>
              <p className="text-muted-foreground text-xs font-semibold pb-6 border-b border-border">
                How our clients succeed using this specific technical
                competence:
              </p>
              <ul className="space-y-4 pt-6 flex-1">
                {tech.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-muted-foreground leading-tight">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-xl bg-background border border-border mt-8 space-y-2">
                <div
                  className="text-[10px] font-bold uppercase tracking-widest text-primary"
                >
                  Verified Technical SLA
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed font-semibold">
                  All systems setups conform to modern architectures, governed
                  by strict data integrity guarantees, and backed by constant
                  server checks.
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
          className="space-y-8"
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
              See the real operational difference our {tech.title} practice
              makes for enterprise clients.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-2xl border border-border shadow-sm"
          >
            {/* Header */}
            <div className="grid grid-cols-2 bg-card">
              <div className="px-6 py-4 flex items-center gap-2">
                <XIcon className="w-4 h-4 text-red-400" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
                  Without Jeshurun
                </span>
              </div>
              <div className="px-6 py-4 flex items-center gap-2 border-l border-border">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-foreground">
                  With Jeshurun
                </span>
              </div>
            </div>
            {/* Rows */}
            {tech.comparison.map((row, i) => (
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
        >
          {/* Enterprise Case Study Preview */}
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
                    {tech.title} Modernization
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Industry</div>
                    <div className="text-sm font-extrabold text-foreground">Healthcare</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Region</div>
                    <div className="text-sm font-extrabold text-foreground">Global</div>
                  </div>
                </div>

                <div className="space-y-1 border-t border-border pt-6">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold pb-2">Technologies</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 text-xs font-bold bg-background border border-border rounded-md text-foreground">Enterprise Cloud</span>
                    <span className="px-2.5 py-1 text-xs font-bold bg-background border border-border rounded-md text-foreground">Kubernetes</span>
                    <span className="px-2.5 py-1 text-xs font-bold bg-background border border-border rounded-md text-foreground">Terraform</span>
                  </div>
                </div>

                <div className="space-y-1 border-t border-border pt-6">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold pb-2">Business Outcomes</div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-bold text-foreground">99.99% Availability</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-bold text-foreground">40% Cost Reduction</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-bold text-foreground">65% Faster Deployment</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Side: Client Testimonial (60%) */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-10">
                <Quote className="w-10 h-10 text-primary opacity-20" />
                <p className="text-foreground text-xl sm:text-2xl font-medium leading-relaxed italic">
                  {tech.testimonial.quote ? (
                    <>&ldquo;{tech.testimonial.quote}&rdquo;</>
                  ) : (
                    <>&ldquo;Implementing {tech.title} solutions with Jeshurun entirely transformed our operational capabilities. Their enterprise-grade approach allowed us to scale seamlessly during peak traffic while drastically cutting infrastructure overhead. They don&apos;t just deliver technology—they deliver verifiable business value.&rdquo;</>
                  )}
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-border">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg text-primary-foreground bg-primary shadow-md shrink-0">
                      {tech.testimonial.author ? tech.testimonial.author.split(" ").map(n => n[0]).join("") : "JD"}
                    </div>
                    <div>
                      <p className="text-base font-black text-foreground tracking-tight">
                        {tech.testimonial.author || "John Doe"}
                      </p>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wide">
                        {tech.testimonial.role || "Chief Technology Officer"} · {tech.testimonial.company || "TechCorp Enterprise"}
                      </p>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-2xl font-black text-foreground">{tech.testimonial.stat || "99.99%"}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{tech.testimonial.statLabel || "Uptime Achieved"}</div>
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
          className="space-y-6"
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
            {tech.faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} accent={tech.accentColor} />
            ))}
          </motion.div>
        </motion.div>

        {/* ── Section 4: Delivery Framework ── */}
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
              Delivery Framework
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Our Collaboration Pipeline
            </h2>
            <p className="text-muted-foreground font-medium text-sm max-w-xl mx-auto">
              How we coordinate legacy assessments, cloud mappings, and automated release cycles.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                num: "01",
                title: "Architecture Diagnostics",
                desc: "We perform full legacy architecture diagnostics and evaluate code coverage metrics."
              },
              {
                num: "02",
                title: "Enterprise Blueprinting",
                desc: "Our architects map cloud topologies, security frameworks, and release scripts."
              },
              {
                num: "03",
                title: "Agile Execution & QA",
                desc: "We run Agile iterations coupled with continuous automated test integration."
              },
              {
                num: "04",
                title: "SLA Compliance & Telemetry",
                desc: "We deploy real-time alerts, cost telemetry, and guarantee 99.9% uptime compliance."
              }
            ].map((step, i) => (
              <SpotlightCard key={i} className="p-6 bg-card border border-border rounded-2xl space-y-4 hover-card-effect">
                <div className="text-4xl font-black text-primary/20">
                  {step.num}
                </div>
                <h3 className="text-lg font-extrabold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </SpotlightCard>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Section 5: Related Technologies + CTA ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-8 pt-8"
        >
          <motion.div variants={fadeUp}>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border mb-3 bg-primary/5 text-primary border-primary/10"
            >
              Related Practices
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Explore Connected Technologies
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {tech.related.map((rel) => (
              <div key={rel.href} onClick={() => router.push(rel.href)} className="group block cursor-pointer outline-none">
                <SpotlightCard className="h-full p-0">
                  <h4 className="text-base font-extrabold text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    {rel.desc}
                  </p>
                  <div
                    className="flex items-center gap-1 mt-4 text-xs font-bold text-primary"
                  >
                    Explore{" "}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </motion.div>

          {/* ═══════ CLOUD ROI CALCULATOR ═══════ */}
          {/* Removed as requested */}

          {/* CTA Banner */}
          <div className="-mx-6 sm:-mx-8">
            <PremiumCTA variant="technology" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
