import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { expenseApi } from "./services/expenseApi"
import { earningApi } from "./services/earningApi"

export const store = configureStore({
    reducer: {
        // TODO: loading/feedback slice
        [expenseApi.reducerPath]: expenseApi.reducer,
        [earningApi.reducerPath]: earningApi.reducer,
    },
    middleware: (dMw) =>
        dMw().concat(expenseApi.middleware).concat(earningApi.middleware),
})

setupListeners(store.dispatch)
