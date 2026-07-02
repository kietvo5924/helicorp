"use client";

import { useTheme } from "next-themes";
import { ParallaxHero } from "@/components/features/parallax-hero";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Cpu, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yMarquee = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yBento = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <main ref={containerRef} className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col items-center overflow-x-hidden">
      
      {/* Main Scrollytelling Hero */}
      <ParallaxHero />

      {/* Infinite Scrolling Marquee */}
      <div className="w-full overflow-hidden bg-primary/10 py-8 border-y border-primary/20">
        <motion.div 
          className="flex whitespace-nowrap gap-12 font-black text-6xl text-primary/30 uppercase tracking-tighter"
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        >
          <span>Helicorp Quantum</span>
          <span>•</span>
          <span>Next-Gen Performance</span>
          <span>•</span>
          <span>Vision Pro</span>
          <span>•</span>
          <span>Helicorp Core</span>
          <span>•</span>
          <span>Helicorp Quantum</span>
          <span>•</span>
          <span>Next-Gen Performance</span>
          <span>•</span>
          <span>Vision Pro</span>
          <span>•</span>
        </motion.div>
      </div>

      {/* Bento Grid Showcase */}
      <section className="py-32 px-6 w-full max-w-7xl">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter"
          >
            Engineered for <span className="text-primary">Excellence</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-foreground/60 max-w-3xl mx-auto"
          >
            We fuse radical design with uncompromising power. Explore the architecture that defines the next era of personal computing.
          </motion.p>
        </div>

        <motion.div 
          style={{ y: yBento }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]"
        >
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 md:row-span-2 rounded-3xl p-10 bg-gradient-to-br from-foreground/5 to-transparent border border-foreground/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <Zap className="w-32 h-32 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-4 relative z-10">Unmatched Power</h3>
            <p className="text-foreground/70 text-lg max-w-md relative z-10 mb-8">
              Built on Next.js Turbopack and a concurrent Go backend, experiencing zero latency is just the beginning.
            </p>
            <Link href="/features" className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-bold rounded-full relative z-10 hover:gap-4 transition-all">
              Learn Architecture <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="rounded-3xl p-8 bg-primary/10 border border-primary/20 flex flex-col justify-between group"
          >
            <Cpu className="w-10 h-10 text-primary mb-4" />
            <div>
              <h3 className="text-2xl font-bold mb-2">Neural Link</h3>
              <p className="text-foreground/70 text-sm">Direct brain-computer interface processing at 10TB/s.</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="rounded-3xl p-8 bg-foreground/5 border border-foreground/10 flex flex-col justify-between group"
          >
            <Shield className="w-10 h-10 text-foreground mb-4" />
            <div>
              <h3 className="text-2xl font-bold mb-2">Quantum Secure</h3>
              <p className="text-foreground/70 text-sm">Military-grade encryption securing your data at the atomic level.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-32 w-full bg-foreground text-background flex flex-col items-center justify-center relative overflow-hidden">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center z-10 px-6"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">Ready to Upgrade?</h2>
          <Link href="/products" className="inline-flex px-10 py-5 bg-primary text-white text-xl font-bold rounded-full shadow-[0_0_40px_rgba(10,132,255,0.5)] hover:scale-105 transition-transform">
            Shop the Ecosystem
          </Link>
        </motion.div>
        
        {/* Animated background elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
          className="absolute w-[800px] h-[800px] border border-background/10 rounded-full border-dashed"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          className="absolute w-[1200px] h-[1200px] border border-background/5 rounded-full border-dashed"
        />
      </section>
      
    </main>
  );
}
