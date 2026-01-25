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
    borderColor: "border-l-blue-500",
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-500",
    titleColor: "text-blue-400",
    defaultTitle: "Info",
  },
  tip: {
    icon: Lightbulb,
    borderColor: "border-l-green-500",
    bgColor: "bg-green-500/10",
    iconColor: "text-green-500",
    titleColor: "text-green-400",
    defaultTitle: "Tip",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-l-yellow-500",
    bgColor: "bg-yellow-500/10",
    iconColor: "text-yellow-500",
    titleColor: "text-yellow-400",
    defaultTitle: "Warning",
  },
  danger: {
    icon: AlertCircle,
    borderColor: "border-l-red-500",
    bgColor: "bg-red-500/10",
    iconColor: "text-red-500",
    titleColor: "text-red-400",
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
