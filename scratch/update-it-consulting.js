const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/AnimatedServiceVisual.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const newComponent = `function ITConsultingVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  // Multi-layered floating animations
  const floatBase = (delay: number, amplitude: number = 10, duration: number = 6): any => ({
    y: shouldReduceMotion ? 0 : [\`-\${amplitude}px\`, \`\${amplitude}px\`, \`-\${amplitude}px\`],
    transition: { duration, repeat: Infinity, ease: "easeInOut", delay },
  });

  const rotateFloat = (delay: number): any => ({
    y: shouldReduceMotion ? 0 : ["-15px", "15px", "-15px"],
    rotateZ: shouldReduceMotion ? 0 : [-2, 2, -2],
    rotateX: shouldReduceMotion ? 0 : [5, -5, 5],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut", delay },
  });

  return (
    <div ref={ref} className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center perspective-[2500px] group overflow-visible">
      
      {/* ── AMBIENT ENVIRONMENT (Particles & Grids) ────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 dark:bg-cyan-500/20 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 dark:bg-purple-600/20 rounded-full blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* ── HYPER-ADVANCED ISOMETRIC SVG CORE ────────────────────────────── */}
      <motion.div
        className="relative z-10 scale-[0.65] md:scale-[0.85] transform-style-3d drop-shadow-[0_0_50px_rgba(37,99,235,0.4)]"
        initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0, rotateX: 0, ...floatBase(0, 15, 8) } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg width="600" height="600" viewBox="0 0 400 400" className="overflow-visible">
          <defs>
            {/* Ultra Gradients - Inner Core */}
            <linearGradient id="coreTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="coreLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="coreRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>

            {/* Ultra Gradients - Outer Magnetic Shell */}
            <linearGradient id="shellTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(191,219,254,0.7)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0.3)" />
            </linearGradient>
            <linearGradient id="shellLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(96,165,250,0.6)" />
              <stop offset="100%" stopColor="rgba(37,99,235,0.2)" />
            </linearGradient>
            <linearGradient id="shellRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.6)" />
              <stop offset="100%" stopColor="rgba(30,64,175,0.2)" />
            </linearGradient>

            {/* Bloom Filters */}
            <filter id="intenseBloom" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" result="blur1" />
              <feGaussianBlur stdDeviation="15" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <filter id="lightBloom" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* 1. Base Anti-Gravity Pedestal */}
          <g className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-8">
            <path d="M 200 320 L 320 260 L 200 200 L 80 260 Z" fill="rgba(30,58,138,0.4)" stroke="#60a5fa" strokeWidth="1" filter="url(#lightBloom)" />
            <path d="M 200 340 L 340 270 L 200 200 L 60 270 Z" fill="none" stroke="rgba(56,189,248,0.5)" strokeWidth="2" strokeDasharray="10 10" className="animate-[dash_4s_linear_infinite]" />
          </g>

          {/* 2. Quantum Data Streams (Rings) */}
          <g className="transition-all duration-[1200ms] opacity-0 group-hover:opacity-100 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transformOrigin: '200px 200px' }}>
            <ellipse cx="200" cy="200" rx="140" ry="60" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 12" style={{ transform: 'rotate(15deg)', transformOrigin: '200px 200px' }} filter="url(#intenseBloom)" />
            <ellipse cx="200" cy="200" rx="130" ry="50" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="20 40" style={{ transform: 'rotate(-25deg)', transformOrigin: '200px 200px' }} filter="url(#intenseBloom)" />
            <circle cx="60" cy="235" r="4" fill="#fff" filter="url(#intenseBloom)" />
            <circle cx="330" cy="165" r="3" fill="#38bdf8" filter="url(#intenseBloom)" />
          </g>

          {/* 3. The INNER CORE */}
          <g className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-125 origin-[200px_200px]">
            <motion.g animate={!shouldReduceMotion ? { y: [-6, 6, -6] } : {}} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              <path d="M 200 130 L 160 150 L 160 200 L 200 170 Z" fill="rgba(37,99,235,0.4)" />
              <path d="M 200 130 L 240 150 L 240 200 L 200 170 Z" fill="rgba(30,64,175,0.4)" />
              <path d="M 200 220 L 160 200 L 160 150 L 200 170 Z" fill="url(#coreLeft)" filter="url(#intenseBloom)" />
              <path d="M 200 220 L 240 200 L 240 150 L 200 170 Z" fill="url(#coreRight)" filter="url(#intenseBloom)" />
              <path d="M 200 170 L 240 150 L 200 130 L 160 150 Z" fill="url(#coreTop)" filter="url(#intenseBloom)" />
              <path d="M 160 175 L 180 185 L 180 205" stroke="#bfdbfe" strokeWidth="1.5" fill="none" opacity="0.8" />
              <path d="M 240 175 L 220 185 L 220 205" stroke="#bfdbfe" strokeWidth="1.5" fill="none" opacity="0.5" />
            </motion.g>
          </g>

          {/* 4. The EXPLOSIVE OUTER MAGNETIC SHELL */}
          <g className="transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-[40px] group-hover:translate-y-[20px] group-hover:opacity-40 origin-[200px_200px]">
            <path d="M 200 270 L 100 220 L 100 120 L 200 170 Z" fill="url(#shellLeft)" stroke="#3b82f6" strokeWidth="1.5" />
            <path d="M 100 170 L 150 195" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </g>
          
          <g className="transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[40px] group-hover:translate-y-[20px] group-hover:opacity-40 origin-[200px_200px]">
            <path d="M 200 270 L 300 220 L 300 120 L 200 170 Z" fill="url(#shellRight)" stroke="#2563eb" strokeWidth="1.5" />
            <path d="M 300 170 L 250 195" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </g>

          <g className="transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[60px] group-hover:opacity-40 origin-[200px_200px]">
            <path d="M 200 170 L 300 120 L 200 70 L 100 120 Z" fill="url(#shellTop)" stroke="#93c5fd" strokeWidth="2" />
            <path d="M 150 120 L 200 145 L 250 120" stroke="#bae6fd" strokeWidth="1.5" fill="none" opacity="0.6" />
            <circle cx="200" cy="145" r="3" fill="#fff" filter="url(#intenseBloom)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </g>

          <g className="transition-all duration-[1200ms] opacity-0 group-hover:opacity-100 ease-out">
            <rect x="198" y="0" width="4" height="200" fill="url(#coreLeft)" filter="url(#intenseBloom)" />
            <circle cx="200" cy="0" r="8" fill="#fff" filter="url(#intenseBloom)" />
          </g>
        </svg>
      </motion.div>

      {/* ── ZERO-GRAVITY GLASSMORPHIC UI CARDS (IT Consulting) ────────────── */}
      
      {/* 1. TOP RIGHT: Business Impact */}
      <motion.div
        className="absolute top-[10%] right-4 md:right-[15%] z-20 bg-white/90 dark:bg-[#030914]/80 backdrop-blur-xl border border-blue-200 dark:border-blue-500/30 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-48 md:w-56"
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, x: 50, rotateY: -20 }}
        animate={isInView ? { opacity: 1, x: 0, rotateY: 0, ...rotateFloat(0) } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3 mb-4 border-b border-slate-200 dark:border-white/10 pb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.15em] leading-tight">Business</p>
            <p className="text-sm text-slate-800 dark:text-white font-semibold">Impact</p>
          </div>
        </div>
        <div className="flex items-end gap-1.5 h-12">
          <motion.div className="flex-1 bg-blue-500 rounded-t-sm shadow-[0_0_10px_rgba(59,130,246,0.4)]" initial={{ height: "20%" }} animate={{ height: "60%" }} transition={{ duration: 1.5, delay: 1, type: "spring" }} />
          <motion.div className="flex-1 bg-blue-500 rounded-t-sm shadow-[0_0_10px_rgba(59,130,246,0.4)]" initial={{ height: "40%" }} animate={{ height: "40%" }} transition={{ duration: 1.5, delay: 1.2, type: "spring" }} />
          <motion.div className="flex-1 bg-blue-400 rounded-t-sm shadow-[0_0_10px_rgba(96,165,250,0.4)]" initial={{ height: "30%" }} animate={{ height: "80%" }} transition={{ duration: 1.5, delay: 1.4, type: "spring" }} />
          <motion.div className="flex-1 bg-cyan-400 rounded-t-sm shadow-[0_0_10px_rgba(34,211,255,0.4)]" initial={{ height: "50%" }} animate={{ height: "100%" }} transition={{ duration: 1.5, delay: 1.6, type: "spring" }} />
        </div>
      </motion.div>

      {/* 2. BOTTOM RIGHT: Architecture */}
      <motion.div
        className="absolute bottom-[10%] right-0 md:right-[5%] z-30 bg-white/90 dark:bg-[#030914]/80 backdrop-blur-xl border border-cyan-200 dark:border-cyan-500/30 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-48 md:w-52"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1, ...floatBase(1, 12, 7) } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-md opacity-40 rounded-full" />
            <div className="relative w-8 h-8 rounded-full bg-cyan-50 dark:bg-cyan-950 border border-cyan-400 flex items-center justify-center">
              <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
          <div>
            <p className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-widest">System</p>
            <p className="text-xs text-slate-800 dark:text-white font-semibold">Architecture</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-8 h-4 bg-blue-500/20 border border-blue-400/50 rounded-sm shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
          <div className="w-[1.5px] h-3 bg-blue-500/50" />
          <div className="w-20 h-[1.5px] bg-blue-500/50 flex justify-between">
            <div className="w-[1.5px] h-3 bg-blue-500/50 relative left-0 top-0" />
            <div className="w-[1.5px] h-3 bg-blue-500/50 relative right-0 top-0" />
          </div>
          <div className="flex gap-6">
             <div className="w-8 h-4 bg-cyan-500/20 border border-cyan-400/50 rounded-sm shadow-[0_0_8px_rgba(34,211,255,0.3)]" />
             <div className="w-8 h-4 bg-cyan-500/20 border border-cyan-400/50 rounded-sm shadow-[0_0_8px_rgba(34,211,255,0.3)]" />
          </div>
        </div>
      </motion.div>

      {/* 3. LEFT MIDDLE: Strategic Roadmap */}
      <motion.div
        className="absolute top-[40%] md:top-1/2 -translate-y-1/2 left-0 md:left-[5%] z-20 bg-white/90 dark:bg-[#030914]/80 backdrop-blur-xl border border-indigo-200 dark:border-indigo-500/30 rounded-2xl p-5 shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.6)] w-56 md:w-64"
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, x: -50, rotateY: 20 }}
        animate={isInView ? { opacity: 1, x: 0, rotateY: 0, ...rotateFloat(2.5) } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
      >
        <div className="flex justify-between items-start mb-4 border-b border-slate-200 dark:border-white/10 pb-3">
          <div>
            <h4 className="text-slate-800 dark:text-white text-sm font-bold flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Strategic Roadmap
            </h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-medium">Execution Phases</p>
          </div>
          <div className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] font-bold px-2 py-1 rounded-md border border-indigo-500/30">
            Active
          </div>
        </div>

        <div className="space-y-3.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 group/phase">
              <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full w-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" 
                  initial={{ width: "0%" }} 
                  animate={isInView ? { width: i === 1 ? "100%" : i === 2 ? "75%" : "40%" } : {}} 
                  transition={{ duration: 1.5, delay: 1 + (i * 0.2), ease: "easeOut" }} 
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
`;

const startIndex = content.indexOf("function ITConsultingVisual() {");
const endIdentifier = "/* ==========================================================================\n TEST MANAGEMENT VISUAL";
const endIndex = content.indexOf(endIdentifier);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newComponent + "\n\n" + content.substring(endIndex);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully replaced ITConsultingVisual.");
} else {
  console.log("Failed to find boundaries.", startIndex, endIndex);
}
