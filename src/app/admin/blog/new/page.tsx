import Link from "next/link";
import { requireAdmin } from "@/lib/session";
import { createPostAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  await requireAdmin();
  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/blog"
          className="text-xs font-medium uppercase tracking-wider text-brand-700 hover:text-brand-900"
        >
          ← Back to posts
        </Link>
        <h1 className="mt-2 font-display text-4xl text-brand-950">New post</h1>
      </div>

      <form action={createPostAction} className="space-y-5 bp-card">
        <div>
          <label className="bp-label" htmlFor="title">
            Title
          </label>
          <input id="title" name="title" className="bp-input" required />
        </div>
        <div>
          <label className="bp-label" htmlFor="slug">
            Slug (optional)
          </label>
          <input id="slug" name="slug" className="bp-input" placeholder="auto-generated from title" />
        </div>
        <div>
          <label className="bp-label" htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            className="bp-input"
          />
        </div>
        <div>
          <label className="bp-label" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input id="tags" name="tags" className="bp-input" />
        </div>
        <div>
          <label className="bp-label" htmlFor="content">
            Body (Markdown)
          </label>
          <textarea
            id="content"
            name="content"
            rows={16}
            className="bp-input font-mono"
          />
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/admin/blog" className="bp-btn-ghost">
            Cancel
          </Link>
          <button type="submit" className="bp-btn">
            Create draft
          </button>
        </div>
      </form>
    </div>
  );
}
