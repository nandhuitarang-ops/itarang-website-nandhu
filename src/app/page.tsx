import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import HeroSection from "@/components/home/HeroSection";
import LifecycleStrip from "@/components/home/LifecycleStrip";
import ProofStrip from "@/components/home/ProofStrip";
import WhoWeServe from "@/components/home/WhoWeServe";
import SocialProof from "@/components/home/SocialProof";
import HomeCTA from "@/components/home/HomeCTA";
import BatteryExplodedView from "@/components/home/BatteryExplodedView";
import FloatingDock from "@/components/layout/FloatingDock";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1 overflow-x-hidden">
        {/* Hero with parallax background */}
        <HeroSection />

        {/* Battery Exploded View - animated product showcase */}
        <section className="relative py-24 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-brand-50 text-brand-600 border border-brand-100 mb-4">
                Advanced Technology
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark-900 mb-4 text-balance">
                Engineering Excellence Inside
              </h2>
              <p className="text-dark-500 max-w-xl mx-auto text-pretty">
                Explore the precision engineering behind our lithium battery technology. Hover over each layer to learn more.
              </p>
            </div>
            <BatteryExplodedView />
          </div>
        </section>

        {/* Lifecycle bento grid section */}
        <LifecycleStrip />

        {/* Traction stats with glassmorphism */}
        <ProofStrip />

        {/* Who We Serve with 3D cards */}
        <WhoWeServe />

        {/* Social proof and testimonials */}
        <SocialProof />

        {/* Final CTA section */}
        <HomeCTA />
      </main>

      <Footer />
      <FloatingDock />
      <WhatsAppButton />
    </>
  );
}
