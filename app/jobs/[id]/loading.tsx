import { Skeleton } from "@/components/ui/Skeleton";

export default function JobDetailLoading() {
    return (
        <div className="bg-[#F8F8FD] min-h-screen py-10 px-4 md:px-6">
            <div className="container mx-auto">
                <div className="bg-white rounded-xl border border-border overflow-hidden">
                    <div className="p-8 md:p-12 border-b border-border">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div className="flex items-center gap-5">
                                <Skeleton className="h-24 w-24 rounded-xl" />
                                <div className="space-y-3">
                                    <Skeleton className="h-9 w-72 max-w-[70vw]" />
                                    <Skeleton className="h-6 w-44" />
                                    <Skeleton className="h-6 w-60" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Skeleton className="h-12 w-40" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-52" />
                            {Array.from({ length: 7 }).map((_, index) => (
                                <Skeleton key={index} className="h-5 w-full" />
                            ))}
                        </div>

                        <div className="rounded-xl border border-border p-6 space-y-4">
                            <Skeleton className="h-7 w-36" />
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton key={index} className="h-14 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
