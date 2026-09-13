import {
  Community,
  JournalArticle,
  MarketStat,
  MLSFeedConfig,
  Property,
  QuickFilter,
  SearchSuggestion,
  Testimonial,
  TrustBadge,
} from "./types";

export const communities: Community[] = [
  {
    slug: "mississauga",
    name: "Mississauga",
    city: "Mississauga",
    postalPrefix: "L5",
    description:
      "A lakefront-to-skyline city where Port Credit's marina charm meets the density of a growing downtown core.",
    averagePrice: "$1.08M avg.",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1400&auto=format&fit=crop",
    neighborhoods: ["Port Credit", "Erin Mills", "Streetsville", "Clarkson", "City Centre"],
  },
  {
    slug: "oakville",
    name: "Oakville",
    city: "Oakville",
    postalPrefix: "L6",
    description:
      "Tree-lined streets, harbourfront estates, and a downtown built around heritage architecture and old-growth character.",
    averagePrice: "$1.62M avg.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
    neighborhoods: ["Bronte", "Glen Abbey", "River Oaks", "Old Oakville"],
  },
  {
    slug: "milton",
    name: "Milton",
    city: "Milton",
    postalPrefix: "L9",
    description:
      "Escarpment views and young, established family neighbourhoods within one of the GTA's fastest-growing corridors.",
    averagePrice: "$968K avg.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1400&auto=format&fit=crop",
    neighborhoods: ["Old Milton", "Beaty", "Coates", "Clarke"],
  },
];

export const properties: Property[] = [
  {
    id: "wp-1001",
    address: "42 Lakeshore Rd W",
    city: "Port Credit, Mississauga",
    price: "$2,395,000",
    beds: 4,
    baths: 4,
    sqft: 3120,
    type: "Detached",
    status: "New Listing",
    listingType: "sale",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "wp-1002",
    address: "18 Bronte Village Cres",
    city: "Bronte, Oakville",
    price: "$3,150,000",
    beds: 5,
    baths: 5,
    sqft: 4480,
    type: "Detached",
    status: "For Sale",
    listingType: "sale",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "wp-1003",
    address: "905 Trafalgar Rd, Unit 1201",
    city: "River Oaks, Oakville",
    price: "$894,900",
    beds: 2,
    baths: 2,
    sqft: 1140,
    type: "Condo",
    status: "For Sale",
    listingType: "sale",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "wp-1004",
    address: "27 Coates Crescent",
    city: "Coates, Milton",
    price: "$1,249,000",
    beds: 4,
    baths: 3,
    sqft: 2680,
    type: "Detached",
    status: "New Listing",
    listingType: "sale",
    image:
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "wp-1005",
    address: "310 Eglinton Ave W, Unit 8",
    city: "Erin Mills, Mississauga",
    price: "$1,065,000",
    beds: 3,
    baths: 3,
    sqft: 1820,
    type: "Townhouse",
    status: "For Sale",
    listingType: "sale",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "wp-1006",
    address: "6 Milton Heights Ave",
    city: "Old Milton, Milton",
    price: "$1,489,000",
    beds: 4,
    baths: 4,
    sqft: 2990,
    type: "Detached",
    status: "For Sale",
    listingType: "sale",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "wp-1007",
    address: "88 Elm Dr W, Unit 1504",
    city: "City Centre, Mississauga",
    price: "$729,900",
    beds: 2,
    baths: 2,
    sqft: 980,
    type: "Condo",
    status: "New Listing",
    listingType: "sale",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "wp-1008",
    address: "14 Glen Abbey Gate",
    city: "Glen Abbey, Oakville",
    price: "$2,180,000",
    beds: 5,
    baths: 4,
    sqft: 3860,
    type: "Detached",
    status: "For Sale",
    listingType: "sale",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "wp-1009",
    address: "52 Clarke Ave",
    city: "Clarke, Milton",
    price: "$999,000",
    beds: 3,
    baths: 3,
    sqft: 1960,
    type: "Townhouse",
    status: "For Sale",
    listingType: "sale",
    image:
      "https://images.unsplash.com/photo-1600573472591-ee6981cf35b6?q=80&w=1400&auto=format&fit=crop",
  },
];

