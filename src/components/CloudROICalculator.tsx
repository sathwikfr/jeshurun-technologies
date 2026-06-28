"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, DollarSign, Clock, AlertTriangle, ArrowRight,
  Users, Layers, Cloud, Wallet, Send, CheckCircle2
} from "lucide-react";

export function CloudROICalculator() {
  // Calculator Sliders State
  const [cloudSpend, setCloudSpend] = useState(15000); 
  const [devHours, setDevHours] = useState(120);       
  const [incidents, setIncidents] = useState(12);
  const [teamSize, setTeamSize] = useState(25);
  const [appCount, setAppCount] = useState(5);
  const [provider, setProvider] = useState("On-Premise");
  const [budget, setBudget] = useState(250000);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Live ROI Calculations
  const calculations = useMemo(() => {
    // A more complex mock calculation representing "Enterprise Assessment"
    const providerMultiplier = provider === "On-Premise" ? 1.4 : 1.1; // More savings from on-prem
    const scaleFactor = Math.log10(Math.max(10, teamSize * appCount)); 

    const monthlyCloudSavings = Math.round(cloudSpend * 0.35 * providerMultiplier);
    const devCostRate = 75; 
    const monthlyHoursSaved = Math.round(devHours * 0.8 * (scaleFactor / 2));
    const monthlyDevSavings = monthlyHoursSaved * devCostRate;
    
    const incidentCostRate = 5000 * (appCount / 5); // Cost per incident scales with apps
    const annualIncidentSavings = incidents * incidentCostRate;
    const monthlyIncidentSavings = Math.round(annualIncidentSavings / 12);

    const totalMonthlySavings = monthlyCloudSavings + monthlyDevSavings + monthlyIncidentSavings;
    const totalAnnualSavings = totalMonthlySavings * 12;

    const costReductionPct = Math.round((totalAnnualSavings / Math.max(1, budget)) * 100);

    return {
      cloud: monthlyCloudSavings,
      devHours: monthlyHoursSaved,
      devDollars: monthlyDevSavings,
      incidents: monthlyIncidentSavings,
      totalMonthly: totalMonthlySavings,
      totalAnnual: totalAnnualSavings,
      costReductionPct: Math.min(85, Math.max(15, costReductionPct)), // clamp
      deploymentSpeed: Math.min(90, Math.round(scaleFactor * 25))
    };
  }, [cloudSpend, devHours, incidents, teamSize, appCount, provider, budget]);

  // SVG Chart Data - Cumulative 6-Month Projection
  const months = ["M1", "M2", "M3", "M4", "M5", "M6"];
  const chartData = useMemo(() => {
    const data = [];
    const monthlyCurrent = cloudSpend + (devHours * 75) + Math.round((incidents * 5000) / 12);
    const monthlyProjected = monthlyCurrent - calculations.totalMonthly;
    
    for (let i = 1; i <= 6; i++) {
      data.push({
        month: months[i - 1],
        current: monthlyCurrent * i,
        projected: Math.max(0, monthlyProjected) * i,
      });
    }
    return data;
  }, [cloudSpend, devHours, incidents, calculations.totalMonthly]);

  // SVG Chart Dimensions
  const width = 500;
  const height = 200;
  const padding = 20;
  
  const maxVal = useMemo(() => {
    return Math.max(...chartData.map(d => d.current)) * 1.1;
  }, [chartData]);

  const getCoords = (index: number, val: number) => {
    const x = padding + (index * ((width - padding * 2) / 5));
    const y = height - padding - ((val / maxVal) * (height - padding * 2));
    return { x, y };
  };

  const currentPath = chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getCoords(i, d.current).x} ${getCoords(i, d.current).y}`).join(" ");
  const projectedPath = chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getCoords(i, d.projected).x} ${getCoords(i, d.projected).y}`).join(" ");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Real implementation would send data to API
  };

  return (
    <section className="w-full py-20 md:py-32 bg-background border-t border-border">
      <div className="container px-6 sm:px-8 mx-auto max-w-[1400px] space-y-12">
        
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-wider text-primary">
            <Calculator className="w-3.5 h-3.5" />
            ROI Telemetry
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Cloud Modernization ROI Calculator
          </h2>
          <p className="text-muted-foreground text-base font-medium">
            We can quantify your business value. Estimate your projected operational savings and efficiency gains by migrating to a modern, automated enterprise architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch pt-6">
          
          {/* Left: Input Dashboard */}
          <div className="xl:col-span-7 bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col shadow-sm">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Slider 1 */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    Monthly Cloud Spend
                  </label>
                  <span className="font-black text-foreground">${cloudSpend.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="1000" max="250000" step="1000"
                  value={cloudSpend} onChange={(e) => setCloudSpend(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Slider 2 */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Monthly Manual Ops (Hrs)
                  </label>
                  <span className="font-black text-foreground">{devHours} hrs</span>
                </div>
                <input 
                  type="range" min="10" max="1000" step="10"
                  value={devHours} onChange={(e) => setDevHours(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Slider 3 */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary" />
                    Annual System Outages
                  </label>
                  <span className="font-black text-foreground">{incidents}</span>
                </div>
                <input 
                  type="range" min="0" max="100" step="1"
                  value={incidents} onChange={(e) => setIncidents(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Slider 4 */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Engineering Team Size
                  </label>
                  <span className="font-black text-foreground">{teamSize}</span>
                </div>
                <input 
                  type="range" min="1" max="500" step="1"
                  value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Slider 5 */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    Number of Applications
                  </label>
                  <span className="font-black text-foreground">{appCount}</span>
                </div>
                <input 
                  type="range" min="1" max="100" step="1"
                  value={appCount} onChange={(e) => setAppCount(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Slider 6 */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-primary" />
                    Annual IT Budget
                  </label>
                  <span className="font-black text-foreground">${(budget / 1000).toFixed(0)}k</span>
                </div>
                <input 
                  type="range" min="50000" max="10000000" step="50000"
                  value={budget} onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Dropdown Provider */}
              <div className="space-y-4 md:col-span-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Cloud className="w-4 h-4 text-primary" />
                  Current Infrastructure Provider
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["On-Premise", "AWS", "Azure", "GCP"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setProvider(p)}
                      className={`py-2 px-4 rounded-md text-sm font-bold transition-colors border ${
                        provider === p 
                          ? "bg-primary text-primary-foreground border-primary" 
                          : "bg-background text-foreground hover:bg-muted border-border"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="pt-8 mt-auto border-t border-border">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">
                6-Month Cumulative Cost Trajectory
              </span>
              <div className="w-full overflow-x-auto relative">
                <svg width={width} height={height} className="overflow-visible select-none min-w-[500px]">
                  <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="currentColor" strokeOpacity="0.1" strokeWidth="2" />
                  <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="currentColor" strokeOpacity="0.1" strokeWidth="2" />
                  
                  {/* Paths */}
                  <motion.path 
                    d={currentPath} 
                    fill="none" 
                    stroke="#EF4444" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    opacity="0.6" 
                    initial={false}
                    animate={{ d: currentPath }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                  />
                  <motion.path 
                    d={projectedPath} 
                    fill="none" 
                    stroke="#2563EB" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    initial={false}
                    animate={{ d: projectedPath }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                  />

                  {/* Nodes & Labels */}
                  {chartData.map((d, idx) => {
                    const curPt = getCoords(idx, d.current);
                    const projPt = getCoords(idx, d.projected);
                    return (
                      <g key={idx}>
                        <motion.circle 
                          r="4" fill="currentColor" stroke="#EF4444" strokeWidth="2" className="text-card"
                          initial={false} animate={{ cx: curPt.x, cy: curPt.y }} transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                        />
                        <motion.circle 
                          r="5" fill="#2563EB"
                          initial={false} animate={{ cx: projPt.x, cy: projPt.y }} transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                        />
                        <text x={curPt.x} y={height - 5} textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor" className="opacity-50">
                          {d.month}
                        </text>
                      </g>
                    );
                  })}

                  <text x={padding + 15} y={padding + 5} fontSize="10" fontWeight="bold" fill="#EF4444" opacity="0.8">
                    Status Quo Cost
                  </text>
                  <text x={padding + 15} y={padding + 20} fontSize="10" fontWeight="bold" fill="#2563EB">
                    Modernized Enterprise (Jeshurun)
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Right: Savings Panel & Lead Form */}
          <div className="xl:col-span-5 flex flex-col gap-6">
            
            {/* Results Card */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col shadow-sm">
              <h3 className="text-xl font-extrabold text-foreground tracking-tight mb-6 pb-4 border-b border-border">
                Projected Enterprise Impact
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Cost Reduction</span>
                    <span className="text-2xl font-black text-foreground">{calculations.costReductionPct}%</span>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Availability</span>
                    <span className="text-2xl font-black text-foreground">99.99%</span>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Deploy Speed</span>
                    <span className="text-2xl font-black text-foreground">+{calculations.deploymentSpeed}%</span>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Hours Recovered</span>
                    <span className="text-2xl font-black text-foreground">{calculations.devHours}<span className="text-sm font-medium text-muted-foreground">/mo</span></span>
                  </div>
                </div>

                <div className="p-5 bg-primary/5 border border-primary/20 rounded-lg">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">Projected Annual Savings</span>
                  <span className="text-4xl md:text-5xl font-black text-primary">${calculations.totalAnnual.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Lead Gen Form */}
            <div className="bg-muted/30 border border-border rounded-xl p-6 md:p-8 shadow-sm mt-auto">
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-6"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">Request Received</h4>
                    <p className="text-sm font-medium text-muted-foreground">
                      Our enterprise architecture team will contact you shortly regarding your request.
                    </p>
                  </motion.div>
                ) : selectedAction ? (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <button 
                      onClick={() => setSelectedAction(null)}
                      className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4 transition-colors"
                    >
                      ← Back
                    </button>
                    <h4 className="text-lg font-bold text-foreground mb-2">{selectedAction}</h4>
                    <p className="text-sm font-medium text-muted-foreground mb-6">
                      Please provide your details below.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        required
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                      <input 
                        type="email" 
                        placeholder="Business Email" 
                        required
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                      <input 
                        type="text" 
                        placeholder="Company Name" 
                        required
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                      <button 
                        type="submit"
                        className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-bold text-sm rounded-md hover:bg-primary/90 transition-all duration-200"
                      >
                        Submit Request <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="actions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-bold text-foreground mb-2">Take Action</h4>
                    <p className="text-sm font-medium text-muted-foreground mb-6">
                      Ready to unlock these savings? Choose how you'd like to proceed.
                    </p>
                    <button 
                      onClick={() => setSelectedAction("Schedule Consultation")}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-bold text-sm rounded-md hover:bg-primary/90 transition-all duration-200"
                    >
                      Schedule Consultation <ArrowRight className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setSelectedAction("Request Detailed Assessment")}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border text-foreground font-bold text-sm rounded-md hover:bg-muted/50 transition-all duration-200"
                    >
                      Request Detailed Assessment
                    </button>
                    <button 
                      onClick={() => setSelectedAction("Email Me This Report")}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border text-foreground font-bold text-sm rounded-md hover:bg-muted/50 transition-all duration-200"
                    >
                      Email Me This Report
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
