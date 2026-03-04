import { db } from '@/lib/db';
import { ensureDbInitialized } from '@/lib/db-init';
import { isAdminAuthenticated } from '@/lib/auth';
import { z } from 'zod';
import { apiError, apiSuccess } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

const JobIdSchema = z.string().trim().uuid('Invalid job ID');

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const parsedId = JobIdSchema.safeParse(id);

        if (!parsedId.success) {
            return apiError(parsedId.error.issues[0]?.message ?? 'Invalid job ID', 400);
        }

        await ensureDbInitialized();
        const job = await db.job.findUnique({
            where: { id: parsedId.data },
            include: {
                applications: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });

        if (!job) {
            return apiError('Job not found', 404);
        }

        return apiSuccess(job);
    } catch (error) {
        console.error('Failed to fetch job:', error);
        return apiError('Failed to fetch job', 500);
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const isAdmin = await isAdminAuthenticated();
        if (!isAdmin) {
            return apiError('Unauthorized', 401);
        }

        const { id } = await params;
        const parsedId = JobIdSchema.safeParse(id);
        if (!parsedId.success) {
            return apiError(parsedId.error.issues[0]?.message ?? 'Invalid job ID', 400);
        }

        await ensureDbInitialized();
        const existingJob = await db.job.findUnique({
            where: { id: parsedId.data },
        });
        if (!existingJob) {
            return apiError('Job not found', 404);
        }

        const job = await db.job.delete({
            where: { id: parsedId.data },
        });

        return apiSuccess(job);
    } catch (error) {
        console.error('Failed to delete job:', error);
        return apiError('Failed to delete job', 500);
    }
}
