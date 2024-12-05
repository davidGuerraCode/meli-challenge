import { Outlet } from 'react-router';
import { Header } from '../../components';

const Home = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default Home;
