import { useState } from "react";
import type { Review } from "../types/review";

type ReviewsListProps = {
  reviews?: Review[];
};

function renderStars(rating: number) {
  return (
    <span className="stars">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_CHARS = 160;

  const reviewText = (review as any).text ?? "";
  const isLong = reviewText.length > MAX_CHARS;

  const displayedText = isExpanded
    ? reviewText
    : reviewText.slice(0, MAX_CHARS) + (isLong ? "..." : "");

  return (
    <div className="review-card">
      <div className="review-header">
        <strong>User</strong>
        {renderStars(review.rating)}
      </div>

      {/* Afișăm textul doar daca e */}
      {reviewText && <p className="review-text">{displayedText}</p>}

      {/* Buton */}
      {reviewText && isLong && (
        <button
          type="button"
          className="review-toggle"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}

      {review.createdAt && (
        <span className="review-date">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      )}
    </div>
  );
}

export function ReviewsList({ reviews = [] }: ReviewsListProps) {
  if (reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <div className="reviews-list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}
