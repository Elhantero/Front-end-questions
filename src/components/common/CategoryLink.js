import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import categoryNameTranslates from '../../content/categoryNameTranslates';

const Wrapper = styled(Link)`
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

const CategoryLink = ({ categoryName, currentCategoryName = '' }) => {
  if (!categoryName || !categoryNameTranslates?.[categoryName]) return null;
  return (
    <Wrapper to={`/categories/${categoryName}`} $isActive={categoryName === currentCategoryName}>
      {categoryNameTranslates[categoryName]}
    </Wrapper>
  );
};

CategoryLink.propTypes = {
  categoryName: PropTypes.string.isRequired,
  currentCategoryName: PropTypes.string.isRequired,
};

export default CategoryLink;
