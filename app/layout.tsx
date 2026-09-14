import type { Metadata } from "next";
import { Poppins, Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import PropertyAssistant from "@/components/chat/PropertyAssistant";
import { MatchPreferencesProvider } from "@/components/match/MatchContext";
import { ContactModalProvider } from "@/components/layout/ContactModalContext";
import ContactModal from "@/components/layout/ContactModal";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Dedicated to the "West Properties" logo wordmark only — the rest of the
// site's headings stay on Poppins.
const playfairLogo = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-logo",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.westproperties.ca"),
  title: {
    default: "West Properties | Mississauga, Oakville & Milton Real Estate",
    template: "%s | West Properties",
  },
  description:
    "West Properties is a luxury real estate brokerage serving Mississauga, Oakville, and Milton, Ontario. Buy, sell, and discover home value with local market experts.",
  keywords: [
    "Mississauga real estate",
    "Oakville real estate",
    "Milton real estate",
    "GTA luxury homes",
    "West Properties",
  ],
  openGraph: {
    title: "West Properties | Mississauga, Oakville & Milton Real Estate",
    description:
      "Luxury real estate expertise across Mississauga, Oakville, and Milton. Find your perfect home or sell with confidence.",
    url: "https://www.westproperties.ca",
    siteName: "West Properties",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "West Properties | Mississauga, Oakville & Milton Real Estate",
    description:
      "Luxury real estate expertise across Mississauga, Oakville, and Milton.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${poppins.variable} ${playfairLogo.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <ContactModalProvider>
          <MatchPreferencesProvider>
            {children}
            <PropertyAssistant />
          </MatchPreferencesProvider>
          <ContactModal />
        </ContactModalProvider>
      </body>
    </html>
  );
}
