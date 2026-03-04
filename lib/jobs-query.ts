import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { JOB_CATEGORIES, JOB_TYPES } from '@/lib/constants';
import {
    JOB_PAGE_LIMITS,
    JOB_POSTED_WITHIN_VALUES,
    JOB_SORT_VALUES,
    JobPostedWithin,
    JobSortValue,
} from '@/lib/jobs-filter-options';

export {
    JOB_PAGE_LIMITS,
    JOB_POSTED_WITHIN_OPTIONS,
    JOB_POSTED_WITHIN_VALUES,
    JOB_SORT_OPTIONS,
    JOB_SORT_VALUES,
} from '@/lib/jobs-filter-options';

const DEFAULT_LIMIT = JOB_PAGE_LIMITS[1];
const DEFAULT_SORT: JobSortValue = 'latest';
const DEFAULT_POSTED_WITHIN: JobPostedWithin = 'any';

function toOptionalTrimmedString(maxLength: number) {
    return z.preprocess(
        (value) => {
            if (typeof value !== 'string') {
                return value;
            }

            const trimmed = value.trim();
            return trimmed.length > 0 ? trimmed : undefined;
        },
        z.string().max(maxLength).optional()
    );
}

function toOptionalEnum<const TValues extends readonly [string, ...string[]]>(values: TValues) {
    return z.preprocess(
        (value) => {
            if (typeof value !== 'string') {
                return value;
            }

            const trimmed = value.trim();
            return trimmed.length > 0 ? trimmed : undefined;
        },
        z.enum(values).optional()
    );
}

const JobListQuerySchema = z.object({
    search: toOptionalTrimmedString(120),
    location: toOptionalTrimmedString(120),
    category: toOptionalEnum(JOB_CATEGORIES),
    type: toOptionalEnum(JOB_TYPES),
    sort: z.preprocess(
        (value) => {
            if (typeof value !== 'string') {
                return value;
            }

            const trimmed = value.trim();
            return trimmed.length > 0 ? trimmed : undefined;
        },
        z.enum(JOB_SORT_VALUES).default(DEFAULT_SORT)
    ),
    postedWithin: z.preprocess(
        (value) => {
            if (typeof value !== 'string') {
                return value;
            }

            const trimmed = value.trim();
            return trimmed.length > 0 ? trimmed : undefined;
        },
        z.enum(JOB_POSTED_WITHIN_VALUES).default(DEFAULT_POSTED_WITHIN)
    ),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce
        .number()
        .int()
        .default(DEFAULT_LIMIT)
        .refine(
            (value) =>
                JOB_PAGE_LIMITS.includes(value as (typeof JOB_PAGE_LIMITS)[number]),
            `Limit must be one of ${JOB_PAGE_LIMITS.join(', ')}`
        ),
});

export type JobListQuery = z.infer<typeof JobListQuerySchema>;

export type JobQueryInput = URLSearchParams | Record<string, string | string[] | undefined>;

function normalizeInput(input: JobQueryInput) {
    if (input instanceof URLSearchParams) {
        return Object.fromEntries(input.entries());
    }

    const normalized: Record<string, string | undefined> = {};
    for (const [key, value] of Object.entries(input)) {
        normalized[key] = Array.isArray(value) ? value[0] : value;
    }

    return normalized;
}

export function getDefaultJobListQuery(): JobListQuery {
    return JobListQuerySchema.parse({});
}

export function parseJobListQuery(input: JobQueryInput) {
    return JobListQuerySchema.safeParse(normalizeInput(input));
}

function getPostedWithinDate(value: JobPostedWithin) {
    const now = new Date();

    if (value === '24h') {
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    if (value === '7d') {
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    if (value === '30d') {
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    return undefined;
}

export function buildJobWhere(
    filters: Pick<JobListQuery, 'search' | 'location' | 'category' | 'type' | 'postedWithin'>
): Prisma.JobWhereInput {
    const where: Prisma.JobWhereInput = {};

    if (filters.search) {
        where.OR = [
            { title: { contains: filters.search, mode: 'insensitive' } },
            { company: { contains: filters.search, mode: 'insensitive' } },
            { description: { contains: filters.search, mode: 'insensitive' } },
        ];
    }

    if (filters.location) {
        where.location = { contains: filters.location, mode: 'insensitive' };
    }

    if (filters.category) {
        where.category = filters.category;
    }

    if (filters.type) {
        where.type = filters.type;
    }

    const postedWithinDate = getPostedWithinDate(filters.postedWithin);
    if (postedWithinDate) {
        where.createdAt = { gte: postedWithinDate };
    }

    return where;
}

export function getJobOrderBy(sort: JobSortValue): Prisma.JobOrderByWithRelationInput {
    switch (sort) {
        case 'oldest':
            return { createdAt: 'asc' };
        case 'title_asc':
            return { title: 'asc' };
        case 'title_desc':
            return { title: 'desc' };
        case 'company_asc':
            return { company: 'asc' };
        case 'company_desc':
            return { company: 'desc' };
        case 'latest':
        default:
            return { createdAt: 'desc' };
    }
}

export type JobsPaginationMeta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

export function getTotalPages(total: number, limit: number) {
    return Math.max(1, Math.ceil(total / limit));
}

export function clampPage(page: number, totalPages: number) {
    return Math.min(Math.max(page, 1), totalPages);
}

export function buildPaginationMeta(total: number, page: number, limit: number): JobsPaginationMeta {
    const totalPages = getTotalPages(total, limit);
    const safePage = clampPage(page, totalPages);

    return {
        total,
        page: safePage,
        limit,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPreviousPage: safePage > 1,
    };
}
