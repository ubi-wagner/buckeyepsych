import Link from "next/link";
import { getContent } from "@/lib/content";

export default async function Footer() {
  const c = await getContent();
  return (
    <footer className="mt-24 bg-brand-950 text-cream/80">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-3 font-display text-2xl text-cream">
            {c.site.name}
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream/70">
            {c.site.tagline}
          </p>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-cream/50">
            {c.contact.serviceArea}
          </p>
        </div>
        <div>
          <div className="mb-3 font-display text-sm uppercase tracking-wider text-brand-200">
            Contact
          </div>
          <div className="space-y-1.5 text-sm">
            <div>{c.site.address}</div>
            <div>
              <a className="hover:text-cream" href={`tel:${c.site.phone}`}>
                {c.site.phone}
              </a>
            </div>
            {c.site.email && (
              <div>
                <a
                  className="hover:text-cream"
                  href={`mailto:${c.site.email}`}
                >
                  {c.site.email}
                </a>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="mb-3 font-display text-sm uppercase tracking-wider text-brand-200">
            Navigate
          </div>
          <ul className="space-y-1.5 text-sm">
            <li>
              <Link className="hover:text-cream" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-cream" href="/services">
                Services
              </Link>
            </li>
            <li>
              <Link className="hover:text-cream" href="/forms">
                Forms
              </Link>
            </li>
            <li>
              <Link className="hover:text-cream" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="hover:text-cream" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-900 py-6 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {c.site.name}. All rights reserved. ·{" "}
        <Link href="/admin" className="hover:text-cream">
          Admin
        </Link>
      </div>
    </footer>
  );
}
