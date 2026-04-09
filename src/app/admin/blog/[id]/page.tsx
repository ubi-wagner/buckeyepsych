import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import {
  updatePostAction,
  publishPostAction,
  unpublishPostAction,
  deletePostAction,
  uploadBlogCoverAction,
  deleteBlogCoverAction,
} from "@/app/admin/actions";
import { Markdown } from "@/lib/markdown";
import { publicFileUrl } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  await requireAdmin();
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  const update = updatePostAction.bind(null, post.id);
  const publish = publishPostAction.bind(null, post.id);
  const unpublish = unpublishPostAction.bind(null, post.id);
  const del = deletePostAction.bind(null, post.id);
  const uploadCover = uploadBlogCoverAction.bind(null, post.id);
  const deleteCover = deleteBlogCoverAction.bind(null, post.id);

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <Link
            href="/admin/blog"
            className="text-xs font-medium uppercase tracking-wider text-brand-700 hover:text-brand-900"
          >
            ← Back to posts
          </Link>
          <h1 className="mt-2 font-display text-3xl text-brand-950">
            Edit post
          </h1>
          <div className="mt-1 text-xs text-ink/50">
            {post.published ? (
              <span className="text-green-700">
                Published · {post.publishedAt?.toLocaleDateString()}
              </span>
            ) : (
              <span className="text-amber-700">Draft</span>
            )}
            {" · "}
            Last updated {new Date(post.updatedAt).toLocaleString()}
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/blog/${post.slug}?preview=1`}
            target="_blank"
            className="bp-btn-ghost"
          >
            Preview
          </Link>
          {post.published ? (
            <form action={unpublish}>
              <button className="bp-btn-ghost">Unpublish</button>
            </form>
          ) : (
            <form action={publish}>
              <button className="bp-btn">Publish</button>
            </form>
          )}
        </div>
      </div>

      {/* Cover image */}
      <div className="mb-6 bp-card">
        <div className="mb-3 font-display text-lg text-brand-950">
          Cover image
        </div>
        {post.coverImage ? (
          <div className="mb-4 grid gap-4 md:grid-cols-[240px_1fr]">
            <div className="aspect-[16/10] overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={publicFileUrl(post.coverImage)}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-ink/60">
                A cover image is set for this post. Replace it below or remove
                it to fall back to the gradient placeholder.
              </p>
              <form action={deleteCover} className="mt-3">
                <button className="bp-btn-danger">Remove cover</button>
              </form>
            </div>
          </div>
        ) : (
          <p className="mb-4 text-sm text-ink/60">
            No cover image yet. Upload one below — it will appear on the blog
            list and at the top of the post.
          </p>
        )}
        <form
          action={uploadCover}
          encType="multipart/form-data"
          className="flex flex-wrap items-end gap-3"
        >
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            className="block text-sm text-brand-900 file:mr-3 file:rounded-full file:border-0 file:bg-brand-800 file:px-4 file:py-2 file:text-xs file:font-medium file:text-cream hover:file:bg-brand-900"
          />
          <button type="submit" className="bp-btn">
            {post.coverImage ? "Replace cover" : "Upload cover"}
          </button>
        </form>
      </div>

      <form action={update} className="space-y-5 bp-card">
        <div>
          <label className="bp-label" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            defaultValue={post.title}
            className="bp-input"
            required
          />
        </div>
        <div>
          <label className="bp-label" htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={post.slug}
            className="bp-input"
          />
        </div>
        <div>
          <label className="bp-label" htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            defaultValue={post.excerpt}
            className="bp-input"
          />
        </div>
        <div>
          <label className="bp-label" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            name="tags"
            defaultValue={post.tags.join(", ")}
            className="bp-input"
          />
        </div>
        <div>
          <label className="bp-label" htmlFor="content">
            Body (Markdown)
          </label>
          <textarea
            id="content"
            name="content"
            rows={18}
            defaultValue={post.content}
            className="bp-input font-mono"
          />
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="submit" className="bp-btn">
            Save changes
          </button>
        </div>
      </form>

      <div className="mt-10 bp-card">
        <div className="mb-4 text-xs font-medium uppercase tracking-wider text-brand-700">
          Preview
        </div>
        <div className="rounded-xl bg-cream p-6">
          <h2 className="font-display text-3xl text-brand-950">{post.title}</h2>
          {post.excerpt && (
            <p className="mt-3 text-lg text-ink/70">{post.excerpt}</p>
          )}
          <div className="mt-6">
            <Markdown>{post.content || "*No content yet.*"}</Markdown>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-red-100 bg-red-50/30 p-6">
        <div className="mb-3 text-xs font-medium uppercase tracking-wider text-red-700">
          Danger zone
        </div>
        <form action={del}>
          <button type="submit" className="bp-btn-danger">
            Delete post
          </button>
        </form>
      </div>
    </div>
  );
}
