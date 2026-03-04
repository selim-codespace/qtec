import Link from 'next/link';
import { db } from '@/lib/db';
import { ensureDbInitialized } from '@/lib/db-init';
import { JobCard } from '@/components/ui/JobCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { JOB_CATEGORIES, JOB_TYPES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

type JobsFilters = {
    search?: string;
    location?: string;
    category?: string;
    type?: string;
};

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

function buildJobsUrl(filters: JobsFilters, updates: Partial<JobsFilters>) {
    const params = new URLSearchParams();
    const nextFilters = { ...filters, ...updates };

    if (nextFilters.search) params.set('search', nextFilters.search);
    if (nextFilters.location) params.set('location', nextFilters.location);
    if (nextFilters.category) params.set('category', nextFilters.category);
    if (nextFilters.type) params.set('type', nextFilters.type);

    const query = params.toString();
    return query ? `/jobs?${query}` : '/jobs';
}

export default async function JobsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const sParams = await searchParams;
    const filters: JobsFilters = {
        search: typeof sParams.search === 'string' ? sParams.search.trim() : undefined,
        location: typeof sParams.location === 'string' ? sParams.location.trim() : undefined,
        category: typeof sParams.category === 'string' ? sParams.category.trim() : undefined,
        type: typeof sParams.type === 'string' ? sParams.type.trim() : undefined,
    };

    const where: Record<string, unknown> = {};
    if (filters.search) {
        where.OR = [
            { title: { contains: filters.search } },
            { company: { contains: filters.search } },
            { description: { contains: filters.search } },
        ];
    }
    if (filters.location) where.location = { contains: filters.location };
    if (filters.category) where.category = filters.category;
    if (filters.type) where.type = filters.type;

    await ensureDbInitialized();
    const jobs = (await db.job.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    })) as JobListEntry[];

    return (
        <div className="bg-[#F8F8FD] min-h-screen py-10 px-4 md:px-6">
            <div className="container mx-auto">
                <h1 className="text-3xl md:text-4xl font-black text-foreground mb-8">
                    Find your <span className="text-[#32D0EB]">dream job</span>
                </h1>

                <div className="mb-12">
                    <SearchBar
                        key={`${filters.search ?? ''}:${filters.location ?? ''}`}
                        defaultSearch={filters.search ?? ''}
                        defaultLocation={filters.location ?? ''}
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
                                        href={buildJobsUrl(filters, { category: undefined })}
                                        className={cn(
                                            'block text-sm rounded-md px-2 py-1 hover:bg-primary/5',
                                            !filters.category && 'text-primary font-semibold'
                                        )}
                                    >
                                        All categories
                                    </Link>
                                    {JOB_CATEGORIES.map((category) => (
                                        <Link
                                            key={category}
                                            href={buildJobsUrl(filters, { category })}
                                            className={cn(
                                                'block text-sm rounded-md px-2 py-1 hover:bg-primary/5',
                                                filters.category === category && 'text-primary font-semibold bg-primary/5'
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
                                        href={buildJobsUrl(filters, { type: undefined })}
                                        className={cn(
                                            'block text-sm rounded-md px-2 py-1 hover:bg-primary/5',
                                            !filters.type && 'text-primary font-semibold'
                                        )}
                                    >
                                        All types
                                    </Link>
                                    {JOB_TYPES.map((type) => (
                                        <Link
                                            key={type}
                                            href={buildJobsUrl(filters, { type })}
                                            className={cn(
                                                'block text-sm rounded-md px-2 py-1 hover:bg-primary/5',
                                                filters.type === type && 'text-primary font-semibold bg-primary/5'
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
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">
                                All Jobs{' '}
                                <span className="text-muted font-normal text-base ml-2">
                                    Showing {jobs.length} results
                                </span>
                            </h2>
                        </div>

                        {jobs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {jobs.map((job) => (
                                    <JobCard key={job.id} job={job} />
                                ))}
                            </div>
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
