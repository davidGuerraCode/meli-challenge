interface Shipping {
  free_shipping: boolean;
}

interface Installments {
  quantity: number;
  amount: number;
  currency_id: string;
}

export interface Products {
  id: string;
  title: string;
  condition: string;
  thumbnail: string;
  currency_id: string;
  price: number;
  original_price: number;
  shipping: Shipping;
  installments: Installments;
  seller: {
    nickname: string;
    id: number;
  };
}

export const itemsAdapter = (products: Products[]) => {
  return products.map(product => {
    const {
      id,
      title,
      currency_id,
      price,
      thumbnail,
      condition,
      shipping,
      original_price,
      installments,
      seller,
    } = product;

    return Object.freeze({
      id,
      title,
      seller: seller.nickname,
      price: {
        currency: currency_id,
        amount: price,
        decimals: price.toString().split('.')[1] || 0,
        regular_amount: original_price,
      },
      picture: thumbnail,
      condition,
      free_shipping: shipping.free_shipping,
      installments: {
        quantity: installments.quantity,
        amount: installments.amount,
        currency: installments.currency_id,
      },
    });
  });
};
