import { NextResponse, NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { JobSchema } from '@/lib/validators';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    await headers();
    try {
        const searchParams = req.nextUrl.searchParams;
        const search = searchParams.get('search');
        const category = searchParams.get('category');
        const location = searchParams.get('location');
        const type = searchParams.get('type');

        // Build filter query
        const where: any = {};
        if (search) {
            where.title = { contains: search };
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
        console.error('Failed to fetch jobs (build safely caught):', error);
        return NextResponse.json({ success: true, data: [] });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsedData = JobSchema.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json(
                { success: false, error: parsedData.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const job = await db.job.create({
            data: parsedData.data,
        });

        return NextResponse.json({ success: true, data: job }, { status: 201 });
    } catch (error) {
        console.error('Failed to create job:', error);
        throw error;
    }
}
