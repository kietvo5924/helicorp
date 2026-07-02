"use client";

import { useTheme } from "next-themes";
import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const { cartItemCount, incrementCart } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center gap-8 bg-background text-foreground transition-colors duration-300">
      <h1 className="text-4xl font-bold">Landing Page Scaffold</h1>
      
      {mounted && (
        <div className="flex gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-4 py-2 bg-primary text-white rounded-md font-medium shadow-md hover:opacity-90 transition-opacity"
          >
            Toggle Theme ({theme})
          </button>
          
          <button
            onClick={incrementCart}
            className="px-4 py-2 bg-primary text-white rounded-md font-medium shadow-md hover:opacity-90 transition-opacity"
          >
            Add to Cart ({cartItemCount})
          </button>
        </div>
      )}
    </div>
  );
}
