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
  X as XIcon,
  ZoomIn,
} from "lucide-react";
import { PremiumCTA } from "@/components/PremiumCTA";

/* ==========================================================================
 ANIMATION VARIANTS
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

/* ==========================================================================
 EDITABLE SERVICES DATA DICTIONARY
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
  Layers: <Layers className="w-8 h-8 text-primary" />,
  Activity: <Activity className="w-8 h-8 text-primary" />,
  Shield: <Shield className="w-8 h-8 text-primary" />,
  Monitor: <Monitor className="w-8 h-8 text-primary" />,
};

const oldImageMap: Record<string, string> = {
  "it-consulting": "/images/services_it_consulting_blueprint.png",
  "project-management": "/images/services_project_management_blueprint.png",
  "test-management": "/images/services_test_management_blueprint.png",
  "infrastructure-management": "/images/services_infrastructure_blueprint.png",
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

/* ==========================================================================
 SERVICE DETAIL PAGE
 ========================================================================== */

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const service = servicesData[slug];
  const [isZoomed, setIsZoomed] = useState(false);

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

  const caseStudy = service.caseStudies[0] ?? null;
  const isOutcomePending =
    !caseStudy || caseStudy.outcome.startsWith("TBD");

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section className="pt-28 pb-14 md:pt-36 md:pb-18 relative overflow-hidden bg-slate-950 text-white shadow-xl">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt=""
            className="w-full h-full object-cover opacity-55 dark:opacity-45 pointer-events-none select-none"
            aria-hidden="true"
          />
          {/* Left-to-right gradient to cover text area on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />
          {/* Bottom-to-top gradient to fade into the dark page body transition at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          {/* Subtle color highlight in top right */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18)_0%,transparent_60%)]" />
        </div>

        <div className="container px-6 sm:px-8 mx-auto relative z-10">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white bg-white/10 hover:bg-white/25 px-4 py-2 rounded-full border border-white/15 transition-all duration-300 backdrop-blur-md mb-8"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </Link>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-4xl space-y-5"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider text-white"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Enterprise Practice Area
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05]"
            >
              {service.title}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 text-xl sm:text-2xl font-bold leading-normal"
            >
              {service.subtitle}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-slate-300 text-lg leading-relaxed font-medium max-w-3xl"
            >
              {service.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════
          PAGE BODY
      ════════════════════════════════ */}
      <div className="container px-6 sm:px-8 mx-auto py-16 space-y-20 relative z-10">

        {/* ── SECTION 1: THE CHALLENGE ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-red-500/5 text-red-600 dark:text-red-400 border-red-500/15">
              The Challenge
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              What breaks without the right partner
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="grid sm:grid-cols-2 gap-3"
          >
            {service.comparison.map((row, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl border border-red-500/15 bg-red-500/[0.04] dark:bg-red-500/[0.07]"
              >
                <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-500/15 flex items-center justify-center mt-0.5 shrink-0">
                  <XIcon className="w-3 h-3 text-red-500" />
                </div>
                <p className="text-sm text-foreground font-semibold leading-snug">
                  {row.without}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
              The Jeshurun Difference
            </span>
            <div className="h-px flex-1 bg-border" />
          </motion.div>
        </motion.div>

        {/* ── SECTION 2: APPROACH ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid lg:grid-cols-12 gap-8"
        >
          {/* Left: image + overview */}
          <div className="lg:col-span-7 space-y-5">
            <motion.div variants={fadeUp} className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-primary/5 text-primary border-primary/15">
                How We Deliver
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                Our Approach
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              onClick={() => setIsZoomed(true)}
              className="relative overflow-hidden rounded-2xl border border-border shadow-md bg-[#070b13] cursor-zoom-in group"
            >
              <img
                src={oldImageMap[slug]}
                alt={service.title}
                className="w-full h-[360px] object-contain object-center p-2 transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-black/75 text-white text-xs font-bold px-3.5 py-2 rounded-full border border-white/10 backdrop-blur-sm flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ZoomIn className="w-3.5 h-3.5" /> Click to view full diagram
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="p-6 bg-card border border-border rounded-2xl space-y-3"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                {iconMap[service.iconName]}
              </div>
              <h3 className="text-lg font-extrabold text-foreground">
                Practice Overview
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed font-medium">
                {service.overview}
              </p>
            </motion.div>
          </div>

          {/* Right: capabilities + KPI names */}
          <div className="lg:col-span-5">
            <motion.div
              variants={fadeUp}
              className="p-6 bg-card border border-border rounded-2xl space-y-5 h-full"
            >
              <h3 className="text-lg font-extrabold text-foreground">
                Core Capabilities
              </h3>
              <ul className="space-y-3.5">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    <span className="text-base font-semibold text-foreground leading-tight">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-border space-y-2.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  What We Measure
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.metrics.map((m, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/5 text-primary border border-primary/15"
                    >
                      {m.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border p-4 rounded-xl bg-background space-y-1.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                  Verified SLA Guarantee
                </p>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                  All consulting activities are governed by formal SLAs,
                  offering fully dedicated support, automated log monitoring,
                  and weekly progress reports.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── SECTION 3: OPERATIONAL BENEFITS ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/15">
              Outcomes
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Operational Benefits
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="grid sm:grid-cols-2 gap-3"
          >
            {service.benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.07]"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <p className="text-sm text-foreground font-semibold leading-snug">
                  {benefit}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>



        {/* ── SECTION 5: WITHOUT vs WITH (comparison table) ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-primary/5 text-primary border-primary/10">
              Impact Comparison
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Without Us vs. With Jeshurun
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-2xl border border-border shadow-sm"
          >
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

            {service.comparison.map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-t border-border">
                <div className="px-6 py-4 flex items-start gap-3 border-r border-border bg-red-500/[0.03] dark:bg-red-500/[0.05]">
                  <span className="w-5 h-5 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mt-0.5 shrink-0">
                    <XIcon className="w-3 h-3 text-red-400" />
                  </span>
                  <span className="text-sm text-muted-foreground font-medium leading-snug">
                    {row.without}
                  </span>
                </div>
                <div className="px-6 py-4 flex items-start gap-3 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.05]">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mt-0.5 shrink-0">
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

        {/* ── SECTION 6: FAQ ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-primary/5 text-primary border-primary/10">
              Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div variants={fadeUp} className="space-y-3">
              {service.faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  accent={service.accentColor}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── SECTION 7: RELATED PRACTICES ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-5"
        >
          <motion.div variants={fadeUp}>
            <h2 className="text-xl font-extrabold text-foreground tracking-tight">
              Related Practice Areas
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="grid sm:grid-cols-3 gap-4"
          >
            {service.related.map((rel, i) => (
              <Link
                key={i}
                href={rel.href}
                className="group flex flex-col gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all duration-200"
              >
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                  {rel.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {rel.desc}
                </p>
                <span className="mt-1 text-xs font-bold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                  Explore{" "}
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </motion.div>
        </motion.div>

      </div>

      {/* ── CTA ── */}
      <PremiumCTA
        variant="services"
        titleTop={service.ctaTitleTop}
        titleHighlight={service.ctaTitleHighlight}
        description={service.ctaDescription}
      />
      {/* Lightbox Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center cursor-zoom-out p-4 md:p-8 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-w-5xl w-full max-h-[85vh] aspect-square rounded-2xl overflow-hidden bg-[#070b13] border border-white/10 shadow-2xl p-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={oldImageMap[slug]}
                alt="System Architecture Diagram"
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full border border-white/10 transition-colors"
                aria-label="Close modal"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
