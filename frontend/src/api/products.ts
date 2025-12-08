import type { Product } from "../types/product";

const BASE_URL = "http://localhost:8055";

// GET /products
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) {
    throw new Error("Failed to load products");
  }
  return res.json();
}

// simulare GET /products/:id
export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

// POST /products/:productId/reviews
export async function addReviewToProduct(
  productId: string,
  data: { text: string; rating: number }
): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${productId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to add review");
  }

  return res.json();
}
