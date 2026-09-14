/**
 * ============================================================================
 * MOCK DATA — FOR DEVELOPMENT/DEMO ONLY
 * ============================================================================
 * Everything in this file is placeholder data so the map can be built and
 * demonstrated before a real MLS/listing feed is connected.
 *
 * This is intentionally kept SEPARATE from lib/data.ts (the real listings
 * used elsewhere on the site — property cards, the AI match engine, etc.)
 * so the map's data source can be swapped later without touching any UI
 * component: replace the `mockListings` export below with a `realListings`
 * export of the same `MapListing` shape (e.g. sourced from `fetchListings()`
 * hitting a real API), and nothing in components/map/ needs to change.
 * ============================================================================
 */

export interface MapListing {
  id: string;
  latitude: number;
  longitude: number;
  /** Numeric price in CAD. For rentals this is the monthly amount. */
  price: number;
  isRental: boolean;
  address: string;
  city: "Oakville" | "Mississauga" | "Milton" | "Brampton";
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: "Detached" | "Townhouse" | "Condo" | "Semi-Detached";
  status: "For Sale" | "New Listing" | "For Rent" | "Pre-Construction";
  image: string;
  /** Where "View Property" should go. A real feed may point off-site or to a future detail route. */
  listingUrl: string;
}

export const mockListings: MapListing[] = [
  // ---- Oakville ----
  { id: "mock-ok-1", latitude: 43.4283, longitude: -79.7227, price: 899_000, isRental: false, address: "14 Glen Abbey Gate", city: "Oakville", neighborhood: "Glen Abbey", bedrooms: 3, bathrooms: 2, sqft: 1680, propertyType: "Townhouse", status: "For Sale", image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-ok-1" },
  { id: "mock-ok-2", latitude: 43.4010, longitude: -79.7135, price: 1_150_000, isRental: false, address: "18 Bronte Village Cres", city: "Oakville", neighborhood: "Bronte", bedrooms: 3, bathrooms: 3, sqft: 2100, propertyType: "Semi-Detached", status: "New Listing", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-ok-2" },
  { id: "mock-ok-3", latitude: 43.4525, longitude: -79.6885, price: 1_390_000, isRental: false, address: "17 River Oaks Blvd", city: "Oakville", neighborhood: "River Oaks", bedrooms: 4, bathrooms: 3, sqft: 2650, propertyType: "Detached", status: "For Sale", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-ok-3" },
  { id: "mock-ok-4", latitude: 43.4460, longitude: -79.6790, price: 1_650_000, isRental: false, address: "9 Trafalgar Ridge Rd", city: "Oakville", neighborhood: "River Oaks", bedrooms: 4, bathrooms: 4, sqft: 3200, propertyType: "Detached", status: "For Sale", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-ok-4" },
  { id: "mock-ok-5", latitude: 43.4380, longitude: -79.7350, price: 2_100_000, isRental: false, address: "22 Kingsford Gate", city: "Oakville", neighborhood: "Glen Abbey", bedrooms: 5, bathrooms: 5, sqft: 4100, propertyType: "Detached", status: "For Sale", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-ok-5" },
  { id: "mock-ok-6", latitude: 43.4470, longitude: -79.6910, price: 2_950, isRental: true, address: "17 River Oaks Blvd, Unit 2", city: "Oakville", neighborhood: "River Oaks", bedrooms: 3, bathrooms: 2, sqft: 1520, propertyType: "Townhouse", status: "For Rent", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-ok-6" },

  // ---- Mississauga ----
  { id: "mock-ms-1", latitude: 43.5934, longitude: -79.6421, price: 699_000, isRental: false, address: "88 Elm Dr W, Unit 1504", city: "Mississauga", neighborhood: "City Centre", bedrooms: 2, bathrooms: 2, sqft: 940, propertyType: "Condo", status: "New Listing", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-ms-1" },
  { id: "mock-ms-2", latitude: 43.5556, longitude: -79.5943, price: 799_000, isRental: false, address: "42 Lakeshore Rd W", city: "Mississauga", neighborhood: "Port Credit", bedrooms: 2, bathrooms: 2, sqft: 1180, propertyType: "Condo", status: "For Sale", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-ms-2" },
  { id: "mock-ms-3", latitude: 43.5561, longitude: -79.7251, price: 925_000, isRental: false, address: "310 Eglinton Ave W, Unit 8", city: "Mississauga", neighborhood: "Erin Mills", bedrooms: 3, bathrooms: 3, sqft: 1820, propertyType: "Townhouse", status: "For Sale", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-ms-3" },
  { id: "mock-ms-4", latitude: 43.5610, longitude: -79.6080, price: 1_050_000, isRental: false, address: "70 Port St E, Unit 12", city: "Mississauga", neighborhood: "Port Credit", bedrooms: 3, bathrooms: 3, sqft: 2050, propertyType: "Semi-Detached", status: "For Sale", image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-ms-4" },
  { id: "mock-ms-5", latitude: 43.5980, longitude: -79.6510, price: 1_290_000, isRental: false, address: "35 Kariya Dr", city: "Mississauga", neighborhood: "City Centre", bedrooms: 4, bathrooms: 3, sqft: 2480, propertyType: "Detached", status: "For Sale", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-ms-5" },
  { id: "mock-ms-6", latitude: 43.5928, longitude: -79.6435, price: 2_650, isRental: true, address: "1 City Centre Dr, Unit 2208", city: "Mississauga", neighborhood: "City Centre", bedrooms: 2, bathrooms: 2, sqft: 940, propertyType: "Condo", status: "For Rent", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-ms-6" },

  // ---- Milton ----
  { id: "mock-mi-1", latitude: 43.5147, longitude: -79.8825, price: 749_000, isRental: false, address: "9 Beaty Ave", city: "Milton", neighborhood: "Beaty", bedrooms: 3, bathrooms: 2, sqft: 1540, propertyType: "Townhouse", status: "For Sale", image: "https://images.unsplash.com/photo-1573472798552-a86e9b6c25d5?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-mi-1" },
  { id: "mock-mi-2", latitude: 43.5218, longitude: -79.8395, price: 829_000, isRental: false, address: "52 Clarke Ave", city: "Milton", neighborhood: "Clarke", bedrooms: 3, bathrooms: 3, sqft: 1780, propertyType: "Townhouse", status: "New Listing", image: "https://images.unsplash.com/photo-1600573472591-ee6981cf35b6?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-mi-2" },
  { id: "mock-mi-3", latitude: 43.5185, longitude: -79.8781, price: 899_000, isRental: false, address: "6 Milton Heights Ave", city: "Milton", neighborhood: "Old Milton", bedrooms: 4, bathrooms: 3, sqft: 2280, propertyType: "Semi-Detached", status: "For Sale", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-mi-3" },
  { id: "mock-mi-4", latitude: 43.5295, longitude: -79.8605, price: 999_000, isRental: false, address: "27 Coates Crescent", city: "Milton", neighborhood: "Coates", bedrooms: 4, bathrooms: 3, sqft: 2680, propertyType: "Detached", status: "For Sale", image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-mi-4" },
  { id: "mock-mi-5", latitude: 43.5060, longitude: -79.8460, price: 1_150_000, isRental: false, address: "14 Scott Blvd", city: "Milton", neighborhood: "Scott", bedrooms: 5, bathrooms: 4, sqft: 3050, propertyType: "Detached", status: "For Sale", image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-mi-5" },
  { id: "mock-mi-6", latitude: 43.5189, longitude: -79.8768, price: 2_400, isRental: true, address: "6 Old Milton Rd, Unit 4", city: "Milton", neighborhood: "Old Milton", bedrooms: 2, bathrooms: 1, sqft: 890, propertyType: "Townhouse", status: "For Rent", image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-mi-6" },

  // ---- Brampton ----
  { id: "mock-bp-1", latitude: 43.7020, longitude: -79.7620, price: 699_000, isRental: false, address: "48 Mount Pleasant Village Way", city: "Brampton", neighborhood: "Mount Pleasant", bedrooms: 3, bathrooms: 2, sqft: 1420, propertyType: "Townhouse", status: "New Listing", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-bp-1" },
  { id: "mock-bp-2", latitude: 43.6890, longitude: -79.7460, price: 749_000, isRental: false, address: "112 Springdale Rd", city: "Brampton", neighborhood: "Springdale", bedrooms: 3, bathrooms: 3, sqft: 1650, propertyType: "Semi-Detached", status: "For Sale", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-bp-2" },
  { id: "mock-bp-3", latitude: 43.6850, longitude: -79.7600, price: 819_000, isRental: false, address: "8 Credit Valley Way", city: "Brampton", neighborhood: "Credit Valley", bedrooms: 4, bathrooms: 3, sqft: 2050, propertyType: "Semi-Detached", status: "For Sale", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-bp-3" },
  { id: "mock-bp-4", latitude: 43.7300, longitude: -79.7660, price: 899_000, isRental: false, address: "25 Bram East Gate", city: "Brampton", neighborhood: "Bram East", bedrooms: 4, bathrooms: 4, sqft: 2480, propertyType: "Detached", status: "For Sale", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-bp-4" },
  { id: "mock-bp-5", latitude: 43.6830, longitude: -79.7600, price: 2_100, isRental: true, address: "8 Credit Valley Way, Unit B", city: "Brampton", neighborhood: "Credit Valley", bedrooms: 2, bathrooms: 1, sqft: 980, propertyType: "Townhouse", status: "For Rent", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=900&auto=format&fit=crop", listingUrl: "/listings/mock-bp-5" },
];
