import type { Metadata } from "next";
import {
  Terminal,
  Command,
  Shield,
  Settings,
  Home,
  LayoutGrid,
  Users,
  Globe,
  Timer,
  Bed,
  ShieldOff,
  Link2,
  UserCog,
  ArrowRightLeft,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PluginHeader } from "@/components/plugins/PluginHeader";
import { Card } from "@/components/ui";
import { getPlugin } from "@/lib/plugins";

export const metadata: Metadata = {
  title: "HyperHomes",
  description:
    "Complete home management for Hytale servers with GUI support, home sharing, and cross-world teleportation.",
};

export default function HyperHomesPage() {
  const plugin = getPlugin("hyperhomes");

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
              Everything you need for home management on your server.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Home className="h-5 w-5 text-hs-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Multiple Named Homes</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Create as many homes as allowed with custom names for easy organization.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <LayoutGrid className="h-5 w-5 text-hs-secondary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Full GUI System</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Browse and manage homes through an intuitive paginated interface.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Users className="h-5 w-5 text-hs-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Home Sharing</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Share homes with friends using accept/deny requests for security.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Globe className="h-5 w-5 text-hs-secondary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Cross-World Teleportation</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Teleport to homes in any world, no matter where you are.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Timer className="h-5 w-5 text-hs-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Warmup & Cooldown</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Configurable delays prevent teleport abuse while keeping gameplay balanced.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Bed className="h-5 w-5 text-hs-secondary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Bed Spawn Sync</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Automatically creates a &quot;bed&quot; home when players set their spawn.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <ShieldOff className="h-5 w-5 text-hs-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Movement/Damage Cancel</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Optional teleport cancellation if player moves or takes damage during warmup.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Link2 className="h-5 w-5 text-hs-secondary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">HyperPerms Integration</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Control home limits and features per player or group seamlessly.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <UserCog className="h-5 w-5 text-hs-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Admin Panel</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Manage all player homes from a centralized admin interface.
                </p>
              </Card>

              <Card className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <ArrowRightLeft className="h-5 w-5 text-hs-secondary" />
                </div>
                <h3 className="mt-4 font-semibold text-hs-text">Migration System</h3>
                <p className="mt-2 text-sm text-hs-text-muted">
                  Import homes from other plugins with support for JSON, YAML, and SQLite formats.
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
              Simple, intuitive commands for home management.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Core Commands */}
              <Card>
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-hs-primary" />
                  <h3 className="font-semibold text-hs-text">Core Commands</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /home [name]
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Teleport to home (aliases: /h)
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /sethome [name]
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Set a home (aliases: /sh, /createhome)
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /delhome &lt;name&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Delete a home (aliases: /deletehome, /rmhome)
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /homes
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      List all your homes
                    </p>
                  </div>
                </div>
              </Card>

              {/* Home Sharing */}
              <Card>
                <div className="flex items-center gap-2">
                  <Command className="h-5 w-5 text-hs-secondary" />
                  <h3 className="font-semibold text-hs-text">Sharing Commands</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /homes share &lt;home&gt; &lt;player&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Share home with player
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /homes unshare &lt;home&gt; &lt;player&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Revoke player&apos;s access
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /homes shared
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      View homes shared with you
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /home &lt;player&gt;:&lt;name&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Teleport to shared home
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
                      /homes admin
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Open admin panel
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /homes reload
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Reload configuration
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      /homes migrate &lt;source&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Import from other plugins (json, yaml, sqlite)
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
            <h2 className="text-2xl font-bold text-hs-text">
              Permissions
            </h2>
            <p className="mt-2 text-hs-text-muted">
              Control access per player or group with HyperPerms integration.
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
                      hyperhomes.home
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Use /home command
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperhomes.sethome
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Use /sethome command
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperhomes.delhome
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Use /delhome command
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperhomes.homes
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Use /homes GUI command
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperhomes.share
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Share homes with others
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-hs-primary" />
                  <h3 className="font-semibold text-hs-text">Limits & Bypass</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperhomes.limit.&lt;number&gt;
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Set custom home limit
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperhomes.unlimited
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Unlimited homes
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperhomes.bypass.cooldown
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Bypass teleport cooldown
                    </p>
                  </div>
                  <div>
                    <code className="font-mono text-sm text-hs-primary">
                      hyperhomes.bypass.warmup
                    </code>
                    <p className="mt-1 text-xs text-hs-text-muted">
                      Bypass teleport warmup
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
