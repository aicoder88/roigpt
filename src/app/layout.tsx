import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StructuredData } from "@/components/StructuredData";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { isDevelopment } from "@/lib/env";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ROIGPT - AI-Powered Marketing That Delivers Real ROI",
    template: "%s | ROIGPT"
  },
  description: "Transform your digital presence with cutting-edge AI solutions that boost conversions, optimize SEO, and create compelling campaigns that convert. Proven 340% ROI increase.",
  keywords: ["AI marketing", "ROI optimization", "SEO services", "campaign optimization", "NextJS websites", "conversion optimization", "digital marketing"],
  authors: [{ name: "ROIGPT Team" }],
  creator: "ROIGPT",
  publisher: "ROIGPT",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://roigpt.com'), // Update with your actual domain
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'fr-FR': '/fr-FR',
    },
  },
  openGraph: {
    title: "ROIGPT - AI-Powered Marketing That Delivers Real ROI",
    description: "Transform your digital presence with cutting-edge AI solutions that boost conversions, optimize SEO, and create compelling campaigns that convert.",
    url: 'https://roigpt.com',
    siteName: 'ROIGPT',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ROIGPT - AI-Powered Marketing That Delivers Real ROI",
    description: "Transform your digital presence with cutting-edge AI solutions that boost conversions, optimize SEO, and create compelling campaigns that convert.",
    creator: '@roigpt',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      {/* <Script src="https://api.tempo.build/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" /> [deprecated] */}
      <body className={inter.className}>
        <ThemeProvider>
          <AnalyticsProvider
            showConsentBanner={true}
            consentBannerVariant="detailed"
            enablePageTracking={true}
          >
            <ErrorBoundary showError={isDevelopment()}>
              {children}
            </ErrorBoundary>
          </AnalyticsProvider>
        </ThemeProvider>
        <TempoInit />
      </body>
    </html>
  );
}
