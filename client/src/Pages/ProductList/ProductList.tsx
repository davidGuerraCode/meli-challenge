import React from 'react';
import { Link, useSearchParams } from 'react-router';
import { Pagination } from '../../components';
import ProductItem from '../../components/ProductItem/ProductItem';
import useFetchWithLoader from '../../hooks/useFetchWithLoader';
import { getProducts } from '../../services/products.service';
import { Products } from '../../types/Products';

const ITEMS_PER_PAGE = 10;
const PAGES_PER_BATCH = 5;
const ProductList = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [offset, setOffset] = React.useState(0);
  const [products, setProducts] = React.useState<Products>({
    items: [],
    categories: [],
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const { callEndpoint, loading } = useFetchWithLoader();

  const visiblePages = Array.from(
    { length: PAGES_PER_BATCH + 1 },
    (_, i) => offset * PAGES_PER_BATCH + i + 1
  );
  const currentItems = products.items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const changePages = (page: number) => {
    if (page === Math.max(...visiblePages)) {
      setOffset(current => ++current);
    }
    // else if (page === Math.min(...visiblePages)) {
    //   setOffset(current => Math.max(1, current - 1));
    // }

    setCurrentPage(page);
  };

  React.useEffect(() => {
    const getProductsList = async (searchQuery: string) => {
      const response = await callEndpoint<Products>(
        getProducts(searchQuery, offset)
      );

      if (response.status === 200) {
        setProducts(
          currentState =>
            ({
              ...currentState,
              items: [...currentState.items, ...(response.data?.items || [])],
            } as Products)
        );
      }
    };

    if (searchQuery) {
      getProductsList(searchQuery);
    }
  }, [callEndpoint, searchQuery, offset]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
          setCurrentPage={changePages}
        />
      )}
    </div>
  );
};

export default ProductList;
