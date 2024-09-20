import {RootStateType} from "../store";
import { SingleQuestion, Data } from '../types/questions'

export const selectQuestions = (state: RootStateType) => state?.questions?.data;
export const selectQuestionsOrder = (state: RootStateType) => state?.questions?.order;
export const selectQuestionById = (state: RootStateType, questionId: number) => state?.questions?.data?.[questionId as keyof {}];

export const selectReadyQuestionsCount = (state: RootStateType): number => {
    const quetions: Data  = selectQuestions(state);
    return Object.values(quetions).filter((q: SingleQuestion)  => q.readyStatus === 1).length;
}
export const selectTotalQuestionsCount = (state: RootStateType): number => state?.questions?.order?.length;
