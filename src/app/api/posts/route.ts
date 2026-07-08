import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const adminMode = searchParams.get("admin") === "true";

    let posts;
    if (adminMode && session) {
      // Admins can see all posts (published and drafts)
      posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true } } }
      });
    } else {
      // Public gets only published posts
      posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true } } }
      });
    }

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Posts API GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug, content, category, tag, excerpt, readTime, gradient, accent, published } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Required fields (Title, Slug, Content) are missing" }, { status: 400 });
    }

    // Check slug uniqueness
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug must be unique. This slug already exists." }, { status: 400 });
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        category: category || "General",
        tag: tag || "Insight",
        excerpt: excerpt || content.substring(0, 150) + "...",
        readTime: readTime || "5 min read",
        gradient: gradient || "from-blue-600 to-indigo-700",
        accent: accent || "#0057D9",
        published: published ?? false,
        authorId: (session.user as { id?: string }).id || "",
      }
    });

    // Log Activity
    try {
      await prisma.activity.create({
        data: {
          type: "Article Created",
          description: `New blog article '${title}' was created.`,
          userId: (session.user as { id?: string }).id || "",
        }
      });
    } catch (actErr) {
      console.error("Activity logging failed on post creation:", actErr);
    }

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error("Posts API POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, published, title, content, category, tag, excerpt, readTime } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing Post ID" }, { status: 400 });
    }

    const dataToUpdate: Partial<Prisma.BlogPostUpdateInput> = {};
    if (published !== undefined) dataToUpdate.published = published;
    if (title !== undefined) dataToUpdate.title = title;
    if (content !== undefined) dataToUpdate.content = content;
    if (category !== undefined) dataToUpdate.category = category;
    if (tag !== undefined) dataToUpdate.tag = tag;
    if (excerpt !== undefined) dataToUpdate.excerpt = excerpt;
    if (readTime !== undefined) dataToUpdate.readTime = readTime;

    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: dataToUpdate
    });

    // Log Activity
    try {
      await prisma.activity.create({
        data: {
          type: "Article Updated",
          description: `Blog article '${updatedPost.title}' status/metadata was modified.`,
          userId: (session.user as { id?: string }).id || "",
        }
      });
    } catch (actErr) {
      console.error("Activity logging failed on post update:", actErr);
    }

    return NextResponse.json({ success: true, post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error("Posts API PATCH Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing Post ID parameter" }, { status: 400 });
    }

    // Fetch post details first to log its title
    const post = await prisma.blogPost.findUnique({
      where: { id }
    });

    await prisma.blogPost.delete({
      where: { id }
    });

    // Log Activity
    if (post) {
      try {
        await prisma.activity.create({
          data: {
            type: "Article Deleted",
            description: `Blog article '${post.title}' was deleted.`,
            userId: (session.user as { id?: string }).id || "",
          }
        });
      } catch (actErr) {
        console.error("Activity logging failed on post deletion:", actErr);
      }
    }

    return NextResponse.json({ success: true, message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Posts API DELETE Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
