# QuickHire - Job Board Application

A robust, full-stack mini job board application built with Next.js App Router and Prisma. This project fulfills the QTech backend assignment requirements, combining an aesthetic matching the provided Figma design with a full RESTful API and SQLite datastore.

## Tech Stack
- **Framework:** Next.js (App Router, React 19)
- **Database:** SQLite
- **ORM:** Prisma
- **Styling:** Tailwind CSS V4
- **Validation:** Zod
- **Icons:** Lucide-React

## Features Implemented
- **Landing Page:** Identical to the Figma mockup containing Search Bar, Category grid, CTA banners, featured job feeds, and partner lists.
- **Job Listings (Frontend):** `/jobs` UI list with sidebar category and job type filtering driven securely via URL searchParams.
- **Job Details & Application View:** Read a full description and submit candidacies via a reactive slide-in Modal form featuring front and backend Zod validation.
- **Admin Panel:** Password-protected dashboard to post new jobs and manage submitted candidate applications securely.
- **RESTful API:** Clean backend JSON logic hosted within `app/api/...` endpoint files.

## Local Setup Instructions

1. **Install dependencies:**
   ```bash
   pnpm install
   ```
2. **Setup the Database:**
   Generate the SQLite instance and apply the schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
3. **Seed the generic Jobs table:**
   ```bash
   npx tsx prisma/seed.ts
   ```
4. **Environment File:**
   Ensure a `.env` is present containing the `DATABASE_URL` flag and `ADMIN_PASSWORD`. Check `.env.example`.
5. **Run Development Server:**
   ```bash
   pnpm dev
   ```

## Admin Access
- Path: `/admin`
- Password: `admin_qtech` (as set in `.env`)
