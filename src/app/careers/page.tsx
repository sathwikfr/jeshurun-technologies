"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { MapPin, Clock, Briefcase, ArrowRight, Users, Zap, Heart, Globe, ChevronDown } from "lucide-react";

const departments = ["All", "Engineering", "Consulting", "Project Management", "Quality Assurance", "Infrastructure"];

const jobs = [
  {
    id: 1,
    title: "Senior Cloud Architect",
    department: "Engineering",
    location: "Dublin, Ireland",
    type: "Full-time",
    level: "Senior",
    posted: "2 days ago",
    description: "Design and implement scalable multi-cloud architectures for enterprise clients across Ireland and Europe.",
    skills: ["AWS", "Azure", "Terraform", "Kubernetes"],
  },
  {
    id: 2,
    title: "IT Consultant",
    department: "Consulting",
    location: "Dublin, Ireland / Remote",
    type: "Full-time",
    level: "Mid-Level",
    posted: "1 week ago",
    description: "Provide strategic technology advisory services to help clients align IT investments with business goals.",
    skills: ["IT Strategy", "Digital Transformation", "Stakeholder Management"],
  },
  {
    id: 3,
    title: "Test Automation Engineer",
    department: "Quality Assurance",
    location: "Dublin, Ireland",
    type: "Full-time",
    level: "Mid-Level",
    posted: "3 days ago",
    description: "Build and maintain automated testing frameworks to ensure quality across enterprise software deliveries.",
    skills: ["Selenium", "Cypress", "CI/CD", "Python"],
  },
  {
    id: 4,
    title: "Project Manager",
    department: "Project Management",
    location: "Dublin, Ireland",
    type: "Full-time",
    level: "Senior",
    posted: "5 days ago",
    description: "Lead cross-functional delivery teams using Agile and PRINCE2 methodologies for large-scale enterprise projects.",
    skills: ["Agile", "PRINCE2", "JIRA", "Stakeholder Communication"],
  },
  {
    id: 5,
    title: "Network Infrastructure Engineer",
    department: "Infrastructure",
    location: "Dublin, Ireland",
    type: "Contract",
    level: "Senior",
    posted: "1 week ago",
    description: "Design, deploy, and maintain secure network infrastructure for high-availability enterprise environments.",
    skills: ["Cisco", "BGP", "MPLS", "Network Security"],
  },
  {
    id: 6,
    title: "Junior IT Consultant",
    department: "Consulting",
    location: "Dublin, Ireland",
    type: "Full-time",
    level: "Junior",
    posted: "2 weeks ago",
    description: "Support senior consultants in delivering technology assessments and roadmaps for mid-market clients.",
    skills: ["Business Analysis", "IT Assessment", "Documentation"],
  },
];

const benefits = [
  { icon: <Globe className="w-5 h-5" />, title: "Global Exposure", desc: "Work with enterprise clients across Ireland, Europe, and beyond." },
  { icon: <Zap className="w-5 h-5" />, title: "Fast Career Growth", desc: "Clear progression paths with regular performance reviews and promotions." },
  { icon: <Heart className="w-5 h-5" />, title: "Health & Wellness", desc: "Comprehensive health insurance, mental health support, and wellness budget." },
  { icon: <Users className="w-5 h-5" />, title: "Collaborative Culture", desc: "Supportive team environment where your ideas are heard and valued." },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 22 } },
};

const typeColors: Record<string, string> = {
  "Full-time": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Contract": "bg-amber-50 text-amber-700 border-amber-200",
};

const levelColors: Record<string, string> = {
  "Junior": "bg-primary/5 text-blue-700 border-blue-200",
  "Mid-Level": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Senior": "bg-purple-50 text-purple-700 border-purple-200",
};

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState("All");
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const filtered = activeDept === "All" ? jobs : jobs.filter(j => j.department === activeDept);

  return (
    <div className="min-h-dvh bg-gradient-to-b from-[#F8FAFC] to-white">

      {/* Hero */}
      <section className="w-full pt-20 pb-16 md:pt-28 md:pb-24 bg-[#0A1F44] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.2)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container px-6 sm:px-8 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/10 text-xs font-bold uppercase tracking-wider text-purple-300 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              We&rsquo;re Hiring
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Build Your Career at <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#818CF8]">
                Jeshurun Technologies
              </span>
            </h1>
            <p className="text-white/60 text-lg font-medium leading-relaxed max-w-xl">
              Join a team of passionate engineers, consultants, and architects delivering next-generation IT solutions to enterprise clients across Europe.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="text-center">
                <p className="text-2xl font-black text-white">{jobs.length}</p>
                <p className="text-xs text-white/50 font-medium">Open Roles</p>
              </div>
              <div className="w-px h-10 bg-card/10" />
              <div className="text-center">
                <p className="text-2xl font-black text-white">5</p>
                <p className="text-xs text-white/50 font-medium">Departments</p>
              </div>
              <div className="w-px h-10 bg-card/10" />
              <div className="text-center">
                <p className="text-2xl font-black text-white">🇮🇪</p>
                <p className="text-xs text-white/50 font-medium">Dublin HQ</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="w-full py-14 bg-card border-b border-border">
        <div className="container px-6 sm:px-8 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {benefits.map((b, i) => (
              <motion.div key={i} variants={item} className="flex flex-col items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0057D9]/10 flex items-center justify-center text-[#0057D9]">
                  {b.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0A1F44]">{b.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="container px-6 sm:px-8 mx-auto py-16 space-y-10">

        {/* Department Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-wrap">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                activeDept === dept
                  ? "bg-[#0057D9] text-white shadow-sm"
                  : "bg-slate-100 text-muted-foreground hover:bg-slate-200"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <motion.div
          key={activeDept}
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {filtered.map((job) => (
            <motion.div
              key={job.id}
              variants={item}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] hover:border-primary/35 transition-all duration-300"
            >
              {/* Job Header */}
              <button
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                className="w-full text-left p-6 flex items-start sm:items-center justify-between gap-4 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 min-w-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${typeColors[job.type] || "bg-slate-100 text-muted-foreground border-border"}`}>
                        {job.type}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${levelColors[job.level] || "bg-slate-100 text-muted-foreground border-border"}`}>
                        {job.level}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-medium">{job.posted}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-[#0A1F44] group-hover:text-[#0057D9] transition-colors">
                      {job.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 hidden sm:flex">
                      <Briefcase className="w-3.5 h-3.5 text-muted-foreground" /> {job.department}
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedJob === job.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-muted-foreground"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              {/* Expanded Details */}
              <motion.div
                initial={false}
                animate={{ height: expandedJob === job.id ? "auto" : 0, opacity: expandedJob === job.id ? 1 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 border-t border-border pt-5 space-y-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span key={skill} className="text-xs font-bold text-[#0057D9] bg-[#0057D9]/8 border border-[#0057D9]/15 px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0057D9] hover:bg-[#2563EB] text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
                    >
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </Link>
                    <span className="text-xs text-muted-foreground font-medium">
                      Applications via contact form
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground font-semibold">
            No open roles in this department right now. Check back soon.
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className="w-full py-20 bg-gradient-to-br from-[#0057D9] to-[#4F46E5] relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none" />
        <div className="container px-6 sm:px-8 mx-auto text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Don&rsquo;t see a role that fits?
            </h2>
            <p className="text-white/70 text-lg font-medium max-w-xl mx-auto">
              Send us your CV and we&rsquo;ll keep you in mind for future opportunities that match your skills.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-card text-[#0057D9] font-bold text-sm rounded-xl hover:bg-muted/10 transition-colors shadow-lg"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
