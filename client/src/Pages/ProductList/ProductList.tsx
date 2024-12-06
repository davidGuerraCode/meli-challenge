import React from 'react';
import { Link, useSearchParams } from 'react-router';
import { Pagination } from '../../components';
import ProductItem from '../../components/ProductItem/ProductItem';
import useFetchWithLoader from '../../hooks/useFetchWithLoader';
import usePagination from '../../hooks/usePagination';
import { getProducts } from '../../services/products.service';
import { Products } from '../../types/Products';

const ITEMS_PER_PAGE = 10;
const PAGES_PER_BATCH = 5;
const ProductList = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  const [products, setProducts] = React.useState<Products>({
    items: [],
    categories: [],
  });
  const { changePage, currentItems, currentPage, offset, visiblePages } =
    usePagination({
      itemsPerPage: ITEMS_PER_PAGE,
      pagesPerBatch: PAGES_PER_BATCH,
      data: products.items,
    });
  const [hasMoreData, setHasMoreData] = React.useState(true);
  const { callEndpoint, loading } = useFetchWithLoader();

  const onChangePages = (page: number) => {
    changePage(page);
  };

  React.useEffect(() => {
    if (!hasMoreData) return;

    const getProductsList = async (searchQuery: string) => {
      const response = await callEndpoint<Products>(
        getProducts(searchQuery, offset)
      );

      if (response.status === 200) {
        if (response.data?.items.length === 0) {
          setHasMoreData(false);
        } else {
          setProducts(
            currentState =>
              ({
                ...currentState,
                items: [...currentState.items, ...(response.data?.items || [])],
              } as Products)
          );
        }
      }
    };

    if (searchQuery) {
      getProductsList(searchQuery);
    }
  }, [callEndpoint, searchQuery, offset, hasMoreData]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center w-full h-[calc(100dvh_-_80px)]">
      <main className="my-[30px] space-y-0.5 px-3 w-full flex flex-col items-center">
        {currentItems &&
          currentItems.map(product => (
            <Link
              to={`/items/${product.id}`}
              key={product.id}
              className="flex flex-col items-center md:flex-row p-3 bg-white rounded-sm gap-x-6 w-full xl:w-[1200px]"
              state={{
                seller: product.seller,
                installments: product.installments,
              }}
            >
              <ProductItem product={product} />
            </Link>
          ))}
      </main>

      {visiblePages.length > 1 && (
        <Pagination
          totalPages={visiblePages}
          currentPage={currentPage}
          setCurrentPage={onChangePages}
          hasMoraData={hasMoreData}
        />
      )}
    </div>
  );
};

export default ProductList;
