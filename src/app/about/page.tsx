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
  const [activeTab, setActiveTab] = useState<"who" | "delivery">("who");

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
    },
    {
      name: "Full Name",
      title: "VP of Delivery",
      bio: "Brings over a decade of enterprise technology leadership, driving strategic growth and operational excellence across global markets.",
      image: "", 
      socials: { linkedin: "#" }
    }
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Premium radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 30% -5%, rgba(37,99,235,0.06) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(6,182,212,0.04) 0%, transparent 55%)"
        }}
        aria-hidden="true"
      />


      <div className="container px-6 sm:px-8 mx-auto relative z-10">
        
        {/* 1. HERO SECTION */}
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

        {/* TAB TOGGLES */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-full border border-slate-200 dark:border-slate-700 backdrop-blur-sm shadow-sm">
            <button 
              onClick={() => setActiveTab("who")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                activeTab === "who" 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Who We Are
            </button>
            <button 
              onClick={() => setActiveTab("delivery")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                activeTab === "delivery" 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Delivery & Quality Standards
            </button>
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
              {/* 2. AT A GLANCE */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="max-w-5xl mx-auto mb-20 space-y-8"
              >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { val: "150+", label: "Projects Delivered" },
                    { val: "Multi-Industry", label: "Expertise" },
                    { val: "Global", label: "Delivery Capability" },
                    { val: "24/7", label: "Operational Support" }
                  ].map((metric, i) => (
                    <motion.div key={i} variants={item} className="h-full">
                      <SpotlightCard className="p-6 text-center bg-[#FFFFFF] dark:bg-[#111827] border border-[rgba(15,23,42,0.08)] dark:border-slate-800 rounded-2xl shadow-sm h-full hover-card-effect flex flex-col">
                        <div className="w-full py-4 px-2 bg-blue-600/5 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-xl mb-4 flex items-center justify-center">
                          <span className="text-xl md:text-2xl font-black">{metric.val}</span>
                        </div>
                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider leading-tight mt-auto">{metric.label}</div>
                      </SpotlightCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 3. WHO WE ARE */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="max-w-4xl mx-auto mb-20 py-10 border-y border-[rgba(15,23,42,0.08)] dark:border-slate-800"
              >
            <motion.h2 
              variants={item}
              className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 text-center mb-6"
            >
              Who We Are
            </motion.h2>
            
            <div className="max-w-3xl mx-auto text-center">
              <motion.p 
                variants={item}
                className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300 leading-relaxed"
              >
                Jeshurun Technologies helps organizations modernize technology, optimize operations, and accelerate digital transformation through consulting, cloud engineering, infrastructure modernization, cybersecurity, and software delivery. Operating across Ireland, Europe, the Middle East, India, and global remote delivery models, we support organizations building secure, scalable, and future-ready technology ecosystems.
              </motion.p>
            </div>
          </motion.div>

              {/* 4. WHY ORGANIZATIONS TRUST JESHURUN */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="max-w-5xl mx-auto mb-24 space-y-8"
              >
                <div className="text-center">
                  <motion.h2 
                    variants={item}
                    className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400"
                  >
                    Why Organizations Trust Jeshurun
                  </motion.h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  ].map((itemCard, idx) => (
                    <motion.div key={idx} variants={item}>
                      <SpotlightCard className="p-6 bg-[#FFFFFF] dark:bg-[#111827] border border-[rgba(15,23,42,0.08)] dark:border-slate-800 rounded-2xl shadow-sm flex flex-col h-full hover-card-effect">
                        <div className="w-full p-3 bg-blue-600/5 dark:bg-blue-600/10 rounded-xl mb-5 flex items-center">
                          <div className="bg-white dark:bg-slate-800 shadow-sm p-2 rounded-full text-blue-600 dark:text-blue-400">
                            <itemCard.icon className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="space-y-2 mt-auto">
                          <h3 className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight leading-tight">{itemCard.title}</h3>
                          <p className="text-xs sm:text-sm font-semibold text-slate-550 dark:text-slate-400 leading-normal">{itemCard.desc}</p>
                        </div>
                      </SpotlightCard>
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
              {/* 5. DELIVERY STANDARDS */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="max-w-5xl mx-auto mb-20 space-y-12 pt-16 border-[rgba(15,23,42,0.08)] dark:border-slate-800"
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

          {/* Quality Standards Stat Row (Redesigned as a horizontal list) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { val: "99.9%", label: "Uptime Commitment", icon: <Activity className="w-5 h-5" /> },
              { val: "24/7", label: "Monitoring", icon: <RefreshCw className="w-5 h-5" /> },
              { val: "Enterprise", label: "Security Controls", icon: <Lock className="w-5 h-5" /> },
              { val: "Continuous", label: "Quality Assurance", icon: <ShieldCheck className="w-5 h-5" /> }
            ].map((metric, i) => (
              <motion.div key={i} variants={item}>
                <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    {metric.icon}
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 dark:text-white leading-tight">{metric.val}</div>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{metric.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Resilience Cards (4 Compact items) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <motion.div key={idx} variants={item}>
                <SpotlightCard className="p-5 bg-[#FFFFFF] dark:bg-[#111827] border border-[rgba(15,23,42,0.08)] dark:border-slate-800 rounded-2xl shadow-sm flex flex-col gap-3 h-full hover-card-effect">
                  <div className="p-3 bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-xl h-fit w-fit">
                    <resCard.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-left">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base tracking-tight leading-tight">{resCard.title}</h3>
                    <p className="text-xs font-semibold text-slate-550 dark:text-slate-400 leading-normal">{resCard.desc}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          {/* Commitment Statement (Framed highlighted card) */}
          <motion.div 
            variants={item}
            className="w-full bg-[#FFFFFF] dark:bg-[#111827] border border-blue-600/20 rounded-3xl p-8 md:p-10 shadow-lg text-center relative overflow-hidden group max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/5 to-transparent opacity-100 z-0" />
            
            <div className="relative z-10 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Our Commitment</span>
              <p className="text-base md:text-lg font-bold text-slate-850 dark:text-slate-100 leading-relaxed max-w-3xl mx-auto">
                We build secure, scalable, and resilient solutions using proven engineering practices, continuous quality assurance, and proactive operational governance to deliver reliable business outcomes.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      )}
      </AnimatePresence>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipData.map((leader, i) => (
              <motion.div key={i} variants={item}>
                <SpotlightCard className="p-6 bg-[#FFFFFF] dark:bg-[#111827] border border-[rgba(15,23,42,0.08)] dark:border-slate-800 rounded-2xl shadow-sm flex flex-col h-full hover-card-effect text-center relative">
                  <div className="w-[120px] h-[120px] mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-slate-200 dark:border-slate-700">
                    {leader.image ? (
                      <Image src={leader.image} alt={leader.name} fill className="object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{leader.name}</h3>
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-4">{leader.title}</p>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 leading-relaxed flex-grow">
                    {leader.bio}
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                    <a href={leader.socials.linkedin} className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      <Link className="w-4 h-4" />
                    </a>
                  </div>
                </SpotlightCard>
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

      </div>

      {/* 7. PREMIUM CTA */}
      <PremiumCTA variant="about" />

    </div>
  );
}
