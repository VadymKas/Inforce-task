import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../services/utils/routes';
import ProductList from '../ProductList';
import ProductCard from '../ProductCard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={<ProductList />}
      />
      <Route
        path={ROUTES.PRODUCT}
        element={<ProductCard />}
      />
    </Routes>
  );
};

export default AppRoutes;
