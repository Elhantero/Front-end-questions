import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { categoriesOrder } from '../../constants/categories';

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Main = () => (
  <MainWrapper>
    <Link to="/">home</Link>
    {categoriesOrder.map((categoryName) => (
      <Link
        key={categoryName}
        to={`/categories/${categoryName}`}
      >
        {categoryName}
      </Link>
    ))}
  </MainWrapper>
);

export default Main;
