"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useMemo } from "react";

export function AnimatedArchitectureDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });
  const prefersReducedMotion = useReducedMotion();

  // Pseudo-random deterministic values for consistent rendering
  const nodes = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      // Arrange in a circle/ellipse around center (200, 200)
      const angle = (i / 8) * Math.PI * 2;
      const rx = 140;
      const ry = 100;
      return {
        id: i,
        cx: 200 + Math.cos(angle) * rx,
        cy: 200 + Math.sin(angle) * ry,
        delay: i * 0.2,
      };
    });
  }, []);

  const shouldAnimate = isInView && !prefersReducedMotion;

  return (
    <div
      ref={ref}
      className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-[#070b13] overflow-hidden p-6 group"
    >
      {/* Background ambient glow */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)]"
        animate={
          shouldAnimate
            ? {
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }
            : {}
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-full drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="glowNode" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(6,182,212,1)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0)" />
          </radialGradient>
          <radialGradient id="glowCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59,130,246,1)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </radialGradient>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(6,182,212,0.1)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.4)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.1)" />
          </linearGradient>
        </defs>

        {/* Connection Lines from center to nodes */}
        {nodes.map((node) => (
          <g key={`line-${node.id}`}>
            <motion.line
              x1={200}
              y1={200}
              x2={node.cx}
              y2={node.cy}
              stroke="url(#lineGrad)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                shouldAnimate
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 1, opacity: 1 }
              }
              transition={{
                duration: 1.5,
                delay: node.delay,
                ease: "easeOut",
              }}
            />
            {/* Pulsing data packets traveling along lines */}
            <motion.circle
              r="2.5"
              fill="#fff"
              initial={{ opacity: 0 }}
              animate={
                shouldAnimate
                  ? {
                      cx: [200, node.cx],
                      cy: [200, node.cy],
                      opacity: [0, 1, 0],
                    }
                  : {}
              }
              transition={{
                duration: 2.5,
                delay: node.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0 0 4px #fff)" }}
            />
          </g>
        ))}

        {/* Outer Ring */}
        <motion.ellipse
          cx="200"
          cy="200"
          rx="140"
          ry="100"
          fill="none"
          stroke="rgba(6,182,212,0.15)"
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={
            shouldAnimate
              ? { rotate: 360 }
              : {}
          }
          style={{ originX: "200px", originY: "200px" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Outer Nodes */}
        {nodes.map((node) => (
          <g key={`node-${node.id}`}>
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="24"
              fill="url(#glowNode)"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                shouldAnimate
                  ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6],
                    }
                  : { scale: 1, opacity: 0.8 }
              }
              transition={{
                duration: 3,
                delay: node.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="4"
              fill="#06b6d4"
              initial={{ scale: 0 }}
              animate={
                shouldAnimate
                  ? { scale: 1 }
                  : { scale: 1 }
              }
              transition={{ duration: 0.5, delay: node.delay }}
            />
          </g>
        ))}

        {/* Central Core */}
        <g className="cursor-pointer">
          <motion.circle
            cx="200"
            cy="200"
            r="60"
            fill="url(#glowCenter)"
            animate={
              shouldAnimate
                ? {
                    scale: [1, 1.15, 1],
                    opacity: [0.7, 1, 0.7],
                  }
                : { scale: 1, opacity: 0.8 }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="200"
            cy="200"
            r="16"
            fill="#3b82f6"
            className="group-hover:fill-cyan-400 transition-colors duration-500"
            style={{ filter: "drop-shadow(0 0 10px rgba(59,130,246,0.8))" }}
          />
          {/* Core rings */}
          <motion.circle
            cx="200"
            cy="200"
            r="28"
            fill="none"
            stroke="rgba(59,130,246,0.5)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            animate={shouldAnimate ? { rotate: -360 } : {}}
            style={{ originX: "200px", originY: "200px" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="200"
            cy="200"
            r="42"
            fill="none"
            stroke="rgba(6,182,212,0.3)"
            strokeWidth="1"
            animate={shouldAnimate ? { rotate: 360 } : {}}
            style={{ originX: "200px", originY: "200px" }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </g>
      </svg>
      
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-cyan-500/30" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-cyan-500/30" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-cyan-500/30" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-cyan-500/30" />
    </div>
  );
}
