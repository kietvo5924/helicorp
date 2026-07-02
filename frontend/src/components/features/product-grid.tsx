"use client";

import { useEffect, useState } from "react";
import { GlassPanel } from "../ui/glass-panel";
import { useAppStore, Product } from "@/store/useAppStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useAppStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/products`);
        const json = await res.json();
        if (json.status === "success") {
          setProducts(json.data);
        }
      } catch (e) {
        console.error("Failed to fetch products", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section id="products" className="py-24 w-full container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Premium Ecosystem</h2>
        <p className="text-foreground/60 max-w-2xl mx-auto">Discover our latest innovations designed to push the boundaries of technology and design.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
            >
              <GlassPanel className="h-full flex flex-col overflow-hidden group">
                <div className="h-72 overflow-hidden relative bg-foreground/5">
                  <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
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
                      className="px-6 py-3 bg-foreground text-background font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
