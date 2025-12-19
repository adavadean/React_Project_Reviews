import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../api/products";
import { ProductCard } from "../components/ProductCard";

export function ProductsListPage() {
  //pentru lista de produse si pentru termenul de cautare
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  //pentru a incarca produsele la montarea componentei
  useEffect(() => {
    getProducts()
      .then(setProducts) //setam lista de produse primita de la API
      .catch(() => {
        alert("Failed to load products"); //afisam alerta daca nu se incarca
      });
  }, []);

  //filtram produsele in functie de cautare (nume + descriere)
  const filtered = products.filter((p) =>
    (p.name + p.description).toLowerCase().includes(searchTerm.toLowerCase())
  );

  //render principal pentru pagina de lista produse
  return (
    <div className="page">
      <h1>Products</h1>

      {/* Input for product search */}
      <input
        className="search-input"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Display products grid */}
      <div className="products-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* Message if no products match the search */}
      {filtered.length === 0 && <p>No products found for your search.</p>}
    </div>
  );
}
