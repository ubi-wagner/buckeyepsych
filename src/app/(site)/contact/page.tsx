import { getContent } from "@/lib/content";
import MapEmbed, { mapsLink } from "@/components/MapEmbed";

export const metadata = {
  title: "Contact — Buckeye Psychiatry, LLC",
};

export default async function ContactPage() {
  const c = await getContent();
  const phoneHref = `tel:${c.site.phone.replace(/[^0-9+]/g, "")}`;
  const mLink = mapsLink(c.site.address);

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
          <a
            href={mLink}
            target="_blank"
            rel="noopener"
            className="mt-2 block whitespace-pre-line font-display text-xl text-brand-950 hover:text-brand-700"
          >
            {c.site.address}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={phoneHref}
              className="inline-flex items-center rounded-full bg-brand-800 px-6 py-3 text-sm font-medium text-cream hover:bg-brand-900"
            >
              Call {c.site.phone}
            </a>
            <a
              href={mLink}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3 text-sm font-medium text-brand-900 hover:bg-brand-50"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Open in Maps
            </a>
            {c.site.email && (
              <a
                href={`mailto:${c.site.email}`}
                className="inline-flex items-center rounded-full border border-brand-200 px-6 py-3 text-sm font-medium text-brand-900 hover:bg-brand-50"
              >
                Email
              </a>
            )}
          </div>
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

      <div className="mt-12">
        <MapEmbed address={c.site.address} />
      </div>

      <div className="mt-12 rounded-2xl border border-brand-100 bg-brand-50/40 p-8">
        <div className="text-xs font-medium uppercase tracking-wider text-brand-700">
          Hours
        </div>
        <p className="mt-2 text-brand-950">{c.site.hours}</p>
      </div>
    </div>
  );
}
