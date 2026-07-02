"use client";

import { useTheme } from "next-themes";
import { ParallaxHero } from "@/components/features/parallax-hero";
import { ProductGrid } from "@/components/features/product-grid";
import { CartDrawer } from "@/components/features/cart-drawer";
import { ChatbotFAB } from "@/components/features/chatbot-fab";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col items-center overflow-x-hidden">
      
      {/* Main Scrollytelling Hero */}
      <ParallaxHero />

      {/* Dynamic Products Fetched from API */}
      <ProductGrid />

      {/* Features Section */}
      <section id="features" className="min-h-screen w-full flex items-center justify-center p-8 bg-foreground/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-4xl text-center relative z-10">
          <h2 className="text-5xl font-bold mb-8">Discover the Difference</h2>
          <p className="text-xl text-foreground/70 leading-relaxed mb-12">
            Experience the seamless design transitions, or interact with the floating cart and chatbot assistants. This layout ensures maximum engagement through premium interactive elements.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-background/60 backdrop-blur-sm p-8 rounded-2xl border border-foreground/10 shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-primary">01. Performance</h3>
              <p className="text-foreground/70">Engineered with Next.js Turbopack and optimized Framer Motion animations for a flawless 60fps experience.</p>
            </div>
            <div className="bg-background/60 backdrop-blur-sm p-8 rounded-2xl border border-foreground/10 shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-primary">02. Architecture</h3>
              <p className="text-foreground/70">Decoupled Fullstack design with a robust Golang REST API backend, persisting real-time data in SQLite.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating interactive components */}
      <CartDrawer />
      <ChatbotFAB />
      
    </main>
  );
}
