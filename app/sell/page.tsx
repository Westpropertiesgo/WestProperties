import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SellingSection from "@/components/home/SellingSection";

export default function SellPage() {
  return (
    <>
      <Header />
      {/* bg-ink matches SellingSection's own background — without it, the
          pt-20/24 reserved for the fixed header exposes the page's default
          ivory background in that gap, and the header's transparent white
          text becomes unreadable against it. */}
      <main className="bg-ink pt-20 md:pt-24">
        <SellingSection />
      </main>
      <Footer />
    </>
  );
}
