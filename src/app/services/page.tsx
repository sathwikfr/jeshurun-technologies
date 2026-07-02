"use client";

import { motion, type Variants } from "framer-motion";
import {
  Layers,
  Activity,
  Shield,
  Monitor,
  ArrowRight,
  Check,
  ChevronRight,
  Compass,
  Cpu,
  Milestone,
  Brain,
} from "lucide-react";
import Link from "next/link";
import { PremiumCTA } from "@/components/PremiumCTA";
import { MethodologyTimeline } from "@/components/MethodologyTimeline";

/* ─────────────────────────────────────────────
   Animation variants
───────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 22 },
  },
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* ─────────────────────────────────────────────
   Hero stat strip (real data from site-wide stats)
───────────────────────────────────────────── */
const heroStats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "20+", label: "Technology Domains" },
  { value: "6", label: "Global Delivery Hubs" },
  { value: "99.9%", label: "SLA Uptime Guarantee" },
];

/* ─────────────────────────────────────────────
   Services with real case-study proof metrics
   Stats pulled from caseStudiesData.ts
───────────────────────────────────────────── */
type ServiceEntry = {
  title: string;
  slug: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  image: string;
  accentFrom: string;
  accentTo: string;
  stat: { value: string; label: string; source: string };
  caseStudyHref: string;
};

const servicesList: ServiceEntry[] = [
  {
    title: "IT Consulting",
    slug: "it-consulting",
    description:
      "Architect forward-looking IT strategies that align technology infrastructure with your core business objectives to accelerate enterprise ROI.",
    features: [
      "Technology Strategy & Roadmap Planning",
      "Enterprise Digital Transformation",
      "IT Architecture & Systems Design",
      "Comprehensive Technology Assessment",
    ],
    icon: <Layers className="w-6 h-6" />,
    image: "/service_it_consulting.png",
    accentFrom: "from-blue-600",
    accentTo: "to-blue-400",
    stat: {
      value: "65%",
      label: "Deployment Acceleration",
      source: "Global Banking Platform Modernisation",
    },
    caseStudyHref: "/case-studies/finance-modernization",
  },
  {
    title: "Project Management",
    slug: "project-management",
    description:
      "Execute complex enterprise initiatives with certified experts to guarantee on-time, high-impact delivery with full agile discipline.",
    features: [
      "Agile & Scrum Implementation",
      "End-to-End Project Execution",
      "Enterprise Risk Management",
      "Cross-functional Stakeholder Alignment",
    ],
    icon: <Activity className="w-6 h-6" />,
    image: "/service_project_management.png",
    accentFrom: "from-indigo-600",
    accentTo: "to-indigo-400",
    stat: {
      value: "20×",
      label: "Faster Deployments",
      source: "Global Supply Chain Automation",
    },
    caseStudyHref: "/case-studies/logistics-automation",
  },
  {
    title: "Test Management",
    slug: "test-management",
    description:
      "Establish zero-defect pipelines with comprehensive quality assurance frameworks and robust automated testing at enterprise scale.",
    features: [
      "Test Strategy & Lifecycle Planning",
      "Automated Testing Architectures",
      "Load & Performance Benchmarking",
      "Continuous Quality Assurance",
    ],
    icon: <Shield className="w-6 h-6" />,
    image: "/service_test_management.png",
    accentFrom: "from-red-600",
    accentTo: "to-orange-400",
    stat: {
      value: "100%",
      label: "HIPAA Compliant",
      source: "Healthcare Cloud Transformation",
    },
    caseStudyHref: "/case-studies/health-transformation",
  },
  {
    title: "Infrastructure Management",
    slug: "infrastructure-management",
    description:
      "Design and deploy resilient infrastructure systems, managing seamless cloud migrations and 24/7 telemetry monitoring at scale.",
    features: [
      "Resilient Infrastructure Design",
      "Secure Cloud Migration Strategies",
      "Real-time System Monitoring",
      "Business Continuity & Disaster Recovery",
    ],
    icon: <Monitor className="w-6 h-6" />,
    image: "/service_infrastructure_management.png",
    accentFrom: "from-emerald-600",
    accentTo: "to-cyan-400",
    stat: {
      value: "99.99%",
      label: "Platform Availability",
      source: "Global Banking Platform Modernisation",
    },
    caseStudyHref: "/case-studies/finance-modernization",
  },
];

