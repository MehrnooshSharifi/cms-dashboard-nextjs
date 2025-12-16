import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const page = Math.max(Number(url.searchParams.get("page") || 1), 1);
    const limit = Math.min(
      Math.max(Number(url.searchParams.get("limit") || 10), 1),
      100
    );
    const q = url.searchParams.get("q")?.trim() || "";
    console.log("🔍 search query:", q);
    const where = q
      ? {
          OR: [
            { name: { contains: q.toLowerCase() } },
            { email: { contains: q.toLowerCase() } },
          ],
        }
      : {};

    const skip = (page - 1) * limit;
    const total = await prisma.user.count({ where });

    const users = await prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { id: "asc" },
    });
    console.log("👤 found users:", users);
    return NextResponse.json({
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    console.error("GET USERS ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "name و email اجباری هستند" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
