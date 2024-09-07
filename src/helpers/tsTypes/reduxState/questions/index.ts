export type SingleQuestion = {
    questionId: number,
    text: string,
    categoryId?: number,
    readyStatus?: number,
    rating?: number,
    answer?: string,
};
export type Data = {
    [key: string]: SingleQuestion
}

export type QuestionsStatistic = {
    total: number,
    readyCount: number,
}

export interface QuestionState {
    data: Data,
    order: number[]
    statistic: QuestionsStatistic
}