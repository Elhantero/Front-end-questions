import {RootStateType} from "../store";
import {CategoryIdToDataMap, CategoryNameToIdMap, SingleCategory} from "../types/categories";

export const selectCategories = (state: RootStateType) : CategoryIdToDataMap => state?.categories?.data;
export const selectCategoriesOrder = (state: RootStateType) : number[]  => state?.categories?.order;
export const selectCurrentCategoryId = (state: RootStateType) : number => state?.categories?.currentCategoryId;
export const selectCategoryNameMapToId = (state: RootStateType) : CategoryNameToIdMap => state?.categories?.categoryNameMapToId;

export const selectCategoryById = (state: RootStateType, categoryId: number) : SingleCategory => {
  const categories: CategoryIdToDataMap = selectCategories(state);
  return categories?.[categoryId];
}

export const selectCategoryIdByName = (state: RootStateType, categoryName: string) : number => {
  return selectCategoryNameMapToId(state)?.[categoryName];
}
