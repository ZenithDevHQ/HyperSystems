import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ExternalLink, ArrowRight } from "lucide-react";
import { PageLayout, PageSection } from "@/components/layout";
import { Card, Button, Badge, PluginIcon } from "@/components/ui";
import { plugins } from "@/lib/plugins";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Documentation hub for HyperSystems plugins. Guides, API references, and configuration help.",
};

export default function DocsPage() {
  const documentedPlugins = plugins.filter(
    (p) => p.status === "stable" || p.status === "beta"
  );

  return (
    <PageLayout
      title="Documentation"
      description="Everything you need to know about configuring and using HyperSystems plugins."
    >
      {/* Plugin Documentation */}
      <PageSection>
        <h2 className="text-2xl font-bold text-hs-text">
          Plugin Documentation
        </h2>
        <p className="mt-2 text-hs-text-muted">
          Each plugin has its own dedicated documentation.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {documentedPlugins.map((plugin) => (
            <Card key={plugin.id} hover>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                    <PluginIcon name={plugin.iconName} className="h-5 w-5 text-hs-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-hs-text">
                      {plugin.name}
                    </h3>
                    <p className="text-sm text-hs-text-muted">
                      {plugin.tagline}
                    </p>
                  </div>
                </div>
                <Badge variant={plugin.status} />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {plugin.links?.docs ? (
                  <Link
                    href={plugin.links.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm">
                      <BookOpen className="h-4 w-4" />
                      View Docs
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                ) : (
                  <Link href={`/plugins/${plugin.id}`}>
                    <Button variant="outline" size="sm">
                      <ArrowRight className="h-4 w-4" />
                      Plugin Page
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      </PageSection>

      {/* Quick Links */}
      <PageSection variant="surface" border="top">
        <h2 className="text-2xl font-bold text-hs-text">Quick Links</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card hover>
            <h3 className="font-semibold text-hs-text">Getting Started</h3>
            <p className="mt-2 text-sm text-hs-text-muted">
              New to HyperSystems? Start here for installation and setup
              guides.
            </p>
            <div className="mt-4">
              <Link href="/download">
                <Button variant="ghost" size="sm">
                  Installation Guide
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card hover>
            <h3 className="font-semibold text-hs-text">
              HyperPerms Web Editor
            </h3>
            <p className="mt-2 text-sm text-hs-text-muted">
              Learn how to use the visual permissions editor included with
              HyperPerms.
            </p>
            <div className="mt-4">
              <Link
                href="https://www.hyperperms.com/wiki"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="sm">
                  Web Editor Docs
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card hover>
            <h3 className="font-semibold text-hs-text">Configuration</h3>
            <p className="mt-2 text-sm text-hs-text-muted">
              Deep dive into configuration options for all plugins.
            </p>
            <div className="mt-4">
              <Button variant="ghost" size="sm" disabled>
                Coming Soon
              </Button>
            </div>
          </Card>
        </div>
      </PageSection>

      {/* Help Section */}
      <PageSection>
        <Card className="text-center">
          <BookOpen className="mx-auto h-12 w-12 text-hs-primary" />
          <h2 className="mt-4 text-xl font-bold text-hs-text">
            Can&apos;t find what you need?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-hs-text-muted">
            Join our Discord community for real-time help from other users
            and the development team.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="https://discord.gg/FZVeajBHEX"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>Join Discord</Button>
            </Link>
            <Link
              href="https://github.com/HyperSystemsDev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">GitHub Discussions</Button>
            </Link>
          </div>
        </Card>
      </PageSection>
    </PageLayout>
  );
}
