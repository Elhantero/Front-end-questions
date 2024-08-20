import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectCurrentCategoryId } from '../../selectors/categoriesSelectors';
import { selectQuestionsOrder } from '../../selectors/questionsSelectors';
import { fetchQuestionsByCategoryId } from '../../slices/questionsSlices';
import SingleQuestion from './SingleQuestion';
import AddQuestion from './AddQuestion';
import { AppDispatch, RootState} from "../../store";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const CategoryBlock = (
    {
      currentCategoryId = 0,
      questionsOrder = [],
    } : {
      currentCategoryId: number,
      questionsOrder: number[],
    }
) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchQuestionsByCategoryId({ categoryId: currentCategoryId }));
  }, [currentCategoryId]);

  return (
    <Wrapper>
      {questionsOrder.map((id) => (
        <SingleQuestion
          key={id}
          questionId={id}
        />
      ))}
      <AddQuestion />
    </Wrapper>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentCategoryId: selectCurrentCategoryId(state),
  questionsOrder: selectQuestionsOrder(state),
});

export default connect(mapStateToProps)(CategoryBlock);
