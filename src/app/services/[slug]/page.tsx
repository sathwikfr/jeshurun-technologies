"use client";



import { SpiralDustBackground } from "@/components/effects/SpiralDustBackground";
import { use, useState, useRef, useEffect, useMemo } from "react";

import Link from "next/link";

import Image from "next/image";

import { motion, AnimatePresence, useInView, useReducedMotion, type Variants } from "framer-motion";

import {
  ArrowLeft,
  Check,
  Layers,
  Activity,
  Shield,
  Monitor,
  ChevronDown,
  ArrowRight,
  Quote,
  X as XIcon,
  ZoomIn,
  Target,
  BarChart3,
  Zap,
  ShieldCheck,
} from "lucide-react";

import { PremiumCTA } from "@/components/PremiumCTA";

import { HeroFieldBackground } from "@/components/HeroFieldBackground";

import { AnimatedArchitectureDiagram } from "@/components/AnimatedArchitectureDiagram";

import { AnimatedServiceVisual } from "@/components/AnimatedServiceVisual";

import { FloatingSidebarNav } from "@/components/FloatingSidebarNav";

import { ExpertSpotlight } from "@/components/ExpertSpotlight";

import { RelatedCaseStudies } from "@/components/RelatedCaseStudies";

/* ==========================================================================
 ANIMATION VARIANTS — editorial, useInView gated, respects reduced motion
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
 EDITABLE SERVICES DATA DICTIONARY (unchanged from original)
 ========================================================================== */

const servicesData: Record<
  string,
  {
    title: string;
    subtitle: string;
    description: string;
    iconName: "Layers" | "Activity" | "Shield" | "Monitor";
    overview: string;
    image: string;
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
    /* Extended editorial fields */
    editorialLead?: string;
    statHighlights?: { value: string; label: string; description: string }[];
    caseStudyOutcomes?: string[];
  }
