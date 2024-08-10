import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './components/pages/Main';
import CategoryPage from './components/pages/CategoryPage';

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/categories/:categoryName" element={<CategoryPage />} />
  </Routes>
);

export default RoutesComponent;
