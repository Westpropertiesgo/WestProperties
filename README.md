# West Properties

Luxury real estate marketing site for West Properties, serving Mississauga,
Oakville, and Milton, Ontario, built with Next.js 15 (App Router), React,
TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  layout.tsx        Root layout, fonts, global SEO metadata
  page.tsx           Homepage — composes all section components
  globals.css        Design tokens, base styles, reusable utility classes
  robots.ts           robots.txt route
  sitemap.ts          sitemap.xml route
components/
  layout/             Header, Footer
  home/                Homepage sections (Hero, FeaturedCommunities, ...)
  ui/                  Small shared primitives (Eyebrow/plaque label)
lib/
  data.ts              Placeholder content: communities, properties, testimonials
  types.ts             Shared TypeScript interfaces, incl. MLSFeedConfig
```

## Design system

- **Colors** — deep ink navy (`ink`), warm ivory (`ivory`), stone (`stone`),
  and a muted brass accent (`brass`) used as the single accent color
  throughout, defined in `tailwind.config.ts`.
- **Type** — Fraunces (display serif), Inter (body), Space Grotesk
  (mono/label face used for the recurring "plaque" eyebrow tags).
- **Signature motif** — the bordered "plaque" label (see
  `components/ui/Eyebrow.tsx` and the `.plaque` class in `globals.css`)
  echoes the address/lockbox tags found on real GTA listings, and repeats
  across eyebrows, price tags, and property status badges.

## Lead-generation additions

Added on top of the original homepage, in the order they appear on the page:

- **`MarketSnapshotStrip.tsx`** — "GTA Market Snapshot" strip beneath the hero, driven by `marketStats` in `lib/data.ts`.
- **`HeroSearch.tsx`** — client component powering the hero search bar: live-filtered autocomplete (`searchSuggestions` in `lib/data.ts`) and quick-filter chips (`quickFilters`).
- **`LifestyleMatchQuiz.tsx`** — "Find Your Ideal Lifestyle Match", a 5-question quiz gated behind an email capture, resolving to neighbourhood matches via `lifestyleAreaMatches` in `lib/data.ts`.
- **`BuyingStrategyTool.tsx`** — "Your Home Buying Strategy", a tabbed advisory walkthrough (budget, mortgage readiness, timeline, market conditions).
- **`WestInsiderSection.tsx`** — "West Insider Access" VIP email capture for off-market listings and price-drop alerts.
- **`WestJournalSection.tsx`** — "West Journal" blog preview grid, sourced from `journalArticles` in `lib/data.ts`, with semantic `<article>`/`<time>` markup for SEO.
- **`WhyUsSection.tsx`** — extended with a `trustBadges` row ("Verified Local Expertise in the GTA", etc.) above the existing six reasons.

All of the above are additive — no existing section, copy, or layout was removed.

## Site structure (updated)

The homepage is intentionally minimal now: **Hero (search) → Communities → Featured Properties → Footer** (footer carries contact info and email). Everything else lives on its own route and is reachable from the header's icon-triggered "Tools & Resources" menu (see `components/layout/Header.tsx`, `toolMenuLinks` in `lib/data.ts`):

| Route | Component | Content |
|---|---|---|
| `/` | `app/page.tsx` | Hero, Communities, Featured Properties |
| `/buy` | `BuyingSection` + `FeaturedProperties` | Buyer process + listings |
| `/sell` | `SellingSection` | Seller process + lead form |
| `/home-value` | `HomeValueSection` | Home valuation form |
| `/tools` | `SmartToolsSection` (`CalculatorSuite`) | Mortgage, affordability, land transfer tax calculators |
| `/lifestyle-match` | `LifestyleMatchQuiz` | Neighbourhood-match quiz |
| `/buying-strategy` | `BuyingStrategyTool` | Advisory walkthrough |
| `/insider` | `WestInsiderSection` | VIP email capture |
| `/journal` | `WestJournalSection` | Blog preview grid |
| `/about` | `AboutSection`, `WhyUsSection`, `Testimonials`, `MarketSnapshotStrip` | Company, trust badges, reviews, market stats |
| `/contact` | `FinalCTA` | Contact / consultation CTA |

The header's logo links to `/` (no separate "Home" nav item), and the primary nav is limited to Buy / Sell / Communities / Listings to keep the top bar uncrowded. All secondary tools sit behind a single grid-icon menu.

## AI Property Assistant

A floating chat widget (`components/chat/PropertyAssistant.tsx`) is mounted in
`app/layout.tsx`, so it appears on every page and its conversation persists
in memory for the whole browser session (it resets on a full page reload —
this is intentional session-only memory, not a saved chat history).

It's wired to a real API route at `app/api/chat/route.ts`, which calls
Anthropic's Claude with a system prompt containing the site's actual
listings, communities, and market data, so it can answer buying, selling,
investing, mortgage, and neighbourhood questions and reference real
addresses instead of inventing them.

**To activate live AI responses:**
1. Get an API key from https://console.anthropic.com
2. Copy `.env.example` to `.env.local` and paste your key in
3. Restart `npm run dev`

Until a key is added, the widget still works fully, just using a small
local rule-based fallback (`localFallbackReply` inside `PropertyAssistant.tsx`)
so the UI/UX is demonstrable without a live key.

Listing recommendations shown inline in the chat come from
`lib/chatMatcher.ts` — a lightweight keyword matcher (city name, property
type, rent vs. buy intent) run against the real conversation text, not
something the LLM has to output in a special format.

## AI Matching Engine & Property Summaries

Two related but separate features, both grounded in the site's real
listing/community data rather than anything invented on the fly:

**Match Score (1-100)** — `lib/matchEngine.ts` is a deterministic, weighted
scoring algorithm (not an LLM call) comparing a listing against the
user's preferences across 8 factors: budget, property type, family size
(via bedroom count), lifestyle, schools, commute, pets, and investment
goals. It's deterministic on purpose — a numeric score needs to be fast,
consistent, and explainable for the same inputs every time, which a
rules-based recommender does better than asking a model to "guess" a
number for every listing on every page load.

- Preferences are collected via `/match` (`components/match/PreferencesForm.tsx`)
  and persisted to `localStorage` through `components/match/MatchContext.tsx`,
  so once set they follow the user across the whole site for the session.
- Once set, a compact Match Score badge appears on property cards
  (`components/home/FeaturedProperties.tsx`) and a full score breakdown
  appears on each listing's detail page.
- City-level heuristics (commute time to Toronto, school quality, growth
  outlook) live in `lib/cityProfiles.ts` — hand-curated estimates, not a
  live data feed; swap in a real maps/schools API here when ready.

**AI Property Summary** — every listing at `/listings/[id]` gets a full
structured summary: who it's best for, pros, drawbacks, investment
potential, lifestyle fit, nearby amenities, estimated commute, and
suggested next steps. This one *is* LLM-generated when a key is present
(`app/api/property-summary/route.ts`, same `ANTHROPIC_API_KEY` as the
chat assistant above), with a local deterministic generator
(`lib/propertySummary.ts`) as the automatic fallback — so the page is
always fully populated, and it's obvious in the UI which version
generated it ("Generated by AI" vs. "Local estimate").

Only `properties` and `rentalProperties` (the two clean, well-typed
datasets in `lib/data.ts`) are wired into matching and detail pages —
`homepageFeatured` (the homepage teaser strip) uses looser string
formatting for price/beds and isn't included, to avoid feeding malformed
data into the scoring math.

## Extending the site

The homepage is intentionally split into one component per section so new
pages and features can reuse pieces independently:

- **MLS/IDX integration** — replace the static array in `lib/data.ts`
  (`properties`) with data mapped from your feed provider. The
  `MLSFeedConfig` type in `lib/types.ts` is a starting shape for
  connection/sync state; `FeaturedProperties.tsx` already reads from a
  single `properties` source so swapping the data source requires no
  template changes.
- **Neighbourhood landing pages** — `lib/data.ts` already models each
  community as a `Community` object with a `slug`; add
  `app/communities/[slug]/page.tsx` to generate a page per neighbourhood
  from that same data.
- **AI chat assistant** — add as a fixed-position client component in
  `app/layout.tsx` so it's available site-wide.
- **Property alerts / saved search** — hook into the search form in
  `Hero.tsx`; the form is currently a placeholder with no submit handler.
- **Market reports & home valuation tools** — `HomeValueSection.tsx` and
  the lead form in `SellingSection.tsx` are wired for a form submit handler
  to be added once a backend/CRM endpoint exists.

## Notes

- All property, pricing, and testimonial content is placeholder data for
  design purposes only — see the legal disclaimer in the footer and in
  `FeaturedProperties.tsx`.
- Images are pulled from Unsplash by URL for prototyping. Replace with
  licensed brand photography before launch, and consider moving them into
  `next/image` with local assets for production performance.
- This sandbox has no network access, so dependencies have not been
  installed or build-verified here — run `npm install && npm run build`
  locally to confirm before deploying.
