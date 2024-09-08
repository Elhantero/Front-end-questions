import React, {useState} from 'react';
import DOMPurify from 'dompurify';
import EditorConvertToHTML from "../../Editor";
import styled from "styled-components";
import {RootState} from "../../../../store";
import {selectQuestionById} from "../../../../selectors/questionsSelectors";
import {connect, useDispatch} from "react-redux";
import * as questionsTypes from "../../../../helpers/tsTypes/reduxState/questions";
import {updateQuestion} from "../../../../slices/questionsSlices";
import {Btn} from "../questionText/styledComponents";

const BotLine = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    img {
      max-width: 100%;
    }
`;
const QuestionAnswer = ({ questionId, question } : { questionId: number, question: questionsTypes.SingleQuestion }) => {
    const { answer} = question;

    const [isEditAnswer, setIsEditAnswer] = useState(false);
    const [answerValue, setAnswerValue] = useState(answer);

    const dispatch = useDispatch();
    const saveQuestion = (params = {}) => dispatch(updateQuestion(params));
    const onClickEditAnswer = () => setIsEditAnswer(true);
    const onChangeAnswerValue = (html: any) => setAnswerValue(html);

    const delTagsAndTrim = (str) => str.replace(/(<([^>]+)>)/ig, '').trim();
    const onClickSaveAnswer = () => {
        setIsEditAnswer(false);
        // щоб не записувались в бд пусті теги
        const res = delTagsAndTrim(answerValue) ? answerValue : '';
        saveQuestion({ questionId, answer: res });
    };
    const sanitizedData = (data: string) => ({
        __html: DOMPurify.sanitize(data)
    })

    return (
        <BotLine>
            {
                isEditAnswer ? (
                    <div>
                        <EditorConvertToHTML html={answer} onChangeHTML={onChangeAnswerValue}/>
                        <Btn
                            $btnType="save"
                            onClick={onClickSaveAnswer}
                        >
                            Save answer
                        </Btn>
                    </div>

                ) : (
                    <div>
                        <div dangerouslySetInnerHTML={sanitizedData(answer)}></div>
                        <Btn $btnType="edit" onClick={onClickEditAnswer}>Edit answer</Btn>
                    </div>

                )
            }
        </BotLine>
    );
};
const mapStateToProps = (state: RootState, {questionId}: { questionId: number }) => ({
    question: selectQuestionById(state, questionId),
});

export default connect(mapStateToProps)(QuestionAnswer);