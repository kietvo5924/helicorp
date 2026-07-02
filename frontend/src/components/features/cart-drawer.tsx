"use client";

import { useAppStore } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { isCartOpen, toggleCart, cartItemCount, cartItems, cartTotal, removeFromCart, toggleCartItemSelection } = useAppStore();
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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-foreground/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="h-full flex flex-col overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-foreground/10">
                  <h2 className="text-2xl font-bold text-foreground">Your Cart</h2>
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
                        <div key={item.id} className="flex justify-between items-center bg-foreground/5 border border-foreground/10 p-4 rounded-xl text-foreground text-sm hover:bg-foreground/10 transition-colors">
                          <div className="flex items-center gap-4">
                            {/* Item Selection Checkbox */}
                            <div className="relative flex items-center justify-center">
                              <input 
                                type="checkbox" 
                                checked={item.selected !== false}
                                onChange={() => toggleCartItemSelection(item.id)}
                                aria-label={`Select ${item.name} for checkout`}
                                className="peer appearance-none w-5 h-5 border-2 border-foreground/20 rounded bg-background checked:bg-primary checked:border-primary transition-colors cursor-pointer" 
                              />
                              <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 14 10" fill="none">
                                <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            
                            <div className="flex-1">
                              <span className="block font-bold mb-1 text-base">{item.name}</span>
                              {item.variant && <span className="block text-xs font-medium text-primary mb-1">{item.variant}</span>}
                              <span className="text-foreground/70 font-medium">Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-primary text-lg">${(item.price * item.quantity).toLocaleString()}</span>
                            <button onClick={() => removeFromCart(item.id)} className="p-2 hover:bg-red-500/20 rounded-full transition-colors text-red-500" aria-label="Remove item">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Checkout Footer */}
                {cartItemCount > 0 && (
                  <div className="p-6 border-t border-foreground/10 bg-foreground/5 mt-auto">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-bold text-foreground/70">Selected Total</span>
                      <span className="text-3xl font-black text-primary">${cartTotal.toLocaleString()}</span>
                    </div>

                    <button 
                      onClick={handleCheckout}
                      disabled={loading || success}
                      className="w-full py-4 bg-primary text-white font-bold rounded-xl text-lg hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(10,132,255,0.4)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 disabled:shadow-none"
                    >
                      {loading ? "Processing..." : success ? "Order Placed" : "Checkout Now"}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
    </AnimatePresence>
  );
}
