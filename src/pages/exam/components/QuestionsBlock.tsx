import React from 'react';
import styled from 'styled-components';
import Questions from "../../../components/common/questions/Questions";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const QuestionsBlock = () => {
  return (
    <Wrapper>
      <Questions />
    </Wrapper>
  );
};

export default QuestionsBlock;
