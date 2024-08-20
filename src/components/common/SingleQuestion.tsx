import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectQuestionById } from '../../selectors/questionsSelectors';
import { deleteQuestion, updateQuestion } from '../../slices/questionsSlices';
import Rating from './Rating';
import * as questionsTypes from "../../helpers/tsTypes/reduxState/questions";
import { RootState} from "../../store";

interface WrapperProps {
  $readyStatus?: boolean,
  $isEditNow?: boolean,
}

const Wrapper = styled.div<WrapperProps>`
    display: flex;
    gap: 15px;
    flex-direction: column;
    background: ${((props) => (props.$readyStatus && !props.$isEditNow ? 'deepskyblue' : 'ghostwhite'))};
    padding: 15px;

    input[type='text'] {
        text-decoration: ${((props) => (props.$readyStatus && !props.$isEditNow ? 'line-through' : ''))};
    }
`;

interface BtnDefaultStyle {
  bgColor: string,
  bgColorHover: string,
}
interface BtnStyles {
  [key: string]: BtnDefaultStyle
}

const typeToCssMap: BtnStyles  = {
  save: {
    bgColor: '#2ecc71',
    bgColorHover: '#27ae60',
  },
  edit: {
    bgColor: '#03b1d2',
    bgColorHover: '#04839a',
  },
  del: {
    bgColor: '#e32626',
    bgColorHover: '#af1515',
  },
};

interface BtnProps {
  $btnType?: string
}

const Btn = styled.button<BtnProps>`
    font-size: 18px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: #fff;
    border-radius: 5px;
    background-color: ${(props) => (props.$btnType ? typeToCssMap?.[props.$btnType as keyof {}].bgColor : '#2ecc71')};
    white-space: nowrap;
    width: 70px;
    height: 40px;

    &:hover {
        background-color: ${(props) => (props.$btnType ? typeToCssMap?.[props.$btnType  as keyof {}].bgColorHover : '#27ae60')};;
    }

    &:disabled {
        background-color: #a5a5a5;
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

const TopLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;

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

const BotLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const BtnWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    input[type=checkbox] {
        transform: scale(3);
        margin: 0 6px 0 0;
        cursor: pointer;
        margin-right: 15px;
    }
`;

const SingleQuestion = ({ questionId, question } : { questionId: number, question: questionsTypes.SingleQuestion }) => {
  const { text, readyStatus, rating = 0 } = question;
  const [questionText, setQuestionText] = useState('');
  const [isEditNow, setIsEditNow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const dispatch = useDispatch();
  const saveQuestion = (params = {}) => dispatch(updateQuestion(params));

  useEffect(() => {
    setQuestionText(text);
  }, [text]);

  useEffect(() => {
    setQuestionText(text);
  }, [text]);

  const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => saveQuestion({ questionId, rating: e.target.value });
  const handleReadyStatus = (e: React.ChangeEvent<HTMLInputElement>) => saveQuestion({ questionId, readyStatus: e.target.checked });
  const handleQuestionTextArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionText(e.target.value);
  };

  const onClickEdit = () => setIsEditNow(true);

  const onClickSave = () => {
    setIsEditNow(false);
    if (questionText && questionText !== text) {
      saveQuestion({ questionId, text: questionText });
    }
  };

  const handleShowHideSettings = (e: React.ChangeEvent<HTMLInputElement>) => setShowSettings(e.target.checked);

  const onClickDelete = () => {
    const reallyDelete = window.confirm('Видалити це питання?');
    if (!reallyDelete) return;
    dispatch(deleteQuestion({ questionId }));
  };

  return (
    <Wrapper
      $readyStatus={!!readyStatus}
      $isEditNow={isEditNow}
    >

      <TopLine>
        <div>
          <input
            disabled={!isEditNow}
            type="text"
            value={questionText}
            onChange={handleQuestionTextArea}
          />
        </div>

        <div>
          <input
              hidden
              type="checkbox"
              name={questionId.toString()}
              id={questionId.toString()}
              onChange={handleShowHideSettings}
          />
          <Label htmlFor={questionId.toString()} $readyStatus={!!readyStatus}>
            <i className={`arrow ${showSettings ? 'up' : 'down' }`} />
          </Label>
        </div>
      </TopLine>

      {
        showSettings ? (
          <BotLine>
            <Rating
              rating={rating}
              handleRating={handleRating}
              questionId={questionId}
            />

            <BtnWrapper>
              <input
                type="checkbox"
                onChange={handleReadyStatus}
                checked={!!readyStatus}
                title="Зміна статусу готовності, готові питання виводяться в кінці"
              />
              {
                isEditNow
                  ? (
                    <Btn
                      $btnType="save"
                      onClick={onClickSave}
                      disabled={!questionText || questionText === text}
                    >
                      Save
                    </Btn>
                  )
                  : <Btn $btnType="edit" onClick={onClickEdit}>Edit</Btn>
              }
              <Btn $btnType="del" onClick={onClickDelete}>Del</Btn>
            </BtnWrapper>
          </BotLine>
        ) : null
    }
    </Wrapper>
  );
};

const mapStateToProps = (state: RootState, { questionId } : { questionId: number }) => ({
  question: selectQuestionById(state, questionId),
});

export default connect(mapStateToProps)(SingleQuestion);
