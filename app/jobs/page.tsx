import Link from 'next/link';
import { db } from '@/lib/db';
import { ensureDbInitialized } from '@/lib/db-init';
import { JobCard } from '@/components/ui/JobCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { JOB_CATEGORIES, JOB_TYPES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
    buildJobWhere,
    buildPaginationMeta,
    clampPage,
    getDefaultJobListQuery,
    getJobOrderBy,
    getTotalPages,
    JOB_PAGE_LIMITS,
    JOB_SORT_OPTIONS,
    JobListQuery,
    parseJobListQuery,
} from '@/lib/jobs-query';

export const dynamic = 'force-dynamic';

type JobListEntry = {
    id: string;
    title: string;
    company: string;
    location: string;
    category: string;
    type: string;
    description: string;
    salary?: string | null;
};

const DEFAULT_QUERY = getDefaultJobListQuery();

function buildJobsUrl(filters: JobListQuery, updates: Partial<JobListQuery>) {
    const params = new URLSearchParams();
    const nextFilters = { ...filters, ...updates };

    if (nextFilters.search) params.set('search', nextFilters.search);
    if (nextFilters.location) params.set('location', nextFilters.location);
    if (nextFilters.category) params.set('category', nextFilters.category);
    if (nextFilters.type) params.set('type', nextFilters.type);
    if (nextFilters.sort !== DEFAULT_QUERY.sort) params.set('sort', nextFilters.sort);
    if (nextFilters.limit !== DEFAULT_QUERY.limit) params.set('limit', String(nextFilters.limit));
    if (nextFilters.page > 1) params.set('page', String(nextFilters.page));

    const query = params.toString();
    return query ? `/jobs?${query}` : '/jobs';
}

