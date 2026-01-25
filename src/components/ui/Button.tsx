"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-hs-bg disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-hs-primary text-hs-bg hover:bg-hs-primary-dark focus:ring-hs-primary",
      secondary:
        "bg-hs-secondary text-hs-bg hover:bg-hs-secondary-dark focus:ring-hs-secondary",
      outline:
        "border border-hs-border bg-transparent text-hs-text hover:bg-hs-surface hover:border-hs-text-muted focus:ring-hs-border",
      ghost:
        "bg-transparent text-hs-text-muted hover:text-hs-text hover:bg-hs-surface focus:ring-hs-border",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
