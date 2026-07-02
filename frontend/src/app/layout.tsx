import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/features/cart-drawer";
import { ChatbotFAB } from "@/components/features/chatbot-fab";
import { ProductModal } from "@/components/features/product-modal";
import { BehaviorTracker } from "@/components/features/behavior-tracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Helicorp | The Future of Premium Tech",
    template: "%s | Helicorp",
  },
  description: "Discover the ultimate in technology and design. Helicorp creates high-end consumer electronics built with uncompromising quality and engineered for visionaries.",
  keywords: ["Helicorp", "Premium Electronics", "Tech Gadgets", "Vision Pro", "Quantum Core", "Next Generation Tech"],
  authors: [{ name: "Helicorp Inc." }],
  openGraph: {
    title: "Helicorp | The Future of Premium Tech",
    description: "Discover the ultimate in technology and design. Helicorp creates high-end consumer electronics.",
    url: "https://helicorp.com",
    siteName: "Helicorp",
    images: [
      {
        url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Helicorp Premium Tech",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helicorp | The Future of Premium Tech",
    description: "Discover the ultimate in technology and design.",
    images: ["https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&h=630&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <CartDrawer />
          <ChatbotFAB />
          <ProductModal />
          <BehaviorTracker />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
