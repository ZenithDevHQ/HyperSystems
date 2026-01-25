import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle,
  Bell,
  Terminal,
  MapPin,
  Navigation,
  History,
  Users,
  FolderTree,
  Undo2,
  Shield,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PluginHeader } from "@/components/plugins/PluginHeader";
import { Card, Button } from "@/components/ui";
import { getPlugin } from "@/lib/plugins";

export const metadata: Metadata = {
  title: "HyperWarps",
  description:
    "Server-wide teleportation for Hytale servers with TPA, spawns, warps, and location history.",
};

export default function HyperWarpsPage() {
  const plugin = getPlugin("hyperwarps");

  if (!plugin) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <PluginHeader plugin={plugin} />

        {/* Coming Soon Banner */}
        <section className="border-b border-hs-border bg-gradient-to-r from-hs-primary/10 to-hs-secondary/10 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-hs-primary" />
                <p className="text-hs-text">
                  HyperWarps is currently in development. Join our Discord to
                  get notified when it launches!
                </p>
              </div>
              <Link
                href="https://discord.gg/SNPjyfkYPc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm">
                  <MessageCircle className="h-4 w-4" />
                  Join Discord
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Planned Features Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-hs-text">Planned Features</h2>
            <p className="mt-2 text-hs-text-muted">
              Here&apos;s what we&apos;re building for HyperWarps.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="group opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-text-muted/10 to-hs-text-muted/20">
                  <Users className="h-5 w-5 text-hs-text-muted" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">TPA System</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Request to teleport to players or summon them with /tpa, /tpahere, /tpaccept, /tpdeny.
                </p>
              </Card>

              <Card className="group opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-text-muted/10 to-hs-text-muted/20">
                  <MapPin className="h-5 w-5 text-hs-text-muted" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Spawn Management</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Multiple spawn points with per-world configuration and first-join support.
                </p>
              </Card>

              <Card className="group opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-text-muted/10 to-hs-text-muted/20">
                  <FolderTree className="h-5 w-5 text-hs-text-muted" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Warp Categories</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Organize warps into categories for easy browsing and management.
                </p>
              </Card>

              <Card className="group opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-text-muted/10 to-hs-text-muted/20">
                  <Undo2 className="h-5 w-5 text-hs-text-muted" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Location History</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Return to previous locations with /back, tracking teleports and deaths.
                </p>
              </Card>

              <Card className="group opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-text-muted/10 to-hs-text-muted/20">
                  <Shield className="h-5 w-5 text-hs-text-muted" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Admin Teleports</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Powerful admin commands for instant teleportation and player management.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Commands Preview */}
        <section className="border-t border-hs-border bg-hs-surface py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-hs-text">Commands Preview</h2>
            <p className="mt-2 text-hs-text-muted">
              Here&apos;s what the command structure will look like.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* TPA System */}
              <Card>
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-hs-primary" />
                  <h3 className="font-semibold text-hs-text">TPA Commands</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /tpa &lt;player&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Request to teleport to player
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /tpahere &lt;player&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Request player teleport to you
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /tpaccept | /tpdeny
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Accept or deny requests
                    </p>
                  </div>
                </div>
              </Card>

              {/* Spawn Management */}
              <Card>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-hs-secondary" />
                  <h3 className="font-semibold text-hs-text">Spawn Commands</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /spawn [name]
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Teleport to spawn
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /setspawn [name]
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Set spawn location
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /spawns
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      List all spawns
                    </p>
                  </div>
                </div>
              </Card>

              {/* Warp System */}
              <Card>
                <div className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-hs-primary" />
                  <h3 className="font-semibold text-hs-text">Warp Commands</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /warp &lt;name&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Teleport to warp
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /setwarp &lt;name&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Create new warp
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /warps [category]
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Browse warps by category
                    </p>
                  </div>
                </div>
              </Card>

              {/* Back Command */}
              <Card>
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-hs-secondary" />
                  <h3 className="font-semibold text-hs-text">History Commands</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /back
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Return to previous location
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /back &lt;number&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Go back multiple steps
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Card className="bg-gradient-to-br from-hs-bg to-hs-surface-2 text-center">
              <h2 className="text-2xl font-bold text-hs-text">
                Want to be notified when HyperWarps releases?
              </h2>
              <p className="mt-2 text-hs-text-muted">
                Join our Discord community for updates, early access, and
                feature requests.
              </p>
              <div className="mt-6">
                <Link
                  href="https://discord.gg/SNPjyfkYPc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg">
                    <MessageCircle className="h-4 w-4" />
                    Join Discord
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
