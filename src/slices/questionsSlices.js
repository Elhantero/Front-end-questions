import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import keyBy from 'lodash/keyBy';
import remove from 'lodash/remove';

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

export const createQuestion = createAsyncThunk(
  'questions/create',
  async ({ categoryId, text }, { rejectWithValue }) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categoryId,
        text,
      }),
    };
    try {
      const response = await fetch('http://localhost:5000/questions/create', requestOptions);
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
    deleteQuestion: (state, action) => {
      const { questionId } = action.payload;
      delete state.data[questionId];
      const newOrder = [...state.order];
      remove(newOrder, (o) => Number(o) === Number(questionId));
      state.order = newOrder;
    },
    updateQuestion: (state, action) => {
      const {
        questionId, ...otherParams
      } = action.payload;
      if (!questionId) return;
      Object.keys(otherParams).forEach((key) => {
        if (otherParams[key] !== undefined) state.data[questionId][key] = otherParams[key];
      });
      try {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionId,
            ...otherParams,
          }),
        };
        fetch('http://localhost:5000/questions/update', requestOptions)
          .catch((err) => console.log(err, 'questionsSlices.js'));
      } catch (error) {
        console.log(error, 'questionsSlices.js');
      }
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
        const order = action.payload.map((o) => Number(o.questionId));
        // сортування по рейтингу
        order.sort((a, b) => Number(state.data[b].rating) - Number(state.data[a].rating));
        // сортування щоб готові питання були в кінці
        order.sort((a, b) => Number(state.data[a].readyStatus) - Number(state.data[b].readyStatus));
        state.order = order;
      })
      .addCase(fetchQuestionsByCategoryId.rejected, (state, action) => {
        state.status = 'error loading';
        state.error = action.error;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        const { categoryId, questionId, text } = action.payload;
        if (questionId) {
          state.data[questionId] = {
            questionId,
            text,
            categoryId,
          };
        }
        state.order.push(questionId);
      });
  },
});

export const { addQuestion, deleteQuestion, updateQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;
