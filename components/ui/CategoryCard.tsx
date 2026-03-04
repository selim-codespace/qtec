import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

interface CategoryCardProps {
    title: string;
    count: number;
    icon: LucideIcon;
    href: string;
    active?: boolean;
}

export function CategoryCard({ title, count, icon: Icon, href, active = false }: CategoryCardProps) {
    const desktopActive = active ? "md:border-primary md:bg-primary" : "hover:border-primary/60";
    const textColor = active ? "md:text-white text-[#25324b]" : "text-[#25324b]";
    const mutedColor = active ? "md:text-white text-[#7c8493]" : "text-[#7c8493]";

    return (
        <Link
            href={href}
            className={`group border border-border bg-white p-4 transition-colors md:min-h-[214px] md:p-8 ${desktopActive}`}
        >
            <div className="flex items-center gap-5 md:block">
                <Icon className={`h-10 w-10 text-primary md:h-12 md:w-12 ${active ? "md:text-white" : ""}`} />

                <div className="flex min-w-0 flex-1 items-center justify-between md:block">
                    <div className="min-w-0">
                        <h3 className={`font-clash text-[20px] font-semibold leading-[1.2] md:mt-8 md:text-3xl ${textColor}`}>
                            {title}
                        </h3>
                        <p className={`mt-1 text-base leading-[1.6] md:hidden ${mutedColor}`}>
                            {count} jobs available
                        </p>
                    </div>
                    <ArrowRight className={`h-5 w-5 shrink-0 ${textColor} md:hidden`} />
                </div>
            </div>

            <div className={`mt-3 hidden items-center gap-3 text-[18px] leading-[1.6] md:flex ${mutedColor}`}>
                <span>{count} jobs available</span>
                <ArrowRight className="h-5 w-5" />
            </div>
        </Link>
    );
}
