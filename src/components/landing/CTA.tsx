"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { CodePreview } from "./CodePreview";

const configLines = [
  { text: "{", className: "text-zinc-500" },
  { text: '  "plugins": [', className: "text-cyan-400" },
  { text: '    "HyperPerms",', className: "text-zinc-300" },
  { text: '    "HyperFactions",', className: "text-zinc-300" },
  { text: '    "Ecotale",', className: "text-zinc-300" },
  { text: '    "WerChat"', className: "text-zinc-300" },
  { text: "  ],", className: "text-cyan-400" },
  { text: '  "tools": ["TerraNova"],', className: "text-cyan-400" },
  { text: '  "conflicts": 0,', className: "text-emerald-400" },
  { text: '  "setup": "drop-in"', className: "text-emerald-400" },
  { text: "}", className: "text-zinc-500" },
];

export function CTA() {
  return (
    <section className="relative bg-hs-bg py-28 sm:py-32 overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(6,182,212,0.08), transparent 70%)",
          backgroundSize: "200% 200%",
          animation: "gradient-drift 15s ease infinite",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-3xl font-bold tracking-tight text-hs-text sm:text-4xl lg:text-5xl">
              Ready to simplify your server?
            </h2>
            <p className="mt-4 max-w-xl text-lg text-hs-text-muted lg:max-w-none">
              Get started with HyperSystems today. Choose the plugins you need,
              and only the plugins you need.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              <Link href="/plugins">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link
                href="https://discord.gg/SNPjyfkYPc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  <MessageCircle className="h-4 w-4" />
                  Join Discord
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right — floating config card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full max-w-sm shrink-0"
            style={{
              transform: "rotate(2deg)",
              animation: "float 6s ease-in-out infinite",
            }}
          >
            <div className="rounded-xl border border-white/10 bg-zinc-950 p-1 shadow-[0_0_40px_-8px_rgba(6,182,212,0.15)]">
              <CodePreview lines={configLines} title="server-config.json" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
