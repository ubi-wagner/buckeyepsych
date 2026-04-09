"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import slugify from "slugify";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { getSession, getCurrentUser } from "@/lib/session";
import { saveUpload, deleteUpload } from "@/lib/storage";
import { recordRevision } from "@/lib/revision";
import { setContent, type ContentKey } from "@/lib/content";

// ------------------------------------------------------------------
// AUTH
// ------------------------------------------------------------------

export async function loginAction(
  _prev: { error?: string } | undefined,
  formData: FormData
) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");
  if (!email || !password) return { error: "Email and password are required." };

  let user = await prisma.user.findUnique({ where: { email } });

  // Bootstrap the very first admin from ADMIN_EMAIL / ADMIN_PASSWORD env vars.
  if (!user) {
    const count = await prisma.user.count();
    if (
      count === 0 &&
      email === (process.env.ADMIN_EMAIL || "").toLowerCase() &&
      password === (process.env.ADMIN_PASSWORD || "")
    ) {
      user = await prisma.user.create({
        data: {
          email,
          passwordHash: await bcrypt.hash(password, 10),
          name: "Admin",
        },
      });
    } else {
      return { error: "Invalid credentials." };
    }
  } else {
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return { error: "Invalid credentials." };
  }

  const session = await getSession();
  session.userId = user.id;
  session.email = user.email;
  await session.save();
  redirect("/admin");
}

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
  redirect("/admin/login");
}

export async function changePasswordAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated." };
  const current = String(formData.get("current") || "");
  const next = String(formData.get("next") || "");
  if (next.length < 10)
    return { error: "New password must be at least 10 characters." };
  const ok = await bcrypt.compare(current, user.passwordHash);
  if (!ok) return { error: "Current password is incorrect." };
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(next, 10) },
  });
  return { ok: true };
}

// ------------------------------------------------------------------
// BLOG POSTS
// ------------------------------------------------------------------

const postSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().optional(),
  excerpt: z.string().max(500).optional().default(""),
  content: z.string().optional().default(""),
  tags: z.string().optional().default(""),
});

function toSlug(s: string) {
  return slugify(s, { lower: true, strict: true });
}

export async function createPostAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const parsed = postSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    tags: formData.get("tags"),
  });
  const slugBase = parsed.slug && parsed.slug.length > 0 ? parsed.slug : parsed.title;
  let slug = toSlug(slugBase);
  // Ensure unique
  let i = 2;
  while (await prisma.blogPost.findUnique({ where: { slug } })) {
    slug = `${toSlug(slugBase)}-${i++}`;
  }
  const tags = parsed.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const post = await prisma.blogPost.create({
    data: {
      title: parsed.title,
      slug,
      excerpt: parsed.excerpt,
      content: parsed.content,
      tags,
      published: false,
    },
  });
  await recordRevision({
    entityType: "BlogPost",
    entityId: post.id,
    data: post,
    authorId: user.id,
    authorEmail: user.email,
    action: "create",
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect(`/admin/blog/${post.id}`);
}

export async function updatePostAction(id: string, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) throw new Error("Post not found");

  const parsed = postSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    tags: formData.get("tags"),
  });
  const slugInput = parsed.slug && parsed.slug.length > 0 ? parsed.slug : parsed.title;
  let slug = toSlug(slugInput);
  if (slug !== existing.slug) {
    let i = 2;
    while (await prisma.blogPost.findUnique({ where: { slug } })) {
      slug = `${toSlug(slugInput)}-${i++}`;
    }
  }
  const tags = parsed.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const updated = await prisma.blogPost.update({
    where: { id },
    data: {
      title: parsed.title,
      slug,
      excerpt: parsed.excerpt,
      content: parsed.content,
      tags,
    },
  });
  await recordRevision({
    entityType: "BlogPost",
    entityId: id,
    data: updated,
    authorId: user.id,
    authorEmail: user.email,
    action: "update",
  });
  revalidatePath("/blog");
  revalidatePath(`/blog/${updated.slug}`);
  revalidatePath("/admin/blog");
  revalidatePath(`/admin/blog/${id}`);
}

export async function publishPostAction(id: string) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  const post = await prisma.blogPost.update({
    where: { id },
    data: { published: true, publishedAt: new Date() },
  });
  await recordRevision({
    entityType: "BlogPost",
    entityId: id,
    data: post,
    authorId: user.id,
    authorEmail: user.email,
    action: "publish",
  });
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/blog");
}

