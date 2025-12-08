import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../api/products";
import { ProductCard } from "../components/ProductCard";

export function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Nu am putut încărca produsele 😢");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  });

  return (
    <div className="page products-list-page">
      <h1>Produse</h1>

      <input
        type="text"
        placeholder="Caută după nume sau descriere..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {isLoading && <p>Se încarcă produsele...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {filteredProducts.length === 0 && (
            <p>Nu am găsit produse pentru căutarea ta.</p>
          )}
        </div>
      )}
    </div>
  );
}
