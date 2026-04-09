"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MobileMenu({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-900 hover:bg-brand-50 md:hidden"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 7h16M4 12h16M4 17h16"
            />
          )}
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 top-20 z-30 bg-cream md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-8 text-lg">
            <Link
              href="/about"
              className="rounded-lg px-3 py-3 font-display text-brand-950 hover:bg-brand-50"
            >
              About
            </Link>
            <Link
              href="/services"
              className="rounded-lg px-3 py-3 font-display text-brand-950 hover:bg-brand-50"
            >
              Services
            </Link>
            <Link
              href="/forms"
              className="rounded-lg px-3 py-3 font-display text-brand-950 hover:bg-brand-50"
            >
              Forms
            </Link>
            <Link
              href="/blog"
              className="rounded-lg px-3 py-3 font-display text-brand-950 hover:bg-brand-50"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="rounded-lg px-3 py-3 font-display text-brand-950 hover:bg-brand-50"
            >
              Contact
            </Link>
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-800 px-7 py-4 text-base font-medium text-cream"
            >
              Call {phone}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
