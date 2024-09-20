import React, {useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import CategoryLink from "./CategoryLink";
import {AppDispatch, RootStateType} from "../../../store";
import {selectCategoriesOrder, selectCategoryNameMapToId} from "../../../selectors/categoriesSelectors";
import {useParams} from "react-router-dom";
import {setCurrentCategoryId} from "../../../slices/categorySlices";
import {CategoryNameToIdMap} from "../../../types/categories";

const CategoriesLinkContainer = (
  {
    categoriesOrder,
    categoryNameMapToId
  } : {
    categoriesOrder: number[],
    categoryNameMapToId: CategoryNameToIdMap
  }) => {
  type UrlParams = { categoryName: string };
  const { categoryName } = useParams<UrlParams>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if(categoryName) {
      dispatch(setCurrentCategoryId(categoryNameMapToId?.[categoryName]))
    }
  });

  if(!categoriesOrder?.length) return null;

  return (
    <>
      {categoriesOrder.map((categoryId) => (
        <CategoryLink key={categoryId} categoryId={categoryId} />
      ))}
    </>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  categoriesOrder: selectCategoriesOrder(state),
  categoryNameMapToId: selectCategoryNameMapToId(state),
});

export default connect(mapStateToProps)(CategoriesLinkContainer);
