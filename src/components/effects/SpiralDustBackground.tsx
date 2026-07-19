"use client";

import { useEffect, useRef } from "react";

// USAGE EXAMPLE:
// <SpiralDustBackground />                              — auto dark/light-ink
// <SpiralDustBackground lightVariant="light-minimal" />  — quieter light sections
// 
// Note: Parent section must have `position: relative; overflow: hidden;`

interface SpiralDustBackgroundProps {
  className?: string;
  lightVariant?: 'light-ink' | 'light-minimal'; // Ignored when dark theme is active
  centerX?: number; // default 0.5, range 0-1
  centerY?: number; // default 0.5, range 0-1
}

type PresetKey = 'dark' | 'light-ink' | 'light-minimal';

interface Preset {
  background: string;
  particleColor: (a: number) => string;
  haloColor: (a: number) => string;
  haloMode: 'glow' | 'shadow' | 'none';
  haloStrength: number;
  haloSizeMultiplier: number;
  count: { desktop: number; tablet: number; mobile: number };
  maxOpacity: number;
  vignette: boolean;
}

const presets: Record<PresetKey, Preset> = {
  dark: {
    background: '#040405',
    particleColor: (a) => `rgba(255,255,255,${a})`,
    haloColor: (a) => `rgba(255,255,255,${a})`,
    haloMode: 'glow',
    haloStrength: 0.06,
    haloSizeMultiplier: 3.2,
    count: { desktop: 3200, tablet: 1600, mobile: 800 },
    maxOpacity: 0.85,
    vignette: true
  },
  'light-ink': {
    background: '#f7f5f0',
    particleColor: (a) => `rgba(38,36,32,${a})`,
    haloColor: (a) => `rgba(38,36,32,${a})`,
    haloMode: 'shadow',
    haloStrength: 0.5,
    haloSizeMultiplier: 3.4,
    count: { desktop: 2600, tablet: 1300, mobile: 650 },
    maxOpacity: 0.8,
    vignette: false
  },
  'light-minimal': {
    background: '#f8f7f3',
    particleColor: (a) => `rgba(50,48,44,${a})`,
    haloColor: () => 'rgba(0,0,0,0)',
    haloMode: 'none',
    haloStrength: 0,
    haloSizeMultiplier: 0,
    count: { desktop: 1100, tablet: 600, mobile: 350 },
    maxOpacity: 0.28,
    vignette: false
  }
};

interface Particle {
  t: number;
  baseAngle: number;
  size: number;
  opacityMultiplier: number;
  wobble: number;
  driftSpeed: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export function SpiralDustBackground({
  className,
  lightVariant = 'light-ink',
  centerX = 0.5,
  centerY = 0.5
}: SpiralDustBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Theme resolution
    const getActivePreset = (): Preset => {
      const isDark = document.documentElement.classList.contains('dark');
      return isDark ? presets['dark'] : presets[lightVariant];
    };

    let currentPreset = getActivePreset();

    // Observe theme changes on html tag
    const observer = new MutationObserver(() => {
      currentPreset = getActivePreset();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let rotation = 0;
    let currentBreakpoint: 'desktop' | 'tablet' | 'mobile' | null = null;
    let animId: number;
    let paused = document.hidden;
    const startTime = performance.now();

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getBreakpoint = (w: number) => {
      if (w >= 1024) return 'desktop';
      if (w >= 640) return 'tablet';
      return 'mobile';
    };

    const getMaxCount = (bp: 'desktop' | 'tablet' | 'mobile') => {
      return Math.max(presets['dark'].count[bp], presets['light-ink'].count[bp], presets['light-minimal'].count[bp]);
    };

    const generateParticles = (count: number): Particle[] => {
      const p: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const t = Math.pow(Math.random(), 2.4);
        const baseAngle = rand(0, Math.PI * 2) + t * rand(3.2, 5.5);
        const size = rand(0.5, 2.0) * (1 - t * 0.4) + 0.3;
        
        p.push({
          t,
          baseAngle,
          size,
          opacityMultiplier: (1 - t) * rand(0.5, 1), 
          wobble: rand(-0.15, 0.15),
          driftSpeed: rand(0.00025, 0.00075),
          twinklePhase: rand(0, Math.PI * 2),
          twinkleSpeed: rand(0.4, 1.2),
        });
      }
      return p;
    };

    const init = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const newWidth = parent.clientWidth;
      const newHeight = parent.clientHeight;
      
      if (newWidth === width && newHeight === height) return;
      
      width = newWidth;
      height = newHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const newBreakpoint = getBreakpoint(width);
      if (newBreakpoint !== currentBreakpoint) {
        currentBreakpoint = newBreakpoint;
        // Generate max needed across all themes so switching themes doesn't require regeneration
        particles = generateParticles(getMaxCount(newBreakpoint));
      }
    };

    const onVisibility = () => {
      paused = document.hidden;
      if (!paused) animId = requestAnimationFrame(loop);
    };
    document.addEventListener('visibilitychange', onVisibility);

    const ro = new ResizeObserver(init);
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
      init(); // force immediate setup
    }
    
