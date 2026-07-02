"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Section 1 transforms
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);

  // Section 2 transforms
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [100, 0, 0, -100]);

  // Section 3 transforms
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [100, 0, 0, -100]);

  // Section 4 transforms
  const opacity4 = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const scale4 = useTransform(scrollYProgress, [0.85, 0.9], [0.8, 1]);

  return (
    <main ref={containerRef} className="relative h-[400vh] bg-background text-foreground">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Parallax Element */}
        <motion.div 
          style={{ scale: scale1 }}
          className="absolute inset-0 z-0 opacity-30"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80" 
            alt="Space" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center"
        >
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
            Our Vision
          </h1>
          <p className="text-2xl md:text-4xl max-w-3xl text-foreground/80 font-light leading-relaxed">
            We believe technology should be an extension of humanity. Seamless, powerful, and profoundly beautiful.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6 text-center"
        >
          <h2 className="text-6xl md:text-7xl font-bold mb-12">The Core of Innovation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
            <div className="bg-foreground/5 backdrop-blur-xl border border-foreground/10 p-10 rounded-[2rem] hover:bg-foreground/10 transition-colors">
              <h3 className="text-3xl font-bold mb-4 text-primary">Design</h3>
              <p className="text-foreground/70 text-lg">Every curve, every pixel, engineered to evoke emotion and inspire creativity.</p>
            </div>
            <div className="bg-foreground/5 backdrop-blur-xl border border-foreground/10 p-10 rounded-[2rem] hover:bg-foreground/10 transition-colors">
              <h3 className="text-3xl font-bold mb-4 text-primary">Performance</h3>
              <p className="text-foreground/70 text-lg">Raw computational power meets unprecedented efficiency for the modern professional.</p>
            </div>
            <div className="bg-foreground/5 backdrop-blur-xl border border-foreground/10 p-10 rounded-[2rem] hover:bg-foreground/10 transition-colors">
              <h3 className="text-3xl font-bold mb-4 text-primary">Future</h3>
              <p className="text-foreground/70 text-lg">We don&apos;t just predict the future. We build the foundations for tomorrow.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 3 (New Philosophy Section) */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 p-6 text-center"
        >
          <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-primary to-blue-600">Zero Compromise</h2>
          <p className="text-2xl max-w-4xl text-foreground/80 font-light leading-relaxed">
            Our philosophy is simple. We refuse to compromise. Whether it is the ultra-low latency of our global CDN or the tactile feel of our interfaces, perfection is our only standard.
          </p>
        </motion.div>

        {/* Section 4 */}
        <motion.div 
          style={{ opacity: opacity4, scale: scale4 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-40 p-6 text-center bg-background/50 backdrop-blur-lg"
        >
          <div className="p-16 border border-foreground/10 rounded-[3rem] bg-foreground/5 backdrop-blur-3xl shadow-2xl">
            <h2 className="text-6xl md:text-7xl font-bold mb-6">Join the Revolution</h2>
            <p className="text-2xl max-w-2xl text-foreground/80 font-light mb-12">
              Helicorp is not just a company. It&apos;s a movement towards a more advanced, connected world.
            </p>
            <a href="/products" className="inline-flex px-12 py-5 bg-foreground text-background font-bold rounded-full text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(var(--foreground),0.3)]">
              Explore Ecosystem
            </a>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
