import { prisma } from "@/lib/db";
import { publicFileUrl } from "@/lib/storage";

export const metadata = {
  title: "Patient Forms — Buckeye Psychiatry, LLC",
};

export const dynamic = "force-dynamic";

export default async function FormsPage() {
  let folders: {
    id: string;
    slug: string;
    title: string;
    description: string;
    forms: {
      id: string;
      title: string;
      description: string;
      fileName: string;
      filePath: string;
      fileSize: number;
      mimeType: string;
    }[];
  }[] = [];
  try {
    folders = await prisma.formFolder.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      include: {
        forms: {
          where: { published: true },
          orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        },
      },
    });
  } catch {
    // no-op: DB not ready
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-16 max-w-2xl">
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-brand-700">
          Patient resources
        </div>
        <h1 className="font-display text-5xl tracking-tightest text-brand-950">
          Forms & downloads
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/70">
          Download and complete these forms prior to your appointment. If you
          have trouble accessing a document please call the office.
        </p>
      </div>

      {folders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-brand-200 bg-white p-10 text-center text-brand-700">
          No forms have been published yet. Please check back soon.
        </div>
      ) : (
        <div className="space-y-12">
          {folders.map((f) => (
            <section
              key={f.id}
              className="rounded-2xl border border-brand-100 bg-white p-8 md:p-10"
            >
              <h2 className="font-display text-2xl text-brand-950">
                {f.title}
              </h2>
              {f.description && (
                <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
                  {f.description}
                </p>
              )}
              <div className="mt-6 divide-y divide-brand-100">
                {f.forms.length === 0 && (
                  <div className="py-6 text-sm text-ink/50">
                    No documents in this folder yet.
                  </div>
                )}
                {f.forms.map((form) => (
                  <a
                    key={form.id}
                    href={publicFileUrl(form.fileName)}
                    target="_blank"
                    rel="noopener"
                    className="group flex items-center justify-between gap-4 py-4 transition hover:pl-2"
                  >
                    <div className="flex items-center gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 13h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v12a2 2 0 0 1-2 2Z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-brand-950 group-hover:text-brand-700">
                          {form.title}
                        </div>
                        {form.description && (
                          <div className="text-sm text-ink/60">
                            {form.description}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-brand-700">
                      <span>{formatBytes(form.fileSize)}</span>
                      <span className="inline-flex items-center rounded-full border border-brand-200 px-3 py-1 font-medium">
                        Download
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function formatBytes(bytes: number) {
  if (!bytes) return "";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}
