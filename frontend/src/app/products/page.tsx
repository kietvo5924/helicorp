import { ProductGrid } from "@/components/features/product-grid";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <div className="container mx-auto px-6 mb-12">
        <h1 className="text-5xl font-bold mb-4">Our Products</h1>
        <p className="text-xl text-foreground/70">The pinnacle of technology, available today.</p>
      </div>
      <ProductGrid />
    </main>
  );
}
