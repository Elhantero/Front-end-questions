import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchCategories, updateCategoryName } from '../../../../slices/categorySlices';
import { fetchQuestionsByCategoryId } from '../../../../slices/questionsSlices';
import { selectCategories, selectCategoriesOrder } from '../../../../selectors/categoriesSelectors';
import { selectQuestionsOrder } from '../../../../selectors/questionsSelectors';
import SingleQuestion from './SingleQuestion';
import AddQuestion from "./AddQuestion";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Select = styled.select`
  font-size: 18px;
  width: fit-content;
  height: 50px;
  line-height: 24px;
  box-sizing: border-box;
  padding: 10px 20px;
  background: #EFF4FB;
`;

const EditCategoryBlock = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: fit-content;
    gap: 10px;
    > textarea {
      padding: 15px;
      font-size: 18px;
    }
`;


const QuestionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const AdminDashboard = ({
  categories, categoriesOrder, questionsOrder,
}) => {
  const [selectedCategoryId, setSetSelectedCategoryId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSelect = (e) => {
    setSetSelectedCategoryId(e.target.value);
    dispatch(fetchQuestionsByCategoryId({ categoryId: e.target.value }));
  };

  return (
    <Wrapper>
      <Select name="categories" onChange={handleSelect}>
        <option value="" disabled selected>Оберіть категорію</option>
        {categoriesOrder.map((id) => (
            <option key={id} value={id}>
              {categories?.[id]?.name}
            </option>
        ))}
      </Select>

      {selectedCategoryId ? <AddQuestion selectedCategoryId={selectedCategoryId} /> : null}

      {selectedCategoryId
          ? (<QuestionsWrapper>
            {questionsOrder.map((id) => (
                <SingleQuestion key={id} questionId={id}/>
            ))}
          </QuestionsWrapper>) : null}

    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  categories: selectCategories(state),
  categoriesOrder: selectCategoriesOrder(state),
  questionsOrder: selectQuestionsOrder(state),
});

export default connect(mapStateToProps)(AdminDashboard);
