// library imports
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Expenses"],
    endpoints: () => ({}),
})
