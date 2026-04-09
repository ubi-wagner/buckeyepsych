# Deployment guide

End-to-end instructions for deploying the Buckeye Psychiatry webapp to Railway with GitHub-based auto-deploys.

## What you'll end up with

- One Railway **service** running Next.js, rebuilt automatically every time you push to `main` on GitHub
- One Railway **PostgreSQL** plugin attached to that service (`DATABASE_URL` is injected automatically)
- One Railway **Volume** mounted at `/data` so uploaded PDFs survive redeploys
- Your domain `www.buckeyepsych.com` pointing at the Railway service once you're happy with the review

## Prerequisites

- A GitHub account with access to `ubi-wagner/buckeyepsych`
- A [Railway](https://railway.app) account connected to that same GitHub account
- The current feature branch merged (or deployed) from `main`

---

## Step 1 — Merge the feature branch

The project lives on `claude/build-webapp-admin-login-OA08W`. Review the diff on GitHub, then merge into `main`:

```bash
git checkout main
git pull origin main
git merge claude/build-webapp-admin-login-OA08W
git push origin main
```

Railway will build from `main`, so everything beyond this point assumes code is there.

## Step 2 — Create the Railway project

1. Go to https://railway.app/new
2. Choose **Deploy from GitHub repo**
3. Select `ubi-wagner/buckeyepsych`
4. Railway detects it as a Node/Next.js project (via `nixpacks`) and kicks off the first build. **This first build will fail** because `DATABASE_URL` isn't set yet — that's fine, we'll fix it in the next step.

## Step 3 — Attach PostgreSQL

1. Inside the project click **+ New → Database → Add PostgreSQL**
2. Open the **Postgres** service → **Variables** and note that a `DATABASE_URL` is now exposed
3. Open the **app** service → **Variables** → **New Variable Reference** and reference `DATABASE_URL` from the Postgres service (this injects it into the Next.js service at both build and runtime)

## Step 4 — Attach a Volume for file uploads

1. Open the **app** service → **Settings → Volumes → New Volume**
2. Mount path: `/data`
3. Size: 1 GB is plenty to start; you can grow it later

## Step 5 — Set the remaining environment variables

In the **app** service → **Variables**, add:

| Name                   | Value                                                              | Notes                                                         |
| ---------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------- |
| `SESSION_SECRET`       | Run `openssl rand -base64 48` locally and paste the result         | Must be ≥ 32 characters. Rotate this invalidates all sessions |
| `ADMIN_EMAIL`          | e.g. `adam@buckeyepsych.com`                                       | Used once to bootstrap the first admin account                |
| `ADMIN_PASSWORD`       | A strong temporary password                                        | Change it immediately after first login                       |
| `UPLOAD_DIR`           | `/data/uploads`                                                    | Must live inside the mounted volume                           |
| `NEXT_PUBLIC_SITE_URL` | `https://www.buckeyepsych.com` (or the Railway preview URL)        | Used for metadata / OG tags                                   |

`DATABASE_URL` should already be referenced from the Postgres service. `PORT` is injected by Railway automatically — don't set it.

## Step 6 — Trigger a fresh deploy

Go to **Deployments → Redeploy**. This time the build will:

1. Run `npm install` → triggers `prisma generate`
2. Run `prisma db push` → creates all tables on the attached Postgres
3. Run `next build` → compiles the Next.js app
4. Start the service with `npm run start`

When the deploy goes green, open the Railway-provided URL (something like `https://buckeyepsych-production.up.railway.app`).

## Step 7 — Bootstrap the first admin user

1. Open `https://<your-railway-url>/admin/login`
2. Sign in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in Step 5
3. On successful credentials-match, the server creates the `User` row, logs you in, and drops you on the dashboard
4. **Immediately go to `/admin/pages`** and review the default content (it's seeded from the legacy site). Save any section to commit it to the database.
5. **Create a folder under `/admin/forms`** and upload the patient intake PDF so the public `/forms` page has something to show.
6. **Write a welcome post under `/admin/blog/new`**, preview it, then click **Publish**.

> You can remove `ADMIN_PASSWORD` from the Railway environment variables after first login if you want — the hashed password in the database is what's used from then on.

## Step 8 — Point www.buckeyepsych.com at Railway

Once you're happy with the review:

1. In the **app** service → **Settings → Networking → Custom domain**, enter `www.buckeyepsych.com`
2. Railway will show you a CNAME target (e.g. `abcd.up.railway.app`)
3. At your DNS provider, create a CNAME record:
   - Host: `www`
   - Value: the Railway CNAME target
4. For the apex `buckeyepsych.com`, add an ALIAS/ANAME record (or a redirect) to `www.buckeyepsych.com`
5. Wait for Railway to issue the TLS certificate (usually < 5 min)
6. Update `NEXT_PUBLIC_SITE_URL` to the new canonical URL and redeploy

## Ongoing workflow

- **To ship a change**: push to `main`. Railway auto-deploys on every commit.
- **To run a DB schema change**: edit `prisma/schema.prisma`, commit, push. `prisma db push` runs automatically during the build.
- **To edit content**: sign in at `/admin` — everything is editable there (no code deploy needed for content changes).
- **To recover a previous version**: look at `/admin/history` for the full audit log of create/update/publish/delete events.

## Troubleshooting

**"DATABASE_URL is not set" during build.**
You skipped Step 3. Attach Postgres and reference its `DATABASE_URL` on the app service.

**Uploads disappear after redeploy.**
You skipped Step 4. Attach a volume at `/data` and set `UPLOAD_DIR=/data/uploads`.

**"Invalid credentials" on first login.**
`ADMIN_EMAIL` must match exactly (case-insensitive) and `ADMIN_PASSWORD` must match exactly (case-sensitive). If you've already logged in once, those env vars are no longer used — you have to use the password you actually set in the DB.

**Session cookie refuses to set / you get redirected back to login.**
`SESSION_SECRET` is missing or too short. It must be ≥ 32 characters.

**Build hangs on `prisma generate`.**
Make sure the service has enough memory. Railway's free hobby plan is usually fine.
