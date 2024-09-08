import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectQuestionById } from '../../../selectors/questionsSelectors';
import * as questionsTypes from "../../../helpers/tsTypes/reduxState/questions";
import { RootState} from "../../../store";
import QuestionText from "./questionText/QuestionText";
import QuestionAnswer from "./questionAnswer/QuestionAnswer";

interface WrapperProps {
  $readyStatus?: boolean,
}

const Wrapper = styled.div<WrapperProps>`
    display: flex;
    gap: 15px;
    flex-direction: column;
    background: ${((props) => (props.$readyStatus ? 'deepskyblue' : 'ghostwhite'))};
    padding: 15px;

    input[type='text'] {
        text-decoration: ${((props) => (props.$readyStatus ? 'line-through' : ''))};
    }
`;

interface LabelProps {
  $readyStatus?: boolean,
}

const Label = styled.label<LabelProps>`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 24px;
    justify-content: center;
    box-sizing: border-box;
    padding: 0;
    cursor: pointer;
    user-select: none;
    border-radius: 50%;
    color: ${({ $readyStatus }) => $readyStatus ? '#fff': '#73beff'};
    border: 1px solid ${({ $readyStatus }) => $readyStatus ? '#fff': '#73beff'};
    .arrow {
      border: solid ${({ $readyStatus }) => $readyStatus ? '#fff': '#73beff'};
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 3px;
    }
    .right {
      transform: rotate(-45deg);
    }
    .left {
      transform: rotate(135deg);
    }
    .up {
      transform: rotate(-135deg);
    }
   .down {
      transform: rotate(45deg);
    }
`;

interface TopLineProps {
  withAnswer?: boolean,
}

const TopLine = styled.div<TopLineProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    
    >div:first-child {
        input[type="text"] {
          background-color: ${((props) => (props.withAnswer ? '#a0ffb7' : ''))};
        }
    }
    

    > div:last-child {
        display: flex;
        align-items: center;
        gap: 15px;
    }
`;

const SingleQuestion = ({ questionId, question } : { questionId: number, question: questionsTypes.SingleQuestion }) => {
  const { readyStatus, answer} = question;
  const [showSettings, setShowSettings] = useState(false);
  const handleShowHideSettings = (e: React.ChangeEvent<HTMLInputElement>) => setShowSettings(e.target.checked);

  return (
    <Wrapper $readyStatus={!!readyStatus}>
      <TopLine withAnswer={!!answer}>
        <QuestionText questionId={questionId} />

        <div>
          <input
              hidden
              type="checkbox"
              name={questionId.toString()}
              id={questionId.toString()}
              onChange={handleShowHideSettings}
          />
          <Label htmlFor={questionId.toString()} $readyStatus={!!readyStatus}>
            <i className={`arrow ${showSettings ? 'up' : 'down'}`}/>
          </Label>
        </div>
      </TopLine>

      {showSettings ? (<QuestionAnswer questionId={questionId} /> ) : null}
    </Wrapper>
  );
};

const mapStateToProps = (state: RootState, {questionId}: { questionId: number }) => ({
  question: selectQuestionById(state, questionId),
});

export default connect(mapStateToProps)(SingleQuestion);
