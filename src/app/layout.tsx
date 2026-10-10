import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE } from '@/lib/site';
import { siteGraph } from '@/lib/schema';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL if the site is served from a different domain.
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: 'technology',
  alternates: { canonical: '/' },
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: SITE.legalName,
    locale: 'en_IN',
    url: '/',
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
  },
  other: {
    'geo.region': 'IN-KA',
    'geo.placename': 'Belagavi',
  },
  // Paste Search Console / Bing tokens here once the domain is verified.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: '#1D7CE0',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${outfit.variable} font-sans antialiased`} suppressHydrationWarning>
        <JsonLd data={siteGraph()} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
