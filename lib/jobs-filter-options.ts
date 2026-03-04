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

export const JOB_POSTED_WITHIN_VALUES = ['any', '24h', '7d', '30d'] as const;

export type JobPostedWithin = (typeof JOB_POSTED_WITHIN_VALUES)[number];

export const JOB_POSTED_WITHIN_OPTIONS: ReadonlyArray<{
    value: JobPostedWithin;
    label: string;
}> = [
    { value: 'any', label: 'Any time' },
    { value: '24h', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
];
