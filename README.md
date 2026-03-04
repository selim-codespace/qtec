# QTech Job Board

Full-stack job board built with Next.js App Router, Tailwind CSS, REST API routes, and Prisma (PostgreSQL).

## Tech Stack
- Next.js 16 (React 19)
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Zod validation

## Features
- Job listings page with:
  - Search by keyword
  - Filter by category
  - Filter by location
  - Filter by posted date (`any`, `24h`, `7d`, `30d`)
  - Sort (`latest`, `oldest`, `title`, `company`)
  - Pagination and page-size controls
  - Responsive layout
- Job detail page with:
  - Full job description
  - Apply form (name, email, resume URL, cover note)
- Admin view:
  - Login with password
  - Add jobs
  - Delete jobs
  - View submitted applications per job
  - Quick stats + local search/sort for faster management
  - Mobile card layout + desktop table layout
- UX enhancements:
  - Loading skeletons for jobs list, job details, and admin dashboard
  - Pending states for search, filter apply, and admin mutations
- REST API:
  - `GET /api/jobs` (supports `search`, `category`, `location`, `type`, `sort`, `page`, `limit`)
  - `GET /api/jobs/{id}`
  - `POST /api/jobs` (admin)
  - `DELETE /api/jobs/{id}` (admin)
  - `POST /api/applications`
- Validation:
  - Required fields
  - Email format
  - Resume link URL format

## Database Models
- `Job`
  - `id, title, company, location, category, type, description, salary, companyLogo, createdAt`
- `Application`
  - `id, jobId, name, email, resumeLink, coverNote, createdAt`
- Relationship:
  - `Job` has many `Application`
  - `Application` belongs to `Job`

## Setup
1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```
On Windows PowerShell:
```powershell
Copy-Item .env.example .env
```

3. Configure your PostgreSQL `DATABASE_URL` in `.env`:
- Supabase: use the connection string from Project Settings > Database.
- If using Supabase pooler, also set `DIRECT_URL` to the direct (port 5432) connection for Prisma schema operations.
- Local PostgreSQL: example `postgresql://postgres:postgres@localhost:5432/qtech?schema=public`
- Set admin/auth config:
  - `ADMIN_PASSWORD` (required)
  - `ADMIN_COOKIE_NAME` (optional, defaults to `admin_token`)
  - `ADMIN_COOKIE_MAX_AGE` in seconds (optional, defaults to `86400`)
- Optional UI config:
  - `NEXT_PUBLIC_APP_NAME` (used in metadata/loading text)

4. Generate Prisma client and push schema:
```bash
npm exec prisma generate
npm exec prisma db push
```

5. Seed sample jobs:
```bash
npm run db:seed
```

6. Run dev server:
- `npm run dev`

## Admin Access
- URL: `/admin`
- Password: value from `ADMIN_PASSWORD` in `.env`

## Notes
- `POST /api/jobs` and `DELETE /api/jobs/{id}` require admin authentication cookie.
- API responses follow:
  - Success: `{ success: true, data, meta? }`
  - Error: `{ success: false, error: { message, fieldErrors? } }`
- `pgAdmin` is optional. It is only a GUI client; the app works without it.

## Deployment
You can deploy this app to Netlify, Vercel, Railway, or Render.

### Shared Deployment Notes
1. Set all required environment variables in your hosting platform:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `ADMIN_PASSWORD`
   - Optional: `ADMIN_COOKIE_NAME`, `ADMIN_COOKIE_MAX_AGE`, `NEXT_PUBLIC_APP_NAME`
2. Make sure your Supabase project allows inbound connections from your deploy platform.
3. Run schema sync before first production launch (from local machine):
```bash
npm exec prisma db push
```
4. Optional seed for demo data:
```bash
npm run db:seed
```

### Netlify
- Config file included: `netlify.toml`
- Build settings (auto-detected for Next.js) are:
  - Build command: `next build` (or `npm run build`)
  - Publish directory: `.next`
- In Netlify UI set environment variables:
  - `DATABASE_URL`
  - `DIRECT_URL`
  - `ADMIN_PASSWORD`
  - Optional: `ADMIN_COOKIE_NAME`, `ADMIN_COOKIE_MAX_AGE`, `NEXT_PUBLIC_APP_NAME`
- Then deploy from your Git repository.

Optional Netlify CLI flow:
```bash
npm i -g netlify-cli
netlify login
netlify init
netlify env:import .env
netlify deploy --build --prod
```

### Vercel
- Config file included: `vercel.json`
- Create a new Vercel project from this repo.
- Add environment variables in Project Settings > Environment Variables.
- Deploy.

### Railway
- Config file included: `railway.toml`
- Create a new Railway project from this repo.
- Add environment variables in service settings.
- Deploy.

### Render
- Blueprint config included: `render.yaml`
- Create a new Web Service and connect this repo (or use Blueprint).
- Add sensitive env values (`DATABASE_URL`, `DIRECT_URL`, `ADMIN_PASSWORD`).
- Deploy.
