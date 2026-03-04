import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ensureDbInitialized } from '@/lib/db-init';
import { isAdminAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        if (!id?.trim()) {
            return NextResponse.json({ success: false, error: 'Job ID is required' }, { status: 400 });
        }

        await ensureDbInitialized();
        const job = await db.job.findUnique({
            where: { id: id.trim() },
            include: {
                applications: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });

        if (!job) {
            return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: job });
    } catch (error) {
        console.error('Failed to fetch job:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch job' }, { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const isAdmin = await isAdminAuthenticated();
        if (!isAdmin) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        if (!id?.trim()) {
            return NextResponse.json({ success: false, error: 'Job ID is required' }, { status: 400 });
        }

        await ensureDbInitialized();
        const existingJob = await db.job.findUnique({
            where: { id: id.trim() },
        });
        if (!existingJob) {
            return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
        }

        const job = await db.job.delete({
            where: { id: id.trim() },
        });

        return NextResponse.json({ success: true, data: job });
    } catch (error) {
        console.error('Failed to delete job:', error);
        return NextResponse.json({ success: false, error: 'Failed to delete job' }, { status: 500 });
    }
}
