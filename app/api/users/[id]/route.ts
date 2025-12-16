import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = Number(id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "شناسه معتبر نیست" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (e) {
    console.error("GET USER ERROR:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = Number(id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "شناسه معتبر نیست" }, { status: 400 });
    }

    const body = await req.json();
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "نام و ایمیل اجباری است" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error("UPDATE USER ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = Number(id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "شناسه معتبر نیست" }, { status: 400 });
    }

    await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json({ message: "کاربر حذف شد" });
  } catch (error: any) {
    console.error("DELETE USER ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
