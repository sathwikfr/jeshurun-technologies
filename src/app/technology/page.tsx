"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  Cloud, Database, ShieldCheck, Cpu, Network, Workflow, ArrowRight,
  Code2, Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PremiumCTA } from "@/components/PremiumCTA";
import { MethodologyTimeline } from "@/components/MethodologyTimeline";

const enterpriseContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const enterpriseItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

const SDLC_STAGES = [
  {
    title: "Discovery & Architecture",
    desc: "System design, threat modeling, and architecture planning.",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    title: "Agile Engineering",
    desc: "Modern development powered by CI/CD and automation.",
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    title: "QA & Security Auditing",
    desc: "Automated testing, penetration testing, and compliance validation.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    title: "DevOps & Global Scale",
    desc: "Multi-region deployment and continuous operational monitoring.",
    icon: <Settings className="w-6 h-6" />,
  },
];

export default function Technology() {
  const router = useRouter();

  const technologies = [
    {
      title: "Cloud Solutions",
      slug: "cloud-solutions",
      description: "Build secure and scalable cloud environments across AWS, Azure, and GCP to support business growth and uninterrupted operations.",
      icon: <Cloud className="w-6 h-6" />,
      accentColor: "from-blue-600 to-blue-400",
      accentBg: "bg-blue-500/10",
      accentText: "text-blue-600 dark:text-blue-400",
      accentBorder: "border-blue-500/20",
      stat: "3 Platforms",
      statLabel: "AWS � Azure � GCP",
      tags: ["Multi-Cloud", "Auto-Scaling", "Cost Optimisation"],
    },
    {
      title: "Data Management",
      slug: "data-management",
      description: "Design resilient data lakes and advanced analytics pipelines to turn raw information into actionable business intelligence.",
      icon: <Database className="w-6 h-6" />,
      accentColor: "from-indigo-600 to-indigo-400",
      accentBg: "bg-indigo-500/10",
      accentText: "text-indigo-600 dark:text-indigo-400",
      accentBorder: "border-indigo-500/20",
      stat: "100%",
      statLabel: "SLA Match Rate",
      tags: ["Data Lakes", "ETL Pipelines", "GDPR Compliant"],
    },
    {
      title: "Cybersecurity",
      slug: "cybersecurity",
      description: "Implement Zero-Trust architectures to protect your mission-critical digital assets against emerging global threats.",
      icon: <ShieldCheck className="w-6 h-6" />,
      accentColor: "from-red-600 to-rose-400",
      accentBg: "bg-red-500/10",
      accentText: "text-red-600 dark:text-red-400",
      accentBorder: "border-red-500/20",
      stat: "<1s",
      statLabel: "Threat Detection",
      tags: ["Zero-Trust", "ISO 27001", "Pen Testing"],
    },
    {
      title: "AI & Machine Learning",
      slug: "ai-machine-learning",
      description: "Deploy intelligent automation and predictive models to increase operational agility and drive strategic innovation.",
      icon: <Cpu className="w-6 h-6" />,
      accentColor: "from-violet-600 to-purple-400",
      accentBg: "bg-violet-500/10",
      accentText: "text-violet-600 dark:text-violet-400",
      accentBorder: "border-violet-500/20",
      stat: "<50ms",
      statLabel: "Response Latency",
      tags: ["GenAI / LLMs", "Predictive Models", "MLOps"],
    },
    {
      title: "Network Infrastructure",
      slug: "network-infrastructure",
      description: "Optimize high-throughput network backbones for secure, low-latency global connectivity.",
      icon: <Network className="w-6 h-6" />,
      accentColor: "from-sky-600 to-cyan-400",
      accentBg: "bg-sky-500/10",
      accentText: "text-sky-600 dark:text-sky-400",
      accentBorder: "border-sky-500/20",
      stat: "10Gbps",
      statLabel: "Network Bandwidth",
      tags: ["SD-WAN", "Edge CDN", "DDoS Protection"],
    },
    {
      title: "DevOps",
      slug: "devops",
      description: "Accelerate software delivery with automated CI/CD pipelines and infrastructure-as-code for reliable, rapid deployments.",
      icon: <Workflow className="w-6 h-6" />,
      accentColor: "from-emerald-600 to-green-400",
      accentBg: "bg-emerald-500/10",
      accentText: "text-emerald-600 dark:text-emerald-400",
      accentBorder: "border-emerald-500/20",
      stat: "Instant",
      statLabel: "Rollback Speed",
      tags: ["CI/CD Automation", "IaC (Terraform)", "Observability"],
    },
  ];

  const capabilityMap: Record<string, string> = {
    "Enterprise Architecture": "network-infrastructure",
    "High-Availability Cloud": "cloud-solutions",
    "DevSecOps": "devops",
    "AI Automation": "ai-machine-learning",
    "Data Engineering": "data-management",
    "Zero-Trust Security": "cybersecurity",
  };

  const [activeCapability, setActiveCapability] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveCapability(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );
    Object.values(capabilityMap).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-transparent min-h-screen">

      {/* HERO BANNER */}
      <section className="w-full pt-32 pb-20 md:pt-40 md:pb-28 relative z-10 bg-background overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(37, 99, 235, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(37, 99, 235, 0.04) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        <motion.div
          variants={enterpriseContainer}
          initial="hidden"
          animate="show"
          className="container px-6 sm:px-8 mx-auto relative z-10"
        >
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <motion.div
              variants={enterpriseItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-bold uppercase tracking-wider text-primary shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Technology Domains
            </motion.div>
            <motion.h1 variants={enterpriseItem} className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-foreground">
              <span className="text-[#2563EB]">Technology</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4]">Expertise</span>
            </motion.h1>
            <motion.p variants={enterpriseItem} className="text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed font-semibold max-w-2xl mx-auto">
              Six technology domains. One integrated delivery partner. Built for complex, multi-national enterprise requirements.
            </motion.p>
            <motion.div variants={enterpriseItem} className="w-full mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap justify-center gap-3 w-full">
                {Object.keys(capabilityMap).map((capability, idx) => {
                  const targetId = capabilityMap[capability];
                  const isActive = activeCapability === targetId;
                  return (
                    <motion.button
                      key={capability}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
                      whileHover={{ y: -3, scale: 1.03, boxShadow: "0 10px 24px rgba(30,95,255,0.2)", borderColor: "#1E5FFF", backgroundColor: "rgba(30,95,255,0.05)", color: "#1E5FFF" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        const el = document.getElementById(targetId);
                        if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 120; window.scrollTo({ top: y, behavior: "smooth" }); }
                      }}
                      className={`relative px-5 py-2.5 rounded-full border text-sm font-bold transition-colors duration-300 outline-none ${isActive ? "border-[#1E5FFF] bg-[#EEF3FF] dark:bg-[#1E5FFF]/10 text-[#1E5FFF]" : "bg-card border-border text-foreground shadow-sm"}`}
                    >
                      {isActive && (
                        <motion.div className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(30,95,255,0.4)]" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
                      )}
                      <span className="relative z-10">{capability}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* DOMAIN CARDS */}
      <section className="w-full py-20 md:py-32 bg-card">
        <div className="container px-6 sm:px-8 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground tracking-tight">Our Technology Practice Areas</h2>
            <p className="text-muted-foreground text-lg font-medium">Each domain represents deep, certified expertise � not a checkbox on a brochure.</p>
          </div>
          <motion.div
            variants={enterpriseContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {technologies.map((tech) => (
              <motion.div key={tech.title} variants={enterpriseItem} id={tech.slug} className="h-full scroll-mt-28">
                <div
                  onClick={() => router.push(`/technology/${tech.slug}`)}
                  className="group h-full flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover-card-effect cursor-pointer relative"
                  role="link"
                  aria-label={`Explore ${tech.title} technology domain`}
                >
                  <div className={`h-[3px] w-full bg-gradient-to-r ${tech.accentColor}`} />
                  <div className="flex flex-col flex-1 p-7 gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className={`h-11 w-11 rounded-xl ${tech.accentBg} ${tech.accentText} flex items-center justify-center group-hover:scale-[1.06] transition-transform duration-200`}>
                        {tech.icon}
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-2xl font-black text-foreground leading-none">{tech.stat}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">{tech.statLabel}</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground">{tech.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-2">{tech.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {tech.tags.map((tag) => (
                        <span key={tag} className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${tech.accentBg} ${tech.accentText} border ${tech.accentBorder}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className={`${tech.accentText} font-bold text-sm inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 mt-auto pt-3 border-t border-border`}>
                      Explore Domain <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DELIVERY METHODOLOGY */}
      <MethodologyTimeline
        badge="DELIVERY METHOD"
        title="Enterprise Delivery Methodology"
        subtitle="Standardized phases designed to translate business strategy into secure, high-availability technical operations."
        steps={SDLC_STAGES}
        variant="cards"
      />

      {/* CTA */}
      <PremiumCTA
        variant="technology"
        titleTop="Ready to Modernize"
        titleHighlight="Your Technology Stack?"
        description="Speak with our technology architects and identify the right domains to accelerate your digital transformation goals."
      />
    </div>
  );
}