/* ─────────────────────────────────────────────
   Methodology steps (unchanged from original)
───────────────────────────────────────────── */
const methodology = [
  {
    title: "Architecture Diagnostics",
    desc: "We perform full legacy architecture diagnostics and evaluate system readiness.",
    icon: <Compass className="w-6 h-6" />,
  },
  {
    title: "Enterprise Blueprinting",
    desc: "Our architects design cloud topologies, security frameworks, and implementation plans.",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    title: "Agile Execution & QA",
    desc: "We execute iterative delivery cycles with automated testing and quality assurance.",
    icon: <Milestone className="w-6 h-6" />,
  },
  {
    title: "SLA Compliance & Telemetry",
    desc: "We deploy monitoring, governance, and uptime assurance frameworks.",
    icon: <Brain className="w-6 h-6" />,
  },
];

/* ─────────────────────────────────────────────
   ServiceStrip — alternating layout component
───────────────────────────────────────────── */
function ServiceStrip({
  service,
  index,
}: {
  service: ServiceEntry;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div id={service.slug} className="py-16 md:py-24">
      <div className="container px-6 sm:px-8 mx-auto">
        <div
          className={`flex flex-col ${
            isEven ? "lg:flex-row" : "lg:flex-row-reverse"
          } gap-10 lg:gap-20 items-center`}
        >
          {/* ── Image Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -32 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[46%] shrink-0"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg aspect-[4/3] bg-muted">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover object-center"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

              {/* Service label badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2.5 bg-black/40 backdrop-blur-md border border-white/15 rounded-xl px-3.5 py-2">
                <div
                  className={`h-7 w-7 rounded-lg bg-gradient-to-br ${service.accentFrom} ${service.accentTo} flex items-center justify-center text-white shrink-0`}
                >
                  <span className="scale-75">{service.icon}</span>
                </div>
                <span className="text-white text-sm font-bold">
                  {service.title}
                </span>
              </div>

              {/* Proof stat badge */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2 text-center">
                <div className="text-white text-2xl font-black leading-none">
                  {service.stat.value}
                </div>
                <div className="text-white/70 text-[9px] font-bold uppercase tracking-wider mt-0.5">
                  {service.stat.label}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Content Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 32 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.08,
            }}
            className="flex-1 space-y-6 min-w-0"
          >
            {/* Practice area badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Practice Area
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              {service.title}
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
              {service.description}
            </p>

            {/* Feature list */}
            <ul className="space-y-3">
              {service.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-base font-semibold text-foreground"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Case study proof strip */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card">
              <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-bold text-foreground">
                  {service.stat.value} {service.stat.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {" "}
                  — {service.stat.source}
                </span>
              </div>
              <Link
                href={service.caseStudyHref}
                className="shrink-0 text-xs font-bold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-0.5"
              >
                See case{" "}
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            {/* CTA Button */}
            <Link
              href={`/services/${service.slug}`}
              className="group inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-full text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Practice Area
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function Services() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-20 relative z-10 bg-background overflow-hidden border-b border-border">
        {/* Enterprise grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(37, 99, 235, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(37, 99, 235, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="container px-6 sm:px-8 mx-auto relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-xs font-bold uppercase tracking-wider text-primary shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Enterprise Practice Areas
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none text-foreground"
            >
              Technology consulting{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4]">
                that delivers.
              </span>
            </motion.h1>

            {/* Supporting copy */}
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg sm:text-xl leading-relaxed font-medium max-w-2xl mx-auto"
            >
              Trusted by enterprise leaders across Ireland, Europe, and the
              Middle East — our four practice areas cover the full technology
              lifecycle from strategy to operations.
            </motion.p>

            {/* Stat strip */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border"
            >
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card px-6 py-5 text-center"
                >
                  <div className="text-2xl font-black text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          SERVICE STRIPS — alternating layout
      ════════════════════════════════════════ */}
      <section className="w-full bg-background relative z-10 divide-y divide-border">
        {servicesList.map((service, i) => (
          <ServiceStrip key={service.slug} service={service} index={i} />
        ))}
      </section>

      {/* ════════════════════════════════════════
          METHODOLOGY TIMELINE
      ════════════════════════════════════════ */}
      <MethodologyTimeline
        badge="PROCESS"
        title="Enterprise Delivery Methodology"
        subtitle="How we coordinate enterprise consulting, cloud transformation, quality assurance, and infrastructure modernisation."
        steps={methodology}
      />

      {/* ════════════════════════════════════════
          CTA
      ════════════════════════════════════════ */}
      <PremiumCTA
        variant="services"
        titleTop="Ready to Begin Your"
        titleHighlight="Enterprise Engagement?"
        description="Our practice leads are ready to scope your requirements, define your roadmap, and build an execution plan aligned to your business objectives."
      />
    </div>
  );
}
