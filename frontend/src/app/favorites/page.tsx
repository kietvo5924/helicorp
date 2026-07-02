"use client";

import { useEffect, useState } from "react";
import { useAppStore, Product } from "@/store/useAppStore";
import { GlassPanel } from "@/components/ui/glass-panel";
import { ShoppingCart, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function FavoritesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { favorites, toggleFavorite, addToCart } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
        setLoading(false);
      })
  }, []);

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Your Wishlist</h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            {mounted && favoriteProducts.length > 0 
              ? "Your curated collection of premium tech." 
              : "You haven't saved any products yet."}
          </p>
        </div>

        {!mounted || loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-20">
                <Link href="/products" className="inline-flex px-8 py-4 bg-foreground text-background font-bold rounded-full hover:scale-105 transition-transform">
                  Explore Ecosystem
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {favoriteProducts.map((product) => (
                    <motion.div 
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <GlassPanel className="h-full flex flex-col overflow-hidden group relative">
                        <button 
                          onClick={() => toggleFavorite(product.id)}
                          className="absolute top-4 right-4 z-20 p-2 bg-background/50 backdrop-blur-md rounded-full hover:bg-background/80 transition-colors"
                          aria-label="Remove Favorite"
                        >
                          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                        </button>

                        <div className="h-64 overflow-hidden relative bg-foreground/5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-8 flex flex-col flex-1">
                          <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                          <p className="text-foreground/70 mb-8 flex-1 text-sm leading-relaxed">{product.description}</p>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-2xl font-bold text-primary">${product.price.toLocaleString()}</span>
                            <button 
                              onClick={() => addToCart(product)}
                              className="px-6 py-3 bg-foreground text-background font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-lg"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </GlassPanel>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
