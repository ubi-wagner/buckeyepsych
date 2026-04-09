import Link from "next/link";
import { prisma } from "@/lib/db";
import { publicFileUrl } from "@/lib/storage";

export const metadata = {
  title: "Blog — Buckeye Psychiatry, LLC",
};

export const dynamic = "force-dynamic";

export default async function BlogIndex() {
  let posts: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string | null;
    tags: string[];
    publishedAt: Date | null;
  }[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        tags: true,
        publishedAt: true,
      },
    });
  } catch {
    // no-op
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-16 max-w-3xl">
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-brand-700">
          The journal
        </div>
        <h1 className="font-display text-5xl tracking-tightest text-brand-950">
          A psychiatrist&rsquo;s insight into psychiatry and current events.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/70">
          Research summaries, clinical commentary, and thoughts on current
          events in mental health.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-brand-200 bg-white p-10 text-center text-brand-700">
          No posts published yet. Check back soon.
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="group block overflow-hidden rounded-2xl border border-brand-100 bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              {p.coverImage ? (
                <div className="aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={publicFileUrl(p.coverImage)}
                    alt={p.title}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-[16/10] bg-gradient-to-br from-brand-100 via-brand-300 to-brand-600" />
              )}
              <div className="p-6">
                <div className="mb-3 text-xs text-brand-600">
                  {p.publishedAt?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <h2 className="mb-2 font-display text-xl text-brand-950 group-hover:text-brand-700">
                  {p.title}
                </h2>
                <p className="line-clamp-3 text-sm text-ink/70">{p.excerpt}</p>
                {p.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-medium text-brand-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
