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
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);

  // Section 2 transforms
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [100, 0, -100]);

  // Section 3 transforms
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.7, 0.9], [0, 1, 1]);
  const scale3 = useTransform(scrollYProgress, [0.5, 0.8], [0.8, 1]);

  return (
    <main ref={containerRef} className="relative h-[300vh] bg-black text-white">
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
          <h1 className="text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Our Vision
          </h1>
          <p className="text-2xl max-w-2xl text-white/80 font-light">
            We believe technology should be an extension of humanity. Seamless, powerful, and profoundly beautiful.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6 text-center"
        >
          <h2 className="text-6xl font-bold mb-8">The Core of Innovation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-primary">Design</h3>
              <p className="text-white/70">Every curve, every pixel, engineered to evoke emotion.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-primary">Performance</h3>
              <p className="text-white/70">Raw computational power meets unprecedented efficiency.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-primary">Future</h3>
              <p className="text-white/70">We don&apos;t just predict the future. We build it.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, scale: scale3 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 p-6 text-center bg-black/50 backdrop-blur-sm"
        >
          <h2 className="text-6xl font-bold mb-6">Join the Revolution</h2>
          <p className="text-2xl max-w-2xl text-white/80 font-light mb-12">
            Helicorp is not just a company. It&apos;s a movement towards a more advanced, connected world.
          </p>
          <a href="/products" className="px-10 py-4 bg-white text-black font-bold rounded-full text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Explore Ecosystem
          </a>
        </motion.div>

      </div>
    </main>
  );
}
