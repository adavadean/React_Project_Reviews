//tipul pentru un review asociat unui produs
export type Review = {
  id: string;
  productId: string;
  text: string;
  rating: number;
  createdAt?: string;
};
