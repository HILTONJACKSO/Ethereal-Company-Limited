import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


// Load Google Fonts
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Ethereal Company Limited | Infrastructure & Logistics Excellence in Liberia & Sierra Leone',
    template: '%s | Ethereal Company Limited'
  },
  description: 'Ethereal Company Limited is a leading African infrastructure, construction, logistics management, general procurement, civil engineering, and mining consultancy firm operating in Liberia and Sierra Leone.',
  keywords: [
    'Construction company in Liberia',
    'Logistics company in Liberia',
    'Mining consultancy Africa',
    'Civil engineering Liberia',
    'Road construction company Liberia',
    'Infrastructure company Africa',
    'Procurement company Liberia',
    'Sierra Leone logistics',
    'Liberia procurement services'
  ],
  authors: [{ name: 'Ethereal Company Limited' }],
  creator: 'Ethereal IT Development Team',
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://etherealcompanylimited.com',
    title: 'Ethereal Company Limited | Multi-Sector Infrastructure & Logistics',
    description: 'Delivering world-class construction, procurement, mining, logistics, and engineering solutions across Africa.',
    siteName: 'Ethereal Company Limited',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ethereal Company Limited | Infrastructure & Logistics',
    description: 'Providing premium construction, procurement, logistics, and engineering services in Liberia and Sierra Leone.',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`} style={{ scrollBehavior: 'smooth' }} suppressHydrationWarning>
      <head>
        {/* Structured Schema Markup (JSON-LD) for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Corporation',
              'name': 'Ethereal Company Limited',
              'url': 'https://etherealcompanylimited.com',
              'logo': 'https://etherealcompanylimited.com/logo.png',
              'contactPoint': {
                '@type': 'ContactPoint',
                'telephone': '+231-77-555-5545',
                'contactType': 'customer service',
                'email': 'wiston@etherealcompanylimited.com',
                'areaServed': ['LR', 'SL'],
                'availableLanguage': 'en'
              },
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': '19th Street, Sinkor, Blue Diamond Building, Off Tubman Boulevard',
                'addressLocality': 'Monrovia',
                'addressCountry': 'LR'
              },
              'sameAs': [
                'https://www.facebook.com/etherealcompany',
                'https://www.linkedin.com/company/ethereal-company-limited'
              ]
            })
          }}
        />
      </head>
      <body>
        <Providers>
          <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
              {children}
            </main>
            <Footer />

          </div>
        </Providers>
      </body>
    </html>
  );
}
