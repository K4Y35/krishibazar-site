import { NextResponse } from "next/server";

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

async function handle(method, req) {
  try {
    const url = new URL(req.url);
    const path = url.searchParams.get("path");
    if (!path) {
      return NextResponse.json({ success: false, message: "Missing path" }, { status: 400 });
    }

    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader
      .split(/;\s*/)
      .map((c) => c.split("="))
      .find(([k]) => k === "kb_access")?.[1];

    const headers = { Accept: "application/json" };
    // Content-Type for JSON only when body is plain object
    if (req.headers.get("content-type")?.includes("application/json")) {
      headers["Content-Type"] = "application/json";
    }
    if (token) {
      headers["Authorization"] = `Bearer ${decodeURIComponent(token)}`;
    }

    const body = method === "GET" || method === "DELETE" ? undefined : await req.text();

    const backendResp = await fetch(`${BACKEND_BASE}${path}`, {
      method,
      headers,
      body,
    });

    const resText = await backendResp.text();
    const isJson = backendResp.headers.get("content-type")?.includes("application/json");
    const payload = isJson ? JSON.parse(resText || "{}") : resText;

    return NextResponse.json(payload, { status: backendResp.status });
  } catch (e) {
    return NextResponse.json({ success: false, message: "Proxy error" }, { status: 500 });
  }
}

export async function GET(req) { return handle("GET", req); }
export async function POST(req) { return handle("POST", req); }
export async function PUT(req) { return handle("PUT", req); }
export async function DELETE(req) { return handle("DELETE", req); }


