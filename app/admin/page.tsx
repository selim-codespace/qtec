import { db } from "@/lib/db";
import { ensureDbInitialized } from "@/lib/db-init";
import { isAdminAuthenticated } from "@/lib/auth";
import { AdminDashboard } from "./AdminDashboard";
import { AdminLogin } from "./AdminLogin";

export const dynamic = "force-dynamic";

type AdminApplication = {
    id: string;
    name: string;
    email: string;
    resumeLink: string;
    coverNote: string;
    createdAt: Date | string;
};

type AdminJob = {
    id: string;
    title: string;
    company: string;
    createdAt: Date | string;
    applications: AdminApplication[];
};

export default async function AdminPage() {
    const isAdmin = await isAdminAuthenticated();

    if (!isAdmin) {
        return <AdminLogin />;
    }

    // Fetch all jobs and their applications counts for the dashboard
    let jobs: AdminJob[] = [];
    try {
        await ensureDbInitialized();
        jobs = (await db.job.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                applications: true,
            }
        })) as AdminJob[];
    } catch (error) {
        console.warn("Prisma error during admin page static collection:", error);
    }

    return <AdminDashboard initialJobs={jobs} />;
}
