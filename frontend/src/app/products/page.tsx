import { ProductGrid } from "@/components/features/product-grid";
import { Product } from "@/store/useAppStore";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our premium ecosystem of next-generation technology.",
};

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  let initialProducts: Product[] = [];
  try {
    const apiUrl = process.env.INTERNAL_API_URL || "https://helicorp-backend-8cba.onrender.com";
    const res = await fetch(`${apiUrl}/api/products`, { cache: 'no-store' });
    const json = await res.json();
    if (json.status === "success") {
      initialProducts = json.data;
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <div className="container mx-auto px-6 mb-12">
        <h1 className="text-5xl font-bold mb-4">Our Products</h1>
        <p className="text-xl text-foreground/70">The pinnacle of technology, available today.</p>
      </div>
      <ProductGrid initialProducts={initialProducts} />
    </main>
  );
}
