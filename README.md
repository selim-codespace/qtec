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
  - Responsive layout
- Job detail page with:
  - Full job description
  - Apply form (name, email, resume URL, cover note)
- Admin view:
  - Login with password
  - Add jobs
  - Delete jobs
  - View submitted applications per job
- REST API:
  - `GET /api/jobs`
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
- API responses follow `{ success, data }` for successful calls and `{ success, error }` for failures.
- `pgAdmin` is optional. It is only a GUI client; the app works without it.
