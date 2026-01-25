import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { getWikiPage, getAllWikiSlugs, hasWikiContent } from "@/lib/wiki";
import { getPlugin } from "@/lib/plugins";
import { getAdjacentPages } from "@/lib/wiki-navigation";
import { MDXContent, WikiBreadcrumb, TableOfContents, WikiKeyboardNav } from "@/components/wiki";

interface WikiPageProps {
  params: Promise<{ plugin: string; slug: string[] }>;
}

export async function generateMetadata({
  params,
}: WikiPageProps): Promise<Metadata> {
  const { plugin, slug } = await params;
  const pluginData = getPlugin(plugin);
  const wikiPage = await getWikiPage(plugin, slug);

  if (!pluginData || !wikiPage) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: `${wikiPage.meta.title} | ${pluginData.name} Wiki`,
    description: wikiPage.meta.description,
  };
}

// Map plugin IDs to their GitHub repos for edit links
const pluginRepos: Record<string, string> = {
  hyperfactions: "HyperSystemsDev/HyperFactions",
  hyperperms: "HyperSystemsDev/HyperPerms",
  hyperhomes: "HyperSystemsDev/HyperHomes",
};

export default async function WikiPage({ params }: WikiPageProps) {
  const { plugin, slug } = await params;
  const pluginData = getPlugin(plugin);

  if (!pluginData || !hasWikiContent(plugin)) {
    notFound();
  }

  const wikiPage = await getWikiPage(plugin, slug);

  if (!wikiPage) {
    notFound();
  }

  const currentPath = `/plugins/${plugin}/wiki/${slug.join("/")}`;
  const { prev, next } = getAdjacentPages(plugin, currentPath);

  // Construct GitHub edit URL
  const repo = pluginRepos[plugin] || pluginRepos.hyperfactions;
  const filePath = `docs/${slug.join("/")}.mdx`;
  const editUrl = `https://github.com/${repo}/edit/main/${filePath}`;

  return (
    <div className="flex gap-8">
      <article className="min-w-0 flex-1">
        <WikiBreadcrumb
          plugin={plugin}
          pluginName={pluginData.name}
          slug={slug}
          pageTitle={wikiPage.meta.title}
        />

        <div className="mt-8">
          <h1 className="mb-2 text-3xl font-bold text-hs-text">
            {wikiPage.meta.title}
          </h1>
          {wikiPage.meta.description && (
            <p className="mb-8 text-lg text-hs-text-muted">
              {wikiPage.meta.description}
            </p>
          )}

          {/* Mobile TOC */}
          <div className="xl:hidden">
            <TableOfContents content={wikiPage.content} />
          </div>

          <MDXContent source={wikiPage.content} />
        </div>

        {/* Edit on GitHub */}
        <div className="mt-8 border-t border-hs-border pt-6">
          <Link
            href={editUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-hs-text-muted transition-colors hover:text-hs-text"
          >
            <ExternalLink className="h-4 w-4" />
            Edit this page on GitHub
          </Link>
        </div>

        {/* Prev/Next Navigation */}
        {(prev || next) && (
          <nav className="mt-6 flex items-center justify-between border-t border-hs-border pt-6">
            {prev ? (
              <Link
                href={prev.href}
                className="group flex items-center gap-2 text-hs-text-muted transition-colors hover:text-hs-text"
              >
                <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <div className="text-right">
                  <span className="block text-xs uppercase tracking-wider text-hs-text-muted">
                    Previous
                  </span>
                  <span className="text-sm font-medium text-hs-text">
                    {prev.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={next.href}
                className="group flex items-center gap-2 text-hs-text-muted transition-colors hover:text-hs-text"
              >
                <div className="text-left">
                  <span className="block text-xs uppercase tracking-wider text-hs-text-muted">
                    Next
                  </span>
                  <span className="text-sm font-medium text-hs-text">
                    {next.title}
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}

        {/* Keyboard Navigation */}
        <WikiKeyboardNav prev={prev} next={next} />
      </article>

      {/* Desktop TOC */}
      <TableOfContents content={wikiPage.content} />
    </div>
  );
}

// Generate static params for all wiki pages
export async function generateStaticParams() {
  const plugins = ["hyperfactions", "hyperperms", "hyperhomes"];
  const params: { plugin: string; slug: string[] }[] = [];

  for (const plugin of plugins) {
    const slugs = getAllWikiSlugs(plugin);
    for (const slug of slugs) {
      params.push({ plugin, slug });
    }
  }

  return params;
}
