"use client";

import { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { 
  Cloud, Database, ShieldCheck, Cpu, Network, Workflow, ArrowRight,
  Code2, Settings, Calculator, DollarSign, Clock,  BarChart3,
  Globe,
} from "lucide-react";
import { PremiumCTA } from "@/components/PremiumCTA";
import Link from "next/link";
import { SpotlightCard } from "@/components/SpotlightCard";
import { CloudROICalculator } from "@/components/CloudROICalculator";
import { MethodologyTimeline } from "@/components/MethodologyTimeline";
import {
  AwsLogo,
  AzureLogo,
  GcpLogo,
  KubernetesLogo,
  DockerLogo,
  TerraformLogo,
  GithubActionsLogo,
  KafkaLogo,
  PostgresLogo,
  ReactLogo,
  NextJsLogo,
  NodeJsLogo,
  PythonLogo,
} from "@/components/TechLogos";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 22 } }
};

/* ─── SDLC DATA ─── */
const SDLC_STAGES = [
  {
    title: "Discovery & Architecture",
    desc: "System design, threat modeling, and architecture planning.",
    icon: <Cpu className="w-6 h-6" />
  },
  {
    title: "Agile Engineering",
    desc: "Modern development powered by CI/CD and automation.",
    icon: <Code2 className="w-6 h-6" />
  },
  {
    title: "QA & Security Auditing",
    desc: "Automated testing, penetration testing, and compliance validation.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    title: "DevOps & Global Scale",
    desc: "Multi-region deployment and continuous operational monitoring.",
    icon: <Settings className="w-6 h-6" />
  }
];

export default function Technology() {
  const technologies = [
    {
      title: "Cloud Solutions",
      slug: "cloud-solutions",
      image: "/tech_cloud_solutions_1782238094719.png",
      description: "Build secure and scalable cloud environments across AWS, Azure, and GCP to support business growth and uninterrupted operations.",
      icon: <Cloud className="w-7 h-7 text-primary" />
    },
    {
      title: "Data Management",
      slug: "data-management",
      image: "/tech_data_management_1782238106583.png",
      description: "Design resilient data lakes and advanced analytics pipelines to turn raw information into actionable business intelligence.",
      icon: <Database className="w-7 h-7 text-primary" />
    },
    {
      title: "Cybersecurity",
      slug: "cybersecurity",
      image: "/tech_cybersecurity_1782238119452.png",
      description: "Implement Zero-Trust architectures to protect your mission-critical digital assets against emerging global threats.",
      icon: <ShieldCheck className="w-7 h-7 text-primary" />
    },
    {
      title: "AI & Machine Learning",
      slug: "ai-machine-learning",
      image: "/tech_ai_ml_1782238141180.png",
      description: "Deploy intelligent automation and predictive models to increase operational agility and drive strategic innovation.",
      icon: <Cpu className="w-7 h-7 text-primary" />
    },
    {
      title: "Network Infrastructure",
      slug: "network-infrastructure",
      image: "/tech_network_1782238153505.png",
      description: "Optimize high-throughput network backbones for secure, low-latency global connectivity.",
      icon: <Network className="w-7 h-7 text-primary" />
    },
    {
      title: "DevOps",
      slug: "devops",
      image: "/tech_devops_1782238166967.png",
      description: "Accelerate software delivery with automated CI/CD pipelines and infrastructure-as-code for reliable, rapid deployments.",
      icon: <Workflow className="w-7 h-7 text-primary" />
    }
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
              Technical Focus
            </motion.div>
            <motion.h1 variants={item} className="text-5xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-none">
              <span className="text-[#2563EB]">Technology</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4]">
                Expertise
              </span>
            </motion.h1>
            <motion.p variants={item} className="text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed font-semibold max-w-2xl mx-auto">
              Leveraging cutting-edge technologies to architect resilient, high-performance enterprise solutions
            </motion.p>

            {/* Static Capability Strip */}
            <motion.div variants={item} className="flex flex-wrap justify-center gap-3 mt-12 pt-8 border-t border-border w-full">
              {["Enterprise Architecture", "High-Availability Cloud", "DevSecOps", "AI Automation", "Data Engineering", "Zero-Trust Security"].map((capability) => (
                <span key={capability} className="px-5 py-2.5 rounded-full bg-card border border-border text-sm font-bold text-foreground hover:border-primary/30 hover:bg-muted/30 transition-colors shadow-sm">
                  {capability}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Grid Cards Section */}
      <section className="w-full py-20 md:py-32 bg-card">
        <div className="container px-6 sm:px-8 mx-auto">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {technologies.map((tech) => (
              <motion.div key={tech.title} variants={item}>
                <SpotlightCard className="h-full border border-border bg-card group hover:border-primary/30 flex flex-col p-0 rounded-2xl overflow-hidden transition-all duration-300">
                  {/* Top card banner image */}
                  <div className="h-48 w-full overflow-hidden relative border-b border-border">
                    <img
                      src={tech.image}
                      alt={tech.title}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-row items-center gap-4 pb-6 border-b border-border">
                        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-[1.02] transition-all duration-300">
                          <div>
                            {tech.icon}
                          </div>
                        </div>
                        <h3 className="text-2xl font-extrabold text-foreground tracking-tight">{tech.title}</h3>
                      </div>
                      <div className="pt-6">
                        <p className="text-muted-foreground text-lg leading-relaxed font-medium">{tech.description}</p>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-border mt-6">
                      <Link
                        href={`/technology/${tech.slug}`}
                        className="inline-flex items-center gap-2 text-base font-bold text-primary hover:text-primary/80 group-hover:translate-x-1 transition-all duration-200"
                      >
                        Explore Technology <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ TECHNOLOGY ECOSYSTEM ═══════ */}
      <section className="w-full py-20 md:py-32 bg-card border-t border-border relative">
        <div className="container px-6 sm:px-8 mx-auto text-center space-y-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Technology Ecosystem
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Our engineering foundation is built on enterprise-grade technologies that scale globally.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center"
          >
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <AwsLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <AzureLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <GcpLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <KubernetesLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <DockerLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <TerraformLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <GithubActionsLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <KafkaLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <PostgresLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <ReactLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <NextJsLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100">
              <NodeJsLogo className="h-12 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.05] opacity-70 hover:opacity-100 col-span-2 sm:col-span-1">
              <PythonLogo className="h-12 w-auto" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ DELIVERY METHODOLOGY ═══════ */}
      <MethodologyTimeline
        badge="PROCESS"
        title="Enterprise Delivery Methodology"
        subtitle="How we transform technology strategy into secure, scalable, enterprise-grade platforms."
        steps={SDLC_STAGES}
      />



      {/* ═══════ FINAL CTA ═══════ */}
      <PremiumCTA variant="technology" />
    </div>
  );
}
