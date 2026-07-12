"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface NavSection {
  id: string;
  label: string;
}

export function FloatingSidebarNav({ sections }: { sections: NavSection[] }) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero (approx 500px)
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Determine active section
      const sectionElements = sections.map(s => document.getElementById(s.id)).filter(Boolean);
      let currentActive = activeSection;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is near or past the top of the viewport
          if (rect.top <= 350) {
            currentActive = sections[i].id;
            break;
          }
        }
      }
      
      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, activeSection]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100; // offset for header
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="bg-background/80 backdrop-blur-md border border-border rounded-full py-6 px-3 flex flex-col gap-6 shadow-xl relative">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className="relative group flex items-center"
                  aria-label={`Scroll to ${section.label}`}
                >
                  <div 
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? "bg-primary scale-125" : "bg-muted-foreground/40 group-hover:bg-muted-foreground"
                    }`} 
                  />
                  
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-6 whitespace-nowrap bg-card border border-border px-3 py-1.5 rounded-md shadow-lg"
                      >
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? "text-primary" : "text-foreground"}`}>
                          {section.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
