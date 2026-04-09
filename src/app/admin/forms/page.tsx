import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import {
  createFolderAction,
  updateFolderAction,
  deleteFolderAction,
  uploadFormAction,
  deleteFormAction,
} from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function FormsAdminPage() {
  await requireAdmin();
  const folders = await prisma.formFolder.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    include: {
      forms: {
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      },
    },
  });

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-medium uppercase tracking-wider text-brand-700">
          Content
        </div>
        <h1 className="mt-1 font-display text-4xl text-brand-950">
          Patient forms
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Create folders with instructions and upload downloadable forms into
          each. Anything published here will appear on the public /forms page.
        </p>
      </div>

      {/* New folder */}
      <div className="mb-10 bp-card">
        <div className="mb-4 font-display text-lg text-brand-950">
          New folder
        </div>
        <form action={createFolderAction} className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="bp-label" htmlFor="nf-title">
              Title
            </label>
            <input id="nf-title" name="title" className="bp-input" required />
          </div>
          <div>
            <label className="bp-label" htmlFor="nf-order">
              Order
            </label>
            <input
              id="nf-order"
              name="order"
              type="number"
              defaultValue={0}
              className="bp-input"
            />
          </div>
          <div className="md:col-span-2">
            <label className="bp-label" htmlFor="nf-desc">
              Instruction header (shown above the files)
            </label>
            <textarea
              id="nf-desc"
              name="description"
              rows={2}
              className="bp-input"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button className="bp-btn">Create folder</button>
          </div>
        </form>
      </div>

      {folders.length === 0 && (
        <div className="bp-card text-center text-sm text-ink/60">
          No folders yet. Create one above to get started.
        </div>
      )}

      <div className="space-y-8">
        {folders.map((f) => {
          const update = updateFolderAction.bind(null, f.id);
          const del = deleteFolderAction.bind(null, f.id);
          const upload = uploadFormAction.bind(null, f.id);
          return (
            <div key={f.id} className="bp-card">
              <form action={update} className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="bp-label">Title</label>
                  <input
                    name="title"
                    defaultValue={f.title}
                    className="bp-input"
                    required
                  />
                </div>
                <div>
                  <label className="bp-label">Slug</label>
                  <input
                    name="slug"
                    defaultValue={f.slug}
                    className="bp-input"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="bp-label">Instruction header</label>
                  <textarea
                    name="description"
                    defaultValue={f.description}
                    rows={2}
                    className="bp-input"
                  />
                </div>
                <div>
                  <label className="bp-label">Order</label>
                  <input
                    name="order"
                    type="number"
                    defaultValue={f.order}
                    className="bp-input"
                  />
                </div>
                <div className="flex items-end">
                  <label className="inline-flex items-center gap-2 text-sm text-brand-900">
                    <input
                      type="checkbox"
                      name="published"
                      defaultChecked={f.published}
                      className="h-4 w-4 rounded border-brand-300"
                    />
                    Published
                  </label>
                </div>
                <div className="md:col-span-2 flex justify-end gap-3">
                  <button type="submit" className="bp-btn-ghost">
                    Save folder
                  </button>
                </div>
              </form>

              <div className="mt-6 border-t border-brand-100 pt-6">
                <div className="mb-3 text-xs font-medium uppercase tracking-wider text-brand-700">
                  Files in this folder
                </div>
                {f.forms.length === 0 && (
                  <div className="mb-4 text-sm text-ink/50">No files yet.</div>
                )}
                <ul className="mb-5 divide-y divide-brand-100">
                  {f.forms.map((form) => {
                    const delForm = deleteFormAction.bind(null, form.id);
                    return (
                      <li
                        key={form.id}
                        className="flex items-center justify-between py-3 text-sm"
                      >
                        <div>
                          <div className="font-medium text-brand-950">
                            {form.title}
                          </div>
                          <div className="text-xs text-ink/50">
                            {form.fileName} · {Math.round(form.fileSize / 1024)} KB
                          </div>
                        </div>
                        <form action={delForm}>
                          <button className="bp-btn-danger" type="submit">
                            Delete
                          </button>
                        </form>
                      </li>
                    );
                  })}
                </ul>

                <form
                  action={upload}
                  encType="multipart/form-data"
                  className="grid gap-3 rounded-xl border border-dashed border-brand-200 bg-brand-50/30 p-5 md:grid-cols-2"
                >
                  <div>
                    <label className="bp-label">File title</label>
                    <input name="title" className="bp-input" required />
                  </div>
                  <div>
                    <label className="bp-label">Description (optional)</label>
                    <input name="description" className="bp-input" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="bp-label">File</label>
                    <input
                      type="file"
                      name="file"
                      className="block w-full text-sm text-brand-900 file:mr-3 file:rounded-full file:border-0 file:bg-brand-800 file:px-4 file:py-2 file:text-sm file:font-medium file:text-cream hover:file:bg-brand-900"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button type="submit" className="bp-btn">
                      Upload file
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-6 border-t border-brand-100 pt-4">
                <form action={del}>
                  <button className="bp-btn-danger" type="submit">
                    Delete folder and all files
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
