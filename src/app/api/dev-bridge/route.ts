import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, filePath, content } = body;

    if (!filePath) {
      return NextResponse.json({ success: false, error: "filePath required" }, { status: 400 });
    }

    if (action === "read") {
      if (!fs.existsSync(filePath)) {
        return NextResponse.json({ success: false, error: "File not found" }, { status: 404 });
      }
      const data = fs.readFileSync(filePath, "utf-8");
      return NextResponse.json({ success: true, data });
    }

    if (action === "write") {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, content, "utf-8");
      return NextResponse.json({ success: true });
    }

    if (action === "delete") {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
