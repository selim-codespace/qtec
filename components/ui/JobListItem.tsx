import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { MapPin } from "lucide-react";

interface JobListItemProps {
    job: {
        id: string;
        title: string;
        company: string;
        location: string;
        category: string;
        type: string;
    };
}

export function JobListItem({ job }: JobListItemProps) {
    return (
        <Link href={`/jobs/${job.id}`} className="block">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-border bg-white hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center font-bold text-primary flex-shrink-0">
                        {job.company.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground text-lg hover:text-primary transition-colors">
                            {job.title}
                        </h3>
                        <p className="text-muted text-sm mt-1 flex items-center gap-2">
                            <span>{job.company}</span>
                            <span>•</span>
                            <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" />{job.location}</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant={job.type === "Full Time" ? "brand" : "warning"}>
                        {job.type}
                    </Badge>
                    <div className="w-px h-4 bg-border hidden sm:block" />
                    <Badge variant="outline" className="hidden sm:inline-flex">
                        {job.category}
                    </Badge>
                </div>
            </div>
        </Link>
    );
}
