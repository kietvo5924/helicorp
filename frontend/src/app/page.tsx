"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ParallaxHero } from "@/components/features/parallax-hero";
import { CartDrawer } from "@/components/features/cart-drawer";
import { ChatbotFAB } from "@/components/features/chatbot-fab";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col items-center overflow-x-hidden">
      
      {/* Theme Toggle Button - Absolute positioned for convenience */}
      {mounted && (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="fixed top-6 left-6 z-50 p-3 bg-white/10 dark:bg-black/40 backdrop-blur-md border border-foreground/20 rounded-full shadow-lg hover:scale-105 transition-transform"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      )}

      {/* Main Scrollytelling Hero */}
      <ParallaxHero />

      {/* Second Section for scroll testing */}
      <section className="min-h-screen w-full flex items-center justify-center p-8 bg-foreground/5">
        <div className="max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Discover the Difference</h2>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Keep scrolling down to experience the seamless design transitions, or interact with the floating cart and chatbot assistants. This layout ensures maximum engagement through premium interactive elements.
          </p>
        </div>
      </section>

      {/* Floating interactive components */}
      <CartDrawer />
      <ChatbotFAB />
      
    </main>
  );
}
