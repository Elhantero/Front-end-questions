export type SingleQuestion = {
    questionId: number,
    text: string,
    categoryId?: number,
    readyStatus?: number,
    rating?: number,
};
export interface Data {
    [key: string]: SingleQuestion
}

export interface QuestionState {
    data: Data,
    order: number[]
}