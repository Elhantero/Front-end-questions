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
    color: #2B3674;
    font-family: sans-serif;
    > div {
        padding: 15px;
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
export const Header = styled.div`
    grid-area: header;
    background: #E0E5F2;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    gap: 20px;
    a {
        text-decoration: none;
        color: #5667c0;
    }
`;

export const Nav = styled.div`
    grid-area: nav;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #E0E5F2;
`;

export const Footer = styled.div`
    grid-area: footer;
    background: #E0E5F2;
`;

export const Article = styled.div`
    grid-area: article;
    background: #E0E5F2;
`;
