import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("relative w-full min-w-0", className)}>
        <select
          className={cn(
            "flex h-10 w-full appearance-none rounded-md border border-input bg-background py-2 pl-3 pr-10 text-sm text-foreground ring-offset-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "[&>option]:bg-background [&>option]:text-foreground"
          )}
          ref={ref}
          {...props}
        />
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
