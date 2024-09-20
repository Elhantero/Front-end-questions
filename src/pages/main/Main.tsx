import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Nav, Article} from '../../components/styled/styledComponents';
import CategoryBlock from '../../components/common/CategoryBlock';
import {fetchCategories} from '../../slices/categorySlices';
import {AppDispatch} from "../../store";
import Layout from "../../components/common/layout/Layout";
import CategoriesLinkContainer from "./components/CategoriesLinkContainer";

const Main = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <Layout>
      <Nav id="mainNav">
        <CategoriesLinkContainer/>
      </Nav>
      <Article id="mainArticle">
        <CategoryBlock/>
      </Article>
    </Layout>
  );
};

export default Main;
