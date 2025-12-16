import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const total = await prisma.user.count();

    const thisMonth = await prisma.user.count({
      where: {
        createdAt: { gte: startOfMonth },
      },
    });

    const lastMonth = await prisma.user.count({
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
      },
    });

    const latestUsers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const lastUser = latestUsers[0] || null;

    return NextResponse.json({
      total,
      thisMonth,
      lastMonth,
      latestUsers,
      lastUser,
    });
  } catch (error) {
    console.error("STATS ERROR:", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
