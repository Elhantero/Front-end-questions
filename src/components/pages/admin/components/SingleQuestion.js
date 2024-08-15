import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectQuestionById } from '../../../../selectors/questionsSelectors';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 200px;
    gap: 15px;
    background: ghostwhite;
    padding: 15px;
    input[type="text"] {
        height: 40px;
        font-size: 16px;
        padding: 3px 10px;
        width: 100%;
        box-sizing: border-box;
    }
`;

const SingleQuestion = ({ questionId, question }) => {
  const { text } = question;
  const [questionText, setQuestionText] = useState('');
  const [isEditNow, setIsEditNow] = useState(false);

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
          .then((r) => console.log(r, 'SingleQuestion.js', 50));
      } catch (error) {
        console.log(error, 'SingleQuestion.js', 54);
      }
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
            ? <button onClick={onClickSave}>зберегти</button>
            : <button onClick={onClickEdit}>редагувати</button>
        }
        <button>видалити</button>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state, { questionId }) => ({
  question: selectQuestionById(state, questionId),
});

export default connect(mapStateToProps)(SingleQuestion);
