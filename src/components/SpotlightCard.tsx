"use client";

import React, { useRef, useState } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  tiltEffect?: boolean;
  borderGlow?: boolean;
}

export function SpotlightCard({ children, className = "", tiltEffect = false, borderGlow = true, ...props }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={(e) => {
        handleMouseMove(e);
        if (props.onMouseMove) props.onMouseMove(e);
      }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        if (props.onMouseEnter) props.onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave();
        if (props.onMouseLeave) props.onMouseLeave(e);
      }}
      className={`card-sweep-container relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:scale-[1.02] hover:border-primary/35 hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] ${className}`}
      {...props}
    >
      <div className="card-sweep-highlight" />
      {/* Spotlight highlight background */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(var(--primary), 0.04), transparent 80%)`,
        }}
      />
      {/* Magical Border Glow tracking the cursor along the border */}
      {borderGlow && (
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-300 z-20"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, #1d4ed8, transparent 100%)`,
            padding: "2px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude"
          }}
        />
      )}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
