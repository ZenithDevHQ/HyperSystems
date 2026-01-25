import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "stable" | "beta" | "coming-soon" | "planned";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-hs-border/50 text-hs-text-muted border-hs-border",
      secondary: "bg-hs-secondary/20 text-hs-secondary border-hs-secondary/30",
      success: "bg-hs-success/20 text-hs-success border-hs-success/30",
      warning: "bg-hs-warning/20 text-hs-warning border-hs-warning/30",
      danger: "bg-hs-danger/20 text-hs-danger border-hs-danger/30",
      stable: "bg-hs-success/20 text-hs-success border-hs-success/30",
      beta: "bg-hs-warning/20 text-hs-warning border-hs-warning/30",
      "coming-soon": "bg-hs-secondary/20 text-hs-secondary border-hs-secondary/30",
      planned: "bg-hs-border/50 text-hs-text-muted border-hs-border",
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
        {children ?? labels[variant] ?? children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
