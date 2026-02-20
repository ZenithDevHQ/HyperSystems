import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "stable" | "beta" | "coming-soon" | "planned";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-white/5 text-hs-text-muted border-white/10",
      secondary: "bg-hs-secondary/15 text-hs-secondary border-hs-secondary/25",
      success: "bg-hs-success/15 text-hs-success border-hs-success/25",
      warning: "bg-hs-warning/15 text-hs-warning border-hs-warning/25",
      danger: "bg-hs-danger/15 text-hs-danger border-hs-danger/25",
      stable: "bg-hs-success/15 text-hs-success border-hs-success/25",
      beta: "bg-hs-warning/15 text-hs-warning border-hs-warning/25",
      "coming-soon": "bg-hs-secondary/15 text-hs-secondary border-hs-secondary/25",
      planned: "bg-white/5 text-hs-text-muted border-white/10",
    };

    const labels: Record<string, string> = {
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
