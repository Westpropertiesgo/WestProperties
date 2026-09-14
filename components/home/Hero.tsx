"use client";

import HeroSearch from "@/components/home/HeroSearch";

// Identical color grade on all three photos — no single city's source photo
// (e.g. a bluer sky or greener foliage) is allowed to read "louder" than the
// others, so Milton, Oakville, and Mississauga carry equal visual weight.
const PHOTO_FILTER = "grayscale(0.55) saturate(0.85) contrast(1.08) brightness(0.88)";

// Same three source photos used by both the desktop panorama and the mobile
// slideshow below, each with a mobile-tuned crop so the part of the photo
// that matters stays in frame on a narrow phone screen.
const CITY_PHOTOS = [
  {
    src: "https://images.pexels.com/photos/38354308/pexels-photo-38354308.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1100&fit=crop",
    alt: "Wide view of a Milton, Ontario community",
    mobileObjectPosition: "object-[62%_50%]",
  },
  {
    src: "https://images.pexels.com/photos/5636000/pexels-photo-5636000.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1100&fit=crop",
    alt: "Oakville, Ontario harbour lighthouse",
    mobileObjectPosition: "object-[68%_40%]",
  },
  {
    src: "https://images.pexels.com/photos/33260742/pexels-photo-33260742.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1100&fit=crop",
    alt: "Mississauga, Ontario skyline",
    mobileObjectPosition: "object-[42%_35%]",
  },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[58vh] w-full flex-col items-center justify-center bg-ink pt-20 md:min-h-[42vh] md:pt-24">
      <div className="absolute inset-0 overflow-hidden">
        {/* Desktop (md and up) — one continuous panorama, Milton, Oakville,
            Mississauga cross-fading into each other via soft CSS mask
            gradients rather than hard panel edges. Panels are 44% wide with
            generous 16%-wide overlaps so the blend zones are wide and soft,
            never a visible seam. Unchanged from the approved desktop design. */}
        <div className="absolute inset-0 hidden md:block">
          <img
            src={CITY_PHOTOS[0].src}
            alt={CITY_PHOTOS[0].alt}
            className="absolute inset-y-0 left-0 h-full w-[44%] object-cover object-center"
            style={{
              filter: PHOTO_FILTER,
              WebkitMaskImage: "linear-gradient(to right, black 0%, black 64%, transparent 100%)",
              maskImage: "linear-gradient(to right, black 0%, black 64%, transparent 100%)",
            }}
          />
          <img
            src={CITY_PHOTOS[1].src}
            alt={CITY_PHOTOS[1].alt}
            className="absolute inset-y-0 left-[28%] h-full w-[44%] object-cover object-center"
            style={{
              filter: PHOTO_FILTER,
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 36%, black 64%, transparent 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, black 36%, black 64%, transparent 100%)",
            }}
          />
          <img
            src={CITY_PHOTOS[2].src}
            alt={CITY_PHOTOS[2].alt}
            className="absolute inset-y-0 left-[56%] h-full w-[44%] object-cover object-center"
            style={{
              filter: PHOTO_FILTER,
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 36%, black 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, black 36%, black 100%)",
            }}
          />
          {/* One uniform wash across the full panorama ties all three photos to
              a single consistent tone, rather than tinting one panel alone. */}
          <div className="absolute inset-0 bg-ink/20" />
        </div>

        {/* Mobile (below md) — a full-width slideshow instead of the
            side-by-side panorama: one city fills the frame at a time,
            smoothly dissolving into the next (Milton -> Oakville ->
            Mississauga -> loop) via a pure-CSS opacity crossfade, so the
            transition never pops, slides, or jumps. */}
        <div className="absolute inset-0 md:hidden">
          {CITY_PHOTOS.map((photo, i) => (
            <img
              key={photo.alt}
              src={photo.src}
              alt={photo.alt}
              className={`absolute inset-0 h-full w-full object-cover ${photo.mobileObjectPosition}`}
              style={{
                filter: PHOTO_FILTER,
                animation: `hero-slideshow-fade 12s ease-in-out ${i * 4}s infinite backwards`,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-ink/20" />
        </div>
      </div>
      {/* Flat scrim guarantees text/search-bar contrast; the two gradients add cinematic depth */}
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-transparent" />

      <div className="container-x relative z-10 flex flex-col items-center py-5 text-center md:py-6">
        <h1
          className="relative font-display text-[34px] font-medium leading-[1.15] text-ivory drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] md:text-[46px]"
          style={{ top: "1cm" }}
        >
          Explore The Best
          <br />
          With WestProperties.ca
        </h1>

        <div className="relative mt-6 w-full max-w-3xl" style={{ marginTop: "3cm", top: "-0.5cm" }}>
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}
