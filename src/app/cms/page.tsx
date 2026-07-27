

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { CMSContent } from "@/components/CMSContent";

export default async function CMS() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Fetch all posts (both published and draft) including author details
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { name: true }
      }
    }
  });

  const serializedPosts = JSON.parse(JSON.stringify(posts));

  return (
    <div className="flex flex-col min-h-dvh bg-transparent p-6 md:p-12 relative overflow-hidden">
      {/* Soft background shading */}
      <div className="absolute inset-0 bg-background -z-10" />
      
      <div className="max-w-6xl mx-auto w-full space-y-8 mt-24 relative z-10">
        
        {/* Header Section */}
        <div className="space-y-1.5 pb-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/20 dark:border-white/20 text-[13px] font-extrabold uppercase tracking-[0.15em] text-black dark:text-white shadow-[0_0_25px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.15)] ring-1 ring-black/10 dark:ring-white/15">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
              <span className="relative inline-flex rounded-full w-2 h-2 bg-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,1)]"></span>
            </span>
            Marketing & Editorial Hub
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0A1F44] dark:text-white">CMS Portal</h1>
          <p className="text-muted-foreground text-lg font-semibold">Manage your company blog posts, technical insights, and white paper library.</p>
        </div>

        {/* CMS Dashboard Components */}
        <CMSContent initialPosts={serializedPosts} />

      </div>
    </div>
  );
}
