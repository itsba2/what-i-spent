import { fetchExpenses } from "../../firebase/transaction"
import { api } from "../api"

export const expenseApi = api.injectEndpoints({
    endpoints: (build) => ({
        fetchUserExpenses: build.query({
            async queryFn(userId) {
                try {
                    const userExpenses = fetchExpenses(userId)
                    return { data: userExpenses }
                } catch (error) {
                    return { error }
                }
            },
            providesTags: ["Expenses"],
        }),
    }),
})

export const { useFetchUserExpensesQuery } = expenseApi
