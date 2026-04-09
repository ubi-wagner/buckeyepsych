import { getContent } from "@/lib/content";

export const metadata = {
  title: "About — Buckeye Psychiatry, LLC",
};

export default async function AboutPage() {
  const c = await getContent();
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
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
          <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-brand-200 via-brand-400 to-brand-700 shadow-xl" />
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
    </div>
  );
}
