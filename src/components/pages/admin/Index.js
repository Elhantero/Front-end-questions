import React from 'react';
import styled from 'styled-components';
import AdminDashboard from '../AdminDashboard';

const Wrapper = styled.div`
    display: grid;
    grid-template-areas:
         "header"
         "article"
         "footer";
    grid-template-rows: 80px 1fr 70px;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    height: 100vh;
    margin: 0;
    color: #2B3674;
    font-family: sans-serif;
    > div {
        padding: 15px;
    }
`;

const Header = styled.div`
    grid-area: header;
    background: #E0E5F2;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
`;

const Footer = styled.div`
    grid-area: footer;
    background: #E0E5F2;
`;

const Article = styled.div`
    grid-area: article;
    background: #E0E5F2;
`;

const Index = () => (
  <Wrapper>
    <Header>Редагування категорій і запитань</Header>
    <Article>
      <AdminDashboard />
    </Article>
    <Footer>Footer</Footer>
  </Wrapper>
);

export default Index;
