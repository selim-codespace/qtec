"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ApiError, createJob, deleteJob } from "@/lib/api/jobs";
import { formatDistanceToNow } from "date-fns";
import { Trash2, Users, ExternalLink, Plus, LogOut, BriefcaseBusiness } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/constants";

type AdminApplication = {
    id: string;
    name: string;
    email: string;
    resumeLink: string;
    coverNote: string;
    createdAt: string | Date;
};

type AdminJob = {
    id: string;
    title: string;
    company: string;
    createdAt: string | Date;
    applications: AdminApplication[];
};

type NewJobForm = {
    title: string;
    company: string;
    location: string;
    category: (typeof JOB_CATEGORIES)[number];
    type: (typeof JOB_TYPES)[number];
    description: string;
    salary: string;
};

type AdminNotice = {
    type: "success" | "error";
    message: string;
};

const createDefaultForm = (): NewJobForm => ({
    title: "",
    company: "",
    location: "",
    category: JOB_CATEGORIES[0] ?? "Engineering",
    type: JOB_TYPES[0] ?? "Full Time",
    description: "",
    salary: "",
});

export function AdminDashboard({ initialJobs }: { initialJobs: AdminJob[] }) {
    const router = useRouter();
    const [jobs, setJobs] = useState<AdminJob[]>(initialJobs);
    const [expandedJob, setExpandedJob] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [form, setForm] = useState<NewJobForm>(createDefaultForm());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeletingJobId, setIsDeletingJobId] = useState<string | null>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<"latest" | "oldest" | "title_asc">("latest");
    const [notice, setNotice] = useState<AdminNotice | null>(null);

    const totalApplications = useMemo(
        () => jobs.reduce((total, job) => total + job.applications.length, 0),
        [jobs]
    );

    const visibleJobs = useMemo(() => {
        const normalizedTerm = searchTerm.trim().toLowerCase();
        let nextJobs = jobs.filter((job) => {
            if (!normalizedTerm) {
                return true;
            }

            return (
                job.title.toLowerCase().includes(normalizedTerm) ||
                job.company.toLowerCase().includes(normalizedTerm)
            );
        });

        nextJobs = [...nextJobs].sort((a, b) => {
            if (sortBy === "oldest") {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }

            if (sortBy === "title_asc") {
                return a.title.localeCompare(b.title);
            }

            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        return nextJobs;
    }, [jobs, searchTerm, sortBy]);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        setNotice(null);

        try {
            await fetch("/api/admin/logout", { method: "POST" });
            router.refresh();
        } catch {
            setNotice({ type: "error", message: "Failed to logout. Please try again." });
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this job and all its applications?")) return;

        setIsDeletingJobId(id);
        setNotice(null);

        try {
            await deleteJob(id);
            setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
            if (expandedJob === id) {
                setExpandedJob(null);
            }
            setNotice({ type: "success", message: "Job deleted successfully." });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to delete job";
            setNotice({ type: "error", message });
        } finally {
            setIsDeletingJobId(null);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setNotice(null);

        try {
            const newJob = await createJob(form);
            setJobs((prevJobs) => [{ ...newJob, applications: [] }, ...prevJobs]);
            setIsCreating(false);
            setForm(createDefaultForm());
            setNotice({ type: "success", message: "New job published successfully." });
        } catch (error) {
            if (error instanceof ApiError && error.fieldErrors) {
                const firstError = Object.values(error.fieldErrors).flat().find(Boolean);
                setNotice({
                    type: "error",
                    message: firstError ?? "Failed to create job. Please check all fields.",
                });
                return;
            }

            const message =
                error instanceof Error ? error.message : "Failed to create job. Please check all fields.";
            setNotice({ type: "error", message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#F8F8FD] min-h-screen py-10 px-4 md:px-6">
            <div className="container mx-auto">
                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-foreground">Admin Dashboard</h1>
                        <p className="text-muted">Manage job listings and review candidate applications.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button onClick={() => setIsCreating(!isCreating)} className="gap-2">
                            <Plus className="w-4 h-4" /> {isCreating ? "Close Form" : "Post New Job"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="gap-2"
                            disabled={isLoggingOut}
                        >
                            <LogOut className="w-4 h-4" /> {isLoggingOut ? "Logging out..." : "Logout"}
                        </Button>
                    </div>
                </div>

                {notice && (
                    <div
                        className={`mb-6 rounded-md px-4 py-3 text-sm ${
                            notice.type === "success"
                                ? "bg-success/10 text-success"
                                : "bg-danger/10 text-danger"
                        }`}
                    >
                        {notice.message}
                    </div>
                )}

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-border bg-white p-4">
                        <p className="text-xs font-semibold text-muted uppercase tracking-wide">Total Jobs</p>
                        <p className="mt-2 text-2xl font-bold text-foreground">{jobs.length}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-white p-4">
                        <p className="text-xs font-semibold text-muted uppercase tracking-wide">Applications</p>
                        <p className="mt-2 text-2xl font-bold text-foreground">{totalApplications}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-white p-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                            <BriefcaseBusiness className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-muted uppercase tracking-wide">Visible Jobs</p>
                            <p className="mt-1 text-xl font-bold text-foreground">{visibleJobs.length}</p>
                        </div>
                    </div>
                </div>

                {isCreating && (
                    <div className="bg-white p-6 rounded-xl border border-border mb-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    placeholder="Job Title"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    required
                                />
                                <Input
                                    placeholder="Company Name"
                                    value={form.company}
                                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                                    required
                                />
                                <Input
                                    placeholder="Location (e.g. Remote, US)"
                                    value={form.location}
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    required
                                />
                                <Input
                                    placeholder="Salary (e.g. $100k - $120k)"
                                    value={form.salary}
                                    onChange={(e) => setForm({ ...form, salary: e.target.value })}
                                />

                                <select
                                    className="flex h-11 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-sm"
                                    value={form.category}
                                    onChange={(e) =>
                                        setForm({ ...form, category: e.target.value as NewJobForm["category"] })
                                    }
                                >
                                    {JOB_CATEGORIES.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className="flex h-11 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-sm"
                                    value={form.type}
                                    onChange={(e) =>
                                        setForm({ ...form, type: e.target.value as NewJobForm["type"] })
                                    }
                                >
                                    {JOB_TYPES.map((jobType) => (
                                        <option key={jobType} value={jobType}>
                                            {jobType}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <textarea
                                className="w-full min-h-[150px] rounded-md border border-border p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Job Description..."
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                required
                            />
                            <div className="flex justify-end gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setIsCreating(false)}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Publishing..." : "Publish Job"}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div className="w-full md:max-w-sm">
                        <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-1 block">
                            Search Jobs
                        </label>
                        <Input
                            placeholder="Filter by title or company"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-auto">
                        <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-1 block">
                            Sort
                        </label>
                        <select
                            className="flex h-11 w-full md:w-[210px] rounded-md border border-border bg-white px-3 py-1 text-sm shadow-sm"
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value as "latest" | "oldest" | "title_asc")
                            }
                        >
                            <option value="latest">Latest first</option>
                            <option value="oldest">Oldest first</option>
                            <option value="title_asc">Title (A-Z)</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="md:hidden divide-y divide-border">
                        {visibleJobs.length === 0 ? (
                            <div className="p-6 text-center text-muted">No jobs found for your current filters.</div>
                        ) : (
                            visibleJobs.map((job) => (
                                <div key={job.id} className="p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="font-semibold text-foreground">{job.title}</h3>
                                            <p className="text-sm text-muted mt-1">{job.company}</p>
                                            <p className="text-xs text-muted mt-1">
                                                {formatDistanceToNow(new Date(job.createdAt), {
                                                    addSuffix: true,
                                                })}
                                            </p>
                                        </div>
                                        <Badge variant="brand">
                                            <Users className="w-3 h-3 mr-1" /> {job.applications.length}
                                        </Badge>
                                    </div>

                                    <div className="mt-4 flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            type="button"
                                            onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                                        >
                                            {expandedJob === job.id ? "Hide Applications" : "View Applications"}
                                        </Button>
                                        <a
                                            href={`/jobs/${job.id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="h-8 rounded-md border border-border px-3 text-xs font-semibold text-muted hover:text-primary inline-flex items-center gap-1"
                                        >
                                            <ExternalLink className="w-3 h-3" /> Open
                                        </a>
                                        <button
                                            onClick={() => handleDelete(job.id)}
                                            disabled={isDeletingJobId === job.id}
                                            className="h-8 rounded-md border border-border px-3 text-xs font-semibold text-muted hover:text-danger disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-1"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                            {isDeletingJobId === job.id ? "Deleting..." : "Delete"}
                                        </button>
                                    </div>

                                    {expandedJob === job.id && (
                                        <div className="mt-4 rounded-lg border border-border bg-[#F8F8FD] p-3">
                                            <h4 className="font-bold text-xs mb-3">
                                                Applications for {job.title}
                                            </h4>
                                            {job.applications.length === 0 ? (
                                                <p className="text-xs text-muted">No applications received yet.</p>
                                            ) : (
                                                <div className="space-y-3">
                                                    {job.applications.map((app) => (
                                                        <div key={app.id} className="rounded border border-border bg-white p-3">
                                                            <div className="flex justify-between gap-3">
                                                                <div>
                                                                    <p className="font-semibold text-sm">{app.name}</p>
                                                                    <p className="text-xs text-muted">{app.email}</p>
                                                                </div>
                                                                <a
                                                                    href={app.resumeLink}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="text-xs font-bold text-primary hover:underline"
                                                                >
                                                                    Resume
                                                                </a>
                                                            </div>
                                                            <p className="mt-2 text-xs text-foreground bg-gray-50 p-2 rounded line-clamp-3">
                                                                {app.coverNote}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-border">
                                    <th className="p-4 font-semibold text-sm text-foreground">Job Title</th>
                                    <th className="p-4 font-semibold text-sm text-foreground">Company</th>
                                    <th className="p-4 font-semibold text-sm text-foreground">Date Posted</th>
                                    <th className="p-4 font-semibold text-sm text-foreground text-center">Applications</th>
                                    <th className="p-4 font-semibold text-sm text-foreground text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleJobs.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-muted">
                                            No jobs found for your current filters.
                                        </td>
                                    </tr>
                                ) : (
                                    visibleJobs.map((job) => (
                                        <React.Fragment key={job.id}>
                                            <tr className="border-b border-border hover:bg-gray-50 transition-colors">
                                                <td className="p-4 font-medium">{job.title}</td>
                                                <td className="p-4 text-muted">{job.company}</td>
                                                <td className="p-4 text-sm text-muted">
                                                    {formatDistanceToNow(new Date(job.createdAt), {
                                                        addSuffix: true,
                                                    })}
                                                </td>
                                                <td className="p-4 text-center">
                                                    <Badge
                                                        variant="brand"
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            setExpandedJob(expandedJob === job.id ? null : job.id)
                                                        }
                                                    >
                                                        <Users className="w-3 h-3 mr-1" /> {job.applications.length}
                                                    </Badge>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <a
                                                            href={`/jobs/${job.id}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="p-2 text-muted hover:text-primary transition-colors"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                        <button
                                                            onClick={() => handleDelete(job.id)}
                                                            disabled={isDeletingJobId === job.id}
                                                            className="p-2 text-muted hover:text-danger disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                                                        >
                                                            {isDeletingJobId === job.id ? (
                                                                <span className="text-xs font-semibold">...</span>
                                                            ) : (
                                                                <Trash2 className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedJob === job.id && (
                                                <tr className="bg-[#F8F8FD]">
                                                    <td colSpan={5} className="p-6 border-b border-border">
                                                        <h4 className="font-bold text-sm mb-4">
                                                            Applications for {job.title}
                                                        </h4>
                                                        {job.applications.length === 0 ? (
                                                            <p className="text-sm text-muted">No applications received yet.</p>
                                                        ) : (
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                {job.applications.map((app) => (
                                                                    <div
                                                                        key={app.id}
                                                                        className="bg-white p-4 rounded border border-border"
                                                                    >
                                                                        <div className="flex justify-between items-start mb-2">
                                                                            <div>
                                                                                <p className="font-bold">{app.name}</p>
                                                                                <p className="text-xs text-muted">
                                                                                    {app.email}
                                                                                </p>
                                                                            </div>
                                                                            <a
                                                                                href={app.resumeLink}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                className="text-xs font-bold text-primary hover:underline"
                                                                            >
                                                                                View Resume
                                                                            </a>
                                                                        </div>
                                                                        <p className="text-sm mt-3 text-foreground line-clamp-3 bg-gray-50 p-2 rounded">
                                                                            {app.coverNote}
                                                                        </p>
                                                                        <p className="text-xs text-muted mt-2 text-right">
                                                                            {new Date(app.createdAt).toLocaleDateString()}
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
