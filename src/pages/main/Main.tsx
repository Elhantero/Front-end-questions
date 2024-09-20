import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Nav, Article } from '../../components/styled/styledComponents';
import CategoryBlock from '../../components/common/CategoryBlock';
import CategoryLink from '../../components/common/CategoryLink';
import { fetchCategories, setCurrentCategoryId } from '../../slices/categorySlices';
import { selectCategories, selectCategoriesOrder, selectCategoryNameMapToId } from '../../selectors/categoriesSelectors';
import {CategoryIdToDataMap, CategoryNameToIdMap} from "../../types/categories";
import {AppDispatch, RootState} from "../../store";
import Layout from "../../components/common/layout/Layout";

const Main = (
    {
        categories,
        categoriesOrder,
        categoryNameMapToId,
    } : {
        categories: CategoryIdToDataMap,
        categoriesOrder: number[],
        categoryNameMapToId: CategoryNameToIdMap,
    }
) => {
  type UrlParams = { categoryName: string };
  const { categoryName } = useParams<UrlParams>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
      if (categoryName) dispatch(setCurrentCategoryId(categoryNameMapToId?.[categoryName]));
  });


  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
      <Layout>
          <Nav id="mainNav">
              {categoriesOrder.map((id) => (
                  <CategoryLink
                      key={id}
                      categoryName={categories[id].categoryName}
                      categoryNameTranslaate={categories[id].name}
                      currentCategoryName={categoryName}
                  />
              ))}
          </Nav>
          <Article id="mainArticle">
              {categoryName ? <CategoryBlock /> : null}
          </Article>
      </Layout>
  );
};

const mapStateToProps = (state: RootState) => ({
  categories: selectCategories(state),
  categoriesOrder: selectCategoriesOrder(state),
  categoryNameMapToId: selectCategoryNameMapToId(state),
});

export default connect(mapStateToProps)(Main);
