import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WestInsiderSection from "@/components/home/WestInsiderSection";

export default function InsiderPage() {
  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24">
        <WestInsiderSection />
      </main>
      <Footer />
    </>
  );
}
