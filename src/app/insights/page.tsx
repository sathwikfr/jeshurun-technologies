import { insightsData } from "@/lib/insightsData";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";

export const metadata = {
  title: "Insights & Research Reports | Jeshurun",
  description: "Explore our latest engineering audits, AI telemetry models, and digital transformation guides.",
};

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 flex flex-col">
      {/* Header */}
      <section className="w-full py-12 md:py-20 relative overflow-hidden">
        <div className="container px-6 sm:px-8 mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2563EB]/10 text-[#2563EB] mb-6">
            Corporate Intelligence
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-foreground tracking-tight max-w-4xl mx-auto mb-6">
            Insights &amp; Research Reports
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Explore our latest engineering audits, AI telemetry models, and digital transformation guides to stay ahead in enterprise technology.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container px-6 sm:px-8 mx-auto py-16 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insightsData.map((insight) => (
            <Link key={insight.slug} href={`/insights/${insight.slug}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-3xl">
              <TiltCard className="h-full">
                <div className="group relative flex flex-col rounded-3xl border border-border bg-card transition-all min-h-[440px] shadow-sm hover:shadow-[0_8px_40px_-12px_rgba(29,78,216,0.2)] hover:border-[#1D4ED8]/30 cursor-pointer select-none overflow-hidden h-full">
                {/* Image Header */}
                <div className="relative w-full h-48 shrink-0 overflow-hidden bg-slate-900 border-b-2 border-blue-600 group-hover:border-blue-500 transition-colors duration-500">
                  <Image 
                    src={insight.image} 
                    alt={insight.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.05] transition-all duration-700"
                  />
                  {/* Duotone Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1D4ED8] to-[#0F766E] mix-blend-multiply opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  {/* Bottom shadow blend */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90" />
                  
                  {/* Floating Category Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-extrabold tracking-widest text-white uppercase shadow-lg group-hover:bg-[#1D4ED8]/80 group-hover:border-[#1D4ED8] transition-colors duration-500">
                    {insight.category}
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div className="flex-1 flex flex-col">
                    {/* Title */}
                    <div className="mb-4 mt-2">
                      <h3 className="text-xl font-black leading-snug text-foreground group-hover:text-[#2563EB] transition-colors duration-300 line-clamp-2 flex items-start justify-between gap-3">
                        <span>{insight.title}</span>
                        <ArrowRight className="w-5 h-5 shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#2563EB] mt-0.5" />
                      </h3>
                    </div>

                    {/* Content Area */}
                    <div className="relative flex-1 overflow-hidden">
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-medium">
                        {insight.desc}
                      </p>
                    </div>
                  </div>

                  {/* Footer Hint Action Line */}
                  <div className="pt-4 border-t border-border/60 mt-4 flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
                    <span>{insight.date}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/60 group-hover:text-[#2563EB] transition-colors duration-300">
                      Read Report &rarr;
                    </span>
                  </div>
                </div>
              </TiltCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