export const rentalProperties: Property[] = [
  {
    id: "wp-r-2001",
    address: "1 City Centre Dr, Unit 2208",
    city: "City Centre, Mississauga",
    price: "$2,650 /mo",
    beds: 2,
    baths: 2,
    sqft: 940,
    type: "Condo",
    status: "For Rent",
    listingType: "rent",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "wp-r-2002",
    address: "24 Bronte Rd, Unit 3",
    city: "Bronte, Oakville",
    price: "$3,200 /mo",
    beds: 3,
    baths: 2,
    sqft: 1450,
    type: "Townhouse",
    status: "For Rent",
    listingType: "rent",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "wp-r-2003",
    address: "9 Beaty Ave",
    city: "Beaty, Milton",
    price: "$2,950 /mo",
    beds: 3,
    baths: 2,
    sqft: 1580,
    type: "Detached",
    status: "For Rent",
    listingType: "rent",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "wp-r-2004",
    address: "310 Eglinton Ave W, Unit 12",
    city: "Erin Mills, Mississauga",
    price: "$2,100 /mo",
    beds: 1,
    baths: 1,
    sqft: 640,
    type: "Condo",
    status: "For Rent",
    listingType: "rent",
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "wp-r-2005",
    address: "17 River Oaks Blvd",
    city: "River Oaks, Oakville",
    price: "$3,800 /mo",
    beds: 4,
    baths: 3,
    sqft: 2200,
    type: "Detached",
    status: "For Rent",
    listingType: "rent",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "wp-r-2006",
    address: "6 Old Milton Rd, Unit 4",
    city: "Old Milton, Milton",
    price: "$2,400 /mo",
    beds: 2,
    baths: 1,
    sqft: 890,
    type: "Townhouse",
    status: "For Rent",
    listingType: "rent",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1400&auto=format&fit=crop",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Priya & Aman Sethi",
    location: "Port Credit, Mississauga",
    review:
      "West Properties knew Port Credit's inventory before it hit the market. We closed nine days after our first showing, at a number we were comfortable with.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Daniel Okafor",
    location: "Glen Abbey, Oakville",
    review:
      "Selling a long-held family home is emotional. Our agent's pricing strategy and staging plan brought us three offers above ask within the first week.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Laura Bianchi",
    location: "Beaty, Milton",
    review:
      "As first-time buyers we had a lot of questions. We never once felt rushed, and the negotiation support saved us real money on our closing costs.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  },
];

/**
 * MLS / IDX integration placeholder. When a board feed is connected,
 * replace this stub with the live sync status and wire `properties`
 * above to the feed response.
 */
export const mlsFeedConfig: MLSFeedConfig = {
  provider: null,
  boardId: null,
  isConnected: false,
  lastSyncedAt: null,
};

/**
 * Mock autocomplete source for the hero search. Replace with a live
 * lookup (neighbourhood index + saved-search query parser) once search
 * is wired to a real listings backend.
 */
export const searchSuggestions: SearchSuggestion[] = [
  { label: "Port Credit", type: "neighbourhood", city: "Mississauga" },
  { label: "Erin Mills", type: "neighbourhood", city: "Mississauga" },
  { label: "Streetsville", type: "neighbourhood", city: "Mississauga" },
  { label: "Clarkson", type: "neighbourhood", city: "Mississauga" },
  { label: "City Centre", type: "neighbourhood", city: "Mississauga" },
  { label: "Bronte", type: "neighbourhood", city: "Oakville" },
  { label: "Glen Abbey", type: "neighbourhood", city: "Oakville" },
  { label: "River Oaks", type: "neighbourhood", city: "Oakville" },
  { label: "Old Oakville", type: "neighbourhood", city: "Oakville" },
  { label: "Old Milton", type: "neighbourhood", city: "Milton" },
  { label: "Beaty", type: "neighbourhood", city: "Milton" },
  { label: "Coates", type: "neighbourhood", city: "Milton" },
  { label: "Clarke", type: "neighbourhood", city: "Milton" },
  { label: "Condos in Square One", type: "query" },
  { label: "Homes under $1M", type: "query" },
  { label: "Top-rated schools nearby", type: "query" },
  { label: "Homes near GO Stations", type: "query" },
];

export const quickFilters: QuickFilter[] = [
  { label: "New Listings", slug: "new-listings" },
  { label: "Pre-Constructions", slug: "pre-construction" },
  { label: "Waterfront Homes", slug: "waterfront" },
  { label: "Condos", slug: "condos" },
  { label: "Luxury Homes", slug: "luxury" },
];

export const marketStats: MarketStat[] = [
  { city: "Mississauga", averagePrice: "$1.08M", trend: "+1.4% MoM", trendDirection: "up" },
  { city: "Oakville", averagePrice: "$1.62M", trend: "+0.6% MoM", trendDirection: "up" },
  { city: "Milton", averagePrice: "$968K", trend: "-0.3% MoM", trendDirection: "down" },
];

export const trustBadges: TrustBadge[] = [
  { label: "Verified Local Expertise in the GTA" },
  { label: "Client-first advisory approach" },
  { label: "Data-informed pricing guidance" },
];

export const journalArticles: JournalArticle[] = [
  {
    slug: "living-in-mississauga-complete-guide",
    category: "City Guide",
    title: "Living in Mississauga: The Complete Guide",
    excerpt:
      "Everything to know before moving to Mississauga — from Port Credit's waterfront to Square One's condo corridor.",
    readTime: "9 min read",
    publishedAt: "2026-05-12",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "oakville-vs-milton-which-is-better",
    category: "Comparison",
    title: "Oakville vs. Milton: Which Is Better for You?",
    excerpt:
      "Two of the GTA's fastest-appreciating towns, compared on commute, schools, price growth, and lifestyle.",
    readTime: "7 min read",
    publishedAt: "2026-04-28",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "best-neighbourhoods-near-toronto-2026",
    category: "Market Insight",
    title: "Best Neighbourhoods Near Toronto in 2026",
    excerpt:
      "Where value, commute time, and long-term appreciation intersect this year across the western GTA.",
    readTime: "11 min read",
    publishedAt: "2026-03-15",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "hidden-gem-areas-gta",
    category: "Neighbourhood Spotlight",
    title: "Hidden Gem Areas in the GTA Buyers Overlook",
    excerpt:
      "Quiet pockets of Mississauga, Oakville, and Milton with strong fundamentals and less competition.",
    readTime: "6 min read",
    publishedAt: "2026-02-20",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
  },
];

/**
 * Simplified rules-based lookup for the "Find Your Ideal Lifestyle
 * Match" tool. This is illustrative UI logic only — a production
 * version would score against real listing density, price data, and
 * commute-time APIs per neighbourhood.
 */
export const lifestyleAreaMatches: Record<
  "urban" | "suburban" | "quiet" | "waterfront",
  { name: string; city: "Mississauga" | "Oakville" | "Milton"; matchScore: number; reason: string }[]
> = {
  urban: [
    { name: "City Centre", city: "Mississauga", matchScore: 94, reason: "High-rise living within walking distance of transit, dining, and Square One." },
    { name: "Old Oakville", city: "Oakville", matchScore: 82, reason: "Walkable downtown core with boutique shops and a compact street grid." },
    { name: "Old Milton", city: "Milton", matchScore: 74, reason: "Milton's most established core, close to GO transit and Main Street." },
  ],
  suburban: [
    { name: "Erin Mills", city: "Mississauga", matchScore: 91, reason: "Established family streets with mature trees and top-rated schools nearby." },
    { name: "Glen Abbey", city: "Oakville", matchScore: 89, reason: "Golf-course-adjacent suburb known for larger lots and quiet cul-de-sacs." },
    { name: "Beaty", city: "Milton", matchScore: 85, reason: "Newer suburban builds with parks and family amenities close by." },
  ],
  quiet: [
    { name: "Clarkson", city: "Mississauga", matchScore: 88, reason: "Low-density, tree-lined streets tucked away from major traffic corridors." },
    { name: "River Oaks", city: "Oakville", matchScore: 86, reason: "Residential pocket with ravine access and minimal through-traffic." },
    { name: "Clarke", city: "Milton", matchScore: 80, reason: "One of Milton's quietest established pockets, away from the highway." },
  ],
  waterfront: [
    { name: "Port Credit", city: "Mississauga", matchScore: 97, reason: "Marina views, lakeside trails, and Mississauga's best waterfront dining." },
    { name: "Bronte", city: "Oakville", matchScore: 93, reason: "Harbour village character with direct lake access and a working marina." },
    { name: "Old Oakville", city: "Oakville", matchScore: 78, reason: "Closest Milton-adjacent option with creek and green-corridor access." },
  ],
};

/**
 * Curated set for the homepage's "Featured Properties" strip — mirrors the
 * tag variety (new listing / waterfront / condo / pre-construction) shown
 * in the reference design. The full sale/rental grids above remain the
 * source of truth for /buy.
 */
export const homepageFeatured = [
  {
    id: "hp-1",
    tag: "New Listing",
    address: "775 King St W, Unit 4305",
    city: "Mississauga, ON",
    price: "$1,198,000",
    beds: "2 bd",
    baths: "2 ba",
    sqft: "785 sqft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "hp-2",
    tag: "Waterfront",
    address: "56 Annie Craig Dr, Unit 2802",
    city: "Mississauga, ON",
    price: "$1,649,000",
    beds: "2 bd",
    baths: "2 ba",
    sqft: "1,105 sqft",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "hp-3",
    tag: "Condo",
    address: "35 Mercer St, Unit 910",
    city: "Oakville, ON",
    price: "$899,000",
    beds: "1 bd",
    baths: "1 ba",
    sqft: "605 sqft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "hp-4",
    tag: "Pre-Construction",
    address: "8 Elm St (The James)",
    city: "Milton, ON",
    price: "From $610,000",
    beds: "Studio – 3 bd",
    baths: "1 – 2 ba",
    sqft: "",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=900&auto=format&fit=crop",
  },
];

export const primaryServiceAreas = ["Mississauga", "Oakville", "Milton"];
export const expansionServiceAreas = ["Brampton", "Greater Toronto Area"];

export const navLinks = [
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "Communities", href: "/#communities" },
  { label: "Listings", href: "/#listings" },
];

