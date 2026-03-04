import Link from "next/link";

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

const categoryStyles: Record<string, string> = {
    Marketing: "bg-[rgba(235,133,51,0.1)] text-[#ffb836]",
    Design: "bg-[rgba(86,205,173,0.1)] text-[#56cdad]",
    Technology: "bg-[rgba(255,101,80,0.1)] text-[#ff6550]",
    Engineering: "bg-[rgba(70,64,222,0.1)] text-primary",
};

export function JobCard({ job }: JobCardProps) {
    const excerpt = job.description.length > 72 ? `${job.description.slice(0, 72)}...` : job.description;
    const categoryClass = categoryStyles[job.category] ?? "bg-[rgba(86,205,173,0.1)] text-[#56cdad]";

    return (
        <Link
            href={`/jobs/${job.id}`}
            className="flex h-full flex-col gap-4 border border-border bg-white p-5 transition-colors hover:border-primary/60 md:min-h-[320px] md:p-6"
        >
            <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f2f7] text-lg font-semibold text-[#25324b]">
                    {job.company.charAt(0)}
                </div>
                <span className="border border-primary px-3 py-1 text-base leading-[1.6] text-primary">
                    {job.type || "Full Time"}
                </span>
            </div>

            <div className="space-y-1">
                <h3 className="text-[20px] font-semibold leading-[1.2] text-[#25324b] md:text-[28px]">{job.title}</h3>
                <p className="text-base leading-[1.6] text-[#515b6f]">
                    {job.company} <span className="mx-1 text-[#a8adb7]">&bull;</span> {job.location}
                </p>
            </div>

            <p className="text-base leading-[1.6] text-[#7c8493]">{excerpt}</p>

            <div className="mt-auto flex flex-wrap items-center gap-2">
                <span className={`rounded-[80px] px-4 py-1 text-sm font-semibold ${categoryClass}`}>{job.category}</span>
                {job.type && (
                    <span className="rounded-[80px] bg-[rgba(70,64,222,0.1)] px-4 py-1 text-sm font-semibold text-primary">
                        {job.type}
                    </span>
                )}
            </div>
        </Link>
    );
}
