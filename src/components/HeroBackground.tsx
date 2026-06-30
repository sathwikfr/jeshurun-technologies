// src/components/HeroBackground.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(false);
  const isInView = useInView(canvasRef, { margin: "200px" });
  const isInViewRef = useRef(isInView);
  useEffect(() => { isInViewRef.current = isInView; }, [isInView]);

  // Monitor dark mode changes
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Canvas particle drift and starfield loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }

    interface Star {
      x: number;
      y: number;
      size: number;
      baseOpacity: number;
      twinkleSpeed: number;
      phase: number;
    }

    let particles: Particle[] = [];
    let stars: Star[] = [];

    // Helper to spawn a single particle with distribution bias (dense near globe, sparse elsewhere)
    const createParticle = (w: number, h: number): Particle => {
      const cx = w * 0.7;
      const cy = h * 0.45;
      
      let x = 0;
      let y = 0;
      
      // 75% concentrated near the globe stage, 25% sparse across the entire screen
      if (Math.random() < 0.75) {
        // Concentrated: radial distribution around (cx, cy)
        const angle = Math.random() * Math.PI * 2;
        // Use quadratic scale to cluster particles heavily near center
        const maxR = Math.min(w, h) * 0.65;
        const r = Math.pow(Math.random(), 2.2) * maxR;
        
        x = cx + Math.cos(angle) * r;
        y = cy + Math.sin(angle) * r;
      } else {
        // Sparse: uniform across the entire screen
        x = Math.random() * w;
        y = Math.random() * h;
      }

      const angle = Math.random() * Math.PI * 2;
      // Movement: very slow drift
      const speed = 0.01 + Math.random() * 0.03; // 0.01px - 0.04px

      const colors = ["#ffffff", "#93c5fd", "#60a5fa"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      // 3 levels of depth sizes: 1px, 1.5px, 2px
      const sizeRand = Math.random();
      let size = 1.0;
      if (sizeRand > 0.66) {
        size = 2.0;
      } else if (sizeRand > 0.33) {
        size = 1.5;
      }

      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        opacity: 0.04 + Math.random() * 0.14, // 0.04 - 0.18
        color,
      };
    };

    // Helper to spawn a star for dark mode
    const createStar = (w: number, h: number): Star => {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        size: 0.5 + Math.random() * 1.0,
        baseOpacity: 0.1 + Math.random() * 0.5,
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
      };
    };

    // Resize canvas
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;

      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      // Determine count based on screen size
      let particleCount = 1000;
      if (width < 768) {
        particleCount = 250;
      } else if (width < 1024) {
        particleCount = 600;
      }

      // Re-populate particles
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(width, height));
      }

      // Populate stars
      stars = [];
      const starCount = Math.floor(width * height * 0.0001); // 1 star per 10000px
      for (let i = 0; i < starCount; i++) {
        stars.push(createStar(width, height));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    let lastTime = 0;
    const fpsInterval = 1000 / 60; // Target 60 FPS

    // Animation loop
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);

      if (!isInViewRef.current) return;

      // Throttle framerate
      const elapsed = time - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = time - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, width, height);

      // 1. Draw stars (Always drawn since the right side is always dark)
      if (true) {
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.phase += s.twinkleSpeed;
          const currentOpacity = s.baseOpacity * (0.4 + 0.6 * Math.sin(s.phase));
          
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
          ctx.fill();
        }
      }

      // 2. Draw & Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap or respawn on bounds breach
        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          particles[i] = createParticle(width, height);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0; // Reset
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  // Dynamic background gradient based on theme - contrast boosted slightly
  const splitGradient = isDark ? `
    radial-gradient(ellipse 120% 120% at 20% 40%,
      #ffffff 0%,
      #ffffff 32%,
      #f1f5f9 49%,
      #38bdf8 62%,
      #030712 85%,
      #020617 100%
    )
  ` : `
    radial-gradient(ellipse 120% 120% at 20% 40%,
      #ffffff 0%,
      #ffffff 32%,
      #f8fafc 49%,
      #e0f2fe 62%,
      #f1f5f9 85%,
      #ffffff 100%
    )
  `;

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden select-none z-0 pointer-events-none transition-all duration-1000"
      style={{
        background: splitGradient,
      }}
    >
      {/* Layer 1.5 — Atmospheric Polish (Vignette, Depth, Bottom Transition) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        
        {/* Vignette - dimming extreme top-left and bottom-left to soften uniform brightness */}
        <div 
          className="absolute top-0 left-0 w-[35%] h-[35%]"
          style={{ background: `radial-gradient(circle at top left, ${isDark ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.03)"} 0%, transparent 70%)` }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[35%] h-[35%]"
          style={{ background: `radial-gradient(circle at bottom left, ${isDark ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.03)"} 0%, transparent 70%)` }}
        />

        {/* Faint Warm-to-Cool Depth Gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 100% 100% at 20% 40%, rgba(255, 248, 240, 0.08) 0%, rgba(59, 130, 246, 0.04) 45%, transparent 80%)"
          }}
        />

        {/* Bottom Edge Smoothing - settling into theme background */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[25%]"
          style={{
            background: `linear-gradient(to top, ${isDark ? "#020617" : "#ffffff"} 0%, transparent 100%)`
          }}
        />
      </div>

      {/* CSS Animations style block */}
      <style>{`
        @keyframes glowMotionScattering {
          0%, 100% { transform: translate(-50%, -50%) translate(0, 0); }
          50% { transform: translate(-50%, -50%) translate(-10px, -10px); }
        }
        .animate-glow-scattering { animation: glowMotionScattering 30s ease-in-out infinite; }
        
        @keyframes waveFlow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 200; }
        }
        .animate-wave { animation: waveFlow 45s linear infinite; }
      `}</style>

      {/* Layer 2 — Holographic Stage (Atmospheric Blend) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Soft Blue Light Scattering */}
        <div 
          className="absolute rounded-full pointer-events-none select-none animate-glow-scattering" 
          style={{
            top: "50%",
            left: "60%",
            width: "1600px",
            height: "1600px",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.015) 0%, rgba(59, 130, 246, 0.005) 50%, transparent 80%)",
            filter: "blur(200px)",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Ambient Transition Haze */}
        <div 
          className="absolute pointer-events-none select-none" 
          style={{
            top: 0,
            left: "40%",
            width: "30%",
            height: "100%",
            background: "linear-gradient(to right, transparent, rgba(59, 130, 246, 0.02) 50%, transparent)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Layer 3 — Enterprise Mesh Dust (Dotted Wave) */}
      <svg 
        className="absolute bottom-0 left-0 w-[140vw] h-[60vh] opacity-[0.03] pointer-events-none select-none" 
        viewBox="0 0 1440 600" 
        fill="none"
      >
        <path 
          className="animate-wave"
          d="M0,450 C300,500 600,300 900,400 C1200,500 1350,450 1440,350" 
          stroke={isDark ? "#60a5fa" : "#2563eb"} 
          strokeWidth="2.5" 
          strokeDasharray="6 12" 
        />
        <path 
          className="animate-wave"
          d="M0,400 C400,350 700,500 1000,420 C1300,340 1400,460 1440,400" 
          stroke={isDark ? "#93c5fd" : "#3b82f6"} 
          strokeWidth="1.8" 
          strokeDasharray="4 8" 
          style={{ animationDelay: "-10s" }}
        />
        <path 
          className="animate-wave"
          d="M0,350 C350,450 650,380 950,460 C1250,540 1380,380 1440,320" 
          stroke={isDark ? "#ffffff" : "#1d4ed8"} 
          strokeWidth="1.2" 
          strokeDasharray="3 6" 
          style={{ animationDelay: "-20s" }}
        />
      </svg>

      {/* Layer 4 — Particle Depth Field Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 1 }}
      />

      {/* Layer 5 — Light Rays (Diagonal Atmospheric Rays) */}
      {!isDark && (
        <div 
          className="absolute pointer-events-none select-none"
          style={{
            top: "-50%",
            left: "-20%",
            width: "140%",
            height: "140%",
            opacity: 0.02,
            filter: "blur(120px)",
            background: `repeating-linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.8) 0px,
              rgba(255, 255, 255, 0.8) 40px,
              transparent 40px,
              transparent 120px
            )`,
          }}
        />
      )}

      {/* Layer 6 — Film Grain Noise Texture */}
      <div 
        className="absolute inset-0 pointer-events-none select-none opacity-[0.012] mix-blend-overlay"
        style={{ zIndex: 10 }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.9" 
              numOctaves="2" 
              stitchTiles="stitch" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </div>
  );
}
