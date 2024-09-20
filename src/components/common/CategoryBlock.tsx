import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {selectCurrentCategoryId} from '../../selectors/categoriesSelectors';
import {selectQuestionsOrder} from '../../selectors/questionsSelectors';
import {fetchQuestionsByCategoryId} from '../../slices/questionsSlices';
import SingleQuestionWitnAnswer from './singleQuestion/SingleQuestion';
import AddQuestion from './AddQuestion';
import {AppDispatch, RootStateType} from "../../store";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const CategoryBlock = (
  {
    currentCategoryId = 0,
    questionsOrder = [],
  }: {
    currentCategoryId: number,
    questionsOrder: number[],
  }
) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchQuestionsByCategoryId({categoryId: currentCategoryId}));
  }, [currentCategoryId]);

  if (!currentCategoryId) {
    return (
      <div>
        Please, select category
      </div>
    )
  }

  return (
    <Wrapper>
      {questionsOrder.map((id) => (
        <SingleQuestionWitnAnswer
          key={id}
          questionId={id}
        />
      ))}
      <AddQuestion/>
    </Wrapper>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  currentCategoryId: selectCurrentCategoryId(state),
  questionsOrder: selectQuestionsOrder(state),
});

export default connect(mapStateToProps)(CategoryBlock);
