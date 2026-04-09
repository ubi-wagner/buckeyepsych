import Link from "next/link";
import { prisma } from "@/lib/db";
import { getContent } from "@/lib/content";
import { MediaImage } from "@/components/MediaImage";
import { publicFileUrl } from "@/lib/storage";

export default async function HomePage() {
  const content = await getContent();
  let posts: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string | null;
    publishedAt: Date | null;
  }[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
      },
    });
  } catch {
    // DB unavailable during local dev / first build
  }

  const phoneHref = `tel:${content.site.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-cream to-cream" />
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 pt-24 pb-32 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-brand-700">
              {content.home.heroEyebrow}
            </div>
            <h1 className="font-display text-[2.75rem] leading-[1.05] tracking-tightest text-brand-950 md:text-6xl">
              {content.home.heroTitle}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/70">
              {content.home.heroBody}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={phoneHref}
                className="inline-flex items-center rounded-full bg-brand-800 px-7 py-3.5 text-sm font-medium text-cream shadow-sm transition hover:bg-brand-900"
              >
                Call {content.site.phone}
              </a>
              <Link
                href="/forms"
                className="inline-flex items-center rounded-full border border-brand-800 px-7 py-3.5 text-sm font-medium text-brand-800 transition hover:bg-brand-50"
              >
                Patient forms →
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-8 text-xs text-brand-700/80">
              <div>
                <div className="font-display text-2xl text-brand-900">20+</div>
                years in practice
              </div>
              <div className="h-10 w-px bg-brand-200" />
              <div>
                <div className="font-display text-2xl text-brand-900">1–2 wks</div>
                typical wait time
              </div>
              <div className="h-10 w-px bg-brand-200" />
              <div>
                <div className="font-display text-2xl text-brand-900">ABPN</div>
                board certified
              </div>
            </div>
          </div>
          <div className="relative">
            <MediaImage
              slot="home.hero"
              className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_30px_80px_-20px_rgba(10,33,19,0.35)]"
              alt="Dr. Adam Brandemihl"
              fallback={
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-300 via-brand-500 to-brand-800 shadow-[0_30px_80px_-20px_rgba(10,33,19,0.35)]">
                  <svg
                    className="absolute inset-0 h-full w-full opacity-20 mix-blend-overlay"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id="grid"
                        width="32"
                        height="32"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 32 0 L 0 0 0 32"
                          fill="none"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                  <div className="absolute inset-x-0 bottom-0 p-8 text-cream">
                    <div className="text-[11px] uppercase tracking-[0.2em] opacity-80">
                      Dr. Adam Brandemihl
                    </div>
                    <div className="mt-1 font-display text-2xl leading-tight">
                      M.D., D.A.B.P.N.
                    </div>
                  </div>
                </div>
              }
            />
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-brand-100 bg-cream p-5 shadow-xl">
              <div className="text-[10px] uppercase tracking-wider text-brand-600">
                Board Certified
              </div>
              <div className="font-display text-lg text-brand-950">
                ABPN Diplomate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 max-w-2xl">
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-brand-700">
            What we offer
          </div>
          <h2 className="font-display text-4xl tracking-tightest text-brand-950">
            {content.home.servicesHeading}
          </h2>
          <p className="mt-4 text-ink/70">{content.home.servicesIntro}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {content.services.items.map((s, i) => (
            <div
              key={s.title}
              className="group relative rounded-2xl border border-brand-100 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6 grid h-11 w-11 place-items-center rounded-full border border-brand-100 bg-brand-50 font-display text-base text-brand-700">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mb-3 font-display text-xl text-brand-950">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink/70">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/services"
            className="text-sm font-medium text-brand-700 hover:text-brand-900"
          >
            Learn more about our services →
          </Link>
        </div>
      </section>

      {/* RECENT POSTS */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <div className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-brand-700">
                From the journal
              </div>
              <h2 className="font-display text-4xl tracking-tightest text-brand-950">
                Psychiatric insights
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-medium text-brand-700 hover:text-brand-900"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group block overflow-hidden rounded-2xl border border-brand-100 bg-white transition hover:shadow-xl"
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
                  <div className="aspect-[16/10] bg-gradient-to-br from-brand-100 via-brand-200 to-brand-400" />
                )}
                <div className="p-6">
                  <div className="mb-2 text-xs text-brand-600">
                    {p.publishedAt?.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className="mb-2 font-display text-xl text-brand-950 group-hover:text-brand-700">
                    {p.title}
                  </h3>
                  <p className="line-clamp-3 text-sm text-ink/70">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA STRIP */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl bg-brand-950 px-10 py-14 text-cream md:px-16 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-brand-200">
                Ready to begin?
              </div>
              <h2 className="font-display text-4xl leading-tight tracking-tightest md:text-5xl">
                Schedule a new patient appointment.
              </h2>
              <p className="mt-4 max-w-lg text-sm text-cream/70">
                {content.site.hours}
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a
                href={phoneHref}
                className="inline-flex items-center rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-brand-950 transition hover:bg-white"
              >
                Call {content.site.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-cream/30 px-7 py-3.5 text-sm font-medium text-cream transition hover:bg-cream/10"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
