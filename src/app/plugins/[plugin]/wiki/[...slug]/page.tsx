import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getWikiPage, getAllWikiSlugs, hasWikiContent } from "@/lib/wiki";
import { getPlugin } from "@/lib/plugins";
import { getAdjacentPages } from "@/lib/wiki-navigation";
import { MDXContent, WikiBreadcrumb } from "@/components/wiki";

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

  return (
    <article>
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

        <MDXContent source={wikiPage.content} />
      </div>

      {/* Prev/Next Navigation */}
      {(prev || next) && (
        <nav className="mt-12 flex items-center justify-between border-t border-hs-border pt-6">
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
    </article>
  );
}

// Generate static params for all wiki pages
export async function generateStaticParams() {
  const plugins = ["hyperfactions"];
  const params: { plugin: string; slug: string[] }[] = [];

  for (const plugin of plugins) {
    const slugs = getAllWikiSlugs(plugin);
    for (const slug of slugs) {
      params.push({ plugin, slug });
    }
  }

  return params;
}
