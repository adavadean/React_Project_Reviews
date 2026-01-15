import { useState } from "react";

type AddReviewFormProps = {
  onSubmit: (data: { rating: number; text?: string }) => Promise<void>;
  isSubmitting: boolean;
};

export function AddReviewForm({ onSubmit, isSubmitting }: AddReviewFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<{ rating?: string; text?: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: { rating?: string; text?: string } = {};

    // Rating obligatoriu
    if (rating < 1 || rating > 5) {
      newErrors.rating = "Please select a rating between 1 and 5 stars.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const trimmed = text.trim();
      const payload: { rating: number; text?: string } = { rating };
      if (trimmed) payload.text = trimmed;

      await onSubmit(payload);

      setSuccessMessage("Your review has been submitted successfully!");

      // reset
      setText("");
      setRating(0);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err: any) {
      setErrors({ text: "Something went wrong. Please try again." });
    }
  }

  return (
    <form className="add-review-form" onSubmit={handleSubmit}>
      <h3>Add a review</h3>

      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Rating */}
      <div className="form-row">
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className={errors.rating ? "input-error" : ""}
          disabled={isSubmitting}
        >
          <option value={0}>Select rating…</option>
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>
        {errors.rating && <p className="error-message">{errors.rating}</p>}
      </div>

      {/* Review text (optional) */}
      <div className="form-row">
        <label htmlFor="review">Review (optional)</label>
        <textarea
          id="review"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review here (optional)..."
          className={errors.text ? "input-error" : ""}
          disabled={isSubmitting}
        />
        {errors.text && <p className="error-message">{errors.text}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Submit review"}
      </button>
    </form>
  );
}
