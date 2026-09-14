import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LifestyleMatchQuiz from "@/components/home/LifestyleMatchQuiz";

export default function LifestyleMatchPage() {
  return (
    <>
      <Header alwaysSolid />
      <main className="pt-20 md:pt-24">
        <LifestyleMatchQuiz />
      </main>
      <Footer />
    </>
  );
}
