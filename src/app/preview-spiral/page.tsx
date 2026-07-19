"use client";

import { useState } from "react";
import { SpiralDustBackground } from "@/components/effects/SpiralDustBackground";

export default function PreviewSpiral() {
  const [variant, setVariant] = useState<'light-minimal' | 'light-minimal'>('light-minimal');

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center relative overflow-hidden bg-background">
      <SpiralDustBackground lightVariant={variant} />
      
      <div className="relative z-10 flex flex-col gap-4 p-6 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-xl border border-border">
        <h1 className="text-2xl font-bold">Spiral Preset Testing</h1>
        <div className="flex gap-4">
          <button onClick={toggleTheme} className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Toggle Dark/Light Theme
          </button>
          <button 
            onClick={() => setVariant('light-minimal')} 
            className={`px-4 py-2 rounded-md ${variant === 'light-minimal' ? 'bg-secondary text-secondary-foreground border border-border' : 'bg-transparent text-foreground'}`}
          >
            Variant: light-minimal
          </button>
          <button 
            onClick={() => setVariant('light-minimal')} 
            className={`px-4 py-2 rounded-md ${variant === 'light-minimal' ? 'bg-secondary text-secondary-foreground border border-border' : 'bg-transparent text-foreground'}`}
          >
            Variant: light-minimal
          </button>
        </div>
      </div>
    </div>
  );
}
