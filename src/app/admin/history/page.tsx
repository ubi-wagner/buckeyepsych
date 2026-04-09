import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  await requireAdmin();
  const revisions = await prisma.revision.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-medium uppercase tracking-wider text-brand-700">
          Audit
        </div>
        <h1 className="mt-1 font-display text-4xl text-brand-950">
          Change history
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Every create, update, publish, and delete is recorded here.
        </p>
      </div>

      {revisions.length === 0 ? (
        <div className="bp-card text-center text-sm text-ink/60">
          No changes recorded yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-brand-50/50 text-left text-xs uppercase tracking-wider text-brand-700">
              <tr>
                <th className="px-6 py-3">When</th>
                <th className="px-6 py-3">Who</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Entity</th>
                <th className="px-6 py-3">ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {revisions.map((r) => (
                <tr key={r.id} className="hover:bg-brand-50/30">
                  <td className="px-6 py-3 text-ink/70">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-ink/70">
                    {r.authorEmail || "—"}
                  </td>
                  <td className="px-6 py-3">
                    <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                      {r.action}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-medium text-brand-950">
                    {r.entityType}
                  </td>
                  <td className="px-6 py-3 font-mono text-xs text-ink/50">
                    {r.entityId}
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
