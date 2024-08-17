import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {addQuestion} from "../../../../slices/questionsSlices";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 15px;
    background: ghostwhite;
    padding: 15px;
    input[type="text"] {
        height: 40px;
        font-size: 16px;
        padding: 3px 10px;
        width: 100%;
        box-sizing: border-box;
    }
`;

const Btn = styled.button`
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: #fff;
    border-radius: 5px;
    background-color: #2ecc71;
    white-space: nowrap;
  &:hover {
    background-color: #27ae60;
  }
  &:disabled {
    background-color: #a5a5a5;
  }
`;

const AddQuestion = ({ selectedCategoryId }) => {
    const [questionText, setQuestionText] = useState('');
    const dispatch = useDispatch();

    const handleQuestionText = (e) => setQuestionText(e.target.value);

    const onClickSaveQuestion = () => {
        if(!questionText) return;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                categoryId: selectedCategoryId,
                text: questionText,
            }),
        };
        fetch('http://localhost:5000/questions', requestOptions)
            .then(res => res.json())
            .then(res => {
                const { categoryId, questionId, text } = res;
                setQuestionText('');
                if(questionId && text) {
                    dispatch(addQuestion({
                        categoryId,
                        questionId,
                        text,
                    }));
                }
            })
            .catch(err => console.log(err, 'AdminDashboard.js'));
    };

    return (
        <Wrapper>
            <input type="text"
                value={questionText}
                onChange={handleQuestionText}
                placeholder="Введіть текст запитання"
            />
                <Btn disabled={!questionText} onClick={onClickSaveQuestion}>
                    Додати нове запитання
                </Btn>
        </Wrapper>
    );
};

export default AddQuestion;