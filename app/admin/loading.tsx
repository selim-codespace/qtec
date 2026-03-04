import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminLoading() {
    return (
        <div className="min-h-screen bg-[#F8F8FD] py-10 px-4 md:px-6">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-64" />
                        <Skeleton className="h-5 w-96 max-w-full" />
                    </div>
                    <div className="flex gap-3">
                        <Skeleton className="h-11 w-36" />
                        <Skeleton className="h-11 w-28" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="rounded-xl border border-border bg-white p-4">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-16 mt-2" />
                        </div>
                    ))}
                </div>

                <div className="rounded-xl border border-border bg-white p-4 space-y-4">
                    <div className="flex flex-col md:flex-row gap-3 md:justify-between">
                        <Skeleton className="h-11 w-full md:w-80" />
                        <Skeleton className="h-11 w-full md:w-56" />
                    </div>

                    <div className="space-y-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} className="h-14 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
