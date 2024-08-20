import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  BodyWrapper, Header, Nav, Article, Footer,
} from '../styled/styledComponents';
import CategoryBlock from '../common/CategoryBlock';
import CategoryLink from '../common/CategoryLink';
import { fetchCategories, setCurrentCategoryId } from '../../slices/categorySlices';
import { selectCategories, selectCategoriesOrder, selectCategoryNameMapToId } from '../../selectors/categoriesSelectors';
import MainStore from '../../helpers/tsTypes/reduxState/mainStore';
import {CategoryIdToDataMap, CategoryNameToIdMap} from "../../helpers/tsTypes/reduxState/categories/categories";
import {AppDispatch} from "../../store";

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
  }, [categoryName]);


  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <BodyWrapper>
      <Header id="pageHeader">Буде ще якась навігація</Header>
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
      <Footer id="pageFooter">підготовка до співбесід, 2024 р.</Footer>
    </BodyWrapper>
  );
};

const mapStateToProps = (state: MainStore) => ({
  categories: selectCategories(state),
  categoriesOrder: selectCategoriesOrder(state),
  categoryNameMapToId: selectCategoryNameMapToId(state),
});

export default connect(mapStateToProps)(Main);
