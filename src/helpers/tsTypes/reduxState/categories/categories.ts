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

export interface Categories {
    data: Data,
    order: number[],
    categoryNameMapToId: CategoryNameToIdMap,
    currentCategoryId: number,
    status: string,
    error:string,
}