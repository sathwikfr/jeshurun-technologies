const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/AnimatedServiceVisual.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const newComponent = `function ProjectManagementVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  const floatBase = (delay: number, amplitude: number = 8, duration: number = 5): any => ({
    y: shouldReduceMotion ? 0 : [\`-\${amplitude}px\`, \`\${amplitude}px\`, \`-\${amplitude}px\`],
    transition: { duration, repeat: Infinity, ease: "easeInOut", delay },
  });

  const leftPrinciples = [
    { id: "01", text: "Well-defined Goals and Objectives", color: "from-teal-400 to-teal-500", numBg: "bg-amber-400" },
    { id: "02", text: "Project Organizational Structure", color: "from-purple-500 to-purple-600", numBg: "bg-orange-500" },
    { id: "03", text: "Risk Management", color: "from-pink-500 to-pink-600", numBg: "bg-rose-500" },
    { id: "04", text: "Establish the Project Deliverables", color: "from-emerald-500 to-emerald-600", numBg: "bg-purple-600" },
    { id: "05", text: "Build a Communication Plan", color: "from-red-500 to-red-600", numBg: "bg-cyan-500" }
  ];

  const rightPrinciples = [
    { id: "06", text: "Define Various Performance Baselines", color: "from-blue-400 to-blue-500", numBg: "bg-teal-500" },
    { id: "07", text: "Define the Priorities of Shareholders", color: "from-orange-500 to-orange-600", numBg: "bg-indigo-500" },
    { id: "08", text: "Ensure Transparency", color: "from-fuchsia-500 to-fuchsia-600", numBg: "bg-pink-600" },
    { id: "09", text: "Careful Budgeting and Scheduling", color: "from-indigo-500 to-indigo-600", numBg: "bg-orange-600" },
    { id: "10", text: "Establish Accountability & Responsibility", color: "from-cyan-400 to-cyan-500", numBg: "bg-amber-400" }
  ];

  return (
    <div ref={ref} className="relative w-full h-full min-h-[500px] md:min-h-[600px] flex items-center justify-center group overflow-hidden perspective-[2000px]">
      
      {/* ── BACKGROUND AMBIENCE ── */}
      <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 opacity-30 group-hover:opacity-70">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-200/50 dark:bg-blue-500/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex items-center justify-center">
        
        {/* ── CENTRAL HUB (10 Principles) ── */}
        <motion.div 
          className="absolute z-30"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1, ...floatBase(0) } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Rotating Data Rings */}
          <motion.div 
            className="absolute inset-[-40px] border-[1.5px] border-dashed border-slate-300 dark:border-slate-700 rounded-full opacity-50 group-hover:opacity-100 group-hover:border-blue-400 transition-colors duration-700"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-[-60px] border border-slate-200 dark:border-slate-800 rounded-full opacity-30 group-hover:opacity-80 group-hover:border-cyan-400 transition-colors duration-700"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-white dark:bg-[#050d1f] border-4 border-slate-50 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center relative group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-black/5 dark:to-white/5 pointer-events-none" />
            
            {/* Inner Glow */}
            <div className="absolute inset-2 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_30px_rgba(255,255,255,0.02)] pointer-events-none" />

            <span className="text-5xl md:text-6xl font-black text-slate-800 dark:text-white drop-shadow-sm">10</span>
            <span className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mt-1">Principles</span>
          </div>
        </motion.div>

        {/* ── LEFT RIBBONS ── */}
        <div className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4 z-20 w-[160px] sm:w-[220px] md:w-[280px]">
          {leftPrinciples.map((p, i) => (
            <motion.div
              key={p.id}
              className="group/ribbon flex items-stretch h-10 md:h-12 shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform cursor-default origin-left group-hover:-translate-x-4 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Number Block */}
              <div className={\`w-10 md:w-12 flex items-center justify-center font-bold text-white text-sm md:text-base \${p.numBg} rounded-l-md md:rounded-l-lg z-10 shadow-[2px_0_10px_rgba(0,0,0,0.1)]\`} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 15% 50%)" }}>
                {p.id}
              </div>
              {/* Text Ribbon */}
              <div className={\`flex-1 px-2 md:px-4 flex items-center bg-gradient-to-r \${p.color} rounded-r-full relative overflow-hidden\`}>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] -translate-x-full group-hover/ribbon:animate-[shimmer_1.5s_infinite]" />
                <span className="text-white text-[9px] md:text-xs font-semibold leading-tight md:leading-snug drop-shadow-md z-10">{p.text}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── RIGHT RIBBONS ── */}
        <div className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4 z-20 w-[160px] sm:w-[220px] md:w-[280px]">
          {rightPrinciples.map((p, i) => (
            <motion.div
              key={p.id}
              className="group/ribbon flex items-stretch h-10 md:h-12 shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform cursor-default origin-right group-hover:translate-x-4 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.3 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Text Ribbon */}
              <div className={\`flex-1 px-2 md:px-4 flex items-center justify-end text-right bg-gradient-to-l \${p.color} rounded-l-full relative overflow-hidden\`}>
                <div className="absolute inset-0 bg-[linear-gradient(-90deg,transparent,rgba(255,255,255,0.2),transparent)] translate-x-full group-hover/ribbon:animate-[shimmer_1.5s_infinite]" />
                <span className="text-white text-[9px] md:text-xs font-semibold leading-tight md:leading-snug drop-shadow-md z-10">{p.text}</span>
              </div>
              {/* Number Block */}
              <div className={\`w-10 md:w-12 flex items-center justify-center font-bold text-white text-sm md:text-base \${p.numBg} rounded-r-md md:rounded-r-lg z-10 shadow-[-2px_0_10px_rgba(0,0,0,0.1)]\`} style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}>
                {p.id}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}`;

const startIndex = content.indexOf("function ProjectManagementVisual() {");

if (startIndex !== -1) {
  // We don't have a clean end marker for the file. 
  // Let's just substring to the end of the file, since ProjectManagementVisual is the last function!
  content = content.substring(0, startIndex) + newComponent + "\n";
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully replaced ProjectManagementVisual.");
} else {
  console.log("Failed to find boundaries.");
}
