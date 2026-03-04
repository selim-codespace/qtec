import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ensureDbInitialized } from '@/lib/db-init';
import { ApplicationSchema } from '@/lib/validators';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedData = ApplicationSchema.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json(
                { success: false, error: parsedData.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        await ensureDbInitialized();
        // Ensure the job exists
        const job = await db.job.findUnique({
            where: { id: parsedData.data.jobId },
        });

        if (!job) {
            return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
        }

        const application = await db.application.create({
            data: parsedData.data,
        });

        return NextResponse.json({ success: true, data: application }, { status: 201 });
    } catch (error) {
        console.error('Failed to submit application:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to submit application' },
            { status: 500 }
        );
    }
}
