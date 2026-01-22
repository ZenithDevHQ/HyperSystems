import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "stable" | "beta" | "coming-soon" | "planned";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "stable", children, ...props }, ref) => {
    const variants = {
      stable: "bg-hs-secondary/20 text-hs-secondary border-hs-secondary/30",
      beta: "bg-hs-primary/20 text-hs-primary border-hs-primary/30",
      "coming-soon":
        "bg-hs-text-muted/20 text-hs-text-muted border-hs-text-muted/30",
      planned: "bg-hs-border/50 text-hs-text-muted border-hs-border",
    };

    const labels = {
      stable: "Stable",
      beta: "Beta",
      "coming-soon": "Coming Soon",
      planned: "Planned",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
          variants[variant],
          className
        )}
        {...props}
      >
        {children ?? labels[variant]}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
