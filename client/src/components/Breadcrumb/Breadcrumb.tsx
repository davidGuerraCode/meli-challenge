import { useNavigate } from 'react-router';
import { Category } from '../../types/ItemDetails';

type BreadcrumbProps = {
  categories: Category[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categories }) => {
  const navigate = useNavigate();
  return (
    <nav
      aria-label="breadcrumb"
      className="mb-[10px] w-full"
    >
      <ul className="flex items-center font-light opacity-80 gap-x-1">
        <li>
          <button
            onClick={() => navigate(-1)}
            className="text-sm md:text-[15px] text-meli-blue_link font-normal"
          >
            Volver al listado
          </button>
        </li>
        <li>|</li>
        {categories.map(({ id, name }, index) => (
          <>
            <li
              key={id}
              className="text-xs md:text-[15px]"
            >
              {name}
            </li>
            <li>{index < categories.length - 1 && <span>&gt;</span>}</li>
          </>
        ))}
      </ul>
    </nav>
  );
};
export default Breadcrumb;
