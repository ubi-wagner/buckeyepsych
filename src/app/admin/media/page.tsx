import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { publicFileUrl } from "@/lib/storage";
import { uploadMediaAction, deleteMediaAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const SLOTS: { slot: string; label: string; description: string; aspect: string }[] = [
  {
    slot: "site.logo",
    label: "Site logo",
    description:
      "Square logo shown in the navbar and footer. PNG or SVG, ≥ 200×200. Falls back to a green B badge if not set.",
    aspect: "square",
  },
  {
    slot: "home.hero",
    label: "Home page portrait",
    description:
      "Large image in the hero section of the home page. Portrait crop, around 800×1000 looks best.",
    aspect: "portrait",
  },
  {
    slot: "about.portrait",
    label: "About page portrait",
    description:
      "Photo of Dr. Brandemihl at the top of the About page. Portrait crop, around 600×800.",
    aspect: "portrait",
  },
  {
    slot: "about.banner",
    label: "About page banner (optional)",
    description: "Wide banner above the About content. Around 2000×800.",
    aspect: "wide",
  },
  {
    slot: "services.banner",
    label: "Services page banner (optional)",
    description: "Wide banner at the top of the Services page.",
    aspect: "wide",
  },
  {
    slot: "contact.banner",
    label: "Contact page banner (optional)",
    description: "Wide banner at the top of the Contact page.",
    aspect: "wide",
  },
];

export default async function MediaAdminPage() {
  await requireAdmin();
  const media = await prisma.media.findMany();
  const map = new Map(media.map((m) => [m.slot, m]));

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-medium uppercase tracking-wider text-brand-700">
          Visual content
        </div>
        <h1 className="mt-1 font-display text-4xl text-brand-950">Images</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink/60">
          Upload images into named slots used across the public site. Replacing
          an image takes effect immediately on the next page load.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {SLOTS.map((s) => {
          const item = map.get(s.slot);
          const upload = uploadMediaAction.bind(null, s.slot);
          const del = deleteMediaAction.bind(null, s.slot);
          return (
            <div key={s.slot} className="bp-card">
              <div className="font-display text-lg text-brand-950">
                {s.label}
              </div>
              <div className="mb-4 mt-1 text-xs text-ink/60">
                {s.description}
              </div>
              <div
                className={
                  "mb-4 overflow-hidden rounded-xl border border-brand-100 bg-brand-50/40 " +
                  (s.aspect === "wide"
                    ? "aspect-[16/6]"
                    : s.aspect === "portrait"
                      ? "aspect-[4/5] max-w-[240px]"
                      : "aspect-square max-w-[160px]")
                }
              >
                {item ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={publicFileUrl(item.fileName)}
                    alt={item.alt}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-xs text-brand-700/60">
                    no image
                  </div>
                )}
              </div>
              <form action={upload} className="space-y-3">
                <div>
                  <label className="bp-label">Alt text</label>
                  <input
                    name="alt"
                    defaultValue={item?.alt || ""}
                    className="bp-input"
                  />
                </div>
                <div>
                  <label className="bp-label">File</label>
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    required
                    className="block w-full text-sm text-brand-900 file:mr-3 file:rounded-full file:border-0 file:bg-brand-800 file:px-4 file:py-2 file:text-xs file:font-medium file:text-cream hover:file:bg-brand-900"
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <button type="submit" className="bp-btn">
                    {item ? "Replace" : "Upload"}
                  </button>
                  {item && (
                    <button
                      type="button"
                      formAction={del}
                      className="bp-btn-danger"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
