"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-hs-bg/85 via-hs-bg/80 to-hs-bg" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6 inline-flex items-center rounded-full border border-hs-border bg-hs-surface px-4 py-1.5"
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-hs-secondary" />
            <span className="text-sm text-hs-text-muted drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              Built for Hytale servers
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-hs-primary via-hs-secondary to-hs-primary bg-clip-text text-transparent">
              Only what you need.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg leading-8 text-hs-text-muted sm:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            A modular plugin suite for Hytale servers. Lightweight, focused,
            a-la-carte plugins that do one thing well.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/plugins">
              <Button size="lg" className="group">
                Browse Plugins
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link
              href="https://github.com/ZenithDevHQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                <Github className="h-4 w-4" />
                View on GitHub
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
