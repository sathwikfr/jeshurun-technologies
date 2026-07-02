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
    { label: "Technology", href: "/technology" },
    { label: "Software", href: "/software" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Careers", href: "/careers" },
  ],
  resources: [
    { label: "Insights & Research", href: "/insights" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border text-muted-foreground relative overflow-hidden mt-auto">
      {/* Premium top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.5) 30%, rgba(6,182,212,0.6) 60%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at top center, rgba(37, 99, 235, 0.05) 0%, transparent 55%)" }}
        aria-hidden="true"
      />

      {/* ── Newsletter CTA Strip ── */}
      <div className="relative z-10 border-b border-border/60">
        <div className="container mx-auto px-6 sm:px-8 py-10 md:py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-md">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-2">
                <span className="w-4 h-px bg-primary" />
                Stay Connected
              </div>
              <h3 className="text-xl font-extrabold text-foreground tracking-tight">
                Enterprise Technology Insights
              </h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Research reports, cloud strategies, and digital transformation briefs — delivered to your inbox.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all duration-300 shadow-[0_4px_16px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.5)] hover:scale-[1.02] shrink-0"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Get in Touch
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="container mx-auto px-6 sm:px-8 py-14 md:py-18 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <HeaderLogo className="h-10 w-auto" />
            <p className="text-sm text-foreground/80 leading-relaxed max-w-sm font-medium">
              Architecting resilient systems and delivering mission-critical technology solutions for organizations across Ireland, Europe, the Middle East, and India.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-sm font-medium">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-foreground/80">Dublin, Ireland</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm font-medium">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                <a
                  href="mailto:info@jeshuruntech.com"
                  className="text-foreground/80 hover:text-primary transition-colors duration-200 link-underline"
                >
                  info@jeshuruntech.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/jeshurun-technologies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jeshurun Technologies on LinkedIn"
                className="group h-9 w-9 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5 hover:shadow-[0_4px_12px_rgba(10,102,194,0.2)] transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Jeshurun Technologies on X (Twitter)"
                className="group h-9 w-9 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border/80 hover:bg-muted/20 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Email */}
              <a
                href="mailto:info@jeshuruntech.com"
                aria-label="Email Jeshurun Technologies"
                className="group h-9 w-9 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_4px_12px_rgba(37,99,235,0.15)] transition-all duration-300"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="md:col-span-2 space-y-5">
            <div>
              <h4 className="font-extrabold text-foreground text-xs uppercase tracking-widest mb-1">Services</h4>
              <div className="h-[2px] w-8 bg-gradient-to-r from-primary to-primary/20 rounded-full" />
            </div>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200 link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-3 space-y-5">
            <div>
              <h4 className="font-extrabold text-foreground text-xs uppercase tracking-widest mb-1">Company</h4>
              <div className="h-[2px] w-8 bg-gradient-to-r from-primary to-primary/20 rounded-full" />
            </div>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200 link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="md:col-span-3 space-y-5">
            <div>
              <h4 className="font-extrabold text-foreground text-xs uppercase tracking-widest mb-1">Resources</h4>
              <div className="h-[2px] w-8 bg-gradient-to-r from-primary to-primary/20 rounded-full" />
            </div>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200 link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Bottom copyright bar ── */}
        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-medium text-muted-foreground">
          <p className="text-center sm:text-left">
            &copy; {currentYear} Jeshurun Technologies Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
            <Link href="/privacy" className="hover:text-primary transition-colors duration-200 link-underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors duration-200 link-underline">
              Terms of Service
            </Link>
            <a
              href="https://www.jeshurun.ie"
              className="inline-flex items-center gap-1 hover:text-primary transition-colors duration-200"
            >
              jeshurun.ie
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
