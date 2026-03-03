Project Description:
You are required to build a mini job board application using Next.js (or React.js) for the frontend and Node.js/Express or PHP/Laravel for the backend.
The system should allow users to browse job listings, filter/search jobs, view job details, and submit applications. A simple admin panel should allow posting and managing job listings.
This task will help us evaluate your frontend UI skills, backend API design, database structure, code organization, and overall development approach.
Estimated Time: 6–8 hours
Deadline: ASAP

UI Design Requirement (Mandatory)
You must implement the UI based on the following Figma template:

https://www.figma.com/design/cLdiYqgjKdvrn4c0vQBdIT/QSL---QuickHire--Task-for-A.-Soft.-Engineer?m=auto&t=mMSVr1ZwNCz0M81D-1
Your implementation should closely follow the design in terms of:
Layout structure
Typography
Color scheme
Spacing and alignment
Overall look and feel
Minor adaptations are acceptable, but the final result must strongly match the provided design.

Core Requirements:
Your application should include the following features:
1. Frontend (Next.js / React.js - Required)
Your frontend must include:
Job Listings Page
Display all jobs
Search functionality
Filter by category and/or location
Clean, responsive layout
Job Detail Page
Show full job description
“Apply Now” form including:
Name
Email
Resume link (URL)
Cover note
Basic Admin View
Add new job listings
Delete job listings
Responsive UI
Must be fully responsive
Use Tailwind CSS or Bootstrap
Maintain a clean and professional UX
Reusable Components
Proper component structure
Organized folder structure
Clean naming conventions

2. Backend (Node.js/Express or PHP/Laravel - Your Choice)
You must build a RESTful API with the following functionality:
Required Endpoints (Examples)
Jobs:
GET /api/jobs – List all jobs
GET /api/jobs/{id} – Get single job details
POST /api/jobs – Create a job (Admin)
DELETE /api/jobs/{id} – Delete a job (Admin)
Applications:
POST /api/applications – Submit job application
3. Database
Use MongoDB, MySQL, or PostgreSQL
Persist job listings and applications
Proper model relationships (e.g., Job → Applications)
Example Models:
Job (id, title, company, location, category, description, created_at)
Application (id, job_id, name, email, resume_link, cover_note, created_at)
4. Validation
Basic input validation on all endpoints
Required fields must be validated
Email must be properly formatted
Resume link must be a valid URL

5. Code Quality
Clean folder structure
Meaningful naming conventions
Modular and reusable components
Organized API structure
Basic README file with setup instructions

Bonus (Optional but Recommended)
Deployed frontend/backend (e.g., Vercel, Railway, Render)
Improved admin UI
Better filtering logic
Loading states & UX enhancements
Environment-based configuration
Clean API response formatting

Important Notes:
Follow clean coding standards.
Maintain a logical Git commit history (avoid pushing everything at once).
