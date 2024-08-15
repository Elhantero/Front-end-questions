export const selectQuestions = (state) => state?.questions?.data;
export const selectQuestionsOrder = (state) => state?.questions?.order;
export const selectQuestionById = (state, questionId) => state?.questions?.data?.[questionId];
