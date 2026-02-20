import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface PageHeaderProps {
  title: string;
  description?: string;
}

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-white/[0.06] bg-hs-bg py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-hs-text sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-hs-text-muted">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

interface PageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  showHeader?: boolean;
}

export function PageLayout({
  title,
  description,
  children,
  showHeader = true,
}: PageLayoutProps) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        {showHeader && <PageHeader title={title} description={description} />}
        {children}
      </main>
      <Footer />
    </>
  );
}
