import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/home/AboutSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import Testimonials from "@/components/home/Testimonials";
import MarketSnapshotStrip from "@/components/home/MarketSnapshotStrip";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24">
        <AboutSection />
        <WhyUsSection />
        <Testimonials />
        <MarketSnapshotStrip />
      </main>
      <Footer />
    </>
  );
}
