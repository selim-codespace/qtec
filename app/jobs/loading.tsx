import { Skeleton } from "@/components/ui/Skeleton";

export default function JobsLoading() {
    return (
        <div className="min-h-screen bg-[#F8F8FD] py-10 px-4 md:px-6">
            <div className="container mx-auto">
                <Skeleton className="h-10 w-64 mb-8" />
                <Skeleton className="h-[88px] w-full mb-10" />

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-24" />
                        {Array.from({ length: 7 }).map((_, index) => (
                            <Skeleton key={index} className="h-6 w-full" />
                        ))}
                    </div>

                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                            <Skeleton className="h-8 w-56" />
                            <Skeleton className="h-11 w-full sm:w-[430px]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="rounded-lg border border-border bg-white p-5 space-y-4">
                                    <div className="flex justify-between">
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <Skeleton className="h-7 w-24" />
                                    </div>
                                    <Skeleton className="h-7 w-10/12" />
                                    <Skeleton className="h-5 w-8/12" />
                                    <Skeleton className="h-5 w-full" />
                                    <Skeleton className="h-5 w-10/12" />
                                    <Skeleton className="h-7 w-28" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
