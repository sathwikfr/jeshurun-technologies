"use client";



import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { motion, type Variants } from "framer-motion";

import Link from "next/link";

import { ArrowRight, Clock, Calendar, Tag, Loader2 } from "lucide-react";

import { SpotlightCard } from "@/components/SpotlightCard";

const categories = ["All", "Cloud", "AI & Automation", "Security", "Infrastructure", "Consulting"];

const mockFallbackPosts = [
  {
    id: "1",
    category: "Security",
    tag: "Research Report",
    title: "Why Today's Cyber Talent Model Is Broken â€” And How to Fix It",
    excerpt: "Cybersecurity needs hybrid technical and strategic skills, but the workforce hasn't kept pace. Learn the three moves organizations can make to build resilience from within.",
    author: "Jeshurun Editorial",
    date: "June 10, 2026",
    readTime: "8 min read",
    accent: "#0057D9",
    href: "/technology/cybersecurity",
    gradient: "from-blue-600 to-indigo-700",
    featured: true,
  },
  {
    id: "2",
    category: "AI & Automation",
    tag: "Research Report",
    title: "Reinventing for Human + AI Engineering",
    excerpt: "Combining machine capability and executive coordination to multiply development velocity and secure enterprise-grade systems.",
    author: "Jeshurun Editorial",
    date: "June 3, 2026",
    readTime: "6 min read",
    accent: "#4F46E5",
    href: "/technology/ai-machine-learning",
    gradient: "from-indigo-600 to-purple-700",
    featured: false,
  },
  {
    id: "3",
    category: "Cloud",
    tag: "White Paper",
    title: "The Cloud Scalability Matrix",
    excerpt: "Assessing multi-tenant cloud efficiencies, containerization overheads, and automatic horizontal scaling margins under peak transaction volumes.",
    author: "Jeshurun Editorial",
    date: "May 27, 2026",
    readTime: "10 min read",
    accent: "#0284C7",
    href: "/technology/cloud-solutions",
    gradient: "from-sky-600 to-blue-700",
    featured: false,
  },
  {
    id: "4",
    category: "Infrastructure",
    tag: "Guide",
    title: "Zero-Downtime Migration Playbook for Enterprise Systems",
    excerpt: "A comprehensive guide to planning and executing infrastructure migrations without disrupting critical business operations.",
    author: "Jeshurun Editorial",
    date: "May 20, 2026",
    readTime: "12 min read",
    accent: "#0057D9",
    href: "/services/infrastructure-management",
    gradient: "from-blue-700 to-cyan-600",
    featured: false,
  },
  {
    id: "5",
    category: "Consulting",
    tag: "Insight",
    title: "Aligning IT Strategy with Business Outcomes in 2026",
    excerpt: "How leading enterprises are closing the gap between technology investments and measurable revenue impact through structured IT governance.",
    author: "Jeshurun Editorial",
    date: "May 14, 2026",
    readTime: "7 min read",
    accent: "#4F46E5",
    href: "/services/it-consulting",
    gradient: "from-violet-600 to-indigo-700",
    featured: false,
  },
  {
    id: "6",
    category: "AI & Automation",
    tag: "Case Study",
    title: "How Automated Test Management Reduced Defect Rates by 60%",
    excerpt: "A deep-dive into how a major pharmaceutical client achieved 60% fewer production defects by overhauling their QA pipeline with AI-assisted testing.",
    author: "Jeshurun Editorial",
    date: "May 7, 2026",
    readTime: "9 min read",
    accent: "#0057D9",
    href: "/services/test-management",
    gradient: "from-blue-600 to-sky-500",
    featured: false,
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 22 } },
};

interface FormattedPost {
  id: string;
  category: string;
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  accent: string;
  href: string;
  gradient: string;
  featured: boolean;
}

