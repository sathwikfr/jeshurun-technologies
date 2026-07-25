"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Bot, Sparkles, Network } from "lucide-react";

const BAR_HEIGHTS = [60, 95, 75, 100, 85, 70];

const AI_NODES = [
  {
    icon: Bot,
    name: "GenAI & RAG Pipeline",
    color: "#7C3AED",
    status: "Active",
    region: "private-vpc",
    metric: "42ms Latency",
    indicator: "bg-emerald-500 dark:bg-emerald-400",
  },
  {
    icon: Sparkles,
    name: "Vector Store (Qdrant)",
    color: "#3B82F6",
    status: "Synced",
    region: "embeddings",
    metric: "1.2ms Search",
    indicator: "bg-emerald-500 dark:bg-emerald-400",
  },
  {
    icon: Network,
    name: "Neural Model Cluster",
    color: "#059669",
    status: "Training",
    region: "gpu-cluster",
    metric: "98.4% Accuracy",
    indicator: "bg-emerald-500 dark:bg-emerald-400",
  },
];

export function AiMachineLearningVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[480px] mx-auto flex flex-col gap-3 select-none"
    >
      {/* ── Main Dashboard Card (Light in Light Mode, Dark Black in Dark Mode) ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-xl dark:shadow-2xl bg-white dark:bg-[#141416] text-slate-900 dark:text-white"
      >
        {/* Dark Mode Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 hidden dark:block">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 rounded-full bg-purple-500/10 blur-2xl" />
        </div>

        {/* Header Bar */}
        <div className="relative flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-slate-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-500/15 border border-purple-100 dark:border-purple-500/30 flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-widest leading-none mb-0.5">Agentic AI Engine</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-none tracking-tight">Neural Inference & RAG Telemetry</p>
            </div>
          </div>
          {/* Active Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/80 dark:border-emerald-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-emerald-400" />
            </span>
            <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Inference</span>
          </div>
        </div>

        {/* AI Nodes Rows */}
        <div className="relative px-4 py-2.5 space-y-2">
          {AI_NODES.map((node, i) => {
            const IconComp = node.icon;
            return (
              <motion.div
                key={node.name}
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 p-2 rounded-xl bg-slate-50/70 dark:bg-zinc-900/80 border border-slate-100 dark:border-zinc-800 hover:bg-slate-100/80 dark:hover:border-zinc-700 transition-all group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center p-1.5 shrink-0"
                  style={{ backgroundColor: `${node.color}15`, border: `1px solid ${node.color}30` }}
                >
                  <IconComp className="w-4 h-4" style={{ color: node.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{node.name}</span>
                    <span className="text-[9px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">{node.region}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${node.indicator}`} />
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{node.status}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-[9px] text-slate-500 dark:text-zinc-400 uppercase tracking-wider leading-none mb-0.5">Metric</p>
                  <p className="text-xs sm:text-sm font-extrabold text-purple-600 dark:text-purple-400">{node.metric}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats Strip */}
        <div className="relative px-4 pb-3 pt-1 grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-zinc-800">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="text-center pt-2"
          >
            <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">80%</p>
            <p className="text-[9px] text-slate-500 dark:text-zinc-400 font-semibold mt-0.5">Automation Gain</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.42 }}
            className="text-center pt-2 border-x border-slate-100 dark:border-zinc-800"
          >
            <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">85%+</p>
            <p className="text-[9px] text-slate-500 dark:text-zinc-400 font-semibold mt-0.5">Prediction Accuracy</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.49 }}
            className="text-center pt-2"
          >
            <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">&lt;50ms</p>
            <p className="text-[9px] text-slate-500 dark:text-zinc-400 font-semibold mt-0.5">Response Delay</p>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom Row: Two Smaller Metric Cards ── */}
      <div className="grid grid-cols-2 gap-2.5">

        {/* Task Automation */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#141416] text-slate-900 dark:text-white p-3 shadow-lg"
        >
          <div className="mb-1.5">
            <span className="text-[9px] font-extrabold text-slate-500 dark:text-zinc-300 uppercase tracking-widest truncate block">Task Automation</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">80</span>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">% Speedup</span>
          </div>
          <p className="text-[9px] text-slate-400 dark:text-zinc-400 font-medium mt-0.5">Agentic Workflows</p>
          {/* Sparkline */}
          <div className="mt-2 h-4.5 flex items-end gap-0.5">
            {[65, 75, 80, 85, 90, 95, 90, 98, 100].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-purple-500 dark:bg-purple-400 rounded-t-[2px]"
                style={{ height: `${h}%` }}
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.03, duration: 0.35, ease: "easeOut" }}
              />
            ))}
          </div>
        </motion.div>

        {/* Inference Latency */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#141416] text-slate-900 dark:text-white p-3 shadow-lg"
        >
          <div className="mb-1.5">
            <span className="text-[9px] font-extrabold text-slate-500 dark:text-zinc-300 uppercase tracking-widest truncate block">Inference Speed</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">&lt;50</span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">ms</span>
          </div>
          <p className="text-[9px] text-slate-400 dark:text-zinc-400 font-medium mt-0.5">Sub-second RAG</p>
          {/* Animated bars */}
          <div className="mt-2 flex items-end gap-1 h-4.5">
            {BAR_HEIGHTS.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-indigo-600 dark:bg-indigo-400 rounded-t-[2px]"
                initial={{ height: "20%" }}
                animate={{ height: `${h}%` }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: i * 0.12,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
