"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePreOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/webhook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "pre_order",
          data: { source: "hero_section", product: "Helicorp Premium" }
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
    <section
      ref={ref}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ y: yText, opacity }}
        className="z-10 text-center px-4 flex flex-col items-center"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-foreground"
        >
          The Future is <span className="text-primary">Here</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl text-foreground/80 max-w-2xl"
        >
          Experience unmatched performance and premium design, engineered for the next generation.
        </motion.p>
        <motion.button
          onClick={handlePreOrder}
          disabled={loading || success}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-semibold shadow-[0_0_20px_rgba(10,132,255,0.4)] hover:shadow-[0_0_30px_rgba(10,132,255,0.6)] transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
        >
          {loading ? "Processing..." : success ? "Reserved Successfully" : "Pre-order Now"}
        </motion.button>
      </motion.div>

      {/* Abstract background elements */}
      <motion.div
        style={{ scale: scaleImage }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-background via-background to-primary/10"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[120px]" />
      </motion.div>
    </section>
  );
}
