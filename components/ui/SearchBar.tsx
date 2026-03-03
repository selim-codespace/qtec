"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SearchBar() {
    const router = useRouter();
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (keyword) params.append("search", keyword);
        if (location) params.append("location", location);

        router.push(`/jobs?${params.toString()}`);
    };

    return (
        <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row w-full bg-white p-2 rounded-lg shadow-sm border border-border mt-8"
        >
            <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-border">
                <Search className="w-5 h-5 text-muted mr-3" />
                <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full bg-transparent border-none focus:outline-none text-foreground placeholder-muted"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <div className="flex-1 flex items-center px-4 py-2">
                <MapPin className="w-5 h-5 text-muted mr-3" />
                <input
                    type="text"
                    placeholder="Florence, Italy"
                    className="w-full bg-transparent border-none focus:outline-none text-foreground placeholder-muted"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <Button type="submit" size="lg" className="w-full md:w-auto md:px-8 mt-2 md:mt-0 font-bold">
                Search my job
            </Button>
        </form>
    );
}
