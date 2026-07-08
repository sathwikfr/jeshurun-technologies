import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: { owner: { select: { name: true, email: true } } }
    });

    return NextResponse.json({ leads }, { status: 200 });
  } catch (error) {
    console.error("Leads API GET Error:", error);
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
    const { firstName, lastName, email, company, message, source, status } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "Required fields (First Name, Last Name, Email) are missing" }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        company: company || "",
        message: message || "",
        source: source || "Manual",
        status: status || "New",
        ownerId: (session.user as { id?: string }).id || null,
      }
    });

    // Log Activity
    try {
      await prisma.activity.create({
        data: {
          type: "Lead Created",
          description: `New lead '${firstName} ${lastName}' added manually.`,
          userId: (session.user as { id?: string }).id || "",
        }
      });
    } catch (actErr) {
      console.error("Activity logging failed on lead creation:", actErr);
    }

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error("Leads API POST Error:", error);
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
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing Lead ID or Status" }, { status: 400 });
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { status }
    });

    // Log Activity
    try {
      await prisma.activity.create({
        data: {
          type: "Lead Status Updated",
          description: `Lead '${updatedLead.firstName} ${updatedLead.lastName}' status updated to '${status}'.`,
          userId: (session.user as { id?: string }).id || "",
        }
      });
    } catch (actErr) {
      console.error("Activity logging failed on lead status update:", actErr);
    }

    return NextResponse.json({ success: true, lead: updatedLead }, { status: 200 });
  } catch (error) {
    console.error("Leads API PATCH Error:", error);
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
      return NextResponse.json({ error: "Missing Lead ID parameter" }, { status: 400 });
    }

    // Fetch lead details first to log its name
    const lead = await prisma.lead.findUnique({
      where: { id }
    });

    await prisma.lead.delete({
      where: { id }
    });

    // Log Activity
    if (lead) {
      try {
        await prisma.activity.create({
          data: {
            type: "Lead Deleted",
            description: `Lead '${lead.firstName} ${lead.lastName}' was deleted.`,
            userId: (session.user as { id?: string }).id || "",
          }
        });
      } catch (actErr) {
        console.error("Activity logging failed on lead deletion:", actErr);
      }
    }

    return NextResponse.json({ success: true, message: "Lead deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Leads API DELETE Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
