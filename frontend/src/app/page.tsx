"use client";

import { useTheme } from "next-themes";
import { ParallaxHero } from "@/components/features/parallax-hero";
import { CartDrawer } from "@/components/features/cart-drawer";
import { ChatbotFAB } from "@/components/features/chatbot-fab";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col items-center overflow-x-hidden">
      
      {/* Main Scrollytelling Hero */}
      <ParallaxHero />

      {/* Floating interactive components */}
      <CartDrawer />
      <ChatbotFAB />
      
    </main>
  );
}
