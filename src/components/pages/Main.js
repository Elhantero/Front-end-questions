import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  BodyWrapper, Header, Nav, Article, Footer,
} from '../styled/styledComponents';
import CategoryBlock from '../common/CategoryBlock';
import CategoryLink from '../common/CategoryLink';
import ExamBlock from '../common/ExamBlock';
import { fetchCategories } from '../../slices/categorySlices';
import {selectCategories, selectCategoriesOrder} from '../../selectors/categoriesSelectors';

const Main = ({ categories, categoriesOrder }) => {
  const { categoryName: currentCategoryName } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <BodyWrapper>
      <Header id="pageHeader">
        <Link to="exam">
          пройти екзамен, 10 випадкових запитань
        </Link>
        <Link to="adminDashboard">
          адмінка
        </Link>
      </Header>
      <Nav id="mainNav">
        {categoriesOrder.map((id) => (
          <CategoryLink
            key={id}
            categoryName={categories[id].categoryName}
            currentCategoryName={currentCategoryName}
          />
        ))}
      </Nav>
      <Article id="mainArticle">
        {pathname === '/exam' ? <ExamBlock /> : null}
        {currentCategoryName ? <CategoryBlock currentCategoryName={currentCategoryName} /> : null}
      </Article>
      <Footer id="pageFooter">Footer</Footer>
    </BodyWrapper>
  );
};

const mapStateToProps = (state) => ({
  categories: selectCategories(state),
  categoriesOrder: selectCategoriesOrder(state),
});

export default connect(mapStateToProps)(Main);
