import React from 'react';

type UsePagination<T> = {
  itemsPerPage: number;
  pagesPerBatch: number;
  data: T[];
};

const usePagination = <T>({
  itemsPerPage,
  pagesPerBatch,
  data,
}: UsePagination<T>) => {
  const [offset, setOffset] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const currentItems = React.useMemo(
    () =>
      data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [currentPage, data, itemsPerPage]
  );
  const visiblePages = React.useMemo(
    () =>
      Array.from(
        { length: pagesPerBatch + 1 },
        (_, i) => offset * pagesPerBatch + i + 1
      ),
    [offset, pagesPerBatch]
  );
  const changePage = React.useCallback(
    (page: number) => {
      if (page === Math.max(...visiblePages)) {
        setOffset(current => ++current);
      } else if (page > 0 && page <= Math.min(...visiblePages)) {
        setOffset(current => Math.max(0, current - 1));
      }

      setCurrentPage(page);
    },
    [visiblePages]
  );

  return {
    currentPage,
    changePage,
    offset,
    visiblePages,
    currentItems,
  };
};

export default usePagination;
