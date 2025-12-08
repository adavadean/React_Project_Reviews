import type { Review } from "./review";

export type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  reviews: Review[];
};
