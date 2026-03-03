import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { AdminDashboard } from "./AdminDashboard";
import { AdminLogin } from "./AdminLogin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("admin_token")?.value === "authenticated";

    if (!isAdmin) {
        return <AdminLogin />;
    }

    // Fetch all jobs and their applications counts for the dashboard
    let jobs = [];
    try {
        jobs = await db.job.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                applications: true,
            }
        });
    } catch (error) {
        console.warn("Prisma error during admin page static collection:", error);
    }

    return <AdminDashboard initialJobs={jobs} />;
}
