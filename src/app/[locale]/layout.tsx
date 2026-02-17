import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://cadirmarket.com'),
  title: {
    default: "Çadır Market | Branda, Çadır ve Kapsül Çözümleri",
    template: "%s | Çadır Market"
  },
  description: "En kaliteli çadır, branda, şeffaf kaplama ve kapsül sistemleri. Endüstriyel ve bireysel çözümler için doğru adres.",
  keywords: ["çadır", "branda", "kapsül", "şeffaf branda", "kış bahçesi", "ostim çadır", "ankara branda", "su geçirmez branda"],
  authors: [{ name: "Çadır Market" }],
  creator: "Çadır Market",
  publisher: "Çadır Market",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: "Çadır Market | Branda ve Çadır Sistemleri",
    description: "Kaliteli malzeme, uzman işçilik. Her türlü hava koşuluna dayanıklı çadır ve branda çözümleri.",
    url: 'https://cadirmarket.com',
    siteName: 'Çadır Market',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Çadır Market",
    description: "Branda ve çadır çözümleri.",
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'tr' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased flex flex-col min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
