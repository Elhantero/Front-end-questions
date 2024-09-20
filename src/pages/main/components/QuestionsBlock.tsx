import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import styled from 'styled-components';
import Questions from "../../../components/common/questions/Questions";
import AddQuestion from '../../../components/common/addQuestion/AddQuestion';
import {selectCurrentCategoryId} from '../../../selectors/categoriesSelectors';
import {fetchQuestionsByCategoryId} from '../../../slices/questionsSlices';
import {AppDispatch, RootStateType} from "../../../store";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const QuestionsBlock = ({ currentCategoryId }: { currentCategoryId: number }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchQuestionsByCategoryId({categoryId: currentCategoryId}));
  }, [currentCategoryId]);

  return (
    <Wrapper>
      {currentCategoryId ? <Questions /> : null}
      {currentCategoryId ? <AddQuestion/> : null}
      {!currentCategoryId ? <div>Please, select category</div> : null}
    </Wrapper>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  currentCategoryId: selectCurrentCategoryId(state),
});

export default connect(mapStateToProps)(QuestionsBlock);
