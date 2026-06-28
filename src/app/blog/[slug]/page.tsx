import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, ShieldAlert } from "lucide-react";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // Fetch the blog post by slug from database
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: {
        select: { name: true, email: true }
      }
    }
  });

  if (!post || !post.published) {
    notFound();
  }

  // Simple renderer to format markdown-like content into HTML structures
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, index) => {
      // Headers
      if (block.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-extrabold text-[#0A1F44] tracking-tight mt-8 mb-4 border-b border-border pb-2">
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-bold text-[#0A1F44] tracking-tight mt-6 mb-3">
            {block.replace("### ", "")}
          </h3>
        );
      }

      // Bullet lists
      if (block.startsWith("- ") || block.startsWith("* ")) {
        const items = block.split(/\n[*-] /);
        return (
          <ul key={index} className="list-disc list-inside space-y-2.5 my-5 pl-4 text-muted-foreground font-medium">
            {items.map((item, i) => (
              <li key={i}>{item.replace(/^[*-] /, "").replace(/^\n/, "")}</li>
            ))}
          </ul>
        );
      }

      // Numbered lists
      if (block.match(/^\d+\.\s/)) {
        const items = block.split(/\n\d+\.\s/);
        return (
          <ol key={index} className="list-decimal list-inside space-y-2.5 my-5 pl-4 text-muted-foreground font-medium">
            {items.map((item, i) => (
              <li key={i}>{item.replace(/^\d+\.\s/, "").replace(/^\n/, "")}</li>
            ))}
          </ol>
        );
      }

      // Blockquotes
      if (block.startsWith("> ")) {
        return (
          <blockquote key={index} className="border-l-4 border-[#0057D9] bg-background dark:bg-slate-900/50 p-4 rounded-r-xl italic my-6 text-muted-foreground">
            {block.replace(/^>\s*/, "")}
          </blockquote>
        );
      }

      // Regular Paragraphs
      return (
        <p key={index} className="text-muted-foreground font-medium leading-relaxed my-4 text-base">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]/50 pb-24">
      
      {/* Blog Article Hero Header */}
      <section className={`w-full pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br ${post.gradient || "from-blue-900 to-slate-900"} relative overflow-hidden text-white shadow-lg`}>
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="container px-6 sm:px-8 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto space-y-5">
            
            {/* Back button */}
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white bg-card/10 hover:bg-card/20 px-3.5 py-1.5 rounded-full border border-white/10 transition-colors w-fit"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Insights
            </Link>

            <div className="flex items-center gap-3 flex-wrap pt-2">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-card/15 px-2.5 py-1 rounded-full border border-white/20">
                {post.tag || "Insight"}
              </span>
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-white/80 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-white/60" /> By {post.author?.name || "Jeshurun Editorial"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-white/60" /> {new Date(post.createdAt).toLocaleDateString("en-IE", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-white/60" /> {post.readTime || "5 min read"}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Article Content Layout */}
      <div className="container px-6 sm:px-8 mx-auto -mt-8 relative z-20">
        <div className="max-w-3xl mx-auto bg-card border border-border p-8 sm:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
          
          {post.excerpt && (
            <div className="text-lg font-bold text-foreground leading-relaxed border-b border-border pb-6 mb-6">
              {post.excerpt}
            </div>
          )}

          {/* Render formatted content */}
          <article className="space-y-6">
            {renderContent(post.content)}
          </article>

          {/* Footer commitment disclaimer */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#0057D9]/10 p-2 rounded-xl text-[#0057D9]">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Jeshurun Editorial Board</span>
                <span className="text-[10px] text-muted-foreground font-semibold block">Verified corporate intelligence</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-wider bg-background border border-border px-3 py-1 rounded-full">
              <ShieldAlert className="w-3.5 h-3.5 text-[#0057D9]" /> SLA SECURE REPORT
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
