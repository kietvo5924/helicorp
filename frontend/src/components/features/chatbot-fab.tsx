"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { GlassPanel } from "../ui/glass-panel";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

export function ChatbotFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('helicorp_chat_history');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save to localStorage when messages change
  useEffect(() => {
    localStorage.setItem('helicorp_chat_history', JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.sender === "bot" ? "model" : "user",
        content: m.text
      }));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://helicorp-backend-8cba.onrender.com'}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text, history }),
      });
      const json = await res.json();
      
      if (json.status === "success") {
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: "bot", text: json.data }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: "bot", text: "Sorry, I am having trouble connecting to my quantum core right now." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "bot", text: "Connection error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 sm:w-96"
          >
            <GlassPanel className="overflow-hidden shadow-2xl border border-foreground/10">
              <div className="bg-primary/90 backdrop-blur-md p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-bold">Helicorp Assistant</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors" aria-label="Close chat">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="h-80 p-4 flex flex-col gap-3 overflow-y-auto bg-background/50">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white self-end rounded-tr-sm' 
                        : 'bg-foreground/10 text-foreground self-start rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                {isLoading && (
                  <div className="bg-foreground/10 text-foreground p-3 rounded-2xl rounded-tl-sm self-start flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 border-t border-foreground/10 flex gap-2 bg-background/80 backdrop-blur-md">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about our products..." 
                  className="flex-1 bg-foreground/5 border border-foreground/20 rounded-full px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-primary text-white rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100" 
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-primary text-white rounded-full shadow-xl hover:scale-110 transition-transform relative"
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        <MessageCircle className="w-6 h-6" />
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-background rounded-full"></span>
        )}
      </button>
    </div>
  );
}
