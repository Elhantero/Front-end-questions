import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectQuestionById } from '../../../../selectors/questionsSelectors';
import { deleteQuestion, updateQuestion} from "../../../../slices/questionsSlices";

const Wrapper = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: space-between;
    background: ghostwhite;
    padding: 15px;
    > div:first-child {
      width: 100%;
    }
    > div:last-child {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    input[type="text"] {
        height: 40px;
        font-size: 16px;
        padding: 3px 10px;
        width: 100%;
        box-sizing: border-box;
    }
`;

const BtnEdit = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #fff;
  border-radius: 5px;
  background-color: #03b1d2;
  white-space: nowrap;
  &:hover {
    background-color: #04839a;
  }
  &:disabled {
    background-color: #a5a5a5;
  }
`;

const BtnSave = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #fff;
  border-radius: 5px;
  background-color: #2ecc71;
  white-space: nowrap;
  &:hover {
    background-color: #27ae60;
  }
  &:disabled {
    background-color: #a5a5a5;
  }
`;

const BtnDel = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #fff;
  border-radius: 5px;
  background-color: #e32626;
  white-space: nowrap;

  &:hover {
    background-color: #af1515;
  }

  &:disabled {
    background-color: #a5a5a5;
  }
`;

const SingleQuestion = ({ questionId, question }) => {
  const { text } = question;
  const [questionText, setQuestionText] = useState('');
  const [isEditNow, setIsEditNow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setQuestionText(text);
  }, [text]);

  const handleQuestionTextArea = (e) => {
    setQuestionText(e.target.value);
  };

  const onClickEdit = () => {
    setIsEditNow(true);
  };

  const onClickSave = () => {
    setIsEditNow(false);
    if (questionText && questionText !== text) {
      try {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionId,
            text: questionText,
          }),
        };
        fetch('http://localhost:5000/questions', requestOptions)
          .then(() => {
            dispatch(updateQuestion({ questionId, text: questionText }))
          })
            .catch(err => console.log(err, 'SingleQuestion.js'));
      } catch (error) {
        console.log(error, 'SingleQuestion.js', 54);
      }
    }
  };

  const onClickDelete = () => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId,
        }),
      };
      fetch('http://localhost:5000/questions/delete', requestOptions)
          .then(() => dispatch(deleteQuestion({ questionId })))
          .catch(err => console.log(err));
    } catch (error) {
      console.log(error, 'SingleQuestion.js');
    }
  };

  return (
    <Wrapper>
      <div>
        <input
          disabled={!isEditNow}
          type="text"
          value={questionText}
          onChange={handleQuestionTextArea}
        />
      </div>

      <div>
        {
          isEditNow
            ? <BtnSave
               onClick={onClickSave}
               disabled={!questionText || questionText === text}
              >
                Зберегти
              </BtnSave>
            : <BtnEdit onClick={onClickEdit}>Редагувати</BtnEdit>
        }
        <BtnDel onClick={onClickDelete}>Видалити</BtnDel>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state, { questionId }) => ({
  question: selectQuestionById(state, questionId),
});

export default connect(mapStateToProps)(SingleQuestion);
