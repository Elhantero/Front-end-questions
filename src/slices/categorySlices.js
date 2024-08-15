import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import keyBy from 'lodash/keyBy';

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/categories');
      if (!response.ok) throw new Error('Server Error!');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateCategoryName = createAsyncThunk(
  'categories/updateCategoryName',
  async ({ categoryId, categoryName }, { rejectWithValue }) => {
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
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.data = keyBy(action.payload, 'categoryId');
        state.order = action.payload.map((o) => o.categoryId);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'error loading';
        state.error = action.error;
      })
      .addCase(updateCategoryName.fulfilled, (state, action) => {
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

export default categorySlice.reducer;
