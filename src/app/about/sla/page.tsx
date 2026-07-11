"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Award, 
  Briefcase, 
  Globe, 
  Activity, 
  Server, 
  RefreshCw, 
  AlertTriangle,
  CheckCircle2,
  Cpu
} from "lucide-react";

/* ==========================================================================
   EDITABLE CONFIGURATION ARRAYS
   You can easily edit these values to update compliance and SLA details.
   ========================================================================== */

/**
 * 1. Trust & Compliance Items
 */
const complianceItems = [
  { 
    title: "GDPR Compliant", 
    desc: "Strict European data privacy standard compliance across all infrastructure nodes and client datastores.", 
    icon: <ShieldCheck className="w-6 h-6 text-emerald-500" /> 
  },
  { 
    title: "SLA Guaranteed", 
    desc: "99.9% system uptime commitment backed by legally binding, rigorous enterprise service level contracts.", 
    icon: <Award className="w-6 h-6 text-blue-500" /> 
  },
  { 
    title: "Agile Delivery", 
    desc: "Continuous integration and delivery frameworks ensuring fully transparent and rapid software releases.", 
    icon: <Briefcase className="w-6 h-6 text-indigo-500" /> 
  },
  { 
    title: "Cloud Partnered", 
    desc: "Certified implementation capabilities across AWS, Microsoft Azure, and Google Cloud Platform architectures.", 
    icon: <Globe className="w-6 h-6 text-sky-500" /> 
  }
];

/**
 * 2. SLA Core Performance Pillars
 */
const slaPillars = [
  {
    metric: "99.9% Uptime",
    title: "High Availability Architecture",
    desc: "Multi-region redundant failover clustering ensures your applications remain online under heavy load and database failures."
  },
  {
    metric: "<50ms Latency",
    title: "Global CDN Edge Caching",
    desc: "Dynamic asset serving routes web requests to the geographically nearest server node, minimizing page load wait times."
  },
  {
    metric: "24/7 Monitoring",
    title: "Automated Incident Escalation",
    desc: "Continuous telemetry monitoring systems trigger automated alerts and failover sequences within seconds of any server anomaly."
  },
  {
    metric: "Zero Downtime",
    title: "Continuous Deployment Hooks",
    desc: "Blue-green deployment pipelines allow code updates and software releases to be rolled out without interrupting user sessions."
  }
];

