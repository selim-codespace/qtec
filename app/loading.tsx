export default function Loading() {
    const appName = process.env.NEXT_PUBLIC_APP_NAME?.trim() || "QuickHire";

    return (
        <div className="flex items-center justify-center min-h-[50vh] bg-background">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <p className="text-muted font-medium animate-pulse">Loading {appName}...</p>
            </div>
        </div>
    );
}
