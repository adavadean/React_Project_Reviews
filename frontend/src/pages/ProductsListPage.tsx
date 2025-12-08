import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../api/products";
import { ProductCard } from "../components/ProductCard";

export function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProducts().then(setProducts).catch(() => {
      alert("Failed to load products");
    });
  }, []);

  const filtered = products.filter((p) =>
    (p.name + p.description).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page">
      <h1>Produse</h1>

      <input
        className="search-input"
        placeholder="Caută..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="products-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
