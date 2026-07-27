import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export type CTAVariant = "services" | "technology" | "software" | "about" | "case-studies" | "home" | "contact";

export interface PremiumCTAProps {
  variant: CTAVariant;
  titleTop?: string;
  titleHighlight?: string;
  description?: string;
}

const CTA_DATA: Record<CTAVariant, {
  titleTop: string;
  titleHighlight: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}> = {
  home: {
    titleTop: "We Deliver",
    titleHighlight: "Mission-Critical Results.",
    description: "Partner with Jeshurun Technologies — 99.9% SLA uptime, 45+ certified engineers, and a proven track record across pharma, telecoms, and insurance globally.",
    primaryButtonText: "Start a Project",
    primaryButtonHref: "/contact",
  },
  services: {
    titleTop: "Ready to Accelerate Your",
    titleHighlight: "Delivery Pipelines?",
    description: "Discuss your enterprise challenge with our consultants and design a scalable, high-availability roadmap tailored to your business goals.",
    primaryButtonText: "Book Consultation",
    primaryButtonHref: "/contact",
    secondaryButtonText: "Explore Services",
    secondaryButtonHref: "/services",
  },
  technology: {
    titleTop: "Ready to Modernize",
    titleHighlight: "Your Technology Stack?",
    description: "Speak with our technology architects and identify the right domains to accelerate your digital transformation goals.",
    primaryButtonText: "Consult Our Experts",
    primaryButtonHref: "/contact",
    secondaryButtonText: "View Technologies",
    secondaryButtonHref: "/technology",
  },
  software: {
    titleTop: "Ready to Modernize Your",
    titleHighlight: "Software Platforms?",
    description: "Partner with us to build resilient, cloud-native applications that drive competitive advantage and long-term business value.",
    primaryButtonText: "Contact Our Engineers",
    primaryButtonHref: "/contact",
    secondaryButtonText: "View Capabilities",
    secondaryButtonHref: "/software",
  },
  about: {
    titleTop: "Ready to Partner with",
    titleHighlight: "Jeshurun Technologies?",
    description: "Discuss your technology, cloud, infrastructure, cybersecurity, or digital transformation goals with our consulting team.",
    primaryButtonText: "Contact Us",
    primaryButtonHref: "/contact",
    secondaryButtonText: "Explore Services",
    secondaryButtonHref: "/services",
  },
  "case-studies": {
    titleTop: "See Real Impact.",
    titleHighlight: "Drive Real Results.",
    description: "Explore how enterprise organizations overcome complex technology challenges and achieve measurable outcomes.",
    primaryButtonText: "Browse Case Studies",
    primaryButtonHref: "/case-studies",
    secondaryButtonText: "Discuss Your Challenge",
    secondaryButtonHref: "/contact",
  },
  contact: {
    titleTop: "Ready to Transform Your",
    titleHighlight: "Digital Future?",
    description: "Discuss your technology goals with our expert engineering and consulting team.",
    primaryButtonText: "Schedule Consultation",
    primaryButtonHref: "/contact",
    secondaryButtonText: "Explore Services",
    secondaryButtonHref: "/services",
  }
};

export function PremiumCTA({ variant, titleTop: customTitleTop, titleHighlight: customTitleHighlight, description: customDescription }: PremiumCTAProps) {
  const data = CTA_DATA[variant] || CTA_DATA.home;
  const titleTop = customTitleTop || data.titleTop;
  const titleHighlight = customTitleHighlight || data.titleHighlight;
  const description = customDescription || data.description;

  return (
    <section className="w-full py-8 md:py-12 relative z-10 bg-transparent overflow-hidden" aria-label="Call to Action">
      <div className="container px-4 sm:px-6 mx-auto relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group w-full max-w-2xl relative"
        >
          {/* Subtle Outer Glow Aura */}
          <div 
            className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/15 via-cyan-500/15 to-blue-600/15 opacity-30 group-hover:opacity-100 transition-opacity duration-700 blur-md" 
            aria-hidden="true" 
          />

          {/* Compact Main Card Container */}
          <div className="relative bg-card/90 dark:bg-slate-900/90 backdrop-blur-xl border border-border/80 rounded-2xl px-6 sm:px-10 py-8 md:py-10 text-center shadow-[0_10px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.35)] overflow-hidden">
            
            {/* Ambient Background Radial Glow */}
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                background: "radial-gradient(ellipse at top, rgba(37,99,235,0.06) 0%, rgba(6,182,212,0.03) 50%, transparent 80%)",
              }}
              aria-hidden="true"
            />

            {/* Subtle Blueprint Grid Pattern */}
            <div
              className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(37,99,235,0.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(37,99,235,0.2) 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
              }}
              aria-hidden="true"
            />

            {/* Compact Pill Badge with Glowing Blue Dot */}
            <div className="relative z-10 flex justify-center mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/15 dark:border-white/15 text-xs font-extrabold uppercase tracking-[0.12em] text-black dark:text-white shadow-xs">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
                  <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,1)]"></span>
                </span>
                ENTERPRISE READY
              </div>
            </div>

            {/* Content Stack */}
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-[1.2] max-w-xl mx-auto">
                {titleTop}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">
                  {titleHighlight}
                </span>
              </h2>

              <p className="text-muted-foreground text-xs sm:text-sm font-medium leading-relaxed max-w-md mx-auto">
                {description}
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
                <Link href={data.primaryButtonHref}>
                  <Button
                    size="sm"
                    className="h-10 px-6 text-xs font-bold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_20px_rgba(37,99,235,0.45)] transition-all duration-300 rounded-full hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>{data.primaryButtonText}</span>
                    <ArrowRight className="ml-1.5 w-3.5 h-3.5" aria-hidden="true" />
                  </Button>
                </Link>

                {data.secondaryButtonText && data.secondaryButtonHref && (
                  <Link href={data.secondaryButtonHref}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-10 px-6 text-xs font-bold border-border/80 bg-background/80 hover:bg-accent hover:border-primary/30 text-foreground transition-all duration-300 rounded-full hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>{data.secondaryButtonText}</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
