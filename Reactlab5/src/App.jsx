import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import AddProductPage from './pages/AddProductPage'; 
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='product/:id' element={<ProductPage />} />
        <Route path='add-product' element={<AddProductPage />} /> 
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
