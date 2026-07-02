export function Footer() {
  return (
    <footer className="w-full bg-black text-white/70 py-16 border-t border-white/10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-white">H</div>
            <h3 className="text-xl font-bold text-white tracking-widest">HELICORP</h3>
          </div>
          <p className="text-sm">Innovating the future, today. Premium tech solutions for the modern world.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Products</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">Quantum Series</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Vision Pro</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Core X Workstations</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-center text-sm flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2026 Helicorp Inc. All rights reserved.</p>
        <p className="mt-4 md:mt-0 font-medium">Designed for the Future.</p>
      </div>
    </footer>
  );
}
