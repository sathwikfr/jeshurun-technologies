"use client";

import { motion, type Variants } from "framer-motion";
import {
  Check,
  Layers,
  Activity,
  Shield,
  Monitor,
  ArrowRight,
  Compass,
  Cpu,
  Brain,
  Milestone,
} from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/components/SpotlightCard";
import { PremiumCTA } from "@/components/PremiumCTA";
import { CloudROICalculator } from "@/components/CloudROICalculator";
import { MethodologyTimeline } from "@/components/MethodologyTimeline";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 22 },
  },
};

export default function Services() {
  const servicesList = [
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
      icon: <Layers className="w-6 h-6 text-primary" />,
      image: "/service_it_consulting.png",
    },
    {
      title: "Project Management",
      slug: "project-management",
      description:
        "Execute complex enterprise initiatives with certified experts to guarantee on-time, high-impact delivery.",
      features: [
        "Agile & Scrum Implementation",
        "End-to-End Project Execution",
        "Enterprise Risk Management",
        "Cross-functional Stakeholder Alignment",
      ],
      icon: <Activity className="w-6 h-6 text-primary" />,
      image: "/service_project_management.png",
    },
    {
      title: "Test Management",
      slug: "test-management",
      description:
        "Establish zero-defect pipelines with comprehensive quality assurance frameworks and robust automated testing.",
      features: [
        "Test Strategy & Lifecycle Planning",
        "Automated Testing Architectures",
        "Load & Performance Benchmarking",
        "Continuous Quality Assurance",
      ],
      icon: <Shield className="w-6 h-6 text-primary" />,
      image: "/service_test_management.png",
    },
    {
      title: "Infrastructure Management",
      slug: "infrastructure-management",
      description:
        "Design and deploy resilient infrastructure systems, managing seamless cloud migrations and 24/7 telemetry monitoring.",
      features: [
        "Resilient Infrastructure Design",
        "Secure Cloud Migration Strategies",
        "Real-time System Monitoring",
        "Business Continuity & Disaster Recovery",
      ],
      icon: <Monitor className="w-6 h-6 text-primary" />,
      image: "/service_infrastructure_management.png",
    },
  ];

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

  return (
    <div className="flex flex-col items-center justify-center bg-transparent min-h-screen">
      {/* Header Banner */}
      <section className="w-full pt-32 pb-20 md:pt-40 md:pb-28 relative z-10 bg-background overflow-hidden border-b border-border">
        {/* Subtle Enterprise Grid Background */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(37, 99, 235, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(37, 99, 235, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
          }}
        />
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="container px-6 sm:px-8 mx-auto relative z-10"
        >
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <motion.div variants={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Services Suite
            </motion.div>
            <motion.h1 variants={item} className="text-5xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-none">
              <span className="text-[#2563EB]">Enterprise</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4]">
                Services
              </span>
            </motion.h1>
            <motion.p variants={item} className="text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed font-semibold max-w-2xl mx-auto">
              Enterprise IT consulting, QA pipelines, and high-performance
              infrastructure design
            </motion.p>
            
            {/* Static Capability Strip */}
            <motion.div variants={item} className="flex flex-wrap justify-center gap-3 mt-12 pt-8 border-t border-border w-full">
              {["Enterprise Transformation", "Delivery Excellence", "Quality Assurance", "Cloud & Infrastructure"].map((capability) => (
                <span key={capability} className="px-5 py-2.5 rounded-full bg-card border border-border text-sm font-bold text-foreground hover:border-primary/30 hover:bg-muted/30 transition-colors shadow-sm">
                  {capability}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Grid Content Section */}
      <section className="w-full py-20 md:py-28 relative z-10 bg-background border-t border-border">
        <div className="container px-6 sm:px-8 mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 md:grid-cols-2"
          >
            {servicesList.map((service) => (
              <motion.div key={service.title} variants={item} className="h-full">
                <SpotlightCard className="flex flex-col h-full border border-border border-l-4 border-l-primary bg-card group hover:border-primary/30 rounded-2xl overflow-hidden p-0 transition-all duration-300 hover:scale-[1.015]">
                  {/* Top card banner image */}
                  <div className="h-48 w-full overflow-hidden relative border-b border-border ">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-6">
                        <h3 className="text-3xl font-extrabold text-foreground tracking-tight">
                          {service.title}
                        </h3>
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-[1.02] transition-all duration-300">
                          {service.icon}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                          {service.description}
                        </p>

                        <ul className="space-y-4 pt-6 border-t border-border ">
                          {service.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-center text-base font-semibold text-foreground "
                            >
                              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                                <Check className="w-4 h-4 text-primary" />
                              </span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border mt-6">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-base font-bold text-primary hover:text-primary/80 group-hover:translate-x-1 transition-all duration-200"
                      >
                        Explore Practice Area{" "}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <MethodologyTimeline
        badge="PROCESS"
        title="Enterprise Delivery Methodology"
        subtitle="How we coordinate enterprise consulting, cloud transformation, quality assurance, and infrastructure modernization."
        steps={methodology}
      />

      {/* Why Clients Choose Jeshurun */}
      <section className="w-full py-20 md:py-32 bg-card relative border-t border-border">
        <div className="container px-6 sm:px-8 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
              Why Clients Choose Jeshurun
            </h2>
            <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">
              Delivering enterprise resilience, scalable architecture, and continuous quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-border bg-background shadow-sm hover:shadow-md hover:border-primary/30 hover:scale-[1.01] transition-all duration-300 group"
            >
              <div className="text-4xl font-black text-primary mb-2">150+</div>
              <div className="text-lg font-bold text-foreground">Successful Engagements</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl border border-border bg-background shadow-sm hover:shadow-md hover:border-primary/30 hover:scale-[1.01] transition-all duration-300 group"
            >
              <div className="text-4xl font-black text-primary mb-2">Enterprise</div>
              <div className="text-lg font-bold text-foreground">Delivery Framework</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl border border-border bg-background shadow-sm hover:shadow-md hover:border-primary/30 hover:scale-[1.01] transition-all duration-300 group"
            >
              <div className="text-4xl font-black text-primary mb-2">Certified</div>
              <div className="text-lg font-bold text-foreground">Consulting Teams</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl border border-border bg-background shadow-sm hover:shadow-md hover:border-primary/30 hover:scale-[1.01] transition-all duration-300 group"
            >
              <div className="text-4xl font-black text-primary mb-2">24/7</div>
              <div className="text-lg font-bold text-foreground">Strategic Support</div>
            </motion.div>
          </div>
        </div>
      </section>

      <PremiumCTA variant="services" />
    </div>
  );
}
