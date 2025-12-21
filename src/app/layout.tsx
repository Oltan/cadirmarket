import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Çadır Market | Branda ve Çadır Sistemleri",
    description: "Kaliteli malzeme, uzman işçilik. Her türlü hava koşuluna dayanıklı çadır ve branda çözümleri.",
    url: 'https://cadirmarket.com',
    siteName: 'Çadır Market',
    locale: 'tr_TR',
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
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