> = {
  "it-consulting": {
    title: "IT Consulting",
    subtitle: "Strategic roadmap planning & architecture design",
    description:
      "Align your technology roadmap with core business metrics to maximize return on investment and accelerate digital product engineering.",
    iconName: "Layers",
    overview:
      "Our IT Consulting practice helps enterprise companies navigate complex digital transformations. We work closely with your stakeholders to design scalable system architectures, assess legacy stacks, and chart robust roadmap strategies that ensure seamless engineering velocity and strict compliance.",
    image: "/images/it_consulting_boardroom.png",
    editorialLead:
      "Every enterprise reaches a point where legacy architecture becomes a strategic liability — where the cost of inaction outweighs the cost of transformation. The question isn't whether to modernize. It's how to do it without disrupting the business that's running on it today.",
    features: [
      "Technology Strategy & Roadmap Planning",
      "Enterprise Architecture Design",
      "Legacy Stack Modernization Plans",
      "SLA Compliance & Governance Audits",
    ],
    benefits: [
      "Accelerated digital product delivery",
      "Minimized architectural technical debt",
      "Optimized infrastructure capital expenses",
      "Improved data governance and security models",
    ],
    metrics: [
      { label: "Engineering Velocity", value: "" },
      { label: "System Uptime Assurance", value: "" },
      { label: "Core Debt Reduction", value: "" },
    ],
    statHighlights: [
      { value: "3×", label: "Engineering Velocity", description: "Accelerated development cycles through architecture modernization" },
      { value: "99.9%", label: "Uptime Assurance", description: "Enterprise-grade SLA compliance across all managed systems" },
      { value: "60%", label: "Technical Debt Reduction", description: "Measurable reduction in legacy code dependencies" },
    ],
    comparison: [
      { without: "Ad-hoc technology adoption without alignment", with: "Strategic roadmaps aligned with business goals" },
      { without: "Accumulating technical debt and legacy systems", with: "Modernized architectures and reduced debt" },
      { without: "Siloed engineering teams with low velocity", with: "Accelerated digital product delivery" },
      { without: "Compliance risks and security vulnerabilities", with: "Strict governance and SLA compliance" },
    ],
    testimonial: { quote: "", author: "", role: "", company: "", stat: "", statLabel: "" },
    faqs: [
      { q: "How long does a typical IT assessment take?", a: "A comprehensive assessment takes 2-4 weeks depending on the complexity of your systems." },
      { q: "Do you assist with implementing the recommendations?", a: "Yes, our team can help execute the roadmap from architecture design to final delivery." },
      { q: "What frameworks do you use for enterprise architecture?", a: "We leverage TOGAF, Zachman, and modern agile architecture principles." },
      { q: "How do you ensure alignment with business goals?", a: "We start with executive workshops to define KPIs before evaluating any technology." },
    ],
    related: [
      { title: "Project Management", href: "/services/project-management", desc: "Execute your IT roadmap with agile methodologies" },
      { title: "Infrastructure Management", href: "/services/infrastructure-management", desc: "Deploy your modernized architecture to the cloud" },
      { title: "Technology: Cloud Solutions", href: "/technology/cloud-solutions", desc: "Build robust cloud infrastructure" },
    ],
    ctaLabel: "Schedule an IT Assessment",
    ctaTitleTop: "Ready to Architect Your",
    ctaTitleHighlight: "Technology Roadmap?",
    ctaDescription: "Discuss your enterprise challenge with our strategists and design a forward-looking IT roadmap aligned to your core business objectives.",
    accentColor: "#0057D9",
    caseStudies: [
      {
        client: "FinTech Platform",
        category: "FINANCIAL SERVICES",
        title: "Legacy Stack Modernization & API Consolidation",
        challenge:
          "Cleansing database schemas and separating monolithic dependencies across historical billing pipelines.",
        solution:
          "Designing microservices blueprint, zero-trust endpoint protection, and unified GraphQL gateway.",
        outcome: "TBD (Pending client implementation)",
        image:
          "/images/ai_neural_network.png",
      },
    ],
  },
  "project-management": {
    title: "Project Management",
    subtitle: "Agile delivery, scrum methods, and risk safeguards",
    description:
      "Methodical management of complex software projects ensuring on-time and on-budget delivery using advanced agile workflows.",
    iconName: "Activity",
    overview:
      "We lead enterprise-grade development programs from initialization to final launch. By implementing advanced Scrum methodologies, continuous dependency tracking, and proactive risk mitigations, we help teams maintain velocity and align with strategic product timelines.",
    image: "/images/project_management_office.png",
    editorialLead:
      "Complex enterprise initiatives fail not because of technology — they fail because of misalignment. When distributed teams operate without unified methodology, deadlines slip, budgets balloon, and stakeholders lose confidence. Disciplined delivery management transforms chaos into cadence.",
    features: [
      "Agile & Scrum Process Implementation",
      "Comprehensive Risk Assessments & Mitigations",
      "Cross-functional Team Coordination",
      "Milestone & Timeline Compliance Tracking",
    ],
    benefits: [
      "Highly predictable release schedules",
      "Improved stakeholder alignment and feedback loops",
      "Reduced project scope creep and overhead",
      "Transparent engineering velocity metrics",
    ],
    metrics: [
      { label: "On-Time Delivery", value: "" },
      { label: "Agile Efficiency Gains", value: "" },
      { label: "Sprint Completion Rate", value: "" },
    ],
    statHighlights: [
      { value: "97%", label: "On-Time Delivery", description: "Consistent milestone achievement across enterprise programs" },
      { value: "40%", label: "Efficiency Gains", description: "Measurable improvement through agile process optimization" },
      { value: "95%", label: "Sprint Completion", description: "Reliable sprint velocity maintained across distributed teams" },
    ],
    comparison: [
      { without: "Missed deadlines and budget overruns", with: "Highly predictable on-time release schedules" },
      { without: "Poor communication and scope creep", with: "Improved stakeholder alignment and feedback" },
      { without: "Unidentified risks causing major delays", with: "Proactive cross-functional risk mitigations" },
      { without: "Opaque development progress", with: "Transparent engineering velocity metrics" },
    ],
    testimonial: { quote: "", author: "", role: "", company: "", stat: "", statLabel: "" },
    faqs: [
      { q: "Do you use Agile, Scrum, or Waterfall?", a: "We primarily use Agile/Scrum for software development, but we tailor our methodology to your organizational needs." },
      { q: "Can you manage offshore and distributed teams?", a: "Yes, our project managers are experienced in aligning global teams across multiple time zones." },
      { q: "What project management tools do you use?", a: "We are proficient in Jira, Asana, Azure DevOps, and Monday.com, among others." },
      { q: "How do you handle scope changes during a project?", a: "We use structured change control processes within agile sprints to evaluate impact before approving changes." },
    ],
    related: [
      { title: "IT Consulting", href: "/services/it-consulting", desc: "Define the strategic roadmap for your projects" },
      { title: "Test Management", href: "/services/test-management", desc: "Ensure quality delivery of your managed projects" },
      { title: "Technology: DevOps", href: "/technology/devops", desc: "Automate delivery pipelines for faster releases" },
    ],
    ctaLabel: "Discuss Your Project",
    ctaTitleTop: "Ready to Deliver Your Next",
    ctaTitleHighlight: "Enterprise Initiative?",
    ctaDescription: "Discuss your project scope with our certified delivery experts and build an execution plan engineered for on-time, high-impact outcomes.",
    accentColor: "#4F46E5",
    caseStudies: [
      {
        client: "Logistics Enterprise",
        category: "LOGISTICS & TRANSPORT",
        title: "Agile Scale-up & Milestone Telemetry",
        challenge:
          "Aligning distributed offshore delivery centers on sprint delivery schedules and release predictability.",
        solution:
          "Establishing unified Scrum methodology, cross-functional risk matrices, and horizontal JIRA dashboards.",
        outcome: "TBD (Pending client implementation)",
        image:
          "/images/devops_pipeline.png",
      },
    ],
  },
  "test-management": {
    title: "Test Management",
    subtitle: "Quality assurance pipelines & automated testing suites",
    description:
      "End-to-end quality assurance planning and automated testing pipelines built to secure modern web and mobile applications.",
    iconName: "Shield",
    overview:
      "We architect custom automated QA pipelines that integrate directly into your CI/CD cycle. By leveraging next-generation test runners, behavior-driven testing styles, and continuous load tests, we guarantee that code updates satisfy strict quality metrics before reaching staging or production.",
    image: "/images/test_management_dashboard.png",
    editorialLead:
      "In enterprise software, quality isn't a gate at the end of the pipeline — it's a discipline woven into every sprint. When testing is manual, slow, and fragmented, defects reach production, trust erodes, and regulatory exposure grows. Automation doesn't just accelerate testing. It fundamentally changes your relationship with risk.",
    features: [
      "End-to-End Test Automation Strategy",
      "CI/CD Integration & Smoke Testing",
      "Load, Stress, and Performance Testing",
      "Defect Lifecycle Management & Audit logs",
    ],
    benefits: [
      "Zero critical regression bugs in production",
      "Drastically shortened feedback loops for devs",
      "Consistent high performance under peak loads",
      "Full compliance with external audit standards",
    ],
    metrics: [
      { label: "Defect Detection", value: "" },
      { label: "QA Cycle Speedup", value: "" },
      { label: "Automated Test Coverage", value: "" },
    ],
    statHighlights: [
      { value: "Zero", label: "Critical Regressions", description: "Zero critical defects escaping to production environments" },
      { value: "5×", label: "QA Cycle Speed", description: "Automated pipelines delivering feedback in minutes, not days" },
      { value: "92%", label: "Test Coverage", description: "Comprehensive automated coverage across all critical paths" },
    ],
    comparison: [
      { without: "Critical regression bugs reaching production", with: "Zero critical bugs with automated QA pipelines" },
      { without: "Slow manual testing bottlenecks", with: "Drastically shortened feedback loops for devs" },
      { without: "System crashes under high user traffic", with: "Consistent performance validated by load tests" },
      { without: "Lack of audit trails for compliance", with: "Full compliance with automated test logs" },
    ],
    testimonial: { quote: "", author: "", role: "", company: "", stat: "", statLabel: "" },
    faqs: [
      { q: "Do you provide automated or manual testing?", a: "We specialize in automated testing pipelines, but we also conduct exploratory manual testing for complex user journeys." },
      { q: "What testing frameworks do you use?", a: "We use Cypress, Playwright, Selenium, Jest, and custom load testing tools like JMeter." },
      { q: "Can you integrate testing into our existing CI/CD?", a: "Absolutely. We build test harnesses that seamlessly integrate into GitHub Actions, GitLab CI, or Jenkins." },
      { q: "How do you handle mobile app testing?", a: "We use Appium and real-device cloud platforms like BrowserStack for comprehensive mobile QA." },
    ],
    related: [
      { title: "Project Management", href: "/services/project-management", desc: "Integrate QA smoothly into agile sprints" },
      { title: "Infrastructure Management", href: "/services/infrastructure-management", desc: "Ensure stable test environments" },
      { title: "Technology: DevOps", href: "/technology/devops", desc: "Embed automated tests in your CI/CD" },
    ],
    ctaLabel: "Audit Your QA Pipeline",
    ctaTitleTop: "Ready to Build a",
    ctaTitleHighlight: "Zero-Defect Pipeline?",
    ctaDescription: "Discuss your quality assurance needs with our test architects and design an automated testing framework built for reliability at scale.",
    accentColor: "#DC2626",
    caseStudies: [
      {
        client: "Medical Portal",
        category: "HEALTHCARE",
        title: "Automated QA Pipeline Integration",
        challenge:
          "Clearing execution bottlenecks in manual smoke testing and ensuring regression-free deployment paths.",
        solution:
          "Deploying end-to-end Cypress test harnesses and automated load runners in pre-production pipelines.",
        outcome: "TBD (Pending client implementation)",
        image:
          "/images/cloud_datacenter.png",
      },
    ],
  },
  "infrastructure-management": {
    title: "Infrastructure Management",
    subtitle: "Secure cloud migration, serverless design, & edge CDNs",
    description:
      "Designing and managing secure, high-performance cloud architectures that run on AWS, Azure, and Google Cloud.",
    iconName: "Monitor",
    overview:
      "Our infrastructure architects build secure network topologies, automated Kubernetes systems, and fast edge CDNs. We optimize your cloud billing metrics, install real-time telemetry alerts, and design disaster recovery protocols to keep your enterprise services fully online.",
    image: "/images/infrastructure_datacenter.png",
    editorialLead:
      "Infrastructure is invisible when it works and catastrophic when it fails. As organizations scale across regions, the complexity of managing multi-cloud environments, security perimeters, and disaster recovery grows exponentially. The difference between resilient operations and costly outages lies in the architecture decisions made today.",
    features: [
      "Multi-Cloud & Serverless Architecture Design",
      "Zero-Downtime Database & System Migration",
      "24/7 Telemetry Logs & Server Alerts",
      "Disaster Recovery & Geographic Failovers",
    ],
    benefits: [
      "Optimized compute resources and lower bills",
      "Secure subnets and strict firewall borders",
      "Instant horizontal autoscaling capabilities",
      "High reliability with global geographic failovers",
    ],
    metrics: [
      { label: "Auto-Migration Uptime", value: "" },
      { label: "Global Edge Latency", value: "" },
      { label: "Cloud Cost Efficiency", value: "" },
    ],
    statHighlights: [
      { value: "99.99%", label: "Platform Uptime", description: "High-availability architecture with automated failovers" },
      { value: "<50ms", label: "Edge Latency", description: "Global CDN performance across all geographic regions" },
      { value: "35%", label: "Cost Reduction", description: "Cloud spend optimization through right-sizing and reserved capacity" },
    ],
    comparison: [
      { without: "Frequent downtime from server failures", with: "High reliability with automated failovers" },
      { without: "Manual scaling during traffic spikes", with: "Instant horizontal autoscaling capabilities" },
      { without: "High, unoptimized monthly cloud bills", with: "Optimized compute resources and lower costs" },
      { without: "Vulnerable, exposed network endpoints", with: "Secure subnets and strict firewall borders" },
    ],
    testimonial: { quote: "", author: "", role: "", company: "", stat: "", statLabel: "" },
    faqs: [
      { q: "Which cloud providers do you manage?", a: "We provide comprehensive management for AWS, Microsoft Azure, and Google Cloud Platform." },
      { q: "Do you offer 24/7 infrastructure support?", a: "Yes, our SLAs include round-the-clock monitoring, alerts, and incident response." },
      { q: "How do you optimize cloud costs?", a: "We perform continuous audits to identify underutilized resources, right-size instances, and leverage reserved instances." },
      { q: "Can you help with disaster recovery planning?", a: "Yes, we design multi-region geographic failovers with strict RTO and RPO guarantees." },
    ],
    related: [
      { title: "IT Consulting", href: "/services/it-consulting", desc: "Strategize your infrastructure migration" },
      { title: "Technology: Cloud Solutions", href: "/technology/cloud-solutions", desc: "Leverage scalable cloud topologies" },
      { title: "Technology: Network Infrastructure", href: "/technology/network-infrastructure", desc: "Optimize edge CDNs and SD-WANs" },
    ],
    ctaLabel: "Optimize Your Infrastructure",
    ctaTitleTop: "Ready to Modernize",
    ctaTitleHighlight: "Your Infrastructure?",
    ctaDescription: "Discuss your infrastructure challenge with our consultants and design a resilient, secure roadmap for your cloud and systems environment.",
    accentColor: "#059669",
    caseStudies: [
      {
        client: "Logistics Network",
        category: "INFRASTRUCTURE",
        title: "High-Availability Multi-Cloud Transition",
        challenge:
          "Mitigating server failures and database synchronization latency during peak freight tracking cycles.",
        solution:
          "Deploying serverless geographic failovers and horizontal autoscaling on AWS and Microsoft Azure.",
        outcome: "TBD (Pending client implementation)",
        image:
          "/images/global_banking.jpg",
      },
    ],
  },
};

