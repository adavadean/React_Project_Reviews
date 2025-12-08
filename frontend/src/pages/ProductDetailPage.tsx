import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, addReviewToProduct } from "../api/products";
import type { Product } from "../types/product";
import { ReviewsList } from "../components/ReviewsList";
import { AddReviewForm } from "../components/AddReviewForm";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    getProductById(id).then((found) => {
      if (found) {
        setProduct(found);
      } else {
        alert("Product does not exist");
      }
    });
  }, [id]);

  async function handleAddReview(data: { text: string; rating: number }) {
    if (!id) return;
    const updated = await addReviewToProduct(id, data);
    setProduct(updated);
  }

  if (!product) return <p>Loading...</p>;

  const reviewsCount = product.reviews.length;
  const average =
    reviewsCount > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / reviewsCount
      : null;

  return (
    <div className="page">
      <Link to="/">← Back to products</Link>

      <h1>{product.name}</h1>
      {average !== null && (
        <p>
          ⭐ {average.toFixed(1)} ({reviewsCount} reviews)
        </p>
      )}

      <img src={product.imageUrl} className="detail-img" />

      <p>{product.description}</p>

      <h2>Reviews</h2>
      <ReviewsList reviews={product.reviews} />

      <AddReviewForm onSubmit={handleAddReview} />
    </div>
  );
}