/**
 * Secondary tools & resources, surfaced from the header via a single
 * icon-triggered menu instead of a crowded top-level nav row.
 */
export const toolMenuLinks = [
  { label: "AI Property Match", href: "/match", description: "Get a Match Score 1-100 on every listing" },
  { label: "Mortgage & Affordability Calculators", href: "/tools", description: "Payment, affordability, and land transfer tax" },
  { label: "Home Value Estimate", href: "/home-value", description: "See what your property could sell for" },
  { label: "Lifestyle Match Quiz", href: "/lifestyle-match", description: "Find your ideal neighbourhood" },
  { label: "Buying Strategy Guide", href: "/buying-strategy", description: "A step-by-step framework for buyers" },
  { label: "West Insider Access", href: "/insider", description: "Off-market listings & price drops" },
  { label: "West Journal", href: "/journal", description: "Guides & local market insights" },
  { label: "About & Market Snapshot", href: "/about", description: "Our team, reviews, and price trends" },
];

/**
 * Hierarchical navigation for the left-side drawer menu. Items with
 * `authGated: true` have no real destination yet (they represent
 * account-specific data) — clicking them opens the Log In / Sign Up
 * modal instead of navigating. Everything else routes to a real page.
 */
export interface DrawerLink {
  label: string;
  href?: string;
  authGated?: boolean;
}

