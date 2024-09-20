import {configureStore} from "@reduxjs/toolkit";
import categoriesReducer from "../slices/categorySlices";
import questionsReducer from "../slices/questionsSlices";
import examReducer from "../slices/examSlices";

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        questions: questionsReducer,
        exam: examReducer,
    },
});

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
