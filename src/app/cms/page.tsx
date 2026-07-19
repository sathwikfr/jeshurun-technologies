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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0057D9]/5 border border-[#0057D9]/10 text-xs font-bold uppercase tracking-wider text-[#0057D9]">
            Marketing & Editorial Hub
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0A1F44]">CMS Portal</h1>
          <p className="text-muted-foreground text-lg font-semibold">Manage your company blog posts, technical insights, and white paper library.</p>
        </div>

        {/* CMS Dashboard Components */}
        <CMSContent initialPosts={serializedPosts} />

      </div>
    </div>
  );
}
