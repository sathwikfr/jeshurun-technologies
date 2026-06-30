"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import { worldMapPath, WORLD_MAP_WIDTH, WORLD_MAP_HEIGHT } from "@/lib/worldMapPath";
import { useReducedMotion } from "framer-motion";

const COLORS = {
  mapDots: "#a5f3fc", // Light cyan for inland dots
  coast: "#22d3ee",   // Vibrant cyan for coastlines
  nodeGlow: "#22D3FF",
  hqCore: "#ffffff",
};

interface Dot {
  x: number;
  y: number;
  r: number;
  baseOpacity: number;
  twinkleOffset: number;
  isCoast: boolean;
  twinkleSpeed?: number;
  twinkleAmp?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
}

interface NodeData {
  id: string;
  name: string;
  x: number;
  y: number;
  isHQ?: boolean;
}

const NODES: NodeData[] = [
  { id: "hq", name: "DUBLIN", x: 417, y: 128, isHQ: true },
  { id: "lon", name: "LONDON", x: 430, y: 133 },
  { id: "ny", name: "NEW YORK", x: 265, y: 162 },
  { id: "dxb", name: "DUBAI", x: 560, y: 206 },
  { id: "hyd", name: "HYDERABAD", x: 617, y: 228 },
  { id: "sin", name: "SINGAPORE", x: 681, y: 273 },
];

const CYCLE_DURATION = 14;

const ROUTES = [
  // Delays spread out across 14 seconds for breathing idle network behaviour
  { target: "lon", cp: [425, 120], duration: 2.8, delay: 0.5 },
  { target: "ny", cp: [350, 90], duration: 4.2, delay: 3.2 }, 
  { target: "dxb", cp: [480, 150], duration: 4.5, delay: 6.8 }, 
  { target: "hyd", cp: [520, 160], duration: 4.8, delay: 9.1 },
  { target: "sin", cp: [560, 180], duration: 5.2, delay: 11.5 },
];

interface Props {
  isHeroButtonHovered?: boolean;
}

type ActivePacket = { id: string; routeIndex: number; duration: number; delayOffset: number };
type ActiveSpark = { id: string; routeIndex: number };

