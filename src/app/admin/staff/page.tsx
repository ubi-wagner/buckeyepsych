import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { publicFileUrl } from "@/lib/storage";
import {
  createStaffAction,
  updateStaffAction,
  deleteStaffAction,
} from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function StaffAdminPage() {
  await requireAdmin();
  const staff = await prisma.staff.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-medium uppercase tracking-wider text-brand-700">
          Visual content
        </div>
        <h1 className="mt-1 font-display text-4xl text-brand-950">
          Staff & team
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Add team members with photo, name, title, and short bio. Published
          members appear on the About page.
        </p>
      </div>

      <div className="mb-10 bp-card">
        <div className="mb-4 font-display text-lg text-brand-950">
          Add a new staff member
        </div>
        <form
          action={createStaffAction}
          encType="multipart/form-data"
          className="grid gap-4 md:grid-cols-2"
        >
          <div>
            <label className="bp-label">Name</label>
            <input name="name" className="bp-input" required />
          </div>
          <div>
            <label className="bp-label">Title / role</label>
            <input name="title" className="bp-input" />
          </div>
          <div className="md:col-span-2">
            <label className="bp-label">Bio</label>
            <textarea name="bio" rows={3} className="bp-input" />
          </div>
          <div>
            <label className="bp-label">Order</label>
            <input
              name="order"
              type="number"
              defaultValue={0}
              className="bp-input"
            />
          </div>
          <div>
            <label className="bp-label">Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="block w-full text-sm text-brand-900 file:mr-3 file:rounded-full file:border-0 file:bg-brand-800 file:px-4 file:py-2 file:text-xs file:font-medium file:text-cream hover:file:bg-brand-900"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="bp-btn">
              Add staff member
            </button>
          </div>
        </form>
      </div>

      {staff.length === 0 && (
        <div className="bp-card text-center text-sm text-ink/60">
          No staff added yet.
        </div>
      )}

      <div className="space-y-6">
        {staff.map((s) => {
          const update = updateStaffAction.bind(null, s.id);
          const del = deleteStaffAction.bind(null, s.id);
          return (
            <div key={s.id} className="bp-card">
              <form
                action={update}
                encType="multipart/form-data"
                className="grid gap-4 md:grid-cols-[160px_1fr]"
              >
                <div>
                  <div className="aspect-[3/4] overflow-hidden rounded-xl bg-brand-50">
                    {s.photoFile ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={publicFileUrl(s.photoFile)}
                        alt={s.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-xs text-brand-700/60">
                        no photo
                      </div>
                    )}
                  </div>
                  <label className="bp-label mt-3">Replace photo</label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="block w-full text-xs text-brand-900 file:mr-2 file:rounded-full file:border-0 file:bg-brand-800 file:px-3 file:py-1.5 file:text-[11px] file:font-medium file:text-cream hover:file:bg-brand-900"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="bp-label">Name</label>
                    <input
                      name="name"
                      defaultValue={s.name}
                      className="bp-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="bp-label">Title</label>
                    <input
                      name="title"
                      defaultValue={s.title}
                      className="bp-input"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="bp-label">Bio</label>
                    <textarea
                      name="bio"
                      rows={3}
                      defaultValue={s.bio}
                      className="bp-input"
                    />
                  </div>
                  <div>
                    <label className="bp-label">Order</label>
                    <input
                      name="order"
                      type="number"
                      defaultValue={s.order}
                      className="bp-input"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="inline-flex items-center gap-2 text-sm text-brand-900">
                      <input
                        type="checkbox"
                        name="published"
                        defaultChecked={s.published}
                        className="h-4 w-4 rounded border-brand-300"
                      />
                      Published
                    </label>
                  </div>
                  <div className="md:col-span-2 flex items-center justify-between">
                    <form action={del}>
                      <button className="bp-btn-danger" type="submit">
                        Delete
                      </button>
                    </form>
                    <button type="submit" className="bp-btn">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
