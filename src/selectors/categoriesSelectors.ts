import {RootState} from "../store";

export const selectCategories = (state: RootState) => state?.categories?.data;
export const selectCategoriesOrder = (state: RootState) => state?.categories?.order;
export const selectCurrentCategoryId = (state: RootState) => state?.categories?.currentCategoryId;
export const selectCategoryNameMapToId = (state: RootState) => state?.categories?.categoryNameMapToId;
