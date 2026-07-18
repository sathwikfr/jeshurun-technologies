// src/components/GalaxySpiral.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

/**
 * GalaxySpiral — A 2D canvas particle system that renders a spiraling
 * galaxy/nebula animation inspired by getlayers.ai's hero effect.
 *
 * Uses logarithmic spiral placement with orbital rotation for a
 * mesmerizing cosmic swirl. Designed for dark backgrounds.
 */
export function GalaxySpiral() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(canvasRef, { margin: "200px" });
  const isInViewRef = useRef(isInView);
  useEffect(() => { isInViewRef.current = isInView; }, [isInView]);

  // Mouse position for subtle interactivity
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    // ─── Particle types ─────────────────────────────────

    interface SpiralParticle {
      // Spiral coordinates
      angle: number;          // Current angle on the spiral (θ)
      baseRadius: number;     // Base distance from center
      armOffset: number;      // Which spiral arm (0, 1, 2, ...)
      scatter: number;        // Random perpendicular scatter
      scatterAngle: number;   // Angle of scatter
      // Visual
      size: number;
      baseOpacity: number;
      twinklePhase: number;
      twinkleSpeed: number;
      // Speed
      orbitalSpeed: number;
    }

    interface AmbientParticle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinklePhase: number;
      twinkleSpeed: number;
    }

    let spiralParticles: SpiralParticle[] = [];
    let ambientParticles: AmbientParticle[] = [];

    // ─── Configuration ──────────────────────────────────

    const NUM_ARMS = 3;               // Number of spiral arms
    const ARM_SPREAD = 0.45;           // How tight the spiral winds (lower = tighter)
    const BASE_ROTATION_SPEED = 0.00012; // Global rotation speed
    const CORE_BRIGHTNESS = 0.55;       // Brightness multiplier at center (reduced for text readability)
    const EDGE_BRIGHTNESS = 0.35;      // Brightness multiplier at edge

    // ─── Particle creation ──────────────────────────────

    const createSpiralParticle = (maxR: number): SpiralParticle => {
      const arm = Math.floor(Math.random() * NUM_ARMS);
      const armAngleOffset = (arm / NUM_ARMS) * Math.PI * 2;

      // Logarithmic spiral: r = a * e^(b * θ)
      // We use a quadratic distribution for radius to cluster more at center
      const t = Math.random();
      const baseRadius = Math.pow(t, 1.6) * maxR;

      // θ determined by radius (the spiral equation)
      const angle = armAngleOffset + (baseRadius / maxR) * Math.PI * 4 * ARM_SPREAD + (Math.random() - 0.5) * 0.3;

      // Scatter: Gaussian-like perpendicular offset from the arm
      const scatterAmount = (10 + Math.random() * 40) * (0.3 + 0.7 * (baseRadius / maxR));
      const scatterAngle = Math.random() * Math.PI * 2;

      // Inner particles orbit faster (Keplerian-like)
      const normalizedR = Math.max(baseRadius / maxR, 0.05);
      const orbitalSpeed = BASE_ROTATION_SPEED / Math.pow(normalizedR, 0.35);

      // Size: 3 tiers with bias toward smaller
      const sizeRand = Math.random();
      let size: number;
      if (sizeRand > 0.88) size = 2.5;        // 12% large
      else if (sizeRand > 0.55) size = 1.5;    // 33% medium
      else size = 0.9;                          // 55% small

      // Opacity: brighter near core, dimmer at edges
      const radialFactor = 1 - (baseRadius / maxR);
      const baseOpacity = EDGE_BRIGHTNESS + radialFactor * (CORE_BRIGHTNESS - EDGE_BRIGHTNESS);

      return {
        angle,
        baseRadius,
        armOffset: armAngleOffset,
        scatter: scatterAmount,
        scatterAngle,
        size,
        baseOpacity: baseOpacity * (0.5 + Math.random() * 0.5),
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.008 + Math.random() * 0.015,
        orbitalSpeed,
      };
    };

    const createAmbientParticle = (w: number, h: number): AmbientParticle => {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        size: 0.4 + Math.random() * 0.8,
        opacity: 0.05 + Math.random() * 0.15,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.005 + Math.random() * 0.015,
      };
    };

    // ─── Resize handler ─────────────────────────────────

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Calculate max radius based on viewport
      const maxR = Math.min(width, height) * 0.42;

      // Determine particle count based on screen size
      let spiralCount = 3500;
      let ambientCount = 200;
      if (width < 768) {
        spiralCount = 1200;
        ambientCount = 80;
      } else if (width < 1024) {
        spiralCount = 2200;
        ambientCount = 140;
      }

      // Generate spiral particles
      spiralParticles = [];
      for (let i = 0; i < spiralCount; i++) {
        spiralParticles.push(createSpiralParticle(maxR));
      }

      // Generate ambient star field
      ambientParticles = [];
      for (let i = 0; i < ambientCount; i++) {
        ambientParticles.push(createAmbientParticle(width, height));
      }
    };

    // ─── Mouse tracking ─────────────────────────────────

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    handleResize();

    // ─── Animation loop ─────────────────────────────────

    let globalTime = 0;
    let lastTime = 0;
    const fpsInterval = 1000 / 60;

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);

      if (!isInViewRef.current) return;

      const elapsed = time - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = time - (elapsed % fpsInterval);

      globalTime += 0.016; // ~60fps delta

      ctx.clearRect(0, 0, width, height);

      // Galaxy center position — slightly right of center and vertically centered
      // Offset by mouse position for subtle parallax
      const mouse = mouseRef.current;
      const parallaxX = mouse.active ? (mouse.x - 0.5) * 15 : 0;
      const parallaxY = mouse.active ? (mouse.y - 0.5) * 10 : 0;

      const cx = width * 0.5 + parallaxX;
      const cy = height * 0.5 + parallaxY;

      // ── 1. Draw core glow ─────────────────────────────
      const maxR = Math.min(width, height) * 0.44;
      const coreGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.4);
      coreGradient.addColorStop(0, "rgba(200, 215, 255, 0.05)");
      coreGradient.addColorStop(0.3, "rgba(160, 185, 240, 0.02)");
      coreGradient.addColorStop(0.7, "rgba(120, 150, 220, 0.01)");
      coreGradient.addColorStop(1, "rgba(100, 120, 180, 0)");
      ctx.fillStyle = coreGradient;
      ctx.fillRect(0, 0, width, height);

      // ── 2. Draw ambient particles (background stars) ──
      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i];
        p.twinklePhase += p.twinkleSpeed;
        const twinkle = 0.3 + 0.7 * Math.sin(p.twinklePhase);
        const opacity = p.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 225, 240, ${opacity})`;
        ctx.fill();
      }

      // ── 3. Draw spiral particles ──────────────────────
      for (let i = 0; i < spiralParticles.length; i++) {
        const p = spiralParticles[i];

        // Advance angle (orbital motion)
        p.angle += p.orbitalSpeed;

        // Twinkle
        p.twinklePhase += p.twinkleSpeed;
        const twinkle = 0.4 + 0.6 * Math.sin(p.twinklePhase);

        // Calculate position from spiral coordinates
        const r = p.baseRadius;
        const theta = p.angle;

        // Base position on the spiral arm
        let x = cx + Math.cos(theta) * r;
        let y = cy + Math.sin(theta) * r * 0.55; // Elliptical (0.55 = tilt factor)

        // Add scatter (perpendicular to arm direction)
        x += Math.cos(p.scatterAngle) * p.scatter;
        y += Math.sin(p.scatterAngle) * p.scatter * 0.55;

        // Skip if offscreen
        if (x < -10 || x > width + 10 || y < -10 || y > height + 10) continue;

        // Final opacity with twinkle
        const opacity = p.baseOpacity * twinkle;

        // Color: transition from White (core) -> Vibrant Blue -> Blue -> Purple
        let red, green, blue;
        const radialFactor = Math.min(1, r / maxR);
        if (radialFactor < 0.15) {
          // White to Vibrant Blue (18, 171, 219)
          const t = radialFactor / 0.15;
          red = Math.round(255 - t * (255 - 18));
          green = Math.round(255 - t * (255 - 171));
          blue = Math.round(255 - t * (255 - 219));
        } else if (radialFactor < 0.5) {
          // Vibrant Blue to Capgemini Blue (0, 112, 173)
          const t = (radialFactor - 0.15) / 0.35;
          red = Math.round(18 - t * 18);
          green = Math.round(171 - t * (171 - 112));
          blue = Math.round(219 - t * (219 - 173));
        } else {
          // Capgemini Blue to Deep Purple (43, 10, 61)
          const t = Math.min((radialFactor - 0.5) / 0.5, 1);
          red = Math.round(0 + t * 43);
          green = Math.round(112 - t * (112 - 10));
          blue = Math.round(173 - t * (173 - 61));
        }

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
        ctx.fill();
      }

      // ── 4. Soft outer vignette to blend edges ─────────
      const vignetteGradient = ctx.createRadialGradient(
        cx, cy, maxR * 0.65,
        cx, cy, maxR * 1.5
      );
      vignetteGradient.addColorStop(0, "rgba(5, 8, 16, 0)");
      vignetteGradient.addColorStop(0.7, "rgba(5, 8, 16, 0.15)");
      vignetteGradient.addColorStop(1, "rgba(5, 8, 16, 0.5)");
      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, width, height);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 1 }}
      aria-hidden="true"
    />
  );
}
