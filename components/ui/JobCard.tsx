import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Briefcase } from "lucide-react";

interface JobCardProps {
    job: {
        id: string;
        title: string;
        company: string;
        location: string;
        category: string;
        type: string;
        description: string;
        salary?: string | null;
    };
}

export function JobCard({ job }: JobCardProps) {
    // Extract a brief excerpt
    const excerpt = job.description.substring(0, 100) + "...";

    return (
        <Link href={`/jobs/${job.id}`} className="group block">
            <div className="h-full rounded-lg border border-border bg-white p-6 shadow-sm transition-all hover:border-primary hover:shadow-md job-card-hover flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center font-bold text-primary flex-shrink-0 relative overflow-hidden">
                            {/* Fallback avatar generator using company initial */}
                            <span className="text-xl">{job.company.charAt(0)}</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                {job.title}
                            </h3>
                            <p className="text-muted text-sm mt-0.5">
                                {job.company} • <span className="inline-flex items-center text-xs"><MapPin className="w-3 h-3 mr-1 inline" />{job.location}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-muted mb-6 flex-grow line-clamp-2">
                    {excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-auto">
                    <Badge variant={job.type === "Full Time" ? "brand" : "warning"}>
                        {job.type}
                    </Badge>
                    <div className="w-px h-4 bg-border mx-1" />
                    <Badge variant="success">
                        {job.category}
                    </Badge>
                </div>
            </div>
        </Link>
    );
}
