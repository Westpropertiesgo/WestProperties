import Link from "next/link";
import { navLinks } from "@/lib/data";

// Simple monochrome brand marks (currentColor) rather than letter-in-a-box
// placeholders, so each icon is actually recognizable at a glance.
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M14 3v10.8a3.1 3.1 0 1 1-2.6-3.06M14 3c.35 2.1 1.9 3.7 4 4v2.4c-1.5 0-2.9-.45-4-1.23"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7.7" cy="8.3" r="1.15" fill="currentColor" />
      <path d="M7.7 11.2v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M11.6 17.2v-3.6c0-1.35.95-2.4 2.2-2.4s2.1 1.05 2.1 2.4v3.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M14.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.25-1.4 1.4-1.4h1.5V5.3C16.9 5.2 16 5.1 15 5.1c-2.1 0-3.5 1.3-3.5 3.6v2.3H9v2.8h2.5V21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Placeholder URLs (generic platform roots, same convention as before) —
// swap for West Properties' real handles when they're set up.
const socials = [
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com", Icon: TikTokIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedInIcon },
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="container-x grid gap-8 py-10 md:grid-cols-[0.8fr_1.2fr]">
        <div>
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
        </div>

        {/* Navigate and Contact share a tighter inner gap than the gap to
            the brand column, and the narrower gap-10/1fr-1fr split above
            pulls this whole group closer to the West Properties wordmark. */}
        <div className="grid gap-6 sm:grid-cols-2">
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
              <li>
                <a href="tel:+16474822470" className="hover:text-brass-light">
                  647-482-2470
                </a>
              </li>
              <li>Mon &ndash; Sat, 9am &ndash; 7pm ET</li>
            </ul>

            <div className="mt-5 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border border-ivory/20 text-ivory/70 transition-colors hover:border-brass hover:text-brass"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hairline border-ivory/10">
        <div className="container-x flex justify-end gap-6 py-6 text-[11px] text-ivory/40">
          <Link href="/privacy" className="hover:text-brass-light">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-brass-light">
            Terms of Use
          </Link>
        </div>
        {/* Centered and width-capped, not stretched full-width or pinned to
            one edge — wrapped lines of differing length center on the same
            axis, reading as one organized block rather than a long line.
            pb-24 (not pb-8) is intentional: the site-wide chat launcher is
            fixed bottom-6 right-6, so this row needs enough clearance that
            its text never sits underneath that floating button once the
            page is scrolled all the way down. */}
        <div className="container-x flex justify-center pb-24 text-center">
          <div className="max-w-2xl">
            <p className="text-[12px] leading-relaxed text-ivory/50">
              &copy; {new Date().getFullYear()} West Properties. All rights reserved. Hussnain Khalid,
              Salesperson. Independently Owned and Operated. Registered with RECO. Brokerage Office: Royal
              Lepage Signature Realty.
            </p>
            <p className="mt-2 text-[10.5px] leading-relaxed text-ivory/30">
              Not intended to solicit buyers or sellers currently under contract. The MLS&reg; trademark
              and associated logos are owned by The Canadian Real Estate Association (CREA) and identify
              the quality of services provided by real estate professionals who are members of CREA.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
