import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://greysoninstitute.com"),

  title: {
    default: "Greyson Institute | Real Estate Education",
    template: "%s | Greyson Institute",
  },

  description:
    "Clear, modern real estate education guidance for licensing, post-license, continuing education, broker education, and exam preparation.",

  icons: {
    icon: "/brand/greyson-icon-color.png",
    shortcut: "/brand/greyson-icon-color.png",
    apple: "/brand/greyson-icon-color.png",
  },

  openGraph: {
    type: "website",
    url: "https://greysoninstitute.com",
    siteName: "Greyson Institute",
    title: "Greyson Institute | Real Estate Education",
    description:
      "A clearer path through real estate education, from first license to what comes next.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Greyson Institute — Real Estate Education",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Greyson Institute | Real Estate Education",
    description:
      "A clearer path through real estate education, from first license to what comes next.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>

        <SiteHeader />

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <SiteFooter />

        <AnalyticsConsent />
      </body>
    </html>
  );
}
