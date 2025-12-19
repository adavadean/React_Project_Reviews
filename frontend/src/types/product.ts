//tipul pentru un produs din aplicatie
import type { Review } from "./review";

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  reviews: Review[];
};
