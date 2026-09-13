"use client";

import HeroSearch from "@/components/home/HeroSearch";

export default function Hero() {
  return (
    <section className="relative flex min-h-[42vh] w-full flex-col items-center justify-center bg-ink pt-20 md:pt-24">
      <img
        src="https://images.pexels.com/photos/28154283/pexels-photo-28154283.jpeg?auto=compress&cs=tinysrgb&w=2600&h=1100&fit=crop"
        alt="Toronto skyline at sunset with the CN Tower"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ filter: "brightness(0.85) saturate(1)" }}
      />
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
