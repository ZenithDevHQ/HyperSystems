import { Shield, Swords, Coins, MessageCircle, Globe } from "lucide-react";
import { type PluginIconName } from "@/lib/plugins";
import { cn } from "@/lib/utils";

const iconMap = {
  Shield,
  Swords,
  Coins,
  MessageCircle,
  Globe,
};

interface PluginIconProps {
  name: PluginIconName;
  className?: string;
}

export function PluginIcon({ name, className }: PluginIconProps) {
  const Icon = iconMap[name];
  return <Icon className={cn("h-5 w-5", className)} />;
}
