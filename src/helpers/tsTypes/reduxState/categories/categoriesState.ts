export type SingleCategory = {
    categoryId: number,
    categoryName: string,
    name: string,
};

export interface CategoryIdToDataMap {
    [key: string]: SingleCategory
}
export interface CategoryNameToIdMap {
    [key: string]: number
}

export interface Data {
    [key: string]: CategoryIdToDataMap
}

export interface CategoriesState {
    data: Data,
    order: number[],
    categoryNameMapToId: CategoryNameToIdMap,
    currentCategoryId: number,
}
