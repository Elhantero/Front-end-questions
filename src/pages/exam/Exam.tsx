import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import styled from "styled-components";
import {Article, Nav} from "../../components/styled/styledComponents";
import QuestionsBlock from "./components/QuestionsBlock";
import Layout from "../../components/common/layout/Layout";
import {AppDispatch} from "../../store";
import {fetchQuestionsForExam} from "../../slices/questionsSlices";

const Btn = styled.button`
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: #fff;
    border-radius: 5px;
    background-color: #2e7ccc;
    white-space: nowrap;

    &:hover {
        background-color: #215d9b;
    }
`

const Exam = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loadNewQuestions = () => dispatch(fetchQuestionsForExam({ limit: 10 }));

    useEffect(() => {
      loadNewQuestions();
    }, []);

    return (
        <Layout>
            <Nav id="mainNav">
                <Btn type="button" onClick={loadNewQuestions}>Почати новий екзамен</Btn>
            </Nav>
            <Article id="mainArticle">
                <QuestionsBlock />
            </Article>
        </Layout>
    );
};

export default Exam;
