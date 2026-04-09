"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/blog", label: "Blog posts" },
  { href: "/admin/forms", label: "Forms" },
  { href: "/admin/media", label: "Images" },
  { href: "/admin/staff", label: "Staff" },
  { href: "/admin/pages", label: "Site content" },
  { href: "/admin/history", label: "History" },
];

export default function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 border-r border-brand-100 bg-white">
      <div className="border-b border-brand-100 px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-800 font-display text-lg text-cream">
            B
          </span>
          <span className="font-display text-lg text-brand-950 leading-tight">
            Buckeye
            <br />
            Admin
          </span>
        </Link>
      </div>
      <nav className="px-3 py-4">
        {links.map((l) => {
          const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-brand-50 text-brand-900"
                  : "text-brand-900/70 hover:bg-brand-50/60 hover:text-brand-900"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-brand-100 px-6 py-4">
        <div className="text-[11px] uppercase tracking-wider text-brand-700">
          Signed in
        </div>
        <div className="mb-3 truncate text-sm text-brand-950">{email}</div>
        <form action={logoutAction}>
          <button className="text-xs font-medium text-brand-700 hover:text-brand-900">
            Sign out →
          </button>
        </form>
      </div>
    </aside>
  );
}
