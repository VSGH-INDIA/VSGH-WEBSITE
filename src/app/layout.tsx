import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { resolveSiteSettings } from "@/content/resolve";
import { publicRobotsMetadata } from "@/lib/indexing";
import { SITE_DESCRIPTION, SITE_ORIGIN, SITE_TITLE } from "@/lib/site";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ibm-mono",
  display: "swap",
  preload: false,
});

// The Vercel packages request platform-served scripts. Rendering them only on
// Vercel keeps local and self-hosted verification free of false 404 errors.
const isVercelRuntime = process.env.VERCEL === "1";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080c14",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await resolveSiteSettings();
  const google =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    settings.googleSiteVerification;
  const bing =
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ||
    settings.bingSiteVerification;
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: {
      default: SITE_TITLE,
      template: `%s · ${settings.titleSuffix}`,
    },
    description: settings.defaultDescription || SITE_DESCRIPTION,
    openGraph: {
      type: "website",
      siteName: settings.shortName,
      locale: "en",
    },
    twitter: { card: "summary" },
    robots: publicRobotsMetadata(),
    verification: {
      google: google || undefined,
      other: bing ? { "msvalidate.01": bing } : undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <ScrollReveal />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[var(--vsgh-z-skip)] focus:bg-inverse focus:px-4 focus:py-2 focus:text-inverse-fg"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        {isVercelRuntime ? <Analytics /> : null}
        {isVercelRuntime ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
