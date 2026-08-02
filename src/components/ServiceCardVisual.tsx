"use client";

import { motion, useReducedMotion } from "framer-motion";

function pulse(delay = 0, duration = 2.4) {
  return {
    animate: { opacity: [0.3, 1, 0.3], scale: [0.95, 1.05, 0.95] },
    transition: { duration, repeat: Infinity, ease: "easeInOut" as any, delay },
  };
}

function floatAnim(delay = 0, amplitude = 6) {
  return {
    animate: { y: [-amplitude, amplitude, -amplitude] },
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as any, delay },
  };
}

export function ITConsultingCardVisual() {
  const reduced = useReducedMotion();
  const nodes = [
    { cx: 60, cy: 120 }, { cx: 120, cy: 80 }, { cx: 170, cy: 120 },
    { cx: 240, cy: 80 }, { cx: 290, cy: 120 }, { cx: 170, cy: 165 },
  ];
  const lines = [
    "M 60 120 L 120 80", "M 120 80 L 170 120", "M 170 120 L 240 80",
    "M 240 80 L 290 120", "M 170 120 L 170 165",
  ];
  const lbls = [
    { x: 60, y: 137, t: "CLOUD" }, { x: 120, y: 67, t: "API GW" },
    { x: 240, y: 67, t: "INFRA" }, { x: 290, y: 137, t: "ANALYTICS" }, { x: 170, y: 180, t: "SECURITY" },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(37,99,235,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_60%_40%,rgba(37,99,235,0.18)_0%,transparent_70%)]" />
      <svg viewBox="0 0 340 240" className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="itNodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="itLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
          <filter id="itGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {lines.map((d, i) => (
          <motion.path key={i} d={d} stroke="url(#itLineGrad)" strokeWidth="1.5" fill="none" strokeDasharray="80"
            animate={reduced ? {} : { strokeDashoffset: [120, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: i * 0.4 }} />
        ))}
        {nodes.map((n, i) => (
          <motion.g key={i} filter="url(#itGlow)" {...(reduced ? {} : pulse(i * 0.35))}>
            <circle cx={n.cx} cy={n.cy} r="10" className="fill-blue-500/10 dark:fill-blue-500/20 stroke-blue-500 stroke-[1px]" />
            <circle cx={n.cx} cy={n.cy} r="4" fill="url(#itNodeGrad)" />
          </motion.g>
        ))}
        <motion.g {...(reduced ? {} : floatAnim(0))}>
          <rect x="132" y="100" width="76" height="40" rx="6" className="fill-blue-50 dark:fill-blue-500/10 stroke-blue-500 stroke-[1px]" />
          <text x="170" y="116" textAnchor="middle" className="fill-blue-700 dark:fill-blue-300 text-[7px] font-mono font-bold">ARCHITECTURE</text>
          <text x="170" y="128" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 text-[7px] font-mono">CORE v4.2</text>
        </motion.g>
        {lbls.map((l, i) => (
          <text key={i} x={l.x} y={l.y} textAnchor="middle" className="fill-slate-600 dark:fill-slate-400 text-[6px] font-mono">{l.t}</text>
        ))}
      </svg>
    </div>
  );
}

