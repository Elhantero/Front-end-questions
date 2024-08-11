import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import flattenDeep from 'lodash/flattenDeep';
import uniq from 'lodash/uniq';
import remove from 'lodash/remove';
import categoryToQuestionsMap from '../../content/categoryToQuestionsMap';
import { getFromLs, setIntoLs } from '../../helpers/localStorage';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const QuestionItem = styled.div`
    padding: 1.2em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    text-decoration: ${(props) => (props.$isReady ? 'line-through' : 'none')};
    color: ${(props) => (props.$isReady ? 'grey' : 'black')};
    background: ${(props) => (props.$isReady ? '#4ce3e9' : 'aliceblue')};
    > input[type=checkbox] {
        transform: scale(2);
        margin: 0 6px 0 0;
        cursor: pointer;
    }
`;

const ExamBlock = () => {
  const [examQuestions, setExamQuestions] = useState([]);
  const [readyQuestionsIdx, setReadyQuestionsIdx] = useState([]);

  const generateExamQuestions = () => {
    const allQuestions = flattenDeep(Object.values(categoryToQuestionsMap));
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    setExamQuestions(shuffled.slice(0, 10));
  };

  useEffect(() => {
    generateExamQuestions();
  }, []);

  const handleCheckBox = (e, idx) => {
    if (e.target.checked) {
      setReadyQuestionsIdx(uniq([...readyQuestionsIdx, idx]));
    } else {
      const newData = [...readyQuestionsIdx];
      remove(newData, (o) => o === idx);
      setReadyQuestionsIdx(newData);
    }
  };

  return (
    <Wrapper>
      <div role="button" onClick={generateExamQuestions}>
        згенерувати 10 випадкових питань
      </div>
      {examQuestions.map((q, idx) => (
        <QuestionItem
          key={`exam_${idx}`}
          $isReady={readyQuestionsIdx.includes(idx)}
        >
          <span>{q}</span>
          <input
            type="checkbox"
            checked={readyQuestionsIdx.includes(idx)}
            onChange={(e) => handleCheckBox(e, idx)}
          />
        </QuestionItem>
      ))}
    </Wrapper>
  );
};

export default ExamBlock;
