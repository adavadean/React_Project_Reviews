import { Link } from "react-router-dom";
import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const reviewsCount = product.reviews.length;
  const averageRating =
    reviewsCount > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount
      : null;

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <div className="product-card__image-wrapper">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-card__content">
          <h3>{product.name}</h3>
          <p className="product-card__description">{product.description}</p>

          <div className="product-card__meta">
            {averageRating !== null && (
              <span>⭐ {averageRating.toFixed(1)}</span>
            )}
            <span>{reviewsCount} reviews</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
