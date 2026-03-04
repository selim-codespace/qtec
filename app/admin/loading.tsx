export default function AdminLoading() {
    return (
        <div className="min-h-[50vh] flex items-center justify-center bg-[#F8F8FD] px-4">
            <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
                <p className="text-sm font-medium text-muted">Loading admin dashboard...</p>
            </div>
        </div>
    );
}
