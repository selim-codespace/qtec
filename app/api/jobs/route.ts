import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ensureDbInitialized } from '@/lib/db-init';
import { isAdminAuthenticated } from '@/lib/auth';
import { JobSchema } from '@/lib/validators';
import { apiError, apiSuccess, apiValidationError } from '@/lib/api-response';
import {
    buildJobWhere,
    buildPaginationMeta,
    clampPage,
    getJobOrderBy,
    getTotalPages,
    parseJobListQuery,
} from '@/lib/jobs-query';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const parsedQuery = parseJobListQuery(req.nextUrl.searchParams);
        if (!parsedQuery.success) {
            return apiError('Invalid query parameters', 400, {
                fieldErrors: parsedQuery.error.flatten().fieldErrors,
            });
        }

        const { page, limit, sort, search, location, category, type, postedWithin } = parsedQuery.data;
        const where = buildJobWhere({ search, location, category, type, postedWithin });

        await ensureDbInitialized();
        const total = await db.job.count({ where });
        const totalPages = getTotalPages(total, limit);
        const currentPage = clampPage(page, totalPages);

        const jobs = await db.job.findMany({
            where,
            orderBy: getJobOrderBy(sort),
            skip: (currentPage - 1) * limit,
            take: limit,
            include: {
                _count: {
                    select: { applications: true },
                },
            },
        });

        return apiSuccess(jobs, {
            meta: buildPaginationMeta(total, currentPage, limit),
        });
    } catch (error) {
        console.error('Failed to fetch jobs:', error);
        return apiError('Failed to fetch jobs', 500);
    }
}

export async function POST(req: NextRequest) {
    try {
        const isAdmin = await isAdminAuthenticated();
        if (!isAdmin) {
            return apiError('Unauthorized', 401);
        }

        const body = await req.json();
        const parsedData = JobSchema.safeParse(body);

        if (!parsedData.success) {
            return apiValidationError(parsedData.error);
        }

        await ensureDbInitialized();
        const job = await db.job.create({
            data: parsedData.data,
        });

        return apiSuccess(job, { status: 201 });
    } catch (error) {
        console.error('Failed to create job:', error);
        return apiError('Failed to create job', 500);
    }
}
