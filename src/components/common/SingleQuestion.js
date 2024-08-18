import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {selectQuestionById} from '../../selectors/questionsSelectors';
import {deleteQuestion, updateQuestion} from '../../slices/questionsSlices';
import Rating from './Rating';

const Wrapper = styled.div`
    display: flex;
    gap: 15px;
    flex-direction: column;
    background: ${((props) => (props.readyStatus && !props.isEditNow ? 'deepskyblue' : 'ghostwhite'))};
    padding: 15px;

    input[type='text'] {
        text-decoration: ${((props) => (props.readyStatus && !props.isEditNow ? 'line-through' : ''))};
    }
`;

const typeToCssMap = {
    save: {
        bgColor: '#2ecc71',
        bgColorHover: '#27ae60',
    },
    edit: {
        bgColor: '#03b1d2',
        bgColorHover: '#04839a',
    },
    del: {
        bgColor: '#e32626',
        bgColorHover: '#af1515',
    },
};

const Btn = styled.button`
    font-size: 18px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: #fff;
    border-radius: 5px;
    background-color: ${(props) => (props.btnType ? typeToCssMap?.[props.btnType].bgColor : '#2ecc71')};
    white-space: nowrap;
    width: 70px;
    height: 40px;

    &:hover {
        background-color: ${(props) => (props.btnType ? typeToCssMap?.[props.btnType].bgColorHover : '#27ae60')};;
    }

    &:disabled {
        background-color: #a5a5a5;
    }
`;

const Label = styled.label`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 24px;
    justify-content: center;
    box-sizing: border-box;
    padding: 0;
    cursor: pointer;
    user-select: none;
    border-radius: 50%;
    color: #73beff;
    border: 1px solid #73beff;
`;

const TopLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;

    > div:first-child {
        width: 100%;
    }

    > div:last-child {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    input[type="text"] {
        height: 40px;
        font-size: 16px;
        padding: 3px 10px;
        width: 100%;
        box-sizing: border-box;
    }
`;

const BotLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const BtnWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    input[type=checkbox] {
        transform: scale(3);
        margin: 0 6px 0 0;
        cursor: pointer;
        margin-right: 15px;
    }
`;

const SingleQuestion = ({questionId, question}) => {
    const {text, readyStatus, rating} = question;
    const [questionText, setQuestionText] = useState('');
    const [isEditNow, setIsEditNow] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const dispatch = useDispatch();
    const saveQuestion = (params = {}) => dispatch(updateQuestion(params));

    useEffect(() => {
        setQuestionText(text);
    }, [text]);

    useEffect(() => {
        setQuestionText(text);
    }, [text]);

    const handleRating = (e) => saveQuestion({questionId, rating: e.target.value});
    const handleReadyStatus = (e) => saveQuestion({questionId, readyStatus: e.target.checked});
    const handleQuestionTextArea = (e) => {
        setQuestionText(e.target.value);
    };

    const onClickEdit = () => setIsEditNow(true);

    const onClickSave = () => {
        setIsEditNow(false);
        if (questionText && questionText !== text) {
            saveQuestion({questionId, text: questionText});
        }
    };

    const handleShowHideSettings = (e) => setShowSettings(e.target.checked);

    const onClickDelete = () => {
        const reallyDelete = window.confirm('Видалити це питання?');
        if (!reallyDelete) return;
        dispatch(deleteQuestion({questionId}))
    };

    return (
        <Wrapper readyStatus={readyStatus} isEditNow={isEditNow}>

            <TopLine>
                <div>
                    <input
                        disabled={!isEditNow}
                        type="text"
                        value={questionText}
                        onChange={handleQuestionTextArea}
                    />
                </div>

                <div>
                    <input hidden type="checkbox" name={questionId} id={questionId} onChange={handleShowHideSettings}/>
                    <Label htmlFor={questionId}>
                        {showSettings ? '-' : '+'}
                    </Label>
                </div>
            </TopLine>

            {
                showSettings ? (
                    <BotLine>
                        <Rating rating={rating} handleRating={handleRating} questionId={questionId}/>

                        <BtnWrapper>
                            <input
                                type="checkbox"
                                onChange={handleReadyStatus}
                                checked={readyStatus}
                                title="Зміна статусу готовності, готові питання виводяться в кінці"
                            />
                            {
                                isEditNow
                                    ? (
                                        <Btn
                                            btnType="save"
                                            onClick={onClickSave}
                                            disabled={!questionText || questionText === text}
                                        >
                                            Save
                                        </Btn>
                                    )
                                    : <Btn btnType="edit" onClick={onClickEdit}>Edit</Btn>
                            }
                            <Btn btnType="del" onClick={onClickDelete}>Del</Btn>
                        </BtnWrapper>
                    </BotLine>
                ) : null
            }

        </Wrapper>
    );
};

const mapStateToProps = (state, {questionId}) => ({
    question: selectQuestionById(state, questionId),
});

export default connect(mapStateToProps)(SingleQuestion);
