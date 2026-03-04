import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ensureDbInitialized } from '@/lib/db-init';
import { isAdminAuthenticated } from '@/lib/auth';
import { JobSchema } from '@/lib/validators';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const search = searchParams.get('search')?.trim();
        const category = searchParams.get('category')?.trim();
        const location = searchParams.get('location')?.trim();
        const type = searchParams.get('type')?.trim();

        const where: Record<string, unknown> = {};
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { company: { contains: search } },
                { description: { contains: search } },
            ];
        }
        if (category) {
            where.category = category;
        }
        if (location) {
            where.location = { contains: location };
        }
        if (type) {
            where.type = type;
        }

        await ensureDbInitialized();
        const jobs = await db.job.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { applications: true },
                },
            },
        });

        return NextResponse.json({ success: true, data: jobs });
    } catch (error) {
        console.error('Failed to fetch jobs:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch jobs' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const isAdmin = await isAdminAuthenticated();
        if (!isAdmin) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const parsedData = JobSchema.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json(
                { success: false, error: parsedData.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        await ensureDbInitialized();
        const job = await db.job.create({
            data: parsedData.data,
        });

        return NextResponse.json({ success: true, data: job }, { status: 201 });
    } catch (error) {
        console.error('Failed to create job:', error);
        return NextResponse.json({ success: false, error: 'Failed to create job' }, { status: 500 });
    }
}
