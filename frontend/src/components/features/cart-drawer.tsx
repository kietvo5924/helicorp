"use client";

import { useAppStore } from "@/store/useAppStore";
import { GlassPanel } from "../ui/glass-panel";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { isCartOpen, toggleCart, cartItemCount, cartItems, cartTotal, removeFromCart } = useAppStore();
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
                
                <div className="flex-1 p-6 flex flex-col text-foreground overflow-y-auto">
                  {cartItemCount === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-foreground/50">
                      <p>Your cart is empty.</p>
                    </div>
                  ) : (
                    <div className="w-full space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-foreground/5 border border-foreground/10 p-4 rounded-xl text-foreground text-sm">
                          <div className="flex-1">
                            <span className="block font-bold mb-1">{item.name}</span>
                            <span className="text-foreground/70 font-medium">Qty: {item.quantity}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-primary">${(item.price * item.quantity).toLocaleString()}</span>
                            <button onClick={() => removeFromCart(item.id)} className="p-2 hover:bg-foreground/10 rounded-full transition-colors text-red-500" aria-label="Remove item">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
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
  );
}
