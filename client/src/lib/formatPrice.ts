export const formatPrice = ({
  price,
  currency,
  decimals,
}: {
  price: number;
  currency?: string;
  decimals?: number;
}) => {
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency || 'ARS',
    minimumFractionDigits: decimals && decimals > 0 ? 2 : 0,
  }).format(price);

  return formattedPrice;
};
