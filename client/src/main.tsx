import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import './index.css';
import { Home, ProductDetails, ProductList } from './Pages';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Home />}>
          <Route
            index
            element={<App />}
          />
          <Route
            path="/items"
            element={<ProductList />}
          />
          <Route
            path="/items/:id"
            element={<ProductDetails />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
