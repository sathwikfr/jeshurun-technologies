"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, ShieldAlert, ArrowRight } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { insightsData, InsightArticle } from "@/lib/insightsData";

export default function InsightArticlePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const article = insightsData.find((a) => a.slug === slug);
  const relatedArticles = insightsData.filter((a) => a.slug !== slug);

  const [activeHeading, setActiveHeading] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  // Extract headings for Table of Contents
  const headings = article
    ? article.content
        .split("\n")
        .filter((line) => line.startsWith("## "))
        .map((line) => {
          const text = line.replace("## ", "").trim();
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
          return { text, id };
        })
    : [];

  useEffect(() => {
    if (!article) return;

    const handleScroll = () => {
      const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
      
      let currentActive = "";
      const scrollPosition = window.scrollY + 160;

      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          currentActive = el.id;
        } else {
          break;
        }
      }
      
      if (currentActive) {
        setActiveHeading(currentActive);
      } else if (headings.length > 0) {
        setActiveHeading(headings[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [article, headings]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
        <h1 className="text-3xl font-bold mb-4">Report Not Found</h1>
        <p className="text-muted-foreground mb-8">The requested insight report does not exist or has been archived.</p>
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
          <ArrowLeft size={16} /> Return to Homepage
        </Link>
      </div>
    );
  }

  const handleRelatedClick = (e: React.MouseEvent, relatedSlug: string) => {
    e.preventDefault();
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(`/insights/${relatedSlug}`);
      });
    } else {
      router.push(`/insights/${relatedSlug}`);
    }
  };

  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, index) => {
      // Headers
      if (block.startsWith("## ")) {
        const text = block.replace("## ", "").trim();
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return (
          <h2
            key={index}
            id={id}
            className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-12 mb-6 scroll-mt-28 border-b border-border/70 pb-3"
          >
            {text}
          </h2>
        );
      }
      if (block.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-bold text-foreground tracking-tight mt-8 mb-4">
            {block.replace("### ", "")}
          </h3>
        );
      }

      // Bullet lists
      if (block.startsWith("- ") || block.startsWith("* ")) {
        const items = block.split(/\n[*-] /);
        return (
          <ul key={index} className="list-disc list-inside space-y-3.5 my-6 pl-4 text-muted-foreground font-medium text-base">
            {items.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item.replace(/^[*-] /, "").replace(/^\n/, "")}
              </li>
            ))}
          </ul>
        );
      }

      // Regular Paragraphs
      return (
        <p key={index} className="text-muted-foreground font-medium leading-relaxed my-6 text-base md:text-lg">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-background pb-24">
      {/* Hero Header Area */}
      <section className="w-full pt-32 pb-20 relative overflow-hidden bg-slate-950 text-white shadow-xl">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={article.image}
            alt={article.title}
            style={{ viewTransitionName: `insight-image-${article.slug}` }}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12)_0%,transparent_60%)]" />
        </div>

        <div className="container px-6 sm:px-8 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Back button */}
            <Link
              href="/#insights"
              className="inline-flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/15 transition-all duration-300 backdrop-blur-md w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </Link>

            <div className="flex items-center gap-3 flex-wrap pt-2">
              <span className="text-[10px] font-black text-white uppercase tracking-widest bg-blue-600 px-3 py-1 rounded-full border border-blue-500/30">
                {article.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] max-w-3xl">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-white/70 pt-6 border-t border-white/10">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" /> By {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" /> {article.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" /> {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container px-6 sm:px-8 mx-auto mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Table of Contents - Sidebar */}
          <aside className="lg:col-span-3 lg:block hidden">
            <SpotlightCard className="sticky top-28 p-0 space-y-5">
              <h4 className="text-xs font-black uppercase text-foreground tracking-wider pb-3 border-b border-border/60">
                Table of Contents
              </h4>
              <nav className="flex flex-col space-y-3">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(h.id);
                      if (element) {
                        window.scrollTo({
                          top: element.offsetTop - 100,
                          behavior: "smooth",
                        });
                        setActiveHeading(h.id);
                      }
                    }}
                    className={`text-xs font-bold leading-relaxed transition-all duration-300 hover:text-[#2563EB] ${
                      activeHeading === h.id
                        ? "text-[#2563EB] pl-2 border-l-2 border-[#2563EB]"
                        : "text-muted-foreground pl-0"
                    }`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </SpotlightCard>
          </aside>

          {/* Article Text Content */}
          <main className="lg:col-span-9 bg-card border border-border p-8 sm:p-12 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.01)]">
            {article.excerpt && (
              <p className="text-lg md:text-xl font-bold text-foreground leading-relaxed border-b border-border pb-8 mb-8">
                {article.excerpt}
              </p>
            )}

            <article ref={contentRef} className="prose dark:prose-invert max-w-none">
              {renderContent(article.content)}
            </article>

            {/* SLA Secure Footer Disclaimer */}
            <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#2563EB]/10 p-3 rounded-2xl text-[#2563EB] dark:bg-[#2563EB]/20">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-extrabold text-foreground block">Jeshurun Advisory Group</span>
                  <span className="text-[11px] text-muted-foreground font-bold block">Enterprise Telemetry Team</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-900 border border-border px-4 py-1.5 rounded-full">
                <ShieldAlert className="w-4 h-4 text-[#2563EB]" /> SECURE ADVISORY REPORT
              </div>
            </div>
          </main>
        </div>

        {/* Related Articles Section */}
        <section className="max-w-6xl mx-auto mt-20 pt-16 border-t border-border/80">
          <div className="space-y-2 mb-10">
            <span className="text-[10px] font-black uppercase text-[#2563EB] tracking-widest block">
              Continue Reading
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Related Research Reports
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {relatedArticles.map((rel) => (
              <div
                key={rel.slug}
                onClick={(e) => handleRelatedClick(e, rel.slug)}
                className="group relative flex flex-col bg-card border border-border rounded-3xl overflow-hidden hover-card-effect cursor-pointer"
              >
                {/* Header Image */}
                <div className="h-48 w-full overflow-hidden relative bg-slate-950">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black uppercase text-[#2563EB] tracking-wider block">
                      {rel.category}
                    </span>
                    <h3 className="text-lg font-black text-foreground leading-snug group-hover:text-[#2563EB] transition-colors duration-300">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {rel.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/60">
                    <span className="text-[10px] text-muted-foreground font-semibold">
                      {rel.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB]">
                      Read Report <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
