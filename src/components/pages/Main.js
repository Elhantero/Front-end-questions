import React from 'react';
import { Link } from 'react-router-dom';
import {
  BodyWrapper, Header, Nav, Article, Footer,
} from '../styled/styledComponents';
import { categoriesOrder } from '../../constants/categories';
import CategoryBlock from '../common/CategoryBlock';

const Main = () => (
  <BodyWrapper>
    <Header id="pageHeader">Header</Header>
    <Nav id="mainNav">
      <Link to="/">home</Link>
      {categoriesOrder.map((categoryName) => (
        <Link
          key={categoryName}
          to={`/categories/${categoryName}`}
        >
          {categoryName}
        </Link>
      ))}
    </Nav>
    <Article id="mainArticle">
      <CategoryBlock />
    </Article>
    <Footer id="pageFooter">Footer</Footer>
  </BodyWrapper>
);

export default Main;
