import Link from "next/link";
import { HeaderLogo } from "@/components/HeaderLogo";
import { ArrowRight, Mail, MapPin, ExternalLink } from "lucide-react";

const footerLinks = {
  services: [
    { label: "IT Consulting", href: "/services/it-consulting" },
    { label: "Project Management", href: "/services/project-management" },
    { label: "Test Management", href: "/services/test-management" },
    { label: "Infrastructure", href: "/services/infrastructure-management" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Technology Ecosystem", href: "/technology" },
    { label: "Software Engineering", href: "/software" },
    { label: "Case Studies", href: "/case-studies" },
  ],
  resources: [
    { label: "Insights & Research", href: "/insights" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background text-muted-foreground border-t border-border relative overflow-hidden mt-auto z-10">
      {/* Premium top ambient line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.4) 30%, rgba(6,182,212,0.4) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 md:py-18 relative z-10">
        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-border/60">
          
          {/* Column 1: Brand & Mission (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <HeaderLogo className="h-10 w-auto" />
            
            <p className="text-sm text-foreground/80 leading-relaxed font-medium max-w-sm">
              Architecting resilient systems and delivering mission-critical technology solutions for enterprise organizations across Ireland, Europe, the Middle East, and India.
            </p>

            {/* Contact Location & Email */}
            <div className="space-y-2.5 pt-1 text-sm font-medium">
              <div className="flex items-center gap-2.5 text-foreground/80">
                <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>Dublin, Ireland</span>
              </div>
              <div className="flex items-center gap-2.5 text-foreground/80">
                <Mail className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@jeshuruntech.com"
                  className="hover:text-primary transition-colors duration-200"
                >
                  info@jeshuruntech.com
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/jeshurun-technologies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-9 w-9 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="#"
                aria-label="X (Twitter)"
                className="h-9 w-9 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border/80 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Email Direct */}
              <a
                href="mailto:info@jeshuruntech.com"
                aria-label="Email Us"
                className="h-9 w-9 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <h4 className="font-extrabold text-foreground text-xs uppercase tracking-[0.15em]">
                Services
              </h4>
            </div>
            <ul className="space-y-3 pt-1">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company (2.5 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <h4 className="font-extrabold text-foreground text-xs uppercase tracking-[0.15em]">
                Company
              </h4>
            </div>
            <ul className="space-y-3 pt-1">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources (2.5 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <h4 className="font-extrabold text-foreground text-xs uppercase tracking-[0.15em]">
                Resources
              </h4>
            </div>
            <ul className="space-y-3 pt-1">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Bottom Bar (Padded to avoid floating buttons overlap) ── */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-muted-foreground pr-0 md:pr-44 lg:pr-48">
          <p className="text-center md:text-left">
            &copy; {currentYear} Jeshurun Technologies Ltd. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-foreground transition-colors duration-200">
              Privacy Policy
            </Link>
            <span className="opacity-30">•</span>
            <Link href="/terms" className="hover:text-foreground transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
