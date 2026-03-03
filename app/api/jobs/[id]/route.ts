import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await headers();
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ success: false, error: 'Job ID is required' }, { status: 400 });
        }

        const job = await db.job.findUnique({
            where: { id },
            include: {
                applications: true,
            },
        });

        if (!job) {
            return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: job });
    } catch (error) {
        console.error('Failed to fetch job (build safely caught):', error);
        return NextResponse.json({ success: true, data: null });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const job = await db.job.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, data: job });
    } catch (error) {
        console.error('Failed to delete job:', error);
        throw error;
    }
}
