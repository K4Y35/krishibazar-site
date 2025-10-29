import { NextResponse } from "next/server";

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const sender_id = url.searchParams.get("sender_id");

    // Get token from cookie
    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader
      .split(/;\s*/)
      .map((c) => c.split("="))
      .find(([k]) => k === "kb_access")?.[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${decodeURIComponent(token)}`,
    };

    // Fetch messages from backend
    const backendResp = await fetch(
      `${BACKEND_BASE}/user/chat/messages${sender_id ? `?sender_id=${sender_id}` : ""}`,
      {
        method: "GET",
        headers,
      }
    );

    const data = await backendResp.json();

    return NextResponse.json(data, { status: backendResp.status });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

