import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import HomeFeaturedProperties from "@/components/home/HomeFeaturedProperties";
import FeaturedCommunities from "@/components/home/FeaturedCommunities";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HomeFeaturedProperties />
        <FeaturedCommunities />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
