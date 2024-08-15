import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import keyBy from 'lodash/keyBy';

export const fetchQuestionsByCategoryId = createAsyncThunk(
  'questions/fetchByCategoryId',
  async ({ categoryId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/questions/${categoryId}`);
      if (!response.ok) throw new Error('Server Error!');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    data: {},
    status: null,
    error: null,
    order: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsByCategoryId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestionsByCategoryId.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.data = keyBy(action.payload, 'questionId');
        state.order = action.payload.map((o) => Number(o.questionId)).sort((a, b) => a - b);
      })
      .addCase(fetchQuestionsByCategoryId.rejected, (state, action) => {
        state.status = 'error loading';
        state.error = action.error;
      });
  },
});

export default questionsSlice.reducer;
