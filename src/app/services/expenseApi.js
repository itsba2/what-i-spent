import {
  fetchExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../../firebase/transaction";

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const expenseApi = createApi({
  reducerPath: "expenseApi",
  baseQuery: fakeBaseQuery(),
  keepUnusedDataFor: 60 * 5,
  tagTypes: ["Expense", "Earning"],
  endpoints: (build) => ({
    fetchUserExpenses: build.query({
      async queryFn(userId) {
        try {
          const userExpenses = await fetchExpenses(userId);
          return { data: userExpenses };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Expense"],
    }),
    addNewExpense: build.mutation({
      async queryFn(expenseData) {
        try {
          const response = await addExpense(expenseData);
          return { data: response };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Expense"],
    }),
    deleteExpense: build.mutation({
      async queryFn(expenseData) {
        try {
          const response = await deleteExpense(expenseData);
          return { data: response };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Expense"],
    }),
    editExpense: build.mutation({
      async queryFn(expenseData) {
        try {
          const response = await updateExpense(expenseData);
          return { data: response };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Expense", "Earning"],
    }),
  }),
});

export const {
  useFetchUserExpensesQuery,
  useAddNewExpenseMutation,
  useDeleteExpenseMutation,
  useEditExpenseMutation,
} = expenseApi;