export default function BlogPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState<FormattedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch("/api/posts");
        if (res.ok) {
          const data = await res.json();
          if (data.posts && data.posts.length > 0) {
            // Remap database fields to match display format
            const formatted = data.posts.map((p: {
              id: string;
              category: string;
              tag: string | null;
              title: string;
              excerpt: string | null;
              content: string;
              author?: { name: string | null } | null;
              createdAt: string;
              readTime: string | null;
              accent: string | null;
              slug: string;
              gradient: string | null;
              featured: boolean;
            }) => ({
              id: p.id,
              category: p.category,
              tag: p.tag || "Insight",
              title: p.title,
              excerpt: p.excerpt || p.content.substring(0, 150) + "...",
              author: p.author?.name || "Jeshurun Editorial",
              date: new Date(p.createdAt).toLocaleDateString("en-IE", { month: "long", day: "numeric", year: "numeric" }),
              readTime: p.readTime || "5 min read",
              accent: p.accent || "#0057D9",
              href: `/blog/${p.slug}`,
              gradient: p.gradient || "from-blue-600 to-indigo-700",
              featured: p.featured || false,
            }));
            setPosts(formatted);
          } else {
            setPosts(mockFallbackPosts);
          }
        } else {
          setPosts(mockFallbackPosts);
        }
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
        setPosts(mockFallbackPosts);
      } finally {
        setIsLoading(false);
      }
    }
    loadPosts();
  }, []);

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const featured = filtered.find(p => p.featured) || filtered[0];
  const rest = filtered.filter(p => p.id !== featured?.id);

  return (
    <div className="min-h-dvh bg-background">

      {/* Hero Header */}
      <section className="w-full min-h-dvh pt-24 pb-12 md:pt-32 flex items-center bg-background relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,87,217,0.08)_0%,transparent_60%)] pointer-events-none z-[2]" />
        <div className="w-full container px-6 sm:px-8 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-wider text-primary border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Corporate Intelligence
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
              Insights &amp; Research Reports
            </h1>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
              Engineering audits, AI telemetry models, and digital transformation guides from the Jeshurun Technologies research team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-14 z-30 w-full bg-card border-b border-border shadow-sm">
        <div className="w-full container px-6 sm:px-8 mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#0057D9] text-white shadow-sm"
                    : "bg-slate-100 text-muted-foreground hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full container px-6 sm:px-8 mx-auto py-16 space-y-16">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <Loader2 className="h-8 w-8 text-[#0057D9] animate-spin" />
            <p className="text-sm font-bold text-muted-foreground">Loading dynamic insights...</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <motion.div
                key={featured.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Link href={featured.href} className="group block">
                  <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${featured.gradient} p-10 md:p-14 min-h-[320px] flex flex-col justify-end shadow-2xl`}>
                    <div className="absolute inset-0 opacity-15 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="relative z-10 space-y-3 max-w-2xl">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest bg-card/15 px-2.5 py-1 rounded-full border border-white/20">
                          {featured.tag}
                        </span>
                        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                          {featured.category}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight group-hover:text-blue-100 transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-white/70 text-sm leading-relaxed">{featured.excerpt}</p>
                      <div className="flex items-center gap-4 pt-2">
                        <span className="flex items-center gap-1.5 text-xs text-white/60">
                          <Calendar className="w-3.5 h-3.5" /> {featured.date}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-white/60">
                          <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-white/90 ml-auto group-hover:translate-x-0.5 transition-transform">
                          Read Report <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Article Grid */}
            {rest.length > 0 && (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {rest.map((post) => (
                  <motion.div key={post.id} variants={item}>
                    <div onClick={() => router.push(post.href)} className="group block h-full cursor-pointer outline-none">
                      <SpotlightCard className="h-full flex flex-col p-0 hover-card-effect overflow-hidden">
                        {/* Color bar */}
                        <div className={`h-1.5 bg-gradient-to-r ${post.gradient}`} />

                        <div className="flex flex-col flex-1 p-7 space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 text-muted-foreground flex items-center gap-1">
                              <Tag className="w-2.5 h-2.5" /> {post.tag}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                              {post.category}
                            </span>
                          </div>

                          <h3 className="text-lg font-extrabold text-[#0A1F44] tracking-tight leading-snug group-hover:text-[#0057D9] transition-colors duration-200 flex-1">
                            {post.title}
                          </h3>

                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                <Calendar className="w-3 h-3" /> {post.date}
                              </span>
                              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                <Clock className="w-3 h-3" /> {post.readTime}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground/60 group-hover:text-[#0057D9] group-hover:translate-x-0.5 transition-all duration-200" />
                          </div>
                        </div>
                      </SpotlightCard>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground font-semibold">
                No articles found in this category.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
