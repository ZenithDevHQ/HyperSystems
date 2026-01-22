import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { PluginShowcase } from "@/components/landing/PluginShowcase";
import { Philosophy } from "@/components/landing/Philosophy";
import { Stats } from "@/components/landing/Stats";
import { CTA } from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PluginShowcase />
        <Philosophy />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
