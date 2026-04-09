import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-cream px-6">
      <div className="text-center">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-brand-800 font-display text-2xl text-cream">
          B
        </div>
        <div className="text-xs font-medium uppercase tracking-[0.22em] text-brand-700">
          404
        </div>
        <h1 className="mt-2 font-display text-5xl text-brand-950">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-ink/70">
          The page you&rsquo;re looking for has moved or doesn&rsquo;t exist.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-brand-800 px-6 py-3 text-sm font-medium text-cream hover:bg-brand-900"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-brand-200 px-6 py-3 text-sm font-medium text-brand-900 hover:bg-brand-50"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
