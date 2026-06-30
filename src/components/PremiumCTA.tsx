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
  secondaryButtonText: string;
  secondaryButtonHref: string;
}> = {
  home: {
    titleTop: "Let's Build Your",
    titleHighlight: "Digital Future",
    description: "Partner with Jeshurun Technologies to accelerate your digital transformation journey with enterprise-grade solutions.",
    primaryButtonText: "Schedule Consultation",
    primaryButtonHref: "/contact",
    secondaryButtonText: "Explore Services",
    secondaryButtonHref: "/services",
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
    titleTop: "Ready to Build",
    titleHighlight: "Future-Ready Technology?",
    description: "Partner with our technology specialists to modernize infrastructure, strengthen security, and scale cloud-native platforms with confidence.",
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
    titleHighlight: "Digital Future",
    description: "Discuss your technology goals with our consulting team.",
    primaryButtonText: "Schedule Consultation",
    primaryButtonHref: "/contact",
    secondaryButtonText: "Explore Services",
    secondaryButtonHref: "/services",
  }
};

export function PremiumCTA({ variant, titleTop: customTitleTop, titleHighlight: customTitleHighlight, description: customDescription }: PremiumCTAProps) {
  const data = CTA_DATA[variant];
  const titleTop = customTitleTop || data.titleTop;
  const titleHighlight = customTitleHighlight || data.titleHighlight;
  const description = customDescription || data.description;

  return (
    <section className="w-full py-16 md:py-20 relative z-10 bg-transparent overflow-hidden">
      <div className="container px-6 sm:px-8 mx-auto relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl bg-card border border-border rounded-2xl px-10 py-14 md:py-16 text-center shadow-lg relative overflow-hidden group"
        >
          {/* Blueprint Background */}
          <div 
            className="absolute inset-0 z-0 opacity-40 mix-blend-plus-lighter"
            style={{
              backgroundImage: `
                radial-gradient(circle at center, rgba(37,99,235,0.08), transparent 70%),
                linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '100% 100%, 24px 24px, 24px 24px'
            }}
          />
          
          {/* Subtle inner card glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
          
          <div className="relative z-10 space-y-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-[1.15]">
              {titleTop} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                {titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed max-w-lg mx-auto">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link href={data.primaryButtonHref}>
                <Button size="sm" className="card-sweep-container h-11 px-8 text-sm font-bold bg-[#2563EB] hover:bg-[#3B82F6] text-white shadow-[0_6px_16px_-4px_rgba(37,99,235,0.5)] hover:shadow-[0_10px_20px_-6px_rgba(59,130,246,0.6)] transition-all duration-300 rounded-xl hover:scale-[1.02]">
                  <div className="card-sweep-highlight" />
                  {data.primaryButtonText}
                  <ArrowRight className="ml-2 w-3.5 h-3.5" />
                </Button>
              </Link>
              <Link href={data.secondaryButtonHref}>
                <Button size="sm" variant="outline" className="card-sweep-container h-11 px-8 text-sm font-bold border-border bg-card hover:bg-muted/10 text-foreground shadow-sm transition-all duration-300 rounded-xl hover:scale-[1.02]">
                  <div className="card-sweep-highlight" />
                  {data.secondaryButtonText}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
