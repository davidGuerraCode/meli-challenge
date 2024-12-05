import { formatPrice } from '../../lib/formatPrice';
import { Product } from '../../types/Products';
import { Installments } from '../Installments';

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <>
      <img
        src={product.picture}
        alt={product.title}
        width={259}
        className="w-[259px] h-auto aspect-square"
      />

      <section className="mt-[30px]">
        <h2 className="text-xl font-light opacity-90">{product.title}</h2>
        <span className="text-sm font-normal opacity-55">
          Por {product.seller}
        </span>
        <span className="block my-6">
          {product.price.regular_amount > 0 && (
            <small className="text-xs font-normal line-through opacity-55">
              {formatPrice({
                price: product.price.regular_amount,
                currency: product.price.currency,
                decimals: product.price.decimals,
              })}
            </small>
          )}
          <p className="text-2xl font-normal opacity-90">
            {formatPrice({
              price: product.price.amount,
              currency: product.price.currency,
              decimals: product.price.decimals,
            })}
          </p>
          {product.installments && (
            <Installments installments={product.installments} />
          )}
        </span>

        {product.free_shipping && (
          <p className="text-sm text-meli-green mb-[25px]">Envio gratis</p>
        )}
      </section>
    </>
  );
};
export default ProductItem;
