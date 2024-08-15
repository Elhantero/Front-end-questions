import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchCategories, updateCategoryName } from '../../slices/categorySlices';
import { fetchQuestionsByCategoryId } from '../../slices/questionsSlices';
import { selectCategories, selectCategoriesOrder } from '../../selectors/categoriesSelectors';
import { selectQuestionsOrder } from '../../selectors/questionsSelectors';
import SingleQuestion from './admin/components/SingleQuestion';

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

const Btn = styled.button`
  padding: 15px 30px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #fff;
  border-radius: 5px;
  background-color: #2ecc71;
  max-width: 120px;
  &:hover {
    background-color: #27ae60;
  }
  &:disabled {
    background-color: #a5a5a5;
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
  const [selectedCategoryName, setSetSelectedCategoryName] = useState('');
  const [isDisabledSaveBtn, setIsDisabledSaveBtn] = useState(true);
  const [questionText, setQuestionText] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setSetSelectedCategoryName(categories?.[selectedCategoryId]?.name);
  }, [selectedCategoryId]);

  const handleSelect = (e) => {
    setSetSelectedCategoryId(e.target.value);
    dispatch(fetchQuestionsByCategoryId({ categoryId: e.target.value }));
  };

  const handleTextArea = (e) => {
    setSetSelectedCategoryName(e.target.value);
    setIsDisabledSaveBtn(e.target.value === categories?.[selectedCategoryId]?.name);
  };

  const onClickSave = () => {
    dispatch(updateCategoryName({ categoryId: selectedCategoryId, categoryName: selectedCategoryName }));
    setIsDisabledSaveBtn(true);
  };

  const handleQuestionTextArea = (e) => {
    setQuestionText(e.target.value);
  };

  const onClickSaveQuestion = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categoryId: selectedCategoryId,
        text: questionText,
      }),
    };
    fetch('http://localhost:5000/questions', requestOptions);
  };

  return (
    <Wrapper>
      <EditCategoryBlock>
        <Select name="categories" onChange={handleSelect}>
          <option value="" disabled selected>Оберіть категорію</option>
          {categoriesOrder.map((id) => (
            <option
              key={id}
              value={id}
            >
              {categories?.[id]?.name}
            </option>
          ))}
        </Select>
        <textarea
          disabled={!selectedCategoryId}
          value={selectedCategoryName}
          onChange={handleTextArea}
          maxLength="150"
          rows="2"
        />
        <Btn onClick={onClickSave} disabled={isDisabledSaveBtn}>
          Зберегти
        </Btn>
      </EditCategoryBlock>

      <div>
        <textarea
          value={questionText}
          onChange={handleQuestionTextArea}
        />
        <button onClick={onClickSaveQuestion}>
          save
        </button>
      </div>

      <QuestionsWrapper>
        {questionsOrder.map((id) => (
            <SingleQuestion
              key={id}
              questionId={id}
            />
        ))}
      </QuestionsWrapper>

    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  categories: selectCategories(state),
  categoriesOrder: selectCategoriesOrder(state),
  questionsOrder: selectQuestionsOrder(state),
});

export default connect(mapStateToProps)(AdminDashboard);
