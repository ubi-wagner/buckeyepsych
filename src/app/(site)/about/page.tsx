import { prisma } from "@/lib/db";
import { getContent } from "@/lib/content";
import { MediaImage } from "@/components/MediaImage";
import { publicFileUrl } from "@/lib/storage";

export const metadata = {
  title: "About — Buckeye Psychiatry, LLC",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const c = await getContent();
  let staff: {
    id: string;
    name: string;
    title: string;
    bio: string;
    photoFile: string | null;
  }[] = [];
  try {
    staff = await prisma.staff.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        name: true,
        title: true,
        bio: true,
        photoFile: true,
      },
    });
  } catch {
    // ignore
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-12">
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-brand-700">
          About the practice
        </div>
        <h1 className="font-display text-5xl tracking-tightest text-brand-950">
          {c.about.heading}
        </h1>
      </div>

      <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
        <div>
          <MediaImage
            slot="about.portrait"
            className="aspect-[3/4] overflow-hidden rounded-2xl shadow-xl"
            alt="Dr. Adam Brandemihl"
            fallback={
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-brand-200 via-brand-400 to-brand-700 shadow-xl" />
            }
          />
          <div className="mt-6 space-y-1 text-sm text-brand-900">
            <div className="font-medium">Adam Brandemihl, M.D.</div>
            <div className="text-brand-700">D.A.B.P.N.</div>
          </div>
        </div>
        <div className="space-y-10">
          <section>
            <h2 className="mb-3 font-display text-2xl text-brand-900">
              Introduction
            </h2>
            <p className="leading-relaxed text-ink/80">{c.about.intro}</p>
          </section>
          <section>
            <h2 className="mb-3 font-display text-2xl text-brand-900">
              Philosophy
            </h2>
            <p className="leading-relaxed text-ink/80">{c.about.philosophy}</p>
          </section>
          <section>
            <h2 className="mb-3 font-display text-2xl text-brand-900">
              Education & experience
            </h2>
            <p className="leading-relaxed text-ink/80">{c.about.education}</p>
          </section>
          <section>
            <h2 className="mb-3 font-display text-2xl text-brand-900">Awards</h2>
            <ul className="space-y-2 text-ink/80">
              {c.about.awards.map((a) => (
                <li key={a} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="mb-3 font-display text-2xl text-brand-900">
              Publications
            </h2>
            <ul className="space-y-3 text-ink/80">
              {c.about.publications.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="mb-3 font-display text-2xl text-brand-900">
              Memberships
            </h2>
            <ul className="space-y-2 text-ink/80">
              {c.about.memberships.map((m) => (
                <li key={m} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {staff.length > 0 && (
        <section className="mt-24 border-t border-brand-100 pt-16">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-brand-700">
              Our team
            </div>
            <h2 className="font-display text-4xl tracking-tightest text-brand-950">
              Meet the team
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {staff.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-brand-100 bg-white p-6 transition hover:shadow-xl"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-xl">
                  {s.photoFile ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={publicFileUrl(s.photoFile)}
                      alt={s.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-brand-100 via-brand-300 to-brand-500" />
                  )}
                </div>
                <div className="mt-5 font-display text-xl text-brand-950">
                  {s.name}
                </div>
                {s.title && (
                  <div className="text-sm text-brand-700">{s.title}</div>
                )}
                {s.bio && (
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {s.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
