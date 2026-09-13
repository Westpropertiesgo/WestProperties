import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/home/FinalCTA";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24">
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
