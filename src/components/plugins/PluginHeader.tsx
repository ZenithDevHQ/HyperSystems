"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Download } from "lucide-react";
import { Button, Badge, PluginIcon } from "@/components/ui";
import { type Plugin } from "@/lib/plugins";

interface PluginHeaderProps {
  plugin: Plugin;
}

export function PluginHeader({ plugin }: PluginHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-hs-primary/15 blur-[120px]" />
        <div className="absolute right-1/4 top-1/4 h-[300px] w-[400px] rounded-full bg-hs-secondary/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/plugins"
            className="inline-flex items-center gap-2 text-sm text-hs-text-muted transition-colors hover:text-hs-text"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Plugins
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between"
        >
          <div>
            {/* Icon and Title */}
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-hs-primary/15 to-hs-secondary/15 shadow-[var(--shadow-hs-sm)]">
                <PluginIcon name={plugin.iconName} className="h-8 w-8 text-hs-primary" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-hs-text sm:text-4xl">
                    {plugin.name}
                  </h1>
                  <Badge variant={plugin.status} />
                </div>
                <p className="mt-1 text-lg text-hs-text-muted">
                  {plugin.tagline}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-hs-text-muted leading-relaxed">
              {plugin.description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            {plugin.links?.github && (
              <Link
                href={plugin.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </Link>
            )}
            {plugin.links?.website && (
              <Link
                href={plugin.links.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <ExternalLink className="h-4 w-4" />
                  Visit Website
                </Button>
              </Link>
            )}
            {plugin.links?.curseforge && (
              <Link
                href={plugin.links.curseforge}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary">
                  <Download className="h-4 w-4" />
                  CurseForge
                </Button>
              </Link>
            )}
            {plugin.status === "coming-soon" && (
              <Link
                href="https://discord.gg/FZVeajBHEX"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>Notify Me</Button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
