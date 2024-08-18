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

const Main = ({ categories, categoriesOrder, categoryNameMapToId }) => {
  const { categoryName: currentCategoryName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentCategoryId(categoryNameMapToId?.[currentCategoryName]));
  }, [categoryNameMapToId, currentCategoryName, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <BodyWrapper>
      <Header id="pageHeader">Буде ще якась навігація</Header>
      <Nav id="mainNav">
        {categoriesOrder.map((id) => (
          <CategoryLink
            key={id}
            categoryName={categories[id].categoryName}
            categoryNameTranslaate={categories[id].name}
            currentCategoryName={currentCategoryName}
          />
        ))}
      </Nav>
      <Article id="mainArticle">
        {currentCategoryName ? <CategoryBlock currentCategoryName={currentCategoryName} /> : null}
      </Article>
      <Footer id="pageFooter">підготовка до співбесід, 2024 р.</Footer>
    </BodyWrapper>
  );
};

const mapStateToProps = (state) => ({
  categories: selectCategories(state),
  categoriesOrder: selectCategoriesOrder(state),
  categoryNameMapToId: selectCategoryNameMapToId(state),
});

export default connect(mapStateToProps)(Main);
