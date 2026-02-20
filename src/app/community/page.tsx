import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle,
  Github,
  Bug,
  Lightbulb,
  Users,
  Heart,
} from "lucide-react";
import { PageLayout, PageSection } from "@/components/layout";
import { Card, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the HyperSystems community. Discord, GitHub, and more ways to connect.",
};

export default function CommunityPage() {
  return (
    <PageLayout
      title="Community"
      description="Connect with other server owners, get help, and help shape the future of HyperSystems."
    >
      {/* Main Community Links */}
      <PageSection>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Discord */}
          <Card className="relative overflow-hidden">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#5865F2]/10 blur-2xl" />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#5865F2]/20">
                <MessageCircle className="h-6 w-6 text-[#5865F2]" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-hs-text">
                Discord Server
              </h2>
              <p className="mt-2 text-hs-text-muted">
                Join our Discord for real-time support, announcements, and
                community discussion. Get help from fellow server owners and
                the development team.
              </p>
              <div className="mt-6">
                <Link
                  href="https://discord.gg/SNPjyfkYPc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#5865F2] hover:bg-[#4752C4]">
                    <MessageCircle className="h-4 w-4" />
                    Join Discord
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* GitHub */}
          <Card className="relative overflow-hidden">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-hs-text/10 blur-2xl" />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-hs-text/10">
                <Github className="h-6 w-6 text-hs-text" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-hs-text">
                GitHub Organization
              </h2>
              <p className="mt-2 text-hs-text-muted">
                Browse the source code, contribute to development, and track
                releases. All HyperSystems plugins are open source.
              </p>
              <div className="mt-6">
                <Link
                  href="https://github.com/HyperSystemsDev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </PageSection>

      {/* Contributing */}
      <PageSection variant="surface" border="top">
        <h2 className="text-2xl font-bold text-hs-text">Ways to Contribute</h2>
        <p className="mt-2 text-hs-text-muted">
          Help make HyperSystems better for everyone.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card hover>
            <Bug className="h-8 w-8 text-hs-primary" />
            <h3 className="mt-4 font-semibold text-hs-text">Report Bugs</h3>
            <p className="mt-2 text-sm text-hs-text-muted">
              Found an issue? Report it on GitHub so we can fix it quickly.
            </p>
            <div className="mt-4">
              <Link
                href="https://github.com/HyperSystemsDev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="sm">
                  Report a Bug
                </Button>
              </Link>
            </div>
          </Card>

          <Card hover>
            <Lightbulb className="h-8 w-8 text-hs-secondary" />
            <h3 className="mt-4 font-semibold text-hs-text">
              Suggest Features
            </h3>
            <p className="mt-2 text-sm text-hs-text-muted">
              Have an idea? We&apos;d love to hear your suggestions for new
              features.
            </p>
            <div className="mt-4">
              <Link
                href="https://github.com/HyperSystemsDev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="sm">
                  Suggest Feature
                </Button>
              </Link>
            </div>
          </Card>

          <Card hover>
            <Heart className="h-8 w-8 text-red-400" />
            <h3 className="mt-4 font-semibold text-hs-text">
              Spread the Word
            </h3>
            <p className="mt-2 text-sm text-hs-text-muted">
              Enjoying HyperSystems? Tell other server owners about it!
            </p>
            <div className="mt-4">
              <Button variant="ghost" size="sm" disabled>
                Share
              </Button>
            </div>
          </Card>
        </div>
      </PageSection>

      {/* Community Stats (Placeholder) */}
      <PageSection>
        <Card className="text-center">
          <Users className="mx-auto h-12 w-12 text-hs-primary" />
          <h2 className="mt-4 text-2xl font-bold text-hs-text">
            Join the Growing Community
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-hs-text-muted">
            HyperSystems is built by server owners, for server owners.
            Join us and help shape the future of Hytale server management.
          </p>
          <div className="mt-6">
            <Link
              href="https://discord.gg/SNPjyfkYPc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">
                <MessageCircle className="h-4 w-4" />
                Get Started
              </Button>
            </Link>
          </div>
        </Card>
      </PageSection>
    </PageLayout>
  );
}
