"use client";

import React from "react";
import { SnowflakeLogo, PostgresLogo, KafkaLogo } from "@/components/TechLogos";
import { Database, Layers, ArrowRight, Server, ShieldCheck, Cpu, HardDrive } from "lucide-react";

export function DataManagementVisualization() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto select-none">
      {/* ── Main Static Architecture Card ── */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-xl dark:shadow-2xl bg-white dark:bg-[#090b10] text-slate-900 dark:text-white p-4 sm:p-5">
        
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-100 dark:border-indigo-500/30 flex items-center justify-center">
              <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest leading-none mb-0.5">Enterprise Architecture</p>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-none tracking-tight">Data Lakehouse & ETL Flow</h3>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-[10px] font-bold text-slate-600 dark:text-zinc-300 uppercase tracking-wider">
            Verified Topology
          </div>
        </div>

        {/* 3-Tier Architecture Diagram */}
        <div className="space-y-3">
          
          {/* Tier 1: Ingestion Sources */}
          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold text-slate-400 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <HardDrive className="w-3 h-3 text-indigo-500" /> 01. Ingestion Layer
              </span>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">Streaming & Batch</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-white dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80 text-center">
                <p className="text-[11px] font-bold text-slate-900 dark:text-white">API Events</p>
                <p className="text-[9px] text-slate-400 dark:text-zinc-400 font-medium">HTTP Telemetry</p>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80 text-center">
                <p className="text-[11px] font-bold text-slate-900 dark:text-white">CDC Logs</p>
                <p className="text-[9px] text-slate-400 dark:text-zinc-400 font-medium">DB Replicas</p>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80 text-center">
                <p className="text-[11px] font-bold text-slate-900 dark:text-white">IoT Streams</p>
                <p className="text-[9px] text-slate-400 dark:text-zinc-400 font-medium">Sensor Logs</p>
              </div>
            </div>
          </div>

          {/* Flow Connector Arrow */}
          <div className="flex justify-center my-1">
            <div className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-indigo-500">
              <ArrowRight className="w-3 h-3 rotate-90" />
            </div>
          </div>

          {/* Tier 2: Processing & Data Lakehouse */}
          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold text-slate-400 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-cyan-500" /> 02. Processing & Storage Engine
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Zero-Loss ETL</span>
            </div>
            <div className="space-y-1.5">
              {/* Engine 1 */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded flex items-center justify-center p-0.5 bg-sky-50 dark:bg-sky-500/10">
                    <SnowflakeLogo className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Snowflake Lakehouse</p>
                    <p className="text-[9px] text-slate-400 dark:text-zinc-400">Columnar Analytics Warehouse</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">Auto-Scaled</span>
              </div>
              {/* Engine 2 */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded flex items-center justify-center p-0.5 bg-blue-50 dark:bg-blue-500/10">
                    <PostgresLogo className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">PostgreSQL Cluster</p>
                    <p className="text-[9px] text-slate-400 dark:text-zinc-400">Transactional Relational Store</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400">Indexed</span>
              </div>
            </div>
          </div>

          {/* Flow Connector Arrow */}
          <div className="flex justify-center my-1">
            <div className="w-6 h-6 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-100 dark:border-cyan-500/20 flex items-center justify-center text-cyan-500">
              <ArrowRight className="w-3 h-3 rotate-90" />
            </div>
          </div>

          {/* Tier 3: Analytics Output & Intelligence */}
          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold text-slate-400 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-emerald-500" /> 03. Executive Analytics & AI
              </span>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">Real-Time BI</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-1.5 rounded-lg bg-white dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80">
                <p className="text-xs font-extrabold text-slate-900 dark:text-white">10× Speed</p>
                <p className="text-[9px] text-slate-400 dark:text-zinc-400">Optimized</p>
              </div>
              <div className="p-1.5 rounded-lg bg-white dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80">
                <p className="text-xs font-extrabold text-slate-900 dark:text-white">TB-Scale</p>
                <p className="text-[9px] text-slate-400 dark:text-zinc-400">Ingested</p>
              </div>
              <div className="p-1.5 rounded-lg bg-white dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80">
                <p className="text-xs font-extrabold text-slate-900 dark:text-white">100% SLA</p>
                <p className="text-[9px] text-slate-400 dark:text-zinc-400">Compliant</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
