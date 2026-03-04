import { db } from "@/lib/db";
import { ensureDbInitialized } from "@/lib/db-init";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Briefcase, DollarSign, Calendar } from "lucide-react";
import { ApplyButton } from "./ApplyButton";
import { formatDistanceToNow } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function JobDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    let job = null;
    try {
        await ensureDbInitialized();
        job = await db.job.findUnique({
            where: { id },
        });
    } catch (e) {
        console.warn("Prisma error during static collection:", e);
    }

    if (!job) {
        notFound();
    }

    return (
        <div className="bg-[#F8F8FD] min-h-screen py-10 px-4 md:px-6">
            <div className="container mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
                    {/* Header Banner */}
                    <div className="bg-primary/5 p-8 md:p-12 border-b border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="h-24 w-24 md:h-28 md:w-28 rounded-xl bg-white flex items-center justify-center font-bold text-primary text-4xl shadow-sm border border-gray-100 flex-shrink-0">
                                {job.company.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">{job.title}</h1>
                                <p className="text-lg text-muted">{job.company}</p>
                                <div className="flex flex-wrap items-center gap-3 mt-4">
                                    <Badge variant="outline" className="text-sm py-1 px-3 bg-white">
                                        <MapPin className="w-4 h-4 mr-2 text-primary" />{job.location}
                                    </Badge>
                                    <Badge variant="outline" className="text-sm py-1 px-3 bg-white">
                                        <Briefcase className="w-4 h-4 mr-2 text-primary" />{job.type}
                                    </Badge>
                                    {job.salary && (
                                        <Badge variant="outline" className="text-sm py-1 px-3 bg-white">
                                            <DollarSign className="w-4 h-4 mr-2 text-primary" />{job.salary}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-auto flex flex-col gap-3">
                            <ApplyButton jobId={job.id} jobTitle={job.title} company={job.company} />
                            <p className="text-center md:text-right text-xs text-muted">Posted {formatDistanceToNow(job.createdAt, { addSuffix: true })}</p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 p-8 md:p-12">
                        {/* Main Content */}
                        <div className="lg:w-2/3">
                            <h2 className="text-xl font-bold mb-6">Job Description</h2>
                            <p className="text-muted leading-relaxed whitespace-pre-line">{job.description}</p>

                            <hr className="my-10 border-border" />

                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                                <h3 className="font-bold mb-4">About the Role</h3>
                                <div className="grid grid-cols-2 gap-y-4 text-sm">
                                    <div>
                                        <p className="text-muted mb-1">Category</p>
                                        <p className="font-medium text-foreground">{job.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted mb-1">Job Type</p>
                                        <p className="font-medium text-foreground">{job.type}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-1/3">
                            <div className="bg-[#F8F8FD] rounded-xl p-6 border border-border">
                                <h3 className="font-bold text-lg mb-6">About this role</h3>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted">Date Posted</p>
                                            <p className="font-semibold text-foreground">{job.createdAt.toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted">Location</p>
                                            <p className="font-semibold text-foreground">{job.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
