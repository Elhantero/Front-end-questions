import React from 'react';
import {Article, Nav} from "../styled/styledComponents";
import ExamBlock from "../common/ExamBlock";
import Layout from "../common/layout/Layout";

const Exam = () => {
    return (
        <Layout>
            <Nav id="mainNav">

            </Nav>
            <Article id="mainArticle">
                <ExamBlock />
            </Article>
        </Layout>
    );
};

export default Exam;