import { db } from "@/lib/db";
import { JobCard } from "@/components/ui/JobCard";
import { SearchBar } from "@/components/ui/SearchBar";

export const dynamic = "force-dynamic";

export default async function JobsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const sParams = await searchParams;
    const search = typeof sParams.search === "string" ? sParams.search : undefined;
    const location = typeof sParams.location === "string" ? sParams.location : undefined;
    const category = typeof sParams.category === "string" ? sParams.category : undefined;
    const type = typeof sParams.type === "string" ? sParams.type : undefined;

    const where: any = {};
    if (search) where.title = { contains: search };
    if (location) where.location = { contains: location };
    if (category) where.category = category;
    if (type) where.type = type;

    let jobs: any[] = [];
    try {
        jobs = await db.job.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });
    } catch (e) {
        console.warn("Prisma error during static collection:", e);
    }

    return (
        <div className="bg-[#F8F8FD] min-h-screen py-10 px-4 md:px-6">
            <div className="container mx-auto">
                <h1 className="text-3xl md:text-4xl font-black text-foreground mb-8">
                    Find your <span className="text-[#32D0EB]">dream job</span>
                </h1>

                <div className="mb-12">
                    <SearchBar />
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-1/4 flex-shrink-0">
                        <div className="bg-white p-6 rounded-xl border border-border shadow-sm sticky top-24">
                            <h2 className="font-bold text-lg mb-4">Filters</h2>

                            <div className="mb-6">
                                <h3 className="font-semibold text-sm mb-3 text-muted">Category</h3>
                                <div className="space-y-2">
                                    {["Design", "Sales", "Marketing", "Finance", "Technology", "Engineering", "Business", "Human Resource"].map((cat) => (
                                        <label key={cat} className="flex items-center gap-2 cursor-pointer transition-colors hover:text-primary">
                                            <input
                                                type="radio"
                                                name="category"
                                                className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                                                defaultChecked={category === cat}
                                                // Requires a form submittal or client component for interactivity. For simplicity, we just style it.
                                                onChange={() => {
                                                    if (typeof window !== "undefined") {
                                                        const url = new URL(window.location.href);
                                                        url.searchParams.set("category", cat);
                                                        window.location.href = url.toString();
                                                    }
                                                }}
                                            />
                                            <span className="text-sm">{cat}</span>
                                        </label>
                                    ))}
                                    <a href="/jobs" className="text-sm text-primary hover:underline mt-2 inline-block">Clear Categories</a>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-sm mb-3 text-muted">Job Type</h3>
                                <div className="space-y-2">
                                    {["Full Time", "Part Time", "Contract", "Freelance"].map((t) => (
                                        <label key={t} className="flex items-center gap-2 cursor-pointer transition-colors hover:text-primary">
                                            <input
                                                type="radio"
                                                name="type"
                                                className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                                                defaultChecked={type === t}
                                                onChange={() => {
                                                    if (typeof window !== "undefined") {
                                                        const url = new URL(window.location.href);
                                                        url.searchParams.set("type", t);
                                                        window.location.href = url.toString();
                                                    }
                                                }}
                                            />
                                            <span className="text-sm">{t}</span>
                                        </label>
                                    ))}
                                    <a href={(typeof window !== "undefined") ? (() => {
                                        const u = new URL(window.location.href);
                                        u.searchParams.delete("type");
                                        return u.toString()
                                    })() : "/jobs"} className="text-sm text-primary hover:underline mt-2 inline-block">Clear Types</a>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Job Listings Grid */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">
                                All Jobs <span className="text-muted font-normal text-base ml-2">Showing {jobs.length} results</span>
                            </h2>
                        </div>

                        {jobs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {jobs.map((job: any) => (
                                    <JobCard key={job.id} job={job} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white border border-border rounded-xl p-12 text-center shadow-sm">
                                <p className="text-muted mb-4">No jobs found matching your criteria.</p>
                                <a href="/jobs" className="text-primary font-bold hover:underline">Clear all filters</a>
                            </div>
                        )}

                        {/* Pagination Placeholder */}
                        {jobs.length > 0 && (
                            <div className="flex justify-center mt-12 gap-2">
                                <button className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover:bg-gray-50 transition-colors pointer-events-none opacity-50">&lt;</button>
                                <button className="w-10 h-10 rounded-md bg-primary text-white flex items-center justify-center">1</button>
                                <button className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover:bg-gray-50 transition-colors">2</button>
                                <button className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover:bg-gray-50 transition-colors">3</button>
                                <button className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover:bg-gray-50 transition-colors">&gt;</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