const NetworkOverlay = memo(({ 
  prefersReducedMotion, hoveredNode, activeRoutes, activePackets, hqSparks, destSparks, setHoveredNode 
}: { 
  prefersReducedMotion: boolean | null, hoveredNode: NodeData | null, activeRoutes: number[], activePackets: ActivePacket[], hqSparks: ActiveSpark[], destSparks: ActiveSpark[], setHoveredNode: (node: NodeData) => void 
}) => {
  return (
        <svg 
          width="100%" height="100%" 
          viewBox="0 0 860 560" 
          preserveAspectRatio="xMidYMid meet"
          style={{ filter: "drop-shadow(0 0 30px rgba(0,0,0,0.5))" }}
        >
          <defs>
            <filter id="glow-bloom" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-intense" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="10" result="blur2" />
              <feGaussianBlur stdDeviation="20" result="blur3" />
              <feMerge>
                <feMergeNode in="blur3" />
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* LAYER 1: Routes and Packets */}
          <g>
            {ROUTES.map((route, i) => {
              const targetNode = NODES.find(n => n.id === route.target)!;
              const hqNode = NODES.find(n => n.isHQ)!;
              
              const isHovered = hoveredNode && (hoveredNode.id === route.target || hoveredNode.isHQ);
              const isDimmed = hoveredNode && !isHovered;
              const isActive = activeRoutes.includes(i);
              
              const pathData = `M ${hqNode.x} ${hqNode.y} Q ${route.cp[0]} ${route.cp[1]} ${targetNode.x} ${targetNode.y}`;
              
              return (
                <g key={route.target} style={{ opacity: isDimmed ? 0.1 : 1, transition: 'opacity 0.3s ease-in-out' }}>
                  <path id={`route-${i}`} d={pathData} fill="none" stroke="transparent" strokeWidth="0" />
                  
                  {/* Outer Wide Glow */}
                  <path d={pathData} fill="none" stroke="#22D3FF" strokeWidth="8" opacity={isActive ? 0.15 : 0} filter="url(#glow-intense)" style={{ transition: 'opacity 0.3s ease-in-out' }} />
                  {/* Medium Core Bloom */}
                  <path d={pathData} fill="none" stroke="#22D3FF" strokeWidth="4" opacity={isActive ? 0.4 : 0.1} filter="url(#glow-intense)" style={{ transition: 'opacity 0.3s ease-in-out' }} />
                  {/* Sharp Bright Core */}
                  <path d={pathData} fill="none" stroke="#66F2FF" strokeWidth={isHovered ? "2" : "1"} opacity={isActive || isHovered ? 0.7 : 0.2} style={{ transition: 'opacity 0.3s ease-in-out' }} />
                  
                  {!isDimmed && !prefersReducedMotion && activePackets.filter(p => p.routeIndex === i).map(packet => (
                    <g key={packet.id} filter="url(#glow-intense)">
                      {/* Leading Solid Packet */}
                      <circle r="4.5" fill="#ffffff">
                        <animateMotion 
                          dur={`${packet.duration}s`} 
                          begin="0s" 
                          calcMode="spline" 
                          keyTimes="0; 1"
                          keySplines="0.42 0 0.58 1" 
                          fill="freeze"
                        >
                          <mpath href={`#route-${i}`} />
                        </animateMotion>
                      </circle>
                      {/* Fibre-Optic Trailing Wave */}
                      <path d="M -50,0 L 0,0" stroke="#22D3FF" strokeWidth="3.5" strokeLinecap="round" opacity="0.8">
                        <animateMotion 
                          dur={`${packet.duration}s`} 
                          begin="0s" 
                          calcMode="spline" 
                          keyTimes="0; 1"
                          keySplines="0.42 0 0.58 1" 
                          rotate="auto"
                          fill="freeze"
                        >
                          <mpath href={`#route-${i}`} />
                        </animateMotion>
                      </path>
                    </g>
                  ))}
                </g>
              );
            })}
          </g>
          {/* LAYER 2: Nodes and Arrival Sparks */}
          <g>
            {NODES.map((node, i) => {
              const isHQFocus = hoveredNode?.isHQ;
              const isHovered = hoveredNode?.id === node.id || isHQFocus;
              const isDimmed = hoveredNode && hoveredNode.id !== node.id && !isHQFocus;
              
              // Target sparks
              const targetSparks = destSparks.filter(s => ROUTES[s.routeIndex].target === node.id);
              const isDestinationIlluminated = targetSparks.length > 0;
              
              return (
                <g 
                  key={node.id} 
                  style={{ opacity: isDimmed ? 0.15 : 1, transition: 'all 0.3s ease-in-out', transformOrigin: `${node.x}px ${node.y}px` }}
                  onMouseEnter={() => setHoveredNode(node)}
                  className="outline-none cursor-pointer"
                  tabIndex={0}
                  role="button"
                >
                  {/* HQ Radar Rings & HQ Central Glow */}
                  {node.isHQ && (
                    <g style={{ animation: 'hqCoreBreathe 8s ease-in-out infinite' }}>
                      <circle cx={node.x} cy={node.y} r="15" fill="none" stroke="#22D3FF" strokeWidth="2" className="radar-ring" style={{ '--delay': '0s', '--duration': '7s', '--max-opacity': '0.7' } as React.CSSProperties} />
                      <circle cx={node.x} cy={node.y} r="25" fill="none" stroke="#22D3FF" strokeWidth="1" filter="url(#glow-bloom)" className="radar-ring" style={{ '--delay': '2s', '--duration': '8s', '--max-opacity': '0.4' } as React.CSSProperties} />
                      <circle cx={node.x} cy={node.y} r="40" fill="none" stroke="#22D3FF" strokeWidth="0.5" filter="blur(2px)" className="radar-ring" style={{ '--delay': '4s', '--duration': '9s', '--max-opacity': '0.2' } as React.CSSProperties} />
                      
                      {/* Massive Background Flare */}
                      <circle cx={node.x} cy={node.y} r="35" fill="#22D3FF" opacity="0.2" filter="url(#glow-intense)" />
                      {/* Inner HQ Flare */}
                      <circle cx={node.x} cy={node.y} r="18" fill="#22D3FF" opacity={hqSparks.length > 0 ? 0.9 : 0.6} filter="url(#glow-intense)" style={{ transition: 'opacity 0.2s ease-out' }} />
                      
                      {/* Dynamic HQ Charge Pulses Synced with Packets */}
                      {hqSparks.map((spark) => (
                        <circle key={spark.id} cx={node.x} cy={node.y} r="22" fill="#66F2FF" filter="url(#glow-intense)" opacity="0" style={{ transformOrigin: 'center', animation: `nodeCharge 0.35s ease-out forwards` }} />
                      ))}
                    </g>
                  )}

                  {/* Secondary Node Static Glows */}
                  {!node.isHQ && (
                    <circle cx={node.x} cy={node.y} r="8" fill="#22D3FF" opacity={isHovered || isDestinationIlluminated ? 0.8 : 0.15} filter="url(#glow-intense)" style={{ transition: 'opacity 0.2s ease-out' }} />
                  )}

                  {/* Magnetic Interaction Hitbox */}
                  <circle id={`node-magnetic-${node.id}`} cx={node.x} cy={node.y} r="15" fill="transparent" />

                  {/* Sharp White Core */}
                  <circle cx={node.x} cy={node.y} r={node.isHQ ? 4.5 : 2.5} fill="#ffffff" filter="url(#glow-intense)" />

                  {/* Arrival Sparks (Destination Branches) */}
                  {!node.isHQ && (
                    <g transform={`translate(${node.x}, ${node.y})`}>
                      {targetSparks.map((spark) => (
                        <path 
                          key={spark.id}
                          d="M0,-3 L0,-10 M3,0 L10,0 M0,3 L0,10 M-3,0 L-10,0 M2,2 L6,6 M-2,-2 L-6,-6 M2,-2 L6,-6 M-2,2 L-6,6" 
                          stroke="#66F2FF" strokeWidth="1.5" strokeLinecap="round" 
                          opacity="0"
                          style={{ transformOrigin: '0 0', animation: `sparkFlash 0.3s ease-out forwards` }}
                        />
                      ))}
                    </g>
                  )}


                </g>
              );
            })}
          </g>
        </svg>
  );
});

