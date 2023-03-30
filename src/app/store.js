import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { api } from "./api"

export const store = configureStore({
    reducer: {
        // TODO: loading/feedback slice
        [api.reducerPath]: api.reducer,
    },
    middleware: (dMw) => dMw().concat(api.middleware),
})

setupListeners(store.dispatch)
