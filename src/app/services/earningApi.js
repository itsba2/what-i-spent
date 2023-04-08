import {
  fetchEarnings,
  addEarning,
  deleteEarning,
  updateEarning,
} from "../../firebase/transaction";

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const earningApi = createApi({
  reducerPath: "earningApi",
  baseQuery: fakeBaseQuery(),
  keepUnusedDataFor: 60 * 5,
  tagTypes: ["Earning", "Expense"],
  endpoints: (build) => ({
    fetchUserEarnings: build.query({
      async queryFn(userId) {
        try {
          const userEarnings = await fetchEarnings(userId);
          return { data: userEarnings };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Earning"],
    }),
    addNewEarning: build.mutation({
      async queryFn(earningData) {
        try {
          const response = await addEarning(earningData);
          return { data: response };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Earning"],
    }),
    deleteEarning: build.mutation({
      async queryFn(earningData) {
        try {
          const response = await deleteEarning(earningData);
          return { data: response };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Earning"],
    }),
    editEarning: build.mutation({
      async queryFn(earningData) {
        try {
          const response = await updateEarning(earningData);
          return { data: response };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Earning"],
    }),
  }),
});

export const {
  useFetchUserEarningsQuery,
  useAddNewEarningMutation,
  useDeleteEarningMutation,
  useEditEarningMutation,
} = earningApi;
