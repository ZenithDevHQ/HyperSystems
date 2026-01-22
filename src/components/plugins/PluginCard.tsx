"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
  Button,
  PluginIcon,
} from "@/components/ui";
import { type Plugin, type PluginStatus } from "@/lib/plugins";

interface PluginCardProps {
  plugin: Plugin;
  index?: number;
}

export function PluginCard({ plugin, index = 0 }: PluginCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card hover className="group h-full">
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
              <PluginIcon name={plugin.iconName} className="h-5 w-5 text-hs-primary" />
            </div>
            <div>
              <CardTitle>{plugin.name}</CardTitle>
              <CardDescription className="mt-0.5">
                {plugin.tagline}
              </CardDescription>
            </div>
          </div>
          <Badge variant={plugin.status as PluginStatus} />
        </CardHeader>

        <p className="text-sm text-hs-text-muted">{plugin.description}</p>

        <ul className="mt-4 space-y-1.5">
          {plugin.features.slice(0, 4).map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-hs-text-muted"
            >
              <span className="h-1 w-1 rounded-full bg-hs-secondary" />
              {feature}
            </li>
          ))}
          {plugin.features.length > 4 && (
            <li className="text-sm text-hs-text-muted">
              +{plugin.features.length - 4} more features
            </li>
          )}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Link href={`/plugins/${plugin.id}`}>
            <Button variant="ghost" size="sm" className="group/btn">
              Learn More
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </Link>
          {plugin.links?.website && (
            <Link
              href={plugin.links.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-3.5 w-3.5" />
                Website
              </Button>
            </Link>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
