"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Server, Zap, ShieldCheck, Database, Smartphone, Globe } from "lucide-react";

const features = [
  { icon: <Zap className="w-8 h-8" />, title: "Zero Latency", desc: "Powered by Next.js Turbopack and a heavily optimized concurrent Go backend." },
  { icon: <Server className="w-8 h-8" />, title: "Go Microservices", desc: "Decoupled architecture allowing infinite horizontal scaling under extreme loads." },
  { icon: <Database className="w-8 h-8" />, title: "Persistent Edge", desc: "Data is synced globally using edge computing and localized SQLite caches." },
  { icon: <ShieldCheck className="w-8 h-8" />, title: "Quantum Security", desc: "Military-grade encryption securing all API payloads in transit and at rest." },
  { icon: <Smartphone className="w-8 h-8" />, title: "Adaptive UI", desc: "Framer Motion powers a flawless 60fps responsive experience on any screen." },
  { icon: <Globe className="w-8 h-8" />, title: "Global CDN", desc: "Assets distributed worldwide for sub-10ms Time to First Byte (TTFB)." },
];

export default function FeaturesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <main className="relative min-h-screen bg-background text-foreground pt-32 pb-24 overflow-hidden" ref={containerRef}>
      
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20">
            SYSTEM ARCHITECTURE
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">Built for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Future</span></h1>
          <p className="text-2xl text-foreground/70 max-w-3xl mx-auto font-light leading-relaxed">
            Helicorp combines cutting-edge performance with unparalleled design to deliver experiences that are both beautiful and infinitely scalable.
          </p>
        </motion.div>

        <motion.div style={{ y }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-foreground/[0.03] p-10 rounded-3xl border border-foreground/10 hover:border-primary/50 transition-all duration-300 group shadow-lg"
            >
              <div className="w-16 h-16 rounded-2xl bg-background border border-foreground/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-[0_0_15px_rgba(10,132,255,0.15)] group-hover:shadow-[0_0_25px_rgba(10,132,255,0.5)]">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-foreground/70 text-lg leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Terminal / Code mockup section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl max-w-5xl mx-auto"
        >
          <div className="flex items-center px-6 py-4 bg-zinc-900 border-b border-zinc-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-4 text-xs font-mono text-zinc-500">helicorp_deploy.sh</span>
          </div>
          <div className="p-8 font-mono text-sm text-green-400 overflow-x-auto whitespace-pre-wrap">
            <p className="text-zinc-400"># Initializing Helicorp Systems...</p>
            <p>$ docker-compose up -d --build</p>
            <p className="text-zinc-500">Building frontend...</p>
            <p className="text-zinc-500">Building backend...</p>
            <p>[+] Running 3/3</p>
            <p> ✔ Network helicorp_default  Created</p>
            <p> ✔ Container backend-1       Started</p>
            <p> ✔ Container frontend-1      Started</p>
            <p className="text-blue-400 mt-4">System Online. All systems nominal. 100% capacity.</p>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
