type ApiPayload = {
    success?: boolean;
    error?:
        | string
        | Record<string, string[]>
        | {
              message?: string;
              fieldErrors?: Record<string, string[]>;
          };
    data?: unknown;
    meta?: unknown;
};

export interface JobRecord {
    id: string;
    title: string;
    company: string;
    location: string;
    category: string;
    type: string;
    description: string;
    salary?: string | null;
    companyLogo?: string | null;
    createdAt: string;
    applications?: ApplicationRecord[];
}

export interface ApplicationRecord {
    id: string;
    jobId: string;
    name: string;
    email: string;
    resumeLink: string;
    coverNote: string;
    createdAt: string;
}

export interface JobsListMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export class ApiError extends Error {
    status: number;
    fieldErrors?: Record<string, string[]>;

    constructor(message: string, status: number, fieldErrors?: Record<string, string[]>) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.fieldErrors = fieldErrors;
    }
}

function normalizeApiError(
    rawError: ApiPayload['error'],
    fallbackMessage: string
): { message: string; fieldErrors?: Record<string, string[]> } {
    if (typeof rawError === 'string') {
        return { message: rawError };
    }

    if (!rawError || typeof rawError !== 'object') {
        return { message: fallbackMessage };
    }

    const maybeError = rawError as { message?: unknown; fieldErrors?: unknown };
    const hasFieldErrors =
        maybeError.fieldErrors &&
        typeof maybeError.fieldErrors === 'object' &&
        !Array.isArray(maybeError.fieldErrors);

    const legacyFieldErrorsEntries = Object.entries(rawError).filter(([, value]) =>
        Array.isArray(value)
    ) as Array<[string, string[]]>;

    const legacyFieldErrors =
        legacyFieldErrorsEntries.length > 0
            ? (Object.fromEntries(legacyFieldErrorsEntries) as Record<string, string[]>)
            : undefined;

    const fieldErrors = hasFieldErrors
        ? (maybeError.fieldErrors as Record<string, string[]>)
        : legacyFieldErrors;

    const firstFieldError = fieldErrors ? Object.values(fieldErrors).flat().find(Boolean) : undefined;
    const message =
        firstFieldError ??
        (typeof maybeError.message === 'string' && maybeError.message.length > 0
            ? maybeError.message
            : fallbackMessage);

    return { message, fieldErrors };
}

async function parseResponse<T, TMeta = unknown>(
    response: Response,
    fallbackMessage: string
): Promise<{ data: T; meta?: TMeta }> {
    let payload: ApiPayload = {};
    try {
        payload = (await response.json()) as ApiPayload;
    } catch {
        throw new ApiError(fallbackMessage, response.status);
    }

    if (!response.ok || !payload.success) {
        const normalizedError = normalizeApiError(payload.error, fallbackMessage);
        throw new ApiError(normalizedError.message, response.status, normalizedError.fieldErrors);
    }

    return {
        data: payload.data as T,
        meta: payload.meta as TMeta | undefined,
    };
}

async function parseResponseData<T>(response: Response, fallbackMessage: string): Promise<T> {
    const payload = await parseResponse<T>(response, fallbackMessage);
    return payload.data;
}

export async function fetchJobs(filters?: {
    search?: string;
    category?: string;
    location?: string;
    type?: string;
    sort?: string;
    page?: number;
    limit?: number;
}) {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.sort) params.append('sort', filters.sort);
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.limit) params.append('limit', String(filters.limit));

    const url = '/api/jobs' + (params.toString() ? '?' + params.toString() : '');
    const response = await fetch(url);
    const payload = await parseResponse<JobRecord[], JobsListMeta>(response, 'Failed to fetch jobs');
    return { jobs: payload.data, meta: payload.meta };
}

export async function fetchJob(id: string) {
    const response = await fetch(`/api/jobs/${id}`);
    return parseResponseData<JobRecord>(response, 'Failed to fetch job');
}

export async function createJob(jobData: Record<string, unknown>) {
    const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
    });

    return parseResponseData<JobRecord>(response, 'Failed to create job');
}

export async function deleteJob(id: string) {
    const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
    });

    return parseResponseData<JobRecord>(response, 'Failed to delete job');
}

export async function submitApplication(applicationData: Record<string, unknown>) {
    const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
    });

    return parseResponseData<ApplicationRecord>(response, 'Failed to submit application');
}
