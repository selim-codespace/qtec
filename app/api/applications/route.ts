import { db } from '@/lib/db';
import { ensureDbInitialized } from '@/lib/db-init';
import { ApplicationSchema } from '@/lib/validators';
import { apiError, apiSuccess, apiValidationError } from '@/lib/api-response';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedData = ApplicationSchema.safeParse(body);

        if (!parsedData.success) {
            return apiValidationError(parsedData.error);
        }

        await ensureDbInitialized();
        // Ensure the job exists
        const job = await db.job.findUnique({
            where: { id: parsedData.data.jobId },
        });

        if (!job) {
            return apiError('Job not found', 404);
        }

        const application = await db.application.create({
            data: parsedData.data,
        });

        return apiSuccess(application, { status: 201 });
    } catch (error) {
        console.error('Failed to submit application:', error);
        return apiError('Failed to submit application', 500);
    }
}
