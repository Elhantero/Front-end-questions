import styled from 'styled-components';

export const BodyWrapper = styled.div`
    display: grid;
    grid-template-areas: 
    "header header"
    "nav article"
    "footer footer";
    grid-template-rows: 80px 1fr 70px;
    grid-template-columns: minmax(300px, 25%) 1fr;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    height: 100vh;
    margin: 0;
    > header, footer, article, nav, div {
        padding: 1.2em;
        background: yellowgreen;
    }
    @media (max-width: 768px) {
        grid-template-areas: 
          "header"
          "nav"
          "article"
          "footer";
        grid-template-rows: 80px 1fr 1fr 70px;
        grid-template-columns: 1fr;
    }
`;

export const Header = styled.header`
    grid-area: header;
`;
export const Article = styled.header`
    grid-area: article;
`;
export const Nav = styled.header`
    grid-area: nav;
    display: flex;
    flex-direction: column;
`;
export const Footer = styled.header`
    grid-area: footer;
`;
