import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WikiSidebar, ReadingProgress } from "@/components/wiki";
import { getWikiNavigation } from "@/lib/wiki-navigation";
import { getPlugin } from "@/lib/plugins";
import { hasWikiContent } from "@/lib/wiki";

interface WikiLayoutProps {
  children: React.ReactNode;
  params: Promise<{ plugin: string }>;
}

export default async function WikiLayout({ children, params }: WikiLayoutProps) {
  const { plugin } = await params;
  const pluginData = getPlugin(plugin);

  if (!pluginData || !hasWikiContent(plugin)) {
    notFound();
  }

  const navigation = getWikiNavigation(plugin);

  return (
    <>
      <Navbar />
      <ReadingProgress />
      <div className="flex min-h-screen">
        <WikiSidebar
          plugin={plugin}
          pluginName={pluginData.name}
          navigation={navigation}
        />
        <main id="main-content" className="flex-1 px-4 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
      <Footer />
    </>
  );
}
