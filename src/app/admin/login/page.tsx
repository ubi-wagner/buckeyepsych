"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "@/app/admin/actions";

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, undefined);
  return (
    <div className="grid min-h-screen place-items-center bg-cream px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-brand-800 font-display text-2xl text-cream shadow-sm">
            B
          </div>
          <h1 className="font-display text-3xl text-brand-950">
            Buckeye Psychiatry
          </h1>
          <p className="mt-1 text-sm text-brand-700">Admin sign in</p>
        </div>
        <form
          action={formAction}
          className="space-y-4 rounded-2xl border border-brand-100 bg-white p-8 shadow-sm"
        >
          <div>
            <label className="bp-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="bp-input"
            />
          </div>
          <div>
            <label className="bp-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="bp-input"
            />
          </div>
          {state?.error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {state.error}
            </div>
          )}
          <Submit />
        </form>
        <p className="mt-6 text-center text-xs text-brand-700/70">
          First-time setup? Use the ADMIN_EMAIL / ADMIN_PASSWORD env values to
          bootstrap the first account.
        </p>
      </div>
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="bp-btn w-full">
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}
