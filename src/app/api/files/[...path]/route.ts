import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { UPLOAD_DIR } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { path: string[] } }
) {
  // Sanitize path segments: letters, digits, dot, underscore, hyphen.
  const segments = (params.path || []).map((p) =>
    p.replace(/[^a-zA-Z0-9._-]/g, "_")
  );
  if (segments.length === 0) {
    return new NextResponse("not found", { status: 404 });
  }
  const resolved = path.resolve(UPLOAD_DIR, ...segments);
  const root = path.resolve(UPLOAD_DIR);
  if (!resolved.startsWith(root)) {
    return new NextResponse("bad request", { status: 400 });
  }
  try {
    const buf = await fs.readFile(resolved);
    const ext = path.extname(resolved).toLowerCase();
    const type =
      ext === ".pdf"
        ? "application/pdf"
        : ext === ".png"
          ? "image/png"
          : ext === ".jpg" || ext === ".jpeg"
            ? "image/jpeg"
            : ext === ".gif"
              ? "image/gif"
              : ext === ".webp"
                ? "image/webp"
                : "application/octet-stream";
    return new NextResponse(buf, {
      headers: {
        "Content-Type": type,
        "Content-Disposition": `inline; filename="${path.basename(resolved)}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("not found", { status: 404 });
  }
}
