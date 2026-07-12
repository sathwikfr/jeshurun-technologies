import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { caseStudiesData } from "@/lib/caseStudiesData";

export function RelatedCaseStudies({ category }: { category?: string }) {
  // Try to find case studies matching the category or keywords
  let related = caseStudiesData.filter((c) => c.category.toLowerCase().includes(category?.toLowerCase() || ""));
  
  // Fallback to top 2 case studies if none match exactly
  if (related.length < 2) {
    related = caseStudiesData.slice(0, 2);
  } else {
    related = related.slice(0, 2);
  }

  if (!related || related.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-card border-t border-border">
      <div className="container px-6 sm:px-8 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-editorial text-foreground mb-4">Related Case Studies</h2>
            <p className="text-muted-foreground max-w-xl">See how we've helped other organizations transform their operations and achieve measurable impact.</p>
          </div>
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest">
            View All Work <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {related.map((study) => (
            <Link key={study.id} href={`/case-studies/${study.id}`} className="group block">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-border">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md">
                    {study.industry}
                  </span>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-editorial font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {study.title}
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                {study.excerpt || study.challenge}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
