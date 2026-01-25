import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getAllReleases } from "@/lib/github";
import { ChangelogList } from "./ChangelogList";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Stay up to date with the latest releases and updates for HyperSystems plugins. View version history, release notes, and download links.",
};

export const revalidate = 300; // ISR: 5 minute cache

export default async function ChangelogPage() {
  const releases = await getAllReleases();

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-hs-text">
              Changelog
            </h1>
            <p className="text-lg text-hs-text-muted">
              Stay up to date with the latest releases and updates across all HyperSystems plugins.
            </p>
          </div>

          {/* Changelog List */}
          <ChangelogList releases={releases} />

          {/* No Releases State */}
          {releases.length === 0 && (
            <div className="rounded-xl border border-hs-border bg-hs-surface p-12 text-center">
              <p className="text-hs-text-muted">
                No releases available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
