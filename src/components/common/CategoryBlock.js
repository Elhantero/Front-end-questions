/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

const CategoryBlock = ({ currentCategoryName = '' }) => {
  const [readyQuestionsIdx, setReadyQuestionsIdx] = useState([]);

  useEffect(() => {
    const lsData = getFromLs(currentCategoryName);
    if (!lsData?.length) setIntoLs(currentCategoryName, []);
    setReadyQuestionsIdx(lsData.map(Number));
  }, [currentCategoryName]);

  if (!currentCategoryName || !categoryToQuestionsMap?.[currentCategoryName]) return null;

  const handleCheckBox = (e, idx) => {
    if (e.target.checked) {
      setReadyQuestionsIdx(uniq([...readyQuestionsIdx, idx]));
      setIntoLs(currentCategoryName, [...readyQuestionsIdx, idx]);
    } else {
      const newData = [...readyQuestionsIdx];
      remove(newData, (o) => o === idx);
      setReadyQuestionsIdx(newData);
      setIntoLs(currentCategoryName, newData);
    }
  };

  return (
    <Wrapper>
      {categoryToQuestionsMap[currentCategoryName].map((q, idx) => (
        <QuestionItem
          key={`${currentCategoryName}_${idx}`}
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

CategoryBlock.propTypes = {
  currentCategoryName: PropTypes.string,
};

export default CategoryBlock;
