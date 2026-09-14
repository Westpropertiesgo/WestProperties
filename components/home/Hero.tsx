"use client";

import HeroSearch from "@/components/home/HeroSearch";

export default function Hero() {
  return (
    <section className="relative flex min-h-[42vh] w-full flex-col items-center justify-center bg-ink pt-20 md:pt-24">
      {/* Three-city blended background — Milton, Oakville, Mississauga, cross-fading
          into one continuous panorama via CSS masks rather than hard panel edges. */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/38354308/pexels-photo-38354308.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1100&fit=crop"
          alt="Wide view of a Milton, Ontario community"
          className="absolute inset-y-0 left-0 h-full w-[42%] object-cover object-[60%_50%] md:object-center"
          style={{
            filter: "grayscale(0.65) brightness(0.85) contrast(1.05)",
            WebkitMaskImage: "linear-gradient(to right, black 0%, black 69%, transparent 100%)",
            maskImage: "linear-gradient(to right, black 0%, black 69%, transparent 100%)",
          }}
        />
        {/* Blue-gray tint forces this panel's tone to match the other two regardless of the source photo's original colors */}
        <div
          className="absolute inset-y-0 left-0 h-full w-[42%]"
          style={{
            backgroundColor: "rgba(70, 90, 115, 0.32)",
            WebkitMaskImage: "linear-gradient(to right, black 0%, black 69%, transparent 100%)",
            maskImage: "linear-gradient(to right, black 0%, black 69%, transparent 100%)",
          }}
        />
        <img
          src="https://images.pexels.com/photos/5636000/pexels-photo-5636000.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1100&fit=crop"
          alt="Oakville, Ontario harbour lighthouse"
          className="absolute inset-y-0 left-[29%] h-full w-[42%] object-cover object-center"
          style={{
            filter: "brightness(0.9) saturate(0.9)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 31%, black 69%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 31%, black 69%, transparent 100%)",
          }}
        />
        <img
          src="https://images.pexels.com/photos/33260742/pexels-photo-33260742.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1100&fit=crop"
          alt="Mississauga, Ontario skyline"
          className="absolute inset-y-0 left-[58%] h-full w-[42%] object-cover object-center"
          style={{
            filter: "brightness(0.9) saturate(0.9)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 31%, black 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 31%, black 100%)",
          }}
        />
      </div>
      {/* Flat scrim guarantees contrast; the two gradients add cinematic depth */}
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
