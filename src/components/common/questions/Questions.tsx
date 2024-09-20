import React from 'react';
import {connect} from "react-redux";
import SingleQuestion from "../singleQuestion/SingleQuestion";
import {RootStateType} from "../../../store";
import {selectQuestionsOrder} from "../../../selectors/questionsSelectors";

const Questions = ({ questionsOrder } : { questionsOrder: number[] }) => {
  return (
    <>
      {questionsOrder.map((id) => (
        <SingleQuestion key={id} questionId={id} />
      ))}
    </>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  questionsOrder: selectQuestionsOrder(state),
});

export default connect(mapStateToProps)(Questions);
