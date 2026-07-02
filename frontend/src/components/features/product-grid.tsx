"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { GlassPanel } from "../ui/glass-panel";
import { useAppStore, Product } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Search, Filter } from "lucide-react";

export function ProductGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");
  
  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 6;

  const { openProductModal, favorites, toggleFavorite } = useAppStore();

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

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    products.forEach(p => {
      if (p.tag) tags.add(p.tag);
    });
    return ["All", ...Array.from(tags)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = activeTag === "All" || p.tag === activeTag;
      return matchesSearch && matchesTag;
    });
  }, [products, searchQuery, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Reset page when search or tag changes, but not on initial mount
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      setCurrentPage(1);
    } else {
      isMounted.current = true;
    }
  }, [searchQuery, activeTag]);

  // Sync page to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    } else {
      params.delete("page");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [currentPage, pathname, router, searchParams]);

  return (
    <section id="products" className="py-12 w-full container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Premium Ecosystem</h2>
        <p className="text-foreground/60 max-w-2xl mx-auto mb-8">Discover our latest innovations designed to push the boundaries of technology and design.</p>
        
        {/* Filters and Search */}
        <div className="max-w-3xl mx-auto mb-12 flex flex-col items-center gap-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-foreground/5 border border-foreground/10 rounded-full focus:outline-none focus:border-primary transition-colors text-foreground"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <div className="flex items-center gap-2 mr-2 text-foreground/50">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-bold">Filter:</span>
            </div>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTag === tag 
                    ? 'bg-primary text-white shadow-[0_0_10px_rgba(10,132,255,0.4)]' 
                    : 'bg-foreground/5 hover:bg-foreground/10 text-foreground/70'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 min-h-[800px] items-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-foreground/50">No products found matching your search.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {currentProducts.map((product, idx) => (
                  <motion.div 
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GlassPanel className="h-full flex flex-col overflow-hidden group relative">
                      {/* Heart Button */}
                      <button 
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-4 right-4 z-20 p-2 bg-background/50 backdrop-blur-md rounded-full hover:bg-background/80 transition-colors"
                        aria-label="Toggle Favorite"
                      >
                        <Heart className={`w-5 h-5 transition-colors ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
                      </button>

                      {/* Tag Badge */}
                      {product.tag && (
                        <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-lg">
                          {product.tag}
                        </div>
                      )}

                      <div className="h-64 overflow-hidden relative bg-foreground/5">
                        <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="p-8 flex flex-col flex-1">
                        <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                        <p className="text-foreground/70 mb-8 flex-1 text-sm leading-relaxed">{product.description}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-2xl font-bold text-primary">${product.price.toLocaleString()}</span>
                          <button 
                            onClick={() => openProductModal(product)}
                            className="px-6 py-3 bg-foreground text-background font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-lg"
                            aria-label={`View options for ${product.name}`}
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-foreground/10 rounded-full disabled:opacity-50 hover:bg-foreground/20 transition-colors"
              >
                Previous
              </button>
              <span className="font-medium text-foreground/70">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-foreground/10 rounded-full disabled:opacity-50 hover:bg-foreground/20 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
