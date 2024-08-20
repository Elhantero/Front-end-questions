import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { createQuestion } from '../../slices/questionsSlices';
import { selectCurrentCategoryId } from '../../selectors/categoriesSelectors';
import {RootState, AppDispatch} from "../../store";

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

const AddQuestion = ({ currentCategoryId } : { currentCategoryId: number }) => {
  const [questionText, setQuestionText] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleQuestionText = (e: React.ChangeEvent<HTMLInputElement>) => setQuestionText(e.target.value);

  const onClickSaveQuestion = () => {
    if (currentCategoryId && questionText) {
      dispatch(createQuestion({
        categoryId: currentCategoryId,
        text: questionText,
      }));
      setQuestionText('');
    }
  };

  return (
    <Wrapper>
      <input
        type="text"
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

const mapStateToProps = (state: RootState) => ({
  currentCategoryId: selectCurrentCategoryId(state),
});

export default connect(mapStateToProps)(AddQuestion);