    const loop = (now: number) => {
      if (paused) return;
      const elapsedSeconds = (now - startTime) / 1000;
      
      if (!prefersReducedMotion) {
        rotation += 0.0016;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = currentPreset.background;
      ctx.fillRect(0, 0, width, height);

      const cx = width * centerX;
      const cy = height * centerY;
      const maxRadius = Math.min(width, height) * 1.05;

      const renderCount = currentPreset.count[currentBreakpoint as 'desktop' | 'tablet' | 'mobile'] || 0;

      for (let i = 0; i < renderCount; i++) {
        if (i >= particles.length) break;
        
        const p = particles[i];
        const angle = p.baseAngle + rotation + Math.sin(elapsedSeconds * p.driftSpeed * 200 + i) * p.wobble;
        const r = p.t * maxRadius;
        
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r * 0.42;

        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) continue;

        const opacityBase = p.opacityMultiplier * currentPreset.maxOpacity + 0.02;
        const alpha = opacityBase * (0.8 + 0.2 * Math.sin(elapsedSeconds * p.twinkleSpeed + p.twinklePhase));

        // Halo
        if (currentPreset.haloMode !== 'none' && p.size > 1.1 && p.t < 0.35) {
          ctx.beginPath();
          ctx.arc(x, y, p.size * currentPreset.haloSizeMultiplier, 0, Math.PI * 2);
          ctx.fillStyle = currentPreset.haloColor(alpha * currentPreset.haloStrength);
          ctx.fill();
        }

        // Main particle
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = currentPreset.particleColor(alpha);
        ctx.fill();
      }

      // Vignette
      if (currentPreset.vignette) {
        // Radial vignette
        const r0 = maxRadius * 0.6;
        const r1 = Math.max(width, height) * 0.75;
        // avoid DOMException if canvas is too small/narrow causing inverted radii
        if (r1 > r0) {
          const radV = ctx.createRadialGradient(cx, cy, r0, cx, cy, r1);
          radV.addColorStop(0, "rgba(0,0,0,0)");
          radV.addColorStop(1, "rgba(0,0,0,0.55)");
          ctx.fillStyle = radV;
          ctx.fillRect(0, 0, width, height);
        }

        // Subtle horizontal edge darkening
        const edgeV = ctx.createLinearGradient(0, 0, width, 0);
        edgeV.addColorStop(0, "rgba(0,0,0,0.4)");
        edgeV.addColorStop(0.2, "rgba(0,0,0,0)");
        edgeV.addColorStop(0.8, "rgba(0,0,0,0)");
        edgeV.addColorStop(1, "rgba(0,0,0,0.15)");
        ctx.fillStyle = edgeV;
        ctx.fillRect(0, 0, width, height);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [centerX, centerY, lightVariant]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        width: '100%',
        height: '100%',
        display: 'block'
      }}
      aria-hidden="true"
    />
  );
}
