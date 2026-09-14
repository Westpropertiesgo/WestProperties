import Link from "next/link";
import type { MapListing } from "@/lib/mockListings";
import { formatPriceFull } from "@/lib/mapUtils";

export default function PropertyPreviewCard({ listing, onClose }: { listing: MapListing; onClose: () => void }) {
  return (
    <div className="absolute bottom-5 left-1/2 z-20 w-[90%] max-w-sm -translate-x-1/2 overflow-hidden rounded-xl border border-ivory/15 bg-ink shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] sm:left-5 sm:translate-x-0">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-ink/70 text-ivory/70 hover:text-brass-light"
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
          <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <div className="flex gap-3 p-3">
        <img src={listing.image} alt={listing.address} className="h-20 w-20 shrink-0 rounded-lg object-cover" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-[16px] font-medium text-brass-light">{formatPriceFull(listing.price, listing.isRental)}</p>
          <p className="truncate text-[12px] text-ivory/70">{listing.address}</p>
          <p className="truncate text-[11px] text-ivory/45">
            {listing.neighborhood}, {listing.city}
          </p>
          <div className="mt-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-ivory/55">
            <span>{listing.bedrooms} bd</span>
            <span>&middot;</span>
            <span>{listing.bathrooms} ba</span>
            <span>&middot;</span>
            <span>{listing.sqft.toLocaleString()} sqft</span>
            <span>&middot;</span>
            <span>{listing.propertyType}</span>
          </div>
        </div>
      </div>
      <Link
        href={listing.listingUrl}
        className="block border-t border-ivory/10 px-3 py-2.5 text-center font-mono text-[11px] uppercase tracking-widest2 text-brass-light transition-colors hover:bg-ivory/5"
      >
        View Property &rarr;
      </Link>
    </div>
  );
}