export function ProjectManagementCardVisual() {
  const reduced = useReducedMotion();
  const cols = [
    { 
      label: "BACKLOG", x: 22, cards: ["Auth Service", "API Gateway", "DB Migration"], 
      textClass: "fill-indigo-700 dark:fill-indigo-400",
      strokeClass: "stroke-indigo-500 dark:stroke-indigo-400/60",
      barClass: "fill-indigo-600 dark:fill-indigo-400",
      done: 0 
    },
    { 
      label: "IN PROGRESS", x: 122, cards: ["CI Pipeline", "Design Sys"], 
      textClass: "fill-indigo-600 dark:fill-indigo-300",
      strokeClass: "stroke-indigo-400 dark:stroke-indigo-300/60",
      barClass: "fill-indigo-500 dark:fill-indigo-300",
      done: 1 
    },
    { 
      label: "REVIEW", x: 222, cards: ["Cloud Deploy"], 
      textClass: "fill-indigo-500 dark:fill-indigo-200",
      strokeClass: "stroke-indigo-300 dark:stroke-indigo-200/60",
      barClass: "fill-indigo-400 dark:fill-indigo-200",
      done: 1 
    },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(99,102,241,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_50%_30%,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
      <svg viewBox="0 0 320 220" className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="pmBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="[stop-color:#4f46e5] dark:[stop-color:#6366f1]" />
            <stop offset="100%" className="[stop-color:#818cf8] dark:[stop-color:#a5b4fc]" />
          </linearGradient>
        </defs>
        <rect x="20" y="18" width="280" height="8" rx="4" className="fill-indigo-500/10 dark:fill-indigo-500/15" />
        <motion.rect x="20" y="18" width="0" height="8" rx="4" fill="url(#pmBarGrad)"
          animate={reduced ? {} : { width: [0, 196] }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.4 }} />
        <text x="20" y="12" className="fill-indigo-700 dark:fill-[#6366f1] text-[6px] font-mono font-bold">SPRINT 14</text>
        <text x="285" y="12" className="fill-indigo-500 dark:fill-[#818cf8] text-[6px] font-mono" textAnchor="end">70%</text>
        {cols.map((col) => (
          <g key={col.label}>
            <rect x={col.x} y="36" width="86" height="14" rx="4" className="fill-indigo-500/10 dark:fill-indigo-500/12" />
            <text x={col.x + 43} y="46" textAnchor="middle" className={`text-[5.5px] font-mono font-bold ${col.textClass}`}>{col.label}</text>
            {col.cards.map((card, i) => (
              <motion.g key={card} {...(reduced ? {} : floatAnim(i * 0.6))}>
                <rect x={col.x} y={58 + i * 46} width="86" height="36" rx="4"
                  className={i < col.done 
                    ? `fill-indigo-50 dark:fill-indigo-500/10 ${col.strokeClass} stroke-[1px]` 
                    : `fill-white dark:fill-[#0f0d28]/70 stroke-slate-300 dark:stroke-indigo-400/30 stroke-[0.5px]`}
                  />
                <circle cx={col.x + 9} cy={58 + i * 46 + 10} r="3" className={i < col.done ? col.barClass : `fill-slate-200 dark:fill-indigo-500/30`} />
                <text x={col.x + 16} y={58 + i * 46 + 12} className="text-[5.5px] font-sans fill-slate-700 dark:fill-[#c7d2fe]">{card}</text>
                <rect x={col.x + 5} y={58 + i * 46 + 20} width="76" height="3" rx="2" className="fill-slate-100 dark:fill-indigo-500/20" />
                <motion.rect x={col.x + 5} y={58 + i * 46 + 20} width={0} height="3" rx="2" className={`${col.barClass} opacity-80 dark:opacity-70`}
                  animate={reduced ? {} : { width: [0, i < col.done ? 76 : 40] }}
                  transition={{ duration: 1.5, delay: i * 0.3 + 0.5 }} />
              </motion.g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

export function TestManagementCardVisual() {
  const reduced = useReducedMotion();
  const stages = [
    { label: "UNIT", result: "PASS", x: 30 },
    { label: "INT", result: "PASS", x: 100 },
    { label: "E2E", result: "PASS", x: 170 },
    { label: "PERF", result: "RUNNING", x: 240 },
    { label: "SEC", result: "QUEUED", x: 310 },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(220,38,38,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_50%_50%,rgba(220,38,38,0.12)_0%,transparent_70%)]" />
      <svg viewBox="0 0 360 220" className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="tmSignal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="[stop-color:#ef4444]" stopOpacity="0" />
            <stop offset="50%" className="[stop-color:#f97316]" stopOpacity="0.9" />
            <stop offset="100%" className="[stop-color:#ef4444]" stopOpacity="0" />
          </linearGradient>
          <filter id="tmGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <line x1="30" y1="110" x2="330" y2="110" className="stroke-red-500/20 stroke-[1px]" />
        <motion.line x1="30" y1="110" x2="30" y2="110" stroke="url(#tmSignal)" strokeWidth="2"
          animate={reduced ? {} : { x2: [30, 250] }}
          transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }} />
        {stages.map((s, i) => {
          const isPass = s.result === "PASS";
          const isRunning = s.result === "RUNNING";
          const textCol = isPass ? "fill-green-600 dark:fill-green-500" : isRunning ? "fill-orange-500" : "fill-slate-500 dark:fill-slate-600";
          const circleCol = isPass ? "stroke-green-500" : isRunning ? "stroke-orange-500" : "stroke-slate-400 dark:stroke-slate-600";
          const innerCircle = isPass ? "fill-green-500" : isRunning ? "fill-orange-500" : "fill-slate-400 dark:fill-slate-600";
          return (
            <g key={s.label}>
              {i > 0 && (
                <line x1={stages[i - 1].x} y1="110" x2={s.x} y2="110"
                  className={isPass ? "stroke-green-500/30 stroke-[1.5px]" : "stroke-slate-400/30 stroke-[1.5px]"} />
              )}
              <motion.g filter="url(#tmGlow)" {...(isRunning && !reduced ? pulse(0, 1.2) : {})}>
                <circle cx={s.x} cy="110" r="14" className={`fill-white dark:fill-black/80 ${circleCol} stroke-[1.2px]`} />
                <circle cx={s.x} cy="110" r="5" className={`${innerCircle} ${isPass ? "opacity-100" : isRunning ? "opacity-90" : "opacity-30"}`} />
              </motion.g>
              <text x={s.x} y="90" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-[6.5px] font-mono font-bold">{s.label}</text>
              <text x={s.x} y="133" textAnchor="middle" className={`${textCol} text-[6px] font-mono`}>{s.result}</text>
            </g>
          );
        })}
        <motion.g {...(reduced ? {} : floatAnim(0.3, 5))}>
          <rect x="120" y="155" width="120" height="44" rx="5" className="fill-white dark:fill-black/70 stroke-orange-500 stroke-[0.8px] opacity-90 dark:opacity-60" />
          <text x="180" y="169" textAnchor="middle" className="fill-orange-600 dark:fill-orange-500 text-[6.5px] font-mono font-bold">TEST RUN #841</text>
          <text x="135" y="183" className="fill-green-600 dark:fill-green-500 text-[7px] font-mono">1,842 passed</text>
          <text x="135" y="194" className="fill-red-500 text-[7px] font-mono">0 failed</text>
        </motion.g>
        <motion.path
          d="M 20 55 Q 50 40 80 55 Q 110 70 140 55 Q 170 40 200 55 Q 230 70 260 55 Q 290 40 320 55"
          fill="none" className="stroke-red-500 stroke-[1px] opacity-30 dark:opacity-40" strokeDasharray="200"
          animate={reduced ? {} : { strokeDashoffset: [200, 0, -200] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
      </svg>
    </div>
  );
}

export function InfrastructureCardVisual() {
  const reduced = useReducedMotion();
  const servers = [
    { id: "SRV-01", load: 72, isHigh: false },
    { id: "SRV-02", load: 45, isHigh: false },
    { id: "SRV-03", load: 88, isHigh: true },
    { id: "SRV-04", load: 31, isHigh: false },
  ];
  const regions = [
    { label: "EU-WEST", x: 195 },
    { label: "US-EAST", x: 246 },
    { label: "APAC", x: 300 },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_60%,rgba(16,185,129,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_40%_60%,rgba(16,185,129,0.12)_0%,transparent_70%)]" />
      <svg viewBox="0 0 340 230" className="w-full h-full" aria-hidden="true">
        <defs>
          <filter id="infraGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect x="22" y="25" width="140" height="180" rx="4" className="fill-white dark:fill-emerald-950/90 stroke-emerald-500 stroke-[1px] opacity-80 dark:opacity-50" />
        <text x="92" y="18" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-500 text-[6.5px] font-mono font-bold">SERVER RACK A</text>
        {servers.map((srv, i) => {
          const barColorClass = srv.isHigh ? "fill-orange-500" : "fill-emerald-500";
          const strokeColorClass = srv.isHigh ? "stroke-orange-500" : "stroke-emerald-500";
          const textColorClass = srv.isHigh ? "fill-orange-600 dark:fill-orange-500" : "fill-emerald-600 dark:fill-emerald-500";
          return (
            <motion.g key={srv.id} {...(reduced ? {} : floatAnim(i * 0.4, 2))}>
              <rect x="30" y={35 + i * 42} width="124" height="34" rx="2" className={`fill-slate-50 dark:fill-emerald-950/80 ${strokeColorClass} stroke-[0.7px] opacity-80 dark:opacity-60`} />
              <motion.circle cx="40" cy={35 + i * 42 + 10} r="3" className={barColorClass} filter="url(#infraGlow)"
                {...(srv.isHigh && !reduced ? pulse(i * 0.5, 1) : {})} />
              <text x="48" y={35 + i * 42 + 13} className="fill-slate-500 dark:fill-slate-400 text-[7px] font-mono">{srv.id}</text>
              <rect x="30" y={35 + i * 42 + 20} width="124" height="5" rx="2" className="fill-emerald-500/10" />
              <motion.rect x="30" y={35 + i * 42 + 20} width={0} height="5" rx="2" className={`${barColorClass} opacity-80`}
                animate={reduced ? {} : { width: [0, (srv.load / 100) * 124] }}
                transition={{ duration: 1.5, delay: i * 0.2 + 0.5, ease: "easeOut" }} />
              <text x="147" y={35 + i * 42 + 26} className={`${textColorClass} text-[6px] font-mono`} textAnchor="end">{srv.load}%</text>
            </motion.g>
          );
        })}
        <motion.g {...(reduced ? {} : floatAnim(0.8, 4))}>
          <rect x="175" y="30" width="143" height="80" rx="5" className="fill-white dark:fill-emerald-950/85 stroke-cyan-500 stroke-[0.8px] opacity-90 dark:opacity-70" />
          <text x="246" y="44" textAnchor="middle" className="fill-cyan-600 dark:fill-cyan-500 text-[6.5px] font-mono font-bold">UPTIME MONITOR</text>
          <text x="246" y="80" textAnchor="middle" className="fill-emerald-500 dark:fill-emerald-400 text-[28px] font-mono font-black">99.99</text>
          <text x="246" y="100" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-500 text-[7px] font-mono">% AVAILABILITY</text>
          <motion.circle cx="246" cy="75" r="6" fill="none" className="stroke-emerald-400 stroke-[1px]"
            animate={reduced ? {} : { r: [6, 24], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />
        </motion.g>
        <motion.g {...(reduced ? {} : floatAnim(0.2, 3))}>
          <rect x="175" y="125" width="143" height="80" rx="5" className="fill-white dark:fill-emerald-950/85 stroke-emerald-500 stroke-[0.8px] opacity-90 dark:opacity-50" />
          <text x="246" y="139" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-500 text-[6px] font-mono font-bold">CLOUD REGIONS</text>
          {regions.map((r) => (
            <g key={r.label}>
              <motion.circle cx={r.x} cy={158} r="4" className="fill-cyan-500" filter="url(#infraGlow)"
                {...(reduced ? {} : pulse(r.x * 0.001, 1.8))} />
              <text x={r.x} y={172} textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-[5.5px] font-mono">{r.label}</text>
            </g>
          ))}
          <line x1="195" y1="158" x2="246" y2="158" className="stroke-cyan-500/30 stroke-[0.5px]" />
          <line x1="246" y1="158" x2="300" y2="158" className="stroke-cyan-500/30 stroke-[0.5px]" />
          <text x="185" y="198" className="fill-emerald-500 dark:fill-emerald-400 text-[6px] font-mono">245 Gbps throughput</text>
        </motion.g>
      </svg>
    </div>
  );
}

export function ServiceCardVisual({ slug }: { slug: string }) {
  if (slug === "project-management") return <ProjectManagementCardVisual />;
  if (slug === "test-management") return <TestManagementCardVisual />;
  if (slug === "infrastructure-management") return <InfrastructureCardVisual />;
  return <ITConsultingCardVisual />;
}
