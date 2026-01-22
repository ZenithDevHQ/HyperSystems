import type { Metadata } from "next";
import Link from "next/link";
import {
  ExternalLink,
  BookOpen,
  Terminal,
  Shield,
  Settings,
  Globe,
  Layers,
  Clock,
  TrendingUp,
  Zap,
  Database,
  MessageSquare,
  Archive,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PluginHeader } from "@/components/plugins/PluginHeader";
import { Card, Button } from "@/components/ui";
import { getPlugin } from "@/lib/plugins";

export const metadata: Metadata = {
  title: "HyperPerms",
  description:
    "A modern permissions system for Hytale servers with a visual web editor, context-aware permissions, and seamless group inheritance.",
};

export default function HyperPermsPage() {
  const plugin = getPlugin("hyperperms");

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
              Everything you need to manage permissions effectively.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Globe className="h-5 w-5 text-hs-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Visual Web Editor</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Edit permissions in your browser with a modern, intuitive interface. No config files needed.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Layers className="h-5 w-5 text-hs-secondary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Context-Aware Permissions</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Apply permissions per-world, region, biome, gamemode, or time of day.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Shield className="h-5 w-5 text-hs-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Group Inheritance</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Create group hierarchies with weight-based priority resolution.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Clock className="h-5 w-5 text-hs-secondary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Timed Permissions</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Grant temporary permissions that automatically expire after a set duration.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <TrendingUp className="h-5 w-5 text-hs-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Promotion Tracks</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Define promotion paths to easily move players through rank hierarchies.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Zap className="h-5 w-5 text-hs-secondary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">High-Performance Caching</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  LRU caching ensures lightning-fast permission checks with minimal memory usage.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Database className="h-5 w-5 text-hs-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Multiple Storage Options</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Choose between JSON, SQLite, or MySQL based on your server&apos;s needs.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <MessageSquare className="h-5 w-5 text-hs-secondary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Chat & Tab Formatting</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Customize prefixes, suffixes, and name colors in chat and the tab list.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Archive className="h-5 w-5 text-hs-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Automatic Backups</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Scheduled backups protect your permission data from accidental loss.
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
              Manage users, groups, and permissions with simple commands.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* User Commands */}
              <Card>
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-hs-primary" />
                  <h3 className="font-semibold text-hs-text">User Commands</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /hp user info &lt;player&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      View player permissions
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /hp user permission set
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Set user permission
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /hp user parent add
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Add player to group
                    </p>
                  </div>
                </div>
              </Card>

              {/* Group Commands */}
              <Card>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-hs-secondary" />
                  <h3 className="font-semibold text-hs-text">Group Commands</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /hp group create &lt;name&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Create new group
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /hp group list
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      List all groups
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /hp group permission set
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Set group permission
                    </p>
                  </div>
                </div>
              </Card>

              {/* Admin Commands */}
              <Card>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-hs-primary" />
                  <h3 className="font-semibold text-hs-text">Admin Commands</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /hp track promote &lt;player&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Promote in track
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /hp reload
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Reload configuration
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /hp backup create
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Create backup
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Permissions Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-hs-text">Permissions</h2>
            <p className="mt-2 text-hs-text-muted">
              Fine-grained control over who can do what.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Card>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-hs-secondary" />
                  <h3 className="font-semibold text-hs-text">Core Permissions</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperperms.user.*
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      All user management commands
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperperms.group.*
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      All group management commands
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperperms.track.*
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Promotion track commands
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperperms.editor
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Access web editor
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-hs-primary" />
                  <h3 className="font-semibold text-hs-text">Admin Permissions</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperperms.admin
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Full admin access
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperperms.reload
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Reload configuration
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperperms.backup
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Create/restore backups
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperperms.*
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      All HyperPerms permissions
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
              {plugin.links?.website && (
                <Link
                  href={plugin.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4" />
                    Official Website
                  </Button>
                </Link>
              )}
              {plugin.links?.docs && (
                <Link
                  href={plugin.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    <BookOpen className="h-4 w-4" />
                    Documentation
                  </Button>
                </Link>
              )}
              {plugin.links?.github && (
                <Link
                  href={plugin.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost">GitHub Releases</Button>
                </Link>
              )}
              {plugin.links?.curseforge && (
                <Link
                  href={plugin.links.curseforge}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost">CurseForge</Button>
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
