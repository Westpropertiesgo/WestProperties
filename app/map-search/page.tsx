import Header from "@/components/layout/Header";
import PropertyMapExplorer from "@/components/map/PropertyMapExplorer";

export const metadata = {
  title: "Property Map Search | West Properties",
  description: "Explore Mississauga, Oakville, and Milton listings on an interactive price map.",
};

export default function MapSearchPage() {
  return (
    <>
      <Header alwaysSolid />
      <main className="pt-20 md:pt-24">
        <PropertyMapExplorer />
      </main>
    </>
  );
}
