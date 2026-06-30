"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { worldMapPath, WORLD_MAP_WIDTH, WORLD_MAP_HEIGHT } from "@/lib/worldMapPath";
import { Briefcase, Layers, Globe, Headset } from "lucide-react";
import { useInView } from "framer-motion";

export function WorldMap({ isAmbient = false, forceDark = false }: { isAmbient?: boolean, forceDark?: boolean }) {
  const [isDarkMode, setIsDarkMode] = useState(forceDark ? true : false);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  useEffect(() => {
    if (forceDark) {
      setIsDarkMode(true);
      return;
    }
    // Check initial state
    setIsDarkMode(document.documentElement.classList.contains("dark"));
    
    // Watch for class changes on the html element
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [forceDark]);

  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: false, margin: "200px" });

  useEffect(() => {
    if (svgRef.current) {
      if (isInView) {
        svgRef.current.unpauseAnimations();
      } else {
        svgRef.current.pauseAnimations();
      }
    }
  }, [isInView]);
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
        
        // Colors
        const isBright = pseudoRandom(seed2) < 0.15;
        const color = isDarkMode 
          ? (isBright ? "#5EC8FF" : "#3FA9F5") 
          : "#1E40AF"; // deeper blue in light mode
        
        // Dot diameter 1.5 - 2px -> Radius 0.75 - 1.0
        let r = 0.85;
        if (pseudoRandom(seed3) < 0.2) r = 1.0; // some slightly larger

        dots.push({ cx: x + DOT_SPACING/2, cy: y + DOT_SPACING/2, r, opacity, fill: color });
      }
    }
    return dots;
  }, [isDarkMode]);

  const cities = [
    { name: "LONDON", isHub: true, x: 430, y: 138, offsetX: -16, offsetY: 0, anchor: "end" as const, fontSize: 5.5, labelW: 34, dotR: 2, info: "European Hub" },
    { name: "DÜSSELDORF", isHub: true, x: 444, y: 139, offsetX: 10, offsetY: -8, anchor: "start" as const, fontSize: 5.5, labelW: 50, dotR: 2, info: "Partner Hub" },
    { name: "FRANKFURT", isHub: false, x: 448, y: 142, offsetX: 14, offsetY: 12, anchor: "start" as const, fontSize: 5.5, labelW: 46, dotR: 1.5, info: "FinTech Hub" },
    { name: "BOSTON", isHub: true, x: 275, y: 163, offsetX: -12, offsetY: -12, anchor: "end" as const, fontSize: 5.5, labelW: 36, dotR: 2, info: "North American HQ" },
    { name: "NEW YORK", isHub: true, x: 267, y: 167, offsetX: 12, offsetY: -12, anchor: "start" as const, fontSize: 5.5, labelW: 44, dotR: 2, info: "Financial Hub" },
    { name: "SAN FRANCISCO", isHub: false, x: 158, y: 175, offsetX: 12, offsetY: 4, anchor: "start" as const, fontSize: 5.5, labelW: 66, dotR: 1.5, info: "West Coast Hub" },
    { name: "DUBAI", isHub: false, x: 558, y: 210, offsetX: -10, offsetY: -12, anchor: "end" as const, fontSize: 5.5, labelW: 28, dotR: 1.5, info: "MEA Hub" },
    { name: "HYDERABAD", isHub: true, x: 615, y: 232, offsetX: -12, offsetY: 15, anchor: "end" as const, fontSize: 5.5, labelW: 48, dotR: 2, info: "APAC Engineering" },
    { name: "SINGAPORE", isHub: false, x: 678, y: 276, offsetX: 12, offsetY: 6, anchor: "start" as const, fontSize: 5.5, labelW: 48, dotR: 1.5, info: "APAC Hub" },
    { name: "TOKYO", isHub: true, x: 743, y: 181, offsetX: -12, offsetY: -10, anchor: "end" as const, fontSize: 5.5, labelW: 32, dotR: 2, info: "East Asia Operations" },
    { name: "PARIS", isHub: false, x: 435, y: 145, offsetX: -8, offsetY: 15, anchor: "end" as const, fontSize: 5.5, labelW: 28, dotR: 1.5, info: "Regional Office" },
    { name: "AMSTERDAM", isHub: false, x: 440, y: 136, offsetX: 4, offsetY: -18, anchor: "start" as const, fontSize: 5.5, labelW: 50, dotR: 1.5, info: "Data Center" },
    { name: "SÃO PAULO", isHub: false, x: 322, y: 345, offsetX: 12, offsetY: 6, anchor: "start" as const, fontSize: 5.5, labelW: 50, dotR: 1.5, info: "South American Hub" },
    { name: "JOHANNESBURG", isHub: false, x: 495, y: 353, offsetX: 12, offsetY: 6, anchor: "start" as const, fontSize: 5.5, labelW: 68, dotR: 1.5, info: "African Hub" },
    { name: "SYDNEY", isHub: false, x: 771, y: 374, offsetX: 12, offsetY: 6, anchor: "start" as const, fontSize: 5.5, labelW: 40, dotR: 1.5, info: "Oceania Hub" },
    { name: "TORONTO", isHub: false, x: 258, y: 159, offsetX: -10, offsetY: -10, anchor: "end" as const, fontSize: 5.5, labelW: 44, dotR: 1.5, info: "Canadian Office" }
  ];

  const getArcControlPoint = (startX: number, startY: number, endX: number, endY: number) => {
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const dx = endX - startX;
    const dy = endY - startY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return { x: midX, y: midY };
    const nx = -dy / dist;
    const ny = dx / dist;
    const bow = dist * 0.2;
    if (ny > 0) {
      return { x: midX - nx * bow, y: midY - ny * bow };
    }
    return { x: midX + nx * bow, y: midY + ny * bow };
  };

  return (
    <div 
      className={
        isAmbient
          ? "absolute inset-0 w-full h-full flex flex-col items-center justify-center z-0 overflow-hidden pointer-events-none opacity-[0.08] dark:opacity-[0.12] grayscale mix-blend-screen"
          : "absolute inset-0 w-full h-full flex flex-col items-center justify-end md:justify-center z-10 overflow-hidden pointer-events-none pb-10 md:pb-0"
      }
      style={isAmbient ? {} : {
        background: 'radial-gradient(ellipse at 40% 30%, #142848 0%, #0A1830 50%, #050810 100%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
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
      {/* Size and position the map to anchor to the right and spill over to the left behind text */}
      <div className={isAmbient ? "absolute inset-0 w-full h-full scale-[1.8] md:scale-150" : "absolute right-[-20%] md:right-[-5%] lg:right-[0%] top-[55%] md:top-[60%] lg:top-[55%] -translate-y-1/2 w-[140%] md:w-[75%] lg:w-[60%] xl:w-[65%] aspect-[860/560]"}>
        <svg 
          ref={svgRef}
          viewBox={`0 0 ${WORLD_MAP_WIDTH} ${WORLD_MAP_HEIGHT}`} 
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          style={{ mixBlendMode: 'screen', '--animation-state': isInView ? 'running' : 'paused' } as React.CSSProperties}
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
              <stop offset="0%" stopColor={isDarkMode ? "#ffffff" : "#1E5FFF"} stopOpacity="0.9" />
              <stop offset="100%" stopColor={isDarkMode ? "#5EC8FF" : "rgba(30,95,255,0.6)"} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="dublin-glow-2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={isDarkMode ? "#5EC8FF" : "#1E5FFF"} stopOpacity="0.6" />
              <stop offset="100%" stopColor={isDarkMode ? "#3FA9F5" : "rgba(30,95,255,0.6)"} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="dublin-glow-3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={isDarkMode ? "#3FA9F5" : "#1E5FFF"} stopOpacity="0.4" />
              <stop offset="100%" stopColor={isDarkMode ? "#3FA9F5" : "rgba(30,95,255,0.6)"} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="dest-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={isDarkMode ? "#ffffff" : "#1E5FFF"} stopOpacity="0.8" />
              <stop offset="50%" stopColor={isDarkMode ? "#5EC8FF" : "rgba(30,95,255,0.8)"} stopOpacity="0.6" />
              <stop offset="100%" stopColor={isDarkMode ? "#3FA9F5" : "rgba(30,95,255,0.6)"} stopOpacity="0" />
            </radialGradient>

            {/* Dynamic Arcs for the 13 cities */}
            {cities.map((city, i) => (
              <linearGradient key={`arc-grad-${i}`} id={`arc-grad-${i}`} x1="417" y1="133" x2={city.x} y2={city.y} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor={isDarkMode ? "#6FD3FF" : "#1E5FFF"} stopOpacity={isDarkMode ? "0.4" : "0.7"} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
              </linearGradient>
            ))}
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
                transform-origin: 417px 133px;
                animation: pulseRing 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
              }
              .radar-ring-delayed {
                transform-origin: 417px 133px;
                animation: pulseRing 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 1s;
              }
              .radar-ring-delayed-2 {
                transform-origin: 417px 133px;
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
              @keyframes pulsePartnerRing {
                0% { transform: scale(1); opacity: 0.6; }
                100% { transform: scale(2.5); opacity: 0; }
              }
              .partner-radar-ring {
                animation: pulsePartnerRing 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
              }
              .radar-ring, .radar-ring-delayed, .radar-ring-delayed-2, .animated-arc, .destination-dot, .partner-radar-ring {
                animation-play-state: var(--animation-state, running);
              }
            `}
          </style>

          {/* Dynamic Arcs */}
          <g filter="url(#arc-glow)">
            {cities.map((city, i) => {
              const cp = getArcControlPoint(417, 133, city.x, city.y);
              const isHub = city.isHub;
              return (
                <path 
                  key={`arc-path-${i}`}
                  d={`M 417 133 Q ${cp.x} ${cp.y} ${city.x} ${city.y}`} 
                  fill="none" 
                  stroke={`url(#arc-grad-${i})`} 
                  strokeWidth="2" 
                  className={isHub ? "animated-arc" : ""} 
                  style={{ 
                    animationDelay: isHub ? `${i * 0.7}s` : '0s',
                    opacity: isHub ? 1 : 0.4
                  }} 
                />
              );
            })}
          </g>

          {/* Dynamic Destination Nodes & Labels */}
          <g>
            {cities.map((city, i) => (
              <g key={`city-node-${i}`}>
                {/* Invisible larger hit area for easier hovering */}
                <circle cx={city.x} cy={city.y} r="16" fill="transparent" />
                {/* Glow */}
                <circle cx={city.x} cy={city.y} r="14" fill="url(#dest-glow)" opacity={city.isHub ? "0.9" : "0"} />
                {/* Core dot */}
                <circle 
                  cx={city.x} cy={city.y} r={city.dotR} 
                  fill={isDarkMode ? "#ffffff" : "#1E5FFF"} 
                  className={city.isHub ? "destination-dot" : ""} 
                  style={{ transformOrigin: `${city.x}px ${city.y}px`, animationDelay: `${i * 0.3}s` }} 
                />
                {/* Partner Hub Radar Ring */}
                {city.isHub && (
                  <circle 
                    cx={city.x} cy={city.y} r="6" 
                    fill="none" 
                    stroke={isDarkMode ? "#5EC8FF" : "#1E5FFF"} 
                    strokeWidth="1.5" 
                    className="partner-radar-ring"
                    style={{ transformOrigin: `${city.x}px ${city.y}px`, animationDelay: `${i * 0.4}s` }}
                  />
                )}
                {/* Connecting Line */}
                <line 
                  x1={city.x} y1={city.y} 
                  x2={
                    city.anchor === 'start' ? city.x + city.offsetX - 2 : city.x + city.offsetX + 2
                  } 
                  y2={city.y + city.offsetY - 2} 
                  stroke={isDarkMode ? "rgba(94, 200, 255, 0.3)" : "rgba(30, 95, 255, 0.3)"} 
                  strokeWidth="0.5" 
                />
                
                {/* Futuristic Holographic Pill Background */}
                <rect 
                  x={
                    city.anchor === 'start' ? city.x + city.offsetX - 3 : city.x + city.offsetX - city.labelW + 3
                  }
                  y={city.y + city.offsetY - 6.5}
                  width={city.labelW}
                  height="9"
                  rx="2.5"
                  fill={isDarkMode ? "rgba(11, 18, 32, 0.85)" : "rgba(255, 255, 255, 0.95)"}
                  stroke={isDarkMode ? "rgba(94, 200, 255, 0.5)" : "rgba(30, 95, 255, 0.4)"}
                  strokeWidth="0.5"
                />

                {/* Label */}
                <text 
                  x={city.x + city.offsetX} 
                  y={city.y + city.offsetY} 
                  fill={isDarkMode ? "#ffffff" : "#0F172A"} 
                  fontSize={city.fontSize} 
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight="800" 
                  letterSpacing="0.8" 
                  textAnchor={city.anchor}
                  style={{ textShadow: isDarkMode ? '0px 1px 3px rgba(0,0,0,0.5)' : 'none' }}
                >
                  {city.name}
                </text>
              </g>
            ))}
          </g>

          {/* Partner Hub Data Signals */}
          <g>
            {cities.map((city, i) => {
              if (!city.isHub) return null;
              const cp = getArcControlPoint(417, 133, city.x, city.y);
              const pathData = `M 417 133 Q ${cp.x} ${cp.y} ${city.x} ${city.y}`;
              
              return (
                <g key={`signal-${i}`}>
                  {[0, 1, 2, 3].map((trail) => {
                    const delay = (i * 0.45) + (trail * 0.08); // Stagger start time based on city index
                    return (
                      <circle 
                        key={trail}
                        r={trail === 0 ? 2 : 1.5 - trail * 0.3} 
                        fill={isDarkMode ? "#ffffff" : "#5EC8FF"} 
                        filter={trail === 0 ? "url(#arc-glow)" : ""}
                        opacity="0"
                      >
                        <animateMotion
                          path={pathData}
                          dur="3.2s"
                          begin={`${delay}s`}
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values={`0; ${1 - trail * 0.25}; ${0.8 - trail * 0.2}; 0`}
                          keyTimes="0; 0.1; 0.8; 1"
                          dur="3.2s"
                          begin={`${delay}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    );
                  })}
                </g>
              );
            })}
          </g>

          {/* DUBLIN Anchor Node */}
          <g
            className="pointer-events-auto cursor-pointer"
            onMouseEnter={() => setHoveredCity("DUBLIN")}
            onMouseLeave={() => setHoveredCity(null)}
          >
            {/* Invisible hit area */}
            <circle cx="417" cy="133" r="25" fill="transparent" />
            
            {/* Multi-layer radiant glow */}
            <circle cx="417" cy="133" r="85" fill="url(#dublin-glow-3)" />
            <circle cx="417" cy="133" r="50" fill="url(#dublin-glow-2)" />
            <circle cx="417" cy="133" r="25" fill="url(#dublin-glow-1)" />
            
            {/* Radar rings */}
            <circle cx="417" cy="133" r="10" fill="none" stroke={isDarkMode ? "#ffffff" : "#1E5FFF"} strokeWidth="1.5" className="radar-ring" />
            <circle cx="417" cy="133" r="10" fill="none" stroke={isDarkMode ? "#ffffff" : "#1E5FFF"} strokeWidth="1.5" className="radar-ring-delayed" />
            
            {/* Core bright dot */}
            <circle cx="417" cy="133" r="5" fill={isDarkMode ? "#ffffff" : "#1E5FFF"} />
            
            {/* Line connecting to pill */}
            <line x1="417" y1="133" x2="427" y2="101" stroke={isDarkMode ? "rgba(94, 200, 255, 0.6)" : "rgba(30, 95, 255, 0.6)"} strokeWidth="0.5" />

            {/* Dublin Pill Background (Holographic Blue) */}
            <rect 
              x="422" 
              y="95.5" 
              width="65" 
              height="11" 
              rx="2.5" 
              fill={isDarkMode ? "rgba(11, 18, 32, 0.85)" : "rgba(255, 255, 255, 0.95)"} 
              stroke={isDarkMode ? "rgba(94, 200, 255, 0.8)" : "rgba(30, 95, 255, 0.8)"}
              strokeWidth="0.5"
            />
            
            {/* Inner Pill Dot */}
            <circle cx="427" cy="101" r="1.5" fill={isDarkMode ? "#ffffff" : "#1E5FFF"} />

            {/* Label */}
            <text 
              x="454.5" y="103.5" 
              fill={isDarkMode ? "#ffffff" : "#1E5FFF"} 
              fontSize="5.5" 
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight="800" 
              letterSpacing="0.8" 
              textAnchor="middle" 
              style={{ textShadow: isDarkMode ? '0px 1px 3px rgba(0,0,0,0.8)' : 'none' }}
            >
              DUBLIN (HQ)
            </text>
          </g>

          {/* Hover Tooltip Overlay for HQ */}
          {hoveredCity === 'DUBLIN' && (
            (() => {
              const target = { name: 'DUBLIN', x: 417, y: 133, info: 'Global Headquarters' } as any;
              
              return (
                <g pointerEvents="none">
                  {/* Tooltip Background */}
                  <rect 
                    x={target.x + 10} 
                    y={target.y - 35} 
                    width="110" 
                    height="32" 
                    rx="4" 
                    fill={isDarkMode ? "rgba(11, 18, 32, 0.9)" : "rgba(255, 255, 255, 0.95)"} 
                    stroke={isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}
                  />
                  {/* City Name */}
                  <text 
                    x={target.x + 18} 
                    y={target.y - 21} 
                    fill={isDarkMode ? "#5EC8FF" : "#1E5FFF"} 
                    fontSize="9" 
                    fontFamily="Inter, system-ui, sans-serif"
                    fontWeight="bold"
                    letterSpacing="0.5"
                  >
                    {target.name}
                  </text>
                  {/* Info text */}
                  <text 
                    x={target.x + 18} 
                    y={target.y - 10} 
                    fill={isDarkMode ? "#E2E8F0" : "#334155"} 
                    fontSize="7.5" 
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {target.info}
                  </text>
                </g>
              );
            })()
          )}
        </svg>
      </div>


    </div>
  );
}
