import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/pages/Main';

const App = () => (
  <Routes>
    <Route path="/" element={<Main />}>
      <Route path="categories/:categoryName" element={<Main />} />
    </Route>
  </Routes>
);

export default App;
