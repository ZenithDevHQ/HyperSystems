import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface WikiPageMeta {
  title: string;
  description: string;
  order?: number;
}

export interface WikiPage {
  slug: string[];
  meta: WikiPageMeta;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "wiki");

/**
 * Get wiki page content and frontmatter
 */
export async function getWikiPage(
  plugin: string,
  slugPath: string[]
): Promise<WikiPage | null> {
  const pagePath = path.join(CONTENT_DIR, plugin, ...slugPath);

  // Try exact path first, then index
  const possiblePaths = [
    `${pagePath}.mdx`,
    path.join(pagePath, "index.mdx"),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug: slugPath,
        meta: {
          title: data.title || "Untitled",
          description: data.description || "",
          order: data.order,
        },
        content,
      };
    }
  }

  return null;
}

/**
 * Get all wiki page slugs for static generation
 */
export function getAllWikiSlugs(plugin: string): string[][] {
  const pluginDir = path.join(CONTENT_DIR, plugin);

  if (!fs.existsSync(pluginDir)) {
    return [];
  }

  const slugs: string[][] = [];

  function scanDir(dir: string, currentPath: string[] = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        // Check for index.mdx in subdirectory
        const indexPath = path.join(dir, entry.name, "index.mdx");
        if (fs.existsSync(indexPath)) {
          slugs.push([...currentPath, entry.name]);
        }
        // Recursively scan subdirectory
        scanDir(path.join(dir, entry.name), [...currentPath, entry.name]);
      } else if (entry.name.endsWith(".mdx") && entry.name !== "index.mdx") {
        // Add file without extension
        const slug = entry.name.replace(/\.mdx$/, "");
        slugs.push([...currentPath, slug]);
      }
    }
  }

  scanDir(pluginDir);
  return slugs;
}

/**
 * Get wiki home page content
 */
export async function getWikiHomePage(plugin: string): Promise<WikiPage | null> {
  const indexPath = path.join(CONTENT_DIR, plugin, "index.mdx");

  if (!fs.existsSync(indexPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(indexPath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug: [],
    meta: {
      title: data.title || "Wiki",
      description: data.description || "",
    },
    content,
  };
}

/**
 * Check if a plugin has wiki content
 */
export function hasWikiContent(plugin: string): boolean {
  const pluginDir = path.join(CONTENT_DIR, plugin);
  return fs.existsSync(pluginDir) && fs.existsSync(path.join(pluginDir, "index.mdx"));
}
