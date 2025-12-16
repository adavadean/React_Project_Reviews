import type { Product } from "../types/product";

const BASE_URL = "http://localhost:8055";

// helper: ia produsele, fie ca vin [..] sau { products: [..] }
async function fetchProductsRaw(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) {
    throw new Error("Failed to load products");
  }

  const data = await res.json();

  // cazul 1: serverul trimite un array: [ {..}, {..} ]
  if (Array.isArray(data)) {
    return data as Product[];
  }

  // cazul 2: serverul trimite { products: [ {..}, {..} ] }
  if (Array.isArray((data as any).products)) {
    return (data as any).products as Product[];
  }

  throw new Error("Unexpected products response format");
}

// GET all products
export async function getProducts(): Promise<Product[]> {
  return fetchProductsRaw();
}

// GET one product by id (din lista completa)
export async function getProductById(id: string): Promise<Product | null> {
  const products = await fetchProductsRaw();
  const found = products.find((p) => p.id === id);
  return found ?? null;
}

// POST a new review - serverul intoarce produsul actualizat
export async function addReviewToProduct(
  productId: string,
  data: { text: string; rating: number }
): Promise<Product> {
  //trimitem review-ul la API
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

  //optional citim raspunsul, dar nu ne bazam pe el
  try {
    await res.json();
  } catch {
    //daca nu e json, ignoram
  }

  //re-fetch produsul complet, cu toate review-urile si si cel nou
  const updated = await getProductById(productId);
  if (!updated) {
    throw new Error("Product not found after adding review");
  }

  return updated;
}
