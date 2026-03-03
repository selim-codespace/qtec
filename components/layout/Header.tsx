import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="inline-block font-bold text-xl text-primary font-sans">
                            QuickHire
                        </span>
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link
                            href="/jobs"
                            className="text-sm font-medium text-muted hover:text-primary transition-colors"
                        >
                            Find Jobs
                        </Link>
                        <Link
                            href="/companies"
                            className="text-sm font-medium text-muted hover:text-primary transition-colors"
                        >
                            Browse Companies
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/login" className="hidden sm:inline-flex">
                        <Button variant="ghost" className="text-primary font-bold">Login</Button>
                    </Link>
                    <Link href="/register">
                        <Button>Sign Up</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
