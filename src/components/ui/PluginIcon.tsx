"use client";

import { Shield, Home, MapPin, Package } from "lucide-react";
import { type PluginIconName } from "@/lib/plugins";
import { cn } from "@/lib/utils";

const iconMap = {
  Shield,
  Home,
  MapPin,
  Package,
};

interface PluginIconProps {
  name: PluginIconName;
  className?: string;
}

export function PluginIcon({ name, className }: PluginIconProps) {
  const Icon = iconMap[name];
  return <Icon className={cn("h-5 w-5", className)} />;
}
