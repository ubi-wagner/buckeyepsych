import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function BlogListPage() {
  await requireAdmin();
  const posts = await prisma.blogPost.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });
  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-brand-700">
            Content
          </div>
          <h1 className="mt-1 font-display text-4xl text-brand-950">
            Blog posts
          </h1>
        </div>
        <Link href="/admin/blog/new" className="bp-btn">
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bp-card text-center text-sm text-ink/60">
          No posts yet.{" "}
          <Link className="text-brand-700" href="/admin/blog/new">
            Write your first one →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-brand-50/50 text-left text-xs uppercase tracking-wider text-brand-700">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Updated</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-brand-50/30">
                  <td className="px-6 py-4">
                    <div className="font-medium text-brand-950">{p.title}</div>
                    <div className="text-xs text-ink/50">/{p.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    {p.published ? (
                      <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                        Published
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-ink/60">
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      className="text-brand-700 hover:text-brand-900"
                      href={`/admin/blog/${p.id}`}
                    >
                      Edit →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
