import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { CodeBlock } from "./CodeBlock";
import { CommandBlock } from "./CommandBlock";
import { InfoBox } from "./InfoBox";
import { PermissionTable } from "./PermissionTable";

interface MDXContentProps {
  source: string;
}

// Custom components for MDX
const components = {
  // Custom components
  CodeBlock,
  CommandBlock,
  InfoBox,
  PermissionTable,

  // Override default HTML elements
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="mb-4 mt-8 text-3xl font-bold text-hs-text first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="mb-3 mt-8 text-2xl font-bold text-hs-text">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="mb-2 mt-6 text-xl font-semibold text-hs-text">{children}</h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="mb-2 mt-4 text-lg font-semibold text-hs-text">{children}</h4>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 leading-relaxed text-hs-text-muted">{children}</p>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="text-hs-primary underline decoration-hs-primary/30 underline-offset-2 transition-colors hover:decoration-hs-primary"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-hs-text-muted">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-hs-text-muted">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="rounded bg-hs-surface-2 px-1.5 py-0.5 font-mono text-sm text-hs-primary">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="my-4 overflow-x-auto rounded-lg border border-hs-border bg-hs-surface p-4">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="my-4 border-l-4 border-hs-primary/50 bg-hs-surface/50 py-2 pl-4 italic text-hs-text-muted">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-hs-border" />,
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-hs-border">
      <table className="w-full">{children}</table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="border-b border-hs-border bg-hs-surface">{children}</thead>
  ),
  tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody>{children}</tbody>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="border-b border-hs-border last:border-b-0">{children}</tr>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-hs-text">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="px-4 py-3 text-sm text-hs-text-muted">{children}</td>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-hs-text">{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
};

export async function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="wiki-content">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
          },
        }}
      />
    </div>
  );
}
