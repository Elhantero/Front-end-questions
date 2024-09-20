import React, {useEffect, useState} from 'react';
import {useDispatch, connect} from "react-redux";
import {Article, Nav} from "../../components/styled/styledComponents";
import ExamBlock from "../../components/common/ExamBlock";
import Layout from "../../components/common/layout/Layout";
import {AppDispatch, RootState} from "../../store";
import {fetchQuestionsForExam, fetchQuestionsStatistic} from "../../slices/questionsSlices";
import {selectTotalQuestionsCount, selectReadyQuestionsCount} from "../../selectors/questionsSelectors";
import {createExamResult, fetchExamsCount, fetchExamStatistic} from "../../slices/examSlices";
import { selectTotalCount, selectLastResults, selectAveragePercentResult } from "../../selectors/examSelectors";
const Exam = ({
      totalQuestionsCount,
      readyQuestionsCount,
      totalCount,
      lastResults,
      averagePercentResult,
} : {
    totalQuestionsCount: number,
    readyQuestionsCount: number,
    totalCount: number,
    lastResults: number[],
    averagePercentResult: number,
}) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchExamStatistic());
        dispatch(fetchExamsCount());
        dispatch(fetchQuestionsStatistic());
    }, []);

    const handleClick = () => dispatch(fetchQuestionsForExam({ limit: 10 }));
    const handleSendResult = () => {
        const percentResult = readyQuestionsCount * 100 / totalQuestionsCount;
        dispatch(createExamResult(percentResult));
    }

    return (
        <Layout>
            <Nav id="mainNav">
                <button onClick={handleClick}>Почати новий екзамен</button>
                {/*{readyQuestionsCount} / {totalQuestionsCount}*/}
                {/*<div>*/}
                {/*    lastResults - {lastResults.map(o => (<span>{o}</span>))}*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    totalCount - {totalCount}*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    averagePercentResult - {averagePercentResult}*/}
                {/*</div>*/}
            </Nav>
            <Article id="mainArticle">
                <ExamBlock />

                <div>
                    <button onClick={handleSendResult}>
                        відправити результат
                    </button>
                </div>
            </Article>
        </Layout>
    );
};

const mapStateToProps = (state: RootState) => ({
    totalQuestionsCount: selectTotalQuestionsCount(state),
    readyQuestionsCount: selectReadyQuestionsCount(state),
    totalCount: selectTotalCount(state),
    lastResults: selectLastResults(state),
    averagePercentResult: selectAveragePercentResult(state),
})

export default connect(mapStateToProps)(Exam);
