import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import { journalArticles } from "@/lib/data";

export default function WestJournalSection() {
  return (
    <section className="bg-ivory py-28 md:py-36" id="journal" aria-labelledby="journal-heading">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow className="mb-5">West Journal</Eyebrow>
            <h2 id="journal-heading" className="max-w-xl font-display text-[26px] font-light leading-tight text-ink md:text-[30px]">
              Guides &amp; insights from the local market
            </h2>
          </div>
          <Link href="/journal" className="btn-outline">
            Visit the Journal
          </Link>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {journalArticles.map((article) => (
            <article key={article.slug} className="group flex flex-col">
              <Link href={`/journal/${article.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-stone">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-[1000ms] ease-signature group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-widest2 text-brass">
                {article.category}
              </p>
              <h3 className="mt-2 font-display text-lg font-normal leading-snug text-ink">
                <Link href={`/journal/${article.slug}`} className="transition-colors hover:text-brass-dark">
                  {article.title}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink/60">
                {article.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-ink/40">
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString("en-CA", {
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                <span>&middot;</span>
                <span>{article.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
