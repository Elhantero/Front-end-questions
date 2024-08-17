import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import keyBy from 'lodash/keyBy';
import remove from "lodash/remove";

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
  reducers: {
    addQuestion(state, action) {
      const { questionId, text, categoryId} = action.payload;
      state.data[questionId] = {
        questionId,
        text,
        categoryId,
      };
      state.order.unshift(questionId);
    },
    deleteQuestion(state,action) {
      const { questionId } = action.payload;
      delete state.data[questionId];
      const newOrder = [...state.order];
      remove(newOrder, (o) => Number(o) === Number(questionId));
      state.order = newOrder;
    },
    updateQuestion(state, action) {
      const { questionId, text } = action.payload;
      state.data[questionId].text = text;
    },
  },
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

export const { addQuestion, deleteQuestion, updateQuestion} = questionsSlice.actions;
export default questionsSlice.reducer;
