import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatbot } from "@/components/AIChatbot";
import { FloatingWidgets } from "@/components/FloatingWidgets";
import { CookieBanner } from "@/components/CookieBanner";
import { PageTransition } from "@/components/PageTransition";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jeshurun.ie"),
  title: {
    default: "Jeshurun Technologies",
    template: "%s | Jeshurun Technologies",
  },
  description: "Expert IT consulting, cloud solutions, test management, and enterprise software services for global organizations across Ireland and Europe.",
  keywords: ["IT consulting", "cloud solutions", "enterprise software", "test management", "infrastructure", "Dublin", "Ireland", "technology"],
  authors: [{ name: "Jeshurun Technologies" }],
  creator: "Jeshurun Technologies",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://www.jeshurun.ie",
    siteName: "Jeshurun Technologies",
    title: "Jeshurun Technologies",
    description: "Expert IT consulting, cloud solutions, test management, and enterprise software services for global organizations across Ireland and Europe.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jeshurun Technologies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeshurun Technologies",
    description: "Expert IT consulting, cloud solutions, test management, and enterprise software services.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://www.jeshurun.ie" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${inter.variable} ${playfair.variable} antialiased min-h-dvh flex flex-col bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Jeshurun Technologies",
                url: "https://www.jeshurun.ie",
                logo: "https://www.jeshurun.ie/logo.png",
                contactPoint: { "@type": "ContactPoint", contactType: "customer support", areaServed: "IE" },
                sameAs: ["https://www.linkedin.com/company/jeshurun-technologies"],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Jeshurun Technologies",
                url: "https://www.jeshurun.ie",
                potentialAction: { "@type": "SearchAction", target: "https://www.jeshurun.ie/search?q={search_term_string}", "query-input": "required name=search_term_string" },
              },
            ]),
          }}
        />
        <Providers>
          <div className="grain-overlay" />
          <Navbar />
          <main className="flex-1 w-full overflow-x-hidden">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <AIChatbot />
          <FloatingWidgets />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
