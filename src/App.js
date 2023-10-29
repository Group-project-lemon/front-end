import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CartPage from './pages/CartPage';
import DeliveryPage from './pages/DeliveryPage';
import GoodsPage from './pages/GoodsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import CartegoryPage from './pages/CartegoryPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/shopall" element={<MainPage />} />
      <Route path="/products/:productID" element={<CartegoryPage />} />
      <Route path="/goods/:goodID" element={<GoodsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/delivery" element={<DeliveryPage />} />
    </Routes>
  );
};

export default App;
