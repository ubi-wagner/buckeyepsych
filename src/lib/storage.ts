import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const UPLOAD_DIR =
  process.env.UPLOAD_DIR || path.join(process.cwd(), "data", "uploads");

export async function ensureUploadDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

export type StoredFile = {
  fileName: string;
  filePath: string;
  size: number;
  mimeType: string;
};

export async function saveUpload(file: File): Promise<StoredFile> {
  await ensureUploadDir();
  const ext = path.extname(file.name) || "";
  const base = path
    .basename(file.name, ext)
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 80);
  const token = crypto.randomBytes(6).toString("hex");
  const fileName = `${Date.now()}-${token}-${base}${ext}`;
  const abs = path.join(UPLOAD_DIR, fileName);
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(abs, bytes);
  return {
    fileName,
    filePath: fileName,
    size: bytes.length,
    mimeType: file.type || "application/octet-stream",
  };
}

export async function deleteUpload(fileName: string) {
  try {
    await fs.unlink(path.join(UPLOAD_DIR, fileName));
  } catch {
    /* ignore */
  }
}

export function publicFileUrl(fileName: string) {
  return `/api/files/${encodeURIComponent(fileName)}`;
}
