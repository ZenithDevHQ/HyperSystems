import { AlertCircle, Info, Lightbulb, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type InfoBoxVariant = "info" | "tip" | "warning" | "danger";

interface InfoBoxProps {
  variant?: InfoBoxVariant;
  title?: string;
  children: React.ReactNode;
}

const variantConfig: Record<
  InfoBoxVariant,
  {
    icon: typeof Info;
    borderColor: string;
    bgColor: string;
    iconColor: string;
    titleColor: string;
    defaultTitle: string;
  }
> = {
  info: {
    icon: Info,
    borderColor: "border-l-hs-info",
    bgColor: "bg-hs-info/10",
    iconColor: "text-hs-info",
    titleColor: "text-hs-info",
    defaultTitle: "Info",
  },
  tip: {
    icon: Lightbulb,
    borderColor: "border-l-hs-success",
    bgColor: "bg-hs-success/10",
    iconColor: "text-hs-success",
    titleColor: "text-hs-success",
    defaultTitle: "Tip",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-l-hs-warning",
    bgColor: "bg-hs-warning/10",
    iconColor: "text-hs-warning",
    titleColor: "text-hs-warning",
    defaultTitle: "Warning",
  },
  danger: {
    icon: AlertCircle,
    borderColor: "border-l-hs-danger",
    bgColor: "bg-hs-danger/10",
    iconColor: "text-hs-danger",
    titleColor: "text-hs-danger",
    defaultTitle: "Danger",
  },
};

export function InfoBox({ variant = "info", title, children }: InfoBoxProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-4 rounded-lg border-l-4 p-4",
        config.borderColor,
        config.bgColor
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 flex-shrink-0", config.iconColor)} />
        <div className="flex-1">
          <p className={cn("font-semibold", config.titleColor)}>
            {title || config.defaultTitle}
          </p>
          <div className="mt-1 text-sm text-hs-text-muted">{children}</div>
        </div>
      </div>
    </div>
  );
}
