import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BuyingSection from "@/components/home/BuyingSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";

export default function BuyPage() {
  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24">
        <BuyingSection />
        <FeaturedProperties />
      </main>
      <Footer />
    </>
  );
}
