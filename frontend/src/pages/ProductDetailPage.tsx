// Importam hook-urile React si alte dependinte necesare
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, addReviewToProduct } from "../api/products";
import type { Product } from "../types/product";
import { ReviewsList } from "../components/ReviewsList";
import { AddReviewForm } from "../components/AddReviewForm";

// Componenta pentru afisarea detaliilor unui produs
export function ProductDetailPage() {
  // Extragem id-ul produsului din URL
  const { id } = useParams<{ id: string }>();

  // State-uri pentru produs, incarcare, trimitere review si erori
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //se incarca detaliile produsului cand se schimba id-ul
  useEffect(() => {
    if (!id) return;

    //se preia produsul dupa id
    async function fetchProduct(productId: string) {
      try {
        setIsLoading(true);
        setError(null);

        const found = await getProductById(productId); //cerere API
        if (!found) {
          setError("Product not found."); 
        } else {
          setProduct(found); //set produs gasit
        }
      } catch {
        setError("Could not load product."); 
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct(id);
  }, [id]);


  async function handleAddReview(data: { text: string; rating: number }) {
    if (!id) return;

    setIsSubmittingReview(true);
    const updatedProduct = await addReviewToProduct(id, data); //adaugam review-ul
    setProduct(updatedProduct); //actualizam produsul cu review-ul nou
    setIsSubmittingReview(false);
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

  //daca nu exista 
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

  //extragem review-urile produsului
  const reviews = product.reviews ?? [];
  const reviewsCount = reviews.length;

  //calculam media rating-ului
  const averageRating =
    reviewsCount > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount
      : null;

  //render principal pentru pagina de detaliu produs
  return (
    <div className="page product-detail-page">
      {/* Link inapoi la lista de produse */}
      <Link to="/" className="back-link">
        Back to products
      </Link>

      <div className="product-detail-header">
        <div className="product-detail-image-wrapper">
          {/* Imaginea produsului */}
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          {/* Numele produsului */}
          <h1>{product.name}</h1>

          {/* Afisam rating-ul mediu, daca exista review-uri */}
          {averageRating !== null && (
            <p className="product-rating">
              ⭐ {averageRating.toFixed(1)}
              <span className="product-reviews-count">
                ({reviewsCount} reviews)
              </span>
            </p>
          )}

          {/* Descrierea produsului */}
          <p className="product-description">{product.description}</p>
        </div>
      </div>

      <section className="product-reviews-section">
        <h2>Reviews</h2>

        {/* Lista review-uri */}
        <ReviewsList reviews={reviews} />

        {/* Formular pentru adaugare review nou */}
        <AddReviewForm
          onSubmit={handleAddReview}
          isSubmitting={isSubmittingReview}
        />
      </section>
    </div>
  );
}
