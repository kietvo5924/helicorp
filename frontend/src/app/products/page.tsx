import { ProductGrid } from "@/components/features/product-grid";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <div className="container mx-auto px-6 mb-12">
        <h1 className="text-5xl font-bold mb-4">Our Products</h1>
        <p className="text-xl text-foreground/70">The pinnacle of technology, available today.</p>
      </div>
      <Suspense fallback={<div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
        <ProductGrid />
      </Suspense>
    </main>
  );
}
