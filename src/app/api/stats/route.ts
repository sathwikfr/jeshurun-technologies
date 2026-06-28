import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const clientsCount = await prisma.client.count();
    const leadsCount = await prisma.lead.count();

    // We fallback to at least 14 clients and 45 engineers as realistic seed minimums
    return NextResponse.json({
      clientsCount: Math.max(clientsCount, 14),
      experienceYears: 8, // founded in 2018
      engineersCount: 45,
      leadsCount,
    });
  } catch (error) {
    console.error("Failed to fetch public stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
