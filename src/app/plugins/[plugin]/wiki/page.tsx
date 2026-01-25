import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWikiHomePage, hasWikiContent } from "@/lib/wiki";
import { getPlugin } from "@/lib/plugins";
import { MDXContent, WikiBreadcrumb } from "@/components/wiki";

interface WikiHomePageProps {
  params: Promise<{ plugin: string }>;
}

export async function generateMetadata({
  params,
}: WikiHomePageProps): Promise<Metadata> {
  const { plugin } = await params;
  const pluginData = getPlugin(plugin);
  const wikiPage = await getWikiHomePage(plugin);

  if (!pluginData || !wikiPage) {
    return {
      title: "Wiki Not Found",
    };
  }

  return {
    title: `${wikiPage.meta.title} | ${pluginData.name}`,
    description: wikiPage.meta.description,
  };
}

export default async function WikiHomePage({ params }: WikiHomePageProps) {
  const { plugin } = await params;
  const pluginData = getPlugin(plugin);

  if (!pluginData || !hasWikiContent(plugin)) {
    notFound();
  }

  const wikiPage = await getWikiHomePage(plugin);

  if (!wikiPage) {
    notFound();
  }

  return (
    <article>
      <WikiBreadcrumb plugin={plugin} pluginName={pluginData.name} />
      <div className="mt-8">
        <MDXContent source={wikiPage.content} />
      </div>
    </article>
  );
}

// Generate static pages for all plugins with wikis
export async function generateStaticParams() {
  // Return plugin IDs that have wiki content
  return [{ plugin: "hyperfactions" }];
}
