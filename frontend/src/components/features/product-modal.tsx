"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";

const COLORS = ["Space Grey", "Silver", "Midnight Blue", "Quantum White"];

export function ProductModal() {
  const { isProductModalOpen, closeProductModal, selectedProduct, addToCart } = useAppStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  useEffect(() => {
    if (isProductModalOpen) {
      setQuantity(1);
      setSelectedColor(COLORS[0]);
    }
  }, [isProductModalOpen]);

  if (!selectedProduct) return null;

  const handleConfirm = () => {
    addToCart(selectedProduct, quantity, selectedColor);
    closeProductModal();
  };

  return (
    <AnimatePresence>
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProductModal}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-foreground/5 backdrop-blur-xl border border-foreground/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button 
              onClick={closeProductModal}
              className="absolute top-4 right-4 p-2 bg-background/50 rounded-full hover:bg-background transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image side */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-black/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedProduct.image_url} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>

            {/* Content side */}
            <div className="w-full md:w-1/2 p-8 flex flex-col">
              <h2 className="text-3xl font-bold mb-2">{selectedProduct.name}</h2>
              <span className="text-2xl font-black text-primary mb-6">${selectedProduct.price.toLocaleString()}</span>

              <div className="space-y-6 flex-1">
                {/* Options / Variants */}
                <div>
                  <label className="block text-sm font-bold text-foreground/70 mb-3">Select Color</label>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                          selectedColor === color 
                            ? 'border-primary bg-primary/10 text-primary' 
                            : 'border-foreground/20 hover:border-foreground/50 text-foreground/70'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-bold text-foreground/70 mb-3">Quantity</label>
                  <div className="flex items-center gap-4 bg-background/50 w-fit rounded-full p-1 border border-foreground/10">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-foreground/10 rounded-full transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-foreground/10 rounded-full transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button 
                onClick={handleConfirm}
                className="mt-8 w-full py-4 bg-primary text-white font-bold rounded-xl text-lg hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(10,132,255,0.4)] flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart - ${(selectedProduct.price * quantity).toLocaleString()}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
