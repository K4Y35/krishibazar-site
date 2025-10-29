import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  const isProd = process.env.NODE_ENV === "production";
  const cookie = [
    "kb_access=",
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    isProd ? "Secure" : "",
    "Max-Age=0",
  ]
    .filter(Boolean)
    .join("; ");
  response.headers.set("Set-Cookie", cookie);
  return response;
}


