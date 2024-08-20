import {RootState} from "../store";

export const selectQuestions = (state: RootState) => state?.questions?.data;
export const selectQuestionsOrder = (state: RootState) => state?.questions?.order;
export const selectQuestionById = (state: RootState, questionId: number) => state?.questions?.data?.[questionId as keyof {}];
