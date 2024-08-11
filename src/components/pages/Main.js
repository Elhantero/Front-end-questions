import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import {
  BodyWrapper, Header, Nav, Article, Footer,
} from '../styled/styledComponents';
import categoriesOrder from '../../constants/categoriesOrder';
import CategoryBlock from '../common/CategoryBlock';
import CategoryLink from '../common/CategoryLink';
import ExamBlock from '../common/ExamBlock';

const Main = () => {
  const { categoryName: currentCategoryName } = useParams();
  const { pathname } = useLocation();
  return (
    <BodyWrapper>
      <Header id="pageHeader">
        <Link to="exam">
          пройти екзамен, 10 випадкових запитань
        </Link>
      </Header>
      <Nav id="mainNav">
        {categoriesOrder.map((categoryName) => (
          <CategoryLink
            key={categoryName}
            categoryName={categoryName}
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

export default Main;
