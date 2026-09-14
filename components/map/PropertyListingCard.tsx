import Link from "next/link";
import type { MapListing } from "@/lib/mockListings";
import { formatPriceFull } from "@/lib/mapUtils";

export default function PropertyListingCard({
  listing,
  isSelected,
  isHovered,
  onHover,
  onSelect,
}: {
  listing: MapListing;
  isSelected: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      onMouseEnter={() => onHover(listing.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(listing.id)}
      className={`flex cursor-pointer gap-3 border p-3 transition-colors ${
        isSelected ? "border-brass bg-stone" : isHovered ? "border-ink/25 bg-stone/60" : "border-stone-line bg-ivory"
      }`}
    >
      <img src={listing.image} alt={listing.address} className="h-20 w-24 shrink-0 rounded object-cover" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[14px] font-semibold text-ink">{formatPriceFull(listing.price, listing.isRental)}</p>
          <span className="shrink-0 rounded bg-ink/80 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest2 text-ivory">
            {listing.status}
          </span>
        </div>
        <p className="truncate text-[13px] text-ink/75">{listing.address}</p>
        <p className="truncate text-[11px] text-ink/45">
          {listing.neighborhood}, {listing.city}
        </p>
        <div className="mt-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-ink/50">
          <span>{listing.bedrooms} bd</span>
          <span>&middot;</span>
          <span>{listing.bathrooms} ba</span>
          <span>&middot;</span>
          <span>{listing.sqft.toLocaleString()} sqft</span>
        </div>
        <Link
          href={listing.listingUrl}
          onClick={(e) => e.stopPropagation()}
          className="mt-1.5 inline-block font-mono text-[10px] uppercase tracking-widest2 text-brass-dark hover:text-brass"
        >
          View Property &rarr;
        </Link>
      </div>
    </div>
  );
}
