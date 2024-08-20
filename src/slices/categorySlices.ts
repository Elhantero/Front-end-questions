import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import keyBy from 'lodash/keyBy';
import {CategoriesState, CategoryNameToIdMap, SingleCategory} from '../helpers/tsTypes/reduxState/categories/categoriesState';

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/categories');
      if (!response.ok) throw new Error('Server Error!');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateCategoryName = createAsyncThunk(
  'categories/updateCategoryName',
  async ({ categoryId, categoryName }: { categoryId: number, categoryName: string }, { rejectWithValue }) => {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId,
          categoryName,
        }),
      };
      const response = await fetch('http://localhost:5000/categories', requestOptions);
      if (!response.ok) throw new Error('Server Error!');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    data: {},
    order: [],
    categoryNameMapToId: {},
    currentCategoryId: 0,
    status: '',
    error: '',
  },
  reducers: {
    setCurrentCategoryId: (state, action) => {
      state.currentCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state: CategoriesState, action) => {
        state.data = keyBy(action.payload, 'categoryId');
        state.order = action.payload.map((o:SingleCategory) => o.categoryId);
        const categoryNameMapToId: CategoryNameToIdMap = {};
        action.payload.forEach((o: SingleCategory) => categoryNameMapToId[o.categoryName] = o.categoryId);
        state.categoryNameMapToId = categoryNameMapToId;
      })
      .addCase(updateCategoryName.fulfilled, (state: CategoriesState, action) => {
        const { payload: { status, categoryId, categoryName } } = action;
        if (status === 'ok') {
          state.data[categoryId] = {
            ...state.data[categoryId],
            categoryId,
            name: categoryName,
          };
        }
      });
  },
});

export const { setCurrentCategoryId } = categorySlice.actions;

export default categorySlice.reducer;
