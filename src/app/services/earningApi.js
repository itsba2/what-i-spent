import { fetchEarnings } from "../../firebase/transaction"
import { api } from "../api"

export const expenseApi = api.injectEndpoints({
    endpoints: (build) => ({
        fetchUserEarnings: build.query({
            async queryFn(userId) {
                try {
                    const userEarnings = fetchEarnings(userId)
                    return { data: userEarnings }
                } catch (error) {
                    return { error }
                }
            },
            providesTags: ["UserEarnings"],
        }),
    }),
})

export const { useFetchUserEarningsQuery } = expenseApi
