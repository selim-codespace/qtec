import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, icon, ...props }, ref) => {
        return (
            <div className="relative w-full text-left">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-11 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
                        icon && "pl-10",
                        error && "border-danger focus-visible:ring-danger",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <span className="text-xs text-danger mt-1 absolute block">{error}</span>}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