export default function SlaPage() {
  // Simulator State
  const [simulationMode, setSimulationMode] = useState<"normal" | "spike" | "failover">("normal");
  const [uptime, setUptime] = useState(99.98);
  const [latency, setLatency] = useState(14);
  const [activeNodes, setActiveNodes] = useState(12);
  const [healthScore, setHealthScore] = useState(100);
  const [logs, setLogs] = useState<string[]>([
    "[INFO] Telemetry client initialized.",
    "[INFO] Active monitoring on 12 node clusters.",
    "[OK] All systems operating within optimal SLA limits."
  ]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Run dynamic simulation interval ticks
  useEffect(() => {
    const timer = setInterval(() => {
      // Small random changes based on selected simulation mode
      if (simulationMode === "normal") {
        setLatency(Math.floor(12 + Math.random() * 5));
        setUptime(parseFloat((99.97 + Math.random() * 0.02).toFixed(2)));
        setHealthScore(Math.floor(98 + Math.random() * 2));
        setActiveNodes(12);
      } else if (simulationMode === "spike") {
        setLatency(Math.floor(75 + Math.random() * 30));
        setUptime(parseFloat((99.92 + Math.random() * 0.05).toFixed(2)));
        setHealthScore(Math.floor(82 + Math.random() * 6));
        setActiveNodes(12);
      } else if (simulationMode === "failover") {
        // Node crashes and recovers
        setLatency(prev => {
          if (prev < 40) return Math.floor(110 + Math.random() * 40); // Initial lag spike
          return Math.floor(16 + Math.random() * 6); // Post-recovery latency
        });
        setUptime(parseFloat((99.85 + Math.random() * 0.1).toFixed(2)));
        setHealthScore(prev => {
          if (prev > 80) return Math.floor(65 + Math.random() * 10);
          return Math.min(100, prev + 5); // Gradual recovery
        });
        setActiveNodes(prev => {
          if (prev === 12) return 9; // 3 nodes crashed
          return Math.min(12, prev + 1); // Gradual recovery back to 12
        });
      }
    }, 1200);

    return () => clearInterval(timer);
  }, [simulationMode]);



  const handleSelectScenario = (modeId: "normal" | "spike" | "failover") => {
    setSimulationMode(modeId);
    let modeText = "";
    let systemAlert = "";
    
    if (modeId === "normal") {
      modeText = "[INFO] Load Balancer routing normal traffic. Load distribution is even.";
      systemAlert = "[OK] Uptime fully stable. Target SLA 99.9% satisfied.";
    } else if (modeId === "spike") {
      modeText = "[WARNING] High user volume spike detected! Requests scaling to 5,000 req/sec.";
      systemAlert = "[OK] Edge autoscaling active. Spawning background server workers...";
    } else if (modeId === "failover") {
      modeText = "[CRITICAL] Node failure on Node-04, Node-07, and Node-11.";
      systemAlert = "[OK] Dynamic DNS rerouted active requests to Dublin HQ. Outage avoided.";
    }

    setLogs(prev => [
      `[${new Date().toLocaleTimeString("en-US")}] ${modeText}`,
      `[${new Date().toLocaleTimeString("en-US")}] ${systemAlert}`,
      ...prev.slice(0, 4) // Keep last 5 rows
    ]);
  };

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setLogs(prev => [
      `[${new Date().toLocaleTimeString("en-US")}] [INFO] Manual system diagnostics check triggered.`,
      `[${new Date().toLocaleTimeString("en-US")}] [OK] All security keys verified. Caching layers verified.`,
      ...prev.slice(0, 3)
    ]);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-transparent min-h-screen">
      
      {/* Header Banner */}
      <section className="w-full pt-32 pb-20 md:pt-40 md:pb-28 border-b border-border bg-[#F8FAFC] dark:bg-slate-900/10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container px-6 sm:px-8 mx-auto"
        >
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0057D9]/5 border border-[#0057D9]/10 text-xs font-bold uppercase tracking-wider text-[#0057D9] dark:bg-[#0057D9]/15 dark:text-[#60A5FA]">
              Quality Assurance & Guarantees
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[#0A1F44] dark:text-white">
              SLA & Quality Standards
            </h1>
            <p className="text-muted-foreground dark:text-muted-foreground/60 text-lg sm:text-xl md:text-2xl leading-relaxed font-semibold">
              Our engineering commitments to high availability, strict zero-downtime, and military-grade compliance.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SLA Pillar Section & Telemetry Graphic */}
      <section className="w-full py-20 md:py-28 bg-card dark:bg-slate-950 border-b border-border dark:border-border">
        <div className="container px-6 sm:px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-extrabold text-[#0A1F44] dark:text-white tracking-tight">
                  Performance Commitments
                </h2>
                <p className="text-muted-foreground dark:text-muted-foreground/60 text-base leading-relaxed font-medium">
                  We treat service-level agreements as absolute engineering specifications, not guidelines. By building on decentralized, self-healing cloud clusters and executing continuous quality control validation, we guarantee high reliability.
                </p>
              </div>

              {/* Grid of SLA Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {slaPillars.map((item, idx) => (
                  <div key={idx} className="space-y-2 p-5 rounded-2xl bg-background dark:bg-slate-900/40 border border-border dark:border-border hover-card-effect">
                    <span className="text-lg font-extrabold text-[#0057D9] dark:text-[#60A5FA]">
                      {item.metric}
                    </span>
                    <h4 className="font-bold text-sm text-[#0A1F44] dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground dark:text-muted-foreground font-semibold leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graphic Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative group overflow-hidden rounded-3xl border border-border dark:border-border shadow-lg bg-background dark:bg-slate-900/40 h-80">
                <Image 
                  src="/about_sla_standards.png" 
                  alt="Network Monitoring Dashboard Visual"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw" 
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Active Telemetry System
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive SLA Telemetry Simulator (The Wow Factor) */}
      <section className="w-full py-20 md:py-28 bg-[#F8FAFC] dark:bg-slate-900/10 border-b border-border dark:border-border">
        <div className="container px-6 sm:px-8 mx-auto">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[10px] font-bold text-[#0057D9] dark:text-[#60A5FA] uppercase tracking-widest bg-[#0057D9]/5 dark:bg-[#0057D9]/15 border border-[#0057D9]/10 dark:border-[#0057D9]/20 px-3 py-1 rounded-full">
                Interactive Telemetry
              </span>
              <h2 className="text-3xl font-black text-[#0A1F44] dark:text-white tracking-tight">
                Live SLA & Load Simulator
              </h2>
              <p className="text-muted-foreground dark:text-muted-foreground text-sm font-semibold max-w-md mx-auto">
                Toggle scenario modes below to observe how our self-healing load-balancing handles spikes and server crashes.
              </p>
            </div>

            {/* Dashboard Mockup Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-950 text-white p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden border border-border">
              {/* Radial gradient background accent */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(0,87,217,0.15),transparent_70%)] pointer-events-none" />

              {/* Left Column: Metrics & Controls (lg:col-span-7) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-widest">Control Deck</div>
                  <h3 className="text-xl font-bold tracking-tight mt-1">Select Load Scenario</h3>
                </div>

                {/* Scenario Toggle Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "normal" as const, label: "Normal Load", desc: "Standard daily traffic", color: "border-emerald-500/30 hover:bg-emerald-500/5" },
                    { id: "spike" as const, label: "Traffic Spike", desc: "Autoscaling validation", color: "border-amber-500/30 hover:bg-amber-500/5" },
                    { id: "failover" as const, label: "Server Failover", desc: "Redundancy failover test", color: "border-red-500/30 hover:bg-red-500/5" }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => handleSelectScenario(mode.id)}
                      className={`text-left p-3 rounded-xl border transition-all duration-300 relative ${
                        simulationMode === mode.id 
                          ? "bg-blue-600/10 border-blue-500 text-white shadow-md shadow-blue-500/10 scale-[1.02]" 
                          : "bg-slate-900 border-border text-muted-foreground " + mode.color
                      }`}
                    >
                      <span className="font-bold text-xs block">{mode.label}</span>
                      <span className="text-[8px] opacity-70 block mt-0.5">{mode.desc}</span>
                      
                      {simulationMode === mode.id && (
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-blue-400" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Real-time Meter Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border">
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-border flex flex-col justify-between">
                    <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider block">Target SLA</span>
                    <span className="text-lg font-black text-[#60A5FA] mt-1 block">99.90%</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-border flex flex-col justify-between">
                    <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider block">Live Uptime</span>
                    <span className={`text-lg font-black mt-1 block transition-colors ${uptime >= 99.9 ? "text-emerald-400" : "text-amber-400"}`}>
                      {uptime}%
                    </span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-border flex flex-col justify-between">
                    <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider block">Edge Latency</span>
                    <span className={`text-lg font-black mt-1 block transition-colors ${latency < 25 ? "text-emerald-400" : latency < 70 ? "text-amber-400" : "text-red-400"}`}>
                      {latency}ms
                    </span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-border flex flex-col justify-between">
                    <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider block">Health Score</span>
                    <span className={`text-lg font-black mt-1 block transition-colors ${healthScore >= 95 ? "text-emerald-400" : healthScore >= 80 ? "text-amber-400" : "text-red-400"}`}>
                      {healthScore}/100
                    </span>
                  </div>
                </div>

                {/* Simulated Server Grid Visualizer */}
                <div className="space-y-2 pt-2">
                  <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider block">Active Cluster Nodes ({activeNodes}/12 Online)</span>
                  <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
                    {Array.from({ length: 12 }).map((_, idx) => {
                      const isOnline = idx < activeNodes;
                      return (
                        <div 
                          key={idx}
                          className={`h-7 rounded-md flex flex-col items-center justify-center text-[9px] font-bold border transition-all duration-500 ${
                            isOnline 
                              ? simulationMode === "spike"
                                ? "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-sm"
                                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-sm" 
                              : "bg-red-950/20 border-red-900/40 text-red-500 opacity-40"
                          }`}
                        >
                          N{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Logs & Refresh Console (lg:col-span-5) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-slate-900/40 p-5 rounded-2xl border border-border">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Diagnostic Stream
                    </span>
                    <button 
                      onClick={handleManualRefresh}
                      disabled={isRefreshing}
                      className="text-muted-foreground hover:text-white p-1 hover:bg-slate-800 rounded transition-all"
                      title="Run Manual Diagnostics"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-400" : ""}`} />
                    </button>
                  </div>

                  {/* Logs Ticker Display */}
                  <div className="h-44 font-mono text-[10px] leading-relaxed text-muted-foreground overflow-y-auto space-y-2 select-text selection:bg-blue-600/30 scrollbar-thin">
                    <AnimatePresence initial={false}>
                      {logs.map((log, i) => {
                        let colorClass = "text-muted-foreground";
                        if (log.includes("[CRITICAL]")) colorClass = "text-red-400 font-bold";
                        else if (log.includes("[WARNING]")) colorClass = "text-amber-400";
                        else if (log.includes("[OK]")) colorClass = "text-emerald-400";
                        
                        return (
                          <motion.div 
                            key={log + i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`${colorClass}`}
                          >
                            {log}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between text-[8px] font-bold text-muted-foreground uppercase tracking-widest">
                  <span>Routing Engine: HAProxy Node</span>
                  <span>Region: EU-West (Dublin)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Compliance Section */}
      <section className="w-full py-20 md:py-28 bg-card dark:bg-slate-950">
        <div className="container px-6 sm:px-8 mx-auto">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[10px] font-bold text-[#0057D9] dark:text-[#60A5FA] uppercase tracking-widest bg-[#0057D9]/5 dark:bg-[#0057D9]/15 border border-[#0057D9]/10 dark:border-[#0057D9]/20 px-3 py-1 rounded-full">
                Security & Accreditations
              </span>
              <h2 className="text-3xl font-black text-[#0A1F44] dark:text-white tracking-tight">Compliance & Trust</h2>
              <p className="text-muted-foreground dark:text-muted-foreground text-sm font-semibold max-w-md mx-auto">
                We operate under rigorous international standards to ensure the complete protection and security of your systems.
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-8">
              {complianceItems.map((acc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="p-6 bg-background dark:bg-slate-900 border border-border dark:border-border rounded-2xl text-center space-y-3 hover-card-effect"
                >
                  <div className="mx-auto h-12 w-12 rounded-xl bg-card dark:bg-slate-950 flex items-center justify-center shadow-inner border border-border dark:border-border">
                    {acc.icon}
                  </div>
                  <h4 className="font-bold text-sm text-[#0A1F44] dark:text-white">{acc.title}</h4>
                  <p className="text-[11px] text-muted-foreground dark:text-muted-foreground leading-relaxed font-semibold">{acc.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
