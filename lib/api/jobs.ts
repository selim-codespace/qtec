type ApiPayload = {
    success?: boolean;
    error?: string | Record<string, string[]>;
    data?: unknown;
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

async function parseResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
    let payload: ApiPayload = {};
    try {
        payload = (await response.json()) as ApiPayload;
    } catch {
        throw new ApiError(fallbackMessage, response.status);
    }

    if (!response.ok || !payload.success) {
        if (typeof payload.error === 'string') {
            throw new ApiError(payload.error, response.status);
        }

        if (payload.error && typeof payload.error === 'object') {
            const fieldErrors = payload.error;
            const firstError = Object.values(fieldErrors).flat().find(Boolean);
            throw new ApiError(firstError ?? fallbackMessage, response.status, fieldErrors);
        }

        throw new ApiError(fallbackMessage, response.status);
    }

    return payload.data as T;
}

export async function fetchJobs(filters?: {
    search?: string;
    category?: string;
    location?: string;
    type?: string;
}) {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.type) params.append('type', filters.type);

    const url = '/api/jobs' + (params.toString() ? '?' + params.toString() : '');
    const response = await fetch(url);
    return parseResponse<JobRecord[]>(response, 'Failed to fetch jobs');
}

export async function fetchJob(id: string) {
    const response = await fetch(`/api/jobs/${id}`);
    return parseResponse<JobRecord>(response, 'Failed to fetch job');
}

export async function createJob(jobData: Record<string, unknown>) {
    const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
    });

    return parseResponse<JobRecord>(response, 'Failed to create job');
}

export async function deleteJob(id: string) {
    const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
    });

    return parseResponse<JobRecord>(response, 'Failed to delete job');
}

export async function submitApplication(applicationData: Record<string, unknown>) {
    const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
    });

    return parseResponse<ApplicationRecord>(response, 'Failed to submit application');
}
