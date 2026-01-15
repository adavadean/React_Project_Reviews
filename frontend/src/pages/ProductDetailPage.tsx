import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, addReviewToProduct } from "../api/products";
import type { Product } from "../types/product";
import { ReviewsList } from "../components/ReviewsList";
import { AddReviewForm } from "../components/AddReviewForm";

// componenta pentru afisarea detaliilor unui produs
export function ProductDetailPage() {
  // extragem id-ul produsului din URL
  const { id } = useParams<{ id: string }>();

  // state-uri pentru produs, incarcare, trimitere review si erori
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // se incarca detaliile produsului cand se schimba id-ul
  useEffect(() => {
    if (!id) return;

    async function fetchProduct(productId: string) {
      try {
        setIsLoading(true);
        setError(null);

        const found = await getProductById(productId);
        if (!found) {
          setProduct(null);
          setError("Product not found.");
        } else {
          setProduct(found);
        }
      } catch {
        setError("Could not load product.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct(id);
  }, [id]);

  async function handleAddReview(data: { rating: number; text?: string }) {
    if (!id) return;

    setIsSubmittingReview(true);
    try {
      // construim payload-ul: trimitem text DOAR daca exista
      const trimmed = data.text?.trim();
      const payload: { rating: number; text?: string } = {
        rating: data.rating,
      };
      if (trimmed) payload.text = trimmed;

      const updatedProduct = await addReviewToProduct(id, payload);
      setProduct(updatedProduct);
    } catch {
      // optional: afiseaza o eroare in UI
      setError("Could not submit review.");
    } finally {
      setIsSubmittingReview(false);
    }
  }

  if (isLoading) return <p>Loading product…</p>;

  if (error) {
    return (
      <div className="page product-detail-page">
        <p>{error}</p>
        <Link to="/" className="back-link">
          Back to products
        </Link>
      </div>
    );
  }

  // daca nu exista
  if (!product) {
    return (
      <div className="page product-detail-page">
        <p>Product not found.</p>
        <Link to="/" className="back-link">
          Back to products
        </Link>
      </div>
    );
  }

  // extragem review-urile produsului
  const reviews = product.reviews ?? [];
  const reviewsCount = reviews.length;

  // calculam media rating-ului
  const averageRating =
    reviewsCount > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount
      : null;

  // render principal pentru pagina de detaliu produs
  return (
    <div className="page product-detail-page">
      <Link to="/" className="back-link">
        Back to products
      </Link>

      <div className="product-detail-header">
        <div className="product-detail-image-wrapper">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <h1>{product.name}</h1>

          {averageRating !== null && (
            <p className="product-rating">
              ⭐ {averageRating.toFixed(1)}
              <span className="product-reviews-count">
                ({reviewsCount} reviews)
              </span>
            </p>
          )}

          <p className="product-description">{product.description}</p>
        </div>
      </div>

      <section className="product-reviews-section">
        <h2>Reviews</h2>

        <ReviewsList reviews={reviews} />

        <AddReviewForm
          onSubmit={handleAddReview}
          isSubmitting={isSubmittingReview}
        />
      </section>
    </div>
  );
}
