"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Zap, Shield, Cpu, Globe, Rocket } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroScroll, [0, 1], [0, 300]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden pt-20">
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-primary font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Redefining the Possible</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-foreground/40 leading-tight">
              We Are Helicorp.
            </h1>
            <p className="text-2xl md:text-3xl text-foreground/70 font-light max-w-3xl mx-auto leading-relaxed">
              We don&apos;t just build technology. We engineer the artifacts of tomorrow, designed to augment human potential today.
            </p>
          </motion.div>
        </motion.div>

        {/* Hero Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full opacity-50"></div>
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 blur-[100px] rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-foreground/5 bg-foreground/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h3 className="text-5xl md:text-7xl font-black text-primary mb-2">10M+</h3>
              <p className="text-foreground/60 font-medium tracking-widest uppercase">Active Users</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h3 className="text-5xl md:text-7xl font-black text-primary mb-2">50+</h3>
              <p className="text-foreground/60 font-medium tracking-widest uppercase">Countries</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <h3 className="text-5xl md:text-7xl font-black text-primary mb-2">99.9%</h3>
              <p className="text-foreground/60 font-medium tracking-widest uppercase">Uptime</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <h3 className="text-5xl md:text-7xl font-black text-primary mb-2">0</h3>
              <p className="text-foreground/60 font-medium tracking-widest uppercase">Compromises</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">
              Form Follows <br/><span className="text-primary">Brilliance.</span>
            </h2>
            <p className="text-xl text-foreground/70 leading-relaxed">
              At Helicorp, we reject the notion that powerful tools must be complex. Our engineering philosophy centers on distillation: stripping away the unnecessary until only the essential remains, functioning with absolute perfection.
            </p>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Every curve of our hardware, every pixel of our software, and every millisecond of our network latency is obsessively optimized. We build tools that disappear into your workflow, allowing your creativity and productivity to take center stage.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-[3rem] overflow-hidden bg-foreground/5 border border-foreground/10 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000" 
              alt="Engineering Philosophy" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Values */}
      <section className="py-32 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">Our DNA</h2>
            <p className="text-xl text-background/60 max-w-2xl mx-auto">The foundational principles that drive every decision, every line of code, and every product we ship.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Large Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="md:col-span-2 bg-background/5 border border-background/10 p-12 rounded-[2rem] hover:bg-background/10 transition-colors"
            >
              <Zap className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-3xl font-bold mb-4">Unrelenting Performance</h3>
              <p className="text-background/70 text-lg leading-relaxed">
                Speed is not a feature; it is a prerequisite. We utilize custom silicon optimization, cutting-edge edge computing, and zero-allocation memory architectures to ensure our ecosystem responds faster than thought.
              </p>
            </motion.div>

            {/* Square Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-background/5 border border-background/10 p-12 rounded-[2rem] hover:bg-background/10 transition-colors"
            >
              <Shield className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Absolute Privacy</h3>
              <p className="text-background/70 leading-relaxed">
                Your data is your own. End-to-end encryption and decentralized storage form the bedrock of our trust model.
              </p>
            </motion.div>

            {/* Square Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-background/5 border border-background/10 p-12 rounded-[2rem] hover:bg-background/10 transition-colors"
            >
              <Cpu className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Adaptive AI</h3>
              <p className="text-background/70 leading-relaxed">
                Machine learning that adapts to your workflow locally, without compromising your privacy or draining your battery.
              </p>
            </motion.div>

            {/* Large Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="md:col-span-2 bg-background/5 border border-background/10 p-12 rounded-[2rem] hover:bg-background/10 transition-colors overflow-hidden relative"
            >
              <div className="relative z-10">
                <Globe className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-3xl font-bold mb-4">Global Ecosystem</h3>
                <p className="text-background/70 text-lg leading-relaxed max-w-xl">
                  A seamless integration across all your devices. Start a task on your phone, seamlessly continue on your tablet, and finalize on your desktop. One continuous, unbroken workflow.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
                <Globe className="w-96 h-96" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative overflow-hidden flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-background z-0"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl"
        >
          <Rocket className="w-20 h-20 text-primary mx-auto mb-8" />
          <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
            Ready to Build the Future?
          </h2>
          <p className="text-2xl text-foreground/70 mb-12 font-light">
            Join millions of forward-thinking individuals who have already upgraded their digital existence.
          </p>
          <Link 
            href="/products" 
            className="inline-flex px-12 py-6 bg-primary text-white font-bold rounded-full text-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(10,132,255,0.5)] hover:shadow-[0_0_60px_rgba(10,132,255,0.7)]"
          >
            Explore the Ecosystem
          </Link>
        </motion.div>
      </section>

    </main>
  );
}
