import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Article, Nav} from "../../components/styled/styledComponents";
import QuestionsBlock from "./components/QuestionsBlock";
import Layout from "../../components/common/layout/Layout";
import {AppDispatch} from "../../store";
import {fetchQuestionsForExam} from "../../slices/questionsSlices";

const Exam = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loadNewQuestions = () => dispatch(fetchQuestionsForExam({ limit: 10 }));

    useEffect(() => {
      loadNewQuestions();
    }, []);

    return (
        <Layout>
            <Nav id="mainNav">
                <button onClick={loadNewQuestions}>Почати новий екзамен</button>
            </Nav>
            <Article id="mainArticle">
                <QuestionsBlock />
            </Article>
        </Layout>
    );
};

export default Exam;
