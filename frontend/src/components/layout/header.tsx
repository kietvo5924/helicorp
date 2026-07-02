"use client";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-foreground/10 shadow-sm py-4' : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white text-xl">H</div>
          <span className="text-xl font-bold tracking-widest text-foreground">HELICORP</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          <a href="#products" className="hover:text-primary transition-colors">Products</a>
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#about" className="hover:text-primary transition-colors">About Us</a>
        </nav>

        <div className="flex items-center gap-4">
          {mounted && (
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 hover:bg-foreground/10 rounded-full transition-colors text-foreground" aria-label="Toggle Theme">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <button className="md:hidden p-2 text-foreground" aria-label="Open Menu"><Menu className="w-6 h-6" /></button>
        </div>
      </div>
    </motion.header>
  );
}
