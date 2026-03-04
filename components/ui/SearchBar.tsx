"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, MapPin, Search } from "lucide-react";

interface SearchBarProps {
    defaultSearch?: string;
    defaultLocation?: string;
    className?: string;
}

export function SearchBar({ defaultSearch = "", defaultLocation = "", className = "" }: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [keyword, setKeyword] = useState(defaultSearch);
    const [location, setLocation] = useState(defaultLocation);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        const nextKeyword = keyword.trim();
        const nextLocation = location.trim();

        if (nextKeyword) params.set("search", nextKeyword);
        else params.delete("search");

        if (nextLocation) params.set("location", nextLocation);
        else params.delete("location");

        const query = params.toString();
        router.push(query ? `/jobs?${query}` : "/jobs");
    };

    return (
        <form
            onSubmit={handleSearch}
            className={`w-full bg-white p-4 shadow-[0px_79px_128px_0px_rgba(192,192,192,0.09),0px_28.836px_46.722px_0px_rgba(192,192,192,0.06),0px_13.999px_22.683px_0px_rgba(192,192,192,0.05),0px_6.863px_11.119px_0px_rgba(192,192,192,0.04),0px_2.714px_4.397px_0px_rgba(192,192,192,0.03)] md:max-w-[852px] ${className}`}
        >
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-0">
                <div className="flex flex-1 items-center gap-4 px-2 py-2 md:px-4">
                    <Search className="h-6 w-6 text-[#25324b]" />
                    <div className="w-full border-b border-[#d6ddeb] pb-3 pt-2">
                        <input
                            type="text"
                            placeholder="Job title or keyword"
                            className="w-full bg-transparent text-base text-[#25324b] outline-none placeholder:text-[#7c8493]"
                            value={keyword}
                            onChange={(event) => setKeyword(event.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-1 items-center gap-4 px-2 py-2 md:px-4">
                    <MapPin className="h-6 w-6 text-[#25324b]" />
                    <div className="flex w-full items-center justify-between border-b border-[#d6ddeb] pb-3 pt-2">
                        <input
                            type="text"
                            className="w-full bg-transparent text-base text-[#25324b] outline-none placeholder:text-[#7c8493]"
                            value={location}
                            placeholder="Florence, Italy"
                            onChange={(event) => setLocation(event.target.value)}
                        />
                        <ChevronDown className="h-4 w-4 text-[#25324b]" />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-3 h-14 w-full bg-primary px-7 text-lg font-bold text-white transition-colors hover:bg-primary-hover md:mt-0 md:min-w-[209px] md:w-auto"
                >
                    Search my job
                </button>
            </div>
        </form>
    );
}
