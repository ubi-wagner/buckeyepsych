# Buckeye Psychiatry, LLC

Next.js + Postgres webapp for [buckeyepsych.com](https://www.buckeyepsych.com) with a built-in admin CMS for editing pages, managing downloadable patient forms, and authoring blog posts. Deploys to Railway on push to `main`.

## Stack

| Layer    | Tech                                                             |
| -------- | ---------------------------------------------------------------- |
| Framework | Next.js 14 (App Router, Server Actions, TypeScript)            |
| Styling  | Tailwind CSS + custom typography (Fraunces + Inter)              |
| Database | PostgreSQL via Prisma                                            |
| Auth     | `iron-session` signed cookies + bcrypt password hashes           |
| Storage  | Filesystem volume (`$UPLOAD_DIR`, default `./data/uploads`)      |
| Hosting  | Railway (auto-deploy on push to `main` via GitHub integration)   |

## What's in the box

### Public site

- **Home** — hero, services teaser, recent-post grid, CTA strip
- **About** — intro, philosophy, education, awards, memberships
- **Services** — psychiatric assessment, medication management, med mgmt + therapy
- **Forms** — folders of downloadable PDFs with instruction headers
- **Blog** — card grid with tags
- **Blog post detail** — markdown rendering with GFM
- **Contact** — office, directions, service area, hours

### Admin (`/admin`)

- Email + password sign in (iron-session cookies)
- **Dashboard** — stats, quick links, recent revision activity
- **Blog posts** — create/edit/delete, draft → preview → publish workflow, markdown editor with live preview pane
- **Forms** — create folders with instruction headers, upload/delete individual files
- **Site content** — edit the JSON for each page section (site, home, about, services, contact)
- **History** — full change log (who/what/when) for every create, update, publish, and delete

### Data model (`prisma/schema.prisma`)

`User`, `Setting`, `FormFolder`, `Form`, `BlogPost`, `Revision`

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Create a local .env
cp .env.example .env
# Edit DATABASE_URL to point at a local Postgres and set SESSION_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD.

# 3. Push the schema to your local database
npx prisma db push

# 4. Start the dev server
npm run dev
```

Visit http://localhost:3000. Sign in at http://localhost:3000/admin/login using the `ADMIN_EMAIL` / `ADMIN_PASSWORD` values from `.env` — the first login will create the admin user automatically.

## Deployment

See [DEPLOY.md](./DEPLOY.md) for full Railway + GitHub setup instructions.

## Repository layout

```
.
├── prisma/
│   └── schema.prisma
├── reference/              # PDF captures of the legacy site (not served)
├── src/
│   ├── app/
│   │   ├── (site)/         # Public routes with shared Navbar/Footer
│   │   ├── admin/          # Admin CMS (server actions in actions.ts)
│   │   ├── api/files/      # Authenticated upload file server
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   ├── lib/                # db, session, content, storage, markdown, revision
│   └── middleware.ts       # Cheap /admin cookie guard
├── railway.toml            # Railway build + deploy config
└── next.config.mjs
```