export const drawerFlatLinks: DrawerLink[] = [
  { label: "Home", href: "/" },
  { label: "Saved Properties", authGated: true },
  { label: "Favourite Listings", authGated: true },
  { label: "Recently Viewed", authGated: true },
];

export const drawerAccordions: { title: string; items: DrawerLink[] }[] = [
  {
    title: "Calculators",
    items: [
      { label: "AI Property Match Score", href: "/match" },
      { label: "Mortgage Calculator", href: "/tools" },
      { label: "Affordability Calculator", href: "/tools" },
      { label: "Land Transfer Tax Calculator (Ontario)", href: "/tools" },
      { label: "Closing Cost Calculator", href: "/tools" },
    ],
  },
  {
    title: "Buying & Selling",
    items: [
      { label: "Buy a Home", href: "/buy" },
      { label: "Sell a Home", href: "/sell" },
      { label: "First-Time Home Buyer Guide", href: "/buying-strategy" },
      { label: "Investment Properties", href: "/buy" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Blog & Market Insights", href: "/journal" },
      { label: "Neighbourhood Guides", href: "/#communities" },
      { label: "Toronto & GTA Market Reports", href: "/about" },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Property Alerts", authGated: true },
      { label: "Saved Searches", authGated: true },
      { label: "Book a Viewing", href: "/contact" },
      { label: "Profile & Settings", authGated: true },
    ],
  },
];
