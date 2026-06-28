import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clients = await prisma.client.findMany({
      orderBy: { name: "asc" },
      include: { owner: { select: { name: true } } }
    });

    return NextResponse.json({ clients }, { status: 200 });
  } catch (error) {
    console.error("Clients API GET Error:", error);
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
    const { name, contact } = body;

    if (!name) {
      return NextResponse.json({ error: "Required fields (Name) are missing" }, { status: 400 });
    }

    const client = await prisma.client.create({
      data: {
        name,
        contact: contact || "",
        ownerId: (session.user as { id?: string }).id || null,
      }
    });

    // Log Activity
    try {
      await prisma.activity.create({
        data: {
          type: "Client Created",
          description: `Active client partner '${name}' was added.`,
          userId: (session.user as { id?: string }).id || "",
        }
      });
    } catch (actErr) {
      console.error("Activity logging failed on client creation:", actErr);
    }

    return NextResponse.json({ success: true, client }, { status: 201 });
  } catch (error) {
    console.error("Clients API POST Error:", error);
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
      return NextResponse.json({ error: "Missing Client ID parameter" }, { status: 400 });
    }

    // Fetch client details first to log its name
    const client = await prisma.client.findUnique({
      where: { id }
    });

    await prisma.client.delete({
      where: { id }
    });

    // Log Activity
    if (client) {
      try {
        await prisma.activity.create({
          data: {
            type: "Client Deleted",
            description: `Client partner '${client.name}' was deleted.`,
            userId: (session.user as { id?: string }).id || "",
          }
        });
      } catch (actErr) {
        console.error("Activity logging failed on client deletion:", actErr);
      }
    }

    return NextResponse.json({ success: true, message: "Client deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Clients API DELETE Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
