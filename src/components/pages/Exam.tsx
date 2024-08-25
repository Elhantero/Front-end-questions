import React from 'react';
import {Article, BodyWrapper, Footer, Header, Nav} from "../styled/styledComponents";
import {Link} from "react-router-dom";
import ExamBlock from "../common/ExamBlock";

const Exam = () => {
    return (
        <BodyWrapper>
            <Header id="pageHeader">
                <Link to="/">Запитання по категоріям</Link>
                <span>{` / `}</span>
                <Link to="/exam" >Екзамен</Link>
            </Header>
            <Nav id="mainNav">

            </Nav>
            <Article id="mainArticle">
                <ExamBlock />
            </Article>
            <Footer id="pageFooter">підготовка до співбесід, 2024 р.</Footer>
        </BodyWrapper>
    );
};

export default Exam;