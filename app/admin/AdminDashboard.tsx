"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { deleteJob, createJob } from "@/lib/api/jobs";
import { formatDistanceToNow } from "date-fns";
import { Trash2, Users, ExternalLink, Plus, LogOut } from "lucide-react";
import { Input } from "@/components/ui/Input";

export function AdminDashboard({ initialJobs }: { initialJobs: any[] }) {
    const router = useRouter();
    const [jobs, setJobs] = useState(initialJobs);
    const [expandedJob, setExpandedJob] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [form, setForm] = useState({
        title: "", company: "", location: "", category: "Engineering", type: "Full Time", description: "", salary: ""
    });

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.refresh();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this job and all its applications?")) return;
        try {
            await deleteJob(id);
            setJobs(jobs.filter(j => j.id !== id));
        } catch (err) {
            alert("Failed to delete job");
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newJob = await createJob(form);
            setJobs([{ ...newJob, applications: [] }, ...jobs]);
            setIsCreating(false);
            setForm({ title: "", company: "", location: "", category: "Engineering", type: "Full Time", description: "", salary: "" });
        } catch (err) {
            alert("Failed to create job. Please check all fields.");
        }
    };

    return (
        <div className="bg-[#F8F8FD] min-h-screen py-10 px-4 md:px-6">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-foreground">Admin Dashboard</h1>
                        <p className="text-muted">Manage your job listings and view applications.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={() => setIsCreating(!isCreating)} className="gap-2">
                            <Plus className="w-4 h-4" /> Post New Job
                        </Button>
                        <Button variant="outline" onClick={handleLogout} className="gap-2">
                            <LogOut className="w-4 h-4" /> Logout
                        </Button>
                    </div>
                </div>

                {isCreating && (
                    <div className="bg-white p-6 rounded-xl border border-border mb-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input placeholder="Job Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                                <Input placeholder="Company Name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required />
                                <Input placeholder="Location (e.g. Remote, US)" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required />
                                <Input placeholder="Salary (e.g. $100k - $120k)" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} />

                                <select
                                    className="flex h-11 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-sm"
                                    value={form.category}
                                    onChange={e => setForm({ ...form, category: e.target.value })}
                                >
                                    {["Design", "Sales", "Marketing", "Finance", "Technology", "Engineering", "Business", "Human Resource"].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>

                                <select
                                    className="flex h-11 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-sm"
                                    value={form.type}
                                    onChange={e => setForm({ ...form, type: e.target.value })}
                                >
                                    {["Full Time", "Part Time", "Contract", "Freelance"].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <textarea
                                className="w-full min-h-[150px] rounded-md border border-border p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Job Description..."
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                required
                            />
                            <div className="flex justify-end gap-3 pt-2">
                                <Button type="button" variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                                <Button type="submit">Publish Job</Button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
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
                                {jobs.length === 0 ? (
                                    <tr><td colSpan={5} className="p-8 text-center text-muted">No jobs posted yet.</td></tr>
                                ) : jobs.map((job) => (
                                    <React.Fragment key={job.id}>
                                        <tr className="border-b border-border hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-medium">{job.title}</td>
                                            <td className="p-4 text-muted">{job.company}</td>
                                            <td className="p-4 text-sm text-muted">{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</td>
                                            <td className="p-4 text-center">
                                                <Badge variant="brand" className="cursor-pointer" onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}>
                                                    <Users className="w-3 h-3 mr-1" /> {job.applications.length}
                                                </Badge>
                                            </td>
                                            <td className="p-4 flex items-center justify-end gap-2">
                                                <a href={`/jobs/${job.id}`} target="_blank" rel="noreferrer" className="p-2 text-muted hover:text-primary transition-colors">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                                <button onClick={() => handleDelete(job.id)} className="p-2 text-muted hover:text-danger transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                        {expandedJob === job.id && (
                                            <tr className="bg-[#F8F8FD]">
                                                <td colSpan={5} className="p-6 border-b border-border">
                                                    <h4 className="font-bold text-sm mb-4">Applications for {job.title}</h4>
                                                    {job.applications.length === 0 ? (
                                                        <p className="text-sm text-muted">No applications received yet.</p>
                                                    ) : (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {job.applications.map((app: any) => (
                                                                <div key={app.id} className="bg-white p-4 rounded border border-border">
                                                                    <div className="flex justify-between items-start mb-2">
                                                                        <div>
                                                                            <p className="font-bold">{app.name}</p>
                                                                            <p className="text-xs text-muted">{app.email}</p>
                                                                        </div>
                                                                        <a href={app.resumeLink} target="_blank" rel="noreferrer" className="text-xs font-bold text-primary hover:underline">
                                                                            View Resume
                                                                        </a>
                                                                    </div>
                                                                    <p className="text-sm mt-3 text-foreground line-clamp-3 bg-gray-50 p-2 rounded">{app.coverNote}</p>
                                                                    <p className="text-xs text-muted mt-2 text-right">{new Date(app.createdAt).toLocaleDateString()}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
