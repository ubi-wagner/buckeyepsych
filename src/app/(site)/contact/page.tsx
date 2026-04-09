import { getContent } from "@/lib/content";

export const metadata = {
  title: "Contact — Buckeye Psychiatry, LLC",
};

export default async function ContactPage() {
  const c = await getContent();
  const phoneHref = `tel:${c.site.phone.replace(/[^0-9+]/g, "")}`;
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-16 max-w-3xl">
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-brand-700">
          Contact
        </div>
        <h1 className="font-display text-5xl tracking-tightest text-brand-950">
          {c.contact.heading}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/70">
          {c.contact.intro}
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl border border-brand-100 bg-white p-8">
          <div className="text-xs font-medium uppercase tracking-wider text-brand-700">
            Office
          </div>
          <div className="mt-2 whitespace-pre-line font-display text-xl text-brand-950">
            {c.site.address}
          </div>
          <a
            href={phoneHref}
            className="mt-6 inline-flex items-center rounded-full bg-brand-800 px-6 py-3 text-sm font-medium text-cream hover:bg-brand-900"
          >
            Call {c.site.phone}
          </a>
          {c.site.email && (
            <a
              href={`mailto:${c.site.email}`}
              className="ml-2 mt-6 inline-flex items-center rounded-full border border-brand-200 px-6 py-3 text-sm font-medium text-brand-900 hover:bg-brand-50"
            >
              Email
            </a>
          )}
        </div>
        <div className="rounded-2xl border border-brand-100 bg-white p-8">
          <div className="text-xs font-medium uppercase tracking-wider text-brand-700">
            Directions
          </div>
          <p className="mt-2 leading-relaxed text-ink/80">
            {c.contact.directions}
          </p>
          <div className="mt-6 text-xs font-medium uppercase tracking-wider text-brand-700">
            Service area
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            {c.contact.serviceArea}
          </p>
        </div>
      </div>

      <div className="mt-16 rounded-2xl border border-brand-100 bg-brand-50/40 p-8">
        <div className="text-xs font-medium uppercase tracking-wider text-brand-700">
          Hours
        </div>
        <p className="mt-2 text-brand-950">{c.site.hours}</p>
      </div>
    </div>
  );
}
