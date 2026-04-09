import Link from "next/link";
import { getContent } from "@/lib/content";

export const metadata = {
  title: "Services — Buckeye Psychiatry, LLC",
};

export default async function ServicesPage() {
  const c = await getContent();
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-16 max-w-3xl">
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-brand-700">
          Psychiatric services
        </div>
        <h1 className="font-display text-5xl tracking-tightest text-brand-950">
          {c.services.heading}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/70">
          {c.services.intro}
        </p>
      </div>
      <div className="space-y-6">
        {c.services.items.map((s, i) => (
          <article
            key={s.title}
            className="group relative overflow-hidden rounded-2xl border border-brand-100 bg-white p-10 transition hover:shadow-xl"
          >
            <div className="flex items-start gap-8">
              <div className="hidden shrink-0 font-display text-5xl text-brand-200 group-hover:text-brand-400 md:block">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1">
                <h2 className="mb-3 font-display text-2xl text-brand-950">
                  {s.title}
                </h2>
                <p className="leading-relaxed text-ink/70">{s.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-16 rounded-2xl border border-brand-100 bg-brand-50/40 p-8 text-center">
        <p className="text-brand-900">
          New patient appointments are typically available within 1–2 weeks.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center rounded-full bg-brand-800 px-7 py-3 text-sm font-medium text-cream hover:bg-brand-900"
        >
          Contact us to schedule
        </Link>
      </div>
    </div>
  );
}
