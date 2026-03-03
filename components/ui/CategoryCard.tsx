import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
    title: string;
    count: number;
    icon: LucideIcon;
    href: string;
}

export function CategoryCard({ title, count, icon: Icon, href }: CategoryCardProps) {
    return (
        <Link href={href} className="group flex flex-col items-start p-6 border border-border rounded-xl bg-white hover:border-primary hover:shadow-md transition-all">
            <div className="p-3 bg-gray-50 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {title}
            </h3>
            <p className="text-muted text-sm mt-1 flex items-center gap-1 group-hover:text-foreground transition-colors">
                {count} jobs available <span className="text-primary font-bold ml-1">→</span>
            </p>
        </Link>
    );
}
