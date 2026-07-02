"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { GlassPanel } from "../ui/glass-panel";

export function ChatbotFAB() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80"
          >
            <GlassPanel className="overflow-hidden shadow-2xl">
              <div className="bg-primary p-4 text-white flex justify-between items-center">
                <div className="font-bold">Support Assistant</div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors" aria-label="Close chat">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="h-64 p-4 flex flex-col gap-3 overflow-y-auto bg-background/50">
                <div className="bg-foreground/10 text-foreground p-3 rounded-lg rounded-tl-none self-start max-w-[80%] text-sm">
                  Hello! How can I help you today?
                </div>
              </div>
              <div className="p-3 border-t border-foreground/10 flex gap-2 bg-background/80">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 bg-transparent border border-foreground/20 rounded-full px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                />
                <button className="p-2 bg-primary text-white rounded-full hover:scale-105 transition-transform" aria-label="Send message">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-primary text-white rounded-full shadow-xl hover:scale-110 transition-transform"
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
