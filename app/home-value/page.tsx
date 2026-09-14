import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeValueSection from "@/components/home/HomeValueSection";

export default function HomeValuePage() {
  return (
    <>
      <Header alwaysSolid />
      <main className="pt-20 md:pt-24">
        <HomeValueSection />
      </main>
      <Footer />
    </>
  );
}
