import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SellingSection from "@/components/home/SellingSection";

export default function SellPage() {
  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24">
        <SellingSection />
      </main>
      <Footer />
    </>
  );
}