export default async function JobsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const sParams = await searchParams;
    const parsedQuery = parseJobListQuery(sParams);
    const query = parsedQuery.success ? parsedQuery.data : DEFAULT_QUERY;

    const where = buildJobWhere(query);

    await ensureDbInitialized();
    const total = await db.job.count({ where });
    const totalPages = getTotalPages(total, query.limit);
    const currentPage = clampPage(query.page, totalPages);
    const pagination = buildPaginationMeta(total, currentPage, query.limit);

    const jobs = (await db.job.findMany({
        where,
        orderBy: getJobOrderBy(query.sort),
        skip: (currentPage - 1) * query.limit,
        take: query.limit,
    })) as JobListEntry[];

    const hasActiveFilters =
        Boolean(query.search) ||
        Boolean(query.location) ||
        Boolean(query.category) ||
        Boolean(query.type) ||
        query.sort !== DEFAULT_QUERY.sort ||
        query.limit !== DEFAULT_QUERY.limit;

    const resultsStart = pagination.total > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0;
    const resultsEnd = Math.min(pagination.page * pagination.limit, pagination.total);

    return (
        <div className="bg-[#F8F8FD] min-h-screen py-10 px-4 md:px-6">
            <div className="container mx-auto">
                <h1 className="text-3xl md:text-4xl font-black text-foreground mb-8">
                    Find your <span className="text-[#32D0EB]">dream job</span>
                </h1>

                <div className="mb-12">
                    <SearchBar
                        key={`${query.search ?? ''}:${query.location ?? ''}`}
                        defaultSearch={query.search ?? ''}
                        defaultLocation={query.location ?? ''}
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="w-full lg:w-1/4 flex-shrink-0">
                        <div className="bg-white p-6 rounded-xl border border-border shadow-sm sticky top-24">
                            <h2 className="font-bold text-lg mb-4">Filters</h2>

                            <div className="mb-6">
                                <h3 className="font-semibold text-sm mb-3 text-muted">Category</h3>
                                <div className="space-y-2">
                                    <Link
                                        href={buildJobsUrl(query, { category: undefined, page: 1 })}
                                        className={cn(
                                            'block text-sm rounded-md px-2 py-1 hover:bg-primary/5',
                                            !query.category && 'text-primary font-semibold'
                                        )}
                                    >
                                        All categories
                                    </Link>
                                    {JOB_CATEGORIES.map((category) => (
                                        <Link
                                            key={category}
                                            href={buildJobsUrl(query, { category, page: 1 })}
                                            className={cn(
                                                'block text-sm rounded-md px-2 py-1 hover:bg-primary/5',
                                                query.category === category &&
                                                    'text-primary font-semibold bg-primary/5'
                                            )}
                                        >
                                            {category}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-sm mb-3 text-muted">Job Type</h3>
                                <div className="space-y-2">
                                    <Link
                                        href={buildJobsUrl(query, { type: undefined, page: 1 })}
                                        className={cn(
                                            'block text-sm rounded-md px-2 py-1 hover:bg-primary/5',
                                            !query.type && 'text-primary font-semibold'
                                        )}
                                    >
                                        All types
                                    </Link>
                                    {JOB_TYPES.map((type) => (
                                        <Link
                                            key={type}
                                            href={buildJobsUrl(query, { type, page: 1 })}
                                            className={cn(
                                                'block text-sm rounded-md px-2 py-1 hover:bg-primary/5',
                                                query.type === type && 'text-primary font-semibold bg-primary/5'
                                            )}
                                        >
                                            {type}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div className="flex-1">
                        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                            <div>
                                <h2 className="text-xl font-bold">All Jobs</h2>
                                <p className="text-muted text-sm mt-1">
                                    Showing {resultsStart}-{resultsEnd} of {pagination.total} results
                                </p>
                            </div>

                            <form method="get" className="flex flex-col sm:flex-row gap-3">
                                {query.search && <input type="hidden" name="search" value={query.search} />}
                                {query.location && <input type="hidden" name="location" value={query.location} />}
                                {query.category && <input type="hidden" name="category" value={query.category} />}
                                {query.type && <input type="hidden" name="type" value={query.type} />}
                                <input type="hidden" name="page" value="1" />

                                <label className="flex flex-col gap-1 text-xs font-semibold text-muted">
                                    Sort
                                    <select
                                        name="sort"
                                        defaultValue={query.sort}
                                        className="h-11 rounded-md border border-border bg-white px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        {JOB_SORT_OPTIONS.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="flex flex-col gap-1 text-xs font-semibold text-muted">
                                    Per page
                                    <select
                                        name="limit"
                                        defaultValue={String(query.limit)}
                                        className="h-11 rounded-md border border-border bg-white px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        {JOB_PAGE_LIMITS.map((limit) => (
                                            <option key={limit} value={limit}>
                                                {limit}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <button
                                    type="submit"
                                    className="h-11 rounded-md bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
                                >
                                    Apply
                                </button>

                                {hasActiveFilters && (
                                    <Link
                                        href="/jobs"
                                        className="h-11 rounded-md border border-border px-5 text-sm font-semibold text-muted hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
                                    >
                                        Reset
                                    </Link>
                                )}
                            </form>
                        </div>

                        {jobs.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {jobs.map((job) => (
                                        <JobCard key={job.id} job={job} />
                                    ))}
                                </div>

                                <div className="mt-8 flex items-center justify-between gap-4 rounded-xl border border-border bg-white p-4">
                                    <span className="text-sm text-muted">
                                        Page {pagination.page} of {pagination.totalPages}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        {pagination.hasPreviousPage ? (
                                            <Link
                                                href={buildJobsUrl(query, { page: pagination.page - 1 })}
                                                className="h-10 rounded-md border border-border px-4 text-sm font-semibold text-foreground hover:bg-gray-50 inline-flex items-center"
                                            >
                                                Previous
                                            </Link>
                                        ) : (
                                            <span className="h-10 rounded-md border border-border px-4 text-sm font-semibold text-muted/60 inline-flex items-center">
                                                Previous
                                            </span>
                                        )}

                                        {pagination.hasNextPage ? (
                                            <Link
                                                href={buildJobsUrl(query, { page: pagination.page + 1 })}
                                                className="h-10 rounded-md border border-border px-4 text-sm font-semibold text-foreground hover:bg-gray-50 inline-flex items-center"
                                            >
                                                Next
                                            </Link>
                                        ) : (
                                            <span className="h-10 rounded-md border border-border px-4 text-sm font-semibold text-muted/60 inline-flex items-center">
                                                Next
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-white border border-border rounded-xl p-12 text-center shadow-sm">
                                <p className="text-muted mb-4">No jobs found matching your criteria.</p>
                                <Link href="/jobs" className="text-primary font-bold hover:underline">
                                    Clear all filters
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
