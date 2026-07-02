"use client";

import { useEffect, useState } from "react";
import { Product, useAppStore } from "@/store/useAppStore";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Shield, Truck, RotateCcw, ChevronRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { openProductModal, toggleFavorite, favorites } = useAppStore();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        const res = await fetch(`${API_URL}/api/products/${id}`);
        const json = await res.json();
        if (json.status === "success") {
          setProduct(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-foreground/70 mb-8">The product you are looking for does not exist or has been removed.</p>
          <Link href="/products" className="inline-flex px-8 py-3 bg-primary text-white font-bold rounded-full hover:scale-105 transition-transform">
            Return to Products
          </Link>
        </div>
      </main>
    );
  }

  const isFavorite = favorites.includes(product.id);

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-24 overflow-hidden relative">
      {/* Background blurs */}
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-foreground/60 mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-32"
          >
            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-foreground/5 border border-foreground/10 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              {product.tag && (
                <div className="absolute top-6 left-6 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full text-sm font-bold text-primary shadow-lg border border-primary/20">
                  {product.tag}
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-2xl bg-foreground/5 overflow-hidden border border-foreground/10 opacity-70 hover:opacity-100 cursor-pointer transition-opacity group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">{product.name}</h1>
            <p className="text-3xl font-bold text-primary mb-8">${product.price.toLocaleString()}</p>
            
            <p className="text-xl text-foreground/70 leading-relaxed mb-12">
              {product.description} Built with uncompromising quality and engineered for the future, this is the ultimate tool for visionaries.
            </p>

            <div className="flex items-center gap-4 mb-12">
              <button 
                onClick={() => openProductModal(product)}
                className="flex-1 py-5 bg-foreground text-background font-bold text-xl rounded-full hover:scale-105 transition-all shadow-xl hover:shadow-[0_0_30px_rgba(var(--foreground),0.3)] flex items-center justify-center gap-2"
              >
                Buy Now
              </button>
              <button 
                onClick={() => toggleFavorite(product.id)}
                className={`p-5 rounded-full border-2 transition-all ${isFavorite ? 'bg-red-500 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'border-foreground/10 hover:border-red-500 hover:text-red-500'}`}
                aria-label="Toggle Favorite"
              >
                <Heart className={`w-7 h-7 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            <GlassPanel className="p-8 space-y-6">
              <div className="flex items-center gap-4 text-foreground/80">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-foreground">3-Year Helicorp Warranty</div>
                  <p className="text-sm">Complete coverage for any hardware defects.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-foreground/80">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-foreground">Free Global Shipping</div>
                  <p className="text-sm">Delivery within 2-4 business days worldwide.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-foreground/80">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-foreground">14-Day Returns</div>
                  <p className="text-sm">No questions asked return policy.</p>
                </div>
              </div>
            </GlassPanel>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-4 border-b border-foreground/10">
                  <span className="text-foreground/70">Processor</span>
                  <span className="font-bold">Quantum Core 9 (64-core)</span>
                </div>
                <div className="flex justify-between py-4 border-b border-foreground/10">
                  <span className="text-foreground/70">Memory</span>
                  <span className="font-bold">128GB Unified Neural RAM</span>
                </div>
                <div className="flex justify-between py-4 border-b border-foreground/10">
                  <span className="text-foreground/70">Storage</span>
                  <span className="font-bold">4TB Crystal-State Drive</span>
                </div>
                <div className="flex justify-between py-4 border-b border-foreground/10">
                  <span className="text-foreground/70">Connectivity</span>
                  <span className="font-bold">Wi-Fi 8, 6G Cellular, Thunderbolt 6</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </main>
  );
}
