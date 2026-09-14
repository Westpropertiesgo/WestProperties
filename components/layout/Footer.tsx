import Link from "next/link";
import { navLinks } from "@/lib/data";

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="container-x grid gap-14 py-20 md:grid-cols-3">
        <div className="md:col-span-1">
          <p className="flex items-baseline gap-2">
            <span className="font-logo text-2xl text-ivory tracking-tight">West</span>
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-brass">Properties</span>
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest2 text-brass-light">
            Find Your Next Home With West Properties.
          </p>
          <p className="mt-4 max-w-[240px] text-[13px] leading-relaxed text-ivory/55">
            Your trusted guide to Milton, Oakville, and Mississauga real estate.
          </p>
          <div className="mt-6 flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center border border-ivory/20 text-[11px] uppercase text-ivory/70 transition-colors hover:border-brass hover:text-brass"
              >
                {s.label.charAt(0)}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-ivory/40">
            Navigate
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[14px] text-ivory/70 transition-colors hover:text-brass-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-ivory/40">
            Contact
          </p>
          <ul className="mt-5 flex flex-col gap-3 text-[14px] text-ivory/70">
            <li>30 Eglinton Ave W, Mississauga, ON #201</li>
            <li>
              <a href="mailto:info@westproperties.ca" className="hover:text-brass-light">
                info@westproperties.ca
              </a>
            </li>
            <li>Mon &ndash; Sat, 9am &ndash; 7pm ET</li>
          </ul>
        </div>

      </div>

      <div className="hairline border-ivory/10">
        <div className="container-x flex flex-col gap-6 py-8 text-[11px] leading-relaxed text-ivory/40 lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-3xl">
            The trademarks MLS&reg;, Multiple Listing Service&reg;, and the
            associated logos are owned by the Canadian Real Estate
            Association (CREA) and identify the quality of services provided
            by real estate professionals who are members of CREA. Listing
            data on this site is a placeholder pending live MLS&reg;/IDX feed
            integration and does not reflect real, currently available
            properties. All information is deemed reliable but is not
            guaranteed and should be independently verified.
          </p>
          <div className="flex shrink-0 gap-6">
            <Link href="/privacy" className="hover:text-brass-light">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brass-light">
              Terms of Use
            </Link>
          </div>
        </div>
        <div className="container-x pb-8 text-[11px] text-ivory/30">
          &copy; {new Date().getFullYear()} West Properties. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
