import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "success" | "warning" | "danger" | "outline" | "brand"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors border max-w-max",
                {
                    "border-transparent bg-gray-100 text-gray-900": variant === "default",
                    "border-transparent bg-primary/10 text-primary": variant === "brand",
                    "border-transparent bg-secondary text-primary": variant === "secondary",
                    "border-transparent bg-success/10 text-success": variant === "success",
                    "border-transparent bg-warning/10 text-warning": variant === "warning",
                    "border-transparent bg-danger/10 text-danger": variant === "danger",
                    "border-border text-foreground text-opacity-80": variant === "outline",
                },
                className
            )}
            {...props}
        />
    )
}

export { Badge }
