type Shipping = {
  free_shipping: boolean;
};

type Price = {
  currency_id: string;
  price: number;
  original_price: number;
};

type Pictures = {
  secure_url: string;
};

type Attributes = {
  id: string;
  value_name: string;
  name: string;
};

type ItemDetails = {
  id: string;
  title: string;
  price: number;
  original_price: number;
  currency_id: string;
  pictures: Pictures[];
  condition: string;
  shipping: Shipping;
  initial_quantity: number;
  attributes: Attributes[];
};

type ItemDescription = {
  plain_text: string;
};

const requiredAttributes = ['BRAND', 'MODEL', 'COLOR', 'WEIGHT'];
export const itemDetailsAdapter = (
  itemDetails: ItemDetails,
  itemDescription: ItemDescription
) => {
  const {
    id,
    title,
    price,
    pictures,
    condition,
    shipping,
    original_price,
    currency_id,
    attributes,
    initial_quantity,
  } = itemDetails;
  const { plain_text } = itemDescription;

  return Object.freeze({
    id,
    title,
    price: {
      currency: currency_id,
      amount: price,
      decimals: price.toString().split('.')[1] || 0,
      regular_amount: original_price,
    },
    pictures: pictures.map(picture => picture.secure_url),
    condition: parseCondition(condition),
    free_shipping: shipping.free_shipping,
    sold_quantity: initial_quantity,
    description: plain_text,
    attributes: attributes
      .filter(attribute => requiredAttributes.includes(attribute.id))
      .map(attribute => ({
        id: attribute.id,
        value_name: attribute.value_name,
        name: attribute.name,
      })),
  });
};

function parseCondition(condition: string) {
  const conditions = {
    new: 'Nuevo',
    used: 'Usado',
    reconditioned: 'Reacondicionado',
  };

  return conditions[condition as keyof typeof conditions];
}
