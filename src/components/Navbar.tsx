import Link from "next/link";
import { getContent } from "@/lib/content";
import { MediaImage } from "@/components/MediaImage";
import MobileMenu from "@/components/MobileMenu";

export default async function Navbar() {
  const content = await getContent();
  const phoneHref = `tel:${content.site.phone.replace(/[^0-9+]/g, "")}`;
  return (
    <header className="sticky top-0 z-40 border-b border-brand-100/70 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <MediaImage
            slot="site.logo"
            className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-brand-800 shadow-sm"
            fallback={
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-800 font-display text-xl text-cream shadow-sm group-hover:bg-brand-900 transition">
                B
              </span>
            }
          />
          <span className="leading-tight">
            <span className="block font-display text-xl text-brand-950">
              {content.site.name}
            </span>
            <span className="block text-[11px] uppercase tracking-[0.18em] text-brand-700">
              Dublin, Ohio
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-9 text-sm font-medium text-brand-900/80 md:flex">
          <Link className="hover:text-brand-700" href="/about">
            About
          </Link>
          <Link className="hover:text-brand-700" href="/services">
            Services
          </Link>
          <Link className="hover:text-brand-700" href="/forms">
            Forms
          </Link>
          <Link className="hover:text-brand-700" href="/blog">
            Blog
          </Link>
          <Link className="hover:text-brand-700" href="/contact">
            Contact
          </Link>
        </nav>
        <a
          href={phoneHref}
          className="hidden rounded-full bg-brand-800 px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-brand-900 md:inline-flex"
        >
          {content.site.phone}
        </a>
        <MobileMenu phone={content.site.phone} />
      </div>
    </header>
  );
}
