"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, Activity, Zap, Cpu, Server, Database, Globe, Network, Lock, Code2, LineChart, PieChart, TrendingUp, BarChart3, Users, DollarSign, Target, Award, Compass, Search } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { PremiumCTA } from "@/components/PremiumCTA";
import { Button } from "@/components/ui/button";
import { HeroFieldBackground } from "@/components/HeroFieldBackground";


/* ─── ANIMATION VARIANTS ─── */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 22 } }
};

import { caseStudiesData, CaseStudyArticle } from "@/lib/caseStudiesData";

const CASE_STUDIES = caseStudiesData;

const FILTERS = ["All", "Financial Services", "Healthcare", "Manufacturing", "Logistics", "Pharmaceutical", "Insurance"];

function CaseStudyCard({ study, onClick }: { study: CaseStudyArticle, onClick: () => void }) {
  return (
    <div onClick={onClick} className="w-full h-full cursor-pointer outline-none flex flex-col">
      <SpotlightCard className="flex-1 flex flex-col p-0 hover-card-effect overflow-hidden group">
        {/* Image Header */}
        <div className="relative w-full h-48 md:h-52 overflow-hidden bg-slate-900 shrink-0">
          <Image 
            src={study.image} 
            alt={study.title}
            fill
            className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
        </div>
        
        {/* Content Body */}
        <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-foreground tracking-tight leading-tight mb-4 group-hover:text-[#2563EB] transition-colors text-2xl md:text-3xl text-left">
              {study.title}
            </h3>
            
            <div className="space-y-3 mb-6 text-left">
              <div>
                <strong className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">Challenge</strong>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed line-clamp-2">
                  {study.challenge}
                </p>
              </div>
              <div>
                <strong className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">Solution</strong>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed line-clamp-2">
                  {study.solution}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
            <span className="text-xs font-semibold text-muted-foreground">
              {study.industry}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2563EB] hover:text-[#2563EB]/80 transition-colors">
              Explore Case Study <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function CaseStudiesPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFeaturedIndex(Math.floor(Math.random() * CASE_STUDIES.length));
    setMounted(true);
  }, []);

  const featuredStudy = CASE_STUDIES[featuredIndex];

  const filteredStudies = CASE_STUDIES.filter((study, index) => {
    // Exclude the featured study from the grid
    if (mounted && index === featuredIndex) return false;
    if (!mounted && index === 0) return false;
    
    // Apply category filter
    return activeFilter === "All" || study.industry === activeFilter;
  });

  return (
    <div className="flex flex-col items-center justify-center bg-transparent min-h-screen">
      
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="w-full pt-32 pb-16 md:pt-36 md:pb-20 relative overflow-hidden bg-background border-b border-border">
        {/* NEW UNIFIED BACKGROUND (Blue/Cyan Theme) */}
        <HeroFieldBackground blobOneColor="bg-blue-600/15" blobTwoColor="bg-cyan-600/15" />
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="container px-6 sm:px-8 mx-auto relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-6xl mx-auto">
            {/* Left Content */}
            <div className="flex flex-col items-start text-left space-y-6">
              <motion.div variants={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Enterprise Proof Points
              </motion.div>
              <motion.h1 variants={item} className="text-5xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-none">
                <span className="text-blue-600 dark:text-blue-500">Proven Enterprise</span>{' '}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4]">
                  Transformations
                </span>
              </motion.h1>
              <motion.p variants={item} className="text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed font-semibold max-w-xl">
                Discover how Jeshurun Technologies helps organizations modernize infrastructure, accelerate innovation, reduce costs, and achieve measurable business outcomes.
              </motion.p>
            </div>

            {/* Right Featured Case Study */}
            <motion.div variants={item} className="w-full relative flex justify-center lg:justify-end">
              <div className="w-full max-w-[500px]">
                <CaseStudyCard 
                  study={featuredStudy} 
                  onClick={() => router.push(`/case-studies/${featuredStudy.id}`)} 
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>



      {/* ═══════ CASE STUDIES GRID & FILTERS ═══════ */}
      <section className="w-full py-16 md:py-24 relative z-10 bg-[#F8FAFC] dark:bg-[#020617]">
        <div className="container px-6 sm:px-8 mx-auto space-y-12">
          
          {/* Technology Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                  }}
                  className={`relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    isActive 
                      ? "text-white shadow-md shadow-[#2563EB]/20" 
                      : "text-muted-foreground bg-card border border-border hover:bg-muted/10 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 bg-[#2563EB] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Bento Grid */}
          <motion.div 
            layout
            className="flex flex-col md:flex-row md:flex-wrap gap-6 max-w-6xl mx-auto w-full justify-start items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study) => {
                // Determine responsive column span based on size type
                const colSpanClass = "w-full md:w-[calc(50%-12px)]";

                return (
                  <motion.div
                    layout
                    key={study.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className={`${colSpanClass} flex`}
                  >
                    <CaseStudyCard 
                      study={study} 
                      onClick={() => router.push(`/case-studies/${study.id}`)} 
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredStudies.length === 0 && (
            <div className="text-center py-20 text-muted-foreground font-medium">
              No case studies found for the selected filter combination.
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
