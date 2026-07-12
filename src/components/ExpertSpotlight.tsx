import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";

export function ExpertSpotlight({ 
  name = "Elena Rodriguez", 
  role = "Head of Cloud Strategy",
  description = "Ready to architect your next-generation platform? Book a direct consultation with our practice leads."
}: { 
  name?: string;
  role?: string;
  description?: string;
}) {
  return (
    <div className="mt-16 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-6 sm:gap-8 relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 relative z-10 overflow-hidden">
        <User className="w-10 h-10 text-primary/50" />
      </div>
      
      <div className="flex-1 text-center sm:text-left relative z-10">
        <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Talk to an Expert</h4>
        <div className="text-xl font-editorial text-foreground font-bold mb-1">{name}</div>
        <div className="text-sm text-muted-foreground mb-3">{role}</div>
        <p className="text-sm text-muted-foreground/80 max-w-md hidden md:block">
          {description}
        </p>
      </div>
      
      <div className="shrink-0 relative z-10">
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
        >
          Book Consultation <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
