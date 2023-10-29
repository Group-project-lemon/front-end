import { Route, Routes } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
import CartPage from './pages/CartPage';
import DeliveryPage from './pages/DeliveryPage';
import ItemsPage from './pages/ItemsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/shopall" element={<MainPage />} />
      <Route path="/items/:itemId" element={<ItemsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/delivery" element={<DeliveryPage />} />
    </Routes>
  );
};

export default App;
