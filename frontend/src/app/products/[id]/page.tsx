import ProductDetailClient from "./client";
import { Product } from "@/store/useAppStore";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  try {
    const apiUrl = process.env.INTERNAL_API_URL || "http://backend:8080";
    const res = await fetch(`${apiUrl}/api/products/${params.id}`, { cache: "no-store" });
    const json = await res.json();
    if (json.status === "success" && json.data) {
      const product = json.data;
      return {
        title: product.name,
        description: product.description,
        openGraph: {
          title: `${product.name} | Helicorp`,
          description: product.description,
          images: [product.image_url || ""],
        },
        twitter: {
          card: "summary_large_image",
          title: `${product.name} | Helicorp`,
          description: product.description,
          images: [product.image_url || ""],
        }
      };
    }
  } catch (error) {
    console.error("Metadata fetch failed", error);
  }
  return {
    title: "Product Not Found",
  };
}

// Server Component for fetching data
export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  let product: Product | null = null;
  
  try {
    // Determine the API URL depending on the environment.
    // In Docker, Next.js server accesses backend via internal network: http://backend:8080
    // In local dev, it might be localhost:8080.
    const apiUrl = process.env.INTERNAL_API_URL || "http://backend:8080";
    const res = await fetch(`${apiUrl}/api/products/${params.id}`, { cache: "no-store" });
    const json = await res.json();
    if (json.status === "success") {
      product = json.data;
    }
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }

  return <ProductDetailClient product={product} />;
}
