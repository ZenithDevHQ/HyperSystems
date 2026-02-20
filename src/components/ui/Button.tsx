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
      "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-hs-bg disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants = {
      primary:
        "bg-hs-primary text-hs-bg hover:bg-hs-primary-dark hover:shadow-[var(--shadow-hs-glow)] focus-visible:ring-hs-primary active:scale-[0.98]",
      secondary:
        "bg-hs-secondary text-white hover:bg-hs-secondary-dark hover:shadow-[0_0_20px_-4px_rgba(59,130,246,0.3)] focus-visible:ring-hs-secondary active:scale-[0.98]",
      outline:
        "border border-white/10 bg-transparent text-hs-text hover:bg-white/5 hover:border-white/15 focus-visible:ring-white/20 active:scale-[0.98]",
      ghost:
        "bg-transparent text-hs-text-muted hover:text-hs-text hover:bg-white/5 focus-visible:ring-white/20",
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
