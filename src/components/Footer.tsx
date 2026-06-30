import Link from "next/link";
import { HeaderLogo } from "@/components/HeaderLogo";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border text-muted-foreground mt-auto relative overflow-hidden">
      {/* Premium Radial Glow */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(circle at top center, rgba(37, 99, 235, 0.06), transparent 60%)' }} />
      
      <div className="container mx-auto px-6 sm:px-8 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          
          {/* Logo & Description */}
          <div className="md:col-span-5 space-y-5">
            <HeaderLogo className="h-10 w-auto" />
            <p className="text-sm text-foreground leading-relaxed max-w-sm font-medium">
              Architecting resilient systems and delivering mission-critical technology solutions for organizations across Ireland, Europe, and beyond.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" aria-label="Facebook" className="h-9 w-9 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-[#0057D9] hover:border-[#0057D9] hover:shadow-sm transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
              <Link href="#" aria-label="Twitter" className="h-9 w-9 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-[#0057D9] hover:border-[#0057D9] hover:shadow-sm transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" aria-label="LinkedIn" className="h-9 w-9 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-[#0057D9] hover:border-[#0057D9] hover:shadow-sm transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="#" aria-label="Email Us" className="h-9 w-9 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-[#0057D9] hover:border-[#0057D9] hover:shadow-sm transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Services Section */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">Services</h4>
            <div className="h-[2px] bg-slate-300 w-8 mb-4" /> {/* Subtle horizontal accent line */}
            <ul className="space-y-3 text-sm font-semibold">
              <li>
                <Link href="/services/it-consulting" className="hover:text-[#0057D9] transition-colors duration-200">IT Consulting</Link>
              </li>
              <li>
                <Link href="/services/project-management" className="hover:text-[#0057D9] transition-colors duration-200">Project Management</Link>
              </li>
              <li>
                <Link href="/services/test-management" className="hover:text-[#0057D9] transition-colors duration-200">Test Management</Link>
              </li>
              <li>
                <Link href="/services/infrastructure-management" className="hover:text-[#0057D9] transition-colors duration-200">Infrastructure</Link>
              </li>
            </ul>
          </div>
          
          {/* Company Section */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">Company</h4>
            <div className="h-[2px] bg-slate-300 w-8 mb-4" /> {/* Subtle horizontal accent line */}
            <ul className="space-y-3 text-sm font-semibold">
              <li>
                <Link href="/about" className="hover:text-[#0057D9] transition-colors duration-200">About Us</Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-[#0057D9] transition-colors duration-200">Technology</Link>
              </li>
              <li>
                <Link href="/software" className="hover:text-[#0057D9] transition-colors duration-200">Software</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0057D9] transition-colors duration-200">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">Contact</h4>
            <div className="h-[2px] bg-slate-300 w-8 mb-4" /> {/* Subtle horizontal accent line */}
            <ul className="space-y-3 text-sm font-semibold text-foreground">
              <li className="leading-relaxed">
                Dublin, IRELAND
              </li>
              <li>
                <a href="mailto:info@jeshuruntech.com" className="hover:text-[#0057D9] transition-colors duration-200">
                  info@jeshuruntech.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm font-semibold text-muted-foreground gap-4">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Jeshurun Technologies. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="underline text-[#0057D9] hover:text-[#2563EB] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="underline text-[#0057D9] hover:text-[#2563EB] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
