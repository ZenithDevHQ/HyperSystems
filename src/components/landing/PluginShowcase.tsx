"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge, Button, PluginIcon } from "@/components/ui";
import { plugins, type Plugin } from "@/lib/plugins";
import { CodePreview } from "./CodePreview";

const codeSnippets: Record<string, { title?: string; lines: Array<{ text: string; className?: string }> }> = {
  hyperfactions: {
    title: "faction-gameplay.log",
    lines: [
      { text: "> /f create Vanguard", className: "text-zinc-300" },
      { text: '  Faction "Vanguard" created!', className: "text-emerald-400" },
      { text: "> /f claim", className: "text-zinc-300" },
      { text: "  Chunk (-3, 12) claimed for Vanguard", className: "text-emerald-400" },
      { text: "> /f ally Ironclad", className: "text-zinc-300" },
      { text: "  Alliance request sent to Ironclad", className: "text-cyan-400" },
      { text: "> /f who Vanguard", className: "text-zinc-300" },
      { text: "  Power: 24/30 | Land: 5 | Members: 3", className: "text-zinc-500" },
    ],
  },
  hyperperms: {
    title: "groups.yml",
    lines: [
      { text: "groups:", className: "text-cyan-400" },
      { text: "  default:", className: "text-zinc-300" },
      { text: '    prefix: "&7"', className: "text-zinc-500" },
      { text: "    permissions:", className: "text-zinc-300" },
      { text: "      - ecotale.balance", className: "text-emerald-400" },
      { text: "      - werchat.chat", className: "text-emerald-400" },
      { text: "  admin:", className: "text-zinc-300" },
      { text: "    inherits: [moderator]", className: "text-cyan-400" },
      { text: '    prefix: "&c[Admin]"', className: "text-zinc-500" },
      { text: "      - \"*\"", className: "text-amber-400" },
    ],
  },
  ecotale: {
    title: "economy.log",
    lines: [
      { text: "> /balance", className: "text-zinc-300" },
      { text: "  Balance: 1,250 coins", className: "text-emerald-400" },
      { text: "> /pay Steve 200", className: "text-zinc-300" },
      { text: "  Sent 200 coins to Steve", className: "text-cyan-400" },
      { text: "> /jobs list", className: "text-zinc-300" },
      { text: "  Miner: +5/ore | Farmer: +3/crop", className: "text-zinc-500" },
    ],
  },
  werchat: {
    title: "chat-config.yml",
    lines: [
      { text: "channels:", className: "text-cyan-400" },
      { text: "  global:", className: "text-zinc-300" },
      { text: '    format: "&7[G] {name}: {msg}"', className: "text-zinc-500" },
      { text: "    radius: -1", className: "text-emerald-400" },
      { text: "  local:", className: "text-zinc-300" },
      { text: "    radius: 100", className: "text-emerald-400" },
    ],
  },
  terranova: {
    title: "biome-node.json",
    lines: [
      { text: "{", className: "text-zinc-500" },
      { text: '  "type": "BiomeGenerator",', className: "text-cyan-400" },
      { text: '  "terrain": "rolling_hills",', className: "text-zinc-300" },
      { text: '  "elevation": [64, 128],', className: "text-emerald-400" },
      { text: '  "materials": ["grass", "stone"],', className: "text-zinc-300" },
      { text: '  "props": ["oak_tree", "boulder"]', className: "text-zinc-500" },
      { text: "}", className: "text-zinc-500" },
    ],
  },
};

function FeaturedCard({ plugin }: { plugin: Plugin }) {
  const snippet = codeSnippets[plugin.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8"
    >
      {/* Animated border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "linear-gradient(135deg, rgba(6,182,212,0.1), transparent 50%, rgba(59,130,246,0.1))",
        }}
      />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        {/* Left — info */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-hs-primary/15 to-hs-secondary/15">
              <PluginIcon name={plugin.iconName} className="h-6 w-6 text-hs-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-hs-text">{plugin.name}</h3>
                <Badge variant={plugin.status} />
              </div>
              <p className="text-sm text-hs-text-muted">{plugin.tagline}</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-hs-text-muted">
            {plugin.description}
          </p>

          <ul className="mt-4 space-y-1.5">
            {plugin.features.slice(0, 5).map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-hs-text-muted"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-hs-primary/60" />
                {feature}
              </li>
            ))}
            {plugin.features.length > 5 && (
              <li className="text-sm text-hs-text-muted">
                +{plugin.features.length - 5} more features
              </li>
            )}
          </ul>

          <div className="mt-6">
            <Link href={`/plugins/${plugin.id}`}>
              <Button variant="ghost" size="sm" className="group/btn">
                Learn More
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right — code preview */}
        {snippet && (
          <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0">
            <CodePreview lines={snippet.lines} title={snippet.title} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SmallCard({ plugin, index }: { plugin: Plugin; index: number }) {
  const snippet = codeSnippets[plugin.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors hover:border-white/[0.12]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/15 to-hs-secondary/15">
          <PluginIcon name={plugin.iconName} className="h-5 w-5 text-hs-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-hs-text">{plugin.name}</h3>
            {plugin.isDesktopApp ? (
              <span className="rounded-full border border-hs-primary/30 bg-hs-primary/10 px-2 py-0.5 text-[10px] font-medium text-hs-primary">
                Desktop App
              </span>
            ) : (
              <Badge variant={plugin.status} />
            )}
          </div>
          <p className="text-xs text-hs-text-muted">{plugin.tagline}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-hs-text-muted leading-relaxed">
        {plugin.description}
      </p>

      {snippet && (
        <div className="mt-4">
          <CodePreview lines={snippet.lines.slice(0, 5)} title={snippet.title} />
        </div>
      )}

      <div className="mt-4">
        <Link href={`/plugins/${plugin.id}`}>
          <Button variant="ghost" size="sm" className="group/btn">
            Learn More
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

export function PluginShowcase() {
  const hyperfactions = plugins.find((p) => p.id === "hyperfactions")!;
  const hyperperms = plugins.find((p) => p.id === "hyperperms")!;
  const rest = plugins.filter((p) => p.id !== "hyperfactions" && p.id !== "hyperperms");

  return (
    <section className="relative bg-hs-surface py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-hs-text sm:text-4xl lg:text-5xl">
            The HyperSystems Suite
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-hs-text-muted">
            Pick what you need. Each plugin is standalone, lightweight, and
            designed to integrate seamlessly with others.
          </p>
        </motion.div>

        {/* Featured cards */}
        <div className="mt-16 space-y-6">
          <FeaturedCard plugin={hyperfactions} />
          <FeaturedCard plugin={hyperperms} />
        </div>

        {/* 3-column row */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((plugin, index) => (
            <SmallCard key={plugin.id} plugin={plugin} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
