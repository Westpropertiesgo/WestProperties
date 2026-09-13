import Link from "next/link";
import CalculatorSuite from "@/components/home/CalculatorSuite";

const toolLinks = [
  { href: "/home-value", label: "Home Value Estimate", copy: "See what your property could sell for today." },
  { href: "/lifestyle-match", label: "Lifestyle Match Quiz", copy: "Find the neighbourhood that fits how you live." },
  { href: "/buying-strategy", label: "Buying Strategy Guide", copy: "A step-by-step framework for your purchase." },
];

export default function SmartToolsSection() {
  return (
    <section className="bg-ivory py-16 md:py-24" id="tools">
      <div className="container-x">
        <div className="text-center">
          <span className="plaque justify-center">Calculating Tools</span>
          <h2 className="mt-4 font-display text-[24px] font-light leading-tight text-ink md:text-[28px]">
            Run the numbers before you talk to an agent
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <CalculatorSuite />
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-px overflow-hidden bg-stone-line sm:grid-cols-3">
          {toolLinks.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col bg-ivory p-6 transition-colors hover:bg-stone"
            >
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-brass">
                {tool.label}
              </span>
              <span className="mt-2 text-[13px] leading-relaxed text-ink/60">{tool.copy}</span>
              <span className="mt-4 font-mono text-[11px] uppercase tracking-widest2 text-ink/40 transition-colors group-hover:text-ink">
                Open Tool &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