export function GlobalNetworkMap({ isHeroButtonHovered }: Props = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  type ActivePacket = { id: string; routeIndex: number; duration: number; delayOffset: number };
  type ActiveSpark = { id: string; routeIndex: number };

  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [activePackets, setActivePackets] = useState<ActivePacket[]>([]);
  const [activeRoutes, setActiveRoutes] = useState<number[]>([]);
  const [hqSparks, setHqSparks] = useState<ActiveSpark[]>([]);
  const [destSparks, setDestSparks] = useState<ActiveSpark[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const mouseRef = useRef({ x: -1, y: -1, svgX: -1, svgY: -1 });
  
  useEffect(() => {
    if (isHeroButtonHovered) {
      setHoveredNode(NODES[0]);
    } else {
      setHoveredNode(null);
    }
  }, [isHeroButtonHovered]);

  useEffect(() => {
    setIsLoaded(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Background Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const W = WORLD_MAP_WIDTH;
    const H = WORLD_MAP_HEIGHT;

    const osCanvas = document.createElement("canvas");
    osCanvas.width = W;
    osCanvas.height = H;
    const osCtx = osCanvas.getContext("2d", { willReadFrequently: true });
    if (!osCtx) return;

    const p2d = new Path2D(worldMapPath);
    osCtx.fillStyle = "#ffffff";
    osCtx.fill(p2d);
    
    const imgData = osCtx.getImageData(0, 0, W, H).data;
    
    const isFilled = (x: number, y: number) => {
      if (x < 0 || x >= W || y < 0 || y >= H) return false;
      return imgData[(y * W + x) * 4 + 3] > 128;
    };

    const dots: Dot[] = [];
    const step = 4; 

    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        if (isFilled(x, y)) {
          let isCoast = false;
          if (!isFilled(x - step, y) || !isFilled(x + step, y) || !isFilled(x, y - step) || !isFilled(x, y + step)) {
            isCoast = true;
          }

          dots.push({
            x: x + (Math.random() - 0.5),
            y: y + (Math.random() - 0.5),
            r: 1.2 + Math.random() * 1.0,
            baseOpacity: 0.08 + Math.random() * 0.02, // Inland dots 8-10% opacity
            twinkleOffset: Math.random() * Math.PI * 2,
            isCoast
          });
        }
      }
    }


    const twinklingDots: Dot[] = [];
    const staticMapCanvas = document.createElement("canvas");
    staticMapCanvas.width = W;
    staticMapCanvas.height = H;
    const staticCtx = staticMapCanvas.getContext("2d");
    if (!staticCtx) return;
    
    // 1. Draw Hierarchical Europe Illumination (Background)
    const hq = NODES.find(n => n.isHQ)!;
    const europeGradient = staticCtx.createRadialGradient(hq.x, hq.y, 0, hq.x, hq.y, 450);
    europeGradient.addColorStop(0, "rgba(34, 211, 255, 0.18)"); // Strongest glow (HQ)
    europeGradient.addColorStop(0.15, "rgba(34, 211, 255, 0.08)"); // Medium (Western Europe)
    europeGradient.addColorStop(0.4, "rgba(34, 211, 255, 0.02)"); // Very subtle (Eastern Europe)
    europeGradient.addColorStop(1, "rgba(34, 211, 255, 0)"); // Normal (Rest of world)
    staticCtx.fillStyle = europeGradient;
    staticCtx.beginPath();
    staticCtx.arc(hq.x, hq.y, 450, 0, Math.PI * 2);
    staticCtx.fill();

    // 2. Draw Map Dots
    for (const dot of dots) {
      staticCtx.beginPath();
      staticCtx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      staticCtx.fillStyle = dot.isCoast ? COLORS.coast : COLORS.mapDots;
      
      let opacity = dot.baseOpacity;
      if (dot.isCoast) {
        opacity = 0.30 + Math.random() * 0.05; // Coastlines 30-35% opacity
        staticCtx.shadowColor = 'rgba(34, 211, 255, 0.4)';
        staticCtx.shadowBlur = 3;
      } else {
        staticCtx.shadowBlur = 0;
      }
      staticCtx.globalAlpha = opacity;
      staticCtx.fill();

      if (Math.random() < 0.08) {
        twinklingDots.push({
           ...dot,
           twinkleSpeed: 0.15 + Math.random() * 0.15,
           twinkleAmp: 0.15 + Math.random() * 0.35,
        });
      }
    }
    staticCtx.globalAlpha = 1.0;
    staticCtx.shadowBlur = 0;

    const bgParticles: Particle[] = [];
    const particleCount = isMobile ? 40 : 100; // 80-120 particles (100 average)
    for(let i = 0; i < particleCount; i++) { 
      bgParticles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.005, vy: (Math.random() - 0.5) * 0.005, // Movement 2-5px over 30s
        r: 0.3 + Math.random() * 0.5, opacity: 0.02 + Math.random() * 0.02 // 2-4% opacity
      });
    }

    let animationFrameId: number;
    let startTime = performance.now();

    const draw = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "#ffffff";
      for (const p of bgParticles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        
        let magneticBoost = 0;
        if (mouseRef.current.svgX !== -1) {
           const dx = p.x - mouseRef.current.svgX;
           const dy = p.y - mouseRef.current.svgY;
           const dist = Math.sqrt(dx*dx + dy*dy);
           if (dist < 150) {
             magneticBoost = (150 - dist) / 150 * 0.08;
           }
        }
        
        const particleTwinkle = Math.sin(elapsed * 0.5 + p.x) * 0.01;
        ctx.globalAlpha = Math.max(0, p.opacity + particleTwinkle + magneticBoost);
        ctx.fillRect(p.x, p.y, p.r * 2, p.r * 2);
      }
      ctx.globalAlpha = 1.0;

      ctx.drawImage(staticMapCanvas, 0, 0);

      for (const dot of twinklingDots) {
        if (!prefersReducedMotion && dot.twinkleSpeed && dot.twinkleAmp) {
           const wave = Math.sin(elapsed * dot.twinkleSpeed + dot.twinkleOffset);
           if (wave > 0) {
             const twinkle = wave * dot.twinkleAmp;
             ctx.globalAlpha = Math.min(1, dot.baseOpacity + twinkle);
             ctx.fillStyle = dot.isCoast ? COLORS.coast : COLORS.mapDots;
             ctx.fillRect(dot.x, dot.y, dot.r, dot.r);
           }
        }
      }
      ctx.globalAlpha = 1.0;

      // Update SVG Magnetic Response
      if (mouseRef.current.svgX !== -1) {
         NODES.forEach(n => {
           const dx = n.x - mouseRef.current.svgX;
           const dy = n.y - mouseRef.current.svgY;
           const dist = Math.sqrt(dx*dx + dy*dy);
           const el = document.getElementById(`node-magnetic-${n.id}`);
           if (el) {
             if (dist < 150) {
               el.setAttribute("opacity", ((150 - dist) / 150 * 0.15).toString());
             } else {
               el.setAttribute("opacity", "0");
             }
           }
         });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsMapVisible(true);
        startTime = performance.now();
        animationFrameId = requestAnimationFrame(draw);
      } else {
        setIsMapVisible(false);
        cancelAnimationFrame(animationFrameId);
      }
    }, { threshold: 0.1 });

    if (canvas) observer.observe(canvas);
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [prefersReducedMotion, isMobile]);



  // Orchestrate independent route lifecycles
  useEffect(() => {
    if (prefersReducedMotion || !isMapVisible) return;
    
    let isSubscribed = true;
    const timeouts = new Map<number, NodeJS.Timeout>();

    ROUTES.forEach((route, i) => {
      const scheduleNext = () => {
        if (!isSubscribed) return;
        
        // Random wait between 2 to 5 seconds
        const waitTime = 2000 + Math.random() * 3000;
        
        const timeoutId = setTimeout(() => {
          if (!isSubscribed) return;
          
          // 1. HQ Pre-Launch Ripple
          setHqSparks(prev => [...prev, { id: `${i}-${Date.now()}`, routeIndex: i }]);
          
          const chargeId = setTimeout(() => {
            if (!isSubscribed) return;
            
            // 2. Launch Packet & Brighten Route
            const randomDuration = route.duration * (0.9 + Math.random() * 0.2); // +/- 10%
            const packetId = `${i}-${Date.now()}`;
            
            setActiveRoutes(prev => Array.from(new Set([...prev, i])));
            setActivePackets(prev => [...prev, { id: packetId, routeIndex: i, duration: randomDuration, delayOffset: 0 }]);
            
            // Remove HQ spark
            setHqSparks(prev => prev.filter(s => s.routeIndex !== i));
            
            const arriveId = setTimeout(() => {
              if (!isSubscribed) return;
              
              // 3. Arrival
              setActivePackets(prev => prev.filter(p => p.id !== packetId));
              setActiveRoutes(prev => prev.filter(r => r !== i));
              
              const destSparkId = `${i}-${Date.now()}`;
              setDestSparks(prev => [...prev, { id: destSparkId, routeIndex: i }]);
              
              const cleanupId = setTimeout(() => {
                if (!isSubscribed) return;
                setDestSparks(prev => prev.filter(s => s.id !== destSparkId));
              }, 300); // 300ms spark flash
              
              timeouts.set(i + 300, cleanupId);
              
              // 4. Schedule Next
              scheduleNext();
            }, randomDuration * 1000);
            timeouts.set(i + 200, arriveId);
          }, 350); // 350ms HQ charge delay
          timeouts.set(i + 100, chargeId);
        }, waitTime);
        
        timeouts.set(i, timeoutId);
      };
      
      // Initial staggered start
      const initialDelay = setTimeout(scheduleNext, i * 1500 + Math.random() * 1000);
      timeouts.set(i + 400, initialDelay);
    });

    return () => {
      isSubscribed = false;
      timeouts.forEach(clearTimeout);
    };
  }, [prefersReducedMotion, isMapVisible]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
    
    const svgRatio = WORLD_MAP_WIDTH / rect.width;
    mouseRef.current.svgX = (e.clientX - rect.left) * svgRatio;
    mouseRef.current.svgY = (e.clientY - rect.top) * svgRatio;
  };

  const handleMouseLeave = () => {
    mouseRef.current.x = -1;
    mouseRef.current.y = -1;
    mouseRef.current.svgX = -1;
    mouseRef.current.svgY = -1;
  };

  return (
    <div 
      className={`absolute right-[-5%] lg:right-[0%] top-1/2 -translate-y-[45%] w-[950px] h-[650px] lg:w-[1200px] lg:h-[750px] flex justify-center items-center transition-opacity duration-800 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 15%, black 40%, black 100%)",
        maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 15%, black 40%, black 100%)"
      }}
    >
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dublinPulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.15); opacity: 0.05; }
        }
        .dublin-halo {
           transform-origin: 417px 128px;
           animation: dublinPulse 6s ease-in-out infinite;
           will-change: transform, opacity;
        }
        @keyframes sparkFlash {
          0% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.9; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(1.3); }
        }
        @keyframes nodeCharge {
          0% { opacity: 0; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(1.3); }
        }
        @keyframes hqCoreBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes nodeBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .node-breathe {
           animation: nodeBreathe 5s ease-in-out infinite;
        }
        .node-paused {
           animation-play-state: paused !important;
        }
      `}} />

      {/* Flat Map Container */}
      <div className="relative w-full h-full flex justify-center items-center">
        
        {/* Lightning Flares */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-[0.85]"
          style={{
            background: 'radial-gradient(circle at 45% 45%, rgba(34,211,255,0.15) 0%, transparent 40%), radial-gradient(circle at 75% 30%, rgba(34,211,255,0.08) 0%, transparent 35%)'
          }}
        />

        {/* 1. Base Map Canvas */}
        <canvas 
          ref={canvasRef} 
          width={860} 
          height={560} 
          className="absolute w-full h-full object-contain pointer-events-none"
        />

        {/* 2. SVG Overlay for Routes and Nodes */}
        <NetworkOverlay 
          prefersReducedMotion={prefersReducedMotion}
          hoveredNode={hoveredNode}
          activeRoutes={activeRoutes}
          activePackets={activePackets}
          hqSparks={hqSparks}
          destSparks={destSparks}
          setHoveredNode={setHoveredNode}
        />
      </div>

      {/* Tooltip HTML Overlay */}
      <div 
        className={`absolute pointer-events-none transition-all duration-200 ease-in-out z-50 ${(hoveredNode && !isHeroButtonHovered && !isMobile) ? 'opacity-100 translate-y-[-8px]' : 'opacity-0 translate-y-0'}`}
        style={{
          top: "15%",
          right: "15%",
        }}
      >
         {hoveredNode && (
           <div 
             className="bg-[#0a1428]/70 backdrop-blur-[16px] border border-white/10 text-white p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex flex-col min-w-[200px]"
           >
             <div className="flex items-center justify-between mb-3">
               <span className="text-xs uppercase tracking-widest text-[#22D3FF] font-bold">
                 {hoveredNode.name}
               </span>
             </div>
             
             {hoveredNode.isHQ ? (
               <div className="space-y-1.5 mt-1 border-t border-white/10 pt-3">
                 <div className="text-[11px] font-medium text-slate-300 tracking-wide flex items-center gap-2">
                   <span className="w-1 h-1 rounded-full bg-[#22D3FF]" /> Global Headquarters
                 </div>
                 <div className="text-[11px] font-medium text-slate-300 tracking-wide flex items-center gap-2">
                   <span className="w-1 h-1 rounded-full bg-[#22D3FF]" /> 24/7 Operations
                 </div>
                 <div className="text-[11px] font-medium text-slate-300 tracking-wide flex items-center gap-2">
                   <span className="w-1 h-1 rounded-full bg-[#22D3FF]" /> Enterprise Delivery
                 </div>
                 <div className="text-[11px] font-medium text-slate-300 tracking-wide flex items-center gap-2">
                   <span className="w-1 h-1 rounded-full bg-[#22D3FF]" /> Cloud Excellence
                 </div>
               </div>
             ) : (
               <div className="space-y-1.5 mt-1 border-t border-white/10 pt-3">
                 <div className="text-[11px] font-medium text-slate-300 tracking-wide flex items-center gap-2">
                   <span className="w-1 h-1 rounded-full bg-[#22D3FF]" /> Enterprise Node
                 </div>
                 <div className="text-[11px] font-medium text-slate-300 tracking-wide flex items-center gap-2">
                   <span className="w-1 h-1 rounded-full bg-[#22D3FF]" /> Regional Delivery
                 </div>
               </div>
             )}
           </div>
         )}
      </div>
    </div>
  );
}
