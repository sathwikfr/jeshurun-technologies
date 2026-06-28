"use client";

import { useMemo } from "react";
import { worldMapPath, WORLD_MAP_WIDTH, WORLD_MAP_HEIGHT } from "@/lib/worldMapPath";
import { Briefcase, Layers, Globe, Headset } from "lucide-react";

export function WorldMap({ isAmbient = false }: { isAmbient?: boolean }) {
  // Generate a randomized tiling pattern to simulate LED brightness variation.
  // The tile is large enough (100x100) to hide repetition.
  const DOT_SPACING = 5;
  const TILE_SIZE = 100; 

  const patternDots = useMemo(() => {
    const dots = [];
    
    // Pseudo-random generator seeded by coordinates to prevent React hydration mismatch errors
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    for (let x = 0; x < TILE_SIZE; x += DOT_SPACING) {
      for (let y = 0; y < TILE_SIZE; y += DOT_SPACING) {
        const seed1 = x * 1000 + y;
        const seed2 = seed1 + 1337;
        const seed3 = seed1 + 4242;

        // Vary opacity to create structured noise (40%, 60%, 80%, 100%)
        const opacityOptions = [0.4, 0.6, 0.8, 1.0];
        const opacity = opacityOptions[Math.floor(pseudoRandom(seed1) * opacityOptions.length)];
        
        // Colors: Vivid cyan-blue
        const isBright = pseudoRandom(seed2) < 0.15;
        const color = isBright ? "#5EC8FF" : "#3FA9F5";
        
        // Dot diameter 1.5 - 2px -> Radius 0.75 - 1.0
        let r = 0.85;
        if (pseudoRandom(seed3) < 0.2) r = 1.0; // some slightly larger

        dots.push({ cx: x + DOT_SPACING/2, cy: y + DOT_SPACING/2, r, opacity, fill: color });
      }
    }
    return dots;
  }, []);

  return (
    <div 
      className={
        isAmbient
          ? "absolute inset-0 w-full h-full flex flex-col items-center justify-center z-0 overflow-hidden pointer-events-none opacity-[0.08] dark:opacity-[0.12] grayscale mix-blend-screen"
          : "absolute bottom-0 md:inset-y-0 right-0 w-full h-[400px] md:h-full md:w-[55%] flex flex-col items-center justify-end md:justify-center z-10 overflow-hidden pointer-events-none pb-10 md:pb-0"
      }
      style={isAmbient ? {} : {
        background: 'radial-gradient(ellipse at 40% 30%, #142848 0%, #0A1830 50%, #050810 100%)'
      }}
    >
      {/* Contained Light Bloom - Illuminating from the left edge of the map panel */}
      {!isAmbient && (
        <div 
          className="absolute pointer-events-none z-0"
          style={{
            top: '10%',
            left: '-30%',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse at 30% 40%, rgba(94, 200, 255, 0.4) 0%, rgba(63, 169, 245, 0.15) 30%, transparent 60%)',
            filter: 'blur(50px)'
          }}
        />
      )}
      {/* Width 75-80% of right hero section */}
      <div className={isAmbient ? "relative w-full aspect-[860/560] scale-[1.8] md:scale-150" : "relative w-[78%] aspect-[860/560]"}>
        <svg 
          viewBox={`0 0 ${WORLD_MAP_WIDTH} ${WORLD_MAP_HEIGHT}`} 
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          style={{ mixBlendMode: 'screen' }}
        >
          <defs>
            {/* 1. SVG Dot Mask (Halftone Pattern) */}
            <pattern 
              id="led-dot-pattern" 
              x="0" y="0" 
              width={TILE_SIZE} height={TILE_SIZE} 
              patternUnits="userSpaceOnUse"
            >
              {patternDots.map((dot, i) => (
                <circle 
                  key={i} 
                  cx={dot.cx} 
                  cy={dot.cy} 
                  r={dot.r} 
                  fill={dot.fill} 
                  opacity={dot.opacity} 
                />
              ))}
            </pattern>

            {/* 2. SVG Glow Filter (Photographic Bloom) */}
            <filter id="bloom-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComponentTransfer in="blur" result="glow">
                <feFuncA type="linear" slope="1.2" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Arc Glow Filter (Strong neon bloom) */}
            <filter id="arc-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* 3. SVG Radial Gradient for Map Opacity Mask (Falloff from light source) */}
            <radialGradient id="edge-fade-radial" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
            </radialGradient>

            {/* 4. SVG Opacity Mask */}
            <mask id="edge-fade-mask">
              <rect x="0" y="0" width={WORLD_MAP_WIDTH} height={WORLD_MAP_HEIGHT} fill="url(#edge-fade-radial)" />
            </mask>

            <radialGradient id="dublin-glow-1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#5EC8FF" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="dublin-glow-2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5EC8FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3FA9F5" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="dublin-glow-3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3FA9F5" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3FA9F5" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="dest-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#5EC8FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3FA9F5" stopOpacity="0" />
            </radialGradient>

            {/* Brighter arcs starting and ending strong (all routing rightward/eastward) */}
            <linearGradient id="arc-berlin" x1="405" y1="135" x2="450" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#6FD3FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="arc-capetown" x1="405" y1="135" x2="460" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#6FD3FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="arc-lagos" x1="405" y1="135" x2="440" y2="270" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#6FD3FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="arc-tokyo" x1="405" y1="135" x2="720" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#6FD3FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="arc-sydney" x1="405" y1="135" x2="750" y2="420" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#6FD3FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="arc-riyadh" x1="405" y1="135" x2="520" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#6FD3FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Render the Base SVG World Map with Halftone Pattern, Glow, and Edge Fade */}
          <g mask="url(#edge-fade-mask)">
            {/* The SVG path strictly preserves continent silhouettes while rendering as a dot matrix */}
            <path 
              d={worldMapPath} 
              fill="url(#led-dot-pattern)" 
              filter="url(#bloom-glow)"
            />
          </g>

          {/* ══════ NETWORK OVERLAYS ══════ */}
          <style>
            {`
              @keyframes pulseRing {
                0% { transform: scale(1); opacity: 0.8; }
                100% { transform: scale(3.5); opacity: 0; }
              }
              .radar-ring {
                transform-origin: 405px 135px;
                animation: pulseRing 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
              }
              .radar-ring-delayed {
                transform-origin: 405px 135px;
                animation: pulseRing 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 1s;
              }
              .radar-ring-delayed-2 {
                transform-origin: 405px 135px;
                animation: pulseRing 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 2s;
              }
              @keyframes drawArc {
                0% { opacity: 0.5; }
                50% { opacity: 1; }
                100% { opacity: 0.5; }
              }
              .animated-arc {
                animation: drawArc 3s ease-in-out infinite;
              }
              @keyframes pulseDot {
                0% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.4); }
                100% { opacity: 0.3; transform: scale(1); }
              }
              .destination-dot {
                animation: pulseDot 3s ease-in-out infinite;
              }
            `}
          </style>

          {/* Arcs Container (Strictly routed rightward) */}
          <g filter="url(#arc-glow)">
            <path d="M 405 135 Q 430 130 450 150" fill="none" stroke="url(#arc-berlin)" strokeWidth="2.5" className="animated-arc" style={{ animationDelay: '0s' }} />
            <path d="M 405 135 Q 440 250 460 380" fill="none" stroke="url(#arc-capetown)" strokeWidth="2.5" className="animated-arc" style={{ animationDelay: '0.6s' }} />
            <path d="M 405 135 Q 456 193 440 270" fill="none" stroke="url(#arc-lagos)" strokeWidth="2.5" className="animated-arc" style={{ animationDelay: '1.2s' }} />
            <path d="M 405 135 Q 573 78 720 180" fill="none" stroke="url(#arc-tokyo)" strokeWidth="2.5" className="animated-arc" style={{ animationDelay: '1.8s' }} />
            <path d="M 405 135 Q 648 191 750 420" fill="none" stroke="url(#arc-sydney)" strokeWidth="2.5" className="animated-arc" style={{ animationDelay: '2.4s' }} />
            <path d="M 405 135 Q 480 150 520 220" fill="none" stroke="url(#arc-riyadh)" strokeWidth="2.5" className="animated-arc" style={{ animationDelay: '3.0s' }} />
          </g>

          {/* Scattered Bright Sparkle Dots (Circuit Nodes) */}
          <g>
            {[
              {x: 150, y: 150}, {x: 180, y: 120}, {x: 200, y: 200}, {x: 250, y: 160},
              {x: 270, y: 300}, {x: 300, y: 380}, {x: 320, y: 280},
              {x: 450, y: 100}, {x: 480, y: 200}, {x: 420, y: 320}, {x: 500, y: 300}, {x: 480, y: 400},
              {x: 550, y: 150}, {x: 600, y: 200}, {x: 650, y: 120}, {x: 700, y: 160}, {x: 720, y: 250}, {x: 750, y: 200},
              {x: 780, y: 380}, {x: 720, y: 400}, {x: 800, y: 450}
            ].map((p, i) => (
              <g key={`sparkle-${i}`}>
                <circle cx={p.x} cy={p.y} r="10" fill="url(#dest-glow)" opacity="0.6" />
                <circle cx={p.x} cy={p.y} r={2 + (i % 3)} fill="#ffffff" opacity="0.9" />
              </g>
            ))}
          </g>

          {/* Jagged Lightning/Circuit Streaks */}
          <g filter="url(#arc-glow)">
            {[
              "M 150 150 L 160 130 L 180 135 L 200 120",
              "M 300 380 L 310 350 L 290 330 L 315 310",
              "M 450 100 L 470 110 L 480 90 L 500 105",
              "M 420 320 L 435 340 L 425 360 L 440 380",
              "M 600 200 L 620 180 L 640 190 L 660 170",
              "M 700 160 L 710 140 L 730 150 L 750 130",
              "M 780 380 L 760 400 L 770 420 L 750 440",
              "M 250 160 L 260 140 L 240 130",
              "M 650 120 L 670 110 L 680 130",
              "M 480 400 L 490 380 L 510 390",
              "M 200 200 L 210 180 L 230 190"
            ].map((d, i) => (
              <path key={`streak-${i}`} d={d} fill="none" stroke="rgba(200,230,255,0.7)" strokeWidth="1" strokeLinejoin="round" />
            ))}
          </g>

          {/* Destination Nodes */}
          <g>
            <circle cx="450" cy="150" r="15" fill="url(#dest-glow)" />
            <circle cx="450" cy="150" r="3" fill="#ffffff" className="destination-dot" style={{ transformOrigin: '450px 150px', animationDelay: '2s' }} />
            
            <circle cx="460" cy="380" r="15" fill="url(#dest-glow)" />
            <circle cx="460" cy="380" r="3" fill="#ffffff" className="destination-dot" style={{ transformOrigin: '460px 380px', animationDelay: '2.6s' }} />
            
            <circle cx="440" cy="270" r="15" fill="url(#dest-glow)" />
            <circle cx="440" cy="270" r="3" fill="#ffffff" className="destination-dot" style={{ transformOrigin: '440px 270px', animationDelay: '0.2s' }} />
            
            <circle cx="720" cy="180" r="15" fill="url(#dest-glow)" />
            <circle cx="720" cy="180" r="3" fill="#ffffff" className="destination-dot" style={{ transformOrigin: '720px 180px', animationDelay: '0.8s' }} />
            
            <circle cx="750" cy="420" r="15" fill="url(#dest-glow)" />
            <circle cx="750" cy="420" r="3" fill="#ffffff" className="destination-dot" style={{ transformOrigin: '750px 420px', animationDelay: '1.4s' }} />

            <circle cx="520" cy="220" r="15" fill="url(#dest-glow)" />
            <circle cx="520" cy="220" r="3" fill="#ffffff" className="destination-dot" style={{ transformOrigin: '520px 220px', animationDelay: '2.0s' }} />
          </g>

          {/* DUBLIN Anchor Node */}
          <g>
            {/* Multi-layer radiant glow */}
            <circle cx="405" cy="135" r="70" fill="url(#dublin-glow-3)" />
            <circle cx="405" cy="135" r="40" fill="url(#dublin-glow-2)" />
            <circle cx="405" cy="135" r="20" fill="url(#dublin-glow-1)" />
            
            {/* Radar rings */}
            <circle cx="405" cy="135" r="10" fill="none" stroke="#ffffff" strokeWidth="1.5" className="radar-ring" />
            <circle cx="405" cy="135" r="10" fill="none" stroke="#ffffff" strokeWidth="1.5" className="radar-ring-delayed" />
            
            {/* Core bright dot */}
            <circle cx="405" cy="135" r="5" fill="#ffffff" />
            
            {/* Label */}
            <text 
              x="405" y="105" 
              fill="#ffffff" 
              fontSize="12" 
              fontWeight="bold" 
              letterSpacing="2" 
              textAnchor="middle" 
            >
              DUBLIN
            </text>
          </g>
        </svg>
      </div>

      {/* ═══════ HERO STATS CARDS (Dark Glass Overlay) ═══════ */}
      {!isAmbient && (
        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-[11%] z-30 max-w-[calc(100%-48px)] md:max-w-none">
        <div className="flex flex-row overflow-x-auto md:grid md:grid-cols-4 gap-3 w-full scrollbar-hide pb-2 md:pb-0 snap-x">
          
          {/* Card 1 */}
          <div className="snap-start shrink-0 w-[140px] md:w-[150px] bg-[#0A1428]/50 backdrop-blur-md border border-white/10 rounded-[10px] p-3.5 flex flex-col justify-start text-left">
            <Briefcase className="w-4 h-4 md:w-[18px] md:h-[18px] text-white mb-2" />
            <div className="text-[20px] md:text-[22px] font-bold text-white leading-none mb-1">150+</div>
            <div className="text-[9px] md:text-[10px] font-semibold text-white/70 uppercase tracking-wider leading-[1.2]">Projects<br/>Delivered</div>
          </div>

          {/* Card 2 */}
          <div className="snap-start shrink-0 w-[140px] md:w-[150px] bg-[#0A1428]/50 backdrop-blur-md border border-white/10 rounded-[10px] p-3.5 flex flex-col justify-start text-left">
            <Layers className="w-4 h-4 md:w-[18px] md:h-[18px] text-white mb-2" />
            <div className="text-[20px] md:text-[22px] font-bold text-white leading-none mb-1">20+</div>
            <div className="text-[9px] md:text-[10px] font-semibold text-white/70 uppercase tracking-wider leading-[1.2]">Technology<br/>Domains</div>
          </div>

          {/* Card 3 */}
          <div className="snap-start shrink-0 w-[140px] md:w-[150px] bg-[#0A1428]/50 backdrop-blur-md border border-white/10 rounded-[10px] p-3.5 flex flex-col justify-start text-left">
            <Globe className="w-4 h-4 md:w-[18px] md:h-[18px] text-white mb-2" />
            <div className="text-[20px] md:text-[22px] font-bold text-white leading-none mb-1">6</div>
            <div className="text-[9px] md:text-[10px] font-semibold text-white/70 uppercase tracking-wider leading-[1.2]">Global Delivery<br/>Hubs</div>
          </div>

          {/* Card 4 */}
          <div className="snap-start shrink-0 w-[140px] md:w-[150px] bg-[#0A1428]/50 backdrop-blur-md border border-white/10 rounded-[10px] p-3.5 flex flex-col justify-start text-left">
            <Headset className="w-4 h-4 md:w-[18px] md:h-[18px] text-white mb-2" />
            <div className="text-[20px] md:text-[22px] font-bold text-white leading-none mb-1">24/7</div>
            <div className="text-[9px] md:text-[10px] font-semibold text-white/70 uppercase tracking-wider leading-[1.2]">Enterprise<br/>Support</div>
          </div>

        </div>
      </div>
      )}
    </div>
  );
}
