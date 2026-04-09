import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Markdown } from "@/lib/markdown";
import { getCurrentUser } from "@/lib/session";
import { publicFileUrl } from "@/lib/storage";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
      select: { title: true, excerpt: true, coverImage: true },
    });
    if (!post) return { title: "Not found — Buckeye Psychiatry, LLC" };
    return {
      title: `${post.title} — Buckeye Psychiatry, LLC`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [publicFileUrl(post.coverImage)] : undefined,
      },
    };
  } catch {
    return { title: "Buckeye Psychiatry, LLC" };
  }
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { preview?: string };
}) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });
  if (!post) notFound();

  const isPreview = searchParams.preview === "1";
  if (!post.published) {
    const user = await getCurrentUser();
    if (!user) notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      {isPreview && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800">
          Preview mode — this post {post.published ? "is published" : "is a draft"}.
        </div>
      )}
      <Link
        href="/blog"
        className="text-xs font-medium uppercase tracking-[0.18em] text-brand-700 hover:text-brand-900"
      >
        ← All posts
      </Link>
      <div className="mt-6 mb-4 text-sm text-brand-700">
        {post.publishedAt?.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) || "Draft"}
      </div>
      <h1 className="font-display text-5xl leading-[1.05] tracking-tightest text-brand-950">
        {post.title}
      </h1>
      {post.excerpt && (
        <p className="mt-5 text-xl leading-relaxed text-ink/70">
          {post.excerpt}
        </p>
      )}
      {post.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      {post.coverImage && (
        <div className="mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={publicFileUrl(post.coverImage)}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="mt-12 border-t border-brand-100 pt-10">
        <Markdown>{post.content || "*No content yet.*"}</Markdown>
      </div>
    </article>
  );
}
