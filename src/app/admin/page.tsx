import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireAdmin();
  const [postCount, publishedCount, folderCount, formCount, recent] =
    await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.formFolder.count(),
      prisma.form.count(),
      prisma.revision.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
    ]);

  const stats = [
    { label: "Blog posts", value: postCount, sub: `${publishedCount} published` },
    { label: "Form folders", value: folderCount, sub: `${formCount} files` },
    { label: "Total changes", value: recent.length, sub: "recent revisions" },
  ];

  return (
    <div>
      <div className="mb-10">
        <div className="text-xs font-medium uppercase tracking-wider text-brand-700">
          Welcome back
        </div>
        <h1 className="mt-1 font-display text-4xl text-brand-950">Dashboard</h1>
      </div>

      <div className="mb-10 grid gap-5 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="bp-card">
            <div className="text-xs uppercase tracking-wider text-brand-700">
              {s.label}
            </div>
            <div className="mt-2 font-display text-4xl text-brand-950">
              {s.value}
            </div>
            <div className="mt-1 text-xs text-ink/60">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="mb-10 grid gap-5 md:grid-cols-2">
        <Link href="/admin/blog/new" className="bp-card hover:shadow-md transition">
          <div className="font-display text-lg text-brand-950">
            Write a new post →
          </div>
          <p className="mt-1 text-sm text-ink/60">
            Draft a new blog entry, preview it, then publish when ready.
          </p>
        </Link>
        <Link href="/admin/forms" className="bp-card hover:shadow-md transition">
          <div className="font-display text-lg text-brand-950">
            Manage forms →
          </div>
          <p className="mt-1 text-sm text-ink/60">
            Organize downloadable forms into folders with instructions.
          </p>
        </Link>
      </div>

      <div className="bp-card">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-display text-lg text-brand-950">
            Recent activity
          </div>
          <Link
            href="/admin/history"
            className="text-xs text-brand-700 hover:text-brand-900"
          >
            View all →
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="py-6 text-sm text-ink/50">No activity yet.</div>
        ) : (
          <ul className="divide-y divide-brand-100">
            {recent.map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between gap-4 py-3 text-sm"
              >
                <div>
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700">
                    {r.action}
                  </span>{" "}
                  <span className="font-medium text-brand-950">
                    {r.entityType}
                  </span>{" "}
                  <span className="text-ink/60">{r.entityId.slice(0, 8)}</span>
                </div>
                <div className="text-xs text-ink/50">
                  {r.authorEmail} ·{" "}
                  {new Date(r.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
