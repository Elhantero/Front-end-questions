import React from 'react';
import {connect} from "react-redux";
import SingleQuestionContainer from "../singleQuestion/SingleQuestionContainer";
import {RootStateType} from "../../../store";
import {selectQuestionsOrder} from "../../../selectors/questionsSelectors";

const Questions = ({ questionsOrder } : { questionsOrder: number[] }) => {
  return (
    <>
      {questionsOrder.map((id) => (
        <SingleQuestionContainer key={id} questionId={id} />
      ))}
    </>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  questionsOrder: selectQuestionsOrder(state),
});

export default connect(mapStateToProps)(Questions);
