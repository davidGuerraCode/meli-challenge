export type Installments = {
  quantity: number;
  amount: number;
  currency_id: string;
};

export type Price = {
  amount: number;
  currency: string;
  decimals: number;
  regular_amount: number;
};

export type Product = {
  id: string;
  title: string;
  condition: string;
  picture: string;
  currency_id: string;
  price: Price;
  original_price: number;
  free_shipping: boolean;
  installments: Installments;
  seller: string;
};

export type Products = {
  categories: string[];
  items: Product[];
};
