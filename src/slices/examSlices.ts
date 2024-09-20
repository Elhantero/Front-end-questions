import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import keyBy from 'lodash/keyBy';
import remove from 'lodash/remove';
import sum from 'lodash/sum';
import {SingleQuestion, QuestionState} from "../types/questions";

export const fetchExamStatistic = createAsyncThunk(
    'exam/fetchExamResults',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/exam/statistic`);
            if (!response.ok) throw new Error('Server Error!');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const fetchExamsCount = createAsyncThunk(
    'exam/fetchExamResultsCount',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/exam/statistic/count`);
            if (!response.ok) throw new Error('Server Error!');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

const examSlice = createSlice({
    name: 'exam',
    initialState: {
        lastResults: [],
        totalCount: 0,
        averagePercentResult: 0
    },
    reducers: {
        createExamResult: (state, action) => {
            const percentResult = action.payload || 0;
            const newLastResults = [...state.lastResults, percentResult];
            state.lastResults = newLastResults;
            state.averagePercentResult = sum(newLastResults) / newLastResults.length;
            state.totalCount = state.totalCount + 1;
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        percentResult
                    }),
                };
                fetch('http://localhost:5000/exam/addNewResult', requestOptions)
                    .catch((err) => console.log(err, 'createExamResult'));
            } catch (error) {
                console.log(error, 'createExamResult');
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExamStatistic.fulfilled, (state, action) => {
                state.lastResults = action?.payload;
                state.averagePercentResult = sum(action?.payload) / action?.payload.length || 1;
            })
            .addCase(fetchExamsCount.fulfilled, (state, action) => {
                  state.totalCount = action?.payload?.total;
            })
    },
});

export const { createExamResult } = examSlice.actions;
export default examSlice.reducer;
