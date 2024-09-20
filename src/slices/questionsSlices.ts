import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import keyBy from 'lodash/keyBy';
import remove from 'lodash/remove';
import {SingleQuestion, QuestionState} from "../types/questions";

export const fetchQuestionsByCategoryId = createAsyncThunk(
  'questions/fetchByCategoryId',
  async ( { categoryId } : { categoryId: number }, { rejectWithValue }) => {
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
  async ({ categoryId, text } : { categoryId: number, text: string }, { rejectWithValue }) => {
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

export const fetchQuestionsForExam = createAsyncThunk(
    'questions/exam',
    async ( { limit = 10 } : { limit: number | undefined }, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:5000/questions/exam?limit=${limit}`);
        if (!response.ok) throw new Error('Server Error!');
        return await response.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    },
);

export const fetchQuestionsStatistic = createAsyncThunk(
    'questions/statistic',
    async ( _, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:5000/questions/statistic`);
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
    order: [],
    statistic: {},
  },
  reducers: {
    deleteQuestion: (state: QuestionState, action) => {
      const { questionId } = action.payload;
      delete state.data[questionId];
      const newOrder = [...state.order];
      remove(newOrder, (o) => Number(o) === Number(questionId));
      state.order = newOrder;
      try {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionId,
          }),
        };
        fetch('http://localhost:5000/questions/delete', requestOptions)
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error, 'deleteQuestion');
      }
    },
    updateQuestion: (state: QuestionState, action) => {
      const { ...question } : SingleQuestion = action.payload;
      if (!question.questionId) return;
      (Object.keys(question)).forEach((key: string) => {
        if (question[key as keyof {}] !== undefined) {
          state.data[question.questionId][key as keyof {}] = question[key as keyof {}];
        }
      });
      try {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              ...question
          }),
        };
        fetch('http://localhost:5000/questions/update', requestOptions)
          .catch((err) => console.log(err, 'questionsSlices.js'));
      } catch (error) {
        console.log(error, 'updateQuestion');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsByCategoryId.fulfilled, (state: QuestionState, action) => {
        state.data = keyBy(action.payload, 'questionId');
        const order = action.payload.map((o: SingleQuestion) => Number(o.questionId));
        // сортування по рейтингу
        order.sort((a: number, b: number) => Number(state.data[b].rating) - Number(state.data[a].rating));
        // сортування щоб готові питання були в кінці
        order.sort((a: number, b: number) => Number(state.data[a].readyStatus) - Number(state.data[b].readyStatus));
        state.order = order;
      })
      .addCase(createQuestion.fulfilled, (state: QuestionState, action) => {
        const { categoryId, questionId, text }: SingleQuestion = action.payload;
        if (questionId) {
          state.data[questionId] = {
            questionId,
            text,
            categoryId,
          };
        }
        state.order.push(questionId);
      })
      .addCase(fetchQuestionsForExam.fulfilled, (state: QuestionState, action) => {
        state.data = keyBy(action.payload, 'questionId');
        const order = action.payload.map((o: SingleQuestion) => Number(o.questionId));
        // сортування щоб готові питання були в кінці
        order.sort((a: number, b: number) => Number(state.data[a].readyStatus) - Number(state.data[b].readyStatus));
        state.order = order;
      })
      .addCase(fetchQuestionsStatistic.fulfilled, (state: QuestionState, action) => {
        state.statistic = action.payload;
      })
    ;
  },
});

export const { deleteQuestion, updateQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;
