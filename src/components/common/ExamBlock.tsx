import React, {useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectQuestionsOrder } from '../../selectors/questionsSelectors';
import {fetchQuestionsForExam} from '../../slices/questionsSlices';
import SingleExamQuestion from './SingleExamQuestion';
import { AppDispatch, RootState} from "../../store";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const CategoryBlock = (
    { questionsOrder = [] } : { questionsOrder: number[] }
) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchQuestionsForExam({ limit: 10 }));
  }, []);

  return (
    <Wrapper>
      {questionsOrder.map((id) => (
        <SingleExamQuestion
          key={id}
          questionId={id}
        />
      ))}
    </Wrapper>
  );
};

const mapStateToProps = (state: RootState) => ({
  questionsOrder: selectQuestionsOrder(state),
});

export default connect(mapStateToProps)(CategoryBlock);
