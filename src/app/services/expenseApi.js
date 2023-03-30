import {
    fetchExpenses,
    addExpense,
    deleteExpense,
} from "../../firebase/transaction"
import { api } from "../api"

export const expenseApi = api.injectEndpoints({
    endpoints: (build) => ({
        fetchUserExpenses: build.query({
            async queryFn(userId) {
                try {
                    const userExpenses = await fetchExpenses(userId)
                    return { data: userExpenses }
                } catch (error) {
                    return { error }
                }
            },
            providesTags: ["UserExpenses"],
        }),
        addNewExpense: build.mutation({
            async queryFn(data) {
                try {
                    await addExpense(data)
                } catch (error) {
                    console.log('o ses bu ses')
                    return { error }
                }
            },
            invalidatesTags: ["UserExpenses"],
        }),
        deleteExpense: build.mutation({
            async queryFn(data) {
                try {
                    await deleteExpense(data)
                } catch (error) {
                    return { error }
                }
            },
            invalidatesTags: ["UserExpenses"],
        }),
    }),
})

export const {
    useFetchUserExpensesQuery,
    useAddNewExpenseMutation,
    useDeleteExpenseMutation,
} = expenseApi
