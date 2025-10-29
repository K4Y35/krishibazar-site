import { NextResponse } from "next/server";

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function POST(req) {
  try {
    const body = await req.json();

    const resp = await fetch(`${BACKEND_BASE}/user/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });

    const data = await resp.json();

    // For pending users or errors, just return response without setting cookie
    if (!resp.ok || !data?.success) {
      return NextResponse.json(data, { status: resp.status || 400 });
    }

    const payload = data?.data || data;
    const token = payload?.token;

    const response = NextResponse.json(data, { status: 200 });

    if (token) {
      const isProd = process.env.NODE_ENV === "production";
      const cookie = [
        `kb_access=${token}`,
        "Path=/",
        "HttpOnly",
        "SameSite=Strict",
        isProd ? "Secure" : "",
        "Max-Age=86400",
      ]
        .filter(Boolean)
        .join("; ");
      response.headers.set("Set-Cookie", cookie);
    }

    return response;
  } catch (e) {
    return NextResponse.json({ success: false, message: "Login failed" }, { status: 500 });
  }
}


