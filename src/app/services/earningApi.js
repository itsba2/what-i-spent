import {
    fetchEarnings,
    addEarning,
    deleteEarning,
} from "../../firebase/transaction"
import { api } from "../api"

export const expenseApi = api.injectEndpoints({
    endpoints: (build) => ({
        fetchUserEarnings: build.query({
            async queryFn(userId) {
                try {
                    const userEarnings = await fetchEarnings(userId)
                    return { data: userEarnings }
                } catch (error) {
                    return { error }
                }
            },
            providesTags: ["UserEarnings"],
        }),
        addNewEarning: build.mutation({
            async queryFn(data) {
                try {
                    const response = await addEarning(data)
                    return response
                } catch (error) {
                    return { error }
                }
            },
            invalidatesTags: ["UserEarnings"],
        }),
        deleteEarning: build.mutation({
            async queryFn(docId) {
                try {
                    const response = await deleteEarning(docId)
                    return response
                } catch (error) {
                    return { error }
                }
            },
            invalidatesTags: ["UserEarnings"],
        }),
    }),
})

export const {
    useFetchUserEarningsQuery,
    useAddNewEarningMutation,
    useDeleteEarningMutation,
} = expenseApi
