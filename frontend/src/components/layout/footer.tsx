import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-foreground/[0.03] text-foreground py-16 border-t border-foreground/10 transition-colors duration-300">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <div className="col-span-2 md:col-span-1 mb-8 md:mb-0">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(10,132,255,0.5)]">H</div>
            <div className="text-xl font-bold text-foreground tracking-widest">HELICORP</div>
          </div>
          <p className="text-sm text-foreground/70">Innovating the future, today. Premium tech solutions for the modern world.</p>
        </div>
        <div className="col-span-1">
          <div className="font-bold text-foreground mb-4">Ecosystem</div>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
            <li><Link href="/features" className="hover:text-primary transition-colors">Technology</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Our Vision</Link></li>
          </ul>
        </div>
        <div className="col-span-1">
          <div className="font-bold text-foreground mb-4">Company</div>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
          <div className="font-bold text-foreground mb-4">Legal</div>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-foreground/10 text-center text-sm flex flex-col md:flex-row justify-between items-center text-foreground/70">
        <p>&copy; 2026 Helicorp Inc. All rights reserved.</p>
        <p className="mt-4 md:mt-0 font-medium text-primary">Designed for the Future.</p>
      </div>
    </footer>
  );
}
