// library imports
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fakeBaseQuery(),
    keepUnusedDataFor: 60 * 5,
    tagTypes: ["UserExpenses", "UserEarnings"],
    endpoints: () => ({}),
})
