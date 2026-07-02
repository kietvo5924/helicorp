"use client";

import { useAppStore } from "@/store/useAppStore";
import { GlassPanel } from "../ui/glass-panel";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { isCartOpen, toggleCart, cartItemCount } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/webhook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "checkout",
          data: { items_count: cartItemCount, total: 999 }
        })
      });
      if (res.ok) setSuccess(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleCart}
        className="fixed top-6 right-6 z-50 p-3 bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:scale-105 transition-transform text-foreground"
        aria-label="Open cart"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
            {cartItemCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleCart}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm z-50 p-4"
            >
              <GlassPanel className="h-full flex flex-col">
                <div className="p-4 border-b border-foreground/10 flex justify-between items-center text-foreground">
                  <h2 className="text-xl font-bold">Your Cart</h2>
                  <button onClick={toggleCart} className="p-1 hover:bg-foreground/10 rounded-full transition-colors" aria-label="Close cart">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-foreground/60">
                  {cartItemCount === 0 ? (
                    <p>Your cart is empty.</p>
                  ) : (
                    <div className="w-full space-y-4">
                      <p className="text-center text-foreground">You have {cartItemCount} items ready.</p>
                      <div className="flex justify-between items-center bg-foreground/5 p-4 rounded-lg text-foreground">
                        <span>Premium Product</span>
                        <span className="font-bold">$999</span>
                      </div>
                    </div>
                  )}
                </div>

                {cartItemCount > 0 && (
                  <div className="p-4 border-t border-foreground/10">
                    <button 
                      onClick={handleCheckout}
                      disabled={loading || success}
                      className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-70"
                    >
                      {loading ? "Processing..." : success ? "Order Placed" : "Checkout"}
                    </button>
                  </div>
                )}
              </GlassPanel>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
