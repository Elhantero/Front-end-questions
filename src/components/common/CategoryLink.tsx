import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface WrapperProps {
  $isActive: boolean
}

const Wrapper = styled(Link)<WrapperProps>`
    background: ${(props) => (props.$isActive ? '#C7E4FA' : 'azure')};
    cursor: pointer;

    &:hover {
        background: #C7E4FA;
    }

    display: flex;
    padding: 15px;
    font-size: 16px;
    line-height: 24px;
    color: black;
    text-decoration: none;
    border: none;

    &:link {
        text-decoration: none;
    }

    &:visited {
        text-decoration: none;
    }

    &:hover {
        text-decoration: none;
    }

    &:active {
        text-decoration: none;
    }
`;

const CategoryLink = (
    { categoryName, currentCategoryName = '', categoryNameTranslaate = '' } : {
      categoryName: string,
      currentCategoryName: string | undefined,
      categoryNameTranslaate: string,
    }) => {
  if (!categoryName || !categoryNameTranslaate) return null;
  return (
    <Wrapper to={`/categories/${categoryName}`} $isActive={categoryName === currentCategoryName}>
      {categoryNameTranslaate}
    </Wrapper>
  );
};

export default CategoryLink;
