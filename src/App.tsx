import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './components/pages/Main';
import Exam from './components/pages/Exam';
import { store } from "./store";

const App = () => (
  <Provider store={store}>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/categories" element={<Main />} />
      <Route path="/categories/:categoryName" element={<Main />} />
      <Route path="/exam" element={<Exam />} />
    </Routes>
  </Provider>
);

export default App;
