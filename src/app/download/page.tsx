import type { Metadata } from "next";
import Link from "next/link";
import {
  Download,
  Github,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { PageLayout, PageSection } from "@/components/layout";
import { Card, Button, Badge, PluginIcon } from "@/components/ui";
import { plugins } from "@/lib/plugins";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download HyperSystems plugins for your Hytale server. Installation instructions and requirements.",
};

export default function DownloadPage() {
  const availablePlugins = plugins.filter(
    (p) => p.status === "stable" || p.status === "beta"
  );

  return (
    <PageLayout
      title="Download"
      description="Get started with HyperSystems plugins. Download, install, and you're ready to go."
    >
      {/* Requirements */}
      <PageSection>
        <h2 className="text-2xl font-bold text-hs-text">Requirements</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 shrink-0 text-hs-secondary" />
            <div>
              <h3 className="font-medium text-hs-text">Hytale Server</h3>
              <p className="mt-1 text-sm text-hs-text-muted">
                Compatible with the Hytale Server API
              </p>
            </div>
          </Card>
          <Card className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 shrink-0 text-hs-secondary" />
            <div>
              <h3 className="font-medium text-hs-text">Java 25+</h3>
              <p className="mt-1 text-sm text-hs-text-muted">
                Requires Java 25 or higher (Temurin recommended)
              </p>
            </div>
          </Card>
          <Card className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-hs-primary" />
            <div>
              <h3 className="font-medium text-hs-text">No Dependencies</h3>
              <p className="mt-1 text-sm text-hs-text-muted">
                Each plugin works standalone
              </p>
            </div>
          </Card>
        </div>
      </PageSection>

      {/* Available Downloads */}
      <PageSection variant="surface" border="top">
        <h2 className="text-2xl font-bold text-hs-text">
          Available Downloads
        </h2>
        <p className="mt-2 text-hs-text-muted">
          Download individual plugins or get the full suite.
        </p>

        <div className="mt-8 space-y-4">
          {availablePlugins.map((plugin) => (
            <Card
              key={plugin.id}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <PluginIcon name={plugin.iconName} className="h-6 w-6 text-hs-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-hs-text">
                      {plugin.name}
                    </h3>
                    <Badge variant={plugin.status} />
                  </div>
                  <p className="text-sm text-hs-text-muted">
                    {plugin.tagline}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {plugin.links?.github && (
                  <Link
                    href={plugin.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <Github className="h-4 w-4" />
                      GitHub
                    </Button>
                  </Link>
                )}
                {plugin.links?.curseforge && (
                  <Link
                    href={plugin.links.curseforge}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm">
                      <Download className="h-4 w-4" />
                      CurseForge
                    </Button>
                  </Link>
                )}
                {!plugin.links?.github && !plugin.links?.curseforge && (
                  <Button variant="ghost" size="sm" disabled>
                    Coming Soon
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </PageSection>

      {/* Installation Steps */}
      <PageSection>
        <h2 className="text-2xl font-bold text-hs-text">
          Installation Guide
        </h2>
        <p className="mt-2 text-hs-text-muted">
          Get up and running in a few simple steps.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-hs-text">
              Step 1: Download the Plugin
            </h3>
            <p className="mt-2 text-sm text-hs-text-muted">
              Download the JAR file from GitHub Releases or CurseForge.
              Choose the version compatible with your server.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-hs-text">
              Step 2: Install the Plugin
            </h3>
            <p className="mt-2 text-sm text-hs-text-muted">
              Place the JAR file in your server&apos;s{" "}
              <code className="rounded bg-hs-bg px-1 py-0.5 font-mono text-xs">
                mods
              </code>{" "}
              folder.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-hs-text">
              Step 3: Start Your Server
            </h3>
            <p className="mt-2 text-sm text-hs-text-muted">
              Start or restart your server. The plugin will generate its
              configuration files automatically.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-hs-text">
              Step 4: Configure (Optional)
            </h3>
            <p className="mt-2 text-sm text-hs-text-muted">
              Edit the generated config files in the{" "}
              <code className="rounded bg-hs-bg px-1 py-0.5 font-mono text-xs">
                config
              </code>{" "}
              folder to customize behavior.
            </p>
          </Card>
        </div>
      </PageSection>

      {/* Help Section */}
      <PageSection variant="surface" border="top">
        <Card className="text-center">
          <h2 className="text-xl font-bold text-hs-text">Need Help?</h2>
          <p className="mt-2 text-hs-text-muted">
            Check out our documentation or join the Discord for support.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/docs">
              <Button variant="outline">
                <ExternalLink className="h-4 w-4" />
                Documentation
              </Button>
            </Link>
            <Link
              href="https://discord.gg/FZVeajBHEX"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>Join Discord</Button>
            </Link>
          </div>
        </Card>
      </PageSection>
    </PageLayout>
  );
}
