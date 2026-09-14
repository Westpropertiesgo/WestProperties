import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WestJournalSection from "@/components/home/WestJournalSection";

export default function JournalPage() {
  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24">
        <WestJournalSection />
      </main>
      <Footer />
    </>
  );
}