export async function unpublishPostAction(id: string) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  const post = await prisma.blogPost.update({
    where: { id },
    data: { published: false },
  });
  await recordRevision({
    entityType: "BlogPost",
    entityId: id,
    data: post,
    authorId: user.id,
    authorEmail: user.email,
    action: "unpublish",
  });
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/blog");
}

export async function deletePostAction(id: string) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  const post = await prisma.blogPost.delete({ where: { id } });
  await recordRevision({
    entityType: "BlogPost",
    entityId: id,
    data: post,
    authorId: user.id,
    authorEmail: user.email,
    action: "delete",
  });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

// ------------------------------------------------------------------
// FORM FOLDERS + FORMS
// ------------------------------------------------------------------

const folderSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().optional(),
  description: z.string().optional().default(""),
  order: z.coerce.number().int().default(0),
});

export async function createFolderAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  const parsed = folderSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    order: formData.get("order") || 0,
  });
  const slugBase = parsed.slug && parsed.slug.length > 0 ? parsed.slug : parsed.title;
  let slug = toSlug(slugBase);
  let i = 2;
  while (await prisma.formFolder.findUnique({ where: { slug } })) {
    slug = `${toSlug(slugBase)}-${i++}`;
  }
  const folder = await prisma.formFolder.create({
    data: {
      title: parsed.title,
      slug,
      description: parsed.description,
      order: parsed.order,
      published: true,
    },
  });
  await recordRevision({
    entityType: "FormFolder",
    entityId: folder.id,
    data: folder,
    authorId: user.id,
    authorEmail: user.email,
    action: "create",
  });
  revalidatePath("/forms");
  revalidatePath("/admin/forms");
}

export async function updateFolderAction(id: string, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  const parsed = folderSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    order: formData.get("order") || 0,
  });
  const slugBase = parsed.slug && parsed.slug.length > 0 ? parsed.slug : parsed.title;
  const folder = await prisma.formFolder.update({
    where: { id },
    data: {
      title: parsed.title,
      slug: toSlug(slugBase),
      description: parsed.description,
      order: parsed.order,
      published: formData.get("published") !== null,
    },
  });
  await recordRevision({
    entityType: "FormFolder",
    entityId: id,
    data: folder,
    authorId: user.id,
    authorEmail: user.email,
    action: "update",
  });
  revalidatePath("/forms");
  revalidatePath("/admin/forms");
}

export async function deleteFolderAction(id: string) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  const forms = await prisma.form.findMany({ where: { folderId: id } });
  for (const f of forms) await deleteUpload(f.fileName);
  const folder = await prisma.formFolder.delete({ where: { id } });
  await recordRevision({
    entityType: "FormFolder",
    entityId: id,
    data: folder,
    authorId: user.id,
    authorEmail: user.email,
    action: "delete",
  });
  revalidatePath("/forms");
  revalidatePath("/admin/forms");
}

export async function uploadFormAction(folderId: string, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file uploaded");
  }
  const title = String(formData.get("title") || file.name);
  const description = String(formData.get("description") || "");
  const stored = await saveUpload(file);
  const form = await prisma.form.create({
    data: {
      folderId,
      title,
      description,
      fileName: stored.fileName,
      filePath: stored.filePath,
      fileSize: stored.size,
      mimeType: stored.mimeType,
    },
  });
  await recordRevision({
    entityType: "Form",
    entityId: form.id,
    data: form,
    authorId: user.id,
    authorEmail: user.email,
    action: "create",
  });
  revalidatePath("/forms");
  revalidatePath("/admin/forms");
}

export async function deleteFormAction(id: string) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  const form = await prisma.form.findUnique({ where: { id } });
  if (!form) return;
  await deleteUpload(form.fileName);
  await prisma.form.delete({ where: { id } });
  await recordRevision({
    entityType: "Form",
    entityId: id,
    data: form,
    authorId: user.id,
    authorEmail: user.email,
    action: "delete",
  });
  revalidatePath("/forms");
  revalidatePath("/admin/forms");
}

// ------------------------------------------------------------------
// SITE CONTENT (settings)
// ------------------------------------------------------------------

export async function saveContentAction(key: ContentKey, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  const raw = String(formData.get("json") || "");
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    throw new Error("Invalid JSON");
  }
  await setContent(key, value);
  await recordRevision({
    entityType: "Setting",
    entityId: key,
    data: value,
    authorId: user.id,
    authorEmail: user.email,
    action: "update",
  });
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/services");
  revalidatePath("/contact");
  revalidatePath("/admin/pages");
}
