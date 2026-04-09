import { requireAdmin } from "@/lib/session";
import { getContent, type ContentKey } from "@/lib/content";
import { saveContentAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const SECTIONS: {
  key: ContentKey;
  label: string;
  description: string;
}[] = [
  {
    key: "site",
    label: "Site info",
    description: "Name, tagline, phone, email, address, hours.",
  },
  {
    key: "home",
    label: "Home page",
    description: "Hero eyebrow, title, body, services heading and intro.",
  },
  {
    key: "about",
    label: "About page",
    description: "Intro, philosophy, education, awards, memberships.",
  },
  {
    key: "services",
    label: "Services page",
    description: "Services heading, intro, and individual service items.",
  },
  {
    key: "contact",
    label: "Contact page",
    description: "Heading, intro, directions, service area.",
  },
];

export default async function PagesAdmin() {
  await requireAdmin();
  const content = await getContent();

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-medium uppercase tracking-wider text-brand-700">
          Content
        </div>
        <h1 className="mt-1 font-display text-4xl text-brand-950">
          Site content
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Edit the JSON for each section below and click save. The shape must
          match the defaults — add/remove array items freely.
        </p>
      </div>

      <div className="space-y-8">
        {SECTIONS.map((s) => {
          const action = saveContentAction.bind(null, s.key);
          const value = (content as Record<string, unknown>)[s.key];
          return (
            <div key={s.key} className="bp-card">
              <div className="mb-1 font-display text-lg text-brand-950">
                {s.label}
              </div>
              <div className="mb-4 text-xs text-ink/60">{s.description}</div>
              <form action={action}>
                <textarea
                  name="json"
                  rows={14}
                  defaultValue={JSON.stringify(value, null, 2)}
                  className="bp-input font-mono text-xs"
                />
                <div className="mt-4 flex justify-end">
                  <button type="submit" className="bp-btn">
                    Save {s.label.toLowerCase()}
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