const iconMap = {
  Layers: <Layers className="w-5 h-5 text-primary" />,
  Activity: <Activity className="w-5 h-5 text-primary" />,
  Shield: <Shield className="w-5 h-5 text-primary" />,
  Monitor: <Monitor className="w-5 h-5 text-primary" />,
};

const oldImageMap: Record<string, string> = {
  "it-consulting": "/images/services_it_consulting_blueprint.png",
  "project-management": "/images/services_project_management_blueprint.png",
  "test-management": "/images/services_test_management_blueprint.png",
  "infrastructure-management": "/images/services_infrastructure_blueprint.png",
};

/* ==========================================================================
 EDITORIAL FAQ ITEM — with smooth expand animation
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
 SERVICE DETAIL PAGE — Editorial Enterprise Template
 ========================================================================== */

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const service = servicesData[slug];

  if (!service) {
    return (
      <div className="w-full container mx-auto px-6 py-32 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-extrabold text-foreground">
          Service Not Found
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">
          The requested service page does not exist.
        </p>
        <Link
          href="/services"
          className="mt-6 text-primary font-bold flex items-center gap-1.5 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>
    );
  }

  const statHighlights = service.statHighlights ?? [];
  const blueprintImage = oldImageMap[slug];

  // For the two-tone editorial title
  const titleWords = service.title.split(" ");
  const titleFirstWord = titleWords[0];
  const titleRest = titleWords.slice(1).join(" ");

  return (
    <div className="min-h-dvh bg-background relative overflow-x-hidden">
      <FloatingSidebarNav 
        sections={[
          { id: "overview", label: "Overview" },
          { id: "capabilities", label: "Capabilities" },
          { id: "outcomes", label: "Outcomes" },
          { id: "faqs", label: "FAQs" }
        ]}
      />

      {/* ════════════════════════════════════════════════════════════════
          SECTION 1 — EDITORIAL HERO
          Typography-led, confident. Playfair Display headline.
      ════════════════════════════════════════════════════════════════ */}
      <section className="w-full pt-16 pb-8 md:pt-20 md:pb-12 relative overflow-hidden bg-slate-950 text-white shadow-xl">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image}
            alt={service.title}
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
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-white">{service.title}</span>
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
                {service.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="text-white/70 text-base md:text-lg font-medium leading-relaxed max-w-xl"
              >
                {service.description}
              </motion.p>


            </motion.div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          SECTION 2 — EDITORIAL INTRODUCTION
          Full-width pull-quote paragraph. Magazine-style pacing.
      ════════════════════════════════════════════════════════════════ */}
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
              {service.editorialLead || service.description}
            </p>
          </motion.div>

          {/* Animated accent line */}
          <motion.div
            variants={expandWidth}
            className="max-w-3xl mx-auto mt-16 h-px bg-gradient-to-r from-primary/30 via-primary/15 to-transparent"
          />
        </motion.div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          SECTION 3 — POINT OF VIEW
          Two-column split: Image + Practice narrative.
          Asymmetric layout for editorial rhythm.
      ════════════════════════════════════════════════════════════════ */}
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
                
                <div className="scale-[0.6] md:scale-[0.75]">
                  <AnimatedServiceVisual slug={slug} />
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
                  Practice Overview
                </motion.p>
                <h2 className="font-editorial text-2xl sm:text-3xl md:text-[2.25rem] text-foreground tracking-tight leading-tight">
                  How we approach {service.title}
                </h2>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                {service.overview}
              </p>

              {/* Icon + SLA guarantee — subtle hover lift */}
              <motion.div
                className="flex items-start gap-4 p-5 rounded-lg bg-card border border-border transition-colors duration-300 hover:border-primary/20"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  {iconMap[service.iconName]}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                    SLA Guarantee
                  </p>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    All consulting activities are governed by formal SLAs, offering dedicated support, automated monitoring, and weekly progress reports.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          SECTION 4 — HOW WE DELIVER
          Numbered vertical capability list. IBM-style clean list.
          Typography does the work — no cards, no borders.
      ════════════════════════════════════════════════════════════════ */}
      <section id="capabilities" className="py-20 md:py-28">
        <div className="w-full container px-6 sm:px-8 mx-auto">
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
                  Our {service.title} practice is built on battle-tested, automated, and enterprise-grade delivery frameworks.
                </p>
              </motion.div>
            </div>
            
            <div className="lg:col-span-8">
              <div className="border-t border-border">
                {service.features.map((feature, idx) => (
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
                      {service.benefits[idx] && (
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                          {service.benefits[idx]}
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

      {/* Accent divider */}
      <AccentLine />


      {/* ════════════════════════════════════════════════════════════════
          SECTION 5 — OUTCOMES
          Large stat typography as visual anchors.
          Accenture-style bold numbers, not pill badges.
      ════════════════════════════════════════════════════════════════ */}
      {statHighlights.length > 0 && (
        <section className="py-24 md:py-32">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="w-full container px-6 sm:px-8 mx-auto"
          >
            <motion.div variants={fadeUp} className="max-w-3xl mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Outcomes
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl md:text-[2.25rem] text-foreground tracking-tight leading-tight">
                Measurable impact
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden"
            >
              {statHighlights.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
                  className="bg-background p-8 sm:p-10 relative group overflow-hidden"
                >
                  {/* Subtle top border sweeping glow on hover */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-0" />
                  
                  {/* Background flare on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 space-y-3 transform transition-transform duration-500 group-hover:-translate-y-1">
                    {/* Animated counter for stat value */}
                    <AnimatedStatValue value={stat.value} />

                    {/* Animated accent line under stat */}
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.15 }}
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
        </section>
      )}

      {/* ── VERIFIED OUTCOMES + TESTIMONIAL ─────────────────────── */}
      <section id="outcomes" className="py-20 md:py-28 border-y border-border">
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
                    {(service.caseStudyOutcomes || service.benefits.slice(0, 3)).map((outcome: string, i: number) => (
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
                    &ldquo;{service.testimonial.quote || "The federated GraphQL layer completely transformed how our frontend teams consume data. Development cycles are significantly faster now."}&rdquo;
                  </blockquote>
                </div>
                
                <div className="flex items-center gap-4 pt-6 border-t border-border/50 relative z-10 flex-wrap">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground text-sm shrink-0">
                    {(service.testimonial.author || "Elena Rodriguez").split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0 pr-4 border-r border-border/50">
                    <div className="text-sm font-bold text-foreground truncate">{service.testimonial.author || "Elena Rodriguez"}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest truncate">
                      {service.testimonial.role || "Lead Software Architect"} · {service.testimonial.company || "E-commerce Enterprise"}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-editorial text-foreground">{service.testimonial.stat || "3X"}</div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-primary">{service.testimonial.statLabel || "DEVELOPMENT VELOCITY"}</div>
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


      {/* ════════════════════════════════════════════════════════════════
          SECTION 6 — COMPARISON TABLE
          Clean editorial table. Thin borders, subtle tints.
          Left-aligned text, no icon circles.
      ════════════════════════════════════════════════════════════════ */}
      <section id="overview" className="py-20 md:py-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full container px-6 sm:px-8 mx-auto"
        >
          <motion.div variants={fadeUp} className="max-w-3xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Impact Comparison
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-[2.25rem] text-foreground tracking-tight leading-tight">
              Without Us vs. With Jeshurun
            </h2>
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

            {/* Table rows — staggered reveal */}
            {service.comparison.map((row, i) => (
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
      </section>


      {/* ════════════════════════════════════════════════════════════════
          SECTION 7 — FAQ
          Editorial accordion. Thin separators, clean typography.
      ════════════════════════════════════════════════════════════════ */}
      <section id="faqs" className="py-20 md:py-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full container px-6 sm:px-8 mx-auto"
        >
          <motion.div variants={fadeUp} className="max-w-3xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Frequently Asked
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-[2.25rem] text-foreground tracking-tight leading-tight">
              Common questions
            </h2>
          </motion.div>

          <div className="max-w-3xl">
            {service.faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
            {/* Final border */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-border"
            />
          </div>
        </motion.div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          SECTION 8 — RELATED PRACTICES
          Horizontal text links with arrows. No cards.
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="w-full container px-6 sm:px-8 mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-10">
            <h2 className="font-editorial text-xl sm:text-2xl text-foreground tracking-tight">
              Related practice areas
            </h2>
          </motion.div>

          <div className="space-y-0">
            {service.related.map((rel, i) => (
              <motion.div
                key={i}
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
      </section>


      <RelatedCaseStudies category={service.title} />

      {/* ════════════════════════════════════════════════════════════════
          SECTION 9 — CTA (Existing PremiumCTA — unchanged)
      ════════════════════════════════════════════════════════════════ */}
      <PremiumCTA
        variant="services"
        titleTop={service.ctaTitleTop}
        titleHighlight={service.ctaTitleHighlight}
        description={service.ctaDescription}
      />


    </div>
  );
}
