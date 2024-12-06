import cn from '../../lib/cn';

type PaginationProps = {
  currentPage: number;
  totalPages: number[];
  hasMoraData: boolean;
  setCurrentPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  hasMoraData,
}) => {
  return (
    <footer className="flex justify-center bg-[#f5f5f7] py-4 w-full mt-auto gap-x-2">
      {currentPage > 1 && (
        <button onClick={() => setCurrentPage(currentPage - 1)}>
          {'<'} Anterior
        </button>
      )}
      {totalPages.map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          disabled={page === currentPage}
          className={cn(
            'flex items-center justify-center py-1 font-semibold opacity-90 w-7 h-7',
            {
              'border-meli-blue_link bg-white border rounded-md':
                page === currentPage,
            }
          )}
        >
          {page}
        </button>
      ))}
      {hasMoraData && (
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          Siguiente {'>'}
        </button>
      )}
    </footer>
  );
};

export default Pagination;
