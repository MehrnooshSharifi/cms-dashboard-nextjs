import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = await NextResponse.json({ message: "خروج موفق" });
  res.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
  return res;
}
