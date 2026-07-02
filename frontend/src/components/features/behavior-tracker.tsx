"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";

export function BehaviorTracker() {
  const [notifications, setNotifications] = useState<{ message: string; id: number }[]>([]);

  useEffect(() => {
    let scroll50Sent = false;
    let scroll90Sent = false;
    
    const notifyAndTrack = (eventType: string, message: string, data: any) => {
      const id = Date.now();
      // 1. Show Notification (stacking)
      setNotifications(prev => [...prev, { message, id }]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 4000);

      // 2. Send Webhook
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/webhook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: eventType,
          data: { ...data, timestamp: new Date().toISOString() }
        })
      }).catch(console.error);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      ) - window.innerHeight;

      if (documentHeight <= 0) return;
      
      const scrollPercentage = (scrollY / documentHeight) * 100;

      if (!scroll50Sent && scrollPercentage >= 50 && scrollPercentage < 90) {
        scroll50Sent = true;
        notifyAndTrack("scroll_50", "You've explored 50% of the page!", { url: window.location.pathname });
      }
      if (!scroll90Sent && scrollPercentage >= 90) {
        scroll90Sent = true;
        notifyAndTrack("scroll_90", "Thanks for reading through!", { url: window.location.pathname });
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) {
        const element = target.closest('button') || target.closest('a');
        const actionText = element?.innerText || element?.getAttribute('aria-label') || 'Interactive Element';
        if (actionText && actionText.trim().length > 0) {
          notifyAndTrack("user_click", `Interacted with: ${actionText.trim().substring(0, 20)}`, { 
            tag: element?.tagName, 
            text: actionText.trim(),
            url: window.location.pathname
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="fixed top-24 right-6 z-[100] pointer-events-none flex flex-col items-end gap-3 w-full max-w-xs">
      <AnimatePresence mode="popLayout">
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            layout
            initial={{ opacity: 0, x: 80, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-indigo-600/90 backdrop-blur-md border border-white/20 text-white px-5 py-4 rounded-xl shadow-[0_10px_40px_rgba(79,70,229,0.5)] flex items-center gap-4 w-full"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-wide">Activity Tracker</span>
              <span className="text-sm text-white/80 leading-tight">{notification.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
