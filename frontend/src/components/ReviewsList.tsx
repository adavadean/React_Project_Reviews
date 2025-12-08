import type { Review } from "../types/review";

type ReviewsListProps = {
  reviews: Review[];
};

function renderStars(rating: number) {
  return (
    <span className="stars">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (!reviews.length) {
    return <p>There are no reviews yet. Be the first!</p>;
  }

  return (
    <div className="reviews-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="review-header">
            <strong>User</strong>
            {renderStars(review.rating)}
          </div>
          <p>{review.text}</p>
          {review.createdAt && (
            <span>{new Date(review.createdAt).toLocaleDateString()}</span>
          )}
        </div>
      ))}
    </div>
  );
}
