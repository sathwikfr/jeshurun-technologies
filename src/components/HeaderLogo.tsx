// src/components/HeaderLogo.tsx
"use client";
import React from "react";
import Link from "next/link";

interface HeaderLogoProps {
  className?: string;
}

export const HeaderLogo = React.memo(function HeaderLogo({ className = "h-14 w-auto" }: HeaderLogoProps) {
  return (
    <Link href="/" className="flex items-center select-none cursor-pointer">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 373 114" 
        className={`${className} drop-shadow-sm hover:scale-[1.01] transition-transform duration-300`}
      >
        <style>{`
          .serif-title {
            font-family: "Cinzel", "Times New Roman", "Georgia", serif;
            font-weight: 700;
            fill: #00a2e8;
            font-size: 58px;
            letter-spacing: -0.5px;
          }
          .serif-subtitle {
            font-family: "Cinzel", "Times New Roman", "Georgia", serif;
            font-weight: 700;
            fill: #22b14c;
            font-size: 22px;
            letter-spacing: 1.8px;
          }
        `}</style>
        <text x="358" y="65" className="serif-title" textAnchor="end">JESHURUN</text>
        <text x="358" y="98" className="serif-subtitle" textAnchor="end">TECHNOLOGIES</text>
      </svg>
    </Link>
  );
});
