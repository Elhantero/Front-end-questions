import React from 'react';
import {connect} from "react-redux";
import {RootStateType} from "../../../store";
import {selectCategoryById, selectCurrentCategoryId} from "../../../selectors/categoriesSelectors";
import {SingleCategory} from "../../../types/categories";
import {LinkWrapper} from "./styled/categoryLinkStyled";

const CategoryLink = (
  {
    categoryId,
    currentCategoryId,
    category,
  }: {
    categoryId: number,
    currentCategoryId: number
    category: SingleCategory,
  }) => {
  if (!categoryId || !category) return null;
  const { categoryName, name} = category;
  return (
    <LinkWrapper
      to={`/categories/${categoryName}`}
      $isActive={categoryId === currentCategoryId}
    >
      {name}
    </LinkWrapper>
  );
};

const mapStateToProps = (state: RootStateType, {categoryId}) => ({
  category: selectCategoryById(state, categoryId),
  currentCategoryId: selectCurrentCategoryId(state),
});

export default connect(mapStateToProps)(CategoryLink);
