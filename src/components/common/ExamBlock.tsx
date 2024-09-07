import React, {useEffect, memo} from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectQuestionsOrder } from '../../selectors/questionsSelectors';
import {fetchQuestionsForExam} from '../../slices/questionsSlices';
import SingleQuestion from '../common/singleQuestion/SingleQuestion';
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

  if(!questionsOrder?.length) return null;
  return (
    <Wrapper>
      {questionsOrder.map((id) => (
        <SingleQuestion
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

export default connect(mapStateToProps)(memo(CategoryBlock));
