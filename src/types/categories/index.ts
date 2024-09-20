export type SingleCategory = {
    categoryId: number,
    categoryName: string,
    name: string,
};

export type CategoryIdToDataMap = {
    [key: string]: SingleCategory
}
export type CategoryNameToIdMap = {
    [key: string]: number
}

export interface CategoriesState {
    data: CategoryIdToDataMap,
    order: number[],
    categoryNameMapToId: CategoryNameToIdMap,
    currentCategoryId: number,
}
