"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Layers,
  Activity,
  Shield,
  Monitor,
  ChevronDown,
  ArrowRight,
  ChevronRight,
  Quote,
  X as XIcon,
} from "lucide-react";
import { PremiumCTA } from "@/components/PremiumCTA";
import { SpotlightCard } from "@/components/SpotlightCard";
import { CloudROICalculator } from "@/components/CloudROICalculator";

/* ==========================================================================
 EDITABLE SERVICES DATA DICTIONARY
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
  "it-consulting": {
    title: "IT Consulting",
    subtitle: "Strategic roadmap planning & architecture design",
    description:
      "Align your technology roadmap with core business metrics to maximize return on investment and accelerate digital product engineering.",
    iconName: "Layers",
    overview:
      "Our IT Consulting practice helps enterprise companies navigate complex digital transformations. We work closely with your stakeholders to design scalable system architectures, assess legacy stacks, and chart robust roadmap strategies that ensure seamless engineering velocity and strict compliance.",
    image: "/service_it_consulting.png",
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
    comparison: [
      { without: "Ad-hoc technology adoption without alignment", with: "Strategic roadmaps aligned with business goals" },
      { without: "Accumulating technical debt and legacy systems", with: "Modernized architectures and reduced debt" },
      { without: "Siloed engineering teams with low velocity", with: "Accelerated digital product delivery" },
      { without: "Compliance risks and security vulnerabilities", with: "Strict governance and SLA compliance" }
    ],
    testimonial: { quote: "", author: "", role: "", company: "", stat: "", statLabel: "" },
    faqs: [
      { q: "How long does a typical IT assessment take?", a: "A comprehensive assessment takes 2-4 weeks depending on the complexity of your systems." },
      { q: "Do you assist with implementing the recommendations?", a: "Yes, our team can help execute the roadmap from architecture design to final delivery." },
      { q: "What frameworks do you use for enterprise architecture?", a: "We leverage TOGAF, Zachman, and modern agile architecture principles." },
      { q: "How do you ensure alignment with business goals?", a: "We start with executive workshops to define KPIs before evaluating any technology." }
    ],
    related: [
      { title: "Project Management", href: "/services/project-management", desc: "Execute your IT roadmap with agile methodologies" },
      { title: "Infrastructure Management", href: "/services/infrastructure-management", desc: "Deploy your modernized architecture to the cloud" },
      { title: "Technology: Cloud Solutions", href: "/technology/cloud-solutions", desc: "Build robust cloud infrastructure" }
    ],
    ctaLabel: "Schedule an IT Assessment",
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
          "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
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
    image: "/service_project_management.png",
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
    comparison: [
      { without: "Missed deadlines and budget overruns", with: "Highly predictable on-time release schedules" },
      { without: "Poor communication and scope creep", with: "Improved stakeholder alignment and feedback" },
      { without: "Unidentified risks causing major delays", with: "Proactive cross-functional risk mitigations" },
      { without: "Opaque development progress", with: "Transparent engineering velocity metrics" }
    ],
    testimonial: { quote: "", author: "", role: "", company: "", stat: "", statLabel: "" },
    faqs: [
      { q: "Do you use Agile, Scrum, or Waterfall?", a: "We primarily use Agile/Scrum for software development, but we tailor our methodology to your organizational needs." },
      { q: "Can you manage offshore and distributed teams?", a: "Yes, our project managers are experienced in aligning global teams across multiple time zones." },
      { q: "What project management tools do you use?", a: "We are proficient in Jira, Asana, Azure DevOps, and Monday.com, among others." },
      { q: "How do you handle scope changes during a project?", a: "We use structured change control processes within agile sprints to evaluate impact before approving changes." }
    ],
    related: [
      { title: "IT Consulting", href: "/services/it-consulting", desc: "Define the strategic roadmap for your projects" },
      { title: "Test Management", href: "/services/test-management", desc: "Ensure quality delivery of your managed projects" },
      { title: "Technology: DevOps", href: "/technology/devops", desc: "Automate delivery pipelines for faster releases" }
    ],
    ctaLabel: "Discuss Your Project",
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
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
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
    image: "/service_test_management.png",
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
    comparison: [
      { without: "Critical regression bugs reaching production", with: "Zero critical bugs with automated QA pipelines" },
      { without: "Slow manual testing bottlenecks", with: "Drastically shortened feedback loops for devs" },
      { without: "System crashes under high user traffic", with: "Consistent performance validated by load tests" },
      { without: "Lack of audit trails for compliance", with: "Full compliance with automated test logs" }
    ],
    testimonial: { quote: "", author: "", role: "", company: "", stat: "", statLabel: "" },
    faqs: [
      { q: "Do you provide automated or manual testing?", a: "We specialize in automated testing pipelines, but we also conduct exploratory manual testing for complex user journeys." },
      { q: "What testing frameworks do you use?", a: "We use Cypress, Playwright, Selenium, Jest, and custom load testing tools like JMeter." },
      { q: "Can you integrate testing into our existing CI/CD?", a: "Absolutely. We build test harnesses that seamlessly integrate into GitHub Actions, GitLab CI, or Jenkins." },
      { q: "How do you handle mobile app testing?", a: "We use Appium and real-device cloud platforms like BrowserStack for comprehensive mobile QA." }
    ],
    related: [
      { title: "Project Management", href: "/services/project-management", desc: "Integrate QA smoothly into agile sprints" },
      { title: "Infrastructure Management", href: "/services/infrastructure-management", desc: "Ensure stable test environments" },
      { title: "Technology: DevOps", href: "/technology/devops", desc: "Embed automated tests in your CI/CD" }
    ],
    ctaLabel: "Audit Your QA Pipeline",
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
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
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
    image: "/service_infrastructure_management.png",
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
    comparison: [
      { without: "Frequent downtime from server failures", with: "High reliability with automated failovers" },
      { without: "Manual scaling during traffic spikes", with: "Instant horizontal autoscaling capabilities" },
      { without: "High, unoptimized monthly cloud bills", with: "Optimized compute resources and lower costs" },
      { without: "Vulnerable, exposed network endpoints", with: "Secure subnets and strict firewall borders" }
    ],
    testimonial: { quote: "", author: "", role: "", company: "", stat: "", statLabel: "" },
    faqs: [
      { q: "Which cloud providers do you manage?", a: "We provide comprehensive management for AWS, Microsoft Azure, and Google Cloud Platform." },
      { q: "Do you offer 24/7 infrastructure support?", a: "Yes, our SLAs include round-the-clock monitoring, alerts, and incident response." },
      { q: "How do you optimize cloud costs?", a: "We perform continuous audits to identify underutilized resources, right-size instances, and leverage reserved instances." },
      { q: "Can you help with disaster recovery planning?", a: "Yes, we design multi-region geographic failovers with strict RTO and RPO guarantees." }
    ],
    related: [
      { title: "IT Consulting", href: "/services/it-consulting", desc: "Strategize your infrastructure migration" },
      { title: "Technology: Cloud Solutions", href: "/technology/cloud-solutions", desc: "Leverage scalable cloud topologies" },
      { title: "Technology: Network Infrastructure", href: "/technology/network-infrastructure", desc: "Optimize edge CDNs and SD-WANs" }
    ],
    ctaLabel: "Optimize Your Infrastructure",
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
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
};

const iconMap = {
  Layers: <Layers className="w-8 h-8 text-primary" />,
  Activity: <Activity className="w-8 h-8 text-primary" />,
  Shield: <Shield className="w-8 h-8 text-primary" />,
  Monitor: <Monitor className="w-8 h-8 text-primary" />,
};

function FAQItem({ q, a, accent }: { q: string; a: string; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/50 transition-colors duration-200 gap-4"
      >
        <span className="text-base font-bold text-foreground leading-snug">
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
            <p className="px-6 pb-5 text-base text-muted-foreground leading-relaxed font-medium border-t border-border pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const service = servicesData[slug];

  if (!service) {
    return (
      <div className="container mx-auto px-6 py-32 text-center min-h-[60vh] flex flex-col justify-center items-center">
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

  return (
    <div className="min-h-screen bg-transparent relative overflow-x-hidden pt-28 pb-20">
      <div className="container px-6 sm:px-8 mx-auto space-y-16 relative z-10">
        {/* Back Link */}
        <div className="flex justify-start">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-extrabold text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </Link>
        </div>

        {/* Hero Banner Section */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-4xl">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs font-bold uppercase tracking-wider text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Enterprise Practice Area
          </motion.div>
          <motion.div variants={fadeUp}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-none">
              {service.title}
            </h1>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-500 text-lg sm:text-xl md:text-2xl font-bold leading-normal">
              {service.subtitle}
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed font-semibold max-w-3xl">
              {service.description}
            </p>
          </motion.div>
        </motion.div>

        {/* Dynamic Metrics Grid */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {service.metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="h-full"
            >
              <SpotlightCard className="p-6 bg-muted/30 dark:bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 space-y-1.5 rounded-2xl h-full">
                <div className={`text-3xl font-black min-h-[40px] flex items-center ${metric.value ? 'text-primary' : 'text-muted-foreground/60'}`}>
                  {metric.value ? (
                    metric.value
                  ) : (
                    <span className="font-medium">--</span>
                  )}
                </div>
                <div className="text-sm font-extrabold text-muted-foreground uppercase tracking-widest">
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
            {/* Dynamic AI-Generated Graphic Illustration Banner */}
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl border border-border shadow-md bg-background">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover object-center hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </motion.div>

            {/* Practice Overview Container */}
            <motion.div variants={fadeUp} className="p-6 sm:p-8 bg-card border border-border rounded-2xl space-y-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                {iconMap[service.iconName]}
              </div>
              <h2 className="text-3xl font-extrabold text-foreground">
                Practice Overview
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed font-semibold">
                {service.overview}
              </p>
            </motion.div>

            {/* Core Features list container */}
            <motion.div variants={fadeUp} className="p-6 sm:p-8 bg-card border border-border rounded-2xl space-y-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
              <h3 className="text-2xl font-bold text-foreground">
                Key Core Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    <span className="text-base font-bold text-foreground leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Benefits & SLA Cards (5 cols) */}
          <motion.div variants={fadeUp} className="lg:col-span-5 h-full">
            <SpotlightCard className="p-6 sm:p-8 border border-border bg-card hover:border-primary/20 flex flex-col h-full rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md">
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight pb-4">
                Operational Benefits
              </h3>
              <p className="text-muted-foreground text-base font-semibold pb-6 border-b border-border">
                How our clients succeed using this specific technology consulting suite:
              </p>

              <ul className="space-y-4 pt-6 flex-1">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </span>
                    <span className="text-base font-bold text-muted-foreground leading-tight">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              {/* SLA Details footer */}
              <div className="p-4 rounded-xl bg-background border border-border mt-8 space-y-2">
                <div className="text-[10px] font-bold text-primary uppercase tracking-widest">
                  Verified SLA Guarantee
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                  All consulting activities are governed by formal SLAs, offering fully dedicated support, automated log monitoring, and weekly reports.
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-primary/5 text-primary border-primary/10">
              Impact Comparison
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Without Us vs. With Jeshurun
            </h2>
            <p className="text-muted-foreground font-medium text-base sm:text-lg max-w-xl mx-auto">
              See the real operational difference our {service.title} practice makes for enterprise clients.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="overflow-hidden rounded-2xl border border-border shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-2 bg-card">
              <div className="px-6 py-4 flex items-center gap-2">
                <XIcon className="w-4 h-4 text-red-400" />
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-muted-foreground">
                  Without Jeshurun
                </span>
              </div>
              <div className="px-6 py-4 flex items-center gap-2 border-l border-border">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-foreground">
                  With Jeshurun
                </span>
              </div>
            </div>
            {/* Rows */}
            {service.comparison.map((row, i) => (
              <div key={i} className={`grid grid-cols-2 border-t border-border ${i % 2 === 0 ? "bg-card" : "bg-muted/10"}`}>
                <div className="px-6 py-4 flex items-start gap-3 border-r border-border">
                  <span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center mt-0.5 shrink-0">
                    <XIcon className="w-3 h-3 text-red-400" />
                  </span>
                  <span className="text-base text-muted-foreground font-medium leading-snug">
                    {row.without}
                  </span>
                </div>
                <div className="px-6 py-4 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-3 h-3 text-emerald-500" />
                  </span>
                  <span className="text-base text-foreground font-bold leading-snug">
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
          {service.testimonial.quote ? (
            /* Filled testimonial */
            <div className="relative rounded-3xl overflow-hidden bg-card p-8 sm:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary),0.15)_0%,transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 opacity-10 pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Stat */}
                <div className="lg:col-span-3 text-center lg:text-left space-y-2">
                  <div className="text-5xl sm:text-6xl font-black text-foreground tracking-tight">
                    {service.testimonial.stat}
                  </div>
                  <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    {service.testimonial.statLabel}
                  </div>
                  <div className="h-px bg-border mt-4 hidden lg:block" />
                  <div className="text-xs uppercase tracking-widest text-muted-foreground/60 font-bold pt-2 hidden lg:block">
                    Verified Client Outcome
                  </div>
                </div>
                <div className="hidden lg:block lg:col-span-1">
                  <div className="h-full w-px bg-border mx-auto" style={{ minHeight: 120 }} />
                </div>
                {/* Quote */}
                <div className="lg:col-span-8 space-y-6">
                  <Quote className="w-8 h-8 opacity-20 text-foreground" />
                  <p className="text-foreground text-lg sm:text-xl font-medium leading-relaxed italic">
                    &ldquo;{service.testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-base text-foreground bg-primary">
                      {service.testimonial.author.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-base font-bold text-foreground">
                        {service.testimonial.author}
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">
                        {service.testimonial.role} · {service.testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Placeholder — shown until real testimonial is added */
            <div className="relative rounded-3xl border-2 border-dashed border-border bg-muted/10 p-10 sm:p-14 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-border flex items-center justify-center mx-auto">
                <Quote className="w-8 h-8 text-muted-foreground/60" />
              </div>
              <div>
                <p className="text-base font-bold text-muted-foreground">
                  Client Testimonial Coming Soon
                </p>
                <p className="text-sm text-muted-foreground/70 mt-2 max-w-md mx-auto">
                  A verified case study from a real {service.title} engagement will appear here once available.
                </p>
              </div>
            </div>
          )}
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-primary/5 text-primary border-primary/10">
              Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4 max-w-3xl">
            {service.faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} accent={service.accentColor} />
            ))}
          </motion.div>
        </motion.div>

        {/* ── Section 4: Related Practices + CTA ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-8"
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border mb-3 bg-primary/5 text-primary border-primary/10">
              Related Practices
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Explore Connected Services
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.related.map((rel) => (
              <Link key={rel.href} href={rel.href} className="group block">
                <div className="h-full p-8 bg-card border border-border rounded-2xl hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] hover:border-primary/35 hover:scale-[1.02] transition-all duration-300">
                  <h4 className="text-lg font-extrabold text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-base text-muted-foreground font-medium leading-relaxed">
                    {rel.desc}
                  </p>
                  <div className="flex items-center gap-1 mt-6 text-sm font-bold text-primary">
                    Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* ═══════ CLOUD ROI CALCULATOR ═══════ */}
          {(slug === "infrastructure-management" || slug === "it-consulting") && (
            <div className="pt-16 pb-8">
              <CloudROICalculator />
            </div>
          )}

          {/* CTA Banner */}
          <div className="-mx-6 sm:-mx-8">
            <PremiumCTA variant="services" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
