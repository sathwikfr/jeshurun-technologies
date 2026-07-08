"use client";
import { useRef } from "react";

import { motion, type Variants , useInView, useReducedMotion } from "framer-motion";
import {
  Layers,
  Activity,
  Shield,
  Monitor,
  ArrowRight,
  Check,
  Compass,
  Cpu,
  Milestone,
  Brain,
  Search, PenTool, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PremiumCTA } from "@/components/PremiumCTA";
import { AnimatedCounter } from "@/components/HeroStatsPanel";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { HeroFieldBackground } from "@/components/HeroFieldBackground";

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

// Relying on HeroStatsPanel default stats

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
    image: "/images/it_consulting_boardroom.png",
    accentFrom: "from-blue-600",
    accentTo: "to-blue-400",
    stat: {
      value: "65%",
      label: "Deployment Acceleration",
      source: "Global Banking Platform Modernization",
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
    image: "/images/project_management_office.png",
    accentFrom: "from-indigo-600",
    accentTo: "to-indigo-400",
    stat: {
      value: "12%",
      label: "Transit Time Reduced",
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
    image: "/images/test_management_dashboard.png",
    accentFrom: "from-red-600",
    accentTo: "to-orange-400",
    stat: {
      value: "Zero",
      label: "Data Breaches",
      source: "Healthcare Cloud Transformation & Compliance",
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
    image: "/images/infrastructure_datacenter.png",
    accentFrom: "from-emerald-600",
    accentTo: "to-cyan-400",
    stat: {
      value: "99.99%",
      label: "Platform Availability",
      source: "Global Banking Platform Modernization",
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
    icon: <Search className="w-6 h-6" />,
    accentColor: "blue-600"
  },
  {
    title: "Enterprise Blueprinting",
    desc: "Our architects design cloud topologies, security frameworks, and implementation plans.",
    icon: <PenTool className="w-6 h-6" />,
    accentColor: "blue-500"
  },
  {
    title: "Agile Execution & QA",
    desc: "We execute iterative delivery cycles with automated testing and quality assurance.",
    icon: <CheckCircle2 className="w-6 h-6" />,
    accentColor: "cyan-500"
  },
  {
    title: "SLA Compliance & Telemetry",
    desc: "We deploy monitoring, governance, and uptime assurance frameworks.",
    icon: <Activity className="w-6 h-6" />,
    accentColor: "cyan-400"
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  // Parse stat for AnimatedCounter
  const statMatch = service.stat.value.match(/^(\D*)(\d+)(.*)$/);
  const isNumeric = statMatch !== null;
  const statPrefix = isNumeric ? statMatch[1] : "";
  const statTarget = isNumeric ? parseInt(statMatch[2], 10) : 0;
  const statSuffix = isNumeric ? statMatch[3] : "";

  const pulseNodes = [
    { top: "25%", left: "30%", delay: 0 },
    { top: "60%", left: "70%", delay: 1.5 },
    { top: "40%", left: "50%", delay: 0.7 },
  ];

  return (
    <div id={service.slug} className="py-16 md:py-24" ref={ref}>
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
              <motion.img
                src={service.image}
                alt={service.title}
                animate={!prefersReducedMotion && isInView ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-full h-full object-cover object-center"
              />
              
              {/* Glowing Pulse Nodes Overlay */}
              {!prefersReducedMotion && isInView && pulseNodes.map((node, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 rounded-full bg-cyan-400/20 blur-xl pointer-events-none mix-blend-screen"
                  style={{ top: node.top, left: node.left }}
                  animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.5, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
                />
              ))}
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
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/15 rounded-xl px-4 py-2.5 text-center min-w-[120px]">
                <div className="text-white text-2xl font-black leading-none min-h-[1.5rem]">
                  {isNumeric ? (
                    <AnimatedCounter 
                      target={statTarget} 
                      prefix={statPrefix} 
                      suffix={statSuffix} 
                      delay={100}
                    />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 5 }}
                      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 5 }}
                      transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 100 }}
                    >
                      {service.stat.value}
                    </motion.div>
                  )}
                </div>
                <div className="text-white/70 text-[9px] font-bold uppercase tracking-wider mt-1">
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
        {/* NEW UNIFIED BACKGROUND */}
        <HeroFieldBackground blobOneColor="bg-blue-600/15" blobTwoColor="bg-cyan-600/15" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="container px-6 sm:px-8 mx-auto relative z-10"
        >
          <div className="max-w-5xl mx-auto text-center space-y-6">
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
              className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black tracking-tight leading-none text-foreground drop-shadow-sm relative"
            >
              Technology consulting{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4] animate-gradient-text drop-shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                that delivers.
              </span>
            </motion.h1>

            {/* Supporting copy */}
            <motion.p
              variants={fadeUp}
              className="text-slate-700 dark:text-slate-300 text-xl sm:text-2xl leading-relaxed font-semibold max-w-2xl mx-auto"
            >
              Trusted by enterprise leaders across Ireland, Europe, and the
              Middle East — our four practice areas cover the full technology
              lifecycle from strategy to operations.
            </motion.p>

            {/* PILL NAVIGATION */}
            <motion.div variants={fadeUp} className="w-full mt-8 pt-8 relative">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                Explore practice areas <ArrowRight className="w-3 h-3 rotate-90" />
              </div>
              <div className="flex flex-wrap justify-center gap-3 w-full bg-card/40 backdrop-blur-md p-5 sm:p-7 rounded-3xl border border-border/50 shadow-inner">
                {servicesList.map((service, idx) => (
                  <motion.button
                    key={service.slug}
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const el = document.getElementById(service.slug);
                      if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 100; window.scrollTo({ top: y, behavior: "smooth" }); }
                    }}
                    className="px-6 py-3 rounded-full border border-border/60 bg-background/80 text-sm font-bold text-foreground shadow-sm hover:border-primary/40 transition-colors"
                  >
                    {service.title}
                  </motion.button>
                ))}
              </div>
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
      <ProcessTimeline
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
