export type Product = {
  id: string;
  name: string;
  price: number;
  img: string;
  availableAmount: number;
  minOrderAmount: number;
};

export type CartItem = {
  productId: string;
  amount: number;
  totalPrice: number;
};
