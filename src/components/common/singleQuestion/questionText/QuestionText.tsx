import React, {useState} from 'react';
import {connect, useDispatch} from "react-redux";
import useInput from "../../../../hooks/useInput";
import {AppDispatch, RootStateType} from "../../../../store";
import {selectQuestionById} from "../../../../selectors/questionsSelectors";
import * as questionsTypes from "../../../../types/questions";
import {Wrapper, BtnWrapper, Label, Btn} from "./styledComponents";
import {deleteQuestion, updateQuestion} from "../../../../slices/questionsSlices";

const QuestionText = ({questionId, question}: { questionId: number, question: questionsTypes.SingleQuestion }) => {
    const {text, readyStatus} = question;
    const [isEditNow, setIsEditNow] = useState(false);
    const [inputValue, handleInputValue] = useInput(text);
    const [showSettings, setShowSettings] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const saveQuestion = (params = {}) => dispatch(updateQuestion(params));
    const onClickEdit = () => setIsEditNow((prevState) => !prevState);
    const onClickSave = () => {
        setIsEditNow(false);
        if (inputValue && inputValue !== text) {
            saveQuestion({questionId, text: inputValue});
        }
    };
    const onClickDelete = () => {
        const reallyDelete = window.confirm('Видалити це питання?');
        if (!reallyDelete) return;
        dispatch(deleteQuestion({questionId}));
    };
    const handleReadyStatus = (e: React.ChangeEvent<HTMLInputElement>) => saveQuestion({
        questionId,
        readyStatus: e.target.checked,
    });
    const handleShowHideSettings = (e: React.ChangeEvent<HTMLInputElement>) => setShowSettings(e.target.checked);

    return (
        <Wrapper>
            <input
                disabled={!isEditNow}
                type="text"
                value={inputValue}
                onChange={handleInputValue}
            />

            <BtnWrapper>
                {showSettings ? (
                    <>
                        <Btn
                            $btnType={isEditNow ? 'save' : 'edit'}
                            onClick={isEditNow ? onClickSave : onClickEdit}
                            disabled={!inputValue}
                        >
                            {isEditNow ? 'Save' : 'Edit'}
                        </Btn>
                        <Btn $btnType="del" onClick={onClickDelete}>Del</Btn>
                        <input
                            type="checkbox"
                            onChange={handleReadyStatus}
                            checked={!!readyStatus}
                            title="Зміна статусу готовності, готові питання виводяться в кінці"
                        />
                    </>
                ) : null }
                <input
                    hidden
                    type="checkbox"
                    name={`${questionId.toString()}_settings`}
                    id={`${questionId.toString()}_settings`}
                    onChange={handleShowHideSettings}
                />
                <Label htmlFor={`${questionId.toString()}_settings`} $readyStatus={!!readyStatus}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill={readyStatus ? "#fff" : "#73BEFFFF"} height="24px" width="24px" version="1.1"
                         id="Capa_1" viewBox="0 0 54 54">
                        <g>
                            <path
                                d="M51.22,21h-5.052c-0.812,0-1.481-0.447-1.792-1.197s-0.153-1.54,0.42-2.114l3.572-3.571   c0.525-0.525,0.814-1.224,0.814-1.966c0-0.743-0.289-1.441-0.814-1.967l-4.553-4.553c-1.05-1.05-2.881-1.052-3.933,0l-3.571,3.571   c-0.574,0.573-1.366,0.733-2.114,0.421C33.447,9.313,33,8.644,33,7.832V2.78C33,1.247,31.753,0,30.22,0H23.78   C22.247,0,21,1.247,21,2.78v5.052c0,0.812-0.447,1.481-1.197,1.792c-0.748,0.313-1.54,0.152-2.114-0.421l-3.571-3.571   c-1.052-1.052-2.883-1.05-3.933,0l-4.553,4.553c-0.525,0.525-0.814,1.224-0.814,1.967c0,0.742,0.289,1.44,0.814,1.966l3.572,3.571   c0.573,0.574,0.73,1.364,0.42,2.114S8.644,21,7.832,21H2.78C1.247,21,0,22.247,0,23.78v6.439C0,31.753,1.247,33,2.78,33h5.052   c0.812,0,1.481,0.447,1.792,1.197s0.153,1.54-0.42,2.114l-3.572,3.571c-0.525,0.525-0.814,1.224-0.814,1.966   c0,0.743,0.289,1.441,0.814,1.967l4.553,4.553c1.051,1.051,2.881,1.053,3.933,0l3.571-3.572c0.574-0.573,1.363-0.731,2.114-0.42   c0.75,0.311,1.197,0.98,1.197,1.792v5.052c0,1.533,1.247,2.78,2.78,2.78h6.439c1.533,0,2.78-1.247,2.78-2.78v-5.052   c0-0.812,0.447-1.481,1.197-1.792c0.751-0.312,1.54-0.153,2.114,0.42l3.571,3.572c1.052,1.052,2.883,1.05,3.933,0l4.553-4.553   c0.525-0.525,0.814-1.224,0.814-1.967c0-0.742-0.289-1.44-0.814-1.966l-3.572-3.571c-0.573-0.574-0.73-1.364-0.42-2.114   S45.356,33,46.168,33h5.052c1.533,0,2.78-1.247,2.78-2.78V23.78C54,22.247,52.753,21,51.22,21z M52,30.22   C52,30.65,51.65,31,51.22,31h-5.052c-1.624,0-3.019,0.932-3.64,2.432c-0.622,1.5-0.295,3.146,0.854,4.294l3.572,3.571   c0.305,0.305,0.305,0.8,0,1.104l-4.553,4.553c-0.304,0.304-0.799,0.306-1.104,0l-3.571-3.572c-1.149-1.149-2.794-1.474-4.294-0.854   c-1.5,0.621-2.432,2.016-2.432,3.64v5.052C31,51.65,30.65,52,30.22,52H23.78C23.35,52,23,51.65,23,51.22v-5.052   c0-1.624-0.932-3.019-2.432-3.64c-0.503-0.209-1.021-0.311-1.533-0.311c-1.014,0-1.997,0.4-2.761,1.164l-3.571,3.572   c-0.306,0.306-0.801,0.304-1.104,0l-4.553-4.553c-0.305-0.305-0.305-0.8,0-1.104l3.572-3.571c1.148-1.148,1.476-2.794,0.854-4.294   C10.851,31.932,9.456,31,7.832,31H2.78C2.35,31,2,30.65,2,30.22V23.78C2,23.35,2.35,23,2.78,23h5.052   c1.624,0,3.019-0.932,3.64-2.432c0.622-1.5,0.295-3.146-0.854-4.294l-3.572-3.571c-0.305-0.305-0.305-0.8,0-1.104l4.553-4.553   c0.304-0.305,0.799-0.305,1.104,0l3.571,3.571c1.147,1.147,2.792,1.476,4.294,0.854C22.068,10.851,23,9.456,23,7.832V2.78   C23,2.35,23.35,2,23.78,2h6.439C30.65,2,31,2.35,31,2.78v5.052c0,1.624,0.932,3.019,2.432,3.64   c1.502,0.622,3.146,0.294,4.294-0.854l3.571-3.571c0.306-0.305,0.801-0.305,1.104,0l4.553,4.553c0.305,0.305,0.305,0.8,0,1.104   l-3.572,3.571c-1.148,1.148-1.476,2.794-0.854,4.294c0.621,1.5,2.016,2.432,3.64,2.432h5.052C51.65,23,52,23.35,52,23.78V30.22z"/>
                            <path
                                d="M27,18c-4.963,0-9,4.037-9,9s4.037,9,9,9s9-4.037,9-9S31.963,18,27,18z M27,34c-3.859,0-7-3.141-7-7s3.141-7,7-7   s7,3.141,7,7S30.859,34,27,34z"/>
                        </g>
                    </svg>
                </Label>

            </BtnWrapper>
        </Wrapper>
    );
};

const mapStateToProps = (state: RootStateType, {questionId}: { questionId: number }) => ({
    question: selectQuestionById(state, questionId),
});

export default connect(mapStateToProps)(QuestionText);
