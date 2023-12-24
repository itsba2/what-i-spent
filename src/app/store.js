import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { expenseApi } from "./services/expenseApi";
import { earningApi } from "./services/earningApi";
import feedbackReducer from "./feedbackSlice";

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    [expenseApi.reducerPath]: expenseApi.reducer,
    [earningApi.reducerPath]: earningApi.reducer,
  },
  middleware: (dMw) =>
    dMw().concat(expenseApi.middleware).concat(earningApi.middleware),
  devTools: import.meta.env.VITE_ENV === "dev",
});

setupListeners(store.dispatch);
