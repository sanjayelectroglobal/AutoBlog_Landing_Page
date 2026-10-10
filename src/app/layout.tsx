import type { Metadata, Viewport } from 'next';
import './globals.css';

/**
 * =====================================================================================
 * AUTOBLOG ROOT METADATA SPECIFICATION
 * =====================================================================================
 * Defines the default SEO title, meta descriptions, and open-graph properties
 * for search engines and social media platform indexing.
 */
export const metadata: Metadata = {
  title: 'AutoBlog - Autonomous AI Blog Automation & Programmatic SEO Engine',
  description:
    'Turn search intent and product catalogs into compounding organic Google rankings on autopilot. AutoBlog discovers keywords, drafts structured SEO articles, and publishes directly to WordPress, Shopify, and Webflow.',
  keywords: [
    'AI blogging',
    'programmatic SEO',
    'automated content creation',
    'autonomous blog engine',
    'Shopify SEO automation',
    'WordPress auto publisher',
    'topical authority clusters',
  ],
  authors: [{ name: 'AutoBlog Engineering' }],
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * =====================================================================================
 * VIEWPORT CONFIGURATION
 * =====================================================================================
 * Ensures responsive scaling across mobile, tablet, and high-DPI desktop viewports.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/**
 * =====================================================================================
 * ROOT APPLICATION LAYOUT (Next.js 14 App Router)
 * =====================================================================================
 * The outermost HTML shell wrapping every route in the application:
 * 1. Configures the HTML document language.
 * 2. Injects the official AutoBlog favicon into the document head.
 * 3. Applies the global CSS design system rules (`./globals.css`).
 * 4. Mounts page children within the standard document body.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Official AutoBlog Brand Favicon */}
        <link rel="icon" href="/images/autoblog-official-logo.jpg" />
        {/* Modern Typography Fallbacks */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
