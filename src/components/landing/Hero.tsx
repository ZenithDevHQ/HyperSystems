"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";
import { HeroTerminal } from "./HeroTerminal";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-hs-bg" />
        <div className="absolute left-0 top-0 h-[600px] w-[700px] rounded-full bg-hs-primary/15 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[400px] w-[500px] rounded-full bg-hs-secondary/10 blur-[100px]" />
        {/* Grid pattern fading from top-left */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 60% 60% at 20% 30%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 20% 30%, black, transparent)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Left side — text */}
          <div className="flex-[0_0_45%] text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-hs-success animate-pulse" />
              <span className="text-sm text-hs-text-muted">
                Built for Hytale
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-5xl font-bold tracking-[-0.04em] sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              <span className="block text-hs-text">Only what</span>
              <span className="block bg-gradient-to-r from-hs-primary via-hs-secondary to-hs-primary bg-[length:200%_auto] bg-clip-text text-transparent">
                you need.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 max-w-md text-lg leading-relaxed text-hs-text-muted"
            >
              A modular plugin suite for Hytale servers. Lightweight, focused,
              a-la-carte mods that do one thing well.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link href="/plugins">
                <Button size="lg" className="group">
                  Browse Plugins
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link
                href="https://github.com/HyperSystemsDev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  <Github className="h-4 w-4" />
                  View on GitHub
                </Button>
              </Link>
            </motion.div>

            {/* Stats line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4 text-sm text-hs-text-muted sm:gap-6"
            >
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-hs-primary" />
                <span>Open Source</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-hs-primary" />
                <span>Growing Ecosystem</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-hs-success" />
                <span>Zero Dependencies</span>
              </div>
            </motion.div>
          </div>

          {/* Right side — terminal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="mt-12 flex-[0_0_55%] lg:mt-0"
          >
            <HeroTerminal />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-hs-surface" />
    </section>
  );
}
