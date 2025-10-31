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
    const contentType = req.headers.get("content-type") || "";
    // Only set JSON content-type explicitly. For FormData, let fetch set boundary.
    if (contentType.includes("application/json")) {
      headers["Content-Type"] = "application/json";
    }
    if (token) {
      headers["Authorization"] = `Bearer ${decodeURIComponent(token)}`;
    }

    let body;
    if (method === "GET") {
      body = undefined;
    } else if (contentType.includes("multipart/form-data")) {
      const incoming = await req.formData();
      const fd = new FormData();
      for (const [key, value] of incoming.entries()) {
        fd.append(key, value);
      }
      body = fd;
      // Do NOT set Content-Type header manually for multipart
      delete headers["Content-Type"];
    } else if (contentType.includes("application/json")) {
      body = await req.text();
    } else {
      // Fallback: forward raw text/stream
      body = await req.text();
    }

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


