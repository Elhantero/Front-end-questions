export const selectQuestions = (state: State) => state?.questions?.data;
export const selectQuestionsOrder = (state: State) => state?.questions?.order;
export const selectQuestionById = (state, questionId) => state?.questions?.data?.[questionId];
