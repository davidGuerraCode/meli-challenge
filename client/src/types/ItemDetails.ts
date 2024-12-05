type Price = {
  currency: string;
  amount: number;
  decimals: number;
  regular_amount: number;
};

type Installments = {
  quantity: number;
  amount: number;
  currency_id: string;
};

type Attributes = {
  id: string;
  name: string;
  value_name: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Item = {
  id: string;
  title: string;
  price: Price;
  pictures: string[];
  condition: string;
  free_shipping: boolean;
  installments: Installments;
  sold_quantity: number;
  description: string;
  attributes: Attributes[];
  category_path_from_root: Category[];
};

export type ItemDetails = {
  item: Item;
};
