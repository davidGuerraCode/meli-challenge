import React from 'react';
import { useLocation, useParams } from 'react-router';
import { Breadcrumb, Installments } from '../../components';
import useFetchWithLoader from '../../hooks/useFetchWithLoader';
import { formatPrice } from '../../lib/formatPrice';
import { getProduct } from '../../services/products.service';
import { ItemDetails } from '../../types/ItemDetails';

const ProductDetails = () => {
  const { id: itemId } = useParams();
  const { callEndpoint, loading } = useFetchWithLoader();
  const [itemDetails, setItemDetails] = React.useState<ItemDetails>();
  const location = useLocation();
  const seller = location.state?.seller;
  const installments = location.state?.installments;

  React.useEffect(() => {
    const getProductDetails = async (id: string) => {
      const response = await callEndpoint<ItemDetails>(getProduct(id));

      if (response.status === 200) {
        setItemDetails(response.data as ItemDetails);
      }
    };

    if (itemId) {
      getProductDetails(itemId);
    }
  }, [callEndpoint, itemId]);

  if (loading) return <div>Loading...</div>;
  if (!itemDetails) return <div>Product not found</div>;

  return (
    <section className="w-full xl:w-[1200px] mx-auto mt-[30px] px-3">
      <Breadcrumb categories={itemDetails.item.category_path_from_root} />

      <div className="px-6 pt-6 bg-white rounded-sm pb-7">
        <section className="flex flex-col items-center gap-x-12 pb-7 md:flex-row">
          <div>
            <img
              src={itemDetails.item.pictures[0]}
              alt=""
            />
          </div>

          <section className="flex flex-col">
            <p className="text-[15px] opacity-90 font-light">
              {itemDetails.item.condition} | {itemDetails.item.sold_quantity}{' '}
              vendidos
            </p>

            <div className="my-7">
              <h3 className="text-[22px] font-semibold opacity-90 mb-2">
                {itemDetails.item.title}
              </h3>
              {seller && (
                <h4 className="text-lg font-normal opacity-55">Por {seller}</h4>
              )}
            </div>

            <div>
              {itemDetails.item.price.regular_amount > 0 && (
                <small className="text-lg font-normal line-through opacity-55">
                  {formatPrice({
                    price: itemDetails.item.price.regular_amount,
                    currency: itemDetails.item.price.currency,
                    decimals: itemDetails.item.price.decimals,
                  })}
                </small>
              )}
              <p className="text-4xl font-normal opacity-90">
                {formatPrice({ price: itemDetails.item.price.amount })}
              </p>
              {installments && (
                <Installments
                  installments={installments}
                  className="text-lg font-light"
                />
              )}
            </div>
            {itemDetails.item.free_shipping && (
              <p className="text-lg font-semibold text-meli-green mt-7">
                Envio gratis
              </p>
            )}

            <div className="flex flex-wrap gap-x-4 mt-7">
              {itemDetails.item.attributes.map(({ id, name, value_name }) => (
                <p
                  key={id}
                  className="text-lg font-light opacity-90"
                >
                  {name}:{' '}
                  <span className="text-lg font-normal opacity-90">
                    {value_name}
                  </span>
                </p>
              ))}
            </div>
          </section>
        </section>

        {itemDetails.item.description && (
          <>
            <div className="border-b" />
            <article className="mt-7">
              <h4 className="text-[22px] font-normal opacity-80">
                Descripcion
              </h4>
              <p className="text-lg font-normal opacity-80">
                {itemDetails.item.description}
              </p>
            </article>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
