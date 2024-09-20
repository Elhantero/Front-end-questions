import {RootState} from "../store";
import { SingleQuestion, Data } from '../types/questions'

export const selectQuestions = (state: RootState) => state?.questions?.data;
export const selectQuestionsOrder = (state: RootState) => state?.questions?.order;
export const selectQuestionById = (state: RootState, questionId: number) => state?.questions?.data?.[questionId as keyof {}];

export const selectReadyQuestionsCount = (state: RootState): number => {
    const quetions: Data  = selectQuestions(state);
    return Object.values(quetions).filter((q: SingleQuestion)  => q.readyStatus === 1).length;
}
export const selectTotalQuestionsCount = (state: RootState): number => state?.questions?.order?.length;
