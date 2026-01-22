"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui";

export function CTA() {
  return (
    <section className="border-t border-hs-border bg-hs-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-hs-border bg-gradient-to-br from-hs-bg to-hs-surface-2 p-8 text-center sm:p-12 lg:p-16"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-hs-primary/10 blur-[80px]" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-hs-secondary/10 blur-[80px]" />
          </div>

          <h2 className="text-3xl font-bold text-hs-text sm:text-4xl">
            Ready to simplify your server?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-hs-text-muted">
            Get started with HyperSystems today. Choose the plugins you need,
            and only the plugins you need.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
      </div>
    </section>
  );
}
