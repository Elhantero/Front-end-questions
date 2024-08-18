import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import Main from './components/pages/Main';
import categoriesReducer from './slices/categorySlices';
import questionsReducer from './slices/questionsSlices';

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        questions: questionsReducer,
    },
});

const App = () => (
    <Provider store={store}>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/categories" element={<Main/>}/>
            <Route path="/categories/:categoryName" element={<Main/>}/>
            <Route path="/exam" element={<Main/>}/>
        </Routes>
    </Provider>
);

export default App;
