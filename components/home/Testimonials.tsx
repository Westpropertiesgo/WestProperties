import Eyebrow from "@/components/ui/Eyebrow";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="bg-stone py-28 md:py-36">
      <div className="container-x">
        <Eyebrow className="mb-5">Client Experience</Eyebrow>
        <h2 className="max-w-xl font-display text-[26px] font-light leading-tight text-ink md:text-[30px]">
          What our clients say
        </h2>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col bg-ivory p-8">
              <blockquote className="flex-1 font-display text-lg font-light italic leading-relaxed text-ink">
                &ldquo;{t.review}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-stone-line pt-6">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-12 w-12 rounded-full object-cover grayscale"
                />
                <div>
                  <p className="font-body text-[14px] font-medium text-ink">{t.name}</p>
                  <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/45">
                    {t.location}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
