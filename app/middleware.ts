// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const protectedPaths = ["/api/users", "/dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  if (!isProtected) return NextResponse.next();
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new NextResponse(
      JSON.stringify({ error: "توکن احراز هویت ارسال نشده" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(payload);
    return NextResponse.next();
  } catch (err: any) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ error: "توکن نامعتبر یا منقضی شده" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }
}
export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
