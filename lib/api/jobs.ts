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
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Failed to fetch jobs');
    return data.data;
}

export async function fetchJob(id: string) {
    const res = await fetch(`/api/jobs/${id}`);
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Failed to fetch job');
    return data.data;
}

export async function createJob(jobData: any) {
    const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Failed to create job');
    return data.data;
}

export async function deleteJob(id: string) {
    const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Failed to delete job');
    return data.data;
}

export async function submitApplication(applicationData: any) {
    const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Failed to submit application');
    return data.data;
}
