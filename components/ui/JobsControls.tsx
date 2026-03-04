"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    JOB_PAGE_LIMITS,
    JOB_POSTED_WITHIN_OPTIONS,
    JOB_SORT_OPTIONS,
    JobPostedWithin,
    JobSortValue,
} from "@/lib/jobs-filter-options";

type JobsControlsProps = {
    initialSort: JobSortValue;
    initialLimit: number;
    initialPostedWithin: JobPostedWithin;
    hasActiveFilters: boolean;
};

const DEFAULT_SORT: JobSortValue = "latest";
const DEFAULT_LIMIT = JOB_PAGE_LIMITS[1] ?? 9;
const DEFAULT_POSTED_WITHIN: JobPostedWithin = "any";

export function JobsControls({
    initialSort,
    initialLimit,
    initialPostedWithin,
    hasActiveFilters,
}: JobsControlsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [sort, setSort] = useState<JobSortValue>(initialSort);
    const [limit, setLimit] = useState<number>(initialLimit);
    const [postedWithin, setPostedWithin] = useState<JobPostedWithin>(initialPostedWithin);

    const handleApply = (e: FormEvent) => {
        e.preventDefault();

        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");

        if (sort === DEFAULT_SORT) params.delete("sort");
        else params.set("sort", sort);

        if (limit === DEFAULT_LIMIT) params.delete("limit");
        else params.set("limit", String(limit));

        if (postedWithin === DEFAULT_POSTED_WITHIN) params.delete("postedWithin");
        else params.set("postedWithin", postedWithin);

        const query = params.toString();
        startTransition(() => {
            router.push(query ? `/jobs?${query}` : "/jobs");
        });
    };

    const handleReset = () => {
        startTransition(() => {
            router.push("/jobs");
        });
    };

    return (
        <form onSubmit={handleApply} className="flex flex-col sm:flex-row gap-3">
            <label className="flex flex-col gap-1 text-xs font-semibold text-muted">
                Sort
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as JobSortValue)}
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
                Posted
                <select
                    value={postedWithin}
                    onChange={(e) => setPostedWithin(e.target.value as JobPostedWithin)}
                    className="h-11 rounded-md border border-border bg-white px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                    {JOB_POSTED_WITHIN_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col gap-1 text-xs font-semibold text-muted">
                Per page
                <select
                    value={String(limit)}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="h-11 rounded-md border border-border bg-white px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                    {JOB_PAGE_LIMITS.map((pageLimit) => (
                        <option key={pageLimit} value={pageLimit}>
                            {pageLimit}
                        </option>
                    ))}
                </select>
            </label>

            <button
                type="submit"
                disabled={isPending}
                className="h-11 rounded-md bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70 transition-colors"
            >
                {isPending ? "Applying..." : "Apply"}
            </button>

            {hasActiveFilters && (
                <button
                    type="button"
                    onClick={handleReset}
                    disabled={isPending}
                    className="h-11 rounded-md border border-border px-5 text-sm font-semibold text-muted hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70 transition-colors"
                >
                    Reset
                </button>
            )}
        </form>
    );
}
