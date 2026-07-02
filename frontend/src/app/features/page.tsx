"use client";
import { motion } from "framer-motion";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-24">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-6xl font-bold mb-6">Built for the Future</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Helicorp combines cutting-edge performance with unparalleled design to deliver experiences that are both beautiful and powerful.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-foreground/5 p-12 rounded-3xl border border-foreground/10 hover:border-primary/50 transition-colors"
          >
            <h3 className="text-3xl font-bold mb-6 text-primary">01. Next.js Turbopack</h3>
            <p className="text-foreground/80 text-lg leading-relaxed">
              Experience lightning-fast builds and instant page loads. Our frontend architecture is optimized for 60fps animations and seamless routing without compromising on SEO or performance.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-foreground/5 p-12 rounded-3xl border border-foreground/10 hover:border-primary/50 transition-colors"
          >
            <h3 className="text-3xl font-bold mb-6 text-primary">02. Golang & Gin</h3>
            <p className="text-foreground/80 text-lg leading-relaxed">
              Our decoupled backend is powered by Go, ensuring concurrent processing, ultra-low latency API responses, and robust memory safety. Integrated with SQLite for reliable data persistence.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
