import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { JOB_CATEGORIES, JOB_TYPES } from '@/lib/constants';

export const JOB_SORT_VALUES = [
    'latest',
    'oldest',
    'title_asc',
    'title_desc',
    'company_asc',
    'company_desc',
] as const;

export type JobSortValue = (typeof JOB_SORT_VALUES)[number];

export const JOB_SORT_OPTIONS: ReadonlyArray<{ value: JobSortValue; label: string }> = [
    { value: 'latest', label: 'Latest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'title_asc', label: 'Title (A-Z)' },
    { value: 'title_desc', label: 'Title (Z-A)' },
    { value: 'company_asc', label: 'Company (A-Z)' },
    { value: 'company_desc', label: 'Company (Z-A)' },
];

export const JOB_PAGE_LIMITS = [6, 9, 12, 24] as const;

const DEFAULT_LIMIT = JOB_PAGE_LIMITS[1];
const DEFAULT_SORT: JobSortValue = 'latest';

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

export function buildJobWhere(filters: Pick<JobListQuery, 'search' | 'location' | 'category' | 'type'>): Prisma.JobWhereInput {
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
