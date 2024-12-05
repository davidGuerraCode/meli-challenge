import { Link, useNavigate } from 'react-router';
import SearchIcon from '../../assets/icons/ic_Search@2x.png.png';
import Logo from '../../assets/images/logo_large_25years@2x.png';

const Header = () => {
  const navigate = useNavigate();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchQuery = (e.target as HTMLFormElement).search.value;

    navigate(`/items?search=${searchQuery}`);
  };

  return (
    <header className="flex justify-center w-full p-3 bg-meli-yellow">
      <section className="w-full xl:w-[1200px] flex justify-between items-center">
        <Link to="/">
          <img
            src={Logo}
            alt="meli-log"
            className="h-[34px] hidden md:block"
          />
        </Link>
        <section className="w-full md:w-3/4 xl:w-[1018px]">
          <form
            className="bg-white rounded-sm shadow-md"
            onSubmit={onSubmitHandler}
          >
            <div className="flex">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Buscar productos, marcas y más…"
                className="w-full h-[34px] px-5 py-2 placeholder:font-normal placeholder:text-black placeholder:opacity-55 outline-none"
              />

              <button
                type="submit"
                className=""
              >
                <img
                  src={SearchIcon}
                  alt="search-icon"
                  className="h-4 px-3 border-l border-gray-300"
                />
              </button>
            </div>
          </form>
        </section>
      </section>
    </header>
  );
};

export default Header;
