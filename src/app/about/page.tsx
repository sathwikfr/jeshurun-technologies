"use client";



import { useState } from "react";

import Image from "next/image";

import { motion, AnimatePresence, type Variants } from "framer-motion";

import { 
  Building, Globe, Target, ShieldCheck, 
  Cloud, BarChart, Users, ArrowRight,
  Code2, Lock, CheckCircle2, Server, Cpu, 
  Activity, RefreshCw, Laptop, Key, Workflow, Search,
  User, Link
} from "lucide-react";

import { PremiumCTA } from "@/components/PremiumCTA";

import { SpotlightCard } from "@/components/SpotlightCard";

import { MethodologyTimeline } from "@/components/MethodologyTimeline";

import { TiltCard } from "@/components/TiltCard";

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

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"who" | "delivery" | null>(null);

  // Methodology Timeline steps for Section 6 (How We Deliver)
  const timelineSteps = [
    {
      title: "Discovery & Requirements",
      desc: "Mapping objectives and gathering enterprise constraints.",
      icon: <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Architecture & Planning",
      desc: "Designing robust blueprints and mapping out cloud environments.",
      icon: <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Engineering & QA",
      desc: "Delivering clean code with continuous test management.",
      icon: <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Security & Validation",
      desc: "Auditing security baselines and verifying compliance standards.",
      icon: <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Deployment & Support",
      desc: "Releasing software updates and ensuring 24/7 monitoring.",
      icon: <RefreshCw className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    },
  ];

  // Leadership Team Placeholder Data
  const leadershipData = [
    {
      name: "Full Name",
      title: "Chief Executive Officer & Founder",
      bio: "Brings over a decade of enterprise technology leadership, driving strategic growth and operational excellence across global markets.",
      image: "", // Placeholder for actual image URL
      socials: { linkedin: "#" }
    },
    {
      name: "Full Name",
      title: "Chief Technology Officer",
      bio: "Brings over a decade of enterprise technology leadership, driving strategic growth and operational excellence across global markets.",
      image: "", 
      socials: { linkedin: "#" }
    },
    {
      name: "Full Name",
      title: "Chief Operating Officer",
      bio: "Brings over a decade of enterprise technology leadership, driving strategic growth and operational excellence across global markets.",
      image: "", 
      socials: { linkedin: "#" }
    }
  ];

  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      {/* HERO SECTION WRAPPER */}
      <section className="relative w-full min-h-dvh pt-24 pb-12 md:pt-32 flex items-center overflow-hidden border-b border-border">
        {/* Layer 0.5: Galaxy Spiral Particle Animation */}

        <div className="w-full container px-6 sm:px-8 mx-auto relative z-10">
          
          {/* 1. HERO CONTENT */}
          <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center max-w-4xl mx-auto mb-16 space-y-6"
        >
          <motion.div 
            variants={item}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/5 border border-blue-600/20 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            ABOUT JESHURUN TECHNOLOGIES
          </motion.div>
          
          <motion.h1 
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-[1.15] text-foreground"
          >
            <span className="text-slate-900 dark:text-white block">Where Mission-Critical</span>
            <span className="text-slate-900 dark:text-white block">Enterprise Technology</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 block">
              Gets Delivered.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium"
          >
            45+ certified engineers. 99.9% SLA uptime. Serving pharma, telecoms, and insurance leaders across Ireland, Europe, the Middle East, and India since 2017.
          </motion.p>
        </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="relative w-full py-12">
        <div className="w-full container px-6 sm:px-8 mx-auto relative z-10">
          {/* TAB TOGGLES (Sticky & Fluid) */}
          <div className="sticky top-24 z-50 flex flex-col items-center justify-center mb-12 gap-2">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Select Tab To Explore Content
            </div>
            <div className="flex p-1.5 bg-slate-100/90 dark:bg-slate-900/90 rounded-full border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-md">
            {(["who", "delivery"] as const).map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 z-10 ${
                  activeTab === tab 
                    ? "text-white" 
                    : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-blue-600 rounded-full -z-10 shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{tab === "who" ? "Who We Are" : "Delivery & Quality Standards"}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "who" && (
            <motion.div
              key="who"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Tab Header (Who We Are) */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="max-w-5xl mx-auto mb-16 space-y-12 pt-8"
              >
                <div className="text-center space-y-4">
                  <motion.div 
                    variants={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/5 border border-blue-600/20 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                    About Us
                  </motion.div>
                  
                  <motion.h2 
                    variants={item}
                    className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white"
                  >
                    About Jeshurun Technologies
                  </motion.h2>
                  
                  <motion.p 
                    variants={item}
                    className="text-slate-500 dark:text-slate-400 font-semibold text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
                  >
                    We are a premier technology consulting firm specializing in cloud engineering, cybersecurity, and digital transformation.
                  </motion.p>
                </div>
              </motion.div>

              {/* 2. WHO WE ARE */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="max-w-4xl mx-auto mb-20 relative"
              >
                <SpotlightCard className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900/50 dark:to-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-blue-900/5 overflow-hidden group">
                  {/* Decorative background glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-32 bg-blue-500/10 blur-[60px] pointer-events-none rounded-full" />
                  
                  <motion.h2 
                    variants={item}
                    className="text-lg sm:text-xl font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 text-center mb-8"
                  >
                    Who We Are
                  </motion.h2>
                  
                  <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
                    <motion.p 
                      variants={item}
                      className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white leading-snug"
                    >
                      Jeshurun Technologies helps organizations modernize technology, optimize operations, and accelerate digital transformation.
                    </motion.p>
                    
                    <motion.div variants={item} className="h-px w-24 bg-blue-200 dark:bg-blue-800 mx-auto" />
                    
                    <motion.p 
                      variants={item}
                      className="text-base sm:text-lg font-serif font-medium text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto"
                    >
                      Operating across Ireland, Europe, the Middle East, India, and global remote delivery models, we support leading enterprises in building secure, scalable, and future-ready technology ecosystems through elite consulting, cloud engineering, and cybersecurity.
                    </motion.p>
                  </div>
                </SpotlightCard>
              </motion.div>


              {/* 4. WHY ORGANIZATIONS TRUST JESHURUN (Box-less Floating Grid) */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="max-w-5xl mx-auto mb-32"
              >
                <div className="text-center space-y-6 mb-16">
                  <motion.h2 
                    variants={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/5 border border-blue-600/20 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 shadow-sm mx-auto"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                    Our Differentiator
                  </motion.h2>
                  <motion.h3 
                    variants={item}
                    className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white leading-tight"
                  >
                    Why Organizations Trust Jeshurun
                  </motion.h3>
                  <motion.p 
                    variants={item}
                    className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto"
                  >
                    We don't just deliver technology — we architect resilient ecosystems designed to scale and secure your enterprise's future.
                  </motion.p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 pt-8 border-t border-[rgba(15,23,42,0.08)] dark:border-slate-800">
                  {[
                    { 
                      title: "Cloud-Native Expertise", 
                      desc: "AWS, Azure, Kubernetes, and modern cloud platforms.",
                      icon: Cloud 
                    },
                    { 
                      title: "Security-First Delivery", 
                      desc: "Security integrated across every stage of delivery.",
                      icon: ShieldCheck 
                    },
                    { 
                      title: "Experienced Architects", 
                      desc: "Enterprise specialists with proven histories of scaling legacy systems.",
                      icon: Users 
                    },
                    { 
                      title: "Proven Delivery Framework", 
                      desc: "Standardized playbooks that guarantee predictability and mitigation of risks.",
                      icon: Target 
                    },
                    { 
                      title: "Multi-Industry Experience", 
                      desc: "Successful delivery records across finance, healthcare, logistics, and retail.",
                      icon: Building 
                    },
                    { 
                      title: "Global Collaboration Model", 
                      desc: "Seamless delivery coordination across multiple time zones and regions.",
                      icon: Globe 
                    }
                  ].map((feature, idx) => (
                    <motion.div key={idx} variants={item} className="flex flex-col items-start group">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] mb-6">
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-2 text-left">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
        {/* LEADERSHIP TEAM */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="max-w-6xl mx-auto mb-20 pt-16 border-t border-[rgba(15,23,42,0.08)] dark:border-slate-800"
        >
          <div className="text-center mb-12 space-y-4">
            <motion.div 
              variants={item}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/5 border border-blue-600/20 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              Leadership Team
            </motion.div>
            
            <motion.h2 
              variants={item}
              className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white"
            >
              Meet Our Leadership
            </motion.h2>
            
            <motion.p 
              variants={item}
              className="text-slate-500 dark:text-slate-400 font-semibold text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
            >
              Experienced leaders driving Jeshurun's technology strategy and delivery excellence.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadershipData.map((leader, i) => (
              <motion.div key={i} variants={item}>
                <TiltCard className="h-full">
                  <SpotlightCard className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col h-full hover-card-effect text-center relative overflow-hidden group">
                    {/* Glowing Mesh Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/10 transition-colors duration-500" />
                    
                    <div 
                      className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
                      style={{ transform: "translateZ(40px)" }}
                    >
                      {/* Animated Glow Ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 animate-pulse" />
                      
                      <div className="relative w-[120px] h-[120px] rounded-full bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden border-[3px] border-white dark:border-slate-800 shadow-xl z-10">
                        {leader.image ? (
                          <Image src={leader.image} alt={leader.name} fill className="object-cover" />
                        ) : (
                          <User className="w-12 h-12 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
                        )}
                      </div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col flex-grow" style={{ transform: "translateZ(20px)" }}>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1 tracking-tight">{leader.name}</h3>
                      <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">{leader.title}</p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">
                        {leader.bio}
                      </p>
                    </div>

                    {/* Sliding Social Links */}
                    <div 
                      className="relative z-10 mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <a href={leader.socials.linkedin} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                        <Link className="w-4 h-4" />
                      </a>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
          </motion.div>
        )}
          {activeTab === "delivery" && (
            <motion.div
              key="delivery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="max-w-5xl mx-auto mb-16 space-y-12 pt-8"
              >
                <div className="text-center space-y-4">
                  <motion.div 
                    variants={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/5 border border-blue-600/20 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                    Delivery & Quality Standards
                  </motion.div>
                  
                  <motion.h2 
                    variants={item}
                    className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white"
                  >
                    Delivery & Quality Standards
                  </motion.h2>
                  
                  <motion.p 
                    variants={item}
                    className="text-slate-500 dark:text-slate-400 font-semibold text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
                  >
                    Every engagement is governed by proven delivery frameworks, security-first engineering, continuous quality assurance, and operational excellence.
                  </motion.p>
                </div>
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="max-w-4xl mx-auto mb-20 mt-8 relative"
              >
                <SpotlightCard className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900/50 dark:to-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-blue-900/5 overflow-hidden group">
                  {/* Decorative background glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-32 bg-blue-500/10 blur-[60px] pointer-events-none rounded-full" />
                  
                  <motion.h2 
                    variants={item}
                    className="text-lg sm:text-xl font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 text-center mb-8"
                  >
                    Our Commitment
                  </motion.h2>
                  
                  <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
                    <motion.p 
                      variants={item}
                      className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white leading-snug"
                    >
                      We build secure, scalable, and resilient solutions.
                    </motion.p>
                    
                    <motion.div variants={item} className="h-px w-24 bg-blue-200 dark:bg-blue-800 mx-auto" />
                    
                    <motion.p 
                      variants={item}
                      className="text-base sm:text-lg font-serif font-medium text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto"
                    >
                      By leveraging proven engineering practices, continuous quality assurance, and proactive operational governance, we consistently deliver reliable business outcomes.
                    </motion.p>
                  </div>
                </SpotlightCard>
              </motion.div>


              {/* Resilience Cards (Box-less Floating Grid matching Tab 1 Features) */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="max-w-5xl mx-auto mb-32"
              >
                <div className="text-center space-y-6 mb-16">
                  <motion.h2 
                    variants={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/5 border border-blue-600/20 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 shadow-sm mx-auto"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                    Resilience & Reliability
                  </motion.h2>
                  <motion.h3 
                    variants={item}
                    className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white leading-tight"
                  >
                    Enterprise Resilience Features
                  </motion.h3>
                  <motion.p 
                    variants={item}
                    className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto"
                  >
                    Every engagement is governed by proven delivery frameworks, security-first engineering, continuous quality assurance, and operational excellence.
                  </motion.p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 pt-8 border-t border-[rgba(15,23,42,0.08)] dark:border-slate-800">
                  {[
                    { 
                      title: "Zero-Trust Security", 
                      desc: "Identity-first access controls.",
                      icon: Lock 
                    },
                    { 
                      title: "Business Continuity", 
                      desc: "Proactive strategies to maintain operational workflows.",
                      icon: Activity 
                    },
                    { 
                      title: "Disaster Recovery", 
                      desc: "Automated backup and failover strategies.",
                      icon: RefreshCw 
                    },
                    { 
                      title: "Compliance Readiness", 
                      desc: "Aligning architectures with regional governance guidelines.",
                      icon: ShieldCheck 
                    }
                  ].map((resCard, idx) => (
                    <motion.div key={idx} variants={item} className="flex flex-col items-start group">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] mb-6">
                        <resCard.icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-2 text-left">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {resCard.title}
                        </h4>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                          {resCard.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

        {/* 6. HOW WE DELIVER (Timeline) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full mb-20 relative"
        >
          <MethodologyTimeline
            badge="DELIVERY METHOD"
            title="How We Deliver"
            subtitle="Standardized phases designed to translate business strategy into secure, high-availability technical operations."
            steps={timelineSteps}
            variant="compact-loop"
          />
        </motion.div>

            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </section>

      {/* 7. PREMIUM CTA */}
      <PremiumCTA variant="about" />

    </div>
  );
}
