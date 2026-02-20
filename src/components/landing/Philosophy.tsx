"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ShoppingCart, Feather, Target, Shield, Swords, Coins, MessageCircle, Globe, Check, Plus } from "lucide-react";

const pluginPills = [
  { name: "HyperPerms", icon: Shield, active: true },
  { name: "HyperFactions", icon: Swords, active: true },
  { name: "Ecotale", icon: Coins, active: true },
  { name: "WerChat", icon: MessageCircle, active: false, animateIn: true },
  { name: "TerraNova", icon: Globe, active: false },
];

const focusedRows = [
  { icon: Shield, name: "HyperPerms", job: "Permissions", color: "text-cyan-400" },
  { icon: Swords, name: "HyperFactions", job: "Factions", color: "text-cyan-400" },
  { icon: Coins, name: "Ecotale", job: "Economy", color: "text-cyan-400" },
  { icon: MessageCircle, name: "WerChat", job: "Chat", color: "text-cyan-400" },
  { icon: Globe, name: "TerraNova", job: "World Gen", color: "text-cyan-400" },
];

function ALaCarteVisual() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [werchatActive, setWerchatActive] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setWerchatActive(true), 1800);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center gap-3">
      {/* Server box */}
      <div className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-hs-success" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">your server</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {pluginPills.map((pill, i) => {
            const Icon = pill.icon;
            const isActive = pill.active || (pill.animateIn && werchatActive);
            return (
              <motion.div
                key={pill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.3, ease: "easeOut" }}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-medium transition-all duration-700 ${
                  isActive
                    ? "border border-hs-primary/50 bg-hs-primary/10 text-hs-primary shadow-[0_0_16px_-4px_rgba(6,182,212,0.35)]"
                    : "border border-dashed border-white/10 text-zinc-600"
                }`}
              >
                <Icon className="h-3 w-3" />
                {pill.name}
                {isActive && (
                  <Check className="h-2.5 w-2.5 text-hs-primary" />
                )}
                {!isActive && (
                  <Plus className="h-2.5 w-2.5 text-zinc-600" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* Count label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="font-mono text-[10px] text-zinc-600"
      >
        <motion.span
          key={werchatActive ? "4" : "3"}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-hs-primary"
        >
          {werchatActive ? "4" : "3"}
        </motion.span>
        {" / 5 installed \u2014 no bloat"}
      </motion.div>
    </div>
  );
}

function LightweightVisual() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="flex flex-col justify-center gap-5">
      {/* Typical suite */}
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-xs text-zinc-500">Typical All-in-One Suite</span>
          <span className="font-mono text-sm font-semibold text-amber-400">48 MB</span>
        </div>
        <div className="h-5 w-full overflow-hidden rounded-md bg-white/[0.04]">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full w-[85%] origin-left items-center justify-end rounded-md bg-gradient-to-r from-amber-500/50 to-amber-400/70 pr-2"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="text-[9px] font-medium text-amber-950"
            >
              permissions + homes + warps + economy + chat + kits
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* HyperPerms */}
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-xs text-zinc-500">HyperPerms</span>
          <span className="font-mono text-sm font-semibold text-hs-primary">2.3 MB</span>
        </div>
        <div className="h-5 w-full overflow-hidden rounded-md bg-white/[0.04]">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full w-[5%] min-w-[28px] origin-left items-center justify-center rounded-md bg-gradient-to-r from-hs-primary to-hs-primary-light shadow-[0_0_20px_-4px_rgba(6,182,212,0.5)]"
          />
        </div>
      </div>

      {/* Comparison callout */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.0, duration: 0.4 }}
        className="flex items-center justify-end gap-2"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-hs-primary/20" />
        <span className="rounded-full border border-hs-primary/20 bg-hs-primary/5 px-3 py-1 font-mono text-xs font-bold text-hs-primary">
          20x smaller
        </span>
      </motion.div>
    </div>
  );
}

function FocusedVisual() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-1.5">
      {focusedRows.map((row, i) => {
        const Icon = row.icon;
        return (
          <motion.div
            key={row.name}
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.1 + 0.1, duration: 0.35, ease: "easeOut" }}
            className="group flex items-center gap-3 rounded-lg border border-transparent bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-white/[0.06] hover:bg-white/[0.04]"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-hs-primary/15 to-hs-secondary/10">
              <Icon className="h-3.5 w-3.5 text-hs-primary" />
            </div>
            <span className="text-sm font-medium text-hs-text">{row.name}</span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.3 }}
              className="mx-1 h-px flex-1 origin-left bg-gradient-to-r from-white/10 to-transparent"
            />
            <span className="shrink-0 text-xs text-hs-text-muted">{row.job}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

const pillars = [
  {
    icon: ShoppingCart,
    title: "A-La-Carte",
    description:
      "Pick only what you need. Each plugin is standalone with no forced bundles, no bloat, and no dependencies.",
    Visual: ALaCarteVisual,
  },
  {
    icon: Feather,
    title: "Lightweight",
    description:
      "Performance matters. Every plugin is optimized for minimal memory footprint, fast startup, and zero impact on your server\u2019s TPS.",
    Visual: LightweightVisual,
  },
  {
    icon: Target,
    title: "Focused",
    description:
      "Each plugin does one thing exceptionally well. No feature creep. Just clean, reliable functionality.",
    Visual: FocusedVisual,
  },
];

export function Philosophy() {
  return (
    <section className="relative bg-hs-bg py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-hs-text sm:text-4xl">
            Why HyperSystems?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-hs-text-muted">
            Built on three core principles that make server management simpler.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const Visual = pillar.Visual;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.4, ease: "easeOut" }}
                className="group flex flex-col rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-6 transition-colors hover:border-white/[0.1]"
              >
                {/* Visual area */}
                <div className="mb-6 flex min-h-[180px] flex-col justify-center">
                  <Visual />
                </div>

                {/* Divider */}
                <div className="mb-5 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

                {/* Icon + text */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-gradient-to-br from-hs-primary/10 to-hs-secondary/10 shadow-[0_0_12px_-4px_rgba(6,182,212,0.15)]">
                    <Icon className="h-5 w-5 text-hs-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-hs-text">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-sm text-hs-text-muted leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
