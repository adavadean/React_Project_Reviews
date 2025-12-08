import { useState } from "react";

type AddReviewFormProps = {
  onSubmit: (data: { text: string; rating: number }) => void;
  isSubmitting?: boolean;
};

export function AddReviewForm({ onSubmit, isSubmitting }: AddReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    onSubmit({
      text: text.trim(),
      rating,
    });

    setText("");
    setRating(5);
  }

  return (
    <form className="add-review-form" onSubmit={handleSubmit}>
      <h3>Add a review</h3>

      <div className="form-row">
        <label>Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>
      </div>

      <div className="form-row">
        <label>Review</label>
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review here..."
        />
      </div>

      <button type="submit" disabled={isSubmitting || !text.trim()}>
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
