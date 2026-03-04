import Link from "next/link";

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
    const type = job.type || "Full-Time";
    const isFullTime = /full\s*-?\s*time/i.test(type);

    return (
        <Link href={`/jobs/${job.id}`} className="block bg-white p-4 transition-colors hover:bg-white/90 md:px-10 md:py-6">
            <div className="flex items-start gap-4 md:gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f1f2f7] text-lg font-semibold text-[#25324b] md:h-16 md:w-16 md:text-xl">
                    {job.company.charAt(0)}
                </div>

                <div className="min-w-0">
                    <h3 className="text-[20px] font-semibold leading-[1.2] text-[#25324b]">{job.title}</h3>
                    <p className="mt-1 text-base leading-[1.6] text-[#515b6f]">
                        {job.company} <span className="mx-1 text-[#a8adb7]">&bull;</span> {job.location}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span
                            className={`rounded-[80px] px-3 py-1 text-sm font-semibold ${
                                isFullTime ? "bg-[rgba(86,205,173,0.1)] text-[#56cdad]" : "bg-[rgba(255,101,80,0.1)] text-[#ff6550]"
                            }`}
                        >
                            {type}
                        </span>
                        <div className="h-6 w-px bg-border" />
                        <span className="rounded-[80px] border border-primary px-3 py-1 text-sm font-semibold text-primary">
                            {job.category}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
