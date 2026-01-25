import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { PluginShowcase } from "@/components/landing/PluginShowcase";
import { Testimonials } from "@/components/landing/Testimonials";
import { Philosophy } from "@/components/landing/Philosophy";
import { Stats } from "@/components/landing/Stats";
import { Newsletter } from "@/components/landing/Newsletter";
import { CTA } from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <PluginShowcase />
        <Testimonials />
        <Philosophy />
        <Stats />
        <Newsletter />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
