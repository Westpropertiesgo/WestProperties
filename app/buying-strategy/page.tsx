import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BuyingStrategyTool from "@/components/home/BuyingStrategyTool";

export default function BuyingStrategyPage() {
  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24">
        <BuyingStrategyTool />
      </main>
      <Footer />
    </>
  );
}
