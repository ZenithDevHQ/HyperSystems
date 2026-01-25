import { cn } from "@/lib/utils";

interface PageSectionProps {
  variant?: "default" | "surface";
  border?: "top" | "bottom" | "both" | "none";
  className?: string;
  children: React.ReactNode;
}

export function PageSection({
  variant = "default",
  border = "none",
  className,
  children,
}: PageSectionProps) {
  return (
    <section
      className={cn(
        "py-16",
        variant === "surface" && "bg-hs-surface",
        border === "top" && "border-t border-hs-border",
        border === "bottom" && "border-b border-hs-border",
        border === "both" && "border-y border-hs-border",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
