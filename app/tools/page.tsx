import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmartToolsSection from "@/components/home/SmartToolsSection";

export default function ToolsPage() {
  return (
    <>
      <Header alwaysSolid />
      <main className="pt-20 md:pt-24">
        <SmartToolsSection />
      </main>
      <Footer />
    </>
  );
}
