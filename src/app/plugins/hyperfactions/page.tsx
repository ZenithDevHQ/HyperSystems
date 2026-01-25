import type { Metadata } from "next";
import Link from "next/link";
import {
  ExternalLink,
  BookOpen,
  Terminal,
  Users,
  Map,
  Zap,
  Shield,
  Sword,
  MessageSquare,
  Home,
  Target,
  Flag,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PluginHeader } from "@/components/plugins/PluginHeader";
import { Card, Button } from "@/components/ui";
import { getPlugin } from "@/lib/plugins";

export const metadata: Metadata = {
  title: "HyperFactions",
  description:
    "A comprehensive faction management mod for Hytale servers with territory claims, alliances, strategic PvP, and extensive customization.",
};

export default function HyperFactionsPage() {
  const plugin = getPlugin("hyperfactions");

  if (!plugin) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <PluginHeader plugin={plugin} />

        {/* Features Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-hs-text">Features</h2>
            <p className="mt-2 text-hs-text-muted">
              Everything you need to run a faction-based server.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Users className="h-5 w-5 text-hs-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Faction Management</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Create factions with customizable names, colors, and a three-tier role hierarchy.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Map className="h-5 w-5 text-hs-secondary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Territory System</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Chunk-based claiming with visual maps, protection, and multi-world support.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Zap className="h-5 w-5 text-hs-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Power System</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Balanced expansion through power mechanics with regeneration and death penalties.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Flag className="h-5 w-5 text-hs-secondary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Diplomacy</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Form alliances, declare enemies, and manage complex faction relationships.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Target className="h-5 w-5 text-hs-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Overclaiming</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Strategic warfare by capturing enemy territory when their power is low.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Sword className="h-5 w-5 text-hs-secondary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Combat System</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Combat tagging, relationship-based PvP rules, and configurable damage settings.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <MessageSquare className="h-5 w-5 text-hs-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Private Chat</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Faction and alliance chat channels for secure communication.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Home className="h-5 w-5 text-hs-secondary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Faction Home</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Teleportation system with warmup, cooldown, and cross-dimension support.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Shield className="h-5 w-5 text-hs-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">SafeZones & WarZones</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Admin-managed zones for spawn protection and designated PvP areas.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Commands Section */}
        <section className="border-t border-hs-border bg-hs-surface py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-hs-text">Commands</h2>
            <p className="mt-2 text-hs-text-muted">
              Manage your faction with simple, intuitive commands.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Basic Commands */}
              <Card>
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-hs-primary" />
                  <h3 className="font-semibold text-hs-text">Basic Commands</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /f create &lt;name&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Create a new faction
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /f invite &lt;player&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Invite a player
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /f info [faction]
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      View faction info
                    </p>
                  </div>
                </div>
              </Card>

              {/* Territory Commands */}
              <Card>
                <div className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-hs-secondary" />
                  <h3 className="font-semibold text-hs-text">Territory Commands</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /f claim
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Claim current chunk
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /f map
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      View territory map
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /f overclaim
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Take enemy territory
                    </p>
                  </div>
                </div>
              </Card>

              {/* Diplomacy Commands */}
              <Card>
                <div className="flex items-center gap-2">
                  <Flag className="h-5 w-5 text-hs-primary" />
                  <h3 className="font-semibold text-hs-text">Diplomacy Commands</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /f ally &lt;faction&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Request alliance
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /f enemy &lt;faction&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Declare enemy
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /f relations
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      View all relations
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-hs-text">Resources</h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/plugins/hyperfactions/wiki">
                <Button>
                  <BookOpen className="h-4 w-4" />
                  Wiki Documentation
                </Button>
              </Link>
              {plugin.links?.github && (
                <Link
                  href={plugin.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4" />
                    GitHub
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
