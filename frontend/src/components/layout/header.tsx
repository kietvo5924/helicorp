"use client";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleCart, cartItemCount, favorites } = useAppStore();
  const pathname = usePathname();

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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-foreground/10 shadow-sm py-4' : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white text-xl group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(10,132,255,0.4)]">H</div>
          <span className="text-xl font-bold tracking-widest text-foreground">HELICORP</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-foreground/80">
          <Link href="/products" className={`transition-colors ${pathname === '/products' ? 'text-primary' : 'hover:text-primary'}`}>Products</Link>
          <Link href="/features" className={`transition-colors ${pathname === '/features' ? 'text-primary' : 'hover:text-primary'}`}>Features</Link>
          <Link href="/about" className={`transition-colors ${pathname === '/about' ? 'text-primary' : 'hover:text-primary'}`}>About Us</Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Favorites Icon (Hidden on mobile) */}
          <Link href="/favorites" className="relative hidden md:block p-2 hover:bg-foreground/10 rounded-full transition-colors text-foreground" aria-label="View Favorites">
            <Heart className="w-5 h-5" />
            {mounted && favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <button onClick={toggleCart} className="relative p-2 hover:bg-foreground/10 rounded-full transition-colors text-foreground" aria-label="Open Cart">
            <ShoppingCart className="w-5 h-5" />
            {mounted && cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-[0_0_10px_rgba(10,132,255,0.5)]">
                {cartItemCount}
              </span>
            )}
          </button>
          
          {mounted && (
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 hover:bg-foreground/10 rounded-full transition-colors text-foreground" aria-label="Toggle Theme">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-foreground" aria-label="Open Menu"><Menu className="w-6 h-6" /></button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-foreground/10 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-6">
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className={`text-lg font-bold ${pathname === '/products' ? 'text-primary' : 'text-foreground'}`}>Products</Link>
              <Link href="/features" onClick={() => setMobileMenuOpen(false)} className={`text-lg font-bold ${pathname === '/features' ? 'text-primary' : 'text-foreground'}`}>Features</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={`text-lg font-bold ${pathname === '/about' ? 'text-primary' : 'text-foreground'}`}>About Us</Link>
              
              <div className="h-px w-full bg-foreground/10 my-2"></div>
              
              <Link href="/favorites" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-lg font-bold text-foreground">
                <span>My Wishlist</span>
                {mounted && favorites.length > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2.5 py-1 rounded-full">{favorites.length}</span>
                )}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
