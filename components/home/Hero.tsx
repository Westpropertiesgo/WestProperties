"use client";

import HeroSearch from "@/components/home/HeroSearch";

// Identical color grade on all three photos — no single city's source photo
// (e.g. a bluer sky or greener foliage) is allowed to read "louder" than the
// others, so Milton, Oakville, and Mississauga carry equal visual weight.
const PHOTO_FILTER = "grayscale(0.55) saturate(0.85) contrast(1.08) brightness(0.88)";

export default function Hero() {
  return (
    <section className="relative flex min-h-[58vh] w-full flex-col items-center justify-center bg-ink pt-20 md:min-h-[42vh] md:pt-24">
      {/* One continuous panorama — Milton, Oakville, Mississauga — cross-fading
          into each other via soft CSS mask gradients rather than hard panel
          edges. Panels are 44% wide with generous 16%-wide overlaps so the
          blend zones are wide and soft, never a visible seam. Each city gets
          its own object-position per breakpoint so the part of the photo that
          matters stays in frame on a narrow phone screen instead of just
          being a shrunk copy of the desktop crop. */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/38354308/pexels-photo-38354308.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1100&fit=crop"
          alt="Wide view of a Milton, Ontario community"
          className="absolute inset-y-0 left-0 h-full w-[44%] object-cover object-[62%_50%] md:object-center"
          style={{
            filter: PHOTO_FILTER,
            WebkitMaskImage: "linear-gradient(to right, black 0%, black 64%, transparent 100%)",
            maskImage: "linear-gradient(to right, black 0%, black 64%, transparent 100%)",
          }}
        />
        <img
          src="https://images.pexels.com/photos/5636000/pexels-photo-5636000.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1100&fit=crop"
          alt="Oakville, Ontario harbour lighthouse"
          className="absolute inset-y-0 left-[28%] h-full w-[44%] object-cover object-[68%_40%] md:object-center"
          style={{
            filter: PHOTO_FILTER,
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 36%, black 64%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 36%, black 64%, transparent 100%)",
          }}
        />
        <img
          src="https://images.pexels.com/photos/33260742/pexels-photo-33260742.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1100&fit=crop"
          alt="Mississauga, Ontario skyline"
          className="absolute inset-y-0 left-[56%] h-full w-[44%] object-cover object-[42%_35%] md:object-center"
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
