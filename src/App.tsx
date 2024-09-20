import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './pages/main/Main';
import Exam from './pages/exam/Exam';
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
